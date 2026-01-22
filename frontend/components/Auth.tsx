
import React from 'react';
import { Shield, Lock, Mail } from 'lucide-react';

interface Props {
  onSuccess: () => void;
}

const Auth: React.FC<Props> = ({ onSuccess }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
       {/* Background Decor */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-md glass p-10 rounded-3xl animate-in fade-in zoom-in duration-500 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-brand-cyan/10 rounded-2xl mb-4">
            <Shield className="w-10 h-10 text-brand-cyan" />
          </div>
          <h2 className="text-3xl font-black tracking-tight">Access Secure Node</h2>
          <p className="text-slate-500 mt-2">Enter credentials to monitor your network</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Work Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-4 h-4 text-slate-600" />
              </div>
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-brand-cyan transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Access Token / Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-slate-600" />
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-brand-cyan transition"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs px-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-slate-300">
              <input type="checkbox" className="rounded border-white/20 bg-background text-brand-cyan" /> Remember device
            </label>
            <button className="text-brand-cyan font-bold hover:underline">Reset Token</button>
          </div>

          <button 
            onClick={onSuccess}
            className="w-full py-4 bg-brand-cyan text-background font-black rounded-xl hover:scale-[1.02] active:scale-98 transition-all glow-cyan mt-4"
          >
            LOGIN SECURELY
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-slate-500">
            Don't have an enterprise account? <button className="text-brand-cyan font-bold hover:underline">Contact Sales</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
