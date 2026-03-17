import { Link } from "react-router-dom";
import { useChainId } from "wagmi";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { explorerByChainId } from "@/config/chains";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";
import { formatDateTime, truncateAddress } from "@/lib/formatters";

export function RecentActivity() {
  const chainId = useChainId();
  const { data, isLoading } = useTransactionHistory(1, 4);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Recent activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {isLoading ? (
          <>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </>
        ) : data?.length ? (
          data.slice(0, 4).map((tx) => (
            <a
              key={tx.hash}
              href={`${explorerByChainId[chainId]}/tx/${tx.hash}`}
              target="_blank"
              rel="noreferrer"
              className="glass-sm flex items-center justify-between rounded-xl px-3 py-2"
            >
              <div>
                <p className="font-mono text-xs">{truncateAddress(tx.hash, 8, 6)}</p>
                <p className="text-[11px] text-muted-foreground">{formatDateTime(tx.timeStamp)}</p>
              </div>
              <Badge variant={tx.isError === "0" ? "default" : "destructive"}>{tx.isError === "0" ? "OK" : "Fail"}</Badge>
            </a>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No recent transactions on this network.</p>
        )}
        <Link to="/transactions" className="inline-block pt-1 text-sm text-accent hover:underline">
          View all transactions
        </Link>
      </CardContent>
    </Card>
  );
}
