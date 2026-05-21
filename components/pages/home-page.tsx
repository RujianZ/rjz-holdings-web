import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { VenturesScroller } from "@/components/ventures-scroller";
import { SectionHeader } from "@/components/section-header";
import { ScanLine } from "@/components/scan-line";
import { Typewriter } from "@/components/typewriter";
import { Stagger, StaggerItem, Reveal } from "@/components/reveal";
import { getAllVentureMetas } from "@/lib/ventures";
import { getAllJournalMetas, type JournalMeta } from "@/lib/journal";
import type { Dict } from "@/lib/i18n";

export function HomePage({ dict }: { dict: Dict }) {
  const ventures = getAllVentureMetas(dict.lang);
  const journal = getAllJournalMetas(dict.lang).slice(0, 3);

  return (
    <div className="flex flex-col gap-24 md:gap-32 pt-12 md:pt-24">
      <Hero dict={dict} />
      <VenturesScroller
        ventures={ventures}
        labels={dict.home.ventures}
        ventureLabels={{
          caseStudy: dict.ventures.readCaseStudy,
          comingSoon: dict.ventures.comingSoon,
        }}
        baseUrl={`${dict.prefix}/ventures`}
      />
      <JournalPreview entries={journal} dict={dict} />
      <FooterCTA dict={dict} />
    </div>
  );
}

function Hero({ dict }: { dict: Dict }) {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 md:px-10">
      <ScanLine delay={0.15} duration={1.3} />
      <div className="relative grid gap-16 md:grid-cols-12 md:gap-10 min-h-[60vh]">
        <Stagger
          mode="load"
          staggerDelay={0.09}
          initialDelay={0.2}
          className="md:col-span-8 flex flex-col gap-10 justify-between"
        >
          <StaggerItem>
            <span className="mono-label text-muted-foreground">
              {dict.home.eyebrow}
            </span>
          </StaggerItem>

          <div className="flex flex-col gap-6 max-w-3xl">
            <StaggerItem>
              <h1 className="text-balance text-[2.25rem] md:text-5xl leading-[1.1] tracking-tight">
                {dict.home.titleA}
                <br />
                <span className="text-muted-foreground">
                  {dict.home.titleB}
                </span>
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="max-w-md text-base text-muted-foreground leading-relaxed">
                {dict.home.description}
              </p>
            </StaggerItem>
          </div>

          <StaggerItem>
            <div className="flex items-center gap-6">
              <Link
                href={`${dict.prefix}/ventures`}
                className="group inline-flex items-center gap-2 border border-foreground/80 px-5 h-11 text-sm hover:bg-foreground hover:text-background transition-colors"
              >
                {dict.home.viewVentures}
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                href={`${dict.prefix}/about`}
                className="mono-label text-muted-foreground hover:text-foreground transition-colors"
              >
                {dict.home.aboutLink}
              </Link>
            </div>
          </StaggerItem>
        </Stagger>

        <aside className="md:col-span-4 relative flex flex-col justify-between gap-10 md:items-end md:pl-8">
          <span
            aria-hidden
            className="hairline-v hidden md:block absolute left-0 top-0 bottom-0"
          />
          <Reveal mode="load" delay={0.6} y={6}>
            <div className="flex flex-col gap-2 md:items-end">
              <span className="mono-label silver-text">
                {dict.home.indexLabel}
              </span>
              <span className="font-mono text-sm">{dict.home.indexValue}</span>
            </div>
          </Reveal>

          <Reveal mode="load" delay={0.85} y={6}>
            <div className="flex flex-col gap-2 md:items-end mt-auto">
              <span className="mono-label silver-text">
                {dict.home.coordinatesLabel}
              </span>
              <span className="font-mono text-xs md:text-sm text-foreground/80">
                <Typewriter
                  text="N 42.1875° · W 71.3070°"
                  delay={950}
                  speed={32}
                />
              </span>
              <span className="mono-label text-muted-foreground">
                {dict.home.locationLabel}
              </span>
            </div>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}

function JournalPreview({
  entries,
  dict,
}: {
  entries: JournalMeta[];
  dict: Dict;
}) {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 md:px-10 flex flex-col gap-10">
      <SectionHeader
        index={dict.home.journal.index}
        label={dict.home.journal.label}
        title={dict.home.journal.title}
        description={dict.home.journal.description}
        action={
          <Link
            href={`${dict.prefix}/journal`}
            className="mono-label text-muted-foreground hover:text-foreground transition-colors"
          >
            {dict.home.journal.allEntries}
          </Link>
        }
      />

      {entries.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          {dict.home.journal.noEntries}
        </p>
      ) : (
        <Stagger
          mode="view"
          staggerDelay={0.08}
          className="divide-y divide-border"
        >
          {entries.map((entry) => (
            <StaggerItem key={entry.slug}>
              <Link
                href={`${dict.prefix}/journal/${entry.slug}`}
                className="group grid grid-cols-12 gap-4 py-6 items-baseline"
              >
                <span className="mono-label text-muted-foreground col-span-3 md:col-span-2">
                  {formatDate(entry.date, dict.lang)}
                </span>
                <h3 className="text-lg col-span-9 md:col-span-7 group-hover:text-accent transition-colors">
                  {entry.title}
                </h3>
                <p className="hidden md:block text-sm text-muted-foreground col-span-3 text-right">
                  {dict.home.journal.read}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </section>
  );
}

function FooterCTA({ dict }: { dict: Dict }) {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
      <Reveal mode="view" y={20}>
        <div className="border border-border p-10 md:p-16 flex flex-col gap-8">
          <span className="mono-label text-muted-foreground">
            {dict.home.cta.index} / {dict.home.cta.label}
          </span>
          <h2 className="text-balance text-3xl md:text-4xl leading-tight max-w-2xl">
            {dict.home.cta.title}
          </h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            {dict.home.cta.description}
          </p>
          <div>
            <Link
              href={`${dict.prefix}/contact`}
              className="group inline-flex items-center gap-2 border border-foreground/80 px-5 h-11 text-sm hover:bg-foreground hover:text-background transition-colors"
            >
              {dict.home.cta.button}
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function formatDate(iso: string, lang: "en" | "zh"): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  if (lang === "zh") {
    return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
  }
  return d
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    })
    .toUpperCase();
}
