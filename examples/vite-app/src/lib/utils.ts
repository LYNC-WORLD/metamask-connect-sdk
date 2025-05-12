import { clsx, type ClassValue } from 'clsx';
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
