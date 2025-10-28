import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostsMeta, getPostBySlug, listSlugs } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import * as MDXUI from "../../../lib/components/mdx-ui";
import GithubSlugger from "github-slugger";

/* ========= Static params ========= */
export function generateStaticParams() {
  return listSlugs().map((slug) => ({ slug }));
}

/* ========= SEO dynamique ========= */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const { meta } = getPostBySlug(params.slug);
    const url = `https://www.exatlantik.com/blog/${meta.slug}`;
    return {
      title: `${meta.title} | Exatlantik`,
      description: meta.excerpt,
      alternates: { canonical: url },
      keywords: meta.tags,
      openGraph: {
        title: meta.title,
        description: meta.excerpt,
        url,
        type: "article",
        images: meta.cover ? [{ url: meta.cover }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: meta.title,
        description: meta.excerpt,
        images: meta.cover ? [meta.cover] : undefined,
      },
    };
  } catch {
    return {};
  }
}

/* ========= mini ToC depuis le markdown (slugger GitHub = même que rehype-slug) ========= */
function extractToc(src: string) {
  const lines = src.split(/\r?\n/);
  const items: { level: 2 | 3; text: string; id: string }[] = [];
  const slugger = new GithubSlugger();
  for (const raw of lines) {
    const m2 = /^##\s+(.+)$/.exec(raw);
    const m3 = /^###\s+(.+)$/.exec(raw);
    if (m2 || m3) {
      const text = (m2?.[1] ?? m3?.[1] ?? "").trim();
      const id = slugger.slug(text); // identique aux IDs générés par rehype-slug
      items.push({ level: m2 ? 2 : 3, text, id });
    }
  }
  return items;
}

/* ========= Page ========= */
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  let meta, content;
  try {
    ({ meta, content } = getPostBySlug(params.slug));
  } catch {
    return notFound();
  }

  const toc = extractToc(content);
  const all = getAllPostsMeta();
  const idx = all.findIndex((p) => p.slug === meta.slug);
  const prev = idx > 0 ? all[idx - 1] : undefined;
  const next = idx < all.length - 1 ? all[idx + 1] : undefined;

  return (
    <article className="mx-auto max-w-7xl px-4 py-10 md:pt-14">
      {/* HERO verre iOS */}
      <header className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/60 shadow-sm backdrop-blur-xl">
        {meta.cover && (
          <div className="relative h-[36vh] min-h-[260px] w-full">
            <Image
              src={meta.cover}
              alt={meta.coverAlt || meta.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />
          </div>
        )}

        <div className="relative -mt-16 md:-mt-20 px-4 pb-6 md:px-8">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/60 bg-white/80 p-5 backdrop-blur-xl shadow-sm">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
              {meta.tags?.map((t) => (
                <Link
                  key={t}
                  href={`/blog?tag=${encodeURIComponent(t)}`}
                  className="rounded-full bg-teal-50 px-2 py-0.5 font-medium text-teal-700"
                >
                  {t}
                </Link>
              ))}
              <span aria-hidden>•</span>
              <time dateTime={meta.date}>
                {new Date(meta.date).toLocaleDateString("fr-FR")}
              </time>
              {meta.readingTime && (
                <>
                  <span aria-hidden>•</span>
                  <span>{meta.readingTime}</span>
                </>
              )}
            </div>
            <h1 className="mt-2 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-slate-900">
              {meta.title}
            </h1>
            {meta.excerpt && (
              <p className="mt-2 text-[15px] text-slate-700">{meta.excerpt}</p>
            )}
          </div>
        </div>
      </header>

      {/* CONTENT + TOC */}
      <div className="mx-auto mt-10 grid gap-8 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_320px]">
        {/* PROSE */}
        <div>
          <div className="prose prose-slate max-w-none prose-img:rounded-2xl prose-img:shadow prose-headings:scroll-mt-28 md:prose-lg">
            <MDXRemote
              source={content}
              components={MDXUI as any}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypeAutolinkHeadings,
                      {
                        behavior: "wrap",
                        properties: { className: ["heading-link"] },
                      },
                    ],
                  ],
                },
              }}
            />
          </div>

          {/* Prev / Next */}
          <nav
            aria-label="Articles adjacents"
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-between"
          >
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                rel="prev"
                className="inline-flex items-center gap-2 rounded-xl border bg-white/70 px-4 py-2 text-sm text-slate-700 backdrop-blur hover:bg-white"
              >
                ← {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                rel="next"
                className="inline-flex items-center gap-2 rounded-xl border bg-white/70 px-4 py-2 text-sm text-slate-700 backdrop-blur hover:bg-white"
              >
                {next.title} →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>

        {/* SOMMAIRE sticky (desktop) */}
        <aside className="hidden md:block">
          <div className="sticky top-28 space-y-4">
            <div className="rounded-2xl border border-white/60 bg-white/70 p-4 backdrop-blur-xl shadow-sm">
              <p className="text-xs font-semibold text-slate-600">Sommaire</p>
              <ul className="mt-3 space-y-2 text-sm">
                {toc.length === 0 && <li className="text-slate-500">—</li>}
                {toc.map((h) => (
                  <li key={h.id} className={h.level === 3 ? "ml-3" : ""}>
                    <a href={`#${h.id}`} className="text-slate-700 hover:text-teal-700">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/60 bg-white/70 p-4 backdrop-blur-xl shadow-sm">
              <p className="text-xs font-semibold text-slate-600">
                Besoin d’un œil expert ?
              </p>
              <a
                href="https://tally.so/r/3XXYMd"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#0FB5AE] to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow"
              >
                Être recontacté
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* JSON-LD Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: meta.title,
            image: meta.cover ? [meta.cover] : undefined,
            datePublished: meta.date,
            dateModified: meta.date,
            description: meta.excerpt,
            author: { "@type": "Organization", name: "Exatlantik" },
            publisher: { "@type": "Organization", name: "Exatlantik" },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.exatlantik.com/blog/${meta.slug}`,
            },
          }),
        }}
      />
    </article>
  );
}
