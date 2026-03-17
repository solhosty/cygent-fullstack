import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { parseEther } from "viem";
import { useAccount, useSendTransaction, useWriteContract } from "wagmi";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

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
  const [step, setStep] = useState<"form" | "confirm" | "submitting" | "success">("form");
  const { chainId } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();

  const handleSend = async () => {
    setStep("submitting");
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
      setStep("success");
    } catch (error) {
      setStep("form");
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
              <AnimatePresence mode="wait">
                {step === "form" && (
                  <motion.div key="form" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} className="space-y-4">
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
                        <SelectContent>
                          <SelectItem value="eth">Native Token</SelectItem>
                          <SelectItem value="0x0000000000000000000000000000000000000000">CYG</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator className="bg-white/10" />
                    <p className="text-xs text-muted-foreground">Estimated gas: network dependent (chain ID {chainId})</p>
                    <Button variant="gradient" className="w-full" onClick={() => setStep("confirm")}>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}

                {step === "confirm" && (
                  <motion.div key="confirm" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} className="space-y-4">
                    <div className="glass-sm space-y-2 rounded-xl p-4 text-sm">
                      <p>To: <span className="font-mono">{to}</span></p>
                      <p>Amount: <span className="font-mono">{amount || "0"}</span></p>
                      <p>Token: <span className="font-mono">{token === "eth" ? "Native" : "CYG"}</span></p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => setStep("form")}>Back</Button>
                      <Button variant="gradient" className="flex-1" onClick={handleSend}>Confirm</Button>
                    </div>
                  </motion.div>
                )}

                {step === "submitting" && (
                  <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 text-center">
                    <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-primarySoft" />
                    <p className="mt-3 text-sm text-muted-foreground">Submitting transaction...</p>
                  </motion.div>
                )}

                {step === "success" && (
                  <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 text-center">
                    <CheckCircle2 className="mx-auto h-8 w-8 text-success" />
                    <p className="mt-3 text-sm">Transfer submitted.</p>
                    <Button
                      className="mt-4"
                      onClick={() => {
                        setStep("form");
                        onOpenChange(false);
                      }}
                    >
                      Close
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
