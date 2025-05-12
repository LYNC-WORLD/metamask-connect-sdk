# Metamask Wallet Connect SDK

LYNC MetaMask wallet integration SDK for integrating MetaMask wallets inside any dapp in a few lines of code.

## Prerequisites

Before you begin integrating Fuel marketplace SDK, make sure you have the following prerequisites:

- `Node.js (version 20 or above)` installed on your system.
- `NPM (version 10 or above)` or `Yarn (latest version)` installed on your system.

## Installing the Package

You can install the package using either `NPM` or `Yarn`. Follow these steps:

1. Open your preferred terminal.
2. Navigate to your project's directory.
3. Run the following command:

```console
# Using NPM
npm install --save lync-wallet-sdk@latest
```

```console
# Using Yarn
yarn add lync-wallet-sdk
```

Congratulations! You have successfully installed `lync-wallet-sdk`. If you encounter any issues or have any questions, feel free to reach out to our support team for assistance.

## Using the SDK

### Wrapping your application with the `LYNCMetaMaskProvider`

Your entire application should be wrapped inside the `LYNCMetaMaskProvider` to utilize the hooks and components provided by the SDK.

Example: Here's an example of how to wrap your application with `LYNCMetaMaskProvider`:

```tsx
// main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Importing `index.css` is important if you wish to use the components
// provided by the SDK. This file contains necessary styling for the
// components provided by the SDK
import 'lync-wallet-sdk/build/index.css';

import './index.css';
import App from './app';
import LYNCMetaMaskProvider from 'lync-wallet-sdk';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LYNCMetaMaskProvider autoConnect>
      <App />
    </LYNCMetaMaskProvider>
  </StrictMode>
);
```

The `autoConnect` prop passed to `LYNCMetaMaskProvider` can be used to automatically connect your dapp with metamask wallet on the very first load of your dapp. The SDK will automatically try to connect with metamask wallet if `autoConnect` is `true`.

### Using the hooks provided by the SDK to connect with metamask wallet

`lync-wallet-sdk` provides a simple, hook-based approach for handling wallet connections. The SDK provides different hooks to connect and manage user wallet in your dapp. With the SDK, you can:

- Connect user's metamask wallet to your dapp.
- Access user accounts (addresses).
- Handle wallet connections (connect/disconnect).
- Handle adding and switching networks.
- Listen for account and network changes in real time.
- Use providers and signers to interact with user's wallet

### Handle wallet connections

This SDK provides different hooks to connect user's metamask wallet to your dapp and handle wallet connections. For example:

```tsx
import React from 'react';
import { collapseAddress, MetaMaskFunctionErrorCodes, useAccount, useConnect, useDisconnect } from 'lync-wallet-sdk';

const MetaMaskConnectExample: React.FC = () => {
  const { account } = useAccount();
  const { isConnecting, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const connectToMetaMask = async () => {
    const response = await connect();
    if (response.success) return;

    if (response.errorData.code === MetaMaskFunctionErrorCodes.MetaMaskProviderNotFound) {
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    console.error('Error connecting to metamask: ', response.errorData);
  };

  const disconnectMetaMask = async () => {
    const response = await disconnect();
    if (!response.success) console.error(response.errorData);
  };

  return (
    <div>
      {!account && (
        <button disabled={isConnecting} onClick={connectToMetaMask}>
          Connect Metamask
        </button>
      )}
      {account && <span>{collapseAddress(account)}</span>}
      {account && <button onClick={disconnectMetaMask}>Disconnect</button>}
    </div>
  );
};
```

Additionally, the SDK provides a `MetamaskConnect` component which wraps the connection logic and returns a button the triggers wallet connection on click. You can also import and use the `MetamaskConnect` component to connect user's metamask wallet to your dapp. For example:

```tsx
import React from 'react';
import { MetamaskConnect, MetaMaskFunctionErrorCodes, useAccount, useDisconnect } from 'lync-wallet-sdk';

type MetaMaskConnectionError = {
  error?: E;
  code: MetaMaskFunctionErrorCodes;
  message: string;
};

const MetaMaskConnectExample: React.FC = () => {
  const { account } = useAccount();
  const { disconnect } = useDisconnect();

  const onConnectionSuccess = () => {
    console.info('MetaMask connected successfully.');
  };

  const onConnectionError = (error: MetaMaskConnectionError) => {
    if (errorData.code === MetaMaskFunctionErrorCodes.MetaMaskProviderNotFound) {
      console.error('Please install MetaMask: https://metamask.io/download/');
      window.open('https://metamask.io/download/', '_blank');
    } else {
      console.error(error);
    }
  };

  return (
    <div>
      <MetamaskConnect onSuccess={onConnectionSuccess} onError={onConnectionError} />
      {account && <button onClick={disconnect}>Disconnect</button>}
    </div>
  );
};
```

> NOTE:
> When you are using `MetamaskConnect` component in your dapp, you must import `'lync-wallet-sdk/build/index.css'` to get necessary styling for the component ([see here](#wrapping-your-application-with-the-lyncmetamaskprovider)). If you want to change the default styles implemented by tye SDK for connect button, you can add your custom styles by targeting `.LYNCMetaMaskConnectSDK__metamask_connect_btn` class, and `.LYNCMetaMaskConnectSDK__metamask_connect_btn:hover` and `.LYNCMetaMaskConnectSDK__metamask_connect_btn:disabled` states.

### Manage networks

You can manage networks in your dapp with the hooks provided by the SDK. You can:

- Detect the current network and monitor network changes.
- Switch between networks programmatically.
- Add new networks to MetaMask.
- Handle common network-related errors.

The SDK provides intuitive hooks for several network-related operations. The following are examples of using these hooks.

Detect the current network:

```tsx
// chains.ts

import { SupportedChains } from 'lync-wallet-sdk';

type MetaMaskChain = {
  id: string;
  label: string;
};

const Testnet_Chains = [
  { id: SupportedChains.EthereumSepoliaTestnet, label: 'Sepolia Testnet' },
  { id: SupportedChains.BaseSepoliaTestnet, label: 'Base Sepolia Testnet' },
  { id: SupportedChains.PolygonAmoyTestnet, label: 'Polygon Amoy Testnet' },
  { id: SupportedChains.MetisSepoliaTestnet, label: 'Metis Sepolia Testnet' },
  { id: SupportedChains.BNBTestnet, label: 'BNB Smart Chain Testnet' },
] as const satisfies Array<MetaMaskChain>;

const Mainnet_Chains = [
  { id: SupportedChains.EthereumMainnet, label: 'Ethereum Mainnet' },
  { id: SupportedChains.BaseMainnet, label: 'Base Mainnet' },
  { id: SupportedChains.PolygonMainnet, label: 'Polygon Mainnet' },
  { id: SupportedChains.MetisAndromedaMainnet, label: 'Metis Andromeda Mainnet' },
  { id: SupportedChains.BNBMainnet, label: 'BNB Smart Chain Mainnet' },
] as const satisfies Array<MetaMaskChain>;
```

```tsx
import React, { useMemo } from 'react';
import { useAccount, useNetwork } from 'lync-wallet-sdk';
import { Mainnet_Chains, Testnet_Chains } from './chains';

const ConnectedNetwork: React.FC = () => {
  const { account } = useAccount();
  const { chainId } = useNetwork();

  const connectedChain = useMemo(
    () => [...Testnet_Chains, ...Mainnet_Chains].find((chain) => chain.id === chainId),
    [chainId]
  );

  if (!account) return null;

  return (
    <div>
      <p>Connected Network: {connectedChain?.label ?? 'Unsupported Network'}</p>
    </div>
  );
};
```

Switch networks:

```tsx
import React, { useMemo } from 'react';
import { SupportedChains, useAccount, useNetwork } from 'lync-wallet-sdk';
import { Mainnet_Chains, Testnet_Chains } from './chains';

const NetworkSwitcher: React.FC = () => {
  const { account } = useAccount();
  const { chainId, isSwitchingNetwork, switchNetwork } = useNetwork();

  const connectedChain = useMemo(
    () => [...Testnet_Chains, ...Mainnet_Chains].find((chain) => chain.id === chainId),
    [chainId]
  );

  const switchMetaMaskNetwork = async (chainIdToConnect: SupportedChains) => {
    const response = await switchNetwork(chainIdToConnect);
    if (!response.success) {
      console.error(response.errorData.message);
    }
  };

  if (!account) return null;

  return (
    <div>
      <p>Connected Network: {connectedChain?.label ?? 'Unsupported Network'}</p>
      {Mainnet_Chains.map((chain) => (
        <button key={chain.id} disabled={isSwitchingNetwork} onClick={() => switchMetaMaskNetwork(chain.id)}>
          {chain.label}
        </button>
      ))}
      {Testnet_Chains.map((chain) => (
        <button key={chain.id} disabled={isSwitchingNetwork} onClick={() => switchMetaMaskNetwork(chain.id)}>
          {chain.label}
        </button>
      ))}
    </div>
  );
};
```

Apart from chains supported by `lync-wallet-sdk`, user can also switch and connect to any ethereum chains. User can provide valid chain configuration according to metamask documentation ([see valid configuration type here](#types)) as second parameter of function `switchNetwork`, in order to add and switch to the other chain. For example:

```tsx
import React, { useMemo } from 'react';
import { useAccount, useNetwork } from 'lync-wallet-sdk';
import type { MetamaskAddChainConfigurations } from 'lync-wallet-sdk';
import { Mainnet_Chains, Testnet_Chains } from './chains';

const avalancheFujiTestnetConfig = {
  chainId: '0xa869',
  chainName: 'Avalanche Fuji Testnet',
  blockExplorerUrls: ['https://testnet.snowscan.xyz'],
  rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
  nativeCurrency: {
    name: 'AVAX',
    symbol: 'AVAX',
    decimals: 18,
  },
} as const satisfies MetamaskAddChainConfigurations;

const NetworkSwitcher: React.FC = () => {
  const { account } = useAccount();
  const { chainId, isSwitchingNetwork, switchNetwork } = useNetwork();

  const connectedChain = useMemo(
    () => [...Testnet_Chains, ...Mainnet_Chains].find((chain) => chain.id === chainId),
    [chainId]
  );

  const switchToAvalancheFuji = async () => {
    const response = await switchNetwork(avalancheFujiTestnetConfig.chainId, avalancheFujiTestnetConfig);
    if (!response.success) {
      console.error(response.errorData.message);
    }
  };

  if (!account) return null;

  return (
    <div>
      <p>
        Connected Network:
        {chainId !== '0xa869' && (connectedChain?.label ?? 'Unsupported Network')}
        {chainId === '0xa869' && 'Avalanche Fuji Testnet'}
      </p>
      <button disabled={isSwitchingNetwork} onClick={switchToAvalancheFuji}>
        Avalanche Fuji Testnet
      </button>
    </div>
  );
};
```

Handle network changes:

```tsx
import React, { useEffect } from 'react';
import { useNetwork } from 'lync-wallet-sdk';

const NetworkWatcher: React.FC = () => {
  const { chainId } = useNetwork();

  useEffect(() => {
    console.info('Chain Id changed: ', chainId);
  }, [chainId]);

  return null;
};
```

The SDK also provide `useWallet` and `useEthSigner` hooks, which provides access to user's metamask wallet provider and ethereum signer. You can import and use these hooks to get access to wallet provider and signer, and interact with user's metamask wallet for message and transaction signing.

```tsx
import React, { useState } from 'react';
import { useAccount, useEthSigner, useWallet } from 'lync-wallet-sdk';

const SignPersonalMessage: React.FC = () => {
  const { account } = useAccount();
  const { wallet } = useWallet();

  const signer = useEthSigner();
  console.info('Ethereum signer: ', signer);

  const [signedMessage, setSignedMessage] = useState<string | null>(null);

  const signMessage = async () => {
    if (!wallet || !account) return;

    const signingMessage = `This message is a demo message signed by account: ${account}`;
    const message = `0x${Buffer.from(signingMessage, 'utf8').toString('hex')}`;

    try {
      const signature = (await wallet.request({
        method: 'personal_sign',
        params: [message, account],
      })) as string;

      setSignedMessage(signature);
    } catch (error) {
      console.error(error);
      setSignedMessage(null);
    }
  };

  return (
    <div>
      {signedMessage && <p>{signedMessage}</p>}
      <button onClick={signMessage}>Sign Message</button>
    </div>
  );
};
```

## Types and Enums provided by the SDK

### Enums

```typescript
enum SupportedChains {
  EthereumMainnet = '0x1',
  BaseMainnet = '0x2105',
  PolygonMainnet = '0x89',
  PolygonZkEvmMainnet = '0x44d',
  MetisAndromedaMainnet = '0x440',
  GoatAlphaMainnet = '0x929',
  BNBMainnet = '0x38',
  AvalancheMainnet = '0xa86a',
  ArbitrumOneMainnet = '0xa4b1',
  ArbitrumNovaMainnet = '0xa4ba',
  OptimismMainnet = '0xa',
  RoninMainnet = '0x7e4',
  SagaEvmMainnet = '0x1558',
  EthereumSepoliaTestnet = '0xaa36a7',
  BaseSepoliaTestnet = '0x14a34',
  PolygonAmoyTestnet = '0x13882',
  PolygonCardonaTestnet = '0x98a',
  MetisSepoliaTestnet = '0xe9fe',
  GoatTestnet3 = '0xbeb0',
  BNBTestnet = '0x61',
  AvalancheFujiTestnet = '0xa869',
  ArbitrumSepoliaTestnet = '0x66eee',
  OptimismSepoliaTestnet = '0xaa37dc',
  SaigonTestnet = '0x7e5',
}

enum MetaMaskFunctionErrorCodes {
  MetaMaskAddNetworkError = 'MetaMaskAddNetworkError',
  MetaMaskConnectionError = 'MetaMaskConnectionError',
  MetaMaskDisconnectError = 'MetaMaskDisconnectError',
  MetaMaskProviderNotFound = 'MetaMaskProviderNotFound',
  MetaMaskSwitchNetworkError = 'MetaMaskSwitchNetworkError',
}
```

### Types

```typescript
type ChainNativeCurrency = {
  name: string;
  symbol: string;
  decimals: number;
};

type MetamaskAddChainConfigurations = {
  chainId: `0x${string}`;
  chainName: string;
  blockExplorerUrls: Array<string>;
  rpcUrls: Array<string>;
  nativeCurrency: ChainNativeCurrency;
};

type MetaMaskFunctionErrorData<E = unknown> = {
  error?: E;
  code: MetaMaskFunctionErrorCodes;
  message: string;
};

type EIP1193Provider = {
  isStatus?: boolean;
  host?: string;
  path?: string;
  sendAsync?: (
    request: { method: string; params?: Array<unknown> },
    callback: (error: Error | null, response: unknown) => void
  ) => void;
  send?: (
    request: { method: string; params?: Array<unknown> },
    callback: (error: Error | null, response: unknown) => void
  ) => void;
  request: (request: { method: string; params?: Array<unknown> }) => Promise<unknown>;
  on: (event: string, callback: (arg: unknown) => void) => void;
};
```

## Supported Chains

| Chain Name               | Chain ID |
| ------------------------ | -------- |
| Ethereum Mainnet         | 0x1      |
| Base Mainnet             | 0x2105   |
| Polygon Mainnet          | 0x89     |
| Polygon ZkEvm Mainnet    | 0x44d    |
| Metis Andromeda Mainnet  | 0x440    |
| Goat Alpha Mainnet       | 0x929    |
| BNB Mainnet              | 0x38     |
| Avalanche Mainnet        | 0xa86a   |
| Arbitrum One Mainnet     | 0xa4b1   |
| Arbitrum Nova Mainnet    | 0xa4ba   |
| Optimism Mainnet         | 0xa      |
| Ronin Mainnet            | 0x7e4    |
| Saga Evm Mainnet         | 0x1558   |
| Ethereum Sepolia Testnet | 0xaa36a7 |
| Base Sepolia Testnet     | 0x14a34  |
| Polygon Amoy Testnet     | 0x13882  |
| Polygon Cardona Testnet  | 0x98a    |
| Metis Sepolia Testnet    | 0xe9fe   |
| Goat Testnet 3           | 0xbeb0   |
| BNB Testnet              | 0x61     |
| Avalanche Fuji Testnet   | 0xa869   |
| Arbitrum Sepolia Testnet | 0x66eee  |
| Optimism Sepolia Testnet | 0xaa37dc |
| Saigon Testnet           | 0x7e5    |
