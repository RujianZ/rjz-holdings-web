import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Lang } from "@/lib/i18n";

function journalDir(lang: Lang): string {
  return path.join(
    process.cwd(),
    "content",
    lang === "zh" ? "zh/journal" : "journal"
  );
}

export interface JournalMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export interface JournalEntry extends JournalMeta {
  body: string;
}

function readJournalFile(filename: string, dir: string): JournalEntry {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(dir, filename), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: (data.slug as string) ?? slug,
    title: data.title as string,
    date: data.date as string,
    description: data.description as string,
    body: content.trim(),
  };
}

export function getAllJournal(lang: Lang = "en"): JournalEntry[] {
  const dir = journalDir(lang);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f));
  return files
    .map((f) => readJournalFile(f, dir))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllJournalMetas(lang: Lang = "en"): JournalMeta[] {
  return getAllJournal(lang).map(({ body: _body, ...meta }) => meta);
}

export function getJournalBySlug(slug: string, lang: Lang = "en"): JournalEntry | null {
  const all = getAllJournal(lang);
  return all.find((j) => j.slug === slug) ?? null;
}

export function getJournalSlugs(lang: Lang = "en"): string[] {
  return getAllJournal(lang).map((j) => j.slug);
}
