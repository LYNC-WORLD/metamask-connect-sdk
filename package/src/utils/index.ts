export const collapseAddress = (address: string) => {
  if (!address || address.length <= 10) return address;
  return `${address.substring(0, 5)}...${address.slice(-4)}`;
};
