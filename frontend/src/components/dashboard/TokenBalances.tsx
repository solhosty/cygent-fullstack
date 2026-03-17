import { useQuery } from "@tanstack/react-query";
import { useAccount, useChainId } from "wagmi";

import { alchemyRpcByChainId } from "@/config/chains";
import { GlassCard } from "@/components/ui/GlassCard";
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
    <GlassCard className="h-[320px] p-0">
      <div className="border-b border-white/10 p-4">
        <p className="text-sm text-white/70">Token balances</p>
      </div>
      <ScrollArea className="h-[260px] p-4">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-full bg-white/10" />
            <Skeleton className="h-12 w-full bg-white/10" />
            <Skeleton className="h-12 w-full bg-white/10" />
          </div>
        ) : (
          <div className="space-y-3">
            {data?.slice(0, 20).map((token) => (
              <div key={token.contractAddress} className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                <span className="font-mono text-xs text-white/70">{token.contractAddress.slice(0, 10)}...</span>
                <span className="text-sm">{formatTokenAmount(token.tokenBalance ?? "0")}</span>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </GlassCard>
  );
}
