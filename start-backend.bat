@echo off
echo ========================================
echo Starting PhishGuard AI Backend
echo ========================================
echo.

cd backend

echo Checking for .env file...
if not exist .env (
    echo.
    echo ERROR: .env file not found!
    echo.
    echo Please create a .env file in the backend folder.
    echo.
    echo You can use env-template.txt as a reference:
    echo   1. Copy env-template.txt to .env
    echo   2. Edit .env and add your actual values:
    echo      - GEMINI_API_KEY (get from https://aistudio.google.com/)
    echo      - DB_PASSWORD (your MySQL password)
    echo.
    if exist env-template.txt (
        echo Template file found at: backend\env-template.txt
    )
    echo.
    pause
    exit /b 1
)

echo Installing/updating Python dependencies...
pip install -r requirements.txt

echo.
echo Starting Flask backend server...
echo Backend will run on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

python app.py

pause
