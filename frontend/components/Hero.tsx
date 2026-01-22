
import React from 'react';
import { ShieldCheck, Zap, BarChart3, Lock, ChevronRight } from 'lucide-react';

interface Props {
  onStart: () => void;
  onDashboard: () => void;
}

const Hero: React.FC<Props> = ({ onStart, onDashboard }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Dynamic Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" 
          alt="Cyber Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-cyan/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-green/10 rounded-full blur-[100px] animate-pulse delay-700" />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold uppercase tracking-widest mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
          </span>
          AI Threat Intelligence Active
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
          PhishGuard <span className="text-brand-cyan">AI</span>
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-medium text-slate-300 mb-6">
          Predict Phishing Attacks Before They Strike
        </h2>
        
        <p className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Harness the power of Gemini 3 Flash to detect sophisticated social engineering, 
          spoofed domains, and malicious payloads in real-time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={onStart}
            className="group w-full sm:w-auto px-10 py-5 bg-brand-cyan text-background font-black rounded-2xl hover:scale-105 active:scale-98 transition-all glow-cyan flex items-center justify-center gap-3 text-lg"
          >
            START DETECTION <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={onDashboard}
            className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 font-bold rounded-2xl transition-all flex items-center justify-center gap-3 text-lg backdrop-blur-sm"
          >
            VIEW DASHBOARD
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-32 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl w-full">
        {[
          { icon: <Lock />, label: 'Advanced NLP Detection', desc: 'Analyzes intent and urgency' },
          { icon: <ShieldCheck />, label: 'URL Deep Scan', desc: 'Checks domain aging & SSL' },
          { icon: <Zap />, label: 'Zero-Day Prediction', desc: 'Catches previously unknown threats' },
          { icon: <BarChart3 />, label: 'Enterprise Metrics', desc: 'Real-time security analytics' }
        ].map((f, i) => (
          <div key={i} className="flex flex-col p-6 rounded-2xl glass hover:border-brand-cyan/30 transition-colors group">
            <div className="p-3 bg-brand-cyan/10 rounded-xl text-brand-cyan w-fit mb-4 group-hover:bg-brand-cyan group-hover:text-background transition-colors">
              {/* Fix: Explicitly cast to React.ReactElement<any> to resolve the className prop mismatch error in cloneElement */}
              {React.cloneElement(f.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
            </div>
            <h4 className="text-sm font-black uppercase tracking-wider text-white mb-2">{f.label}</h4>
            <p className="text-xs text-slate-500 font-medium">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
