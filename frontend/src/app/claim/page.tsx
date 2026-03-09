"use client";

import confetti from "canvas-confetti";
import { useEffect, useMemo, useState } from "react";
import { formatEther } from "viem";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import {
  CLAIM_AMOUNT_ETH,
  EXPLORER_BASE_URL,
  WHITELIST_CLAIM_ADDRESS,
  whitelistClaimAbi
} from "@/lib/contract";

export default function ClaimPage() {
  const { address, isConnected } = useAccount();
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { writeContractAsync, isPending } = useWriteContract();
  const { isLoading: isTxConfirming, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({ hash });

  const { data: userStatus, refetch: refetchStatus } = useReadContract({
    abi: whitelistClaimAbi,
    address: WHITELIST_CLAIM_ADDRESS,
    functionName: "getUserStatus",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address), refetchInterval: 5000 }
  });

  const { data: claimedCount, refetch: refetchClaimedCount } = useReadContract({
    abi: whitelistClaimAbi,
    address: WHITELIST_CLAIM_ADDRESS,
    functionName: "totalClaimedCount",
    query: { refetchInterval: 5000 }
  });

  const { data: contractBalance, refetch: refetchContractBalance } = useReadContract({
    abi: whitelistClaimAbi,
    address: WHITELIST_CLAIM_ADDRESS,
    functionName: "contractBalance",
    query: { refetchInterval: 5000 }
  });

  const statusMessage = useMemo(() => {
    if (!isConnected) {
      return "Connect your wallet to check eligibility";
    }
    if (!userStatus) {
      return "Fetching your status...";
    }

    const [isWhitelisted, hasClaimed, canClaim] = userStatus;

    if (!isWhitelisted) {
      return "Not whitelisted yet. Ask the owner to add your address";
    }
    if (hasClaimed) {
      return "Already claimed. This drop is one-time per wallet";
    }
    if (canClaim) {
      return "Eligible! You can claim now";
    }
    return "Currently ineligible";
  }, [isConnected, userStatus]);

  const canClaimNow = userStatus ? userStatus[2] : false;

  const handleClaim = async () => {
    setErrorMessage("");

    try {
      const txHash = await writeContractAsync({
        abi: whitelistClaimAbi,
        address: WHITELIST_CLAIM_ADDRESS,
        functionName: "claim"
      });
      setHash(txHash);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to submit transaction";
      setErrorMessage(message);
    }
  };

  useEffect(() => {
    if (!isTxSuccess) {
      return;
    }

    void refetchStatus();
    void refetchClaimedCount();
    void refetchContractBalance();
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 }
    });
  }, [isTxSuccess, refetchClaimedCount, refetchContractBalance, refetchStatus]);

  return (
    <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
      <section className="panel animate-appear space-y-4">
        <h1 className="text-3xl font-black">Claim Your Drop 💸</h1>
        <p className="text-ink/75">
          Claim amount is fixed at <strong>{CLAIM_AMOUNT_ETH} ETH</strong> for each eligible
          wallet.
        </p>

        <div className="rounded-xl border border-ink/10 bg-white/80 p-4">
          <p className="text-sm font-semibold text-ink">Eligibility status</p>
          <p className="mt-1 text-sm text-ink/70">{statusMessage}</p>
        </div>

        <button
          type="button"
          className="button-primary w-full"
          disabled={!isConnected || !canClaimNow || isPending || isTxConfirming}
          onClick={handleClaim}
        >
          {isPending || isTxConfirming ? "Processing claim..." : "Claim 0.01 ETH"}
        </button>

        {hash ? (
          <a
            className="inline-flex text-sm font-medium text-teal hover:underline"
            href={`${EXPLORER_BASE_URL}/tx/${hash}`}
            target="_blank"
            rel="noreferrer"
          >
            View transaction on Etherscan
          </a>
        ) : null}

        {isTxSuccess ? (
          <p className="rounded-xl bg-teal/10 p-3 text-sm font-medium text-teal">
            Claim successful. Funds were sent to your wallet 🎉
          </p>
        ) : null}

        {errorMessage ? (
          <p className="rounded-xl bg-coral/10 p-3 text-sm text-coral">{errorMessage}</p>
        ) : null}
      </section>

      <aside className="panel animate-appear space-y-3">
        <h2 className="text-xl font-bold">Live Stats</h2>
        <div className="rounded-xl border border-white/70 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-ink/60">Total claim count</p>
          <p className="mt-1 text-2xl font-extrabold text-ink">
            {claimedCount ? claimedCount.toString() : "0"}
          </p>
        </div>
        <div className="rounded-xl border border-white/70 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-ink/60">Contract balance</p>
          <p className="mt-1 text-2xl font-extrabold text-ink">
            {contractBalance ? formatEther(contractBalance) : "0"} ETH
          </p>
        </div>
      </aside>
    </div>
  );
}
