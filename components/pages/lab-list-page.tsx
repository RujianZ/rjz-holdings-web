import { SectionHeader } from "@/components/section-header";
import { Stagger, StaggerItem } from "@/components/reveal";
import { LabCard } from "@/components/lab-card";
import { getAllLabItems } from "@/lib/lab";
import type { Dict } from "@/lib/i18n";

export function LabListPage({ dict }: { dict: Dict }) {
  const items = getAllLabItems(dict.lang);

  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 py-16 md:py-24 flex flex-col gap-16">
      <header className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="mono-label text-muted-foreground">
            {dict.lab.index} / {dict.lab.label}
          </span>
        </div>
        <div className="md:col-span-9 flex flex-col gap-6">
          <h1 className="text-balance text-4xl md:text-5xl leading-[1.1] tracking-tight">
            {dict.lab.title}
          </h1>
          <p className="max-w-xl text-muted-foreground leading-relaxed">
            {dict.lab.description}
          </p>
        </div>
      </header>

      <hr className="hairline" />

      {items.length === 0 ? (
        <p className="text-muted-foreground">{dict.lab.emptyMessage}</p>
      ) : (
        <Stagger mode="view" staggerDelay={0.08} className="grid gap-px bg-border">
          {items.map((item) => (
            <StaggerItem key={item.slug}>
              <LabCard item={item} dict={dict} />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}
