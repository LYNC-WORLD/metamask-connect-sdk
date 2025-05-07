import React from 'react';
import { useMetaMask } from '@/contexts';

export const useConnect = () => {
  const { provider, setAccount } = useMetaMask();

  const connect = React.useCallback(async () => {
    if (!provider) return false;

    try {
      const accounts = (await provider.request({
        method: 'eth_requestAccounts',
      })) as Array<string> | undefined;

      if (accounts?.length) setAccount(accounts[0]);
      else setAccount('');

      return true;
    } catch (error: unknown) {
      console.error('Error connecting to MetaMask: ', error);
      return false;
    }
  }, [provider, setAccount]);

  return { connect } as const;
};
