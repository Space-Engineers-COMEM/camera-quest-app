import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import 'intro.js/introjs.css';
import './css/index.scss';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback="...is loading">
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
