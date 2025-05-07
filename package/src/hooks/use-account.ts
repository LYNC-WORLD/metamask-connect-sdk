import { useMetaMask } from '@/contexts';

export const useAccount = () => {
  const { account } = useMetaMask();
  return { account } as const;
};
