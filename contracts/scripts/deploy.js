const hre = require("hardhat");
require("dotenv").config();
const {
  DEFAULT_TEST_ADDRESSES,
  buildMerkleData,
  writeMerkleDataToFile
} = require("./generateMerkleTree");

async function main() {
  let initialMerkleRoot = process.env.INITIAL_MERKLE_ROOT;
  const initialClaimAmount = process.env.INITIAL_CLAIM_AMOUNT_WEI;
  const isLocal = ["hardhat", "localhost"].includes(hre.network.name);

  if (!initialClaimAmount) {
    throw new Error("INITIAL_CLAIM_AMOUNT_WEI is required");
  }

  if (!initialMerkleRoot && isLocal) {
    const data = buildMerkleData(DEFAULT_TEST_ADDRESSES);
    initialMerkleRoot = data.root;

    console.log("No INITIAL_MERKLE_ROOT provided for local network");
    console.log("Auto-generated Merkle root:", initialMerkleRoot);
    console.log("Sample whitelist addresses:", data.addresses);

    if (process.env.MERKLE_TREE_DATA_PATH) {
      const outputPath = writeMerkleDataToFile(data, process.env.MERKLE_TREE_DATA_PATH);
      console.log("Merkle tree JSON written to:", outputPath);
    }
  } else if (!initialMerkleRoot) {
    throw new Error("INITIAL_MERKLE_ROOT is required for non-local networks");
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
