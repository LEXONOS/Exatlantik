import type { Metadata } from "next";
import { getAllPostsMeta } from "@/lib/posts";
import BlogPageClient from "@/lib/components/BlogPageClient";

export const metadata: Metadata = {
  title: "Blog J-1 : visas, placement, budget, assurance, consulat | Exatlantik",
  description:
    "Guides concrets pour réussir ton projet J-1 : étapes (DS-7002, DS-2019), délais, budget, assurance, consulat, logement, carrière. Conseils utiles et vérifiés.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog J-1 : visas, placement, budget, assurance, consulat | Exatlantik",
    description:
      "Guides concrets pour réussir ton projet J-1 : étapes (DS-7002, DS-2019), délais, budget, assurance, consulat, logement, carrière.",
    type: "website",
    url: "/blog",
  },
};

export default function BlogIndexPage({
  searchParams,
}: {
  searchParams?: { q?: string; tag?: string };
}) {
  const posts = getAllPostsMeta(); // triés récents d'abord
  const initialQ = (searchParams?.q ?? "").toString();
  const initialTag = (searchParams?.tag ?? "").toString();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:pt-16">
      {/* HERO verre iOS */}
      <header className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/60 px-6 py-10 shadow-sm backdrop-blur-xl">
        <div className="absolute inset-0 -z-10">
          {/* doux dégradés pour la profondeur */}
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl" />
          <div className="absolute -left-24 bottom-[-60px] h-96 w-96 rounded-full bg-indigo-300/25 blur-3xl" />
          {/* léger grain */}
          <div
            className="absolute inset-0 opacity-[0.07] mix-blend-multiply"
            style={{
              backgroundImage:
                "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.9\\' numOctaves=\\'2\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\' opacity=\\'0.35\\'/></svg>')",
              backgroundSize: "220px 220px",
            }}
          />
        </div>

        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200/70 bg-white/70 px-3 py-1 text-xs font-medium text-teal-700">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#0FB5AE] to-cyan-500" />
            Ressources pratiques J-1
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900">
            Le blog J-1 : guides &amp; retours d’expérience
          </h1>
          <p className="mt-3 text-slate-700">
            Étapes (DS-7002, DS-2019), délais réalistes, budget, assurance conforme, entretien
            consulaire, logement et carrière. Des articles clairs, à jour, pour t’aider à éviter les pièges.
          </p>
        </div>
      </header>

      {/* Corps de page (une + recherche + masonry) */}
      <div className="mt-8">
        <BlogPageClient allPosts={posts} initialQ={initialQ} initialTag={initialTag} />
      </div>

      {/* JSON-LD : Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Exatlantik — Blog J-1",
            description:
              "Guides concrets pour le visa J-1 : DS-7002, DS-2019, délais, budget, assurance, consulat, logement, carrière.",
            url: "https://www.exatlantik.com/blog",
            inLanguage: "fr-FR",
          }),
        }}
      />
      {/* JSON-LD : ItemList des articles */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: posts.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://www.exatlantik.com/blog/${p.slug}`,
              name: p.title,
            })),
          }),
        }}
      />
    </section>
  );
}
