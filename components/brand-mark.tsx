"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  variant?: "default" | "muted";
  className?: string;
}

export function BrandMark({ variant = "default", className }: BrandMarkProps) {
  return (
    <span
      className={cn("relative inline-block h-3 w-3 shrink-0", className)}
      aria-hidden
    >
      <span
        className={cn(
          "absolute inset-0",
          variant === "muted" ? "bg-muted-foreground" : "bg-foreground"
        )}
      />
      <motion.span
        className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-accent"
        initial={{ opacity: 0.65 }}
        animate={{ opacity: [0.65, 1, 0.65] }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </span>
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
