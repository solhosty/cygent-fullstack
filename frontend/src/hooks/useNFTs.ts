import { useQuery } from "@tanstack/react-query";
import { useAccount, useChainId } from "wagmi";

import { alchemyNftByChainId } from "@/config/chains";

export type OwnedNft = {
  contract: { address: string; openSeaMetadata?: { collectionName?: string } };
  tokenId: string;
  image?: { cachedUrl?: string };
  description?: string;
  name?: string;
  raw?: { metadata?: { attributes?: Array<{ trait_type: string; value: string }> } };
};

type AlchemyNftResponse = {
  ownedNfts: OwnedNft[];
};

export function useNFTs() {
  const { address } = useAccount();
  const chainId = useChainId();

  return useQuery({
    queryKey: ["nfts", address, chainId],
    enabled: Boolean(address),
    queryFn: async () => {
      if (!address) {
        return [];
      }

      const key = import.meta.env["VITE_ALCHEMY_API_KEY"] ?? "";
      const base = alchemyNftByChainId[chainId] ?? alchemyNftByChainId[1];
      const response = await fetch(`${base}/${key}/getNFTsForOwner?owner=${address}`);
      const data = (await response.json()) as AlchemyNftResponse;
      return data.ownedNfts ?? [];
    }
  });
}
