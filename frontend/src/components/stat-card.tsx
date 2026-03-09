"use client";

import { motion } from "framer-motion";

type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
};

export function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-white/50 bg-white/70 p-5 shadow-card backdrop-blur"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-ink/55">{title}</p>
      <p className="mt-2 text-2xl font-bold text-ink">{value}</p>
      {subtitle ? <p className="mt-1 text-sm text-ink/65">{subtitle}</p> : null}
    </motion.div>
  );
}
