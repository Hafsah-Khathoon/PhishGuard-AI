import mysql.connector
from mysql.connector import Error
import os
from datetime import datetime, timedelta
from typing import Dict, List, Any
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class DatabaseManager:
    """MySQL database manager for PhishGuard AI"""
    
    def __init__(self):
        self.config = {
            'host': os.getenv('DB_HOST', 'localhost'),
            'port': int(os.getenv('DB_PORT', 3306)),
            'user': os.getenv('DB_USER', 'root'),
            'password': os.getenv('DB_PASSWORD', ''),
            'database': os.getenv('DB_NAME', 'phishguard_ai'),
            'charset': 'utf8mb4',
            'collation': 'utf8mb4_unicode_ci',
            'autocommit': True
        }
    
    def get_connection(self):
        """Get database connection"""
        try:
            connection = mysql.connector.connect(**self.config)
            return connection
        except Error as e:
            print(f"Error connecting to MySQL: {e}")
            return None
    
    def init_database(self):
        """Initialize database and create tables"""
        try:
            print(f"Connecting to MySQL with user: {self.config['user']}")
            
            # First, create database if it doesn't exist
            temp_config = self.config.copy()
            temp_config.pop('database', None)
            
            connection = mysql.connector.connect(**temp_config)
            cursor = connection.cursor()
            
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {self.config['database']} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
            cursor.close()
            connection.close()
            
            print(f"Database {self.config['database']} created/verified successfully")
            
            # Now connect to the database and create tables
            connection = self.get_connection()
            if connection:
                cursor = connection.cursor()
                
                # Create detections table
                cursor.execute("""
                    CREATE TABLE IF NOT EXISTS detections (
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
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
                """)
                
                # Create analytics summary table
                cursor.execute("""
                    CREATE TABLE IF NOT EXISTS analytics_summary (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        date DATE NOT NULL UNIQUE,
                        total_scans INT DEFAULT 0,
                        safe_count INT DEFAULT 0,
                        suspicious_count INT DEFAULT 0,
                        phishing_count INT DEFAULT 0,
                        email_scans INT DEFAULT 0,
                        url_scans INT DEFAULT 0,
                        avg_confidence DECIMAL(5,2) DEFAULT 0.00,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                        INDEX idx_date (date)
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
                """)
                
                connection.commit()
                cursor.close()
                connection.close()
                print("Database tables created successfully")
                
        except Error as e:
            print(f"Error initializing database: {e}")
            print("The application will continue but database features may not work properly.")
    
    def store_detection_result(self, detection_type: str, input_data: str, 
                             result: str, status: str, confidence: int):
        """Store detection result in database"""
        try:
            connection = self.get_connection()
            if connection:
                cursor = connection.cursor()
                
                query = """
                    INSERT INTO detections (detection_type, input_data, result, status, confidence)
                    VALUES (%s, %s, %s, %s, %s)
                """
                
                cursor.execute(query, (detection_type, input_data, result, status, confidence))
                connection.commit()
                
                # Update analytics summary
                self._update_analytics_summary(cursor, detection_type, status, confidence)
                connection.commit()
                
                cursor.close()
                connection.close()
                
        except Error as e:
            print(f"Error storing detection result: {e}")
    
    def _update_analytics_summary(self, cursor, detection_type: str, status: str, confidence: int):
        """Update daily analytics summary"""
        today = datetime.now().date()
        
        # Insert or update today's summary
        query = """
            INSERT INTO analytics_summary (date, total_scans, safe_count, suspicious_count, 
                                         phishing_count, email_scans, url_scans, avg_confidence)
            VALUES (%s, 1, %s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE
                total_scans = total_scans + 1,
                safe_count = safe_count + %s,
                suspicious_count = suspicious_count + %s,
                phishing_count = phishing_count + %s,
                email_scans = email_scans + %s,
                url_scans = url_scans + %s,
                avg_confidence = (avg_confidence * (total_scans - 1) + %s) / total_scans
        """
        
        safe_inc = 1 if status == 'SAFE' else 0
        suspicious_inc = 1 if status == 'SUSPICIOUS' else 0
        phishing_inc = 1 if status == 'PHISHING' else 0
        email_inc = 1 if detection_type == 'email' else 0
        url_inc = 1 if detection_type == 'url' else 0
        
        cursor.execute(query, (
            today, safe_inc, suspicious_inc, phishing_inc, email_inc, url_inc, confidence,
            safe_inc, suspicious_inc, phishing_inc, email_inc, url_inc, confidence
        ))
    
    def get_analytics_data(self) -> Dict[str, Any]:
        """Get analytics data for dashboard"""
        try:
            connection = self.get_connection()
            if connection:
                cursor = connection.cursor(dictionary=True)
                
                # Get today's stats
                today = datetime.now().date()
                cursor.execute("""
                    SELECT * FROM analytics_summary WHERE date = %s
                """, (today,))
                today_stats = cursor.fetchone()
                
                # Get last 7 days for trend
                week_ago = today - timedelta(days=7)
                cursor.execute("""
                    SELECT * FROM analytics_summary 
                    WHERE date >= %s AND date <= %s 
                    ORDER BY date DESC
                """, (week_ago, today))
                week_stats = cursor.fetchall()
                
                # Get total counts
                cursor.execute("""
                    SELECT 
                        COUNT(*) as total_detections,
                        SUM(CASE WHEN status = 'SAFE' THEN 1 ELSE 0 END) as total_safe,
                        SUM(CASE WHEN status = 'SUSPICIOUS' THEN 1 ELSE 0 END) as total_suspicious,
                        SUM(CASE WHEN status = 'PHISHING' THEN 1 ELSE 0 END) as total_phishing,
                        AVG(confidence) as avg_confidence
                    FROM detections
                """)
                totals = cursor.fetchone()
                
                cursor.close()
                connection.close()
                
                return {
                    'today': today_stats or {
                        'total_scans': 0, 'safe_count': 0, 'suspicious_count': 0, 
                        'phishing_count': 0, 'email_scans': 0, 'url_scans': 0, 'avg_confidence': 0
                    },
                    'week_trend': week_stats,
                    'totals': totals or {
                        'total_detections': 0, 'total_safe': 0, 'total_suspicious': 0,
                        'total_phishing': 0, 'avg_confidence': 0
                    }
                }
                
        except Error as e:
            print(f"Error getting analytics data: {e}")
            return {
                'today': {'total_scans': 0, 'safe_count': 0, 'suspicious_count': 0, 
                         'phishing_count': 0, 'email_scans': 0, 'url_scans': 0, 'avg_confidence': 0},
                'week_trend': [],
                'totals': {'total_detections': 0, 'total_safe': 0, 'total_suspicious': 0,
                          'total_phishing': 0, 'avg_confidence': 0}
            }
    
    def get_recent_detections(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Get recent detection results"""
        try:
            connection = self.get_connection()
            if connection:
                cursor = connection.cursor(dictionary=True)
                
                cursor.execute("""
                    SELECT id, detection_type, status, confidence, created_at,
                           CASE 
                               WHEN detection_type = 'email' THEN JSON_UNQUOTE(JSON_EXTRACT(input_data, '$.subject'))
                               ELSE SUBSTRING(input_data, 1, 50)
                           END as display_text
                    FROM detections 
                    ORDER BY created_at DESC 
                    LIMIT %s
                """, (limit,))
                
                results = cursor.fetchall()
                cursor.close()
                connection.close()
                
                return results
                
        except Error as e:
            print(f"Error getting recent detections: {e}")
            return []