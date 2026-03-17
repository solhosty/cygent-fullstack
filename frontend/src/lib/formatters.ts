export function truncateAddress(address: string, start = 6, end = 4): string {
  if (!address) {
    return "";
  }
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export function formatEthAmount(value: bigint | undefined, fractionDigits = 4): string {
  if (value === undefined) {
    return "0";
  }
  const eth = Number(value) / 1e18;
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: fractionDigits
  }).format(eth);
}

export function formatTokenAmount(raw: string, decimals = 18): string {
  const asNum = Number(raw) / 10 ** decimals;
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(asNum);
}

export function formatDateTime(unixSeconds: string): string {
  const date = new Date(Number(unixSeconds) * 1000);
  return date.toLocaleString();
}
