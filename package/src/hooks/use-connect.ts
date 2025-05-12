import React, { useState } from 'react';
import { useMetaMask } from '@/contexts';
import { MetaMaskFunctionErrorCodes } from '@/enums';
import { MetaMaskFunctionReturn } from '@/types';
import { parseError } from '@/utils';

export const useConnect = () => {
  const { provider, setAccount } = useMetaMask();
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const connect = React.useCallback(async (): Promise<MetaMaskFunctionReturn> => {
    if (!provider)
      return {
        success: false,
        errorData: {
          code: MetaMaskFunctionErrorCodes.MetaMaskProviderNotFound,
          message: 'MetaMask provider not found! Please install metamask from: https://metamask.io/download/',
        },
      };

    setIsConnecting(true);
    try {
      const accounts = (await provider.request({
        method: 'eth_requestAccounts',
      })) as Array<string> | undefined;

      if (accounts?.length) setAccount(accounts[0]);
      else setAccount('');

      return { success: true };
    } catch (error: unknown) {
      return {
        success: false,
        errorData: {
          error,
          code: MetaMaskFunctionErrorCodes.MetaMaskConnectionError,
          message: `Connection error: ${parseError(error, 'Error connecting to MetaMask.')}`,
        },
      };
    } finally {
      setIsConnecting(false);
    }
  }, [provider, setAccount]);

  return { connect, isConnecting } as const;
};
