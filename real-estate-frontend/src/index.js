// /frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './App.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter> {/* Wrap App with BrowserRouter here */}
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
