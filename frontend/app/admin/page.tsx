"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import { useWhitelistClaim } from "@/hooks/useWhitelistClaim";
import { buildMerkleTreeData, parseAddressList } from "@/lib/merkle";
import {
  clearTreeData,
  downloadTreeData,
  saveTreeData
} from "@/lib/whitelistTreeStorage";

export default function AdminPage() {
  const {
    isOwner,
    isPaused,
    merkleRoot,
    setMerkleRoot,
    depositEth,
    pause,
    unpause,
    isAdminPending
  } = useWhitelistClaim();

  const [rawWhitelist, setRawWhitelist] = useState("");
  const [manualRoot, setManualRoot] = useState("");
  const [claimAmountEth, setClaimAmountEth] = useState("0.01");
  const [depositAmountEth, setDepositAmountEth] = useState("0.5");

  const parsedAddresses = useMemo(() => parseAddressList(rawWhitelist), [rawWhitelist]);
  const candidateTreeData = useMemo(
    () => buildMerkleTreeData(parsedAddresses),
    [parsedAddresses]
  );

  async function submitGeneratedRoot() {
    if (!candidateTreeData.root || candidateTreeData.root === "0x") {
      toast.error("Provide at least one valid whitelist address first");
      return;
    }

    try {
      await setMerkleRoot(candidateTreeData.root);
      saveTreeData(candidateTreeData);
      toast.success("Generated root applied and tree data saved");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Root update failed";
      toast.error(message);
    }
  }

  async function submitManualRoot() {
    if (!manualRoot.startsWith("0x") || manualRoot.length !== 66) {
      toast.error("Enter a valid bytes32 root");
      return;
    }

    try {
      await setMerkleRoot(manualRoot as `0x${string}`);
      toast.success("Manual root update submitted");
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

  function persistTreeData() {
    if (!candidateTreeData.root || candidateTreeData.root === "0x") {
      toast.error("Generate a tree from a valid whitelist first");
      return;
    }

    saveTreeData(candidateTreeData);
    toast.success("Whitelist tree data saved locally");
  }

  function exportTreeData() {
    if (!candidateTreeData.root || candidateTreeData.root === "0x") {
      toast.error("Generate a tree from a valid whitelist first");
      return;
    }

    const filename = `whitelist-tree-${candidateTreeData.root.slice(2, 10)}.json`;
    downloadTreeData(candidateTreeData, filename);
    toast.success("Tree JSON download started");
  }

  function resetSavedTreeData() {
    clearTreeData();
    toast.success("Saved tree data cleared");
  }

  return (
    <main className="pt-8 sm:pt-12">
      <section className="rounded-2xl border border-white/10 bg-black/35 p-6 backdrop-blur-xl">
        <h1 className="font-display text-3xl font-semibold text-white">Admin</h1>
        <p className="mt-2 text-slate-200">
          Owner-only controls for whitelist generation, root updates, claim amount, funding, and
          pause flow.
        </p>

        <div className="mt-6 rounded-xl border border-white/10 bg-black/25 p-4 text-sm text-slate-200">
          <p>Owner connected: {isOwner ? "Yes" : "No"}</p>
          <p>Paused: {isPaused ? "Yes" : "No"}</p>
          <p>On-chain root: {merkleRoot}</p>
        </div>

        <div className="mt-6 space-y-3 rounded-xl border border-white/10 bg-black/25 p-4">
          <label className="block text-sm font-medium text-slate-100">
            Whitelist addresses (one per line or comma separated)
          </label>
          <textarea
            value={rawWhitelist}
            onChange={(event) => setRawWhitelist(event.target.value)}
            className="h-36 w-full rounded-xl border border-white/15 bg-black/35 p-3 text-sm text-slate-100 outline-none focus:border-accent"
            placeholder="0x..."
          />

          <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
            <p>Parsed addresses: {candidateTreeData.addresses.length}</p>
            <p>Candidate root: {candidateTreeData.root}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/25 p-3 text-xs text-slate-300">
            <p className="font-semibold text-slate-100">Preview</p>
            {candidateTreeData.addresses.slice(0, 3).map((item) => (
              <p key={item} className="break-all">
                {item} - proof items: {candidateTreeData.proofsByAddress[item]?.length ?? 0}
              </p>
            ))}
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={submitGeneratedRoot}
              disabled={!isOwner || isAdminPending || candidateTreeData.root === "0x"}
              className="rounded-xl border border-accent/60 px-4 py-2 text-sm font-semibold text-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              Apply Generated Root
            </button>
            <button
              type="button"
              onClick={persistTreeData}
              disabled={candidateTreeData.root === "0x"}
              className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save Tree Locally
            </button>
            <button
              type="button"
              onClick={exportTreeData}
              disabled={candidateTreeData.root === "0x"}
              className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Download Tree JSON
            </button>
            <button
              type="button"
              onClick={resetSavedTreeData}
              className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100"
            >
              Clear Saved Tree Data
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-100">Manual Root Override</label>
            <input
              value={manualRoot}
              onChange={(event) => setManualRoot(event.target.value)}
              className="w-full rounded-xl border border-white/15 bg-black/35 px-3 py-2 text-sm text-slate-100"
              placeholder="0x..."
            />
            <button
              type="button"
              onClick={submitManualRoot}
              disabled={!isOwner || isAdminPending}
              className="w-full rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Apply Manual Root
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-100">
              Claim Amount (ETH)
            </label>
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
