import { motion } from "framer-motion";
import { Coins, ShieldCheck, Sparkles } from "lucide-react";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Secure Wallet Core",
    description: "Track assets with robust wallet connectivity across Ethereum, Sepolia, and Polygon.",
    icon: ShieldCheck
  },
  {
    title: "Token Visibility",
    description: "Monitor ERC-20 balances with structured glass cards and live network insights.",
    icon: Coins
  },
  {
    title: "NFT Discovery",
    description: "Browse collections and token metadata in an immersive, animated gallery.",
    icon: Sparkles
  }
];

export function Landing() {
  return (
    <section className="relative min-h-screen overflow-hidden text-foreground">
      <AnimatedBackground />
      <div className="bg-grid absolute inset-0 opacity-35" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-12 pt-8 sm:px-6 md:justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="glass-lg mx-auto w-full rounded-3xl p-6 md:p-10"
        >
          <div className="space-y-6 text-center md:text-left">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">Cygent Wallet</p>
            <h1 className="font-display text-4xl leading-tight text-gradient md:text-6xl">
              A premium command center for digital assets.
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground md:mx-0 md:text-lg">
              Connect once and manage balances, activity, and NFTs with a focused glassmorphism interface.
            </p>
            <div className="mx-auto w-full max-w-xs md:mx-0">
              <ConnectWalletButton />
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 * index }}
              >
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <feature.icon className="h-4 w-4 text-primarySoft" />
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">{feature.description}</CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
