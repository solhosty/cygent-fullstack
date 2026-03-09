"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0.45, scale: 0.9 }}
        animate={{ opacity: 0.8, scale: 1.08 }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
        className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-accentSoft blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0.35, x: 20 }}
        animate={{ opacity: 0.7, x: -24 }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
        className="absolute bottom-8 right-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
      />
    </div>
  );
}
