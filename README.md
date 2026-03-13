# Cygent Fullstack Whitelist Claim

![Build Status](https://img.shields.io/badge/build-TBD-lightgrey)
![License](https://img.shields.io/badge/license-TBD-lightgrey)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Hardhat](https://img.shields.io/badge/Hardhat-2.22-F7DF1E)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6)

Production-ready full-stack Merkle whitelist claim system:
- `contracts/` - Hardhat workspace for secure ETH whitelist claim contracts
- `frontend/` - Next.js App Router UI for claim and admin operations

## Table of Contents

- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Environment Variables](#environment-variables)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Local Deploy Defaults](#local-deploy-defaults)
- [UI Responsibilities](#ui-responsibilities)
- [Security Operations Notes](#security-operations-notes)
- [Live Demo](#live-demo)
- [Contract Addresses](#contract-addresses)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js `18+`
- npm `9+`
- Hardhat toolchain (included via `contracts/package.json`)
- Foundry (optional, useful for advanced local Solidity workflows)
- Browser wallet (MetaMask and/or Rainbow-compatible wallet)
- WalletConnect Project ID for frontend wallet connectivity

## Tech Stack

| Layer | Version | Badge |
|---|---|---|
| Next.js | 14.2.x | ![Next.js](https://img.shields.io/badge/Next.js-14-black) |
| Hardhat | 2.22.x | ![Hardhat](https://img.shields.io/badge/Hardhat-2.22-F7DF1E) |
| Wagmi | 2.12.x | ![Wagmi](https://img.shields.io/badge/Wagmi-2.12-5A67D8) |
| Viem | 2.21.x | ![Viem](https://img.shields.io/badge/Viem-2.21-111827) |
| TypeScript | 5.6.x | ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6) |
| OpenZeppelin Contracts | 5.1.x | ![OpenZeppelin](https://img.shields.io/badge/OpenZeppelin-5.1-4E5EE4) |
| Tailwind CSS | 3.4.x | ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38BDF8) |

## Architecture Overview

The protocol uses a Merkle root to authorize one-time ETH claims.

```text
Admin list of addresses
        |
        v
Generate Merkle tree + proofs (off-chain)
        |
        v
Deploy/update contract with merkleRoot + claimAmount
        |
        v
Fund contract with ETH
        |
        v
User submits proof -> contract verifies leaf(address) -> transfers claimAmount
```

Core flow:
1. Admin prepares whitelist addresses and generates Merkle artifacts
2. Admin sets or updates root on-chain from `/admin`
3. Owner funds contract via `deposit`
4. Whitelisted user claims once from `/claim` with corresponding Merkle proof

## Environment Variables

### `contracts/.env`

| Variable | Required | Description | Example |
|---|---|---|---|
| `SEPOLIA_RPC_URL` | Yes (Sepolia) | RPC endpoint used for deployment and script calls | `https://sepolia.infura.io/v3/<key>` |
| `PRIVATE_KEY` | Yes (Sepolia) | Deployer wallet private key | `0xabc...` |
| `ETHERSCAN_API_KEY` | Yes (if verifying) | Etherscan API key for contract verification workflows | `ABC123...` |
| `INITIAL_MERKLE_ROOT` | Optional local, required public | Initial root at deploy; auto-generated for local when empty | `0x7f...` |
| `INITIAL_CLAIM_AMOUNT_WEI` | Yes | Per-wallet claim amount in wei | `100000000000000000` |
| `MERKLE_TREE_DATA_PATH` | Optional | Output JSON path for generated Merkle data | `./data/merkle.json` |

### `frontend/.env.local`

| Variable | Required | Description | Example |
|---|---|---|---|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Yes | WalletConnect project ID for wallet session creation | `a1b2c3d4...` |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Yes | Deployed `WhitelistClaim` contract address | `0x1234...` |
| `NEXT_PUBLIC_CHAIN_ID` | Yes | Chain ID used by wagmi config and UI guards | `11155111` |

## Quick Start

### 1) Install contract dependencies

```bash
cd contracts
npm install
```

### 2) Install frontend dependencies

```bash
cd frontend
npm install
```

### 3) Create environment files

```bash
cd contracts
cp .env.example .env

cd ../frontend
cp .env.example .env.local
```

### 4) Fill required environment variables

Use the [Environment Variables](#environment-variables) tables above.

### 5) Run local chain and frontend in parallel

Terminal 1 (contracts local node):

```bash
cd contracts
npm run node
```

Terminal 2 (frontend dev server):

```bash
cd frontend
npm run dev
```

### 6) Optional contract checks

```bash
cd contracts
npm run compile
npm test
```

### 7) Deploy to Sepolia

```bash
cd contracts
npm run deploy:sepolia
```

After deployment, copy the printed contract address into `frontend/.env.local` as `NEXT_PUBLIC_CONTRACT_ADDRESS`.

### 8) Generate custom Merkle tree artifact

```bash
cd contracts
npm run generate-merkle
```

If `MERKLE_TREE_DATA_PATH` is set, this command writes `{ addresses, root, leaves, proofsByAddress }` JSON for reuse in admin and claim flows.

## Project Structure

```text
cygent-fullstack/
├── contracts/
│   ├── contracts/
│   │   ├── IWhitelistClaim.sol
│   │   └── WhitelistClaim.sol
│   ├── scripts/
│   │   ├── deploy.js
│   │   └── generateMerkleTree.js
│   ├── test/
│   │   └── WhitelistClaim.test.js
│   ├── hardhat.config.js
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── admin/page.tsx
│   │   ├── claim/page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── package.json
└── README.md
```

## Testing

Run from the contracts workspace:

```bash
cd contracts
npm test
```

Compile + test in one pass:

```bash
cd contracts
npm run compile
npm test
```

Coverage (if enabled in your local Hardhat setup):

```bash
cd contracts
npx hardhat coverage
```

Current test suite (`contracts/test/WhitelistClaim.test.js`) validates:
- successful one-time claim for a whitelisted address
- invalid proof rejection
- replay claim protection
- owner-only operations and expected revert conditions

## Local Deploy Defaults

- Deploying to `hardhat` or `localhost` without `INITIAL_MERKLE_ROOT` auto-generates a root from built-in default addresses
- Deploying to non-local networks without `INITIAL_MERKLE_ROOT` fails with explicit error
- `MERKLE_TREE_DATA_PATH` can persist generated tree artifacts for frontend testing and admin record-keeping

## UI Responsibilities

- `/admin` manages whitelist lifecycle: parse addresses, generate tree, apply root, save/download tree artifacts
- `/claim` is consumer-only: reads on-chain root and claim state, and submits claims only when tree data matches active root

## Security Operations Notes

- Pause and emergency flow
  - use `/admin` for pause and unpause actions
  - claims are blocked while paused at both UI and contract levels
- Merkle root hygiene
  - normalize addresses before tree generation
  - verify root off-chain before on-chain updates
  - treat root updates as sensitive admin operations
- Funding discipline
  - ensure contract has sufficient ETH before claim rounds
  - coordinate `claimAmount` updates with available balance

## Live Demo

- TBD

## Contract Addresses

### Sepolia

- `WhitelistClaim`: `TBD`
- Deployment Tx: `TBD`

## Troubleshooting

### RPC connection errors

- Verify `SEPOLIA_RPC_URL` in `contracts/.env`
- Confirm the RPC provider key is valid and funded for request quota

### Wrong network in frontend

- Verify `NEXT_PUBLIC_CHAIN_ID` in `frontend/.env.local`
- Ensure connected wallet network matches configured chain ID

### Wallet connection fails

- Verify `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- Restart `npm run dev` after editing `.env.local`

### `Insufficient ETH` on claim

- Contract balance is lower than `claimAmount`
- Fund the contract from owner account before claims
