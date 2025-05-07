import { MetamaskConnect } from './components';
import { SupportedChains } from './enums';
import { useEthSigner, useMetaMask } from './hooks';
import {
  ChainNativeCurrency,
  EIP1193Provider,
  EIP6963AnnounceProviderEvent,
  EIP6963ProviderDetail,
  EIP6963ProviderInfo,
  MetamaskAddChainConfigurations,
} from './types';
import { collapseAddress } from './utils';

export {
  SupportedChains,
  useEthSigner,
  useMetaMask,
  type ChainNativeCurrency,
  type EIP1193Provider,
  type EIP6963AnnounceProviderEvent,
  type EIP6963ProviderDetail,
  type EIP6963ProviderInfo,
  type MetamaskAddChainConfigurations,
  collapseAddress,
};

export default MetamaskConnect;
