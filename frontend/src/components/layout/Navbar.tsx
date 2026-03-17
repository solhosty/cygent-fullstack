import { Link, useLocation } from "react-router-dom";
import { useChainId } from "wagmi";

import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { NetworkSwitcher } from "@/components/NetworkSwitcher";
import { Badge } from "@/components/ui/badge";
import { CHAIN_META } from "@/lib/constants";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/transactions", label: "Transactions" },
  { to: "/nfts", label: "NFT Gallery" }
];

export function Navbar() {
  const location = useLocation();
  const chainId = useChainId();
  const chainMeta = CHAIN_META[chainId as keyof typeof CHAIN_META];

  return (
    <header className="glass-lg mt-4 hidden items-center justify-between rounded-2xl px-4 py-3 md:flex">
      <div className="flex items-center gap-8">
        <p className="font-display text-lg tracking-tight text-gradient">CYGENT</p>
        <nav className="flex gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "group relative rounded-lg px-3 py-2 text-sm text-white/75 transition hover:text-white",
                location.pathname === link.to && "text-white"
              )}
            >
              {link.label}
              <span
                className={cn(
                  "absolute inset-x-2 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-primarySoft to-accent transition-transform duration-300",
                  location.pathname === link.to && "scale-x-100"
                )}
              />
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        {chainMeta && (
          <Badge variant="secondary" className="gap-2">
            <span className={cn("h-2 w-2 rounded-full", chainMeta.color)} />
            {chainMeta.name}
          </Badge>
        )}
        <NetworkSwitcher />
        <ConnectWalletButton />
      </div>
    </header>
  );
}
