"use client";

import { motion } from "framer-motion";

interface ScanLineProps {
  delay?: number;
  duration?: number;
}

export function ScanLine({ delay = 0.1, duration = 1.2 }: ScanLineProps) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <motion.span
        className="absolute left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(200,215,230,0.45) 50%, transparent 100%)",
          boxShadow: "0 0 12px rgba(200,215,230,0.25)",
        }}
        initial={{ top: "-2%" }}
        animate={{ top: "102%" }}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </motion.div>
  );
}
