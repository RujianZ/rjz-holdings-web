"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SpineSection {
  id: string;
  index: string;
  label: string;
}

interface SectionSpineProps {
  sections: SpineSection[];
}

export function SectionSpine({ sections }: SectionSpineProps) {
  const [activeId, setActiveId] = useState<string>(
    sections[0]?.id ?? ""
  );

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Section navigation"
      className="pointer-events-none fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
    >
      <ol className="relative flex flex-col gap-12">
        {/* vertical line behind the dots */}
        <span
          aria-hidden
          className="absolute left-[3px] top-1 bottom-1 w-px bg-border"
        />
        {sections.map((s) => {
          const isActive = activeId === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="pointer-events-auto relative z-10 inline-flex items-center gap-3 group"
                aria-label={`${s.index} ${s.label}`}
              >
                <span
                  className={cn(
                    "inline-block h-[7px] w-[7px] -ml-px rounded-full border transition-all duration-300",
                    isActive
                      ? "bg-accent border-accent scale-110"
                      : "bg-background border-muted-foreground/50 group-hover:border-foreground"
                  )}
                />
                <span
                  className={cn(
                    "mono-label transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground/50 group-hover:text-foreground"
                  )}
                >
                  {s.index}
                </span>
                <span
                  className={cn(
                    "mono-label text-muted-foreground transition-all duration-300 origin-left",
                    isActive
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-1 pointer-events-none"
                  )}
                  aria-hidden
                >
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
