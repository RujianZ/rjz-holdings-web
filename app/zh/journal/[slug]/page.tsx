import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalDetailPage } from "@/components/pages/journal-detail-page";
import { getJournalBySlug, getJournalSlugs } from "@/lib/journal";
import { zhDict } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getJournalSlugs("zh").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getJournalBySlug(slug, "zh");
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const entry = getJournalBySlug(slug, "zh");
  if (!entry) notFound();

  const { default: Content } = await import(
    `@/content/zh/journal/${entry.slug}.mdx`
  );

  return <JournalDetailPage entry={entry} dict={zhDict} Content={Content} />;
}
