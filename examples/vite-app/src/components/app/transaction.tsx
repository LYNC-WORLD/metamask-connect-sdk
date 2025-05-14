import React, { useMemo, useState } from 'react';
import { ethers } from 'ethers';
import { SupportedChains, useAccount, useBalance, useEthSigner, useNetwork, useWallet } from 'lync-wallet-sdk';
import toast from 'react-hot-toast';
import { Native_Currency_Symbol } from '@/constants';
import { formatSenderAddress, parseError, validateToAddress, validateTransferAmount } from '@/lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ErrorList } from './error-list';
import { WarningList } from './warning-list';
import { SuccessMessage } from './success-message';

type TransactionParams = {
  from: string;
  to: string;
  value: string;
};

export const CoinTransferTransaction: React.FC = () => {
  const { account } = useAccount();
  const { balance, isFetching: fetchingBalance, refetch: refetchBalance } = useBalance();
  const { chainId } = useNetwork();
  const { wallet } = useWallet();
  const signer = useEthSigner();

  const [toAddress, setToAddress] = useState<string>('');
  const [amountToTransfer, setAmountToTransfer] = useState<string>('0');
  const [addressError, setAddressError] = useState<string>('');
  const [amountError, setAmountError] = useState<string>('');
  const [warning, setWarning] = useState<string>('');
  const [performingTransactions, setPerformingTransactions] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>('');

  const readableBalance = useMemo(() => {
    if (Number(balance) <= 0) return '0';
    if (Number(Number(balance).toFixed(5)) <= 0) return '< 0.00001';
    return Number(balance).toFixed(5);
  }, [balance]);

  useMemo(() => {
    if (fetchingBalance) return;

    if (Number(balance) <= 0) setWarning('Your account balance is too low. Please top-up your account to send funds.');
    else setWarning('');
  }, [balance, fetchingBalance]);

  const disableTransferFunds = useMemo(
    () => !toAddress || Number(amountToTransfer) <= 0 || Number(balance) <= 0 || performingTransactions,
    [amountToTransfer, balance, toAddress, performingTransactions]
  );

  useMemo(() => setAmountToTransfer('0'), [chainId, account]);
  useMemo(() => {
    if (warning) {
      setAmountToTransfer('0');
      setToAddress('');
    }
  }, [warning]);

  const setMaxSendableAmount = async () => {
    if (!wallet) return;

    try {
      const provider = new ethers.providers.Web3Provider(wallet);
      const gasPrice = await provider.getGasPrice();
      const estimatedGasLimit = ethers.BigNumber.from(21000);
      const estimatedGasFee = gasPrice.mul(estimatedGasLimit);

      const estimatedGasFeeInNumber = Number(ethers.utils.formatEther(estimatedGasFee));

      const maxSendable = Number(balance) - estimatedGasFeeInNumber;
      if (maxSendable <= 0) {
        toast.error('Your account does not have sufficient funds to cover gas.');
        setAmountToTransfer('0');

        return;
      }

      setAmountToTransfer(maxSendable.toString());
    } catch (error: unknown) {
      console.error('Error estimating max sendable amount: ', error);
      setAmountToTransfer('0');
    }
  };

  const transferFunds = async () => {
    if (!account || !signer || disableTransferFunds) return;
    const addressCheck = validateToAddress(account, toAddress);
    const amountCheck = validateTransferAmount(Number(balance), Number(amountToTransfer));

    setAddressError(addressCheck?.error ?? '');
    setAmountError(amountCheck?.error ?? '');
    setTransactionHash('');

    if (addressCheck?.error || amountCheck?.error) return;

    setPerformingTransactions(true);
    const transferAmount = ethers.utils.parseEther(amountToTransfer);

    const transactionParams: TransactionParams = {
      from: account,
      to: toAddress,
      value: transferAmount.toHexString(),
    };

    try {
      const transaction = await signer.sendTransaction(transactionParams);
      const receipt = await transaction.wait();

      setToAddress('');
      setAmountToTransfer('0');
      await refetchBalance();

      setTransactionHash(receipt.transactionHash);
      toast.success('Fund transfer successful.');
    } catch (error: unknown) {
      console.error('Error sending funds: ', { error });
      let message = 'Error sending funds.';

      if (error && typeof error === 'object' && 'reason' in error) message = `Error sending funds: ${error.reason}`;
      else message = parseError(error, message);

      toast.error(message);
    } finally {
      setPerformingTransactions(false);
    }
  };

  if (!account) return null;

  return (
    <div className="flex w-full flex-col gap-2 md:gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 w-full">
        <div className="flex flex-col border rounded-md p-4 bg-muted/50">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">From</span>
            <p className="mt-1 border-t pt-1">{formatSenderAddress(account)}</p>
          </div>
          <div className="flex flex-col mt-3">
            <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">Balance</span>
            <p className="mt-1 border-t pt-1">
              {readableBalance} {Native_Currency_Symbol[chainId as unknown as SupportedChains] ?? ''}
            </p>
          </div>
        </div>
        <div className="flex flex-col border rounded-md p-4 bg-muted/50">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">To</span>
            <div className="mt-1 border py-1 px-1.5 rounded-[3px]">
              <Input
                type="string"
                value={toAddress}
                disabled={Number(balance) <= 0}
                readOnly={performingTransactions}
                onChange={(event) => setToAddress(event.target.value)}
                className="border-0 p-0 h-auto rounded-none bg-transparent dark:bg-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">Amount</span>
              <Button
                disabled={Number(balance) <= 0}
                variant="link"
                className="text-[11px] font-medium rounded-none underline h-auto p-0 tracking-wider text-muted-foreground uppercase"
                onClick={setMaxSendableAmount}
              >
                Max
              </Button>
            </div>
            <div className="flex justify-between items-center mt-1 gap-1 border py-1 px-1.5 rounded-[3px]">
              <Input
                type="number"
                value={amountToTransfer}
                disabled={Number(balance) <= 0}
                readOnly={performingTransactions}
                onChange={(event) => setAmountToTransfer(event.target.value)}
                className="border-0 p-0 h-auto rounded-none bg-transparent dark:bg-transparent"
                onWheel={(event) => event.currentTarget.blur()}
              />
              <span className="text-sm">{Native_Currency_Symbol[chainId as unknown as SupportedChains] ?? ''}</span>
            </div>
          </div>
        </div>
      </div>
      <WarningList warning={warning} />
      {!warning && <ErrorList addressError={addressError} amountError={amountError} />}
      {!warning && <SuccessMessage transactionHash={transactionHash} onClose={() => setTransactionHash('')} />}
      <Button
        disabled={disableTransferFunds}
        className="w-full"
        style={{ color: 'oklch(21.6% 0.006 56)' }}
        onClick={transferFunds}
      >
        {performingTransactions ? 'Sending Funds...' : 'Send Funds'}
      </Button>
    </div>
  );
};
