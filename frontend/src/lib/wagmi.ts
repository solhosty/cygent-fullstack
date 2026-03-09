import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { sepolia } from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "";
const rpcUrl = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL ?? "https://rpc.sepolia.org";

export const wagmiConfig = getDefaultConfig({
  appName: "Whitelist Claim",
  projectId,
  chains: [sepolia],
  ssr: true,
  transports: {
    [sepolia.id]: http(rpcUrl)
  }
});
