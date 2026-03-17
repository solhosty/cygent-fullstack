import { useQuery } from "@tanstack/react-query";
import { useAccount, useChainId } from "wagmi";

import { explorerApiByChainId } from "@/config/chains";

export type ExplorerTx = {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string;
  isError: "0" | "1";
};

type ExplorerResponse = {
  status: string;
  result: ExplorerTx[];
};

export function useTransactionHistory(page = 1, offset = 15) {
  const { address } = useAccount();
  const chainId = useChainId();

  return useQuery({
    queryKey: ["tx-history", address, chainId, page, offset],
    enabled: Boolean(address),
    queryFn: async () => {
      const apiBase = explorerApiByChainId[chainId];
      if (!apiBase || !address) {
        return [];
      }

      const key = chainId === 137
        ? import.meta.env["VITE_POLYGONSCAN_API_KEY"]
        : import.meta.env["VITE_ETHERSCAN_API_KEY"];

      const params = new URLSearchParams({
        module: "account",
        action: "txlist",
        address,
        page: String(page),
        offset: String(offset),
        sort: "desc",
        apikey: key ?? ""
      });

      const response = await fetch(`${apiBase}?${params.toString()}`);
      const data = (await response.json()) as ExplorerResponse;
      return Array.isArray(data.result) ? data.result : [];
    }
  });
}
