"use client";

import { useMemo } from "react";
import toast from "react-hot-toast";
import { useAccount, useEnsName } from "wagmi";

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function WalletStatus() {
  const { address, chainId, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const label = useMemo(() => {
    if (!address) {
      return "Not connected";
    }
    return ensName ?? shortenAddress(address);
  }, [address, ensName]);

  async function copyAddress() {
    if (!address) {
      return;
    }
    await navigator.clipboard.writeText(address);
    toast.success("Address copied");
  }

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-2 text-xs text-slate-200">
      <span className="inline-block h-2 w-2 rounded-full bg-accent" />
      <span>{label}</span>
      <span className="text-slate-400">{isConnected ? `chain:${chainId}` : "wallet"}</span>
      {address ? (
        <button type="button" onClick={copyAddress} className="text-accent hover:underline">
          copy
        </button>
      ) : null}
    </div>
  );
}
