import { SupportedChains } from '@/enums';

export type ChainNativeCurrency = {
  name: string;
  symbol: string;
  decimals: number;
};

export type MetamaskAddChainConfigurations = {
  chainId: `0x${string}`;
  chainName: string;
  blockExplorerUrls: Array<string>;
  rpcUrls: Array<string>;
  nativeCurrency: ChainNativeCurrency;
};

export type SupportedChainConfigurations = {
  [K in SupportedChains]: Omit<MetamaskAddChainConfigurations, 'chainId'> & {
    chainId: K;
  };
};
