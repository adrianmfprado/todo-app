import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './styles/style.scss';

// Register service worker for notifications
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/notification-sw.js').then(reg => {
    console.log('Service Worker registered with scope:', reg.scope);
  }).catch(err => {
    console.error('Service Worker registration failed:', err);
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);