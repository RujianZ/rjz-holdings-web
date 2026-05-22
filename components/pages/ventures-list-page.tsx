import { VentureCard } from "@/components/venture-card";
import { Stagger, StaggerItem } from "@/components/reveal";
import { getFeaturedVentureMetas } from "@/lib/ventures";
import type { Dict } from "@/lib/i18n";

export function VenturesListPage({ dict }: { dict: Dict }) {
  const ventures = getFeaturedVentureMetas(dict.lang);
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

      <Stagger mode="view" staggerDelay={0.08} className="grid gap-px bg-border">
        {ventures.map((v) => (
          <StaggerItem key={v.slug}>
            <VentureCard venture={v} dict={dict} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
