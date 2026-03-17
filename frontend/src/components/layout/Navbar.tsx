import { Link, useLocation } from "react-router-dom";

import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { NetworkSwitcher } from "@/components/NetworkSwitcher";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/transactions", label: "Transactions" },
  { to: "/nfts", label: "NFT Gallery" }
];

export function Navbar() {
  const location = useLocation();

  return (
    <header className="mt-4 hidden items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl md:flex">
      <div className="flex items-center gap-8">
        <p className="text-lg font-semibold tracking-tight">Cygent Wallet</p>
        <nav className="flex gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "rounded-lg px-3 py-2 text-sm text-white/75 transition hover:text-white",
                location.pathname === link.to && "bg-white/10 text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <NetworkSwitcher />
        <ConnectWalletButton />
      </div>
    </header>
  );
}
