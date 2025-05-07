import React, { useContext } from 'react';
import type { MetamaskProviderStates } from '@/types';

export const initialStates = {
  account: '',
  chainId: '',
  provider: undefined,
  setAccount: () => null,
} as const satisfies MetamaskProviderStates;

export const MetaMaskContext = React.createContext<Readonly<MetamaskProviderStates>>(initialStates);
export const useMetaMask = () => {
  const context = useContext(MetaMaskContext);
  if (!context) {
    throw new Error('useMetamask should be used withing a LYNCMetaMaskProvider!');
  }

  return context;
};
