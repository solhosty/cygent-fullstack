"use client";

import { useMemo } from "react";
import { parseEther } from "viem";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import {
  targetChainId,
  whitelistClaimAbi,
  whitelistClaimAddress
} from "@/lib/contract";

type HexProof = readonly `0x${string}`[];

export function useWhitelistClaim() {
  const { address } = useAccount();
  const { writeContractAsync, data: txHash, isPending } = useWriteContract();

  const ownerRead = useReadContract({
    address: whitelistClaimAddress,
    abi: whitelistClaimAbi,
    functionName: "owner",
    chainId: targetChainId,
    query: { refetchInterval: 8_000 }
  });

  const claimedRead = useReadContract({
    address: whitelistClaimAddress,
    abi: whitelistClaimAbi,
    functionName: "claimed",
    args: [address ?? "0x0000000000000000000000000000000000000000"],
    chainId: targetChainId,
    query: { enabled: Boolean(address), refetchInterval: 8_000 }
  });

  const pausedRead = useReadContract({
    address: whitelistClaimAddress,
    abi: whitelistClaimAbi,
    functionName: "paused",
    chainId: targetChainId,
    query: { refetchInterval: 8_000 }
  });

  const claimAmountRead = useReadContract({
    address: whitelistClaimAddress,
    abi: whitelistClaimAbi,
    functionName: "claimAmount",
    chainId: targetChainId,
    query: { refetchInterval: 8_000 }
  });

  const merkleRootRead = useReadContract({
    address: whitelistClaimAddress,
    abi: whitelistClaimAbi,
    functionName: "merkleRoot",
    chainId: targetChainId,
    query: { refetchInterval: 8_000 }
  });

  const waitResult = useWaitForTransactionReceipt({ hash: txHash });

  const isOwner = useMemo(() => {
    if (!address || !ownerRead.data) {
      return false;
    }
    return address.toLowerCase() === String(ownerRead.data).toLowerCase();
  }, [address, ownerRead.data]);

  const merkleRoot = merkleRootRead.data ? String(merkleRootRead.data) : "0x";
  const hasMerkleRoot = merkleRoot !== "0x";

  async function claim(proof: HexProof) {
    await writeContractAsync({
      address: whitelistClaimAddress,
      abi: whitelistClaimAbi,
      functionName: "claim",
      args: [proof],
      chainId: targetChainId
    });
  }

  async function setMerkleRoot(root: `0x${string}`) {
    await writeContractAsync({
      address: whitelistClaimAddress,
      abi: whitelistClaimAbi,
      functionName: "setMerkleRoot",
      args: [root],
      chainId: targetChainId
    });
  }

  async function setClaimAmountEth(amountEth: string) {
    await writeContractAsync({
      address: whitelistClaimAddress,
      abi: whitelistClaimAbi,
      functionName: "setClaimAmount",
      args: [parseEther(amountEth)],
      chainId: targetChainId
    });
  }

  async function depositEth(amountEth: string) {
    await writeContractAsync({
      address: whitelistClaimAddress,
      abi: whitelistClaimAbi,
      functionName: "deposit",
      value: parseEther(amountEth),
      chainId: targetChainId
    });
  }

  async function pause() {
    await writeContractAsync({
      address: whitelistClaimAddress,
      abi: whitelistClaimAbi,
      functionName: "pause",
      chainId: targetChainId
    });
  }

  async function unpause() {
    await writeContractAsync({
      address: whitelistClaimAddress,
      abi: whitelistClaimAbi,
      functionName: "unpause",
      chainId: targetChainId
    });
  }

  return {
    claim,
    setMerkleRoot,
    setClaimAmountEth,
    depositEth,
    pause,
    unpause,
    claimHash: txHash,
    isClaimPending: isPending,
    isAdminPending: isPending,
    hasClaimed: Boolean(claimedRead.data),
    isPaused: Boolean(pausedRead.data),
    claimAmountWei: claimAmountRead.data ? String(claimAmountRead.data) : "0",
    merkleRoot,
    hasMerkleRoot,
    isOwner,
    isTxMined: waitResult.isSuccess
  };
}
