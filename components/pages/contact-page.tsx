import { ArrowUpRight } from "lucide-react";
import type { Dict } from "@/lib/i18n";

export function ContactPage({ dict }: { dict: Dict }) {
  const d = dict.contact;

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

      <section className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="mono-label text-muted-foreground">
            {d.channelsLabel}
          </span>
        </div>
        <div className="md:col-span-9 flex flex-col gap-6 max-w-xl">
          <ContactRow
            label={d.channels.general}
            value="hello@rjzholdings.com"
            href="mailto:hello@rjzholdings.com"
          />
          <ContactRow
            label={d.channels.partners}
            value="partners@rjzholdings.com"
            href="mailto:partners@rjzholdings.com"
          />
          <ContactRow
            label={d.channels.press}
            value="press@rjzholdings.com"
            href="mailto:press@rjzholdings.com"
          />
        </div>
      </section>

      <hr className="hairline" />

      <section className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="mono-label text-muted-foreground">
            {d.registeredLabel}
          </span>
        </div>
        <div className="md:col-span-9 flex flex-col gap-2 text-sm leading-relaxed">
          {d.registered.map((line, i) => (
            <p
              key={i}
              className={i === 0 ? "" : "text-muted-foreground"}
            >
              {line}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group grid grid-cols-12 gap-4 py-5 border-b border-border items-baseline"
    >
      <span className="mono-label text-muted-foreground col-span-12 md:col-span-5">
        {label}
      </span>
      <span className="col-span-11 md:col-span-6 text-base group-hover:text-accent transition-colors">
        {value}
      </span>
      <ArrowUpRight
        size={14}
        strokeWidth={1.5}
        className="col-span-1 text-muted-foreground transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}
