import { AnimatePresence, motion } from "framer-motion";
import { Copy } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useAccount } from "wagmi";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { truncateAddress } from "@/lib/formatters";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ReceiveModal({ open, onOpenChange }: Props) {
  const { address } = useAccount();

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
              <div className="mx-auto rounded-2xl bg-white p-4">
                <QRCodeSVG value={address ?? ""} size={180} />
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                <span className="font-mono text-sm">{truncateAddress(address ?? "")}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={async () => {
                    if (address) {
                      await navigator.clipboard.writeText(address);
                      toast.success("Address copied");
                    }
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
