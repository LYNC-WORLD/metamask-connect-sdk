import { SupportedChains } from '@/enums';
import type { MetamaskAddChainConfigurations } from '@/types';

export const Chain_Configurations = {
  [SupportedChains.EthereumMainnet]: {
    chainId: SupportedChains.EthereumMainnet,
    chainName: 'Ethereum',
    blockExplorerUrls: ['https://etherscan.io/address/'],
    rpcUrls: ['https://ethereum-rpc.publicnode.com/'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [SupportedChains.BaseMainnet]: {
    chainId: SupportedChains.BaseMainnet,
    chainName: 'Base',
    blockExplorerUrls: ['https://basescan.org/address/'],
    rpcUrls: ['https://mainnet.base.org/'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [SupportedChains.PolygonMainnet]: {
    chainId: SupportedChains.PolygonMainnet,
    chainName: 'Polygon',
    blockExplorerUrls: ['https://polygonscan.com/address/'],
    rpcUrls: ['https://polygon.drpc.org/'],
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  [SupportedChains.EthereumSepoliaTestnet]: {
    chainId: SupportedChains.EthereumSepoliaTestnet,
    chainName: 'Sepolia',
    blockExplorerUrls: ['https://sepolia.etherscan.io/address/'],
    rpcUrls: ['https://ethereum-sepolia-rpc.publicnode.com/'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [SupportedChains.BaseSepoliaTestnet]: {
    chainId: SupportedChains.BaseSepoliaTestnet,
    chainName: 'Base Sepolia',
    blockExplorerUrls: ['https://sepolia.basescan.org/address/'],
    rpcUrls: ['https://sepolia.base.org/'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [SupportedChains.PolygonAmoyTestnet]: {
    chainId: SupportedChains.PolygonAmoyTestnet,
    chainName: 'Polygon Amoy',
    blockExplorerUrls: ['https://amoy.polygonscan.com/address/'],
    rpcUrls: ['https://rpc-amoy.polygon.technology/'],
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
} as const satisfies MetamaskAddChainConfigurations;
