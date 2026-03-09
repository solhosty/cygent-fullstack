import { MerkleTree } from "merkletreejs";
import { encodePacked, getAddress, isAddress, keccak256 } from "viem";

export type HexString = `0x${string}`;

export type MerkleTreeData = {
  addresses: string[];
  root: HexString;
  leaves: HexString[];
  proofsByAddress: Record<string, HexString[]>;
};

export type AddressProofResult = {
  exists: boolean;
  proof: HexString[];
};

function normalizeAddress(address: string): string {
  return getAddress(address.trim()).toLowerCase();
}

function tryNormalizeAddress(address: string): string | null {
  try {
    return normalizeAddress(address);
  } catch {
    return null;
  }
}

function toBuffer(hexValue: `0x${string}`): Buffer {
  return Buffer.from(hexValue.slice(2), "hex");
}

function leafHex(address: string): `0x${string}` {
  const normalized = getAddress(address);
  return keccak256(encodePacked(["address"], [normalized]));
}

export function parseAddressList(raw: string): string[] {
  return Array.from(
    new Set(
      raw
        .split(/\s|,/) 
        .map((item) => item.trim())
        .filter((item) => isAddress(item))
        .map(normalizeAddress)
    )
  );
}

export function getLeaf(address: string): string {
  return leafHex(address);
}

function dedupeAndNormalize(addresses: string[]): string[] {
  return Array.from(new Set(addresses.map((value) => normalizeAddress(value))));
}

export function buildMerkleTreeData(addresses: string[]): MerkleTreeData {
  const normalized = dedupeAndNormalize(addresses);
  if (normalized.length === 0) {
    return {
      addresses: [],
      root: "0x",
      leaves: [],
      proofsByAddress: {}
    };
  }

  const leaves = normalized.map((item) => toBuffer(leafHex(item)));
  const hashFn = (data: Buffer) => toBuffer(keccak256(data));
  const tree = new MerkleTree(leaves, hashFn, { sortPairs: true });

  return {
    addresses: normalized,
    root: tree.getHexRoot() as HexString,
    leaves: leaves.map((leaf) => `0x${leaf.toString("hex")}` as HexString),
    proofsByAddress: Object.fromEntries(
      normalized.map((item, index) => [
        item,
        tree.getHexProof(leaves[index]) as HexString[]
      ])
    )
  };
}

export function compareMerkleRoots(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}

export function getProofFromTreeData(
  data: MerkleTreeData | null,
  address: string
): HexString[] {
  return getAddressProofResult(data, address).proof;
}

export function isAddressInTreeData(data: MerkleTreeData | null, address: string): boolean {
  if (!data) {
    return false;
  }

  const normalized = tryNormalizeAddress(address);
  if (!normalized) {
    return false;
  }

  return data.addresses.some((item) => item.toLowerCase() === normalized);
}

export function getAddressProofResult(
  data: MerkleTreeData | null,
  address: string
): AddressProofResult {
  if (!data) {
    return { exists: false, proof: [] };
  }

  const normalized = tryNormalizeAddress(address);
  if (!normalized) {
    return { exists: false, proof: [] };
  }

  const exists = isAddressInTreeData(data, normalized);
  if (!exists) {
    return { exists: false, proof: [] };
  }

  const directProof = data.proofsByAddress[normalized];
  if (directProof && directProof.length > 0) {
    return { exists: true, proof: directProof };
  }

  const rebuiltData = buildMerkleTreeData(data.addresses);
  return {
    exists: true,
    proof: rebuiltData.proofsByAddress[normalized] ?? []
  };
}

export function getRoot(addresses: string[]): string {
  return buildMerkleTreeData(addresses).root;
}

export function getProof(addresses: string[], userAddress: string): `0x${string}`[] {
  const data = buildMerkleTreeData(addresses);
  return getProofFromTreeData(data, userAddress);
}

export function rootMatchesTreeData(data: MerkleTreeData | null, root: string): boolean {
  if (!data) {
    return false;
  }
  return compareMerkleRoots(data.root, root);
}
