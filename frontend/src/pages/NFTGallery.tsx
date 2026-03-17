import { useState } from "react";

import { NFTCard } from "@/components/nft/NFTCard";
import { NFTDetailModal } from "@/components/nft/NFTDetailModal";
import { Skeleton } from "@/components/ui/skeleton";
import { useNFTs, type OwnedNft } from "@/hooks/useNFTs";

export function NFTGallery() {
  const { data, isLoading } = useNFTs();
  const [selected, setSelected] = useState<OwnedNft | null>(null);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">NFT Gallery</h1>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Skeleton className="h-64 bg-white/10" />
          <Skeleton className="h-64 bg-white/10" />
          <Skeleton className="h-64 bg-white/10" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.map((nft) => (
            <NFTCard key={`${nft.contract.address}-${nft.tokenId}`} nft={nft} onClick={() => setSelected(nft)} />
          ))}
        </div>
      )}
      <NFTDetailModal nft={selected} open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} />
    </section>
  );
}
