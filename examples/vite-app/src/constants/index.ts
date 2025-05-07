import { SupportedChains } from '@lyncworld/metamask-connect-sdk';

export type MetaMaskChain = {
  id: string;
  label: string;
};

export const Testnet_Chains = [
  { id: SupportedChains.EthereumSepoliaTestnet, label: 'Sepolia Testnet' },
  { id: SupportedChains.BaseSepoliaTestnet, label: 'Base Sepolia Testnet' },
  { id: SupportedChains.PolygonAmoyTestnet, label: 'Polygon Amoy Testnet' },
] as const satisfies Array<MetaMaskChain>;

export const Mainnet_Chains = [
  { id: SupportedChains.EthereumMainnet, label: 'Ethereum Mainnet' },
  { id: SupportedChains.BaseMainnet, label: 'Base Mainnet' },
  { id: SupportedChains.PolygonMainnet, label: 'Polygon Mainnet' },
] as const satisfies Array<MetaMaskChain>;
