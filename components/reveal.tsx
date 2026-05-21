"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealMode = "load" | "view";

interface RevealProps {
  children: ReactNode;
  mode?: RevealMode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
}

export function Reveal({
  children,
  mode = "view",
  delay = 0,
  y = 12,
  duration = 0.5,
  className,
}: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const trigger =
    mode === "load"
      ? { initial: "hidden", animate: "visible" }
      : {
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, amount: 0.2 },
        };

  return (
    <motion.div className={className} variants={variants} {...trigger}>
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  mode?: RevealMode;
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
}

export function Stagger({
  children,
  mode = "view",
  staggerDelay = 0.08,
  initialDelay = 0,
  className,
}: StaggerProps) {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  const trigger =
    mode === "load"
      ? { initial: "hidden", animate: "visible" }
      : {
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, amount: 0.2 },
        };

  return (
    <motion.div className={className} variants={container} {...trigger}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 12,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const item: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}

