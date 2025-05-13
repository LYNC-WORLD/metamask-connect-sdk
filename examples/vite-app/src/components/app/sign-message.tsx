import React, { useState } from 'react';
import { Check, Files } from 'lucide-react';
import { useAccount, useNetwork, useWallet } from 'lync-wallet-sdk';
import toast from 'react-hot-toast';
import { useCopy } from '@/hooks';
import { cn, getSigningMessage, parseError } from '@/lib/utils';
import { Button } from '../ui/button';

export const SignMessage: React.FC = () => {
  const { account } = useAccount();
  const { copied, copyToClipboard } = useCopy();
  const { chainId } = useNetwork();
  const { wallet } = useWallet();

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
      console.error('Error signing message in MetaMask: ', error);
      toast.error(parseError(error, 'Error signing message in MetaMask.'));
      setSignedMessage(null);
    } finally {
      setSigningMessage(false);
    }
  };

  if (!account) return null;

  return (
    <div className="flex w-[320px] flex-col gap-2 md:gap-4">
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
      <Button
        disabled={signingMessage}
        onClick={signMessage}
        className="w-full"
        style={{ color: 'oklch(21.6% 0.006 56)' }}
      >
        {signingMessage ? 'Signing Message...' : 'Sign Message'}
      </Button>
    </div>
  );
};
