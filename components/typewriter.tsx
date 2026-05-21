"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  cursor?: boolean;
}

export function Typewriter({
  text,
  delay = 0,
  speed = 35,
  className,
  cursor = true,
}: TypewriterProps) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let raf: ReturnType<typeof setTimeout>;

    const start = setTimeout(() => {
      const tick = (i: number) => {
        if (cancelled) return;
        setCount(i);
        if (i >= text.length) {
          setDone(true);
          return;
        }
        raf = setTimeout(() => tick(i + 1), speed);
      };
      tick(0);
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(start);
      clearTimeout(raf);
    };
  }, [text, delay, speed]);

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span aria-label={text}>{text.slice(0, count)}</span>
      {cursor && (
        <span
          aria-hidden
          className={cn(
            "ml-[2px] inline-block w-[1ch] -translate-y-[1px] text-accent",
            done ? "animate-blink" : "opacity-90"
          )}
        >
          _
        </span>
      )}
    </span>
  );
}
