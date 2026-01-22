
import React from 'react';

export type DetectionResult = {
  status: 'SAFE' | 'SUSPICIOUS' | 'PHISHING';
  confidence: number;
  label: string;
  message: string;
  indicators: string[];
};

export interface EmailData {
  from: string;
  subject: string;
  body: string;
}

export interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
}