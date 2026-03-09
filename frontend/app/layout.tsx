import type { Metadata } from "next";
import "./globals.css";

import Providers from "@/app/providers";
import AnimatedBackground from "@/components/AnimatedBackground";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Cygent Whitelist Claim",
  description: "Secure ETH claim dApp with owner-managed whitelist rounds"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="relative min-h-screen overflow-hidden">
            <AnimatedBackground />
            <div className="relative z-10 mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
              <NavBar />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
