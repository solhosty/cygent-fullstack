# Cygent Fullstack Whitelist Claim

This monorepo contains:
- `contracts/` - Hardhat workspace for secure ETH whitelist claim contracts
- `frontend/` - Next.js App Router UI for claim and admin operations

## Quick Start

1. Install contract dependencies

```bash
cd contracts
npm install
```

2. Install frontend dependencies

```bash
cd frontend
npm install
```

3. Create environment files in both workspaces

```bash
cd contracts
cp .env.example .env

cd ../frontend
cp .env.example .env.local
```

4. Fill required environment variables
- `contracts/.env`
  - `SEPOLIA_RPC_URL`
  - `PRIVATE_KEY`
  - `ETHERSCAN_API_KEY`
  - `INITIAL_MERKLE_ROOT`
  - `INITIAL_CLAIM_AMOUNT_WEI`
- `frontend/.env.local`
  - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
  - `NEXT_PUBLIC_CONTRACT_ADDRESS`
  - `NEXT_PUBLIC_CHAIN_ID`

5. Run local chain and frontend in parallel (two terminals)

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

6. Optional contract checks

```bash
cd contracts
npm run compile
npm test
```

7. Deploy to Sepolia

```bash
cd contracts
npm run deploy:sepolia
```

After deployment, copy the printed contract address into `frontend/.env.local` as `NEXT_PUBLIC_CONTRACT_ADDRESS`.

## Security Operations Notes

- Pause and emergency flow
  - Use admin route (`/admin`) to call pause and unpause
  - Claims are blocked while paused at both UI and contract level
- Merkle root hygiene
  - Build whitelist from normalized lowercase checksummed-safe addresses
  - Verify root off-chain before updating on-chain
  - Treat root updates as sensitive admin actions and announce to users
- Funding discipline
  - Ensure contract has enough ETH before enabling claim rounds
  - `claimAmount` updates should be coordinated with available balance
