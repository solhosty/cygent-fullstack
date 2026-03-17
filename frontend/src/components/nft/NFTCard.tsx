import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { OwnedNft } from "@/hooks/useNFTs";

type Props = {
  nft: OwnedNft;
  onClick: () => void;
};

export function NFTCard({ nft, onClick }: Props) {
  const tokenId = parseInt(nft.tokenId || "0", 16);

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="text-left"
    >
      <Card className="overflow-hidden transition-all hover:border-primarySoft/30 hover:shadow-[0_16px_38px_rgba(124,58,237,0.28)]">
        <div className="relative">
          <img
            src={nft.image?.cachedUrl ?? "https://placehold.co/800x800/111111/ffffff?text=NFT"}
            alt={nft.name ?? "NFT"}
            className="h-44 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
        <CardContent className="space-y-2 p-4">
          <p className="truncate font-medium">{nft.name ?? "Unnamed NFT"}</p>
          <Badge variant="secondary" className="max-w-full truncate">
            {nft.contract.openSeaMetadata?.collectionName ?? "Unknown collection"}
          </Badge>
          <p className="font-mono text-xs text-muted-foreground">Token #{tokenId}</p>
        </CardContent>
      </Card>
    </motion.button>
  );
}
