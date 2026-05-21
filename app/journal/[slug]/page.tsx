import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getJournalBySlug, getJournalSlugs } from "@/lib/journal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getJournalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getJournalBySlug(slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.description,
  };
}

export default async function JournalEntryPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getJournalBySlug(slug);
  if (!entry) notFound();

  const { default: Content } = await import(
    `@/content/journal/${entry.slug}.mdx`
  );

  return (
    <article className="mx-auto w-full max-w-[760px] px-6 md:px-10 py-16 md:py-24 flex flex-col gap-12">
      <nav>
        <Link
          href="/journal"
          className="mono-label inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={12} strokeWidth={1.5} />
          Journal
        </Link>
      </nav>

      <header className="flex flex-col gap-6">
        <span className="mono-label text-muted-foreground">
          {formatDate(entry.date)}
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

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();
}
