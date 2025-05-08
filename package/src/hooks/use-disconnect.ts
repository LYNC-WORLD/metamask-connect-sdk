import React, { useState } from 'react';
import { useMetaMask } from '@/contexts';

export const useDisconnect = () => {
  const { provider, setAccount } = useMetaMask();
  const [isDisconnecting, setIsDisconnecting] = useState<boolean>(false);

  const disconnect = React.useCallback(async () => {
    if (!provider) return false;

    setIsDisconnecting(true);
    try {
      await provider.request({
        method: 'wallet_revokePermissions',
        params: [{ eth_accounts: {} }],
      });
      setAccount('');

      return true;
    } catch (error: unknown) {
      console.error('Error disconnecting to MetaMask: ', error);
      return false;
    } finally {
      setIsDisconnecting(false);
    }
  }, [provider, setAccount]);

  return { disconnect, isDisconnecting } as const;
};
