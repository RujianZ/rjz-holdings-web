import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Lang } from "@/lib/i18n";

function venturesDir(lang: Lang): string {
  return path.join(
    process.cwd(),
    "content",
    lang === "zh" ? "zh/ventures" : "ventures"
  );
}

export type VentureStatus = "active" | "pre-launch" | "coming-soon" | "archived";

export interface VentureMeta {
  slug: string;
  name: string;
  monogram: string;
  category: string;
  index: string;
  year: string;
  description: string;
  notes?: string[];
  status: VentureStatus;
  order: number;
  role?: string;
  stack?: string[];
}

export interface Venture extends VentureMeta {
  body: string;
}

function readVentureFile(filename: string, dir: string): Venture {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(dir, filename), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: (data.slug as string) ?? slug,
    name: data.name as string,
    monogram: data.monogram as string,
    category: data.category as string,
    index: data.index as string,
    year: data.year as string,
    description: data.description as string,
    notes: data.notes as string[] | undefined,
    status: ((data.status as VentureStatus) ?? "active"),
    order: (data.order as number) ?? 0,
    role: data.role as string | undefined,
    stack: data.stack as string[] | undefined,
    body: content.trim(),
  };
}

export function getAllVentures(lang: Lang = "en"): Venture[] {
  const dir = venturesDir(lang);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f));
  return files
    .map((f) => readVentureFile(f, dir))
    .sort((a, b) => a.order - b.order);
}

export function getAllVentureMetas(lang: Lang = "en"): VentureMeta[] {
  return getAllVentures(lang).map(({ body: _body, ...meta }) => meta);
}

/**
 * Ventures surfaced in lists / home section.
 * The remaining MDX files (LogicLink, HNDSL Portal) are kept as
 * deep-linkable detail pages but no longer treated as standalone
 * external ventures — they've been moved to the Lab section.
 */
const FEATURED_SLUGS = new Set(["zzup"]);

export function getFeaturedVentureMetas(lang: Lang = "en"): VentureMeta[] {
  return getAllVentureMetas(lang).filter((v) => FEATURED_SLUGS.has(v.slug));
}

export function getVentureBySlug(slug: string, lang: Lang = "en"): Venture | null {
  const all = getAllVentures(lang);
  return all.find((v) => v.slug === slug) ?? null;
}

export function getVentureSlugs(lang: Lang = "en"): string[] {
  return getAllVentures(lang).map((v) => v.slug);
}
