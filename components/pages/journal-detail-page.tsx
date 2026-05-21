import Link from "next/link";
import type { ComponentType } from "react";
import { ArrowLeft } from "lucide-react";
import type { JournalEntry } from "@/lib/journal";
import type { Dict } from "@/lib/i18n";

interface Props {
  entry: JournalEntry;
  dict: Dict;
  Content: ComponentType;
}

export function JournalDetailPage({ entry, dict, Content }: Props) {
  return (
    <article className="mx-auto w-full max-w-[760px] px-6 md:px-10 py-16 md:py-24 flex flex-col gap-12">
      <nav>
        <Link
          href={`${dict.prefix}/journal`}
          className="mono-label inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={12} strokeWidth={1.5} />
          {dict.journal.back}
        </Link>
      </nav>

      <header className="flex flex-col gap-6">
        <span className="mono-label text-muted-foreground">
          {formatDate(entry.date, dict.lang)}
        </span>
        <h1 className="text-balance text-3xl md:text-4xl leading-[1.15] tracking-tight">
          {entry.title}
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          {entry.description}
        </p>
      </header>

      <hr className="hairline" />

      <div className="prose-rjz text-base leading-relaxed flex flex-col gap-6">
        <Content />
      </div>
    </article>
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
      month: "long",
      day: "numeric",
    })
    .toUpperCase();
}
