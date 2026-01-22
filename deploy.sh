#!/bin/bash

# PhishGuard AI Deployment Script

echo "🚀 PhishGuard AI Deployment Script"
echo "=================================="

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed. Please install MySQL 8.0+ first."
    exit 1
fi

echo "✅ All prerequisites found!"

# Setup Backend
echo "📦 Setting up backend..."
cd backend
cp .env.example .env
echo "⚠️  Please edit backend/.env with your credentials before running!"
pip install -r requirements.txt
cd ..

# Setup Frontend
echo "📦 Setting up frontend..."
cd frontend
npm install
cd ..

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env with your Gemini API key and MySQL credentials"
echo "2. Start backend: cd backend && python app.py"
echo "3. Start frontend: cd frontend && npm run dev"
echo "4. Open http://localhost:3000 in your browser"