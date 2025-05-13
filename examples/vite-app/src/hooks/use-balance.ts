import { ethers } from 'ethers';
import { useAccount, useNetwork, useWallet } from 'lync-wallet-sdk';
import { useQuery } from '@tanstack/react-query';

export const useBalance = () => {
  const { account } = useAccount();
  const { wallet } = useWallet();
  const { chainId } = useNetwork();

  const fetchBalance = async () => {
    if (!wallet || !account) return '0';
    try {
      const provider = new ethers.providers.Web3Provider(wallet);
      const accountBalance = await provider.getBalance(account);

      return ethers.utils.formatEther(accountBalance);
    } catch (error: unknown) {
      console.error(`Error fetching balance for account - ${account}:`, error);
      return '0';
    }
  };

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['account_balance', account, chainId],
    queryFn: fetchBalance,
    initialData: '0',
    refetchInterval: 10000,
  });

  return { balance: data, fetching: isLoading, refetching: isRefetching, refetch } as const;
};
