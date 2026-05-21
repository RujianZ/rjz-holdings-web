import type { Metadata } from "next";
import Link from "next/link";
import { getAllJournalMetas } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from inside RJZ Holdings.",
};

export default function JournalIndexPage() {
  const entries = getAllJournalMetas();

  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 py-16 md:py-24 flex flex-col gap-16">
      <header className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="mono-label text-muted-foreground">02 / Journal</span>
        </div>
        <div className="md:col-span-9 flex flex-col gap-6">
          <h1 className="text-balance text-4xl md:text-5xl leading-[1.1] tracking-tight">
            Notes from inside
            <br />
            <span className="text-muted-foreground">the holding company.</span>
          </h1>
          <p className="max-w-xl text-muted-foreground leading-relaxed">
            Short writing on what we&apos;re building and why. Updated
            occasionally, not on a schedule.
          </p>
        </div>
      </header>

      <hr className="hairline" />

      {entries.length === 0 ? (
        <p className="text-muted-foreground">No entries yet.</p>
      ) : (
        <ul className="divide-y divide-border">
          {entries.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={`/journal/${entry.slug}`}
                className="group grid grid-cols-12 gap-4 py-8 items-baseline"
              >
                <span className="mono-label text-muted-foreground col-span-12 md:col-span-2">
                  {formatDate(entry.date)}
                </span>
                <div className="col-span-12 md:col-span-8 flex flex-col gap-2">
                  <h2 className="text-xl md:text-2xl leading-tight group-hover:text-accent transition-colors">
                    {entry.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {entry.description}
                  </p>
                </div>
                <span className="mono-label text-muted-foreground hidden md:block col-span-2 text-right">
                  Read →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
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
