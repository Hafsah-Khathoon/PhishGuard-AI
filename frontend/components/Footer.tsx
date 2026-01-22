
import React from 'react';
import { Shield, Twitter, Github, Linkedin, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-black/50 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-6 h-6 text-brand-cyan" />
              <span className="text-xl font-bold tracking-tight">PhishGuard <span className="text-brand-cyan">AI</span></span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Empowering organizations with next-gen AI to eliminate phishing threats before they reach the inbox. Built for performance and security.
            </p>
            <div className="flex gap-4">
              <button className="p-2 bg-white/5 hover:bg-brand-cyan/20 hover:text-brand-cyan rounded-lg transition"><Twitter className="w-4 h-4" /></button>
              <button className="p-2 bg-white/5 hover:bg-brand-cyan/20 hover:text-brand-cyan rounded-lg transition"><Github className="w-4 h-4" /></button>
              <button className="p-2 bg-white/5 hover:bg-brand-cyan/20 hover:text-brand-cyan rounded-lg transition"><Linkedin className="w-4 h-4" /></button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Detection</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><button className="hover:text-brand-cyan transition">Email Scanning</button></li>
              <li><button className="hover:text-brand-cyan transition">URL Analysis</button></li>
              <li><button className="hover:text-brand-cyan transition">Threat Intelligence</button></li>
              <li><button className="hover:text-brand-cyan transition">Real-time API</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><button className="hover:text-brand-cyan transition">Documentation</button></li>
              <li><button className="hover:text-brand-cyan transition">Developer Portal</button></li>
              <li><button className="hover:text-brand-cyan transition">Safety Reports</button></li>
              <li><button className="hover:text-brand-cyan transition">Support Center</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Status</h4>
            <div className="p-4 rounded-xl glass border-brand-green/20">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-green mb-2">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" /> ALL SYSTEMS OPERATIONAL
              </div>
              <p className="text-[10px] text-slate-500 mb-4 font-mono leading-tight">
                Global Edge Network latency: 42ms<br />
                Last threat sync: 3s ago
              </p>
              <button className="text-[10px] uppercase font-black tracking-widest flex items-center gap-1 text-slate-300 hover:text-white transition">
                Status Page <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
          <p className="text-xs text-slate-600">
            &copy; 2026 PhishGuard AI. All rights reserved. Powered by Google Gemini.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-600">
            <button className="hover:text-slate-400">Privacy Policy</button>
            <button className="hover:text-slate-400">Terms of Service</button>
            <button className="hover:text-slate-400">Legal Information</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
