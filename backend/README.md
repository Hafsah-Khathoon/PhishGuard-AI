# PhishGuard AI Backend

Python Flask backend for PhishGuard AI with MySQL database integration and Google Gemini AI.

## Features

- **AI-Powered Detection**: Uses Google Gemini 1.5 Flash for email and URL analysis
- **MySQL Database**: Stores detection results and analytics
- **RESTful API**: Clean API endpoints for frontend integration
- **Real-time Analytics**: Dashboard metrics and recent activity tracking
- **Color-coded Results**: 
  - 🟢 **GREEN (SAFE)**: Confidence 80-100%, legitimate content
  - 🟡 **YELLOW (SUSPICIOUS)**: Confidence 40-79%, requires caution
  - 🔴 **RED (PHISHING)**: Confidence 0-39%, high threat detected

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure MySQL Database

1. Install MySQL Workbench and MySQL Server
2. Create a new database connection in MySQL Workbench
3. Update the `.env` file with your database credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=phishguard_ai
```

### 3. Configure Gemini AI

1. Get your API key from [Google AI Studio](https://aistudio.google.com/)
2. Update the `.env` file:

```env
GEMINI_API_KEY=your-actual-gemini-api-key
```

### 4. Run the Backend

```bash
python app.py
```

The backend will start on `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/api/health` - Check if the service is running

### Detection Endpoints
- **POST** `/api/detect/email` - Analyze email for phishing
  ```json
  {
    "from": "sender@example.com",
    "subject": "Email subject",
    "body": "Email content..."
  }
  ```

- **POST** `/api/detect/url` - Analyze URL for malicious content
  ```json
  {
    "url": "https://example.com/suspicious-link"
  }
  ```

### Analytics Endpoints
- **GET** `/api/analytics/dashboard` - Get dashboard analytics
- **GET** `/api/analytics/recent?limit=10` - Get recent detection activity

## Database Schema

### `detections` Table
- `id` - Primary key
- `detection_type` - 'email' or 'url'
- `input_data` - Original input (JSON for email, string for URL)
- `result` - AI analysis result (JSON)
- `status` - 'SAFE', 'SUSPICIOUS', or 'PHISHING'
- `confidence` - Confidence score (0-100)
- `created_at` - Timestamp

### `analytics_summary` Table
- `id` - Primary key
- `date` - Date of summary
- `total_scans` - Total scans for the day
- `safe_count` - Number of safe results
- `suspicious_count` - Number of suspicious results
- `phishing_count` - Number of phishing results
- `email_scans` - Number of email scans
- `url_scans` - Number of URL scans
- `avg_confidence` - Average confidence score

## Color Classification Logic

The system uses a three-tier color classification:

1. **🟢 GREEN (SAFE)**: 
   - Confidence: 80-100%
   - Legitimate emails/URLs with no suspicious indicators
   - Safe to proceed

2. **🟡 YELLOW (SUSPICIOUS)**:
   - Confidence: 40-79%
   - Some warning signs detected
   - Proceed with caution, manual review recommended

3. **🔴 RED (PHISHING)**:
   - Confidence: 0-39%
   - High likelihood of phishing/malicious content
   - Block immediately, do not interact

## Development

- The backend automatically creates database tables on first run
- All detection results are stored for analytics and improvement
- CORS is enabled for frontend integration
- Debug mode is enabled for development