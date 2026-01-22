
import React from 'react';
import { Shield } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navigation: React.FC<Props> = ({ onNavigate, currentPage }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur border-b border-white/10 h-16 px-6">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <div className="p-1.5 bg-brand-cyan/20 rounded-lg">
            <Shield className="w-6 h-6 text-brand-cyan" />
          </div>
          <span className="text-xl font-bold tracking-tight">PhishGuard <span className="text-brand-cyan">AI</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          {['Home', 'Detect', 'Dashboard', 'About'].map(item => (
            <button
              key={item}
              onClick={() => onNavigate(item.toLowerCase())}
              className={`hover:text-brand-cyan transition-colors ${currentPage === item.toLowerCase() ? 'text-brand-cyan' : ''}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('detect')}
            className="hidden sm:block text-sm font-semibold hover:text-brand-cyan transition"
          >
            Detect Now
          </button>
          <button 
            onClick={() => onNavigate('login')}
            className="px-5 py-2 bg-brand-cyan text-background font-bold rounded-lg hover:scale-105 active:scale-95 transition glow-cyan"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
