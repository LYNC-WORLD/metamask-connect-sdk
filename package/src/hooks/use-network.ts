import React, { useState } from 'react';
import { Chain_Configurations } from '@/configs';
import { useMetaMask } from '@/contexts';
import { MetaMaskFunctionErrorCodes, SupportedChains } from '@/enums';
import type { MetamaskAddChainConfigurations, MetaMaskFunctionReturn, MetaMaskWalletError } from '@/types';
import { parseError } from '@/utils';

export const useNetwork = () => {
  const { provider, chainId } = useMetaMask();
  const [isSwitchingNetwork, setIsSwitchingNetwork] = useState<boolean>(false);

  const switchNetwork = React.useCallback(
    async (
      chainToConnect: SupportedChains,
      metamaskChainConfigurations?: MetamaskAddChainConfigurations
    ): Promise<MetaMaskFunctionReturn> => {
      if (!provider)
        return {
          success: false,
          errorData: {
            code: MetaMaskFunctionErrorCodes.MetaMaskProviderNotFound,
            message: 'MetaMask provider not found! Please install metamask from: https://metamask.io/download/',
          },
        };

      if (chainId === chainToConnect) return { success: true };

      setIsSwitchingNetwork(true);
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainToConnect }],
        });

        return { success: true };
      } catch (switchError: unknown) {
        if ((switchError as MetaMaskWalletError).code === 4902) {
          const chainConfigurations = metamaskChainConfigurations ?? Chain_Configurations[chainToConnect];
          if (!chainConfigurations) {
            return {
              success: false,
              errorData: {
                code: MetaMaskFunctionErrorCodes.MetaMaskAddNetworkError,
                message:
                  'Add network error: Chain configurations not found for request chain. Try providing a valid chain configuration manually for request chain.',
              },
            };
          }

          try {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [chainConfigurations],
            });

            return { success: true };
          } catch (addError: unknown) {
            return {
              success: false,
              errorData: {
                error: addError,
                code: MetaMaskFunctionErrorCodes.MetaMaskAddNetworkError,
                message: `Add network error: ${parseError(addError, 'Error adding network to MetaMask.')}`,
              },
            };
          }
        }

        return {
          success: false,
          errorData: {
            error: switchError,
            code: MetaMaskFunctionErrorCodes.MetaMaskSwitchNetworkError,
            message: `Switch network error: ${parseError(switchError, 'Error switching network.')}`,
          },
        };
      } finally {
        setIsSwitchingNetwork(false);
      }
    },
    [chainId, provider]
  );

  return { chainId, isSwitchingNetwork, switchNetwork } as const;
};
