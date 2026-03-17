import { useChainId, useSwitchChain } from "wagmi";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CHAIN_META } from "@/lib/constants";

const chainOptions = [
  { id: 1, label: "Ethereum" },
  { id: 11155111, label: "Sepolia" },
  { id: 137, label: "Polygon" }
];

export function NetworkSwitcher() {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  return (
    <Select
      value={String(chainId)}
      onValueChange={(next) => {
        switchChain({ chainId: Number(next) });
      }}
    >
      <SelectTrigger className="w-[150px] border-white/10 bg-white/5">
        <SelectValue placeholder="Network" />
      </SelectTrigger>
      <SelectContent className="border-white/10 bg-[#11111a] text-white">
        {chainOptions.map((chain) => (
          <SelectItem key={chain.id} value={String(chain.id)}>
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
