import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllVentureMetas } from "@/lib/ventures";
import type { Dict } from "@/lib/i18n";

export function VenturesListPage({ dict }: { dict: Dict }) {
  const ventures = getAllVentureMetas(dict.lang);
  const d = dict.ventures;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 py-16 md:py-24 flex flex-col gap-16">
      <header className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="mono-label text-muted-foreground">{d.section}</span>
        </div>
        <div className="md:col-span-9 flex flex-col gap-6">
          <h1 className="text-balance text-4xl md:text-5xl leading-[1.1] tracking-tight">
            {d.titleA}
            <br />
            <span className="text-muted-foreground">{d.titleB}</span>
          </h1>
          <p className="max-w-xl text-muted-foreground leading-relaxed">
            {d.description}
          </p>
        </div>
      </header>

      <hr className="hairline" />

      <ul className="grid gap-px bg-border md:grid-cols-2">
        {ventures.map((v) => {
          const isComingSoon = v.status === "coming-soon";
          const Card = (
            <article className="group h-full flex flex-col justify-between p-8 bg-background min-h-[280px]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={
                      isComingSoon
                        ? "flex h-10 w-10 items-center justify-center border border-dashed border-border text-muted-foreground"
                        : "flex h-10 w-10 items-center justify-center bg-foreground text-background"
                    }
                  >
                    {v.monogram}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="mono-label text-muted-foreground">
                      {v.index} · {v.category}
                    </span>
                    <h2 className="text-xl leading-tight">{v.name}</h2>
                  </div>
                </div>
                <span className="mono-label text-muted-foreground">{v.year}</span>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                  {v.description}
                </p>
                {isComingSoon ? (
                  <span className="mono-label text-accent">{d.comingSoon}</span>
                ) : (
                  <span className="mono-label inline-flex items-center gap-1 text-foreground transition-colors group-hover:text-accent">
                    {d.readCaseStudy}
                    <ArrowUpRight size={12} strokeWidth={1.5} />
                  </span>
                )}
              </div>
            </article>
          );

          if (isComingSoon) return <li key={v.slug}>{Card}</li>;
          return (
            <li key={v.slug}>
              <Link
                href={`${dict.prefix}/ventures/${v.slug}`}
                className="block h-full"
              >
                {Card}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
