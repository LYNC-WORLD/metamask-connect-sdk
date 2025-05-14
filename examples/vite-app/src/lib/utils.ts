import { clsx, type ClassValue } from 'clsx';
import { ethers } from 'ethers';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getSigningMessage = (account: string, chainId: string) => {
  if (!account || !chainId) return '';

  return `${
    window.location.host
  } wants you to sign in with your Ethereum account:\n${account}\n\nI accept the authentication request from LYNC World.\n\nURL: https://${
    window.location.host
  }\nChain ID: ${chainId}\nIssued At: ${new Date().toISOString()}`;
};

export const parseError = (error: unknown, defaultMessage?: string): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string' || typeof error === 'number' || typeof error === 'boolean') return String(error);
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    (typeof error.message === 'string' || typeof error.message === 'number' || typeof error.message === 'boolean')
  )
    return String(error.message);

  return defaultMessage ?? 'Something went wrong!';
};

export const validateToAddress = (connectedAddress: string, transferAddress: string) => {
  if (connectedAddress.toLowerCase() === transferAddress.toLowerCase())
    return { error: 'Receiver address cannot be same as sender address.' };

  const validAddress = ethers.utils.isAddress(transferAddress);
  if (!validAddress) return { error: 'Please enter a valid receiver address.' };
};

export const validateTransferAmount = (balance: number, transferAmount: number) => {
  if (balance <= 0) return { error: 'Account balance is too low.' };
  if (transferAmount <= 0) return { error: 'Transfer amount must be greater than 0.' };
  if (transferAmount > balance) return { error: 'Transfer amount cannot be greater than available balance.' };
};

export const formatSenderAddress = (address: string) => {
  if (!address || address.length <= 20) return address;
  return `${address.substring(0, 12)}...${address.slice(-10)}`;
};
