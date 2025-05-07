import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { MetaMaskConnectExample } from './app';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MetaMaskConnectExample />
  </StrictMode>
);
