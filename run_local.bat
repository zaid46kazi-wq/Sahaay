@echo off
setlocal

echo.
echo ======================================================
echo   Sahaay Platform - Launcher
echo ======================================================
echo.

:: Change directory to the script's location
cd /d "%~dp0"

:: Step 1: Start AI Service
echo [1/3] Starting AI Service (Python)...
start "Sahaay AI Service" cmd /k "cd ai-service && .\venv\Scripts\activate && python main.py"

:: Step 2: Start Backend
echo [2/3] Starting Backend Server (Node.js)...
start "Sahaay Backend" cmd /k "cd backend && node server.js"

:: Step 3: Start Frontend
echo [3/3] Starting Frontend (Vite)...
start "Sahaay Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ------------------------------------------------------
echo   All services have been launched!
echo.
echo   - AI Service: http://localhost:8000
echo   - Backend:    http://localhost:3001
echo   - Frontend:   Check the Vite window for URL (usually http://localhost:5173)
echo ------------------------------------------------------
echo.
echo Close the individual terminal windows to stop the services.
echo.
pause
