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
📌 Problem Statement
Phishing attacks are increasing exponentially, with cybercriminals using sophisticated social engineering techniques to deceive users. Traditional email filters and URL blacklists are insufficient against:

Zero-day phishing campaigns using new domains
AI-generated convincing content that mimics legitimate communications
Domain spoofing with subtle character variations
Urgency-based psychological manipulation tactics
Multi-vector attacks combining emails and malicious URLs
Current solutions lack real-time AI analysis and user-friendly interfaces for comprehensive threat detection.

🎯 Objective
Develop an intelligent, real-time phishing detection system that:

Analyzes emails and URLs using advanced AI models
Provides instant risk assessment with confidence scoring
Offers intuitive visual feedback through color-coded results
Maintains comprehensive analytics for security monitoring
Scales efficiently for enterprise deployment
Integrates seamlessly with existing security workflows
💡 Proposed Solution
PhishGuard AI - A full-stack web application leveraging Google Gemini 2.5 Flash for intelligent threat detection:

Core Components:
🎨 React Frontend - Modern, responsive cybersecurity-themed UI
🐍 Python Flask Backend - RESTful API with AI integration
🗄️ MySQL Database - Persistent storage and analytics
🤖 Gemini AI Integration - Advanced natural language processing
📊 Real-time Dashboard - Live threat monitoring and metrics
🚀 Key Features
🔍 AI-Powered Detection
Email Content Analysis - NLP-based phishing detection
URL Threat Scanning - Domain spoofing and malicious link identification
Real-time Processing - Sub-second analysis and response
Multi-language Support - Detects threats in various languages
🎨 User Experience
Color-coded Risk Assessment - Instant visual threat indication
Interactive Dashboard - Real-time security analytics
Responsive Design - Works on desktop, tablet, and mobile
Accessibility Compliant - WCAG 2.1 standards
📊 Analytics & Monitoring
Threat Trend Analysis - Historical attack pattern visualization
Performance Metrics - Accuracy rates and system health
Recent Activity Feed - Live threat detection updates
Exportable Reports - Compliance and audit documentation
🔧 Enterprise Features
RESTful API - Easy integration with existing systems
Scalable Architecture - Handles high-volume scanning
Database Persistence - Long-term threat intelligence storage
Deployment Ready - Docker, cloud, and on-premise options
🧠 AI & Detection Logic
Google Gemini 2.5 Flash Integration
# AI Analysis Pipeline
def analyze_content(input_data):
    1. Content Preprocessing
    2. Gemini AI Analysis
    3. Pattern Recognition
    4. Confidence Scoring
    5. Result Classification
Detection Algorithms
🔤 Natural Language Processing - Analyzes text for urgency, deception
🌐 Domain Analysis - Checks for spoofing, suspicious TLDs
📧 Email Header Inspection - Sender authenticity verification
🔗 URL Pattern Matching - Identifies malicious link structures
📊 Behavioral Analysis - Detects social engineering tactics
Machine Learning Features
Context Understanding - Analyzes email/URL in full context
Semantic Analysis - Understands meaning beyond keywords
Threat Intelligence - Leverages global threat databases
Adaptive Learning - Improves accuracy over time
🚦 Risk Levels & Confidence Score
Three-Tier Classification System
🟢 SAFE (80-100% Confidence)
Characteristics: Legitimate content, verified senders, trusted domains
Action: Allow/Proceed normally
Examples: Official bank communications, known business emails
🟡 SUSPICIOUS (40-79% Confidence)
Characteristics: Some warning signs, unclear intent, promotional content
Action: Proceed with caution, manual review recommended
Examples: Unexpected promotions, unfamiliar senders
🔴 PHISHING (0-39% Confidence)
Characteristics: High threat indicators, deceptive content, malicious intent
Action: Block immediately, report to security team
Examples: Fake login pages, urgent account warnings, suspicious attachments
Confidence Score Calculation
confidence_factors = {
    'sender_reputation': 25%,
    'content_analysis': 30%,
    'url_legitimacy': 20%,
    'urgency_indicators': 15%,
    'grammar_quality': 10%
}
🏗️ System Architecture
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (React)       │◄──►│   (Flask)       │◄──►│   (MySQL)       │
│                 │    │                 │    │                 │
│ • UI Components │    │ • API Endpoints │    │ • Detection     │
│ • State Mgmt    │    │ • AI Integration│    │   Results       │
│ • Routing       │    │ • Business Logic│    │ • Analytics     │
│ • Visualizations│    │ • Data Validation│   │ • User Data     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         └──────────────►│  Gemini AI      │◄─────────────┘
                        │  (Google)       │
                        │                 │
                        │ • NLP Analysis  │
                        │ • Threat Detect │
                        │ • Confidence    │
                        └─────────────────┘
Data Flow
User Input → Frontend captures email/URL
API Request → Frontend sends data to Flask backend
AI Processing → Backend queries Gemini AI for analysis
Database Storage → Results stored in MySQL
Response → Classified result returned to frontend
Visualization → Color-coded result displayed to user
🛠️ Technology Stack
Frontend Technologies
⚛️ React 18 - Modern component-based UI framework
📘 TypeScript - Type-safe JavaScript development
⚡ Vite - Fast build tool and development server
🎨 Tailwind CSS - Utility-first styling framework
📊 Recharts - Interactive data visualization library
🎯 Lucide React - Beautiful icon components
Backend Technologies
🐍 Python 3.9+ - Core programming language
🌶️ Flask - Lightweight web framework
🤖 Google Generative AI - Gemini 2.5 Flash model
🔗 Flask-CORS - Cross-origin resource sharing
📦 Python-dotenv - Environment variable management
Database & Storage
🗄️ MySQL 8.0+ - Relational database management
🔌 MySQL Connector - Python database driver
📊 JSON Columns - Flexible result storage
🔍 Indexed Queries - Optimized performance
DevOps & Deployment
🐳 Docker - Containerization support
🚀 GitHub Actions - CI/CD pipeline
☁️ Cloud Ready - AWS, GCP, Heroku compatible
🌐 GitHub Pages - Frontend demo deployment
🗄️ Database (MySQL)
Schema Design
detections Table
CREATE TABLE detections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    detection_type ENUM('email', 'url') NOT NULL,
    input_data TEXT NOT NULL,
    result JSON NOT NULL,
    status ENUM('SAFE', 'SUSPICIOUS', 'PHISHING') NOT NULL,
    confidence INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_type (detection_type),
    INDEX idx_created (created_at)
);
analytics_summary Table
CREATE TABLE analytics_summary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    total_scans INT DEFAULT 0,
    safe_count INT DEFAULT 0,
    suspicious_count INT DEFAULT 0,
    phishing_count INT DEFAULT 0,
    email_scans INT DEFAULT 0,
    url_scans INT DEFAULT 0,
    avg_confidence DECIMAL(5,2) DEFAULT 0.00,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
Data Relationships
One-to-Many: Daily summaries aggregate multiple detections
JSON Storage: Flexible result structure for AI responses
Indexed Queries: Fast retrieval for dashboard analytics
Time-series Data: Historical trend analysis
🖥️ Application Workflow
1. Email Analysis Workflow
User Input → Validation → AI Analysis → Classification → Storage → Response
    ↓           ↓            ↓             ↓            ↓         ↓
📧 Email    ✅ Format    🤖 Gemini    🚦 Risk Level  💾 MySQL  🎨 UI Display
Content     Check        Analysis      Assignment     Storage   Color-coded
2. URL Scanning Workflow
URL Input → Domain Check → AI Analysis → Threat Assessment → Database → Result
    ↓          ↓             ↓              ↓               ↓         ↓
🌐 URL     🔍 Domain     🤖 Content    🚨 Risk Score    💾 Store   📊 Dashboard
Submission  Validation    Analysis      Calculation      Result    Update
3. Dashboard Analytics Workflow
Database Query → Data Aggregation → Visualization → Real-time Updates
       ↓               ↓                ↓                ↓
   📊 MySQL        📈 Calculate      🎨 Charts       🔄 Live Feed
   Historical      Metrics &         & Graphs        Auto-refresh
   Data           Trends
⚙️ Installation & Setup
Prerequisites
Node.js 18+ for frontend development
Python 3.8+ for backend services
MySQL 8.0+ for database storage
Gemini API Key from Google AI Studio
Quick Start
# 1. Clone Repository
git clone https://github.com/Hafsah-Khathoon/PhishGuard-ai.git
cd PhishGuard-ai

# 2. Backend Setup
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your credentials
python app.py

# 3. Frontend Setup
cd ../frontend
npm install
npm run dev

# 4. Access Application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
Environment Configuration
# Backend (.env)
GEMINI_API_KEY=your-gemini-api-key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your-mysql-password
DB_NAME=phishguard_ai
🔐 Security Considerations
Data Protection
🔒 Input Validation - All user inputs sanitized and validated
🛡️ SQL Injection Prevention - Parameterized queries only
🔐 API Key Security - Environment variables for sensitive data
🚫 CORS Configuration - Controlled cross-origin access
Privacy & Compliance
📝 Data Minimization - Only necessary data stored
⏰ Data Retention - Configurable retention policies
🔍 Audit Logging - Comprehensive activity tracking
🌍 GDPR Compliance - Privacy-by-design architecture
System Security
🔥 Rate Limiting - Prevents abuse and DoS attacks
🔐 HTTPS Enforcement - Encrypted data transmission
🛡️ Error Handling - Secure error messages
📊 Monitoring - Real-time security metrics
📊 Results & Output Samples
Email Analysis Result
{
  "status": "PHISHING",
  "confidence": 15,
  "label": "High Risk Phishing Attempt",
  "message": "This email contains multiple phishing indicators including urgency tactics, suspicious links, and sender spoofing.",
  "indicators": [
    "Urgent action required language",
    "Suspicious domain in links",
    "Sender domain mismatch",
    "Grammar inconsistencies"
  ]
}
URL Scanning Result
{
  "status": "SAFE",
  "confidence": 98,
  "label": "Legitimate Website",
  "message": "This URL appears to be from a trusted domain with valid SSL certificate and no suspicious patterns.",
  "indicators": [
    "Verified SSL certificate",
    "Established domain age",
    "No suspicious patterns",
    "Matches legitimate site structure"
  ]
}
Dashboard Metrics
{
  "today": {
    "total_scans": 247,
    "safe_count": 189,
    "suspicious_count": 42,
    "phishing_count": 16,
    "accuracy_rate": 89.2
  },
  "trends": {
    "threat_increase": "+8.3%",
    "accuracy_improvement": "+2.1%"
  }
}
🌍 Use Cases
🏢 Enterprise Security
Email Gateway Integration - Real-time email filtering
Security Awareness Training - Educational threat examples
Incident Response - Rapid threat classification
Compliance Reporting - Audit trail and metrics
🏫 Educational Institutions
Student Protection - Campus-wide phishing prevention
Cybersecurity Education - Interactive learning tool
Research Platform - Threat intelligence gathering
IT Security Training - Hands-on security experience
🏥 Healthcare Organizations
HIPAA Compliance - Protected health information security
Medical Device Protection - IoT security monitoring
Staff Training - Healthcare-specific threat awareness
Patient Data Protection - Multi-layer security approach
🏛️ Government Agencies
National Security - Critical infrastructure protection
Citizen Services - Public-facing application security
Inter-agency Communication - Secure information sharing
Threat Intelligence - Coordinated defense strategies
🔮 Future Scope
🤖 Advanced AI Features
Multi-model Ensemble - Combine multiple AI models for higher accuracy
Behavioral Analysis - User interaction pattern recognition
Predictive Threats - Anticipate attack campaigns
Custom Model Training - Organization-specific threat patterns
🔗 Integration Capabilities
SIEM Integration - Security Information and Event Management
Email Provider APIs - Direct Gmail, Outlook integration
Browser Extensions - Real-time web browsing protection
Mobile Applications - iOS and Android native apps
📊 Enhanced Analytics
Machine Learning Insights - Automated threat pattern discovery
Threat Intelligence Feeds - External threat data integration
Predictive Analytics - Forecast attack trends
Custom Dashboards - Role-based security views
🌐 Scalability Improvements
Microservices Architecture - Distributed system design
Auto-scaling Infrastructure - Cloud-native deployment
Edge Computing - Reduced latency processing
Global CDN - Worldwide threat detection network
🔐 Advanced Security
Zero Trust Architecture - Comprehensive security model
Blockchain Integration - Immutable threat intelligence
Quantum-resistant Encryption - Future-proof security
Federated Learning - Privacy-preserving AI training
🎯 Project Impact
PhishGuard AI represents a significant advancement in cybersecurity, combining cutting-edge AI technology with intuitive user experience to create a comprehensive phishing detection solution. The system's real-time analysis, visual feedback, and enterprise-ready architecture make it suitable for organizations of all sizes seeking robust protection against evolving cyber threats.

🚀 Live Demo: https://hafsah-khathoon.github.io/PhishGuard-ai/ 📂 Repository: https://github.com/Hafsah-Khathoon/PhishGuard-ai

Built with ❤️ using React, Python Flask, MySQL, and Google Gemini AI




