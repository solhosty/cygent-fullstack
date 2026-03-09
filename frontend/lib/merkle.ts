import { MerkleTree } from "merkletreejs";
import { encodePacked, getAddress, isAddress, keccak256 } from "viem";

function normalizeAddress(address: string): string {
  return getAddress(address.trim()).toLowerCase();
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

function buildTree(addresses: string[]): MerkleTree {
  const leaves = addresses.map((item) => toBuffer(leafHex(item)));
  const hashFn = (data: Buffer) => toBuffer(keccak256(data));
  return new MerkleTree(leaves, hashFn, { sortPairs: true });
}

export function getRoot(addresses: string[]): string {
  if (addresses.length === 0) {
    return "0x";
  }
  return `0x${buildTree(addresses).getRoot().toString("hex")}`;
}

export function getProof(addresses: string[], userAddress: string): `0x${string}`[] {
  const tree = buildTree(addresses);
  const proof = tree.getHexProof(toBuffer(leafHex(userAddress)));
  return proof as `0x${string}`[];
}
