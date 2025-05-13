import { SupportedChains } from 'lync-wallet-sdk';

export type MetaMaskChain = {
  id: string;
  label: string;
};

export const Testnet_Chains = [
  { id: SupportedChains.EthereumSepoliaTestnet, label: 'Sepolia Testnet' },
  { id: SupportedChains.BaseSepoliaTestnet, label: 'Base Sepolia Testnet' },
  { id: SupportedChains.PolygonAmoyTestnet, label: 'Polygon Amoy Testnet' },
  { id: SupportedChains.PolygonCardonaTestnet, label: 'Polygon Cardona Testnet' },
  { id: SupportedChains.MetisSepoliaTestnet, label: 'Metis Sepolia Testnet' },
  { id: SupportedChains.GoatTestnet3, label: 'GOAT Testnet' },
  { id: SupportedChains.BNBTestnet, label: 'BNB Smart Chain Testnet' },
  { id: SupportedChains.AvalancheFujiTestnet, label: 'Avalanche Fuji Testnet' },
  { id: SupportedChains.ArbitrumSepoliaTestnet, label: 'Arbitrum Sepolia Testnet' },
  { id: SupportedChains.OptimismSepoliaTestnet, label: 'Optimism Sepolia Testnet' },
  { id: SupportedChains.SaigonTestnet, label: 'Saigon Testnet' },
] as const satisfies Array<MetaMaskChain>;

export const Mainnet_Chains = [
  { id: SupportedChains.EthereumMainnet, label: 'Ethereum Mainnet' },
  { id: SupportedChains.BaseMainnet, label: 'Base Mainnet' },
  { id: SupportedChains.PolygonMainnet, label: 'Polygon Mainnet' },
  { id: SupportedChains.PolygonZkEvmMainnet, label: 'Polygon zkEVM Mainnet' },
  { id: SupportedChains.MetisAndromedaMainnet, label: 'Metis Andromeda Mainnet' },
  { id: SupportedChains.GoatAlphaMainnet, label: 'GOAT Mainnet' },
  { id: SupportedChains.BNBMainnet, label: 'BNB Smart Chain Mainnet' },
  { id: SupportedChains.AvalancheMainnet, label: 'Avalanche Mainnet' },
  { id: SupportedChains.ArbitrumOneMainnet, label: 'Arbitrum One Mainnet' },
  { id: SupportedChains.ArbitrumNovaMainnet, label: 'Arbitrum Nova Mainnet' },
  { id: SupportedChains.OptimismMainnet, label: 'Optimism Mainnet' },
  { id: SupportedChains.RoninMainnet, label: 'Ronin Mainnet' },
  { id: SupportedChains.SagaEvmMainnet, label: 'SAGA EVM Mainnet' },
] as const satisfies Array<MetaMaskChain>;
