import { Copy, Wallet2 } from "lucide-react";
import { toast } from "sonner";
import { useAccount, useBalance, useChainId, useEnsName } from "wagmi";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CHAIN_META } from "@/lib/constants";
import { formatEthAmount, truncateAddress } from "@/lib/formatters";

export function WalletOverview() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { data: ens } = useEnsName({ address });
  const { data: balance } = useBalance({ address });
  const chainMeta = CHAIN_META[chainId as keyof typeof CHAIN_META];

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow opacity-80" />
      <CardHeader className="relative pb-1">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Connected wallet</p>
            <CardTitle className="mt-2 text-lg">{ens ?? "Wallet Account"}</CardTitle>
          </div>
          <div className="glass-sm flex h-10 w-10 items-center justify-center rounded-full">
            <Wallet2 className="h-4 w-4 text-primarySoft" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-4">
        <div className="flex items-center gap-2">
          <p className="font-mono text-sm text-white/90">{truncateAddress(address ?? "")}</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={async () => {
                    if (address) {
                      await navigator.clipboard.writeText(address);
                      toast.success("Address copied");
                    }
                  }}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy address</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {chainMeta && (
            <Badge variant="secondary" className="gap-1.5">
              <span className={`h-2 w-2 rounded-full ${chainMeta.color}`} />
              {chainMeta.name}
            </Badge>
          )}
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Total native balance</p>
          <p className="font-balance mt-1 text-4xl font-semibold text-gradient md:text-5xl">
            {formatEthAmount(balance?.value)} ETH
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
