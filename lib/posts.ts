import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;          // "2025-09-12"
  excerpt?: string;
  cover?: string;
  coverAlt?: string;
  tags?: string[];
  readingTime?: string;  // "6 min"
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export function listSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } {
  const full = path.join(POSTS_DIR, `${slug}.mdx`);
  const fullMd = path.join(POSTS_DIR, `${slug}.md`);
  const file = fs.existsSync(full) ? full : fullMd;
  if (!fs.existsSync(file)) throw new Error("Post not found: " + slug);

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  const meta: PostMeta = {
    slug,
    title: String(data.title || "Sans titre"),
    date: String(data.date || "1970-01-01"),
    excerpt: data.excerpt ? String(data.excerpt) : undefined,
    cover: data.cover ? String(data.cover) : undefined,
    coverAlt: data.coverAlt ? String(data.coverAlt) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    readingTime: data.readingTime ? String(data.readingTime) : undefined,
  };

  return { meta, content };
}

export function getAllPostsMeta(): PostMeta[] {
  return listSlugs()
    .map((slug) => getPostBySlug(slug).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // récent d'abord
}
