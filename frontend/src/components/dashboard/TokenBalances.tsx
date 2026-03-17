import { useQuery } from "@tanstack/react-query";
import { useAccount, useChainId } from "wagmi";

import { alchemyRpcByChainId } from "@/config/chains";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { formatTokenAmount } from "@/lib/formatters";

type TokenBalance = {
  contractAddress: string;
  tokenBalance: string;
};

type TokenBalancesResponse = {
  result: {
    tokenBalances: TokenBalance[];
  };
};

export function TokenBalances() {
  const { address } = useAccount();
  const chainId = useChainId();

  const { data, isLoading } = useQuery({
    queryKey: ["token-balances", address, chainId],
    enabled: Boolean(address),
    queryFn: async () => {
      if (!address) {
        return [];
      }

      const key = import.meta.env["VITE_ALCHEMY_API_KEY"] ?? "";
      const rpcUrl = `${alchemyRpcByChainId[chainId]}/${key}`;

      const response = await fetch(rpcUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: 1,
          jsonrpc: "2.0",
          method: "alchemy_getTokenBalances",
          params: [address]
        })
      });

      const payload = (await response.json()) as TokenBalancesResponse;
      return payload.result.tokenBalances ?? [];
    }
  });

  return (
    <Card className="h-[370px]">
      <CardHeader className="pb-2">
        <CardTitle>Token balances</CardTitle>
        <CardDescription>Live ERC-20 holdings via Alchemy</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[270px] pr-2">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <div className="space-y-3">
            {data?.length ? (
              data.slice(0, 20).map((token) => (
                <div key={token.contractAddress} className="glass-sm flex items-center justify-between rounded-xl p-3">
                  <div className="space-y-1">
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {token.contractAddress.slice(0, 8)}...{token.contractAddress.slice(-4)}
                    </Badge>
                    <p className="text-xs text-muted-foreground">Contract</p>
                  </div>
                  <p className="font-mono text-sm">{formatTokenAmount(token.tokenBalance ?? "0")}</p>
                </div>
              ))
            ) : (
              <div className="glass-sm rounded-xl p-5 text-center text-sm text-muted-foreground">No tokens detected for this wallet.</div>
            )}
          </div>
        )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
