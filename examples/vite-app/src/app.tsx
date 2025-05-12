import React, { useEffect, useMemo, useState } from 'react';
import { MetamaskConnect, SupportedChains, useAccount, useDisconnect, useNetwork, useWallet } from 'lync-wallet-sdk';
import { Check, Files } from 'lucide-react';
import { MdOutlineLogout } from 'react-icons/md';
import { AppLayout } from './components/layouts';
import { Button, buttonVariants } from './components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { Mainnet_Chains, Testnet_Chains } from './constants';
import { useCopy } from './hooks';
import { cn, getSigningMessage } from './lib/utils';

export const MetaMaskConnectExample: React.FC = () => {
  const { account } = useAccount();
  const { disconnect } = useDisconnect();
  const { wallet } = useWallet();
  const { chainId } = useNetwork();
  const { copied, copyToClipboard } = useCopy();

  const [signingMessage, setSigningMessage] = useState<boolean>(false);
  const [signedMessage, setSignedMessage] = useState<string | null>(null);

  const signMessage = async () => {
    if (!wallet || !account) return;

    setSigningMessage(true);
    const signingMessage = getSigningMessage(account, chainId);
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
    } finally {
      setSigningMessage(false);
    }
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
        <MetamaskConnect />
        {account && (
          <Button className="size-8 lg:size-9 rounded-sm" onClick={disconnect}>
            <MdOutlineLogout color="oklch(21.6% 0.006 56)" />
          </Button>
        )}
      </div>
      <div className="flex flex-col md:flex-row md:gap-4">
        <SwitchNetwork />
        {account && (
          <div className="flex w-[320px] flex-col gap-2 md:gap-4 mt-4">
            {
              <div className="border flex-1 rounded-md p-4 bg-muted/50 flex flex-col">
                <button
                  className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase flex items-center justify-between disabled:cursor-default"
                  disabled={!signedMessage}
                  onClick={(event) => copyToClipboard(event, signedMessage ?? '')}
                >
                  <span>Signed Message</span>
                  {copied ? <Check size={15} /> : <Files size={15} />}
                </button>
                <p
                  className={cn('mt-1 text-sm border-t break-words pt-1', {
                    'text-muted-foreground/50 text-[13px]': !signedMessage,
                  })}
                >
                  {signedMessage ?? 'Your signed message will appear here...'}
                </p>
              </div>
            }
            <Button
              disabled={signingMessage}
              onClick={signMessage}
              className="w-full"
              style={{ color: 'oklch(21.6% 0.006 56)' }}
            >
              {signingMessage ? 'Signing Message...' : 'Sign Message'}
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export const SwitchNetwork: React.FC = () => {
  const { account } = useAccount();
  const { chainId, isSwitchingNetwork, switchNetwork } = useNetwork();

  const connectedChain = useMemo(
    () => [...Testnet_Chains, ...Mainnet_Chains].find((chain) => chain.id === chainId),
    [chainId]
  );

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
