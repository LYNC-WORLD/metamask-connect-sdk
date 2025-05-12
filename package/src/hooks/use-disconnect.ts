import React, { useState } from 'react';
import { useMetaMask } from '@/contexts';
import { MetaMaskFunctionErrorCodes } from '@/enums';
import { MetaMaskFunctionReturn } from '@/types';
import { parseError } from '@/utils';

export const useDisconnect = () => {
  const { provider, setAccount } = useMetaMask();
  const [isDisconnecting, setIsDisconnecting] = useState<boolean>(false);

  const disconnect = React.useCallback(async (): Promise<MetaMaskFunctionReturn> => {
    if (!provider)
      return {
        success: false,
        errorData: {
          code: MetaMaskFunctionErrorCodes.MetaMaskProviderNotFound,
          message: 'MetaMask provider not found! Please install metamask from: https://metamask.io/download/',
        },
      };

    setIsDisconnecting(true);
    try {
      await provider.request({
        method: 'wallet_revokePermissions',
        params: [{ eth_accounts: {} }],
      });
      setAccount('');

      return { success: true };
    } catch (error: unknown) {
      return {
        success: false,
        errorData: {
          error,
          code: MetaMaskFunctionErrorCodes.MetaMaskDisconnectError,
          message: `Disconnect error: ${parseError(error, 'Error disconnecting to MetaMask.')}`,
        },
      };
    } finally {
      setIsDisconnecting(false);
    }
  }, [provider, setAccount]);

  return { disconnect, isDisconnecting } as const;
};
