import React, { useEffect, useMemo } from 'react';
import {
  MetamaskConnect,
  SupportedChains,
  useAccount,
  useDisconnect,
  useNetwork,
} from '@lyncworld/metamask-connect-sdk';
import { MdOutlineLogout } from 'react-icons/md';
import { AppLayout } from './components/layouts';
import { Button } from './components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { Mainnet_Chains, Testnet_Chains } from './constants';

export const MetaMaskConnectExample: React.FC = () => {
  const { account } = useAccount();
  const { disconnect } = useDisconnect();

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
        <MetamaskConnect />
        {account && (
          <Button className="size-8 lg:size-9 rounded-sm" onClick={disconnect}>
            <MdOutlineLogout color="oklch(21.6% 0.006 56)" />
          </Button>
        )}
      </div>
      <SwitchNetwork />
    </AppLayout>
  );
};

export const SwitchNetwork: React.FC = () => {
  const { account } = useAccount();
  const { chainId, switchNetwork } = useNetwork();

  const connectedChain = useMemo(
    () => [...Testnet_Chains, ...Mainnet_Chains].find((chain) => chain.id === chainId),
    [chainId]
  );

  useEffect(() => {
    if (!connectedChain) switchNetwork(SupportedChains.EthereumMainnet);
  }, [connectedChain, switchNetwork]);

  if (!account) return null;

  return (
    <div className="mt-8 w-[320px] border rounded-md p-4 bg-muted/50">
      <div className="flex flex-col">
        <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
          Connected Network
        </span>
        <p className="mt-1 border-t pt-1">{connectedChain?.label ?? 'Unsupported Network'}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="mt-3 text-sm border py-2 px-3 rounded-md bg-muted w-full text-left">
          Switch Network
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[286px]">
          <DropdownMenuLabel>Supported Networks</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Mainnet_Chains.map((chain) => (
            <DropdownMenuItem key={chain.id} onClick={() => switchNetwork(chain.id)} className="cursor-pointer">
              {chain.label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          {Testnet_Chains.map((chain) => (
            <DropdownMenuItem key={chain.id} onClick={() => switchNetwork(chain.id)} className="cursor-pointer">
              {chain.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
