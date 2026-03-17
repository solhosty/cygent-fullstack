import { AnimatePresence, motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
      <AnimatePresence>
        {open && (
          <DialogContent asChild className="max-w-3xl text-white">
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}>
              <DialogHeader>
                <DialogTitle>{nft.name ?? "NFT"}</DialogTitle>
              </DialogHeader>
              <img src={nft.image?.cachedUrl} alt={nft.name} className="h-72 w-full rounded-xl object-cover" />
              <p className="text-sm text-muted-foreground">{nft.description ?? "No description"}</p>
              <Separator className="bg-white/10" />
              <div className="grid gap-2 text-sm sm:grid-cols-2">
                <p>Collection: {nft.contract.openSeaMetadata?.collectionName ?? "Unknown"}</p>
                <p>Token ID: <span className="font-mono">{tokenId}</span></p>
              </div>
              <Separator className="bg-white/10" />
              <div className="flex flex-wrap gap-2">
                {(nft.raw?.metadata?.attributes ?? []).slice(0, 8).map((trait) => (
                  <Badge key={`${trait.trait_type}-${trait.value}`} variant="outline">
                    {trait.trait_type}: {trait.value}
                  </Badge>
                ))}
              </div>
              <Button asChild>
                <a href={`https://opensea.io/assets/ethereum/${nft.contract.address}/${tokenId}`} target="_blank" rel="noreferrer">
                  View on OpenSea
                </a>
              </Button>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
