import { AnimatePresence, motion } from "framer-motion";
import { Copy, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useAccount, useChainId } from "wagmi";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CHAIN_META } from "@/lib/constants";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ReceiveModal({ open, onOpenChange }: Props) {
  const { address } = useAccount();
  const chainId = useChainId();
  const chainMeta = CHAIN_META[chainId as keyof typeof CHAIN_META];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogContent asChild>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="border-white/10 bg-[#0f0f16]"
            >
              <DialogHeader>
                <DialogTitle>Receive</DialogTitle>
              </DialogHeader>
              <div className="glass-sm mx-auto rounded-2xl bg-white p-4">
                <QRCodeSVG value={address ?? ""} size={180} />
              </div>
              <div className="glass-sm space-y-3 rounded-xl p-3">
                <p className="font-mono text-xs break-all">{address}</p>
                <div className="flex items-center justify-between gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={async () => {
                            if (address) {
                              await navigator.clipboard.writeText(address);
                              toast.success("Address copied");
                            }
                          }}
                        >
                          <Copy className="mr-1.5 h-3.5 w-3.5" />
                          Copy
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Copy wallet address</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button
                    size="sm"
                    onClick={async () => {
                      if (!address) {
                        return;
                      }
                      if (navigator.share) {
                        await navigator.share({ text: address, title: "Wallet address" });
                        return;
                      }
                      await navigator.clipboard.writeText(address);
                      toast.success("Address copied for sharing");
                    }}
                  >
                    <Share2 className="mr-1.5 h-3.5 w-3.5" />
                    Share
                  </Button>
                </div>
              </div>
              {chainMeta && <Badge variant="secondary">Network: {chainMeta.name}</Badge>}
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
