import { SupportedChains } from '@/enums';

export type ChainNativeCurrency = {
  name: string;
  symbol: string;
  decimals: number;
};

export type MetamaskAddChainConfigurations = {
  [K in SupportedChains]: {
    chainId: K;
    chainName: string;
    blockExplorerUrls: Array<string>;
    rpcUrls: Array<string>;
    nativeCurrency: ChainNativeCurrency;
  };
};
