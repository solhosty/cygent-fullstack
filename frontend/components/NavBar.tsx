"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import WalletStatus from "@/components/WalletStatus";

export default function NavBar() {
  return (
    <header className="sticky top-4 z-20 pt-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/15 bg-black/35 p-3 backdrop-blur-xl">
        <nav className="flex items-center gap-3 text-sm font-medium text-slate-200">
          <Link href="/" className="rounded-lg px-3 py-2 hover:bg-white/10">
            Home
          </Link>
          <Link href="/claim" className="rounded-lg px-3 py-2 hover:bg-white/10">
            Claim
          </Link>
          <Link href="/admin" className="rounded-lg px-3 py-2 hover:bg-white/10">
            Admin
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <WalletStatus />
          <ConnectButton showBalance={false} />
        </div>
      </div>
    </header>
  );
}
