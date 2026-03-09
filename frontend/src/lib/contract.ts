import type { Address } from "viem";

export const WHITELIST_CLAIM_ADDRESS =
  (process.env.NEXT_PUBLIC_WHITELIST_CLAIM_ADDRESS as Address) ??
  "0x0000000000000000000000000000000000000000";

export const CLAIM_AMOUNT_WEI = 10_000_000_000_000_000n;
export const CLAIM_AMOUNT_ETH = "0.01";
export const EXPLORER_BASE_URL = "https://sepolia.etherscan.io";

export const whitelistClaimAbi = [
  {
    type: "function",
    name: "owner",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }]
  },
  {
    type: "function",
    name: "CLAIM_AMOUNT",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "totalClaimedCount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "totalClaimedAmount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "whitelistCount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "contractBalance",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "whitelist",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "bool" }]
  },
  {
    type: "function",
    name: "claimed",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "bool" }]
  },
  {
    type: "function",
    name: "canClaim",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "bool" }]
  },
  {
    type: "function",
    name: "getUserStatus",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      { name: "isWhitelisted", type: "bool" },
      { name: "hasClaimed", type: "bool" },
      { name: "canClaim", type: "bool" },
      { name: "amount", type: "uint256" }
    ]
  },
  {
    type: "function",
    name: "getWhitelist",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address[]" }]
  },
  {
    type: "function",
    name: "addToWhitelist",
    stateMutability: "nonpayable",
    inputs: [{ name: "account", type: "address" }],
    outputs: []
  },
  {
    type: "function",
    name: "removeFromWhitelist",
    stateMutability: "nonpayable",
    inputs: [{ name: "account", type: "address" }],
    outputs: []
  },
  {
    type: "function",
    name: "claim",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: []
  },
  {
    type: "function",
    name: "deposit",
    stateMutability: "payable",
    inputs: [],
    outputs: []
  },
  {
    type: "function",
    name: "withdraw",
    stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256" }],
    outputs: []
  },
  {
    type: "function",
    name: "withdrawAll",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: []
  }
] as const;
