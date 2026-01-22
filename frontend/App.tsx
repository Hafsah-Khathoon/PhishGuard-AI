import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation.tsx';
import Hero from './components/Hero.tsx';
import DetectWorkspace from './components/DetectWorkspace.tsx';
import Dashboard from './components/Dashboard.tsx';
import Auth from './components/Auth.tsx';
import Footer from './components/Footer.tsx';

type Page = 'home' | 'detect' | 'dashboard' | 'about' | 'login';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderContent = () => {
    if (currentPage === 'login') {
      return <Auth onSuccess={() => { setIsAuthenticated(true); setCurrentPage('dashboard'); }} />;
    }

    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero 
              onStart={() => setCurrentPage('detect')} 
              onDashboard={() => setCurrentPage('dashboard')} 
            />
            <div className="bg-surface py-24 px-6 border-y border-white/5">
              <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-xs font-black mb-12 uppercase tracking-[0.4em] text-slate-500">Trusted by Global Infrastructure</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 opacity-30 filter grayscale invert">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="Partner" className="h-8 mx-auto object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Partner" className="h-8 mx-auto object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Partner" className="h-8 mx-auto object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" alt="Partner" className="h-8 mx-auto object-contain" />
                </div>
              </div>
            </div>
          </>
        );
      case 'detect':
        return <DetectWorkspace />;
      case 'dashboard':
        return <Dashboard />;
      case 'about':
        return (
          <div className="max-w-4xl mx-auto px-6 py-40 text-center">
            <h2 className="text-5xl font-black mb-6 tracking-tight">Securing the Future</h2>
            <p className="text-xl text-slate-400 leading-relaxed mb-12">
              PhishGuard AI was architected to address the increasing sophistication of social engineering attacks. 
              Our vision is to provide every enterprise with the AI-driven armor 
              needed to navigate the digital world safely.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="glass p-8 rounded-3xl">
                <h3 className="text-brand-cyan font-black mb-4 uppercase tracking-widest text-xs">Proprietary Heuristics</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Our engine goes beyond simple blacklists, performing real-time semantic analysis to identify intent and psychological triggers.</p>
              </div>
              <div className="glass p-8 rounded-3xl">
                <h3 className="text-brand-cyan font-black mb-4 uppercase tracking-widest text-xs">Privacy by Design</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Security shouldn't cost you your privacy. All scans are ephemeral and encrypted at rest during the analysis phase.</p>
              </div>
            </div>
          </div>
        );
      default:
        return <Hero onStart={() => setCurrentPage('detect')} onDashboard={() => setCurrentPage('dashboard')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-cyan/30 selection:text-white">
      {currentPage !== 'login' && (
        <Navigation onNavigate={(p) => setCurrentPage(p as Page)} currentPage={currentPage} />
      )}
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      {currentPage !== 'login' && <Footer />}
    </div>
  );
};

export default App;