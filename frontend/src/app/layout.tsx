import type { Metadata } from "next";

import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Whitelist Claim dApp",
  description: "Sepolia whitelist ETH claim app with admin controls"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-hero-gradient text-ink">
        <Providers>
          <Navbar />
          <main className="mx-auto min-h-[calc(100vh-68px)] w-full max-w-6xl px-4 py-8 md:px-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
