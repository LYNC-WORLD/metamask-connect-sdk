import React, { useState } from 'react';
import { useMetaMask } from '@/contexts';

export const useConnect = () => {
  const { provider, setAccount } = useMetaMask();
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const connect = React.useCallback(async () => {
    if (!provider) return false;

    setIsConnecting(true);
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
    } finally {
      setIsConnecting(false);
    }
  }, [provider, setAccount]);

  return { connect, isConnecting } as const;
};
