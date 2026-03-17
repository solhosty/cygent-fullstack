import { useChainId, useSwitchChain } from "wagmi";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CHAIN_META } from "@/lib/constants";
import { cn } from "@/lib/utils";

const chainOptions = [
  { id: 1, label: "Ethereum" },
  { id: 11155111, label: "Sepolia" },
  { id: 137, label: "Polygon" }
];

export function NetworkSwitcher() {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const activeMeta = CHAIN_META[chainId as keyof typeof CHAIN_META];

  return (
    <Select
      value={String(chainId)}
      onValueChange={(next) => {
        switchChain({ chainId: Number(next) });
      }}
    >
      <SelectTrigger className="glass-sm w-[160px] border-white/20">
        <SelectValue placeholder="Network">
          {activeMeta ? (
            <span className="flex items-center gap-2">
              <span className={cn("h-2 w-2 rounded-full", activeMeta.color)} />
              {activeMeta.name}
            </span>
          ) : null}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {chainOptions.map((chain) => (
          <SelectItem key={chain.id} value={String(chain.id)} className="hover:bg-white/10">
            <span className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${CHAIN_META[chain.id as keyof typeof CHAIN_META].color}`} />
              {chain.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
