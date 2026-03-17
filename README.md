# Cygent Wallet App

Full-stack wallet dashboard with a Vite + React frontend and Foundry smart contracts.

## Tech Stack

- Frontend: Vite, React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- Web3: RainbowKit, wagmi, viem, React Query
- Contracts: Foundry, Solidity `0.8.24`, OpenZeppelin
- CI/CD: GitHub Actions + GitHub Pages deployment

## Prerequisites

- Node.js `22+`
- npm `10+` (local workspace scripts use npm)
- Foundry (`forge`, `cast`, `anvil`)

## Setup

1. Install workspace dependencies:

```bash
npm install
```

2. Frontend environment:

```bash
cp frontend/.env.example frontend/.env
```

3. Contracts environment:

```bash
cp contracts/.env.example contracts/.env
```

4. Install Foundry libraries:

```bash
cd contracts
forge install OpenZeppelin/openzeppelin-contracts --no-git
forge install foundry-rs/forge-std --no-git
```

## Environment Variables

### Frontend (`frontend/.env`)

- `VITE_WALLETCONNECT_PROJECT_ID`
- `VITE_ALCHEMY_API_KEY`
- `VITE_ETHERSCAN_API_KEY`
- `VITE_POLYGONSCAN_API_KEY`

### Contracts (`contracts/.env`)

- `SEPOLIA_RPC_URL`
- `PRIVATE_KEY`
- `ETHERSCAN_API_KEY`

## Scripts

From repository root:

- `npm run dev` - start frontend dev server
- `npm run build` - build frontend bundle
- `npm run test:contracts` - run Foundry tests
- `npm run deploy:contracts` - deploy `CygentToken` via Foundry script

## Project Structure

```text
.
├── contracts/
│   ├── foundry.toml
│   ├── script/DeployCygentToken.s.sol
│   ├── src/CygentToken.sol
│   └── test/CygentToken.t.sol
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── providers/
│   ├── package.json
│   └── vite.config.ts
└── .github/workflows/deploy.yml
```
