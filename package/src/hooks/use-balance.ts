import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAccount } from './use-account';
import { useNetwork } from './use-network';
import { useWallet } from './use-wallet';

export const useBalance = () => {
  const { account } = useAccount();
  const { chainId } = useNetwork();
  const { wallet } = useWallet();

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [balance, setBalance] = useState<string>('0');

  const fetchBalance = useCallback(async () => {
    if (!wallet || !account) {
      setBalance('0');
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(wallet);
      const accountBalance = await provider.getBalance(account);

      setBalance(ethers.utils.formatEther(accountBalance));
    } catch (error: unknown) {
      console.error(`Error fetching balance for account - ${account}:`, error);
      setBalance('0');
    }
  }, [account, wallet, chainId]);

  useEffect(() => {
    setIsFetching(true);
    fetchBalance().finally(() => setIsFetching(false));
  }, [fetchBalance]);

  return { balance, isFetching, refetch: fetchBalance } as const;
};
