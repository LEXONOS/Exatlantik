import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ p }: { p: PostMeta }) {
  const hasTag = !!(p.tags && p.tags.length > 0);
  const dateLabel = safeDateFR(p.date);

  // IDs pour accessibilité (titre/desc liés)
  const titleId = `post-title-${p.slug}`;
  const descId = p.excerpt ? `post-desc-${p.slug}` : undefined;

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-white/50 bg-white/70 shadow-sm backdrop-blur-xl transition hover:shadow-md focus-within:shadow-md"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      {/* Lien plein-carte accessible */}
      <Link
        href={`/blog/${p.slug}`}
        className="absolute inset-0 z-10 rounded-2xl outline-none focus-visible:ring-4 focus-visible:ring-teal-200"
        aria-label={p.title}
        prefetch={false}
      />

      {/* Couverture */}
      {p.cover && (
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={p.cover}
            alt={p.coverAlt || p.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        </div>
      )}

      {/* Contenu */}
      <div className="relative z-20 p-5">
        {/* Meta ligne (tags + date + temps de lecture) */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          {hasTag ? (
            <span className="inline-flex items-center gap-2">
              {/* Premier tag cliquable vers /blog?tag=... */}
              <Link
                href={`/blog?tag=${encodeURIComponent(p.tags![0])}`}
                className="rounded-full bg-teal-50 px-2 py-0.5 font-medium text-teal-700 hover:bg-teal-100"
                onClick={(e) => e.stopPropagation()}
                prefetch={false}
                aria-label={`Filtrer par tag ${p.tags![0]}`}
              >
                {p.tags![0]}
              </Link>
              <span aria-hidden>•</span>
            </span>
          ) : null}

          <time dateTime={p.date}>{dateLabel}</time>

          {p.readingTime && (
            <>
              <span aria-hidden>•</span>
              <span>{p.readingTime}</span>
            </>
          )}
        </div>

        {/* Titre */}
        <h2 id={titleId} className="mt-2 line-clamp-2 text-lg font-semibold text-slate-900">
          {p.title}
        </h2>

        {/* Extrait */}
        {p.excerpt && (
          <p id={descId} className="mt-1 line-clamp-2 text-sm text-slate-700">
            {p.excerpt}
          </p>
        )}

        {/* CTA discret */}
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-teal-700">
          Lire →
        </span>
      </div>

      {/* halo subtil au hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition group-hover:ring-cyan-300/40"
      />
    </article>
  );
}

/** Formatage robuste (évite NaN/Invalid Date si p.date est vide ou mal formé) */
function safeDateFR(dateInput: string | number | Date | undefined): string {
  if (!dateInput) return "";
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("fr-FR");
}
