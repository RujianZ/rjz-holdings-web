import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Lang } from "@/lib/i18n";

function labDir(lang: Lang): string {
  return path.join(
    process.cwd(),
    "content",
    lang === "zh" ? "zh/lab" : "lab"
  );
}

export interface LabLink {
  label: string;
  href: string;
}

export interface LabItem {
  slug: string;
  name: string;
  index: string;
  hook: string;
  status: string;
  year: string;
  order: number;
  thesis?: string[];
  description?: string[];
  links?: LabLink[];
}

function readLabFile(filename: string, dir: string): LabItem {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(dir, filename), "utf8");
  const { data } = matter(raw);
  return {
    slug: (data.slug as string) ?? slug,
    name: data.name as string,
    index: data.index as string,
    hook: data.hook as string,
    status: data.status as string,
    year: data.year as string,
    order: (data.order as number) ?? 0,
    thesis: data.thesis as string[] | undefined,
    description: data.description as string[] | undefined,
    links: data.links as LabLink[] | undefined,
  };
}

export function getAllLabItems(lang: Lang = "en"): LabItem[] {
  const dir = labDir(lang);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f));
  return files
    .map((f) => readLabFile(f, dir))
    .sort((a, b) => a.order - b.order);
}
