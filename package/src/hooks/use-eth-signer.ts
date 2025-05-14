import { useMemo } from 'react';
import { ethers } from 'ethers';
import { useMetaMask } from '@/contexts';

export const useEthSigner = () => {
  const { account, chainId, provider } = useMetaMask();

  const signer = useMemo(() => {
    if (!provider) return undefined;
    return new ethers.providers.Web3Provider(provider)?.getSigner();
  }, [account, chainId, provider]);

  return signer;
};
