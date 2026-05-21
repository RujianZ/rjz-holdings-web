import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const JOURNAL_DIR = path.join(process.cwd(), "content", "journal");

export interface JournalMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export interface JournalEntry extends JournalMeta {
  body: string;
}

function readJournalFile(filename: string): JournalEntry {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(JOURNAL_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: (data.slug as string) ?? slug,
    title: data.title as string,
    date: data.date as string,
    description: data.description as string,
    body: content.trim(),
  };
}

export function getAllJournal(): JournalEntry[] {
  if (!fs.existsSync(JOURNAL_DIR)) return [];
  const files = fs.readdirSync(JOURNAL_DIR).filter((f) => /\.mdx?$/.test(f));
  return files
    .map(readJournalFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllJournalMetas(): JournalMeta[] {
  return getAllJournal().map(({ body: _body, ...meta }) => meta);
}

export function getJournalBySlug(slug: string): JournalEntry | null {
  const all = getAllJournal();
  return all.find((j) => j.slug === slug) ?? null;
}

export function getJournalSlugs(): string[] {
  return getAllJournal().map((j) => j.slug);
}
