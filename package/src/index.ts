import { MetamaskConnect } from './components';
import { LYNCMetaMaskProvider } from './contexts';
import { MetaMaskFunctionErrorCodes, SupportedChains } from './enums';
import { useAccount, useBalance, useConnect, useDisconnect, useEthSigner, useNetwork, useWallet } from './hooks';
import type { ChainNativeCurrency, EIP1193Provider, MetamaskAddChainConfigurations } from './types';
import { collapseAddress } from './utils';

export {
  MetamaskConnect,
  MetaMaskFunctionErrorCodes,
  SupportedChains,
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useEthSigner,
  useNetwork,
  useWallet,
  type ChainNativeCurrency,
  type EIP1193Provider,
  type MetamaskAddChainConfigurations,
  collapseAddress,
};

export default LYNCMetaMaskProvider;
