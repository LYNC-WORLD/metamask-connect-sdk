import type React from 'react';
import { MetamaskConnect, useAccount, useDisconnect } from 'lync-wallet-sdk';
import toast from 'react-hot-toast';
import { MdOutlineLogout } from 'react-icons/md';
import { SignMessage, SwitchNetwork } from './components/app';
import { AppLayout } from './components/layouts';
import { Button } from './components/ui/button';

export const MetaMaskConnectExample: React.FC = () => {
  const { account } = useAccount();
  const { disconnect } = useDisconnect();

  const disconnectMetaMask = async () => {
    const response = await disconnect();
    if (!response.success) toast.error(response.errorData.message);
  };

  return (
    <AppLayout>
      <h1 className="text-2xl md:text-3xl mb-2 text-center text-balance font-bold">
        Welcome to MetaMask Connect Example
      </h1>
      <p className="text-center text-balance">We are happy to see you here. Time to go to the moon.</p>
      <p className="text-muted-foreground my-6 text-center text-balance max-w-xl">
        LYNC MetaMask wallet integration SDK is designed for integrating MetaMask wallets inside any dapp in a few lines
        of code.
      </p>
      <div className="flex items-center gap-2">
        <MetamaskConnect onError={(error) => toast.error(error.message)} />
        {account && (
          <Button className="size-8 lg:size-9 rounded-sm" onClick={disconnectMetaMask}>
            <MdOutlineLogout color="oklch(21.6% 0.006 56)" />
          </Button>
        )}
      </div>
      <div className="flex flex-col md:flex-row md:gap-4">
        <SwitchNetwork />
        <SignMessage />
      </div>
    </AppLayout>
  );
};
