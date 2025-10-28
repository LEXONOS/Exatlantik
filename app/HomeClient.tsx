// FILE: app/(site)/HomeClient.tsx
"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  AnimatePresence,
  useInView,
} from "framer-motion";

/**
 * HOME — Exatlantik
 * - Hero carrousel + slogan + CTA (Tally)
 * - Halo souris global (fix) + auroras + grain
 * - Trust/Key facts
 * - Programmes (Intern/Trainee/SWT) avec tilt & micro-interactions
 * - Blog preview (3 cartes) + Voir tout (/blog)
 * - Timeline moderne + lien /process
 * - Pourquoi nous (valeur → sans parler de la concurrence)
 * - CTA final + Sticky CTA mobile
 *
 * Liens Tally :
 * - Préinscription (overlay + fallback href) : https://tally.so/r/wkL1Vd  (id: wkL1Vd)
 * - Être recontacté : https://tally.so/r/3XXYMd                    (id: 3XXYMd)
 */

export default function HomeClient() {
  return (
    <div className="relative overflow-hidden text-slate-900">
      <GlobalPointerHalo />
      <ScrollProgressBar />

      <HeroWithCarousel />

      <QuickNav />

      <SectionDivider />
      <RevealSection>
        <TrustBar />
      </RevealSection>

      <SectionDivider />
      <RevealSection>
        <Programs />
      </RevealSection>

      <SectionDivider />
      <RevealSection>
        <BlogPreview />
      </RevealSection>

      <SectionDivider />
      <RevealSection>
        <Timeline />
      </RevealSection>

      <SectionDivider />
      <RevealSection>
        <WhyUs />
      </RevealSection>

      <SectionDivider />
      <RevealSection>
        <FinalCTA />
      </RevealSection>

      <StickyMobileCTA />
    </div>
  );
}

/* ============================= HEADER PILLS ============================= */

function HeaderPills() {
  const items = [
    { href: "/tarifs#paiement", label: "Paiement" },
    { href: "/tarifs#comparatif", label: "Comparatif" },
    { href: "/tarifs#simulateur", label: "Simulateur" },
    { href: "/tarifs#justificatifs", label: "Justificatifs" },
    { href: "/tarifs#valeurs", label: "Valeurs" },
    { href: "/tarifs#faq", label: "FAQ" },
  ];
  return (
    <nav
      aria-label="Accès rapide tarifs"
      className="sticky top-0 z-[55] backdrop-blur supports-[backdrop-filter]:bg-white/55 bg-white/80 border-b border-white/60 hidden md:block"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <ul className="flex flex-wrap gap-2 py-2">
          {items.map((i) => (
            <li key={i.href}>
              <Link
                href={i.href}
                className="inline-flex items-center gap-2 rounded-full border border-teal-200/70 bg-white/70 px-3 py-1.5 text-sm text-teal-700 hover:bg-teal-50 transition"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#0FB5AE] to-cyan-500" />
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* =========================== HERO WITH CAROUSEL =========================== */

function HeroWithCarousel() {
  const photos = [
    {
      src: "https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg",
      alt: "Étudiants à New York",
    },
    {
      src: "https://images.pexels.com/photos/2240293/pexels-photo-2240293.jpeg",
      alt: "Love USA",
    },
    {
      src: "https://images.pexels.com/photos/844167/pexels-photo-844167.jpeg",
      alt: "Nevada",
    },
    {
      src: "https://images.pexels.com/photos/2749090/pexels-photo-2749090.jpeg",
      alt: "Vie aux USA - Inspiration",
    },
  ];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i === 0 ? photos.length - 1 : i - 1));
  };
  const next = () => {
    setDirection(1);
    setIndex((i) => (i === photos.length - 1 ? 0 : i + 1));
  };

  useEffect(() => {
    const id = setInterval(next, 3800);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      role="banner"
      aria-labelledby="hero-title"
      className="relative h-[88vh] w-full overflow-hidden"
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          initial={{ x: direction === 1 ? "100%" : "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: direction === 1 ? "-100%" : "100%" }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${photos[index].src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "saturate(1.05) contrast(1.03)",
          }}
        />
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-transparent" />
      <div className="absolute inset-0 [mask-image:radial-gradient(90%_70%_at_15%_50%,black,transparent)] bg-[radial-gradient(600px_240px_at_18%_55%,rgba(59,130,246,.14),transparent),radial-gradient(500px_220px_at_35%_35%,rgba(6,182,212,.16),transparent)]" />

      {/* Texte */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20 text-white max-w-3xl">
        <span className="inline-block bg-white/15 border border-white/25 text-xs md:text-sm font-medium px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
          Éligibilité sous 24–72h • Dossier sponsor sécurisé
        </span>

        <h1 id="hero-title" className="text-4xl md:text-6xl font-extrabold leading-tight">
          De l’autre côté de l’Atlantique, <span className="text-cyan-300">facilement</span>.
        </h1>

        <p className="mt-4 text-lg text-gray-200">
          Accompagnateur projet J-1 : on structure ton plan (<strong>DS-7002</strong>), on valide le
          dossier (<strong>DS-2019</strong>), on te prépare au consulat. Tu sais <em>quoi</em> faire,
          <em> quand</em>, et <em> combien</em>.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-wrap gap-4 relative">
          <span className="absolute -inset-3 rounded-[36px] bg-gradient-to-r from-cyan-400/20 via-sky-400/15 to-indigo-400/20 blur-2xl pointer-events-none" />

          <Magnetic>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="group relative overflow-hidden rounded-2xl px-8 py-4 text-lg font-extrabold text-white shadow-2xl"
              style={{ background: "linear-gradient(135deg,#0FB5AE,#06b6d4,#3b82f6)" }}
              data-tally-open="wkL1Vd"
              data-tally-overlay="1"
            >
              <span className="relative z-10">Préinscription (25 places)</span>
              <div className="relative z-10 text-[11px] opacity-85">Gratuit • Sans engagement</div>
              <span className="absolute inset-0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-[1200ms] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)]" />
            </motion.button>
          </Magnetic>

          <button
            className="relative rounded-2xl px-6 py-4 text-lg font-semibold text-white/90 border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition group"
            data-tally-open="3XXYMd"
            data-tally-overlay="1"
          >
            Être recontacté
            <span className="absolute left-6 bottom-2 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-sky-500 transition-all duration-500 group-hover:w-[calc(100%-3rem)]" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center gap-2">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-2.5 w-2.5 rounded-full border border-white/30 backdrop-blur-sm transition ${
                i === index ? "bg-white" : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Aller à la slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Flèches */}
      <CarouselArrow onClick={prev} position="left" label="Slide précédente">
        ←
      </CarouselArrow>
      <CarouselArrow onClick={next} position="right" label="Slide suivante">
        →
      </CarouselArrow>
    </header>
  );
}

function CarouselArrow({
  onClick,
  position,
  label,
  children,
}: {
  onClick: () => void;
  position: "left" | "right";
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`absolute ${position}-4 top-1/2 -translate-y-1/2 bg-white/20 border border-white/30 text-white backdrop-blur-sm rounded-full p-3 shadow-lg z-20 hover:bg-white/30 hover:scale-105 transition-all duration-300`}
      aria-label={label}
    >
      {children}
    </button>
  );
}

/* =========================================================================
   QUICK NAV — Ancres rapides
   ========================================================================= */

function QuickNav() {
  const items = [
    { href: "#programmes", label: "Programmes" },
    { href: "#blog", label: "Blog" },
    { href: "#timeline", label: "Parcours" },
    { href: "#pourquoi-nous", label: "Pourquoi nous" },
    { href: "/tarifs", label: "Tarifs" },
    { href: "https://tally.so/r/3XXYMd", label: "Être recontacté" },
  ];
  return (
    <nav aria-label="Navigation rapide" className="relative z-10 mx-auto max-w-6xl px-4 -mt-6">
      <div className="overflow-auto rounded-2xl border border-white/40 bg-white/60 backdrop-blur p-2 shadow-sm">
        <ul className="flex items-center gap-2 whitespace-nowrap">
          {items.map((it) => (
            <li key={it.label}>
              <a
                href={it.href}
                className="inline-block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white"
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* =========================================================================
   TRUST / RÉASSURANCE
   ========================================================================= */

function TrustBar() {
  const items = [
    {
      title: "Transparence des coûts",
      desc:
        "Honoraires séparés des frais officiels (SEVIS, MRV, assurance, sponsor).",
      icon: <IconShield />,
    },
    {
      title: "Cadence maîtrisée",
      desc:
        "Étapes balisées : DS-7002, DS-2019, SEVIS/MRV/DS-160, entretien consulat.",
      icon: <IconDoc />,
    },
    {
      title: "Support réactif",
      desc: "Réponse sous 48–72h • Guidance claire • Modèles & checklists.",
      icon: <IconSearch />,
    },
  ];

  return (
    <section className="relative z-10 container mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((it, i) => (
          <motion.article
            key={it.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group relative rounded-2xl border border-white/50 bg-white/70 p-5 backdrop-blur shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#0FB5AE] to-cyan-500 text-white shadow">
                {it.icon}
              </div>
              <h3 className="font-semibold text-slate-900">{it.title}</h3>
            </div>
            <p className="mt-2 text-sm text-slate-700">{it.desc}</p>
            <span className="pointer-events-none absolute left-5 right-5 bottom-3 h-px bg-gradient-to-r from-transparent via-teal-400/70 to-transparent scale-x-0 group-hover:scale-x-100 origin-center transition-transform" />
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   PROGRAMMES
   ========================================================================= */

function Programs() {
  return (
    <section id="programmes" className="relative z-10 py-22">
      <DecorBlobs />
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
          Choisis ton programme
        </h2>
        <p className="mt-3 text-lg text-slate-700">
          <span className="font-semibold text-teal-700">Intern</span>,{" "}
          <span className="font-semibold text-teal-700">Trainee</span> ou{" "}
          <span className="font-semibold text-teal-700">Summer Work Travel</span>
          — on t’aide à calibrer la durée, la ville et le sponsor.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <TiltCard key={p.title} maxTilt={8}>
              <Link
                href={p.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/50 bg-white/80 p-7 shadow-xl backdrop-blur transition"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-3xl ring-2 ring-cyan-300/40 shadow-[0_0_42px_12px_rgba(56,189,248,0.45)] opacity-0 group-hover:opacity-100 transition duration-700 animate-[breathe_6s_ease-in-out_infinite]"
                />
                <div className="relative z-10 flex flex-1 flex-col">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[#0FB5AE] to-cyan-500 text-white shadow">
                      {p.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                  </div>
                  <ul className="mt-5 flex-1 space-y-2 text-left text-sm text-slate-800">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#0FB5AE] to-cyan-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 line-clamp-3 text-left text-sm text-slate-700 transition-all group-hover:line-clamp-none">
                    {p.hoverText}
                  </p>
                  <div className="mt-5 flex items-center justify-end text-sm font-semibold text-teal-700">
                    <span className="opacity-80 transition group-hover:opacity-100">
                      En savoir plus →
                    </span>
                  </div>
                </div>
              </Link>
            </TiltCard>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes breathe {
          0%,100% { filter: drop-shadow(0 0 14px rgba(56,189,248,0.45)); }
          50%     { filter: drop-shadow(0 0 28px rgba(56,189,248,0.65)); }
        }
      `}</style>
    </section>
  );
}

function DecorBlobs() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-[#0FB5AE]/30 via-cyan-400/25 to-blue-500/30 blur-[120px]" />
      <div className="absolute bottom-[-160px] right-[-140px] h-[520px] w-[520px] rounded-full bg-gradient-to-tl from-blue-400/25 via-indigo-400/20 to-cyan-300/25 blur-[120px]" />
    </div>
  );
}

/* =========================================================================
   BLOG PREVIEW — 3 cartes
   ========================================================================= */

function BlogPreview() {
  return (
    <section id="blog" className="relative z-10 py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Derniers articles</h2>
            <p className="mt-2 text-slate-600">
              Guides, actus visas J-1 et retours d’expérience.
            </p>
          </div>
          <Link
            href="/blog"
            className="rounded-xl border border-teal-300/70 bg-white px-4 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-50"
          >
            Voir tous les articles
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group overflow-hidden rounded-2xl border border-white/50 bg-white/70 backdrop-blur shadow-sm"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={p.cover}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="rounded-full bg-teal-50 px-2 py-0.5 font-medium text-teal-700">
                    {p.tag}
                  </span>
                  <span>•</span>
                  <time dateTime={p.datetime}>{p.date}</time>
                </div>
                <h3 className="mt-2 font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-700">
                  {p.excerpt}
                </p>
                <Link
                  href={`/blog/${p.slug}`}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:underline"
                >
                  Lire →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   TIMELINE — Frise animée + lien process
   ========================================================================= */

function Timeline() {
  const steps = timelineSteps;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <SectionShell
      id="timeline"
      title="Combien de temps ça prend ?"
      subtitle="Un aperçu réaliste (peut varier selon sponsor / saison)."
    >
      <div className="relative mt-12" ref={ref}>
        <motion.div
          className="absolute top-8 left-0 h-1 rounded bg-gradient-to-r from-[#0FB5AE] via-cyan-400 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: inView ? "100%" : 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
        <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group text-center md:text-left"
            >
              <div className="mx-auto md:mx-0 inline-flex w-auto items-center gap-2 rounded-full border border-teal-200/70 bg-white/80 px-3 py-2 text-xs font-semibold text-teal-700 shadow-sm backdrop-blur">
                <span className="inline-grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[#0FB5AE] to-cyan-500 text-white shadow">
                  {s.badge}
                </span>
                {s.step}
              </div>

              <div className="mt-3 rounded-2xl border border-white/60 bg-white/75 p-4 shadow-sm backdrop-blur transition group-hover:shadow-md">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#0FB5AE] to-cyan-500 text-white">
                    {s.icon}
                  </span>
                  {s.title}
                </div>
                <p className="mt-2 text-xs text-slate-600">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <AnimatedPrimaryLink href="/process" label="Voir le parcours détaillé" />
        </div>
      </div>
    </SectionShell>
  );
}

/* =========================================================================
   POURQUOI NOUS — Valeur (subtile)
   ========================================================================= */

function WhyUs() {
  const cards = [
    {
      title: "Clarté & pédagogie",
      desc:
        "On traduit les exigences J-1 en étapes concrètes et actionnables, sans jargon.",
    },
    {
      title: "Orchestration complète",
      desc:
        "Coordination entreprise/sponsor, DS-7002 & DS-2019, formulaires SEVIS/MRV/DS-160, préparation entretien.",
    },
    {
      title: "Optimisation du budget",
      desc:
        "Choix sponsor/durée/ville pour maîtriser les frais officiels et les délais, sans sacrifier la qualité.",
    },
    {
      title: "Suivi réactif",
      desc:
        "Réponse sous 48–72h, checklists et modèles. Tu sais quoi faire, quand et pourquoi.",
    },
  ];
  return (
    <SectionShell
      id="pourquoi-nous"
      title="Notre approche"
      subtitle="Pas de promesses vagues : un plan clair, une exécution soignée."
    >
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {cards.map((c) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/60 bg-white/75 p-6 shadow-sm backdrop-blur"
          >
            <h3 className="text-slate-900 font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm text-slate-700">{c.desc}</p>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}

/* =========================================================================
   CTA FINAL
   ========================================================================= */

function FinalCTA() {
  return (
    <section className="relative z-10 py-16 text-center">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold">
          Prêt à lancer ton projet J-1 ?
        </h2>
        <p className="mt-2 text-slate-600">
          Diagnostic rapide, étapes claires — tu avances sans surprise.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-xl bg-gradient-to-r from-[#0FB5AE] to-cyan-500 px-7 py-3 font-semibold text-white shadow-lg hover:shadow-cyan-400/40"
            href="https://tally.so/r/wkL1Vd"
            data-tally-open="wkL1Vd"
            data-tally-overlay="1"
          >
            Pré-inscription
          </motion.a>
          <HoverLinkButton
            href="https://tally.so/r/3XXYMd"
            label="Être recontacté"
          />
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Aucune carte requise • 25 places par batch
        </p>
      </div>
    </section>
  );
}

/* =========================================================================
   STICKY MOBILE CTA
   ========================================================================= */

function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 block md:hidden">
      <div className="mx-3 mb-3 rounded-2xl border border-teal-300/50 bg-white/90 p-2 shadow-lg backdrop-blur">
        <div className="flex items-center justify-between gap-2">
          <a
            href="https://tally.so/r/wkL1Vd"
            data-tally-open="wkL1Vd"
            data-tally-overlay="1"
            className="flex-1 rounded-xl bg-gradient-to-r from-[#0FB5AE] to-cyan-500 px-4 py-2 text-center text-sm font-semibold text-white"
          >
            Pré-inscription
          </a>
          <a
            href="https://tally.so/r/3XXYMd"
            data-tally-open="3XXYMd"
            data-tally-overlay="1"
            className="flex-1 rounded-xl border border-teal-300 px-4 py-2 text-center text-sm font-semibold text-teal-700"
          >
            Être recontacté
          </a>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   HELPERS / UI
   ========================================================================= */

function SectionShell({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative z-10 py-16">
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
        {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

function SectionDivider() {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-slate-300/70 to-transparent" />
    </div>
  );
}

function HoverLinkButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-teal-300/70 bg-white/70 px-7 py-3 font-semibold text-teal-700 backdrop-blur transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-200/70"
    >
      <span className="relative z-10">{label}</span>
      <span className="absolute inset-0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 bg-[linear-gradient(90deg,transparent,rgba(16,185,129,0.12),transparent)]" />
      <span className="absolute -inset-8 rounded-[28px] bg-[#0FB5AE]/10 opacity-0 group-hover:opacity-100 blur-2xl transition" />
    </Link>
  );
}

function AnimatedPrimaryLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group relative rounded-2xl border border-teal-300/70 bg-white/70 px-7 py-4 font-semibold text-teal-700 backdrop-blur transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-200/70 overflow-hidden"
    >
      <span className="relative z-10">{label}</span>
      <span className="absolute inset-0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 bg-[linear-gradient(90deg,transparent,rgba(16,185,129,0.12),transparent)]" />
      <span className="absolute -inset-8 rounded-[28px] bg-[#0FB5AE]/10 opacity-0 group-hover:opacity-100 blur-2xl transition" />
    </Link>
  );
}

function RevealSection({ children }: { children: ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2, once: false }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

function TiltCard({
  children,
  maxTilt = 8,
}: {
  children: ReactNode;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -2 * maxTilt;
    const ry = (px - 0.5) * 2 * maxTilt;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  }
  function onLeave() {
    const el = ref.current;
    if (el) el.style.transform = "";
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="will-change-transform"
    >
      {children}
    </div>
  );
}

function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  function move(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${mx * strength}px, ${my * strength}px)`;
  }
  function leave() {
    const el = ref.current;
    if (el) el.style.transform = "";
  }
  return (
    <div
      className={className}
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.2,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 h-1 w-full origin-left bg-gradient-to-r from-[#0FB5AE] via-cyan-400 to-blue-500 z-[60] pointer-events-none"
    />
  );
}

/* =========================================================================
   GLOBAL BACKGROUND — Halo souris global (fix)
   ========================================================================= */

function GlobalPointerHalo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const x = e.clientX; // viewport-based → ok avec position:fixed
      const y = e.clientY;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={
        {
          ["--mx" as any]: "55%",
          ["--my" as any]: "25%",
        } as CSSProperties
      }
    >
      {/* Halo curseur dynamique */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 320px at var(--mx) var(--my), rgba(14,165,233,0.22), transparent 60%)",
        }}
      />
      {/* Aurora blobs */}
      <div className="absolute -top-36 -left-28 h-[560px] w-[560px] rounded-full bg-cyan-400/20 blur-[120px] animate-pulse-slow" />
      <div className="absolute top-24 right-[-140px] h-[520px] w-[520px] rounded-full bg-blue-500/20 blur-[110px] animate-pulse-slower" />
      <div className="absolute bottom-[-220px] left-1/2 -translate-x-1/2 h-[680px] w-[680px] rounded-full bg-indigo-500/16 blur-[130px] animate-pulse-slowest" />
      {/* Beams + grain */}
      <div className="absolute inset-0 opacity-25 [background:repeating-linear-gradient(120deg,rgba(255,255,255,0.10)_0px,rgba(255,255,255,0.10)_1px,transparent_2px,transparent_10px)] [mask-image:radial-gradient(65%_55%_at_50%_0%,black,transparent)]" />
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-multiply"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.85\\' numOctaves=\\'2\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\' opacity=\\'0.35\\'/></svg>')",
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

/* =========================================================================
   DATA
   ========================================================================= */

const programs = [
  {
    href: "/programmes/intern",
    title: "J-1 Intern",
    bullets: [
      "Étudiants / jeunes diplômés (≤ 12 mois)",
      "Stage qualifié jusqu’à 12 mois",
      "Plan de formation DS-7002",
    ],
    hoverText:
      "Valorise ton cursus et développe des compétences concrètes aux USA.",
    icon: <IconCap />,
  },
  {
    href: "/programmes/trainee",
    title: "J-1 Trainee",
    bullets: [
      "Diplômés + ≥ 1 an d’expérience",
      "Jusqu’à 18 mois",
      "Plan de formation DS-7002",
    ],
    hoverText: "Monte en compétences avec un mentor dans ton domaine.",
    icon: <IconBriefcase />,
  },
  {
    href: "/programmes/swt",
    title: "Summer Work Travel",
    bullets: [
      "Étudiants en cours d’études",
      "Job d’été 2–4 mois",
      "Secteurs saisonniers",
    ],
    hoverText:
      "Travaille l’été, découvre les USA et enrichis ton CV (Early Bird).",
    icon: <IconSun />,
  },
];

const posts = [
  {
    slug: "visa-j1-guide",
    title: "Visa J-1 : guide complet 2025",
    excerpt:
      "Conditions, délais, frais officiels et conseils pratiques pour ton dossier J-1.",
    cover:
      "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=1600&auto=format&fit=crop",
    tag: "Guide",
    date: "12 janv. 2025",
    datetime: "2025-01-12",
  },
  {
    slug: "temoignage-camille",
    title: "Témoignage : Camille, 6 mois à New York",
    excerpt:
      "Comment elle a trouvé son stage, préparé le consulat et vécu l’aventure.",
    cover:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
    tag: "Témoignage",
    date: "3 févr. 2025",
    datetime: "2025-02-03",
  },
  {
    slug: "swt-early-bird",
    title: "Summer Work Travel 2025 : offre Early Bird",
    excerpt:
      "Réduction spéciale si tu t’inscris avant janvier pour ton job d’été aux USA.",
    cover:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1600&auto=format&fit=crop",
    tag: "SWT",
    date: "20 févr. 2025",
    datetime: "2025-02-20",
  },
];

const timelineSteps = [
  {
    badge: "1",
    step: "J+1",
    title: "Éligibilité confirmée",
    desc: "Réponse rapide après ton formulaire.",
    icon: <IconSearch />,
  },
  {
    badge: "2",
    step: "1–2 sem.",
    title: "Matching sponsor / entreprise",
    desc: "Recherche ou validation de ton entreprise d’accueil.",
    icon: <IconBriefcase />,
  },
  {
    badge: "3",
    step: "3–6 sem.",
    title: "Dossier complet",
    desc: "DS-2019, SEVIS, MRV, DS-160 — tout est prêt.",
    icon: <IconDoc />,
  },
  {
    badge: "4",
    step: "6–8 sem.",
    title: "Entretien consulat",
    desc: "Préparation ciblée + passage au consulat.",
    icon: <IconShield />,
  },
  {
    badge: "5",
    step: "2–3 mois",
    title: "Départ USA ✈️",
    desc: "Passeport visé, billet en main, valise prête.",
    icon: <IconPlane />,
  },
];

/* =========================================================================
   ICONS
   ========================================================================= */

function IconCap() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 9l9-4 9 4-9 4-9-4z" stroke="currentColor" strokeWidth="2" />
      <path
        d="M5 12v4c2 1.5 5 2.5 7 2.5s5-1 7-2.5v-4"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
function IconBriefcase() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="7"
        width="18"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function IconSun() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path
        d="M20 20l-3.5-3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconDoc() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="6"
        y="3"
        width="12"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M9 8h6M9 12h6M9 16h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l7 3v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-3z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconPlane() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10 21l2-6 7-5-11 3-5-2 6 5-2 5 3-2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
