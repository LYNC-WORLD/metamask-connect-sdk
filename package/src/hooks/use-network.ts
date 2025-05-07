import React from 'react';
import { Chain_Configurations } from '@/configs';
import { useMetaMask } from '@/contexts';
import { SupportedChains } from '@/enums';
import type { MetamaskAddChainConfigurations, NetworkSwitchError } from '@/types';

export const useNetwork = () => {
  const { provider, chainId } = useMetaMask();

  const switchNetwork = React.useCallback(
    async (chainToConnect: SupportedChains, metamaskChainConfigurations?: MetamaskAddChainConfigurations) => {
      if (!provider) return false;
      if (chainId === chainToConnect) return true;

      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainToConnect }],
        });

        return true;
      } catch (switchError: unknown) {
        if ((switchError as NetworkSwitchError).code === 4902) {
          const chainConfigurations = metamaskChainConfigurations ?? Chain_Configurations[chainToConnect];
          if (!chainConfigurations) {
            console.error(
              'Error switching network: Chain configurations not found for request chain. Try providing a valid chain configuration manually for request chain.'
            );
            return false;
          }

          try {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [chainConfigurations],
            });

            return true;
          } catch (addError: unknown) {
            console.error('Error adding network to metamask:', addError);
            return false;
          }
        }
        console.error('Error switching network:', switchError);
        return false;
      }
    },
    [chainId, provider]
  );

  return { chainId, switchNetwork } as const;
};
