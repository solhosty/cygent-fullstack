import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl"
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-accent/30 blur-3xl"
        animate={{ x: [0, -30, 20, 0], y: [0, 24, -12, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-glow/20 blur-3xl"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
