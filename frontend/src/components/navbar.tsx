"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/claim", label: "Claim" },
  { href: "/admin", label: "Admin" }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-white/40 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-2 text-lg font-semibold text-ink">
          <span className="text-xl">🎉</span>
          <span>Whitelist Claim</span>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-ink text-white"
                    : "text-ink/75 hover:bg-white hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <ConnectButton accountStatus="address" showBalance={false} />
      </div>
    </header>
  );
}
