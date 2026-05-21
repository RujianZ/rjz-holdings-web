import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { ScanLine } from "@/components/scan-line";
import { Typewriter } from "@/components/typewriter";
import { Stagger, StaggerItem, Reveal } from "@/components/reveal";
import { getAllVentureMetas, type VentureMeta } from "@/lib/ventures";
import type { Dict } from "@/lib/i18n";

export function HomePage({ dict }: { dict: Dict }) {
  const ventures = getAllVentureMetas(dict.lang);

  return (
    <div className="flex flex-col gap-24 md:gap-32 pt-12 md:pt-24">
      <Hero dict={dict} />
      <VenturesSection ventures={ventures} dict={dict} />
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
                {dict.home.titleB && (
                  <>
                    <br />
                    <span className="text-muted-foreground">
                      {dict.home.titleB}
                    </span>
                  </>
                )}
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

function VenturesSection({
  ventures,
  dict,
}: {
  ventures: VentureMeta[];
  dict: Dict;
}) {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 md:px-10 flex flex-col gap-10">
      <SectionHeader
        index={dict.home.ventures.index}
        label={dict.home.ventures.label}
        title={dict.home.ventures.title}
        description={dict.home.ventures.description}
      />

      <Stagger mode="view" staggerDelay={0.08} className="grid gap-px bg-border">
        {ventures.map((v) => {
          const isComingSoon = v.status === "coming-soon";
          const Row = (
            <article className="group h-full flex flex-col justify-between p-8 md:p-10 bg-background min-h-[220px] gap-6">
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-center gap-5">
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
                    <h3 className="text-xl leading-tight">{v.name}</h3>
                  </div>
                </div>
                <span className="mono-label text-muted-foreground shrink-0">
                  {v.year}
                </span>
              </div>

              <div className="flex items-end justify-between gap-6">
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                  {v.description}
                </p>
                {isComingSoon ? (
                  <span className="mono-label text-accent shrink-0">
                    {dict.ventures.comingSoon}
                  </span>
                ) : (
                  <span className="mono-label inline-flex items-center gap-1 text-foreground transition-colors group-hover:text-accent shrink-0">
                    {dict.ventures.readCaseStudy}
                    <ArrowUpRight size={12} strokeWidth={1.5} />
                  </span>
                )}
              </div>
            </article>
          );

          return (
            <StaggerItem key={v.slug}>
              {isComingSoon ? (
                Row
              ) : (
                <Link
                  href={`${dict.prefix}/ventures/${v.slug}`}
                  className="block h-full"
                >
                  {Row}
                </Link>
              )}
            </StaggerItem>
          );
        })}
      </Stagger>
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
