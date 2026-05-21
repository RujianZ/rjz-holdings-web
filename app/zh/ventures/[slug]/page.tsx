import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VentureDetailPage } from "@/components/pages/venture-detail-page";
import { getVentureBySlug, getVentureSlugs } from "@/lib/ventures";
import { zhDict } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getVentureSlugs("zh").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const venture = getVentureBySlug(slug, "zh");
  if (!venture) return {};
  return {
    title: venture.name,
    description: venture.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const venture = getVentureBySlug(slug, "zh");
  if (!venture) notFound();

  const { default: Content } = await import(
    `@/content/zh/ventures/${venture.slug}.mdx`
  );

  return <VentureDetailPage venture={venture} dict={zhDict} Content={Content} />;
}
