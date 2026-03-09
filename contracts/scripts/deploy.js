const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const initialMerkleRoot = process.env.INITIAL_MERKLE_ROOT;
  const initialClaimAmount = process.env.INITIAL_CLAIM_AMOUNT_WEI;

  if (!initialMerkleRoot) {
    throw new Error("INITIAL_MERKLE_ROOT is required");
  }

  if (!initialClaimAmount) {
    throw new Error("INITIAL_CLAIM_AMOUNT_WEI is required");
  }

  const Factory = await hre.ethers.getContractFactory("WhitelistClaim");
  const contract = await Factory.deploy(initialMerkleRoot, initialClaimAmount);
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("WhitelistClaim deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
