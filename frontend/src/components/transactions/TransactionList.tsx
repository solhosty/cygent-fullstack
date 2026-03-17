import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/GlassCard";
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
        <Skeleton className="h-16 w-full bg-white/10" />
        <Skeleton className="h-16 w-full bg-white/10" />
        <Skeleton className="h-16 w-full bg-white/10" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <GlassCard key={tx.hash} className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <a
              href={`${explorerByChainId[chainId]}/tx/${tx.hash}`}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-accent hover:underline"
            >
              {tx.hash.slice(0, 14)}...
            </a>
            <Badge variant={tx.isError === "0" ? "default" : "destructive"}>
              {tx.isError === "0" ? "Success" : "Failed"}
            </Badge>
          </div>
          <p className="mt-2 text-xs text-white/70">
            {truncateAddress(tx.from)} to {truncateAddress(tx.to)}
          </p>
          <p className="text-xs text-white/60">{formatDateTime(tx.timeStamp)}</p>
        </GlassCard>
      ))}
    </div>
  );
}
