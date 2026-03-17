import { ArrowDownLeft, ArrowUpRight, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { explorerByChainId } from "@/config/chains";
import { formatDateTime, truncateAddress } from "@/lib/formatters";
import type { ExplorerTx } from "@/hooks/useTransactionHistory";

type Props = {
  chainId: number;
  transactions: ExplorerTx[];
  isLoading: boolean;
};

export function TransactionList({ chainId, transactions, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (!transactions.length) {
    return <div className="glass-sm rounded-xl p-5 text-center text-sm text-muted-foreground">No transactions found for this page.</div>;
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <Card key={tx.hash} className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2">
              <span className="glass-sm mt-0.5 rounded-full p-1.5">
                {tx.value === "0" ? <ArrowDownLeft className="h-3.5 w-3.5 text-primarySoft" /> : <ArrowUpRight className="h-3.5 w-3.5 text-accent" />}
              </span>
              <div>
                <p className="font-mono text-xs text-white/90">
                  {truncateAddress(tx.from)} to {truncateAddress(tx.to)}
                </p>
                <p className="font-mono text-sm">{(Number(tx.value) / 1e18).toFixed(5)} ETH</p>
                <p className="text-xs text-muted-foreground">{formatDateTime(tx.timeStamp)}</p>
              </div>
            </div>
            <Badge variant={tx.isError === "0" ? "default" : "destructive"}>{tx.isError === "0" ? "Success" : "Failed"}</Badge>
          </div>
          <a
            href={`${explorerByChainId[chainId]}/tx/${tx.hash}`}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 font-mono text-xs text-accent hover:underline"
          >
            {truncateAddress(tx.hash, 10, 8)}
            <ExternalLink className="h-3 w-3" />
          </a>
        </Card>
      ))}
    </div>
  );
}
