import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { parseEther } from "viem";
import { useAccount, useSendTransaction, useWriteContract } from "wagmi";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const erc20Abi = [
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    outputs: [{ name: "", type: "bool" }]
  }
] as const;

export function SendModal({ open, onOpenChange }: Props) {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("eth");
  const { chainId } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();

  const handleSend = async () => {
    try {
      if (token === "eth") {
        await sendTransactionAsync({ to: to as `0x${string}`, value: parseEther(amount || "0") });
      } else {
        await writeContractAsync({
          address: token as `0x${string}`,
          abi: erc20Abi,
          functionName: "transfer",
          args: [to as `0x${string}`, parseEther(amount || "0")]
        });
      }
      toast.success("Transaction submitted");
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Transaction failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogContent asChild>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="border-white/10 bg-[#0f0f16]"
            >
              <DialogHeader>
                <DialogTitle>Send asset</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label>Recipient</Label>
                  <Input value={to} onChange={(event) => setTo(event.target.value)} placeholder="0x..." />
                </div>
                <div className="space-y-1">
                  <Label>Amount</Label>
                  <Input value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.10" />
                </div>
                <div className="space-y-1">
                  <Label>Asset</Label>
                  <Select value={token} onValueChange={setToken}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose token" />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-[#11111a] text-white">
                      <SelectItem value="eth">Native Token</SelectItem>
                      <SelectItem value="0x0000000000000000000000000000000000000000">CYG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-white/60">Estimated gas: network dependent (chain ID {chainId})</p>
                <Button className="w-full" onClick={handleSend}>
                  Confirm transfer
                </Button>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
