import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useMetaMask } from '@/contexts';

export const useBalance = () => {
  const { account, chainId, provider } = useMetaMask();

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [balance, setBalance] = useState<string>('0');

  const fetchBalance = useCallback(async () => {
    if (!provider || !account) {
      setBalance('0');
      return;
    }

    try {
      const wallet = new ethers.providers.Web3Provider(provider);
      const accountBalance = await wallet.getBalance(account);

      setBalance(ethers.utils.formatEther(accountBalance));
    } catch (error: unknown) {
      console.error(`Error fetching balance for account - ${account}:`, error);
      setBalance('0');
    }
  }, [account, provider, chainId]);

  useEffect(() => {
    setIsFetching(true);
    fetchBalance().finally(() => setIsFetching(false));
  }, [fetchBalance]);

  return { balance, isFetching, refetch: fetchBalance } as const;
};
