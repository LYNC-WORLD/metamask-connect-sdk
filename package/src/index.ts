import { MetamaskConnect } from './components';
import { LYNCMetaMaskProvider } from './contexts';
import { SupportedChains } from './enums';
import { useAccount, useConnect, useDisconnect, useEthSigner, useNetwork, useWallet } from './hooks';
import type {
  ChainNativeCurrency,
  EIP1193Provider,
  EIP6963AnnounceProviderEvent,
  EIP6963ProviderDetail,
  EIP6963ProviderInfo,
  MetamaskAddChainConfigurations,
} from './types';
import { collapseAddress } from './utils';

export {
  MetamaskConnect,
  SupportedChains,
  useAccount,
  useConnect,
  useDisconnect,
  useEthSigner,
  useNetwork,
  useWallet,
  type ChainNativeCurrency,
  type EIP1193Provider,
  type EIP6963AnnounceProviderEvent,
  type EIP6963ProviderDetail,
  type EIP6963ProviderInfo,
  type MetamaskAddChainConfigurations,
  collapseAddress,
};

export default LYNCMetaMaskProvider;
