import { mainnet, polygon, sepolia } from "wagmi/chains";

export const APP_NAME = "Cygent Wallet";

export const CHAIN_META = {
  [mainnet.id]: { name: "Ethereum", color: "bg-emerald-400" },
  [sepolia.id]: { name: "Sepolia", color: "bg-indigo-400" },
  [polygon.id]: { name: "Polygon", color: "bg-violet-400" }
} as const;

export const TRACKED_TOKENS: Array<{ symbol: string; address: `0x${string}` }> = [
  {
    symbol: "CYG",
    address: "0x0000000000000000000000000000000000000000"
  }
];
