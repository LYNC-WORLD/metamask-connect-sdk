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
  [SupportedChains.PolygonZkEvmMainnet]: {
    chainId: SupportedChains.PolygonZkEvmMainnet,
    chainName: 'Polygon zkEVM',
    blockExplorerUrls: ['https://zkevm.polygonscan.com/'],
    rpcUrls: ['https://zkevm-rpc.com/'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [SupportedChains.MetisAndromedaMainnet]: {
    chainId: SupportedChains.MetisAndromedaMainnet,
    chainName: 'Metis Andromeda',
    blockExplorerUrls: ['https://explorer.metis.io/', 'https://andromeda-explorer.metis.io/'],
    rpcUrls: ['https://andromeda.metis.io/'],
    nativeCurrency: {
      name: 'METIS',
      symbol: 'METIS',
      decimals: 18,
    },
  },
  [SupportedChains.GoatAlphaMainnet]: {
    chainId: SupportedChains.GoatAlphaMainnet,
    chainName: 'GOAT Network',
    blockExplorerUrls: ['https://explorer.goat.network'],
    rpcUrls: ['https://rpc.goat.network', 'https://rpc.ankr.com/goat_mainnet'],
    nativeCurrency: {
      name: 'BTC',
      symbol: 'BTC',
      decimals: 18,
    },
  },
  [SupportedChains.BNBMainnet]: {
    chainId: SupportedChains.BNBMainnet,
    chainName: 'BNB Chain Mainnet',
    blockExplorerUrls: ['https://bscscan.com/'],
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
  },
  [SupportedChains.AvalancheMainnet]: {
    chainId: SupportedChains.AvalancheMainnet,
    chainName: 'Avalanche Mainnet',
    blockExplorerUrls: ['https://snowtrace.io/'],
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
  },
  [SupportedChains.ArbitrumOneMainnet]: {
    chainId: SupportedChains.ArbitrumOneMainnet,
    chainName: 'Arbitrum One',
    blockExplorerUrls: ['https://arbiscan.io/', 'https://arbitrum.blockscout.com/'],
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [SupportedChains.ArbitrumNovaMainnet]: {
    chainId: SupportedChains.ArbitrumNovaMainnet,
    chainName: 'Arbitrum Nova',
    blockExplorerUrls: ['https://nova.arbiscan.io/', 'https://arbitrum-nova.blockscout.com/'],
    rpcUrls: ['https://nova.arbitrum.io/rpc'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [SupportedChains.OptimismMainnet]: {
    chainId: SupportedChains.OptimismMainnet,
    chainName: 'OP Mainnet',
    blockExplorerUrls: ['https://optimistic.etherscan.io/'],
    rpcUrls: ['https://mainnet.optimism.io/'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [SupportedChains.RoninMainnet]: {
    chainId: SupportedChains.RoninMainnet,
    chainName: 'Ronin Mainnet',
    blockExplorerUrls: ['https://app.roninchain.com/'],
    rpcUrls: ['https://api.roninchain.com/rpc'],
    nativeCurrency: {
      name: 'RON',
      symbol: 'RON',
      decimals: 18,
    },
  },
  [SupportedChains.SagaEvmMainnet]: {
    chainId: SupportedChains.SagaEvmMainnet,
    chainName: 'SAGA EVM',
    blockExplorerUrls: ['https://sagaevm.sagaexplorer.io/'],
    rpcUrls: ['https://sagaevm.jsonrpc.sagarpc.io/'],
    nativeCurrency: {
      name: 'GAS',
      symbol: 'GAS',
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
  [SupportedChains.PolygonCardonaTestnet]: {
    chainId: SupportedChains.PolygonCardonaTestnet,
    chainName: 'Polygon zkEVM Cardona',
    blockExplorerUrls: ['https://cardona-zkevm.polygonscan.com/'],
    rpcUrls: ['https://etherscan.cardona.zkevm-rpc.com/'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [SupportedChains.MetisSepoliaTestnet]: {
    chainId: SupportedChains.MetisSepoliaTestnet,
    chainName: 'Metis Sepolia',
    blockExplorerUrls: ['https://sepolia-explorer.metisdevops.link/'],
    rpcUrls: ['https://metis-sepolia-rpc.publicnode.com'],
    nativeCurrency: {
      name: 'sMETIS',
      symbol: 'sMETIS',
      decimals: 18,
    },
  },
  [SupportedChains.GoatTestnet3]: {
    chainId: SupportedChains.GoatTestnet3,
    chainName: 'GOAT Testnet3',
    blockExplorerUrls: ['https://explorer.testnet3.goat.network'],
    rpcUrls: ['https://rpc.testnet3.goat.network'],
    nativeCurrency: {
      name: 'BTC',
      symbol: 'BTC',
      decimals: 18,
    },
  },
  [SupportedChains.BNBTestnet]: {
    chainId: SupportedChains.BNBTestnet,
    chainName: 'BNB Chain Testnet',
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
    rpcUrls: ['https://bsc-testnet-rpc.publicnode.com'],
    nativeCurrency: {
      name: 'tBNB',
      symbol: 'tBNB',
      decimals: 18,
    },
  },
  [SupportedChains.AvalancheFujiTestnet]: {
    chainId: SupportedChains.AvalancheFujiTestnet,
    chainName: 'Avalanche Fuji Testnet',
    blockExplorerUrls: ['https://testnet.snowscan.xyz'],
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
  },
  [SupportedChains.ArbitrumSepoliaTestnet]: {
    chainId: SupportedChains.ArbitrumSepoliaTestnet,
    chainName: 'Arbitrum Sepolia',
    blockExplorerUrls: ['https://sepolia.arbiscan.io/', 'https://arbitrum-sepolia.blockscout.com/'],
    rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [SupportedChains.OptimismSepoliaTestnet]: {
    chainId: SupportedChains.OptimismSepoliaTestnet,
    chainName: 'OP Sepolia',
    blockExplorerUrls: ['https://sepolia-optimistic.etherscan.io/'],
    rpcUrls: ['https://sepolia.optimism.io/'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [SupportedChains.SaigonTestnet]: {
    chainId: SupportedChains.SaigonTestnet,
    chainName: 'Saigon Testnet',
    blockExplorerUrls: ['https://ronin-stats.roninchain.com/'],
    rpcUrls: ['https://saigon-testnet.roninchain.com/rpc'],
    nativeCurrency: {
      name: 'RON',
      symbol: 'RON',
      decimals: 18,
    },
  },
} as const satisfies MetamaskAddChainConfigurations;
