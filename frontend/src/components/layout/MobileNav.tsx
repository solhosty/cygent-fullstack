import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { NetworkSwitcher } from "@/components/NetworkSwitcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MobileNav() {
  return (
    <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl md:hidden">
      <p className="font-semibold">Cygent Wallet</p>
      <div className="flex items-center gap-2">
        <NetworkSwitcher />
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="border-white/10 bg-[#0a0a0f] text-white">
            <div className="mt-8 flex flex-col gap-3">
              <Link to="/">Dashboard</Link>
              <Link to="/transactions">Transactions</Link>
              <Link to="/nfts">NFT Gallery</Link>
              <ConnectWalletButton />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
