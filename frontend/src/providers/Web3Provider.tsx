import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { Toaster } from "sonner";

import { wagmiConfig } from "@/config/wagmi";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export function Web3Provider({ children }: Props) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={darkTheme({
            accentColor: "#7c3aed",
            accentColorForeground: "#ffffff",
            borderRadius: "large"
          })}
        >
          {children}
          <Toaster richColors position="top-right" />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
