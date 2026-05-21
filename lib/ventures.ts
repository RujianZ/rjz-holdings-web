import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const VENTURES_DIR = path.join(process.cwd(), "content", "ventures");

export type VentureStatus = "active" | "coming-soon" | "archived";

export interface VentureMeta {
  slug: string;
  name: string;
  monogram: string;
  category: string;
  index: string;
  year: string;
  description: string;
  status: VentureStatus;
  order: number;
  role?: string;
  stack?: string[];
}

export interface Venture extends VentureMeta {
  body: string;
}

function readVentureFile(filename: string): Venture {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(VENTURES_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: (data.slug as string) ?? slug,
    name: data.name as string,
    monogram: data.monogram as string,
    category: data.category as string,
    index: data.index as string,
    year: data.year as string,
    description: data.description as string,
    status: ((data.status as VentureStatus) ?? "active"),
    order: (data.order as number) ?? 0,
    role: data.role as string | undefined,
    stack: data.stack as string[] | undefined,
    body: content.trim(),
  };
}

export function getAllVentures(): Venture[] {
  if (!fs.existsSync(VENTURES_DIR)) return [];
  const files = fs
    .readdirSync(VENTURES_DIR)
    .filter((f) => /\.mdx?$/.test(f));
  return files
    .map(readVentureFile)
    .sort((a, b) => a.order - b.order);
}

export function getAllVentureMetas(): VentureMeta[] {
  return getAllVentures().map(({ body: _body, ...meta }) => meta);
}

export function getVentureBySlug(slug: string): Venture | null {
  const all = getAllVentures();
  return all.find((v) => v.slug === slug) ?? null;
}

export function getVentureSlugs(): string[] {
  return getAllVentures().map((v) => v.slug);
}
