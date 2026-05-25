"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <motion.span
      aria-hidden
      className={cn(
        "inline-block h-5 w-[22px] shrink-0 text-foreground",
        className
      )}
      animate={{ opacity: [0.88, 1, 0.88] }}
      transition={{
        duration: 3.6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="0 0 100 90"
        fill="currentColor"
        className="h-full w-full"
      >
        <path d="M 22 80 Q 26 50 33 32 Q 38 55 44 80 L 39 78 Z" />
        <path d="M 40 80 Q 46 45 55 18 Q 62 50 68 80 L 62 78 Z" />
        <path d="M 62 82 Q 72 38 84 4 Q 88 42 92 82 L 84 80 Z" />
      </svg>
    </motion.span>
  );
}

export function BrandLockup({
  className,
  monoClassName,
}: {
  className?: string;
  monoClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <BrandMark />
      <span className={cn("mono-label text-foreground", monoClassName)}>
        RJZ <span className="text-muted-foreground">/ HOLDINGS</span>
      </span>
    </span>
  );
}
