import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-primary/35 blur-[120px]"
        animate={{ x: [0, 44, -28, 0], y: [0, 24, -16, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-1/4 h-[26rem] w-[26rem] rounded-full bg-accent/30 blur-[120px]"
        animate={{ x: [0, -38, 20, 0], y: [0, -28, 14, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-8rem] left-1/4 h-[22rem] w-[22rem] rounded-full bg-glow/25 blur-[100px]"
        animate={{ scale: [1, 1.12, 1], x: [0, 20, -16, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-16 right-1/3 h-52 w-52 rounded-full bg-primarySoft/20 blur-[90px]"
        animate={{ x: [0, -22, 12, 0], y: [0, 14, -10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="bg-grid absolute inset-0 opacity-25" />
    </div>
  );
}
