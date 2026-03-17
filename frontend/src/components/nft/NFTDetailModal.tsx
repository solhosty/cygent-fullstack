import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { OwnedNft } from "@/hooks/useNFTs";

type Props = {
  nft: OwnedNft | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NFTDetailModal({ nft, open, onOpenChange }: Props) {
  if (!nft) {
    return null;
  }

  const tokenId = parseInt(nft.tokenId || "0", 16);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-white/10 bg-[#101018] text-white">
        <DialogHeader>
          <DialogTitle>{nft.name ?? "NFT"}</DialogTitle>
        </DialogHeader>
        <img src={nft.image?.cachedUrl} alt={nft.name} className="h-72 w-full rounded-xl object-cover" />
        <p className="text-sm text-white/70">{nft.description ?? "No description"}</p>
        <Separator className="bg-white/10" />
        <div className="grid gap-2 text-sm sm:grid-cols-2">
          <p>Collection: {nft.contract.openSeaMetadata?.collectionName ?? "Unknown"}</p>
          <p>Token ID: {tokenId}</p>
        </div>
        <a
          href={`https://opensea.io/assets/ethereum/${nft.contract.address}/${tokenId}`}
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          View on OpenSea
        </a>
      </DialogContent>
    </Dialog>
  );
}
