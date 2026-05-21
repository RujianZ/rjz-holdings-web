import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VentureMeta } from "@/lib/ventures";

interface VentureCardProps {
  venture: VentureMeta;
  width?: number;
}

export function VentureCard({ venture, width = 320 }: VentureCardProps) {
  const isComingSoon = venture.status === "coming-soon";

  const content = (
    <article
      style={{ width }}
      className={cn(
        "group relative flex h-[440px] flex-col justify-between p-7 transition-all",
        "border bg-card",
        isComingSoon
          ? "border-dashed border-border/60"
          : "border-border hover:border-foreground/30"
      )}
    >
      <header className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center text-sm font-medium",
            isComingSoon
              ? "border border-dashed border-border text-muted-foreground"
              : "bg-foreground text-background"
          )}
          aria-hidden
        >
          {venture.monogram}
        </div>
        <span className="mono-label text-muted-foreground">{venture.index}</span>
      </header>

      <footer className="flex flex-col gap-4">
        <span className="mono-label text-muted-foreground">
          {venture.category}
        </span>
        <h3
          className={cn(
            "text-xl leading-tight",
            isComingSoon && "text-muted-foreground"
          )}
        >
          {venture.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {venture.description}
        </p>

        <hr className="hairline mt-2" />

        <div className="flex items-center justify-between">
          <span className="mono-label text-muted-foreground">
            {venture.year}
          </span>
          {isComingSoon ? (
            <span className="mono-label text-accent">Coming soon</span>
          ) : (
            <span className="mono-label inline-flex items-center gap-1 text-foreground transition-colors group-hover:text-accent">
              Case study
              <ArrowUpRight size={12} strokeWidth={1.5} />
            </span>
          )}
        </div>
      </footer>
    </article>
  );

  if (isComingSoon) return content;

  return (
    <Link
      href={`/ventures/${venture.slug}`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      draggable={false}
    >
      {content}
    </Link>
  );
}
