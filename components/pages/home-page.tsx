import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { ScanLine } from "@/components/scan-line";
import { HeroBackground } from "@/components/hero-background";
import { Typewriter } from "@/components/typewriter";
import { Stagger, StaggerItem, Reveal } from "@/components/reveal";
import { LabCard } from "@/components/lab-card";
import { VentureCard } from "@/components/venture-card";
import { SectionSpine } from "@/components/section-spine";
import {
  getFeaturedVentureMetas,
  type VentureMeta,
} from "@/lib/ventures";
import { getAllLabItems, type LabItem } from "@/lib/lab";
import type { Dict } from "@/lib/i18n";

export function HomePage({ dict }: { dict: Dict }) {
  const ventures = getFeaturedVentureMetas(dict.lang);
  const lab = getAllLabItems(dict.lang);

  const spineSections = [
    { id: "index", index: "00", label: dict.home.indexLabel },
    {
      id: "ventures",
      index: dict.home.ventures.index,
      label: dict.home.ventures.label,
    },
    { id: "lab", index: dict.lab.index, label: dict.lab.label },
    {
      id: "contact",
      index: dict.home.cta.index,
      label: dict.home.cta.label,
    },
  ];

  return (
    <>
      <SectionSpine sections={spineSections} />
      <div className="flex flex-col gap-24 md:gap-32 pt-12 md:pt-24">
        <Hero dict={dict} />
        <VenturesSection ventures={ventures} dict={dict} />
        <LabSection items={lab} dict={dict} />
        <FooterCTA dict={dict} />
      </div>
    </>
  );
}

function Hero({ dict }: { dict: Dict }) {
  return (
    <section
      id="index"
      className="relative w-full overflow-hidden scroll-mt-20"
    >
      <HeroBackground src="/hero-bg.png" />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-10">
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
    <section
      id="ventures"
      className="mx-auto w-full max-w-[1200px] px-6 md:px-10 flex flex-col gap-10 scroll-mt-20"
    >
      <SectionHeader
        index={dict.home.ventures.index}
        label={dict.home.ventures.label}
        title={dict.home.ventures.title}
        description={dict.home.ventures.description}
      />

      <Stagger mode="view" staggerDelay={0.08} className="grid gap-px bg-border">
        {ventures.map((v) => (
          <StaggerItem key={v.slug}>
            <VentureCard venture={v} dict={dict} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function LabSection({
  items,
  dict,
}: {
  items: LabItem[];
  dict: Dict;
}) {
  if (items.length === 0) return null;

  return (
    <section
      id="lab"
      className="mx-auto w-full max-w-[1200px] px-6 md:px-10 flex flex-col gap-10 scroll-mt-20"
    >
      <SectionHeader
        index={dict.lab.index}
        label={dict.lab.label}
        title={dict.lab.title}
        description={dict.lab.description}
      />

      <Stagger
        mode="view"
        staggerDelay={0.1}
        className="grid gap-px bg-border"
      >
        {items.map((item) => (
          <StaggerItem key={item.slug}>
            <LabCard item={item} dict={dict} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function FooterCTA({ dict }: { dict: Dict }) {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-[1200px] px-6 md:px-10 scroll-mt-20"
    >
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
