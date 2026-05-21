"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  index: string;
  label: string;
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({
  index,
  label,
  title,
  description,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <motion.header
      className={cn("flex flex-col gap-6", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      <motion.div
        className="flex items-baseline justify-between gap-6"
        variants={{
          hidden: { opacity: 0, y: 8 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
      >
        <span className="mono-label text-muted-foreground">
          {index} / {label}
        </span>
        {action ? <div className="flex items-center gap-2">{action}</div> : null}
      </motion.div>
      {(title || description) && (
        <motion.div
          className="flex flex-col gap-3 max-w-2xl"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
          }}
        >
          {title && (
            <h2 className="text-3xl md:text-[2rem] leading-tight tracking-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground text-base leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>
      )}
      <motion.hr
        className="hairline origin-left"
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      />
    </motion.header>
  );
}
