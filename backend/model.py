import google.generativeai as genai
import json
import re
import os
from typing import Dict, Any

class PhishingDetector:
    """AI-powered phishing detection using Google Gemini"""
    
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-2.5-flash')
    
    def analyze_email(self, email_data: Dict[str, str]) -> Dict[str, Any]:
        """
        Analyze email content for phishing indicators
        
        Args:
            email_data: Dictionary containing 'from', 'subject', 'body'
            
        Returns:
            Dictionary with detection results
        """
        try:
            prompt = f"""
            Analyze this email for phishing indicators and return ONLY a valid JSON response:

            From: {email_data['from']}
            Subject: {email_data['subject']}
            Body: {email_data['body']}

            Analyze for:
            1. Sender authenticity and domain spoofing
            2. Urgency and pressure tactics
            3. Suspicious links or attachments
            4. Grammar and spelling errors
            5. Request for sensitive information
            6. Impersonation of legitimate services

            Return ONLY this JSON format:
            {{
                "status": "SAFE|SUSPICIOUS|PHISHING",
                "confidence": 0-100,
                "label": "Brief classification",
                "message": "Detailed explanation",
                "indicators": ["list", "of", "detected", "warning", "signs"]
            }}
            """
            
            response = self.model.generate_content(prompt)
            result_text = response.text.strip()
            
            # Extract JSON from response
            json_match = re.search(r'\{.*\}', result_text, re.DOTALL)
            if json_match:
                result = json.loads(json_match.group())
                
                # Validate and normalize the result
                return self._validate_result(result)
            else:
                return self._fallback_result("Could not parse AI response")
                
        except Exception as e:
            print(f"Error in email analysis: {str(e)}")
            return self._fallback_result("Analysis failed due to system error")
    
    def analyze_url(self, url: str) -> Dict[str, Any]:
        """
        Analyze URL for malicious indicators
        
        Args:
            url: URL to analyze
            
        Returns:
            Dictionary with detection results
        """
        try:
            prompt = f"""
            Analyze this URL for phishing or malicious intent and return ONLY a valid JSON response:

            URL: {url}

            Check for:
            1. Domain spoofing (similar to legitimate sites)
            2. Suspicious TLDs and subdomains
            3. URL shortening services
            4. Suspicious path patterns
            5. HTTPS usage and certificate validity indicators
            6. Known malicious domains

            Return ONLY this JSON format:
            {{
                "status": "SAFE|SUSPICIOUS|PHISHING",
                "confidence": 0-100,
                "label": "Brief classification",
                "message": "Detailed explanation",
                "indicators": ["list", "of", "detected", "warning", "signs"]
            }}
            """
            
            response = self.model.generate_content(prompt)
            result_text = response.text.strip()
            
            # Extract JSON from response
            json_match = re.search(r'\{.*\}', result_text, re.DOTALL)
            if json_match:
                result = json.loads(json_match.group())
                
                # Validate and normalize the result
                return self._validate_result(result)
            else:
                return self._fallback_result("Could not parse AI response")
                
        except Exception as e:
            print(f"Error in URL analysis: {str(e)}")
            return self._fallback_result("Analysis failed due to system error")
    
    def _validate_result(self, result: Dict[str, Any]) -> Dict[str, Any]:
        """Validate and normalize AI response"""
        
        # Ensure required fields exist
        validated = {
            'status': result.get('status', 'SUSPICIOUS'),
            'confidence': min(max(int(result.get('confidence', 50)), 0), 100),
            'label': result.get('label', 'Analysis Complete'),
            'message': result.get('message', 'Detection analysis completed'),
            'indicators': result.get('indicators', ['AI analysis performed'])
        }
        
        # Validate status values
        if validated['status'] not in ['SAFE', 'SUSPICIOUS', 'PHISHING']:
            validated['status'] = 'SUSPICIOUS'
        
        # Ensure indicators is a list
        if not isinstance(validated['indicators'], list):
            validated['indicators'] = ['Analysis indicators unavailable']
        
        return validated
    
    def _fallback_result(self, error_message: str) -> Dict[str, Any]:
        """Return fallback result when analysis fails"""
        return {
            'status': 'SUSPICIOUS',
            'confidence': 50,
            'label': 'Analysis Error',
            'message': error_message,
            'indicators': ['System error - manual review recommended']
        }