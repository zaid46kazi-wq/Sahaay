import os
import json
import re
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
from langchain_openai import ChatOpenAI
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from dotenv import load_dotenv

from duckduckgo_search import DDGS
from langchain_core.messages import HumanMessage, SystemMessage

# Load environment variables
load_dotenv()

app = FastAPI(title="Sahaay Global AI Service")

# --- Language Detection ---
def detect_language(text: str) -> str:
    """
    Detect if the text is in Hinglish, Hindi, English, or other languages.
    Returns: 'Hinglish', 'Hindi', or 'English'
    """
    # Count Hindi characters (Devanagari script)
    hindi_chars = len(re.findall(r'[\u0900-\u097F]', text))
    
    # Common Hinglish patterns and words
    hinglish_words = ['aap', 'hai', 'hain', 'kya', 'nahi', 'accha', 'theek', 
                      'bhai', 'haan', 'shukriya', 'dhanyavaad', 'beta', 'yaar',
                      'bilkul', 'samajh', 'dekh', 'batao', 'bolo', 'suno']
    
    # Count Hinglish patterns
    text_lower = text.lower()
    hinglish_count = sum(1 for word in hinglish_words if word in text_lower)
    
    # If more than 30% of text is Devanagari, it's Hindi
    if hindi_chars / max(len(text), 1) > 0.3:
        return 'Hindi'
    
    # If Hinglish words are found, it's Hinglish
    if hinglish_count > 0:
        return 'Hinglish'
    
    # Default to letting the LLM decide, but pass 'Auto'
    return 'Auto'

# --- LLM Factory ---
def get_llm():
    openai_key = os.getenv("OPENAI_API_KEY")
    groq_key = os.getenv("GROQ_API_KEY")

    if groq_key and not groq_key.startswith("your_"):
        return ChatGroq(model="llama-3.3-70b-versatile", temperature=0.2, groq_api_key=groq_key)

    if openai_key and not openai_key.startswith("your_"):
        return ChatOpenAI(model="gpt-3.5-turbo", temperature=0.2, timeout=20)

    return None

# --- Models ---
class ChatRequest(BaseModel):
    message: str
    language: Optional[str] = "English"

class ChatResponse(BaseModel):
    emotion: str
    confidence: float
    risk: str
    reply: str
    suggestions: List[str]

class SummaryRequest(BaseModel):
    emotions: List[str]

class SummaryResponse(BaseModel):
    summary: str

# --- Prompt Templates ---
def get_system_instructions(language="English", context=""):
    language_guidance = f"""CRITICAL INSTRUCTION FOR LANGUAGE:
    1. Analyze the exact language, script, and style of the user's message.
    2. You MUST respond in the EXACT SAME LANGUAGE and SCRIPT as the user's input.
    3. Note: The user's interface language is currently set to '{language}', but their message might be in a different language. ALWAYS prioritize the language of the user's message.
    4. If the user writes in a regional script (e.g., Devanagari, Kannada, Telugu, Tamil, etc.), respond using that exact script.
    5. If the user writes in Romanized/mixed language (e.g., Hinglish, Tanglish, Kanglish), respond in the same conversational mixed style using the English alphabet.
    6. Never respond in English if the user is communicating in another language.
    """
    
    return f"""You are Sahaay, an International Level Caregiver Support AI. 
    You have access to real-time internet data to provide the best advice.
    
    Current Web Context: {context}

    {language_guidance}
    
    Your goals:
    1. Detect emotion and risk.
    2. Provide empathetic, evidence-based support using the context provided.
    3. Suggest practical wellness steps.

    Return EXACT JSON:
    {{
        "emotion": "sad | anxious | angry | happy | distressed",
        "confidence": 0.0,
        "risk": "LOW | MEDIUM | HIGH",
        "reply": "string",
        "suggestions": ["list", "of", "strings"]
    }}
    """

# --- Logic ---
@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    llm = get_llm()
    if not llm:
        raise HTTPException(status_code=500, detail="No LLM provider configured.")
    
    # Auto-detect language if not provided or default
    detected_lang = detect_language(request.message)
    language = request.language
    
    # If language is default "English", try to detect from message
    if language == "English" and detected_lang != "Auto":
        language = detected_lang
    elif language == "English":
        language = "the exact language of the user's message"
    
    # Map language display names
    lang_map = {
        'Hinglish': 'Hinglish (Hindi-English mix)',
        'Hindi': 'Hindi',
        'English': 'English',
        'Auto': "the exact language of the user's message"
    }
    display_language = lang_map.get(language, language)
    
    print(f"🌍 Detected Language: {language}")
    print(f"📝 User Message: {request.message}")
    
    # 1. Analyze the internet (Search)
    web_context = ""
    try:
        search_query = f"caregiver advice for {request.message}"
        with DDGS() as ddgs:
            results = list(ddgs.text(search_query, max_results=2))
            if results:
                web_context = "\n".join([r.get('body', '') for r in results])
        print(f"Web Context found: {web_context[:100]}...")
    except Exception as e:
        print(f"Search failed: {e}")

    # 2. Generate Response
    system_inst = get_system_instructions(display_language, web_context)
    
    try:
        parser = JsonOutputParser()
        chain = llm | parser
        
        messages = [
            SystemMessage(content=system_inst),
            HumanMessage(content=f"User Message: {request.message}")
        ]
        
        result = chain.invoke(messages)
        
        return ChatResponse(
            emotion=result.get("emotion", "neutral"),
            confidence=result.get("confidence", 0.9),
            risk=result.get("risk", "LOW"),
            reply=result.get("reply", "I'm here for you. 💙"),
            suggestions=result.get("suggestions", ["Take a deep breath"])
        )
    except Exception as e:
        print(f"LLM Error: {e}")
        return ChatResponse(
            emotion="neutral", confidence=0.0, risk="LOW",
            reply="I'm here for you. I'm having a little trouble thinking clearly right now, but I'm still listening. 💙",
            suggestions=["Try again in a moment"]
        )

@app.post("/summarize", response_model=SummaryResponse)
async def summarize_endpoint(request: SummaryRequest):
    llm = get_llm()
    if not llm:
        return SummaryResponse(summary="I'm still learning about your journey.")

    try:
        prompt = f"Summarize these recent emotions for a caregiver in one warm, supportive sentence: {', '.join(request.emotions)}. Return as JSON {{'summary': '...'}}"
        result = llm.invoke(prompt)
        # Simple extraction if not using parser
        text = result.content if hasattr(result, 'content') else str(result)
        if "{" in text:
            import json
            data = json.loads(text[text.find("{"):text.rfind("}")+1])
            return SummaryResponse(summary=data.get("summary", "You've been navigating a lot."))
        return SummaryResponse(summary=text)
    except Exception as e:
        return SummaryResponse(summary="You're doing a great job navigating these feelings.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

