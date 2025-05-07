import React, { useEffect, useMemo, useState } from 'react';
import { useSyncProviders } from '@/hooks';
import type { EIP1193Provider, MetamaskProviderStates } from '@/types';
import { initialStates, MetaMaskContext } from './metamask-context';

type MetaMaskProviderProps = {
  autoConnect?: boolean;
  children: React.ReactNode;
};

export const LYNCMetaMaskProvider: React.FC<Readonly<MetaMaskProviderProps>> = ({ autoConnect, children }) => {
  const [provider, setProvider] = useState<MetamaskProviderStates['provider']>(initialStates.provider);
  const [account, setAccount] = useState<MetamaskProviderStates['account']>(initialStates.account);
  const [chainId, setChainId] = useState<MetamaskProviderStates['chainId']>(initialStates.chainId);

  const providers = useSyncProviders();

  useEffect(() => {
    const metamaskProvider = providers?.find((provider) => provider.info.name === 'MetaMask');
    setProvider(metamaskProvider?.provider);
  }, [providers]);

  useEffect(() => {
    const initializeAccount = async (provider: EIP1193Provider) => {
      try {
        const accounts = (await provider.request({
          method: 'eth_requestAccounts',
        })) as Array<string> | undefined;

        if (accounts?.length) setAccount(accounts[0]);
        else setAccount('');
      } catch (error: unknown) {
        console.error('Error connecting to MetaMask: ', error);
      }
    };

    const handleAccountsChanged = (accounts: unknown) => {
      if ((accounts as Array<string>).length !== 0) {
        const currentAccount = (accounts as Array<string>)[0];
        setAccount(currentAccount);
      } else {
        setAccount('');
      }
    };

    if (!provider) return;
    provider.on('accountsChanged', handleAccountsChanged);

    if (!autoConnect) return;
    initializeAccount(provider);
  }, [account, autoConnect, provider]);

  useEffect(() => {
    const detectChainId = async () => {
      if (!provider) {
        setChainId('');
        return;
      }

      if (!account) {
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
  }, [provider, account]);

  const providerStates = useMemo(
    () => ({ provider, account, setAccount, chainId }) as const satisfies MetamaskProviderStates,
    [provider, account, chainId]
  );

  return <MetaMaskContext.Provider value={providerStates}>{children}</MetaMaskContext.Provider>;
};
