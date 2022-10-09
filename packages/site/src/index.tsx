import React from 'react';
import ReactDOM from 'react-dom/client';
import Metablast from './Metablast';

/* eslint-disable */
import './styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Metablast />
  </React.StrictMode>,
);
