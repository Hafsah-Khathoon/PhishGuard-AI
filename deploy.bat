@echo off
echo 🚀 PhishGuard AI Deployment Script
echo ==================================

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check if MySQL is installed
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ MySQL is not installed. Please install MySQL 8.0+ first.
    pause
    exit /b 1
)

echo ✅ All prerequisites found!

REM Setup Backend
echo 📦 Setting up backend...
cd backend
copy .env.example .env
echo ⚠️  Please edit backend\.env with your credentials before running!
pip install -r requirements.txt
cd ..

REM Setup Frontend
echo 📦 Setting up frontend...
cd frontend
npm install
cd ..

echo 🎉 Setup complete!
echo.
echo Next steps:
echo 1. Edit backend\.env with your Gemini API key and MySQL credentials
echo 2. Start backend: cd backend ^&^& python app.py
echo 3. Start frontend: cd frontend ^&^& npm run dev
echo 4. Open http://localhost:3000 in your browser
pause