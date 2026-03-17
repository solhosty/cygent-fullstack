import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Button } from "@/components/ui/button";
import { truncateAddress } from "@/lib/formatters";

export function ConnectWalletButton() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted, openAccountModal, openConnectModal, openChainModal }) => {
        if (!mounted || !account) {
          return (
            <Button
              className="animate-pulse-glow bg-gradient-to-r from-primary to-accent"
              onClick={openConnectModal}
            >
              Connect Wallet
            </Button>
          );
        }

        if (chain?.unsupported) {
          return (
            <Button variant="destructive" onClick={openChainModal}>
              Wrong network
            </Button>
          );
        }

        return (
          <Button variant="outline" onClick={openAccountModal}>
            {truncateAddress(account.address)}
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
}
