import abi from "@/abi/WhitelistClaim.json";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

if (!contractAddress || !/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
  throw new Error("Missing or invalid NEXT_PUBLIC_CONTRACT_ADDRESS");
}

const chainIdRaw = process.env.NEXT_PUBLIC_CHAIN_ID ?? "11155111";
const chainId = Number(chainIdRaw);

if (!Number.isInteger(chainId)) {
  throw new Error("NEXT_PUBLIC_CHAIN_ID must be an integer");
}

export const whitelistClaimAddress = contractAddress as `0x${string}`;
export const whitelistClaimAbi = abi;
export const targetChainId = chainId;
