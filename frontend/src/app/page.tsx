"use client";

import Link from "next/link";
import { formatEther } from "viem";
import { useReadContract } from "wagmi";

import { StatCard } from "@/components/stat-card";
import { WHITELIST_CLAIM_ADDRESS, whitelistClaimAbi } from "@/lib/contract";

export default function HomePage() {
  const { data: claimedCount } = useReadContract({
    abi: whitelistClaimAbi,
    address: WHITELIST_CLAIM_ADDRESS,
    functionName: "totalClaimedCount"
  });

  const { data: claimedAmount } = useReadContract({
    abi: whitelistClaimAbi,
    address: WHITELIST_CLAIM_ADDRESS,
    functionName: "totalClaimedAmount"
  });

  const { data: contractBalance } = useReadContract({
    abi: whitelistClaimAbi,
    address: WHITELIST_CLAIM_ADDRESS,
    functionName: "contractBalance"
  });

  return (
    <div className="space-y-8">
      <section className="panel relative overflow-hidden">
        <div className="absolute -right-6 -top-6 text-6xl opacity-70">✨</div>
        <div className="absolute -bottom-4 left-4 text-5xl opacity-60">🎈</div>

        <p className="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink/70">
          Sepolia Demo dApp
        </p>
        <h1 className="text-3xl font-black tracking-tight md:text-5xl">
          Whitelist ETH Claim, but make it fun 🎊
        </h1>
        <p className="mt-4 max-w-2xl text-base text-ink/75 md:text-lg">
          Eligible wallets can claim exactly <strong>0.01 ETH</strong> one time. Owners can
          manage whitelist entries and contract funding from the admin panel.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="button-primary" href="/claim">
            Go to Claim
          </Link>
          <Link className="button-secondary" href="/admin">
            Open Admin
          </Link>
        </div>
      </section>

      <section className="card-grid">
        <StatCard
          title="Total Claims"
          value={claimedCount ? claimedCount.toString() : "0"}
          subtitle="Successful one-time payouts"
        />
        <StatCard
          title="Total Claimed"
          value={`${claimedAmount ? formatEther(claimedAmount) : "0"} ETH`}
          subtitle="Cumulative distribution"
        />
        <StatCard
          title="Contract Balance"
          value={`${contractBalance ? formatEther(contractBalance) : "0"} ETH`}
          subtitle="Available for future claims"
        />
      </section>
    </div>
  );
}
