export const collapseAddress = (address: string) => {
  if (!address || address.length <= 12) return address;
  return `${address.substring(0, 6)}...${address.slice(-5)}`;
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
