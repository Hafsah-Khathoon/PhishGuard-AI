
import { DetectionResult, EmailData } from "../types";

const API_BASE_URL = 'http://localhost:5000/api';

export async function detectPhishingEmail(data: EmailData): Promise<DetectionResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/detect/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: data.from,
        subject: data.subject,
        body: data.body
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (e) {
    console.error("Failed to analyze email", e);
    return {
      status: 'SUSPICIOUS',
      confidence: 50,
      label: 'Connection Error',
      message: 'Unable to connect to detection service. Please ensure the backend is running.',
      indicators: ['Backend connection failed']
    };
  }
}

export async function detectMaliciousURL(url: string): Promise<DetectionResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/detect/url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (e) {
    console.error("Failed to analyze URL", e);
    return {
      status: 'SUSPICIOUS',
      confidence: 45,
      label: 'Connection Error',
      message: 'Unable to connect to detection service. Please ensure the backend is running.',
      indicators: ['Backend connection failed']
    };
  }
}

export async function getDashboardAnalytics() {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/dashboard`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (e) {
    console.error("Failed to get analytics", e);
    return null;
  }
}

export async function getRecentActivity(limit: number = 10) {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/recent?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (e) {
    console.error("Failed to get recent activity", e);
    return [];
  }
}