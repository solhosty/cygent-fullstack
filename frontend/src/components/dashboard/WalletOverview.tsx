import { Copy } from "lucide-react";
import { useAccount, useBalance, useEnsName } from "wagmi";
import { toast } from "sonner";

import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { formatEthAmount, truncateAddress } from "@/lib/formatters";

export function WalletOverview() {
  const { address } = useAccount();
  const { data: ens } = useEnsName({ address });
  const { data: balance } = useBalance({ address });

  return (
    <GlassCard className="space-y-3 p-6">
      <p className="text-sm text-white/60">Connected wallet</p>
      <div className="flex items-center gap-2 text-lg font-medium">
        <span>{ens ?? truncateAddress(address ?? "")}</span>
        <Button
          size="icon"
          variant="ghost"
          onClick={async () => {
            if (address) {
              await navigator.clipboard.writeText(address);
              toast.success("Address copied");
            }
          }}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-4xl font-semibold gradient-text">{formatEthAmount(balance?.value)} ETH</p>
    </GlassCard>
  );
}
