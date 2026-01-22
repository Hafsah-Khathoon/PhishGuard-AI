import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

window.onerror = function(message, source, lineno, colno, error) {
  console.error("PhishGuard Global Error:", message, "at", source, lineno, colno);
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Critical Error: Root element not found.");
}