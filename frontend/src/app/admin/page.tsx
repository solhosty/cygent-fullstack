"use client";

import { FormEvent, useMemo, useState } from "react";
import { formatEther, isAddress, parseEther } from "viem";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import { EXPLORER_BASE_URL, WHITELIST_CLAIM_ADDRESS, whitelistClaimAbi } from "@/lib/contract";

export default function AdminPage() {
  const { address, isConnected } = useAccount();
  const [targetAddress, setTargetAddress] = useState("");
  const [depositEth, setDepositEth] = useState("0.05");
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const [feedback, setFeedback] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { writeContractAsync, isPending } = useWriteContract();
  const { isLoading: txConfirming, isSuccess: txSuccess } = useWaitForTransactionReceipt({ hash });

  const { data: ownerAddress } = useReadContract({
    abi: whitelistClaimAbi,
    address: WHITELIST_CLAIM_ADDRESS,
    functionName: "owner",
    query: { refetchInterval: 5000 }
  });

  const { data: whitelistMembers, refetch: refetchWhitelist } = useReadContract({
    abi: whitelistClaimAbi,
    address: WHITELIST_CLAIM_ADDRESS,
    functionName: "getWhitelist",
    query: { refetchInterval: 5000 }
  });

  const { data: contractBalance, refetch: refetchContractBalance } = useReadContract({
    abi: whitelistClaimAbi,
    address: WHITELIST_CLAIM_ADDRESS,
    functionName: "contractBalance",
    query: { refetchInterval: 5000 }
  });

  const { data: totalClaimedCount, refetch: refetchClaimedCount } = useReadContract({
    abi: whitelistClaimAbi,
    address: WHITELIST_CLAIM_ADDRESS,
    functionName: "totalClaimedCount",
    query: { refetchInterval: 5000 }
  });

  const isOwner = useMemo(() => {
    if (!address || !ownerAddress) {
      return false;
    }
    return address.toLowerCase() === ownerAddress.toLowerCase();
  }, [address, ownerAddress]);

  const resetMessages = () => {
    setFeedback("");
    setErrorMessage("");
  };

  const runTx = async (tx: Promise<`0x${string}`>, successMessage: string) => {
    resetMessages();
    try {
      const txHash = await tx;
      setHash(txHash);
      setFeedback(successMessage);
      await refetchWhitelist();
      await refetchContractBalance();
      await refetchClaimedCount();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Transaction failed";
      setErrorMessage(message);
    }
  };

  const onAdd = async (event: FormEvent) => {
    event.preventDefault();
    if (!isAddress(targetAddress)) {
      setErrorMessage("Enter a valid address");
      return;
    }

    await runTx(
      writeContractAsync({
        abi: whitelistClaimAbi,
        address: WHITELIST_CLAIM_ADDRESS,
        functionName: "addToWhitelist",
        args: [targetAddress]
      }),
      "Address added to whitelist"
    );
  };

  const onRemove = async () => {
    if (!isAddress(targetAddress)) {
      setErrorMessage("Enter a valid address");
      return;
    }

    await runTx(
      writeContractAsync({
        abi: whitelistClaimAbi,
        address: WHITELIST_CLAIM_ADDRESS,
        functionName: "removeFromWhitelist",
        args: [targetAddress]
      }),
      "Address removed from whitelist"
    );
  };

  const onDeposit = async () => {
    await runTx(
      writeContractAsync({
        abi: whitelistClaimAbi,
        address: WHITELIST_CLAIM_ADDRESS,
        functionName: "deposit",
        value: parseEther(depositEth || "0")
      }),
      "Deposit submitted"
    );
  };

  const onWithdrawAll = async () => {
    await runTx(
      writeContractAsync({
        abi: whitelistClaimAbi,
        address: WHITELIST_CLAIM_ADDRESS,
        functionName: "withdrawAll"
      }),
      "Withdraw transaction submitted"
    );
  };

  return (
    <div className="space-y-6">
      <section className="panel">
        <h1 className="text-3xl font-black">Admin Console 🛠️</h1>
        <p className="mt-2 text-sm text-ink/70">Contract: {WHITELIST_CLAIM_ADDRESS}</p>
        {ownerAddress ? <p className="mt-1 text-sm text-ink/70">Owner: {ownerAddress}</p> : null}

        {!isConnected ? (
          <p className="mt-4 rounded-xl bg-mustard/30 p-3 text-sm text-ink">
            Connect wallet to use admin controls
          </p>
        ) : null}

        {isConnected && !isOwner ? (
          <p className="mt-4 rounded-xl bg-coral/10 p-3 text-sm text-coral">
            Connected wallet is not the owner. Admin actions are disabled.
          </p>
        ) : null}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="panel space-y-4">
          <h2 className="text-xl font-bold">Whitelist Management</h2>
          <form onSubmit={onAdd} className="space-y-3">
            <input
              className="w-full rounded-xl border border-ink/20 bg-white px-3 py-2 outline-none focus:border-teal"
              placeholder="0x..."
              value={targetAddress}
              onChange={(event) => setTargetAddress(event.target.value)}
              disabled={!isOwner || isPending || txConfirming}
            />
            <div className="flex gap-3">
              <button
                type="submit"
                className="button-primary flex-1"
                disabled={!isOwner || isPending || txConfirming}
              >
                Add
              </button>
              <button
                type="button"
                className="button-secondary flex-1"
                onClick={onRemove}
                disabled={!isOwner || isPending || txConfirming}
              >
                Remove
              </button>
            </div>
          </form>

          <div className="rounded-xl border border-white/70 bg-white p-4">
            <p className="mb-2 text-sm font-semibold">Current whitelist</p>
            <ul className="max-h-48 space-y-1 overflow-auto text-xs text-ink/80">
              {(whitelistMembers ?? []).map((item) => (
                <li key={item} className="rounded bg-cream px-2 py-1">
                  {item}
                </li>
              ))}
              {!whitelistMembers || whitelistMembers.length === 0 ? (
                <li className="text-ink/50">No addresses yet</li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="panel space-y-4">
          <h2 className="text-xl font-bold">Treasury Actions</h2>
          <label className="block">
            <span className="mb-2 block text-sm text-ink/70">Deposit ETH amount</span>
            <input
              className="w-full rounded-xl border border-ink/20 bg-white px-3 py-2 outline-none focus:border-teal"
              value={depositEth}
              onChange={(event) => setDepositEth(event.target.value)}
              disabled={!isOwner || isPending || txConfirming}
            />
          </label>
          <button
            type="button"
            className="button-primary w-full"
            onClick={onDeposit}
            disabled={!isOwner || isPending || txConfirming}
          >
            Deposit
          </button>

          <button
            type="button"
            className="button-secondary w-full"
            onClick={onWithdrawAll}
            disabled={!isOwner || isPending || txConfirming}
          >
            Withdraw Remaining ETH
          </button>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/70 bg-white p-4">
              <p className="text-xs uppercase text-ink/60">Contract Balance</p>
              <p className="text-xl font-extrabold text-ink">
                {contractBalance ? formatEther(contractBalance) : "0"} ETH
              </p>
            </div>
            <div className="rounded-xl border border-white/70 bg-white p-4">
              <p className="text-xs uppercase text-ink/60">Claim Count</p>
              <p className="text-xl font-extrabold text-ink">
                {totalClaimedCount ? totalClaimedCount.toString() : "0"}
              </p>
            </div>
          </div>
        </div>
      </section>

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

      {feedback ? (
        <p className="rounded-xl bg-teal/10 p-3 text-sm text-teal">
          {feedback}
          {txSuccess ? " (confirmed)" : ""}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="rounded-xl bg-coral/10 p-3 text-sm text-coral">{errorMessage}</p>
      ) : null}
    </div>
  );
}
