export const collapseAddress = (address: string) => {
  if (!address || address.length <= 12) return address;
  return `${address.substring(0, 6)}...${address.slice(-5)}`;
};
