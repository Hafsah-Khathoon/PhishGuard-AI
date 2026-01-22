import React, { useState, useEffect } from 'react';
import { Mail, Globe, Upload, FileText, Search, Loader2, ShieldCheck, Eye, CheckCircle, X, AlertCircle } from 'lucide-react';
import { detectPhishingEmail, detectMaliciousURL } from '../services/geminiService.ts';
import { DetectionResult, EmailData } from '../types.ts';
import ResultCard from './ResultCard.tsx';

const DetectWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'email' | 'url'>('email');
  const [emailData, setEmailData] = useState<EmailData>({ from: '', subject: '', body: '' });
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [useForTraining, setUseForTraining] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [parseSuccess, setParseSuccess] = useState(false);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
  };

  const parseEmailFile = (content: string, fileName: string): EmailData => {
    // Check if it's an .eml file (standard email format)
    if (fileName.toLowerCase().endsWith('.eml')) {
      // Parse .eml format
      const lines = content.split(/\r?\n/);
      let from = '';
      let subject = '';
      let body = '';
      let inBody = false;
      let bodyLines: string[] = [];
      let currentHeader = '';

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check if we've reached the body (empty line after headers)
        if (line.trim() === '' && !inBody && currentHeader === '') {
          inBody = true;
          continue;
        }
        
        if (!inBody) {
          // Parse headers
          if (line.match(/^[A-Za-z-]+:/)) {
            // New header line
            const colonIndex = line.indexOf(':');
            const headerName = line.substring(0, colonIndex).toLowerCase();
            const headerValue = line.substring(colonIndex + 1).trim();
            
            if (headerName === 'from') {
              from = headerValue;
              currentHeader = 'from';
            } else if (headerName === 'subject') {
              subject = headerValue;
              currentHeader = 'subject';
            } else {
              currentHeader = '';
            }
          } else if ((line.startsWith(' ') || line.startsWith('\t')) && currentHeader !== '') {
            // Continuation of previous header (folded header)
            const continuation = line.trim();
            if (currentHeader === 'from') {
              from += ' ' + continuation;
            } else if (currentHeader === 'subject') {
              subject += ' ' + continuation;
            }
          } else {
            currentHeader = '';
          }
        } else {
          // We're in the body
          bodyLines.push(line);
        }
      }

      body = bodyLines.join('\n').trim();
      
      // Clean up email addresses (extract email from "Name <email@domain.com>" format)
      const emailMatch = from.match(/<([^>]+)>/);
      if (emailMatch) {
        from = emailMatch[1];
      } else {
        // If no angle brackets, check if it's just an email
        const simpleEmailMatch = from.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
        if (simpleEmailMatch) {
          from = simpleEmailMatch[1];
        }
      }
      from = from.trim();
      
      // Decode quoted-printable and base64 if needed (basic handling)
      subject = subject.replace(/=\?([^?]+)\?([QB])\?([^?]+)\?=/gi, (match, charset, encoding, text) => {
        if (encoding.toUpperCase() === 'Q') {
          // Quoted-printable
          return text.replace(/=([0-9A-F]{2})/gi, (m, hex) => String.fromCharCode(parseInt(hex, 16)));
        }
        return text;
      });
      
      return { from, subject, body };
    } else {
      // For .txt files, just use the content as body
      return { from: '', subject: '', body: content };
    }
  };

  const handleClear = () => {
    setEmailData({ from: '', subject: '', body: '' });
    setUrl('');
    setResult(null);
    setUploadedFileName(null);
    setParseSuccess(false);
    setShowPreview(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setParseSuccess(false);
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const text = event.target?.result as string;
          if (!text || text.trim() === '') {
            throw new Error('File is empty');
          }
          const parsed = parseEmailFile(text, file.name);
          setEmailData(parsed);
          
          // Check if parsing was successful (especially for .eml files)
          if (file.name.toLowerCase().endsWith('.eml')) {
            if (parsed.from || parsed.subject || parsed.body) {
              setParseSuccess(true);
              showNotification('success', `Email parsed successfully! ${parsed.from ? 'From: ' + parsed.from : ''} ${parsed.subject ? 'Subject: ' + parsed.subject : ''}`);
            } else {
              showNotification('error', 'Could not parse email file. Please check the file format.');
            }
          } else {
            setParseSuccess(true);
            showNotification('success', 'File loaded successfully!');
          }
        } catch (error) {
          showNotification('error', `Error reading file: ${error instanceof Error ? error.message : 'Unknown error'}`);
          setUploadedFileName(null);
        }
      };
      reader.onerror = () => {
        showNotification('error', 'Error reading file. Please try again.');
        setUploadedFileName(null);
      };
      reader.readAsText(file);
    }
  };

  const handleEmailPredict = async () => {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await detectPhishingEmail(emailData);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleURLPredict = async () => {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await detectMaliciousURL(url);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-24 right-6 z-50 glass p-4 rounded-xl border ${
          notification.type === 'success' 
            ? 'border-brand-green/30 bg-brand-green/10' 
            : 'border-brand-red/30 bg-brand-red/10'
        } slide-in-from-right shadow-lg min-w-[300px]`}>
          <div className="flex items-center gap-3">
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-brand-red flex-shrink-0" />
            )}
            <p className={`text-sm font-bold flex-1 ${
              notification.type === 'success' ? 'text-brand-green' : 'text-brand-red'
            }`}>
              {notification.message}
            </p>
            <button
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="text-center mb-16">
        <h2 className="text-5xl font-black mb-4 tracking-tighter">Detection Workspace</h2>
        <p className="text-slate-400 text-lg">AI-powered threat detection using NLP, URL analysis, and machine learning</p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="flex p-1.5 bg-surface rounded-2xl border border-white/10">
          <button
            onClick={() => { setActiveTab('email'); setResult(null); setUploadedFileName(null); setParseSuccess(false); handleClear(); }}
            className={`flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'email' ? 'bg-brand-cyan text-background' : 'hover:bg-white/5 text-slate-400'}`}
          >
            <Mail className="w-5 h-5" /> EMAIL PHISHING
          </button>
          <button
            onClick={() => { setActiveTab('url'); setResult(null); setUploadedFileName(null); setParseSuccess(false); handleClear(); }}
            className={`flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'url' ? 'bg-brand-cyan text-background' : 'hover:bg-white/5 text-slate-400'}`}
          >
            <Globe className="w-5 h-5" /> WEBSITE SCANNER
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl animate-in slide-in-from-left duration-500">
            {activeTab === 'email' ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xl tracking-tight">Intercept Email</h3>
                  <div className="flex items-center gap-2">
                    {uploadedFileName && (
                      <span className={`text-xs font-mono px-3 py-1.5 border rounded-lg flex items-center gap-2 ${
                        parseSuccess 
                          ? 'text-brand-green bg-brand-green/10 border-brand-green/30' 
                          : 'text-brand-cyan bg-brand-cyan/10 border-brand-cyan/30'
                      }`}>
                        {parseSuccess && <CheckCircle className="w-3 h-3" />}
                        {uploadedFileName}
                      </span>
                    )}
                    {(emailData.from || emailData.subject || emailData.body) && (
                      <button
                        onClick={handleClear}
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold transition hover:border-brand-red/30 text-slate-400 hover:text-brand-red"
                        title="Clear all fields"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <label className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold cursor-pointer transition hover:border-brand-cyan/30">
                      <Upload className="w-4 h-4" /> UPLOAD EMAIL
                      <input type="file" className="hidden" accept=".eml,.txt,.msg" onChange={handleFileUpload} />
                    </label>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Sender Address</label>
                    <input 
                      type="text" 
                      placeholder="e.g., billing@service-paypal.com"
                      className="w-full bg-background border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-brand-cyan transition font-mono"
                      value={emailData.from}
                      onChange={e => setEmailData(prev => ({ ...prev, from: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Subject Line</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Urgent Action Required"
                      className="w-full bg-background border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-brand-cyan transition"
                      value={emailData.subject}
                      onChange={e => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Email Body</label>
                    <textarea 
                      rows={10}
                      placeholder="Paste content here..."
                      className="w-full bg-background border border-white/10 rounded-xl p-4 text-sm font-sans focus:outline-none focus:border-brand-cyan transition resize-none leading-relaxed"
                      value={emailData.body}
                      onChange={e => setEmailData(prev => ({ ...prev, body: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="train" 
                      className="w-4 h-4 rounded border-white/20 bg-background text-brand-cyan focus:ring-brand-cyan" 
                      checked={useForTraining}
                      onChange={e => setUseForTraining(e.target.checked)}
                    />
                    <label htmlFor="train" className="text-xs text-slate-400 font-bold select-none cursor-pointer">Help train system</label>
                  </div>
                  <button 
                    onClick={() => setShowPreview(!showPreview)}
                    className="text-xs font-bold text-brand-cyan flex items-center gap-1 hover:underline"
                  >
                    <Eye className="w-3 h-3" /> {showPreview ? 'Hide' : 'Preview'} Rendered
                  </button>
                </div>

                <button 
                  onClick={handleEmailPredict}
                  disabled={isLoading || !emailData.body}
                  className="w-full py-5 bg-brand-cyan text-background font-black rounded-2xl hover:scale-[1.02] active:scale-98 disabled:opacity-50 transition-all flex items-center justify-center gap-3 text-lg glow-cyan"
                >
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <FileText className="w-6 h-6" />}
                  {isLoading ? 'ANALYZING...' : 'PREDICT EMAIL RISK'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="font-bold text-xl tracking-tight">Scan Malicious URL</h3>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Globe className="w-6 h-6 text-slate-500" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="https://secure-login.net/verify"
                    className="w-full bg-background border border-white/10 rounded-2xl py-5 pl-14 pr-4 text-base focus:outline-none focus:border-brand-cyan transition font-mono"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleURLPredict}
                  disabled={isLoading || !url}
                  className="w-full py-5 bg-brand-cyan text-background font-black rounded-2xl hover:scale-[1.02] active:scale-98 disabled:opacity-50 transition-all flex items-center justify-center gap-3 text-lg glow-cyan"
                >
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
                  {isLoading ? 'SCANNING...' : 'SCAN WEBSITE'}
                </button>
              </div>
            )}
          </div>
          
          {showPreview && activeTab === 'email' && emailData.body && (
            <div className="glass p-8 rounded-3xl animate-in fade-in slide-in-from-bottom duration-500 border-brand-cyan/20">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-black text-brand-cyan uppercase tracking-widest">Rendered Preview</h4>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-slate-400 hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-white text-slate-900 p-6 rounded-xl min-h-[100px] text-sm leading-relaxed shadow-inner">
                <div className="border-b border-slate-200 pb-3 mb-4 space-y-1">
                  <p><strong className="text-slate-700">From:</strong> <span className={emailData.from ? 'text-slate-900' : 'text-slate-500 italic'}>{emailData.from || '(No Sender)'}</span></p>
                  <p><strong className="text-slate-700">Subject:</strong> <span className={emailData.subject ? 'text-slate-900' : 'text-slate-500 italic'}>{emailData.subject || '(No Subject)'}</span></p>
                </div>
                <div className="whitespace-pre-wrap text-slate-800">{emailData.body || '(No body content)'}</div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8 sticky top-24">
          <div className="glass p-1 rounded-3xl overflow-hidden min-h-[400px]">
            {isLoading ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 bg-surface/50">
                <Loader2 className="w-12 h-12 text-brand-cyan animate-spin mb-6" />
                <h3 className="text-2xl font-black mb-2 tracking-tight">AI Reasoning...</h3>
                <p className="text-slate-400 max-w-xs mx-auto text-sm">Performing semantic and structural heuristics using Gemini 3.</p>
              </div>
            ) : result ? (
              <ResultCard result={result} />
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 opacity-30">
                <ShieldCheck className="w-24 h-24 mb-6 text-slate-500" />
                <h3 className="text-2xl font-black mb-2 tracking-tight">Standby</h3>
                <p className="text-slate-400 max-w-xs mx-auto text-sm">Provide input on the left to begin analysis.</p>
              </div>
            )}
          </div>

          {/* Quick Tips Section */}
          {!result && !isLoading && (
            <div className="glass p-6 rounded-2xl border border-white/10">
              <h4 className="text-xs font-black text-brand-cyan uppercase tracking-widest mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Quick Tips
              </h4>
              <div className="space-y-3 text-xs text-slate-400">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-brand-green mt-0.5 flex-shrink-0" />
                  <p>Upload <span className="text-brand-cyan font-mono">.eml</span> files to auto-fill email fields</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-brand-green mt-0.5 flex-shrink-0" />
                  <p>Use the preview button to see how the email will render</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-brand-green mt-0.5 flex-shrink-0" />
                  <p>All fields are optional - analyze partial emails too</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetectWorkspace;