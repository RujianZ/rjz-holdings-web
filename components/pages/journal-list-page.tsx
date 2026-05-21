import Link from "next/link";
import { getAllJournalMetas } from "@/lib/journal";
import type { Dict } from "@/lib/i18n";

export function JournalListPage({ dict }: { dict: Dict }) {
  const entries = getAllJournalMetas(dict.lang);
  const d = dict.journal;

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

      {entries.length === 0 ? (
        <p className="text-muted-foreground">{d.noEntries}</p>
      ) : (
        <ul className="divide-y divide-border">
          {entries.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={`${dict.prefix}/journal/${entry.slug}`}
                className="group grid grid-cols-12 gap-4 py-8 items-baseline"
              >
                <span className="mono-label text-muted-foreground col-span-12 md:col-span-2">
                  {formatDate(entry.date, dict.lang)}
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
                  {d.read}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
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
