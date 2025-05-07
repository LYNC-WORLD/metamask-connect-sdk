import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@lyncworld/metamask-connect-sdk/build/index.css';
import './index.css';
import { ThemeProvider } from './context/theme';
import { MetaMaskConnectExample } from './app';
import LYNCMetaMaskProvider from '@lyncworld/metamask-connect-sdk';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light">
      <LYNCMetaMaskProvider autoConnect>
        <MetaMaskConnectExample />
      </LYNCMetaMaskProvider>
    </ThemeProvider>
  </StrictMode>
);
