// Usage:
// 1) node scripts/generateMerkleTree.js
// 2) Import in deploy.js:
//    const { buildMerkleData } = require("./generateMerkleTree");

const fs = require("fs");
const path = require("path");
const { getAddress, isAddress } = require("ethers");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

const DEFAULT_TEST_ADDRESSES = [
  "0x1Da0D7f1893fE53F4A2194EB3B33Ba5c24aCD288"
];

function normalizeAddress(value) {
  return getAddress(value.trim()).toLowerCase();
}

function parseAddressList(rawInput) {
  const source = rawInput ?? process.env.MERKLE_ADDRESSES ?? "";
  if (!source) {
    return [];
  }

  const parts = Array.isArray(source) ? source : String(source).split(/\s|,/);
  const normalized = [];
  const seen = new Set();

  for (const part of parts) {
    const candidate = String(part).trim();
    if (!candidate) {
      continue;
    }
    if (!isAddress(candidate)) {
      throw new Error(`Invalid address in list: ${candidate}`);
    }

    const next = normalizeAddress(candidate);
    if (!seen.has(next)) {
      seen.add(next);
      normalized.push(next);
    }
  }

  return normalized;
}

function buildLeaf(address) {
  return keccak256(Buffer.from(address.slice(2), "hex"));
}

function buildMerkleData(addresses) {
  const normalized = parseAddressList(addresses);
  if (normalized.length === 0) {
    throw new Error("No valid addresses provided for Merkle tree generation");
  }

  const leaves = normalized.map((address) => buildLeaf(address));
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

  return {
    addresses: normalized,
    root: tree.getHexRoot(),
    leaves: leaves.map((leaf) => `0x${leaf.toString("hex")}`),
    proofsByAddress: Object.fromEntries(
      normalized.map((address, index) => [address, tree.getHexProof(leaves[index])])
    )
  };
}

function writeMerkleDataToFile(data, outputPath) {
  const filePath = path.resolve(outputPath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  return filePath;
}

if (require.main === module) {
  const parsed = parseAddressList(process.env.MERKLE_ADDRESSES);
  const addresses = parsed.length > 0 ? parsed : DEFAULT_TEST_ADDRESSES;
  const data = buildMerkleData(addresses);

  console.log("Merkle root:", data.root);
  console.log("Address count:", data.addresses.length);
  console.log("Addresses:", data.addresses);

  if (process.env.MERKLE_TREE_DATA_PATH) {
    const writtenFile = writeMerkleDataToFile(data, process.env.MERKLE_TREE_DATA_PATH);
    console.log("Merkle tree JSON written to:", writtenFile);
  }
}

module.exports = {
  DEFAULT_TEST_ADDRESSES,
  parseAddressList,
  buildMerkleData,
  writeMerkleDataToFile
};
