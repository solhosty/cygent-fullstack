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
  - `INITIAL_MERKLE_ROOT` (optional on local `hardhat`/`localhost`, required on public networks)
  - `INITIAL_CLAIM_AMOUNT_WEI`
  - `MERKLE_TREE_DATA_PATH` (optional output path for generated Merkle JSON)
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

8. Generate a custom Merkle tree artifact

```bash
cd contracts
npm run generate-merkle
```

If `MERKLE_TREE_DATA_PATH` is set, this command writes `{ addresses, root, leaves, proofsByAddress }` JSON that can be reused by the admin/claim UI flow.

## Local Deploy Defaults

- When deploying to `hardhat` or `localhost` without `INITIAL_MERKLE_ROOT`, `scripts/deploy.js` auto-generates a root from these default addresses:
  - `0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266`
  - `0x70997970c51812dc3a010c7d01b50e0d17dc79c8`
  - `0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc`
  - `0x90f79bf6eb2c4f870365e785982e1f101e93b906`
  - `0x15d34aaf54267db7d7c367839aaf71a00a2c6a65`
- On non-local networks, missing `INITIAL_MERKLE_ROOT` hard-fails deploy with an explicit error
- `MERKLE_TREE_DATA_PATH` can be used to persist the generated tree for frontend testing and admin record-keeping

## UI Responsibilities

- `/admin` owns whitelist lifecycle: parse addresses, generate tree, apply root, save/download tree artifacts
- `/claim` is consumer-only: reads on-chain root/state and claims only when saved tree data matches the active root

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
