import React from 'react';
import { useMetaMask } from '@/contexts';

export const useDisconnect = () => {
  const { provider, setAccount } = useMetaMask();

  const disconnect = React.useCallback(async () => {
    if (!provider) return false;

    try {
      await provider.request({
        method: 'wallet_revokePermissions',
        params: [{ eth_accounts: {} }],
      });
      setAccount('');

      return true;
    } catch (error: unknown) {
      console.error('Error connecting to MetaMask: ', error);
      return false;
    }
  }, [provider, setAccount]);

  return { disconnect } as const;
};
