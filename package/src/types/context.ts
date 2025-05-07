import type React from 'react';
import type { EIP1193Provider } from './metamask';

export type MetamaskProviderStates = {
  provider: EIP1193Provider | undefined;
  account: string;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
  chainId: string;
};
