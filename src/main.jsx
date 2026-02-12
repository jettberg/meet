import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import atatus from 'atatus-spa';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

console.log('Initializing Atatus...');
atatus.config('7b807a1af528491889095798cf77f29b').install();
console.log('Atatus installed');
atatus.notify(new Error('Test Atatus Setup'));


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
serviceWorkerRegistration.register();
