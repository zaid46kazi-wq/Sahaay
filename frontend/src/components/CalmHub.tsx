import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import CalmHubCard from './CalmHubCard';
import VideoSection from './VideoSection';
import CareCompanion from './CareCompanion';

const categories = [
  {
    id: 'satisfying',
    title: 'Satisfying Videos',
    desc: 'Intricate loops and satisfying motions to ground your mind.',
    previewUrl: '/videos/satisfying.mp4',
    poster: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-purple-500/10',
    videos: [
      { id: 1, title: 'Liquid Flow', url: '/videos/satisfying1.mp4', poster: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=500&q=80' },
      { id: 2, title: 'Nature Loop', url: '/videos/satisfying2.mp4', poster: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=500&q=80' },
      { id: 3, title: 'Zen Motion', url: '/videos/satisfying3.mp4', poster: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80' },
      { id: 4, title: 'Ocean Drift', url: '/videos/satisfying4.mp4', poster: 'https://images.unsplash.com/photo-1544710800-ed39b03806f3?auto=format&fit=crop&w=500&q=80' },
      { id: 5, title: 'Gentle Waves', url: '/videos/satisfying5.mp4', poster: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=500&q=80' }
    ]
  },
  {
    id: 'ocean',
    title: 'Ocean Waves',
    desc: 'The rhythmic pulse of the sea to calm your breathing.',
    previewUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
    poster: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-blue-500/10',
    videos: [
      { id: 1, title: 'Pacific Rhythm', url: 'https://vjs.zencdn.net/v/oceans.mp4', poster: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=500&q=80' },
      { id: 2, title: 'Deep Blue Flow', url: 'https://vjs.zencdn.net/v/oceans.mp4#t=10', poster: 'https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&w=500&q=80' },
      { id: 3, title: 'Horizon Peace', url: 'https://vjs.zencdn.net/v/oceans.mp4#t=20', poster: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80' },
      { id: 4, title: 'Azure Solitude', url: 'https://vjs.zencdn.net/v/oceans.mp4#t=30', poster: 'https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=500&q=80' },
      { id: 5, title: 'Crystal Shore', url: 'https://vjs.zencdn.net/v/oceans.mp4#t=40', poster: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=500&q=80' }
    ]
  },
  {
    id: 'wildlife',
    title: 'Wildlife',
    desc: 'Wide-open landscapes and the gentle movement of the wild.',
    previewUrl: 'https://res.cloudinary.com/demo/video/upload/v1619001389/samples/elephants.mp4',
    poster: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-green-500/10',
    videos: [
      { id: 1, title: 'Sea Turtle', url: 'https://res.cloudinary.com/demo/video/upload/v1619001389/samples/sea-turtle.mp4', poster: 'https://images.unsplash.com/photo-1544710800-ed39b03806f3?auto=format&fit=crop&w=500&q=80' },
      { id: 2, title: 'Elephants', url: 'https://res.cloudinary.com/demo/video/upload/v1619001389/samples/elephants.mp4', poster: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=500&q=80' },
      { id: 3, title: 'Marine Life', url: 'https://vjs.zencdn.net/v/oceans.mp4', poster: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=500&q=80' },
      { id: 4, title: 'Bunny Adventure', url: 'https://www.w3schools.com/html/mov_bbb.mp4', poster: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=500&q=80' },
      { id: 5, title: 'Wild Safari', url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', poster: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?auto=format&fit=crop&w=500&q=80' }
    ]
  },
  {
    id: 'rainy',
    title: 'Rainy Nature',
    desc: 'The soothing sound and sight of rain on fresh leaves.',
    previewUrl: '/videos/rain.mp4',
    poster: 'https://images.unsplash.com/photo-1469719847081-4757697d117a?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-indigo-500/10',
    videos: [
      { id: 1, title: 'Window Rain', url: '/videos/rainy1.mp4', poster: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=500&q=80' },
      { id: 2, title: 'Forest Shower', url: '/videos/rainy2.mp4', poster: 'https://images.unsplash.com/photo-1428592953211-077101b2021b?auto=format&fit=crop&w=500&q=80' },
      { id: 3, title: 'Puddle Ripples', url: '/videos/rainy3.mp4', poster: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=500&q=80' },
      { id: 4, title: 'Stormy Sky', url: '/videos/rainy4.mp4', poster: 'https://images.unsplash.com/photo-1469719847081-4757697d117a?auto=format&fit=crop&w=500&q=80' },
      { id: 5, title: 'Mist Flow', url: '/videos/rainy5.mp4', poster: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=500&q=80' }
    ]
  },
  {
    id: 'forest',
    title: 'Forest Path',
    desc: 'Sun-dappled paths and the quiet majesty of old trees.',
    previewUrl: '/videos/forest_new.mp4',
    poster: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-teal-500/10',
    videos: [
      { id: 1, title: 'Golden Canopy', url: '/videos/forest1.mp4', poster: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=500&q=80' },
      { id: 2, title: 'Deep Woods', url: '/videos/forest2.mp4', poster: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=500&q=80' },
      { id: 3, title: 'Mossy Way', url: '/videos/forest3.mp4', poster: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=500&q=80' },
      { id: 4, title: 'Pine Silence', url: '/videos/forest4.mp4', poster: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=500&q=80' },
      { id: 5, title: 'Morning Dew', url: '/videos/forest5.mp4', poster: 'https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?auto=format&fit=crop&w=500&q=80' }
    ]
  },
  {
    id: 'cloudy',
    title: 'Cloudy',
    desc: 'Slow-moving skies and the infinite drift of white clouds.',
    previewUrl: '/videos/cloudy.mp4',
    poster: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-slate-500/10',
    videos: [
      { id: 1, title: 'Infinite Blue', url: '/videos/cloudy1.mp4', poster: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=500&q=80' },
      { id: 2, title: 'Storm Front', url: '/videos/cloudy2.mp4', poster: 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?auto=format&fit=crop&w=500&q=80' },
      { id: 3, title: 'Sunset Drift', url: '/videos/cloudy3.mp4', poster: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=500&q=80' },
      { id: 4, title: 'High Altitude', url: '/videos/cloudy4.mp4', poster: 'https://images.unsplash.com/photo-1519181245277-cffeb31da948?auto=format&fit=crop&w=500&q=80' },
      { id: 5, title: 'Night Sky', url: '/videos/cloudy5.mp4', poster: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=500&q=80' }
    ]
  }
];

const translations: Record<string, Record<string, string>> = {
  'English': {
    title: 'Calm Hub',
    dailyGuider: 'Daily Guider',
    dailyGuiderDesc: 'Your central place for wellness tools and daily support.',
    satisfying_title: 'Satisfying Videos',
    satisfying_desc: 'Intricate loops and satisfying motions to ground your mind.',
    ocean_title: 'Ocean Waves',
    ocean_desc: 'The rhythmic pulse of the sea to calm your breathing.',
    wildlife_title: 'Wildlife',
    wildlife_desc: 'Wide-open landscapes and the gentle movement of the wild.',
    rainy_title: 'Rainy Nature',
    rainy_desc: 'The soothing sound and sight of rain on fresh leaves.',
    forest_title: 'Forest Path',
    forest_desc: 'Sun-dappled paths and the quiet majesty of old trees.',
    cloudy_title: 'Cloudy',
    cloudy_desc: 'Slow-moving skies and the infinite drift of white clouds.'
  },
  'हिंदी': {
    title: 'शांत हब',
    dailyGuider: 'दैनिक मार्गदर्शक',
    dailyGuiderDesc: 'कल्याणकारी उपकरणों और दैनिक सहायता के लिए आपका केंद्रीय स्थान।',
    satisfying_title: 'संतोषजनक वीडियो',
    satisfying_desc: 'आपके दिमाग को जमीन पर रखने के लिए जटिल लूप और संतोषजनक गतियां।',
    ocean_title: 'समुद्र की लहरें',
    ocean_desc: 'आपकी सांसों को शांत करने के लिए समुद्र की लयबद्ध नाड़ी।',
    wildlife_title: 'वन्यजीव',
    wildlife_desc: 'विस्तृत परिदृश्य और जंगली की कोमल गतिविधि।',
    rainy_title: 'बरसाती प्रकृति',
    rainy_desc: 'ताजे पत्तों पर बारिश की शांतिपूर्ण आवाज और दृश्य।',
    forest_title: 'जंगल का रास्ता',
    forest_desc: 'धूप से भरे रास्ते और पुराने पेड़ों की शांत भव्यता।',
    cloudy_title: 'बादल वाला',
    cloudy_desc: 'धीमी गति से बढ़ते आसमान और सफेद बादलों की अनंत漂।'
  },
  'ಕನ್ನಡ': {
    title: 'ಶಾಂತ ಹಬ್',
    dailyGuider: 'ದೈನಂದಿನ ಮಾರ್ಗದರ್ಶಕ',
    dailyGuiderDesc: 'ಕ್ಷೇಮ ಪರಿಕರಗಳು ಮತ್ತು ದೈನಂದಿನ ಬೆಂಬಲಕ್ಕಾಗಿ ನಿಮ್ಮ ಕೇಂದ್ರ ಸ್ಥಾನ.',
    satisfying_title: 'ತೃಪ್ತಿದಾಯಕ ವೀಡಿಯೊಗಳು',
    satisfying_desc: 'ಗೇಜಾಯ್ಟಕಾದ ಮೂಲಗಳು ಮತ್ತು ಅಸ್ತಿತ್ವ ಪರಿಗ್ರಹದೊಂದಿಗೆ ಚಿಕಿತ್ಸೆ.',
    ocean_title: 'ಸಮುದ್ರ ತರಂಗಗಳು',
    ocean_desc: 'ನಿಮ್ಮ ಶ್ವಾಸಕ್ರಿಯೆಯನ್ನು ಶಾಂತ ಮಾಡಲು ಸಮುದ್ರದ ಲಯಬದ್ಧ ನಾಡಿ.',
    wildlife_title: 'ಕಾಡುಮೃಗ',
    wildlife_desc: 'ವ್ಯಾಪಕ ಭೂದೃಶ್ಯಗಳು ಮತ್ತು ವನ್ಯಜೀವನದ ಸಾಮಾನ್ಯ ಚಲನೆ.',
    rainy_title: 'ಮಳೆಯ ಪ್ರಕೃತಿ',
    rainy_desc: 'ಪ್ರಸ್ಫುರ ಎಲೆಗಳ ಮೇಲೆ ಮಳೆಯ ಶಾಂತಿದಾಯಕ ಶಬ್ದ ಮತ್ತು ದೃಶ್ಯ.',
    forest_title: 'ಕಾಡಿನ ದಾರಿ',
    forest_desc: 'ಸೂರ್ಯನ ದಿವ್ಯ ದೃಶ್ಯ ಮಾರ್ಗಗಳು ಮತ್ತು ಹಳೆಯ ಮರಗಳ ಶಾಂತ ಭವ್ಯತೆ.',
    cloudy_title: 'ಮೇಘೋಪಪನ್ನ',
    cloudy_desc: 'ನಿಧಾನವಾಗಿ-ಚಲಿಸುವ ನೀಲಾಕಾಶ ಮತ್ತು ಶ್ವೇತ ಮೇಘಗಳ ಅನಂತ ಪ್ರಸಾರ.'
  },
  'తెలుగు': {
    title: 'ప్రశాంత హబ్',
    dailyGuider: 'దైనందిన మార్గదర్శి',
    dailyGuiderDesc: 'వెల్నెస్ టూల్స్ మరియు రోజువారీ మద్దతు కోసం మీ కేంద్ర స్థానం.',
    satisfying_title: 'సంతృప్తికరమైన వీడియోలు',
    satisfying_desc: 'మీ మనస్సును గ్రౌండ్ చేయడానికి సంక్లిష్ట లూప్‌లు మరియు సంతృప్తికరమైన చలనాలు.',
    ocean_title: 'సముద్ర తరంగాలు',
    ocean_desc: 'మీ శ్వాసను శాంతపరచడానికి సముద్రపు లయబద్ధ నాడి.',
    wildlife_title: 'వన్యజీవి',
    wildlife_desc: 'విస్తృత ప్రకృతిదృశ్యాలు మరియు అడవి యొక్క సున్నితమైన చలనం.',
    rainy_title: 'వర్షపు ప్రకృతి',
    rainy_desc: 'తాజా ఆకుపచ్చపై వర్షం యొక్క ప్రశాంతీకరణ ధ్వని మరియు దృశ్యం.',
    forest_title: 'అడవి మార్గం',
    forest_desc: 'సూర్యకాంతి చల్లని మార్గాలు మరియు పాతైన చెట్ల నిశ్శబ్దమైన గంభీరత.',
    cloudy_title: 'మేఘావృతమైన',
    cloudy_desc: 'నెమ్మదిగా కదిలే ఆకాశాలు మరియు తెలుపు మేఘాల అనంత నిక్షేపణ.'
  },
  'தமிழ்': {
    title: 'அமைதி மையம்',
    dailyGuider: 'தினசரி வழிகாட்டி',
    dailyGuiderDesc: 'நலவாழ்வு கருவிகள் மற்றும் தினசரி ஆதரவிற்கான உங்கள் மைய இடம்.',
    satisfying_title: 'திருப்திகரமான வீடியோக்கள்',
    satisfying_desc: 'உங்கள் மனதை நிலைப்படுத்த சிக்கலான வளைகளும் திருப்திகரமான இயக்கங்களும்.',
    ocean_title: 'கடல் அலைகள்',
    ocean_desc: 'உங்கள் சுவாசத்தை அமைதிபடுத்த கடலின் தாள நாடி.',
    wildlife_title: 'வனவிலங்குகள்',
    wildlife_desc: 'பரந்த நிலப்பரப்பு மற்றும் காட்டுயிர்களின் மென்மையான இயக்கம்.',
    rainy_title: 'மழைப்பொழிவு இயற்கை',
    rainy_desc: 'புதிய இலைகளில் மழைக்கின்ற சாந்தமான ஒலி மற்றும் காட்சி.',
    forest_title: 'வனப்பாதை',
    forest_desc: 'சூரியனே பெரிய பாதை மற்றும் பழைய மரங்களின் அமைதியான கம்பீரம்.',
    cloudy_title: 'மேகம் நிறை',
    cloudy_desc: 'மெதுவாக நகரும் வானங்கள் மற்றும் வெள்ளை மேகங்களின் முடிவிலா பெயர்வு.'
  },
  'Español': {
    title: 'Centro de Calma',
    dailyGuider: 'Guía Diaria',
    dailyGuiderDesc: 'Tu lugar central para herramientas de bienestar y apoyo diario.',
    satisfying_title: 'Videos Satisfactorios',
    satisfying_desc: 'Bucles intrincados y movimientos satisfactorios para anclar tu mente.',
    ocean_title: 'Olas del Océano',
    ocean_desc: 'El pulso rítmico del mar para calmar tu respiración.',
    wildlife_title: 'Vida Silvestre',
    wildlife_desc: 'Paisajes abiertos y el movimiento suave de lo salvaje.',
    rainy_title: 'Naturaleza Lluviosa',
    rainy_desc: 'El sonido y la vista reconfortantes de la lluvia en hojas frescas.',
    forest_title: 'Camino del Bosque',
    forest_desc: 'Senderos salpicados de sol y la majestad tranquila de árboles antiguos.',
    cloudy_title: 'Nublado',
    cloudy_desc: 'Cielos en movimiento lento e infinito movimiento de nubes blancas.'
  },
  'Français': {
    title: 'Hub de Calme',
    dailyGuider: 'Guide Quotidien',
    dailyGuiderDesc: 'Votre lieu central pour les outils de bien-être et le soutien quotidien.',
    satisfying_title: 'Vidéos Satisfaisantes',
    satisfying_desc: 'Des boucles complexes et des mouvements satisfaisants pour ancrer votre esprit.',
    ocean_title: 'Vagues de l\'Océan',
    ocean_desc: 'Le pouls rythmique de la mer pour calmer votre respiration.',
    wildlife_title: 'Faune',
    wildlife_desc: 'Paysages ouverts et mouvement délicat de la faune.',
    rainy_title: 'Nature Pluvieuse',
    rainy_desc: 'Le son et l\'image apaisants de la pluie sur des feuilles fraîches.',
    forest_title: 'Chemin Forestier',
    forest_desc: 'Des sentiers mouchetés de soleil et la majesté tranquille des vieux arbres.',
    cloudy_title: 'Nuageux',
    cloudy_desc: 'Ciels à mouvement lent et dérive infinie de nuages blancs.'
  },
  'Deutsch': {
    title: 'Ruhe-Hub',
    dailyGuider: 'Täglicher Begleiter',
    dailyGuiderDesc: 'Dein zentraler Ort für Wellness-Tools und tägliche Unterstützung.',
    satisfying_title: 'Befriedigende Videos',
    satisfying_desc: 'Komplizierte Schleifen und befriedigende Bewegungen, um deinen Verstand zu verankern.',
    ocean_title: 'Ozeanwellen',
    ocean_desc: 'Der rhythmische Puls des Meeres, um deine Atmung zu beruhigen.',
    wildlife_title: 'Tierwelt',
    wildlife_desc: 'Weit offene Landschaften und die sanfte Bewegung der Wildnis.',
    rainy_title: 'Regnerische Natur',
    rainy_desc: 'Der beruhigende Klang und Anblick von Regen auf frischen Blättern.',
    forest_title: 'Waldweg',
    forest_desc: 'Sonnendurchflutete Pfade und die stille Majestät alter Bäume.',
    cloudy_title: 'Bewölkt',
    cloudy_desc: 'Langsam bewegte Himmel und unendliche Verschiebung weißer Wolken.'
  },
  '日本語': {
    title: '穏やかなハブ',
    dailyGuider: 'デイリー・ガイダー',
    dailyGuiderDesc: 'ウェルネスツールと毎日のサポートのための中心的な場所。',
    satisfying_title: '癒やしの動画',
    satisfying_desc: 'あなたの心を落ち着かせるための複雑なループと満足のいく動き。',
    ocean_title: '海の波',
    ocean_desc: 'あなたの呼吸を落ち着かせるための海のリズミカルなパルス。',
    wildlife_title: '野生動物',
    wildlife_desc: '広大な風景と野生のやさしい動き。',
    rainy_title: '雨の自然',
    rainy_desc: '新鮮な葉の上の雨の落ち着きのある音と光景。',
    forest_title: '森の小道',
    forest_desc: '日差しをたっぷり浴びた小道と古い木の静かな壮大さ。',
    cloudy_title: '曇り',
    cloudy_desc: 'ゆっくり動く空と白い雲の無限漂流。'
  }
};

export default function CalmHub({ onNavigate, language = 'English' }: { onNavigate: (tab: string) => void, language?: string }) {
  const t = translations[language] || translations['English'];
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-text-main tracking-tight">{t.title}</h1>
      </div>

      {/* Daily Guider Section */}
      <section className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-text-main">{t.dailyGuider}</h2>
          <p className="text-sm text-text-muted">{t.dailyGuiderDesc}</p>
        </div>
        <CareCompanion onNavigate={onNavigate} language={language} />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <CalmHubCard 
            key={cat.id}
            title={t[`${cat.id}_title` as keyof typeof t] || cat.title}
            desc={t[`${cat.id}_desc` as keyof typeof t] || cat.desc}
            previewUrl={cat.previewUrl}
            poster={cat.poster}
            gradient={cat.gradient}
            onClick={() => setSelectedCategory(cat)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedCategory && (
          <VideoSection 
            title={t[`${selectedCategory.id}_title` as keyof typeof t] || selectedCategory.title}
            videos={selectedCategory.videos}
            onClose={() => setSelectedCategory(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
