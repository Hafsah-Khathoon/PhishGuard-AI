# PhishGuard AI - Complete Full-Stack Application

A sophisticated AI-powered phishing detection system with React frontend and Python Flask backend, featuring MySQL database integration and Google Gemini AI.

![PhishGuard AI](https://img.shields.io/badge/AI-Powered-blue) ![React](https://img.shields.io/badge/React-18-blue) ![Python](https://img.shields.io/badge/Python-3.8+-green) ![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange)

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

### 1. Clone the Repository

```bash
git clone https://github.com/Hafsah-Khathoon/PhishGuard-ai.git
cd PhishGuard-ai
```

### 2. Backend Setup (Python Flask)

```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env file with your credentials:
# - GEMINI_API_KEY=your-gemini-api-key
# - DB_PASSWORD=your-mysql-password

# Run the backend server
python app.py
```

Backend runs on: `http://localhost:5000`

### 3. Frontend Setup (React)

```bash
cd frontend

# Install Node.js dependencies
npm install

# Run the frontend development server
npm run dev
```

Frontend runs on: `http://localhost:3000`

### 4. Database Setup (MySQL)

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
- **Google Generative AI** (Gemini 2.5 Flash)
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

## � Performance

- **Fast Detection**: Sub-second AI analysis
- **Efficient Database**: Optimized queries with indexes
- **Caching**: Smart result caching for repeated queries
- **Scalable Architecture**: Ready for production deployment

## 🚀 Deployment

### Local Development
1. Follow the Quick Start Guide above
2. Both servers will run locally for development

### Production Deployment
- **Frontend**: Build with `npm run build` and serve statically
- **Backend**: Use Gunicorn or similar WSGI server
- **Database**: Configure MySQL for production
- **Environment**: Set production environment variables

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful language model capabilities
- **React Team** for the excellent frontend framework
- **Flask Community** for the lightweight backend framework
- **MySQL** for reliable database management

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Hafsah-Khathoon/PhishGuard-ai/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

---

**Built with ❤️ using React, Python Flask, MySQL, and Google Gemini AI**

⭐ **Star this repository if you found it helpful!**