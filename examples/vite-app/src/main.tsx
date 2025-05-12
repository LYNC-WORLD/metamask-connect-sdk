import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'lync-wallet-sdk/build/index.css';
import './index.css';
import { ThemeProvider } from './context/theme';
import { MetaMaskConnectExample } from './app';
import LYNCMetaMaskProvider from 'lync-wallet-sdk';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light">
      <LYNCMetaMaskProvider autoConnect>
        <MetaMaskConnectExample />
      </LYNCMetaMaskProvider>
    </ThemeProvider>
    <Toaster position="top-right" reverseOrder />
  </StrictMode>
);
