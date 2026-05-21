import type { Metadata } from "next";
import { PlaceholderFrame } from "@/components/placeholder-frame";

export const metadata: Metadata = {
  title: "About",
  description:
    "RJZ Holdings LLC is a Delaware-registered holding company established in 2026.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 py-16 md:py-24 flex flex-col gap-16">
      <header className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="mono-label text-muted-foreground">00 / About</span>
        </div>
        <div className="md:col-span-9">
          <h1 className="text-balance text-4xl md:text-5xl leading-[1.1] tracking-tight">
            RJZ Holdings is the structure
            <br />
            <span className="text-muted-foreground">behind the work.</span>
          </h1>
        </div>
      </header>

      <hr className="hairline" />

      <section className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="mono-label text-muted-foreground">Mandate</span>
        </div>
        <div className="md:col-span-9 flex flex-col gap-6 max-w-2xl text-base leading-relaxed">
          <p>
            RJZ Holdings LLC is a Delaware-registered holding company established
            in 2026. It exists to hold equity in operating ventures, manage
            capital allocation across projects, and provide an institutional
            umbrella for software development, consulting engagements, media
            output, and investments.
          </p>
          <p>
            The holding company itself does not deliver products or services to
            end users. Its operating ventures do. Each venture is structured
            independently and listed in the Ventures section.
          </p>
        </div>
      </section>

      <hr className="hairline" />

      <section className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="mono-label text-muted-foreground">Founder</span>
        </div>
        <div className="md:col-span-9 grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <PlaceholderFrame
              label="Founder / portrait"
              caption="800×1000 portrait"
              aspect="portrait"
            />
          </div>
          <div className="md:col-span-7 flex flex-col gap-4 text-base leading-relaxed">
            <p className="text-lg">[ Your name placeholder ]</p>
            <p className="text-muted-foreground">
              Founder & sole member of RJZ Holdings LLC. Operator, developer,
              capital allocator across the umbrella&apos;s ventures.
            </p>
            <p className="text-sm text-muted-foreground">
              Bio copy to be filled. This section will hold a 2–3 paragraph
              founder note once you&apos;re ready.
            </p>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      <section className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="mono-label text-muted-foreground">Record</span>
        </div>
        <div className="md:col-span-9">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 max-w-2xl">
            <Row term="Founder" value="[ to be filled ]" />
            <Row term="Jurisdiction" value="Delaware, USA" />
            <Row term="Registered Agent" value="Northwest Registered Agent" />
            <Row term="Established" value="2026" />
            <Row term="Operating Headquarters" value="Medfield, MA" />
            <Row term="Domain" value="rjzholdings.com" />
          </dl>
        </div>
      </section>

      <hr className="hairline" />

      <section className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="mono-label text-muted-foreground">Structure</span>
        </div>
        <div className="md:col-span-9 flex flex-col gap-6 max-w-2xl text-base leading-relaxed">
          <p>
            Each venture under the umbrella has its own legal entity, cap table,
            and operating plan. The holding company provides shared services —
            capital, infrastructure, and brand — without diluting the autonomy
            of individual ventures.
          </p>
          <p className="text-muted-foreground text-sm">
            This page is a record, not marketing. If anything here is unclear,
            ask.
          </p>
        </div>
      </section>
    </div>
  );
}

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="mono-label text-muted-foreground">{term}</dt>
      <dd className="text-base">{value}</dd>
    </div>
  );
}
