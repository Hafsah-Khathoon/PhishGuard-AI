from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from datetime import datetime
import json
import re
from db import DatabaseManager
from model import PhishingDetector

app = Flask(__name__)
CORS(app)

# Initialize database and model
db_manager = DatabaseManager()
detector = PhishingDetector()

# Configure Gemini AI
genai.configure(api_key=os.getenv('GEMINI_API_KEY', 'your-api-key-here'))

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'PhishGuard AI Backend'
    })

@app.route('/api/detect/email', methods=['POST'])
def detect_email_phishing():
    """Detect phishing in email content"""
    try:
        data = request.get_json()
        
        # Validate input
        if not data or not all(key in data for key in ['from', 'subject', 'body']):
            return jsonify({
                'error': 'Missing required fields: from, subject, body'
            }), 400
        
        # Extract email data
        email_data = {
            'from': data['from'],
            'subject': data['subject'],
            'body': data['body']
        }
        
        # Perform detection using Gemini AI
        result = detector.analyze_email(email_data)
        
        # Store result in database
        db_manager.store_detection_result(
            detection_type='email',
            input_data=json.dumps(email_data),
            result=json.dumps(result),
            status=result['status'],
            confidence=result['confidence']
        )
        
        return jsonify(result)
        
    except Exception as e:
        print(f"Error in email detection: {str(e)}")
        return jsonify({
            'status': 'SUSPICIOUS',
            'confidence': 50,
            'label': 'Detection Error',
            'message': 'Unable to analyze email content. Please try again.',
            'indicators': ['System error occurred']
        }), 500

@app.route('/api/detect/url', methods=['POST'])
def detect_url_malicious():
    """Detect malicious URLs"""
    try:
        data = request.get_json()
        
        # Validate input
        if not data or 'url' not in data:
            return jsonify({
                'error': 'Missing required field: url'
            }), 400
        
        url = data['url']
        
        # Perform detection using Gemini AI
        result = detector.analyze_url(url)
        
        # Store result in database
        db_manager.store_detection_result(
            detection_type='url',
            input_data=url,
            result=json.dumps(result),
            status=result['status'],
            confidence=result['confidence']
        )
        
        return jsonify(result)
        
    except Exception as e:
        print(f"Error in URL detection: {str(e)}")
        return jsonify({
            'status': 'SUSPICIOUS',
            'confidence': 45,
            'label': 'Network Error',
            'message': 'Unable to analyze URL. Please try again.',
            'indicators': ['System error occurred']
        }), 500

@app.route('/api/analytics/dashboard', methods=['GET'])
def get_dashboard_analytics():
    """Get analytics data for dashboard"""
    try:
        analytics = db_manager.get_analytics_data()
        return jsonify(analytics)
    except Exception as e:
        print(f"Error getting analytics: {str(e)}")
        return jsonify({
            'error': 'Unable to fetch analytics data'
        }), 500

@app.route('/api/analytics/recent', methods=['GET'])
def get_recent_activity():
    """Get recent detection activity"""
    try:
        limit = request.args.get('limit', 10, type=int)
        recent_activity = db_manager.get_recent_detections(limit)
        return jsonify(recent_activity)
    except Exception as e:
        print(f"Error getting recent activity: {str(e)}")
        return jsonify({
            'error': 'Unable to fetch recent activity'
        }), 500

if __name__ == '__main__':
    # Initialize database tables
    db_manager.init_database()
    
    # Run the Flask app
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )