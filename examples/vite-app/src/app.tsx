import type React from 'react';
import MetamaskConnect from '@lyncworld/metamask-connect-sdk';

export const MetaMaskConnectExample: React.FC = () => {
  return (
    <main className="">
      <h1 className="">MetaMask Connect Example</h1>
      <MetamaskConnect />
    </main>
  );
};
