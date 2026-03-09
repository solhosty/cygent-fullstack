# Cygent Fullstack Whitelist Claim

Monorepo for a Sepolia whitelist-claim dApp with:

- `contracts/` - Foundry smart contract project
- `frontend/` - Next.js + TypeScript + Tailwind + wagmi + RainbowKit UI

## Project Structure

```text
.
├── contracts/
│   ├── src/WhitelistClaim.sol
│   ├── script/DeployWhitelistClaim.s.sol
│   └── test/WhitelistClaim.t.sol
├── frontend/
│   └── src/app/{page.tsx,claim/page.tsx,admin/page.tsx}
├── .env.example
└── package.json
```

## Quick Start

### 1) Install prerequisites

- Foundry: https://book.getfoundry.sh/getting-started/installation
- Node.js 22+

### 2) Configure environment

Copy and fill root and app env files:

```bash
cp .env.example .env
cp contracts/.env.example contracts/.env
cp frontend/.env.example frontend/.env.local
```

### 3) Smart contracts (`contracts/`)

```bash
cd contracts
forge build
forge test -vvv
```

Deploy to Sepolia:

```bash
forge script script/DeployWhitelistClaim.s.sol:DeployWhitelistClaim \
  --rpc-url "$SEPOLIA_RPC_URL" \
  --private-key "$PRIVATE_KEY" \
  --broadcast
```

Optional dry run:

```bash
forge script script/DeployWhitelistClaim.s.sol:DeployWhitelistClaim \
  --rpc-url "$SEPOLIA_RPC_URL" \
  --private-key "$PRIVATE_KEY"
```

### 4) Frontend (`frontend/`)

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

### Root (`.env`)

- `SEPOLIA_RPC_URL`
- `PRIVATE_KEY`
- `ETHERSCAN_API_KEY`
- `NEXT_PUBLIC_SEPOLIA_RPC_URL`
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- `NEXT_PUBLIC_WHITELIST_CLAIM_ADDRESS`

### Contracts (`contracts/.env`)

- `SEPOLIA_RPC_URL`
- `PRIVATE_KEY`
- `ETHERSCAN_API_KEY`

### Frontend (`frontend/.env.local`)

- `NEXT_PUBLIC_SEPOLIA_RPC_URL`
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- `NEXT_PUBLIC_WHITELIST_CLAIM_ADDRESS`

## Root Convenience Scripts

From repository root:

```bash
npm run contracts:test
npm run contracts:deploy:sepolia
npm run frontend:dev
npm run frontend:build
```

## Manual Sepolia Flow

1. Deploy `WhitelistClaim` and copy deployed address
2. Set `NEXT_PUBLIC_WHITELIST_CLAIM_ADDRESS` in `frontend/.env.local`
3. Owner wallet on `/admin`: add whitelist addresses, deposit ETH
4. Whitelisted wallet on `/claim`: claim once (second claim blocked)
5. Non-whitelisted wallet should see ineligible status
6. Owner can withdraw remaining ETH on `/admin`
