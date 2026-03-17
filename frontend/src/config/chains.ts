import { mainnet, polygon, sepolia } from "wagmi/chains";

export const supportedChains = [mainnet, sepolia, polygon] as const;

export const explorerApiByChainId: Record<number, string> = {
  [mainnet.id]: "https://api.etherscan.io/api",
  [sepolia.id]: "https://api-sepolia.etherscan.io/api",
  [polygon.id]: "https://api.polygonscan.com/api"
};

export const explorerByChainId: Record<number, string> = {
  [mainnet.id]: "https://etherscan.io",
  [sepolia.id]: "https://sepolia.etherscan.io",
  [polygon.id]: "https://polygonscan.com"
};

export const alchemyNftByChainId: Record<number, string> = {
  [mainnet.id]: "https://eth-mainnet.g.alchemy.com/nft/v3",
  [sepolia.id]: "https://eth-sepolia.g.alchemy.com/nft/v3",
  [polygon.id]: "https://polygon-mainnet.g.alchemy.com/nft/v3"
};

export const alchemyRpcByChainId: Record<number, string> = {
  [mainnet.id]: "https://eth-mainnet.g.alchemy.com/v2",
  [sepolia.id]: "https://eth-sepolia.g.alchemy.com/v2",
  [polygon.id]: "https://polygon-mainnet.g.alchemy.com/v2"
};
