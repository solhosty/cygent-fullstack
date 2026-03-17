import { useState } from "react";
import { ImageIcon } from "lucide-react";

import { NFTCard } from "@/components/nft/NFTCard";
import { NFTDetailModal } from "@/components/nft/NFTDetailModal";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useNFTs, type OwnedNft } from "@/hooks/useNFTs";

export function NFTGallery() {
  const { data, isLoading } = useNFTs();
  const [selected, setSelected] = useState<OwnedNft | null>(null);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-2xl font-semibold">
          <ImageIcon className="h-5 w-5 text-primarySoft" />
          NFT Gallery
        </h1>
        <Badge variant="secondary">{data?.length ?? 0} items</Badge>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
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
