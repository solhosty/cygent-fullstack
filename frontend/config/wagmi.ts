import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID");
}

export const wagmiConfig = getDefaultConfig({
  appName: "Cygent Whitelist Claim",
  projectId,
  chains: [sepolia],
  ssr: true
});
