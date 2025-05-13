import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'lync-wallet-sdk/build/index.css';
import './index.css';
import { ThemeProvider } from './context/theme';
import { MetaMaskConnectExample } from './app';
import LYNCMetaMaskProvider from 'lync-wallet-sdk';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <LYNCMetaMaskProvider autoConnect>
          <MetaMaskConnectExample />
        </LYNCMetaMaskProvider>
      </ThemeProvider>
    </QueryClientProvider>
    <Toaster position="top-right" reverseOrder />
  </StrictMode>
);
