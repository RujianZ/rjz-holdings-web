"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroTitleTypewriterProps {
  titleA: string;
  titleB?: string;
  delay?: number;
  speed?: number;
  className?: string;
}

export function HeroTitleTypewriter({
  titleA,
  titleB,
  delay = 420,
  speed = 84,
  className,
}: HeroTitleTypewriterProps) {
  const fullText = useMemo(() => {
    const lines = titleB ? [titleA, titleB] : splitTitleLines(titleA);
    return lines.join("\n");
  }, [titleA, titleB]);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let cancelled = false;
    let tickTimer: ReturnType<typeof setTimeout>;

    const startTimer = setTimeout(() => {
      if (reducedMotion) {
        setCount(fullText.length);
        setDone(true);
        return;
      }

      const tick = (next: number) => {
        if (cancelled) return;
        setCount(next);
        if (next >= fullText.length) {
          setDone(true);
          return;
        }
        tickTimer = setTimeout(() => tick(next + 1), speed);
      };

      tick(0);
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      clearTimeout(tickTimer);
    };
  }, [fullText, delay, speed]);

  const visibleText = fullText.slice(0, count);

  return (
    <span className={cn("relative block", className)} aria-label={fullText}>
      <span aria-hidden className="invisible whitespace-pre-wrap">
        {fullText}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 whitespace-pre-wrap text-foreground"
      >
        {visibleText}
        <span
          className={cn(
            "ml-[0.06em] inline-block w-[0.42em] -translate-y-[0.03em] text-accent",
            done ? "animate-blink" : "opacity-90"
          )}
        >
          _
        </span>
      </span>
    </span>
  );
}

function splitTitleLines(title: string): string[] {
  const trimmed = title.trim();
  if (!trimmed) return [title];

  if (trimmed.includes("。")) {
    const parts = trimmed
      .split(/(?<=。)/u)
      .map((part) => part.trim())
      .filter(Boolean);
    return parts.length > 1 ? parts : [title];
  }

  const parts = trimmed
    .split(/(?<=\.)\s+/u)
    .map((part) => part.trim())
    .filter(Boolean);

  return parts.length > 1 ? parts : [title];
}
