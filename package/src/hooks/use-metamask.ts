import { useCallback, useEffect, useState } from 'react';
import { useSyncProviders } from './use-sync-providers';
import { EIP1193Provider, MetamaskAddChainConfigurations, NetworkSwitchError } from '@/types';
import { SupportedChains } from '@/enums';
import { Chain_Configurations } from '@/configs';

type UseMetaMaskOptions = {
  autoConnect: boolean;
};

export const useMetaMask = (options?: UseMetaMaskOptions) => {
  const [provider, setProvider] = useState<EIP1193Provider | undefined>(undefined);
  const [account, setAccount] = useState<string>('');
  const [chainId, setChainId] = useState<string>('');

  const providers = useSyncProviders();

  const connect = useCallback(async () => {
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
  }, [provider]);

  const switchNetwork = useCallback(
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

  useEffect(() => {
    const metamaskProvider = providers?.find((provider) => provider.info.name === 'MetaMask');
    setProvider(metamaskProvider?.provider);
  }, [providers]);

  useEffect(() => {
    const handleAccountsChanged = (accounts: unknown) => {
      if ((accounts as Array<string>).length !== 0) {
        const currentAccount = (accounts as Array<string>)[0];
        setAccount(currentAccount);
      } else {
        setAccount('');
      }
    };

    if (provider && !account && options?.autoConnect) {
      connect();
      provider.on('accountsChanged', handleAccountsChanged);
    }
  }, [account, connect, provider]);

  useEffect(() => {
    const detectChainId = async () => {
      if (!provider) {
        setChainId('');
        return;
      }

      try {
        const chainId = (await provider.request({ method: 'eth_chainId' })) as string;
        setChainId(chainId);
        provider.on('chainChanged', (chainId) => {
          setChainId(chainId as string);
        });
      } catch (error) {
        console.error(error);
      }
    };

    detectChainId();
  }, [provider]);

  return { provider, account, chainId, connect, switchNetwork } as const;
};
