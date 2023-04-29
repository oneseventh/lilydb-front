import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';
import { HelmetProvider } from 'react-helmet-async';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ReactDOM from 'react-dom';

serviceWorkerRegistration.register();

const element = (
  <CookiesProvider>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </CookiesProvider>
);

const rootElement = document.getElementById('root');

// createRoot(rootElement).render(element);

createRoot(rootElement).render(element);




  // <React.StrictMode>

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
