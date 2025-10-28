"use client";

import { useMemo, useState } from "react";
import PostCard from "@/lib/components/PostCard";
import type { PostMeta } from "@/lib/posts";

type Props = { allPosts: PostMeta[] };

export default function BlogIndexClient({ allPosts }: Props) {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [show, setShow] = useState(9); // “charger plus” par paliers de 9

  const tags = useMemo(() => {
    const map = new Map<string, number>();
    allPosts.forEach((p) => (p.tags || []).forEach((t) => map.set(t, (map.get(t) || 0) + 1)));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [allPosts]);

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    return allPosts.filter((p) => {
      const okTag = !tag || (p.tags || []).includes(tag);
      const okText =
        text.length === 0 ||
        p.title.toLowerCase().includes(text) ||
        (p.excerpt || "").toLowerCase().includes(text);
      return okTag && okText;
    });
  }, [allPosts, q, tag]);

  const visible = filtered.slice(0, show);

  return (
    <>
      {/* barre d’outils */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* recherche */}
        <div className="relative w-full md:max-w-md">
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setShow(9); }}
            placeholder="Rechercher un sujet (visa, budget, DS-160, assurance...)"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[15px] outline-none ring-teal-200/50 focus:ring-4"
            aria-label="Rechercher un article"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-slate-500 hover:bg-slate-100"
              aria-label="Effacer"
            >
              Effacer
            </button>
          )}
        </div>

        {/* tags */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => { setTag(null); setShow(9); }}
            className={`rounded-full px-3 py-1.5 text-sm border ${!tag ? "bg-teal-600 text-white border-teal-600" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
          >
            Tous
          </button>
          {tags.map(([t, count]) => (
            <button
              key={t}
              onClick={() => { setTag(t); setShow(9); }}
              className={`rounded-full px-3 py-1.5 text-sm border ${tag === t ? "bg-teal-600 text-white border-teal-600" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
              aria-pressed={tag === t}
            >
              {t} <span className="ml-1 text-slate-500">({count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* compteur */}
      <p className="mt-4 text-sm text-slate-600">
        {filtered.length} article{filtered.length > 1 ? "s" : ""} {tag ? `— tag “${tag}”` : ""}{q ? ` — recherche “${q}”` : ""}
      </p>

      {/* grille */}
      {filtered.length === 0 ? (
        <p className="mt-6 text-slate-600">Aucun résultat. Essaie d’autres mots-clés.</p>
      ) : (
        <>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => <PostCard key={p.slug} p={p} />)}
          </div>

          {visible.length < filtered.length && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShow((n) => n + 9)}
                className="rounded-xl bg-gradient-to-r from-[#0FB5AE] to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95"
              >
                Charger plus
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
    