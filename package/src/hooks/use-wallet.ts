import { useMetaMask } from '@/contexts';

export const useWallet = () => {
  const { provider } = useMetaMask();
  return { wallet: provider } as const;
};
