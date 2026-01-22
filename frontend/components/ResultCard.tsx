
import React from 'react';
import { ShieldCheck, ShieldAlert, ShieldX, AlertTriangle, Info, Ban, FileWarning } from 'lucide-react';
import { DetectionResult } from '../types';

interface Props {
  result: DetectionResult;
}

const ResultCard: React.FC<Props> = ({ result }) => {
  const styles = {
    SAFE: {
      bg: 'bg-brand-green/10 border-brand-green/30',
      text: 'text-brand-green',
      icon: <ShieldCheck className="w-8 h-8 text-brand-green" />,
      accent: 'border-brand-green/20'
    },
    SUSPICIOUS: {
      bg: 'bg-brand-yellow/10 border-brand-yellow/30',
      text: 'text-brand-yellow',
      icon: <AlertTriangle className="w-8 h-8 text-brand-yellow" />,
      accent: 'border-brand-yellow/20'
    },
    PHISHING: {
      bg: 'bg-brand-red/10 border-brand-red/30',
      text: 'text-brand-red',
      icon: <ShieldX className="w-8 h-8 text-brand-red" />,
      accent: 'border-brand-red/20'
    }
  };

  const style = styles[result.status];

  return (
    <div className={`p-6 rounded-xl border ${style.bg} animate-in fade-in zoom-in duration-300`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          {style.icon}
          <div>
            <h3 className={`text-xl font-bold uppercase tracking-wider ${style.text}`}>
              {result.label}
            </h3>
            <p className="text-sm opacity-80">{result.message}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-black ${style.text}`}>
            {result.confidence}%
          </div>
          <div className="text-xs uppercase font-medium opacity-60">Confidence Score</div>
        </div>
      </div>

      <div className={`mt-6 pt-4 border-t ${style.accent}`}>
        <h4 className="text-xs font-semibold uppercase opacity-50 mb-3 flex items-center gap-2">
          <Info className="w-3 h-3" /> Detected Indicators
        </h4>
        <div className="flex flex-wrap gap-2">
          {result.indicators.map((ind, i) => (
            <span key={i} className="px-3 py-1 bg-black/30 rounded-full text-xs font-mono border border-white/5">
              {ind}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        {result.status !== 'SAFE' ? (
          <>
            <button className="flex-1 py-2 px-4 bg-brand-red hover:bg-red-600 text-white font-bold rounded-lg transition flex items-center justify-center gap-2">
              <Ban className="w-4 h-4" /> Block Thread
            </button>
            <button className="flex-1 py-2 px-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition flex items-center justify-center gap-2">
              <FileWarning className="w-4 h-4" /> Report
            </button>
          </>
        ) : (
          <button className="flex-1 py-2 px-4 bg-brand-green/20 text-brand-green font-bold rounded-lg cursor-default border border-brand-green/30">
            Secure Asset
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
