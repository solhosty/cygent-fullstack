"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

import {
  getAddressProofResult,
  getLeaf,
  rootMatchesTreeData
} from "@/lib/merkle";
import { useWhitelistClaim } from "@/hooks/useWhitelistClaim";
import { loadTreeData } from "@/lib/whitelistTreeStorage";
import type { MerkleTreeData } from "@/lib/merkle";

export default function ClaimPage() {
  const { address, isConnected } = useAccount();
  const [savedTreeData, setSavedTreeData] = useState<MerkleTreeData | null>(null);
  const [checkAddress, setCheckAddress] = useState("");

  const {
    claim,
    isClaimPending,
    claimHash,
    hasClaimed,
    claimAmountWei,
    isPaused,
    merkleRoot,
    hasMerkleRoot
  } = useWhitelistClaim();

  useEffect(() => {
    setSavedTreeData(loadTreeData());
  }, []);

  const leaf = useMemo(() => (address ? getLeaf(address) : null), [address]);
  const canUseStoredTree = useMemo(() => {
    if (!savedTreeData || !hasMerkleRoot) {
      return false;
    }
    return rootMatchesTreeData(savedTreeData, merkleRoot);
  }, [hasMerkleRoot, merkleRoot, savedTreeData]);

  const connectedProofResult = useMemo(
    () => getAddressProofResult(savedTreeData, address ?? ""),
    [address, savedTreeData]
  );

  const checkedProofResult = useMemo(
    () => getAddressProofResult(savedTreeData, checkAddress),
    [checkAddress, savedTreeData]
  );

  const claimProof = useMemo(
    () => (canUseStoredTree ? connectedProofResult.proof : []),
    [canUseStoredTree, connectedProofResult.proof]
  );

  const isEligible = Boolean(address && canUseStoredTree && connectedProofResult.exists);

  useEffect(() => {
    if (address && !checkAddress) {
      setCheckAddress(address);
    }
  }, [address, checkAddress]);

  const checkAddressResult = useMemo(() => {
    if (!checkAddress) {
      return "Enter an address to check";
    }
    if (!savedTreeData) {
      return "No saved whitelist tree data found";
    }
    if (!canUseStoredTree) {
      return "Saved tree root does not match on-chain root";
    }

    return checkedProofResult.exists
      ? "Address is eligible in saved tree"
      : "Address not found in saved tree";
  }, [canUseStoredTree, checkAddress, checkedProofResult.exists, savedTreeData]);

  async function onClaim() {
    if (!address) {
      toast.error("Connect wallet first");
      return;
    }

    if (!isEligible) {
      toast.error("Connected wallet has no valid proof for the on-chain root");
      return;
    }

    try {
      await claim(claimProof);
      toast.success("Claim transaction submitted");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Claim failed";
      toast.error(message);
    }
  }

  return (
    <main className="pt-8 sm:pt-12">
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/35 p-6 backdrop-blur-xl">
          <h1 className="font-display text-3xl font-semibold text-white">Claim</h1>
          <p className="mt-3 text-slate-200">
            Connect your wallet, verify eligibility against the active on-chain root, and submit
            claim.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-slate-300">
            <li>Connected: {isConnected ? "Yes" : "No"}</li>
            <li>Paused: {isPaused ? "Yes" : "No"}</li>
            <li>Already claimed: {hasClaimed ? "Yes" : "No"}</li>
            <li>Claim amount (wei): {claimAmountWei}</li>
            <li>On-chain Merkle root: {merkleRoot}</li>
            <li>Saved tree loaded: {savedTreeData ? "Yes" : "No"}</li>
            <li>Saved root matches on-chain root: {canUseStoredTree ? "Yes" : "No"}</li>
            <li>Leaf: {leaf ?? "-"}</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/35 p-6 backdrop-blur-xl">
          <label className="mb-2 block text-sm font-semibold text-slate-100">
            Check address eligibility
          </label>
          <input
            value={checkAddress}
            onChange={(event) => setCheckAddress(event.target.value)}
            className="w-full rounded-xl border border-white/15 bg-black/35 px-3 py-2 text-sm text-slate-100"
            placeholder="0x..."
          />

          <div className="mt-4 text-sm text-slate-300">
            <p>{checkAddressResult}</p>
            <p>Proof length: {checkedProofResult.proof.length}</p>
            <p>Checker eligible: {canUseStoredTree && checkedProofResult.exists ? "Yes" : "No"}</p>
            <p>Connected wallet eligible: {isEligible ? "Yes" : "No"}</p>
          </div>

          <button
            type="button"
            onClick={onClaim}
            disabled={!isConnected || isPaused || hasClaimed || isClaimPending || !isEligible}
            className="mt-6 w-full rounded-xl bg-accent px-4 py-3 font-semibold text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isClaimPending ? "Submitting..." : "Claim ETH"}
          </button>

          {claimHash ? <p className="mt-3 break-all text-xs text-slate-300">Tx: {claimHash}</p> : null}
        </div>
      </section>
    </main>
  );
}
