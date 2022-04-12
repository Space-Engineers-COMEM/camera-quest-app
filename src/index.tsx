import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import 'intro.js/introjs.css';
import './index.css';
=======
import './index.scss';
>>>>>>> main
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
