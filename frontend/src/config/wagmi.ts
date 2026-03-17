import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, sepolia } from "wagmi/chains";

const projectId = import.meta.env["VITE_WALLETCONNECT_PROJECT_ID"] ?? "";

export const wagmiConfig = getDefaultConfig({
  appName: "Cygent Wallet",
  projectId,
  chains: [mainnet, sepolia, polygon],
  ssr: false
});
