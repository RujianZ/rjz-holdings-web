import { PlaceholderFrame } from "@/components/placeholder-frame";
import type { Dict } from "@/lib/i18n";

export function AboutPage({ dict }: { dict: Dict }) {
  const d = dict.about;
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 py-16 md:py-24 flex flex-col gap-16">
      <header className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="mono-label text-muted-foreground">{d.section}</span>
        </div>
        <div className="md:col-span-9">
          <h1 className="text-balance text-4xl md:text-5xl leading-[1.1] tracking-tight">
            {d.titleA}
            <br />
            <span className="text-muted-foreground">{d.titleB}</span>
          </h1>
        </div>
      </header>

      <hr className="hairline" />

      <section className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="mono-label text-muted-foreground">
            {d.mandateLabel}
          </span>
        </div>
        <div className="md:col-span-9 flex flex-col gap-6 max-w-2xl text-base leading-relaxed">
          {d.mandateBody.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <hr className="hairline" />

      <section className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="mono-label text-muted-foreground">
            {d.founderLabel}
          </span>
        </div>
        <div className="md:col-span-9 grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <PlaceholderFrame
              label={`${d.founderLabel} / portrait`}
              caption={d.founderPortraitCaption}
              aspect="portrait"
            />
          </div>
          <div className="md:col-span-7 flex flex-col gap-4 text-base leading-relaxed">
            <p className="text-lg">{d.founderName}</p>
            {d.founderBio.map((p, i) => (
              <p
                key={i}
                className={
                  i === d.founderBio.length - 1
                    ? "text-sm text-muted-foreground"
                    : "text-muted-foreground"
                }
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      <section className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="mono-label text-muted-foreground">
            {d.recordLabel}
          </span>
        </div>
        <div className="md:col-span-9">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 max-w-2xl">
            {Object.values(d.record).map((row) => (
              <Row key={row.term} term={row.term} value={row.value} />
            ))}
          </dl>
        </div>
      </section>

      <hr className="hairline" />

      <section className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="mono-label text-muted-foreground">
            {d.structureLabel}
          </span>
        </div>
        <div className="md:col-span-9 flex flex-col gap-6 max-w-2xl text-base leading-relaxed">
          {d.structureBody.map((p, i) => (
            <p
              key={i}
              className={
                i === d.structureBody.length - 1
                  ? "text-muted-foreground text-sm"
                  : ""
              }
            >
              {p}
            </p>
          ))}
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
