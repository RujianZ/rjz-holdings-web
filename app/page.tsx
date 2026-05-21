import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { VenturesScroller } from "@/components/ventures-scroller";
import { SectionHeader } from "@/components/section-header";
import { getAllVentureMetas } from "@/lib/ventures";
import { getAllJournalMetas } from "@/lib/journal";

export default function HomePage() {
  const ventures = getAllVentureMetas();
  const journal = getAllJournalMetas().slice(0, 3);

  return (
    <div className="flex flex-col gap-24 md:gap-32 pt-12 md:pt-24">
      <Hero />
      <VenturesScroller ventures={ventures} />
      <JournalPreview entries={journal} />
      <FooterCTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
      <div className="grid gap-16 md:grid-cols-12 md:gap-10 min-h-[60vh]">
        <div className="md:col-span-8 flex flex-col gap-10 justify-between">
          <span className="mono-label text-muted-foreground">
            EST. 2026 · DELAWARE
          </span>

          <div className="flex flex-col gap-6 max-w-3xl">
            <h1 className="text-balance text-[2.25rem] md:text-5xl leading-[1.1] tracking-tight">
              A holding company
              <br />
              <span className="text-muted-foreground">
                for software, capital, and ideas.
              </span>
            </h1>
            <p className="max-w-md text-base text-muted-foreground leading-relaxed">
              RJZ Holdings holds equity in operating ventures, allocates capital
              across projects, and provides an institutional umbrella for the
              work that runs under it.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/ventures"
              className="group inline-flex items-center gap-2 border border-foreground/80 px-5 h-11 text-sm hover:bg-foreground hover:text-background transition-colors"
            >
              View ventures
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <Link
              href="/about"
              className="mono-label text-muted-foreground hover:text-foreground transition-colors"
            >
              About RJZ →
            </Link>
          </div>
        </div>

        <aside className="md:col-span-4 relative flex flex-col justify-between gap-10 md:items-end md:pl-8">
          <span
            aria-hidden
            className="hairline-v hidden md:block absolute left-0 top-0 bottom-0"
          />
          <div className="flex flex-col gap-2 md:items-end">
            <span className="mono-label silver-text">Index</span>
            <span className="font-mono text-sm">000 / 001</span>
          </div>

          <div className="flex flex-col gap-2 md:items-end mt-auto">
            <span className="mono-label silver-text">Coordinates</span>
            <span className="font-mono text-xs md:text-sm text-foreground/80">
              N 42.1875° · W 71.3070°
            </span>
            <span className="mono-label text-muted-foreground">
              Medfield, MA
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}

function JournalPreview({
  entries,
}: {
  entries: ReturnType<typeof getAllJournalMetas>;
}) {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 md:px-10 flex flex-col gap-10">
      <SectionHeader
        index="02"
        label="Journal"
        title="Notes from inside the holding company."
        description="Short writing on what we're building and why. Updated occasionally, not on a schedule."
        action={
          <Link
            href="/journal"
            className="mono-label text-muted-foreground hover:text-foreground transition-colors"
          >
            All entries →
          </Link>
        }
      />

      {entries.length === 0 ? (
        <p className="text-muted-foreground text-sm">No entries yet.</p>
      ) : (
        <ul className="divide-y divide-border">
          {entries.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={`/journal/${entry.slug}`}
                className="group grid grid-cols-12 gap-4 py-6 items-baseline"
              >
                <span className="mono-label text-muted-foreground col-span-3 md:col-span-2">
                  {formatDate(entry.date)}
                </span>
                <h3 className="text-lg col-span-9 md:col-span-7 group-hover:text-accent transition-colors">
                  {entry.title}
                </h3>
                <p className="hidden md:block text-sm text-muted-foreground col-span-3 text-right">
                  Read →
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function FooterCTA() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
      <div className="border border-border p-10 md:p-16 flex flex-col gap-8">
        <span className="mono-label text-muted-foreground">03 / Contact</span>
        <h2 className="text-balance text-3xl md:text-4xl leading-tight max-w-2xl">
          Working on something the umbrella might fit?
        </h2>
        <p className="text-muted-foreground max-w-xl leading-relaxed">
          Investment, consulting, or operating partnership inquiries are welcome.
          Responses are written by a human.
        </p>
        <div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 border border-foreground/80 px-5 h-11 text-sm hover:bg-foreground hover:text-background transition-colors"
          >
            Get in touch
            <ArrowUpRight
              size={14}
              strokeWidth={1.5}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    })
    .toUpperCase();
}
