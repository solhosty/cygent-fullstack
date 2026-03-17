import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { truncateAddress } from "@/lib/formatters";

export function ConnectWalletButton() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted, openAccountModal, openConnectModal, openChainModal }) => {
        if (!mounted || !account) {
          return (
            <div className="gradient-border w-full md:w-auto">
              <Button className="h-11 w-full animate-pulse-glow bg-[#0d0d14] px-5" onClick={openConnectModal}>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            </div>
          );
        }

        if (chain?.unsupported) {
          return (
            <Button variant="destructive" className="bg-red-500/20 text-red-200 hover:bg-red-500/30" onClick={openChainModal}>
              Wrong network
            </Button>
          );
        }

        return (
          <Button variant="outline" className="h-10 rounded-full px-4" onClick={openAccountModal}>
            <span className="mr-2 h-2 w-2 rounded-full bg-success" />
            <span className="font-mono text-xs">{truncateAddress(account.address)}</span>
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
}
