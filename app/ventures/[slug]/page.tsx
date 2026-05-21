import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getVentureBySlug, getVentureSlugs } from "@/lib/ventures";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getVentureSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const venture = getVentureBySlug(slug);
  if (!venture) return {};
  return {
    title: venture.name,
    description: venture.description,
  };
}

export default async function VenturePage({ params }: PageProps) {
  const { slug } = await params;
  const venture = getVentureBySlug(slug);
  if (!venture) notFound();

  const { default: Content } = await import(
    `@/content/ventures/${venture.slug}.mdx`
  );

  return (
    <article className="mx-auto w-full max-w-[1200px] px-6 md:px-10 py-16 md:py-24 flex flex-col gap-16">
      <nav>
        <Link
          href="/ventures"
          className="mono-label inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={12} strokeWidth={1.5} />
          All ventures
        </Link>
      </nav>

      <header className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3 flex flex-col gap-4">
          <span className="mono-label text-muted-foreground">
            {venture.index} / {venture.category}
          </span>
          <div className="flex h-14 w-14 items-center justify-center bg-foreground text-background text-xl">
            {venture.monogram}
          </div>
        </div>
        <div className="md:col-span-9 flex flex-col gap-6">
          <h1 className="text-balance text-4xl md:text-5xl leading-[1.1] tracking-tight">
            {venture.name}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {venture.description}
          </p>
        </div>
      </header>

      <hr className="hairline" />

      <section className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="mono-label text-muted-foreground">Brief</span>
        </div>
        <div className="md:col-span-9 max-w-2xl">
          <div className="prose-rjz text-base leading-relaxed flex flex-col gap-6">
            <Content />
          </div>
        </div>
      </section>

      <hr className="hairline" />

      <section className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="mono-label text-muted-foreground">Details</span>
        </div>
        <div className="md:col-span-9">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 max-w-2xl">
            <DetailRow term="Status" value={formatStatus(venture.status)} />
            <DetailRow term="Year" value={venture.year} />
            {venture.role && (
              <DetailRow term="Role" value={venture.role} />
            )}
            {venture.stack && venture.stack.length > 0 && (
              <div className="flex flex-col gap-2 md:col-span-2">
                <dt className="mono-label text-muted-foreground">Stack</dt>
                <dd className="flex flex-wrap gap-2">
                  {venture.stack.map((tech) => (
                    <span
                      key={tech}
                      className="mono-label text-foreground border border-border px-2 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </section>
    </article>
  );
}

function DetailRow({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="mono-label text-muted-foreground">{term}</dt>
      <dd className="text-base">{value}</dd>
    </div>
  );
}

function formatStatus(status: string): string {
  switch (status) {
    case "active":
      return "Active";
    case "coming-soon":
      return "Coming soon";
    case "archived":
      return "Archived";
    default:
      return status;
  }
}
