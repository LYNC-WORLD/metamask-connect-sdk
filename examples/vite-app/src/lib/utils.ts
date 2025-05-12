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
