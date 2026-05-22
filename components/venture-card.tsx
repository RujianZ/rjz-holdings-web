import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { VentureMeta } from "@/lib/ventures";
import type { Dict } from "@/lib/i18n";

interface VentureCardProps {
  venture: VentureMeta;
  dict: Dict;
}

export function VentureCard({ venture, dict }: VentureCardProps) {
  const isComingSoon = venture.status === "coming-soon";
  const statusLabel =
    dict.ventureDetail.statusLabels[venture.status] ?? venture.status;

  const body = (
    <article className="group flex flex-col gap-6 p-8 md:p-12 bg-background">
      <header className="flex items-baseline justify-between gap-6">
        <span className="mono-label silver-text tracking-[0.15em]">
          {venture.index}{" "}
          <span className="text-muted-foreground">· {venture.category}</span>
        </span>
        <span className="mono-label text-muted-foreground shrink-0">
          {venture.year}
        </span>
      </header>

      <div className="flex flex-col gap-5 max-w-2xl">
        <h3 className="text-2xl md:text-3xl leading-tight tracking-tight">
          {venture.name}
        </h3>
        <p className="text-base md:text-lg leading-relaxed">
          {venture.description}
        </p>
        {venture.notes && venture.notes.length > 0 && (
          <div className="flex flex-col gap-3 text-base text-muted-foreground leading-relaxed">
            {venture.notes.map((note, i) => (
              <p key={i}>{note}</p>
            ))}
          </div>
        )}
      </div>

      <footer className="flex flex-wrap items-baseline justify-between gap-4 pt-4 border-t border-border">
        <div className="flex items-baseline gap-3">
          <span className="mono-label text-muted-foreground">
            {dict.ventureDetail.statusTerm}
          </span>
          <span className="text-sm">{statusLabel}</span>
        </div>
        {!isComingSoon ? (
          <span className="mono-label inline-flex items-center gap-1 text-foreground transition-colors group-hover:text-accent">
            {dict.ventures.readCaseStudy}
            <ArrowUpRight size={12} strokeWidth={1.5} />
          </span>
        ) : (
          <span className="mono-label text-accent">
            {dict.ventures.comingSoon}
          </span>
        )}
      </footer>
    </article>
  );

  if (isComingSoon) return body;

  return (
    <Link
      href={`${dict.prefix}/ventures/${venture.slug}`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {body}
    </Link>
  );
}
