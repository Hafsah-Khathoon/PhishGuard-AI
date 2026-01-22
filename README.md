# PhishGuard AI - Complete Full-Stack Application

A sophisticated AI-powered phishing detection system with React frontend and Python Flask backend, featuring MySQL database integration and Google Gemini AI.

## 🎯 Project Structure

```
phishguard-ai/
├── frontend/          # React + TypeScript frontend
│   ├── components/    # React components
│   ├── services/      # API service layer
│   ├── package.json   # Frontend dependencies
│   └── ...
├── backend/           # Python Flask backend
│   ├── app.py         # Main Flask application
│   ├── model.py       # AI detection logic
│   ├── db.py          # MySQL database manager
│   ├── requirements.txt
│   └── README.md
└── README.md          # This file
```

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18+) for frontend
- **Python** (3.8+) for backend
- **MySQL Server** and **MySQL Workbench**
- **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

### 1. Backend Setup (Python Flask)

```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Configure environment variables
# Edit .env file with your credentials:
# - GEMINI_API_KEY=your-gemini-api-key
# - DB_PASSWORD=your-mysql-password

# Run the backend server
python app.py
```

Backend runs on: `http://localhost:5000`

### 2. Frontend Setup (React)

```bash
cd frontend

# Install Node.js dependencies
npm install

# Run the frontend development server
npm run dev
```

Frontend runs on: `http://localhost:3000`

### 3. Database Setup (MySQL)

1. **Install MySQL Workbench** and create a new connection
2. **Update backend/.env** with your MySQL credentials
3. **Run the backend** - it will automatically create the database and tables

## 🎨 Features

### 🔍 AI-Powered Detection
- **Email Analysis**: Detects phishing emails using NLP and content analysis
- **URL Scanning**: Identifies malicious websites and domain spoofing
- **Real-time Processing**: Instant results with confidence scoring

### 🎯 Color-Coded Risk Assessment
- 🟢 **GREEN (SAFE)**: 80-100% confidence - Legitimate content
- 🟡 **YELLOW (SUSPICIOUS)**: 40-79% confidence - Proceed with caution  
- 🔴 **RED (PHISHING)**: 0-39% confidence - High threat detected

### 📊 Analytics Dashboard
- **Real-time Metrics**: Scans, threats blocked, accuracy rates
- **Trend Analysis**: Visual charts showing threat patterns over time
- **Recent Activity**: Live feed of latest detections
- **Historical Data**: Stored in MySQL for long-term analysis

### 🎨 Modern UI Design
- **Cybersecurity Theme**: Dark mode with glassmorphism effects
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Professional transitions and loading states
- **Accessibility**: WCAG compliant interface

## 🔧 API Endpoints

### Detection
- `POST /api/detect/email` - Analyze email content
- `POST /api/detect/url` - Scan URL for threats

### Analytics  
- `GET /api/analytics/dashboard` - Dashboard metrics
- `GET /api/analytics/recent` - Recent detection activity

### Health
- `GET /api/health` - Service status check

## 🗄️ Database Schema

### `detections` Table
Stores all detection results with full analysis data

### `analytics_summary` Table  
Daily aggregated statistics for dashboard metrics

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons

### Backend
- **Flask** web framework
- **Google Generative AI** (Gemini 1.5 Flash)
- **MySQL Connector** for database
- **Flask-CORS** for cross-origin requests

### Database
- **MySQL 8.0+** for data persistence
- **JSON columns** for flexible result storage
- **Indexed queries** for fast analytics

## 🔒 Security Features

- **Input Validation**: All API inputs are validated
- **SQL Injection Protection**: Parameterized queries
- **CORS Configuration**: Controlled cross-origin access
- **Error Handling**: Graceful failure modes
- **Data Encryption**: Secure API key management

## 📈 Performance

- **Fast Detection**: Sub-second AI analysis
- **Efficient Database**: Optimized queries with indexes
- **Caching**: Smart result caching for repeated queries
- **Scalable Architecture**: Ready for production deployment

## 🚀 Deployment Ready

The application is structured for easy deployment:
- **Frontend**: Can be built and served statically
- **Backend**: WSGI-compatible for production servers
- **Database**: Standard MySQL setup
- **Environment**: Configurable via environment variables

## 🎯 Usage

1. **Start both servers** (backend on :5000, frontend on :3000)
2. **Open the web interface** at http://localhost:3000
3. **Navigate to "Detect"** to analyze emails or URLs
4. **View results** with color-coded risk assessment
5. **Check dashboard** for analytics and trends

## 🔧 Configuration

### Backend Environment (.env)
```env
GEMINI_API_KEY=your-gemini-api-key-here
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your-mysql-password
DB_NAME=phishguard_ai
```

### Frontend Configuration
The frontend automatically connects to `http://localhost:5000` for the backend API.

## 📝 License

This project is built for educational and demonstration purposes. Please ensure you have proper API keys and database credentials configured before running.

---

**Built with ❤️ using React, Python Flask, MySQL, and Google Gemini AI**