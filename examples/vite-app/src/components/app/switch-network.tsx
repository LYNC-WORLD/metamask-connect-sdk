import React, { useEffect, useMemo } from 'react';
import { SupportedChains, useAccount, useNetwork } from 'lync-wallet-sdk';
import toast from 'react-hot-toast';
import { Mainnet_Chains, Testnet_Chains } from '@/constants';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export const SwitchNetwork: React.FC = () => {
  const { account } = useAccount();
  const { chainId, isSwitchingNetwork, switchNetwork } = useNetwork();

  const connectedChain = useMemo(
    () => [...Testnet_Chains, ...Mainnet_Chains].find((chain) => chain.id === chainId),
    [chainId]
  );

  const switchMetaMaskNetwork = async (chainIdToConnect: SupportedChains) => {
    const response = await switchNetwork(chainIdToConnect);
    if (!response.success) toast.error(response.errorData.message);
  };

  useEffect(() => {
    if (chainId && !connectedChain) switchNetwork(SupportedChains.EthereumMainnet);
  }, [chainId, connectedChain, switchNetwork]);

  if (!account) return null;

  return (
    <div className="flex w-[320px] flex-col gap-2 md:gap-4 mt-4">
      <div className="w-full border flex-1 rounded-md p-4 bg-muted/50">
        <div className="flex flex-col">
          <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
            Connected Network
          </span>
          <p className="mt-1 border-t pt-1">{connectedChain?.label ?? '-'}</p>
        </div>
        <div className="flex mt-3 flex-col">
          <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">Chain ID</span>
          <p className="mt-1 border-t pt-1">{chainId ?? '-'}</p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={isSwitchingNetwork}
          className={cn('w-full', buttonVariants({ variant: 'default' }))}
          style={{ color: 'oklch(21.6% 0.006 56)' }}
        >
          {!isSwitchingNetwork && 'Switch Network'}
          {isSwitchingNetwork && 'Switching Network...'}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[286px]">
          <DropdownMenuLabel>Supported Networks</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Mainnet_Chains.map((chain) => (
            <DropdownMenuItem key={chain.id} onClick={() => switchMetaMaskNetwork(chain.id)} className="cursor-pointer">
              {chain.label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          {Testnet_Chains.map((chain) => (
            <DropdownMenuItem key={chain.id} onClick={() => switchMetaMaskNetwork(chain.id)} className="cursor-pointer">
              {chain.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
