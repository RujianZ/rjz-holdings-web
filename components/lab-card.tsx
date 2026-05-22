import { ArrowUpRight } from "lucide-react";
import type { LabItem } from "@/lib/lab";
import type { Dict } from "@/lib/i18n";

export function LabCard({ item, dict }: { item: LabItem; dict: Dict }) {
  return (
    <article className="grid grid-cols-12 gap-8 md:gap-12 p-8 md:p-12 bg-background">
      {/* meta column: index + status + year */}
      <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
        <span className="mono-label silver-text text-base tracking-[0.15em]">
          {item.index}
        </span>
        <div className="hidden md:block hairline w-12" />
        <div className="flex flex-row md:flex-col gap-6 md:gap-4">
          <div className="flex flex-col gap-1">
            <span className="mono-label text-muted-foreground">
              {dict.lab.statusLabel}
            </span>
            <span className="text-sm">{item.status}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="mono-label text-muted-foreground">
              {dict.lab.yearLabel}
            </span>
            <span className="font-mono text-sm">{item.year}</span>
          </div>
        </div>
      </div>

      {/* body column: name + hook + thesis/description + optional links */}
      <div className="col-span-12 md:col-span-9 flex flex-col gap-6 max-w-2xl">
        <header className="flex flex-col gap-3">
          <h3 className="text-2xl md:text-3xl leading-tight tracking-tight">
            {item.name}
          </h3>
          <p className="text-lg text-muted-foreground leading-snug">
            {item.hook}
          </p>
        </header>

        {item.thesis && item.thesis.length > 0 && (
          <div className="flex flex-col gap-4">
            <span className="mono-label text-accent">
              {dict.lab.thesisLabel}
            </span>
            <div className="flex flex-col gap-3 text-base leading-relaxed">
              {item.thesis.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        )}

        {item.description && item.description.length > 0 && (
          <div className="flex flex-col gap-4">
            <span className="mono-label text-muted-foreground">
              {dict.lab.descriptionLabel}
            </span>
            <div className="flex flex-col gap-3 text-base leading-relaxed">
              {item.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        )}

        {item.links && item.links.length > 0 && (
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
            {item.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label inline-flex items-center gap-1 text-foreground hover:text-accent transition-colors"
              >
                {link.label}
                <ArrowUpRight size={12} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
