import { Home, Image, Menu, WalletCards } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { NetworkSwitcher } from "@/components/NetworkSwitcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/transactions", label: "Activity", icon: WalletCards },
  { to: "/nfts", label: "NFTs", icon: Image }
];

export function MobileNav() {
  const location = useLocation();

  return (
    <div className="md:hidden">
      <div className="glass fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-2xl px-3 py-2">
        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "rounded-xl px-3 py-2 text-xs text-white/70",
                location.pathname === link.to && "bg-white/10 text-white"
              )}
            >
              <span className="flex items-center gap-1.5">
                <link.icon className="h-3.5 w-3.5" />
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="h-9 w-9">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-3xl">
            <div className="space-y-4">
              <p className="font-display text-base text-gradient">CYGENT</p>
              <NetworkSwitcher />
              <div className="space-y-2">
                {links.map((link) => (
                  <Link key={link.to} to={link.to} className="glass-sm block rounded-xl px-3 py-2 text-sm">
                    {link.label}
                  </Link>
                ))}
              </div>
              <ConnectWalletButton />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
