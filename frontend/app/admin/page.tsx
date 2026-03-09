"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { useWhitelistClaim } from "@/hooks/useWhitelistClaim";

export default function AdminPage() {
  const {
    isOwner,
    isPaused,
    setMerkleRoot,
    setClaimAmountEth,
    depositEth,
    pause,
    unpause,
    isAdminPending
  } = useWhitelistClaim();

  const [root, setRoot] = useState("");
  const [claimAmountEth, setClaimAmountEth] = useState("0.01");
  const [depositAmountEth, setDepositAmountEth] = useState("0.5");

  async function submitSetRoot() {
    try {
      await setMerkleRoot(root as `0x${string}`);
      toast.success("Merkle root update submitted");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Root update failed";
      toast.error(message);
    }
  }

  async function submitClaimAmount() {
    try {
      await setClaimAmountEth(claimAmountEth);
      toast.success("Claim amount update submitted");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Claim amount update failed";
      toast.error(message);
    }
  }

  async function submitDeposit() {
    try {
      await depositEth(depositAmountEth);
      toast.success("Deposit submitted");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Deposit failed";
      toast.error(message);
    }
  }

  async function submitPauseToggle() {
    try {
      if (isPaused) {
        await unpause();
        toast.success("Unpause submitted");
      } else {
        await pause();
        toast.success("Pause submitted");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Pause operation failed";
      toast.error(message);
    }
  }

  return (
    <main className="pt-8 sm:pt-12">
      <section className="rounded-2xl border border-white/10 bg-black/35 p-6 backdrop-blur-xl">
        <h1 className="font-display text-3xl font-semibold text-white">Admin</h1>
        <p className="mt-2 text-slate-200">
          Owner-only controls for Merkle root updates, claim amount, funding, and pause flow.
        </p>

        <div className="mt-6 rounded-xl border border-white/10 bg-black/25 p-4 text-sm text-slate-200">
          <p>Owner connected: {isOwner ? "Yes" : "No"}</p>
          <p>Paused: {isPaused ? "Yes" : "No"}</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-100">New Merkle Root</label>
            <input
              value={root}
              onChange={(event) => setRoot(event.target.value)}
              className="w-full rounded-xl border border-white/15 bg-black/35 px-3 py-2 text-sm text-slate-100"
              placeholder="0x..."
            />
            <button
              type="button"
              onClick={submitSetRoot}
              disabled={!isOwner || isAdminPending}
              className="w-full rounded-xl border border-accent/60 px-4 py-2 text-sm font-semibold text-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              Update Root
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-100">Claim Amount (ETH)</label>
            <input
              value={claimAmountEth}
              onChange={(event) => setClaimAmountEth(event.target.value)}
              className="w-full rounded-xl border border-white/15 bg-black/35 px-3 py-2 text-sm text-slate-100"
            />
            <button
              type="button"
              onClick={submitClaimAmount}
              disabled={!isOwner || isAdminPending}
              className="w-full rounded-xl border border-accent/60 px-4 py-2 text-sm font-semibold text-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              Update Claim Amount
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-100">Deposit ETH</label>
            <input
              value={depositAmountEth}
              onChange={(event) => setDepositAmountEth(event.target.value)}
              className="w-full rounded-xl border border-white/15 bg-black/35 px-3 py-2 text-sm text-slate-100"
            />
            <button
              type="button"
              onClick={submitDeposit}
              disabled={!isOwner || isAdminPending}
              className="w-full rounded-xl border border-accent/60 px-4 py-2 text-sm font-semibold text-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              Deposit
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-100">Emergency Control</label>
            <button
              type="button"
              onClick={submitPauseToggle}
              disabled={!isOwner || isAdminPending}
              className="w-full rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPaused ? "Unpause Claims" : "Pause Claims"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
