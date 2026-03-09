"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

import { getLeaf, getProof, parseAddressList } from "@/lib/merkle";
import { useWhitelistClaim } from "@/hooks/useWhitelistClaim";

export default function ClaimPage() {
  const { address, isConnected } = useAccount();
  const [rawList, setRawList] = useState("");
  const {
    claim,
    isClaimPending,
    claimHash,
    hasClaimed,
    claimAmountWei,
    isPaused
  } = useWhitelistClaim();

  const addresses = useMemo(() => parseAddressList(rawList), [rawList]);
  const leaf = useMemo(() => (address ? getLeaf(address) : null), [address]);
  const proof = useMemo(() => {
    if (!address || addresses.length === 0) {
      return [];
    }
    return getProof(addresses, address);
  }, [address, addresses]);

  const isEligible = Boolean(address && proof.length >= 0 && addresses.includes(address.toLowerCase()));

  async function onClaim() {
    if (!address) {
      toast.error("Connect wallet first");
      return;
    }

    if (!isEligible) {
      toast.error("Connected wallet is not in current local whitelist");
      return;
    }

    try {
      await claim(proof);
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
            Connect your wallet, paste your current whitelist snapshot, and submit claim.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-slate-300">
            <li>Connected: {isConnected ? "Yes" : "No"}</li>
            <li>Paused: {isPaused ? "Yes" : "No"}</li>
            <li>Already claimed: {hasClaimed ? "Yes" : "No"}</li>
            <li>Claim amount (wei): {claimAmountWei}</li>
            <li>Leaf: {leaf ?? "-"}</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/35 p-6 backdrop-blur-xl">
          <label className="mb-2 block text-sm font-semibold text-slate-100">
            Whitelist addresses (one per line)
          </label>
          <textarea
            value={rawList}
            onChange={(event) => setRawList(event.target.value)}
            className="h-44 w-full rounded-xl border border-white/15 bg-black/35 p-3 text-sm text-slate-100 outline-none focus:border-accent"
            placeholder="0x..."
          />

          <div className="mt-4 text-sm text-slate-300">
            <p>Parsed entries: {addresses.length}</p>
            <p>Proof length: {proof.length}</p>
            <p>Eligible: {isEligible ? "Yes" : "No"}</p>
          </div>

          <button
            type="button"
            onClick={onClaim}
            disabled={!isConnected || isPaused || hasClaimed || isClaimPending}
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
