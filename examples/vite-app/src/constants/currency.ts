import { SupportedChains } from 'lync-wallet-sdk';

type NativeCurrencySymbols = {
  [K in SupportedChains]: string;
};

export const Native_Currency_Symbol = {
  [SupportedChains.EthereumMainnet]: 'ETH',
  [SupportedChains.BaseMainnet]: 'ETH',
  [SupportedChains.PolygonMainnet]: 'MATIC',
  [SupportedChains.PolygonZkEvmMainnet]: 'ETH',
  [SupportedChains.MetisAndromedaMainnet]: 'METIS',
  [SupportedChains.GoatAlphaMainnet]: 'BTC',
  [SupportedChains.BNBMainnet]: 'BNB',
  [SupportedChains.AvalancheMainnet]: 'AVAX',
  [SupportedChains.ArbitrumOneMainnet]: 'ETH',
  [SupportedChains.ArbitrumNovaMainnet]: 'ETH',
  [SupportedChains.OptimismMainnet]: 'ETH',
  [SupportedChains.RoninMainnet]: 'RON',
  [SupportedChains.SagaEvmMainnet]: 'GAS',
  [SupportedChains.EthereumSepoliaTestnet]: 'ETH',
  [SupportedChains.BaseSepoliaTestnet]: 'ETH',
  [SupportedChains.PolygonAmoyTestnet]: 'MATIC',
  [SupportedChains.PolygonCardonaTestnet]: 'ETH',
  [SupportedChains.MetisSepoliaTestnet]: 'sMETIS',
  [SupportedChains.GoatTestnet3]: 'BTC',
  [SupportedChains.BNBTestnet]: 'tBNB',
  [SupportedChains.AvalancheFujiTestnet]: 'AVAX',
  [SupportedChains.ArbitrumSepoliaTestnet]: 'ETH',
  [SupportedChains.OptimismSepoliaTestnet]: 'ETH',
  [SupportedChains.SaigonTestnet]: 'RON',
} as const satisfies NativeCurrencySymbols;
