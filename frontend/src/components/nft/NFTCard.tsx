import { motion } from "framer-motion";

import type { OwnedNft } from "@/hooks/useNFTs";

type Props = {
  nft: OwnedNft;
  onClick: () => void;
};

export function NFTCard({ nft, onClick }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="glass overflow-hidden rounded-2xl text-left"
    >
      <img
        src={nft.image?.cachedUrl ?? "https://placehold.co/800x800/111111/ffffff?text=NFT"}
        alt={nft.name ?? "NFT"}
        className="h-44 w-full object-cover"
      />
      <div className="space-y-1 p-4">
        <p className="truncate font-medium">{nft.name ?? "Unnamed NFT"}</p>
        <p className="text-xs text-white/60">{nft.contract.openSeaMetadata?.collectionName ?? "Unknown collection"}</p>
        <p className="text-xs text-white/60">Token #{parseInt(nft.tokenId || "0", 16)}</p>
      </div>
    </motion.button>
  );
}
