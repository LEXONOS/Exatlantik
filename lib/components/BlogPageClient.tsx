"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import PostCard from "@/lib/components/PostCard";
import type { PostMeta } from "@/lib/posts";

/**
 * DA iOS : halo souris global + panels verre/backdrop-blur
 * Sections :
 *  - À la une + 3 récents
 *  - Barre sticky (recherche + tags)
 *  - Masonry grid animée
 */
export default function BlogPageClient({
  allPosts,
  initialQ = "",
  initialTag = "",
}: {
  allPosts: PostMeta[];
  initialQ?: string;
  initialTag?: string;
}) {
  const [featured, ...rest] = allPosts;

  return (
    <div className="relative">
      <PointerHalo />
      {featured && <FeaturedBlock featured={featured} others={rest.slice(0, 3)} />}
      <ToolsAndGrid
        allPosts={allPosts}
        excludeSlug={featured?.slug}
        initialQ={initialQ}
        initialTag={initialTag}
      />
    </div>
  );
}

/* ========================= HALO (fond dynamique) ========================= */
function PointerHalo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ ["--mx" as any]: "55%", ["--my" as any]: "20%" } as CSSProperties}
    >
      {/* halo souris */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 320px at var(--mx) var(--my), rgba(14,165,233,0.22), transparent 60%)",
        }}
      />
      {/* auroras + grain très léger */}
      <div className="absolute -top-36 -left-28 h-[560px] w-[560px] rounded-full bg-cyan-400/18 blur-[120px] animate-pulse-slow" />
      <div className="absolute top-24 right-[-140px] h-[520px] w-[520px] rounded-full bg-blue-500/16 blur-[110px] animate-pulse-slower" />
      <div className="absolute bottom-[-220px] left-1/2 -translate-x-1/2 h-[680px] w-[680px] rounded-full bg-indigo-500/14 blur-[130px] animate-pulse-slowest" />
      <div className="absolute inset-0 opacity-25 [background:repeating-linear-gradient(120deg,rgba(255,255,255,0.10)_0px,rgba(255,255,255,0.10)_1px,transparent_2px,transparent_10px)] [mask-image:radial-gradient(65%_55%_at_50%_0%,black,transparent)]" />
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.9\\' numOctaves=\\'2\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\' opacity=\\'0.35\\'/></svg>')",
          backgroundSize: "200px 200px",
        }}
      />
      <style>{`
        .animate-pulse-slow{animation:pulse 7s ease-in-out infinite;}
        .animate-pulse-slower{animation:pulse 10s ease-in-out infinite;}
        .animate-pulse-slowest{animation:pulse 14s ease-in-out infinite;}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
      `}</style>
    </div>
  );
}

/* ========================= À LA UNE + 3 récents ========================= */
function FeaturedBlock({ featured, others }: { featured: PostMeta; others: PostMeta[] }) {
  return (
    <section className="mt-2">
      <div className="grid items-stretch gap-6 md:grid-cols-2">
        {/* À la une — carte visuelle grand format (verre sur image) */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group relative overflow-hidden rounded-3xl border border-white/50 bg-white/60 shadow-sm backdrop-blur-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-200"
        >
          {featured.cover && (
            <div className="relative h-80 w-full">
              <Image
                src={featured.cover}
                alt={featured.coverAlt || featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width:768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            </div>
          )}
          <div className="absolute left-0 right-0 bottom-0 p-6 md:p-7 text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs opacity-90">
              {featured.tags?.[0] && (
                <span className="rounded-full bg-white/20 px-2 py-0.5 font-medium">
                  {featured.tags[0]}
                </span>
              )}
              <span aria-hidden>•</span>
              <time dateTime={featured.date}>
                {new Date(featured.date).toLocaleDateString("fr-FR")}
              </time>
              {featured.readingTime && (
                <>
                  <span aria-hidden>•</span>
                  <span>{featured.readingTime}</span>
                </>
              )}
            </div>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold leading-snug drop-shadow">
              {featured.title}
            </h2>
            {featured.excerpt && (
              <p className="mt-1 line-clamp-2 text-sm opacity-95 drop-shadow">
                {featured.excerpt}
              </p>
            )}
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
              Lire l’article →
            </span>
          </div>
        </Link>

        {/* 3 récents en liste (verre) */}
        <div className="grid content-start gap-4">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group relative grid grid-cols-[100px_1fr] gap-3 overflow-hidden rounded-2xl border border-white/50 bg-white/70 p-3 shadow-sm backdrop-blur-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-200"
            >
              <div className="relative aspect-[4/3] w-[100px] overflow-hidden rounded-xl">
                {p.cover && (
                  <Image
                    src={p.cover}
                    alt={p.coverAlt || p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    sizes="100px"
                  />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                  {p.tags?.[0] && (
                    <span className="rounded-full bg-teal-50 px-2 py-0.5 font-medium text-teal-700">
                      {p.tags[0]}
                    </span>
                  )}
                  <span aria-hidden>•</span>
                  <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("fr-FR")}</time>
                </div>
                <h3 className="mt-1 line-clamp-2 font-semibold text-slate-900">{p.title}</h3>
                {p.excerpt && (
                  <p className="line-clamp-1 text-sm text-slate-700">{p.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================= OUTILS + MASONRY GRID ========================= */
function ToolsAndGrid({
  allPosts,
  excludeSlug,
  initialQ = "",
  initialTag = "",
}: {
  allPosts: PostMeta[];
  excludeSlug?: string;
  initialQ?: string;
  initialTag?: string;
}) {
  // Normalisation douce des tags (comparaison insensible à la casse)
  const normalize = (s: string) => s.trim().toLowerCase();

  const [q, setQ] = useState(initialQ);
  const [tag, setTag] = useState<string | null>(initialTag ? normalize(initialTag) : null);
  const [show, setShow] = useState(12);
  const reduce = useReducedMotion();

  // Liste de tags + compte (clé normalisée, label d’origine le plus fréquent)
  const tags = useMemo(() => {
    const map = new Map<string, { count: number; label: string }>();
    allPosts.forEach((p) =>
      (p.tags || []).forEach((t) => {
        const key = normalize(t);
        const prev = map.get(key);
        if (prev) {
          map.set(key, { count: prev.count + 1, label: prev.label });
        } else {
          map.set(key, { count: 1, label: t });
        }
      })
    );
    return Array.from(map.entries())
      .map(([key, v]) => ({ key, count: v.count, label: v.label }))
      .sort((a, b) => b.count - a.count);
  }, [allPosts]);

  const filtered = useMemo(() => {
    const text = normalize(q);
    return allPosts
      .filter((p) => p.slug !== excludeSlug)
      .filter((p) => {
        const tagList = (p.tags || []).map(normalize);
        const okTag = !tag || tagList.includes(tag);
        const okText =
          text.length === 0 ||
          p.title.toLowerCase().includes(text) ||
          (p.excerpt || "").toLowerCase().includes(text);
        return okTag && okText;
      });
  }, [allPosts, q, tag, excludeSlug]);

  const visible = filtered.slice(0, show);

  // --- BONUS : sync état -> URL (sans reload), pratique pour partager un filtre ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (q) url.searchParams.set("q", q);
    else url.searchParams.delete("q");
    if (tag) url.searchParams.set("tag", tag);
    else url.searchParams.delete("tag");
    // évite de créer de l'historique à chaque frappe
    window.history.replaceState({}, "", url.toString());
  }, [q, tag]);

  return (
    <div className="relative mt-10">
      {/* barre sticky en verre (offset pour ne pas chevaucher ton header global) */}
      <div className="sticky top-24 md:top-28 z-10">
        <div className="rounded-2xl border border-white/50 bg-white/70 backdrop-blur-xl px-4 py-3 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Recherche */}
            <div className="relative w-full md:max-w-xl">
              <svg
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="11" cy="11" r="7" stroke="#94a3b8" strokeWidth="2" />
                <path d="M20 20l-3.5-3.5" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setShow(12);
                }}
                placeholder="Rechercher un sujet (visa, budget, DS-160, assurance...)"
                className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-10 py-2.5 text-[15px] outline-none ring-teal-200/50 focus:ring-4"
                aria-label="Rechercher un article"
                type="text"
                inputMode="search"
                autoComplete="off"
              />
              {q && (
                <button
                  onClick={() => setQ("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-slate-500 hover:bg-slate-100"
                  aria-label="Effacer la recherche"
                >
                  Effacer
                </button>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filtres par tag">
              <Chip
                active={!tag}
                onClick={() => {
                  setTag(null);
                  setShow(12);
                }}
                ariaControls="grid-posts"
              >
                Tous
              </Chip>
              {tags.map((t) => (
                <Chip
                  key={t.key}
                  active={tag === t.key}
                  onClick={() => {
                    setTag(t.key);
                    setShow(12);
                  }}
                  ariaControls="grid-posts"
                >
                  {t.label} <span className="ml-1 text-slate-500">({t.count})</span>
                </Chip>
              ))}
            </div>
          </div>

          <p className="mt-2 text-xs text-slate-600">
            {filtered.length} article{filtered.length > 1 ? "s" : ""}{" "}
            {tag ? `• tag “${tags.find((t) => t.key === tag)?.label ?? tag}”` : ""}
            {q ? ` • recherche “${q}”` : ""}
          </p>
        </div>
      </div>

      {/* Masonry en colonnes */}
      {filtered.length === 0 ? (
        <p className="mt-6 text-slate-600">Aucun résultat. Essaie d’autres mots-clés.</p>
      ) : (
        <>
          <div id="grid-posts" className="mt-6 columns-1 gap-6 [column-fill:_balance] sm:columns-2 lg:columns-3">
            {visible.map((p, i) => (
              <motion.div
                key={p.slug}
                className="mb-6 break-inside-avoid"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.45, delay: (i % 9) * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <PostCard p={p} />
              </motion.div>
            ))}
          </div>

          {visible.length < filtered.length && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShow((n) => n + 12)}
                className="rounded-xl bg-gradient-to-r from-[#0FB5AE] to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-200"
                aria-label="Charger plus d’articles"
              >
                Charger plus
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  ariaControls,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  ariaControls?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm border transition ${
        active
          ? "bg-teal-600 text-white border-teal-600 shadow-sm"
          : "border-slate-200 text-slate-700 hover:bg-slate-50"
      }`}
      aria-pressed={!!active}
      aria-controls={ariaControls}
      role="tab"
    >
      {children}
    </button>
  );
}
