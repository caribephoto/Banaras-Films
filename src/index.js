import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

// Suppress console logs in production
if (import.meta.env.PROD) {
  console.log = () => { };
  console.debug = () => { };
  console.info = () => { };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
