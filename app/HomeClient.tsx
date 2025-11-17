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
 * - Quick nav
 * - Bandeau défilant cliquable (points clés J-1)
 * - Trust/Key facts
 * - Programmes (Intern/Trainee/SWT/Camp) avec tilt & micro-interactions
 * - Blog preview (3 cartes) + Voir tout (/blog)
 * - Timeline moderne + lien /process
 * - Bloc Tarifs & approche (teaser vers /tarifs)
 * - CTA final + Sticky CTA mobile
 */

export default function HomeClient() {
  return (
    <div className="relative overflow-hidden text-slate-900">
      <GlobalPointerHalo />
      <ScrollProgressBar />

      <HeroWithCarousel />

      <QuickNav />

      <ValueMarquee />

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
        <WhyUsPricingTeaser />
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
      className="sticky top-0 z-[55] hidden border-b border-white/60 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/55 md:block"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <ul className="flex flex-wrap gap-2 py-2">
          {items.map((i) => (
            <li key={i.href}>
              <Link
                href={i.href}
                className="inline-flex items-center gap-2 rounded-full border border-teal-200/70 bg-white/70 px-3 py-1.5 text-sm text-teal-700 transition hover:bg-teal-50"
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
      <div className="absolute inset-0 bg-[radial-gradient(600px_240px_at_18%_55%,rgba(59,130,246,.14),transparent),radial-gradient(500px_220px_at_35%_35%,rgba(6,182,212,.16),transparent)] [mask-image:radial-gradient(90%_70%_at_15%_50%,black,transparent)]" />

      {/* Texte */}
      <div className="relative z-10 flex h-full max-w-3xl flex-col justify-center px-6 text-white md:px-20">
        <span className="mb-4 inline-block rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm md:text-sm">
          Éligibilité sous 24–72h • Dossier sponsor sécurisé
        </span>

        <h1
          id="hero-title"
          className="text-4xl font-extrabold leading-tight md:text-6xl"
        >
          De l’autre côté de l’Atlantique,{" "}
          <span className="text-cyan-300">facilement</span>.
        </h1>

        <p className="mt-4 text-lg text-gray-200">
          Accompagnateur projet J-1 : on structure ton plan (
          <strong>DS-7002</strong>), on valide le dossier (
          <strong>DS-2019</strong>), on te prépare au consulat. Tu sais{" "}
          <em>quoi</em> faire, <em>quand</em>, et <em>combien</em>.
        </p>

        {/* CTA */}
        <div className="relative mt-8 flex flex-wrap gap-4">
          <span className="pointer-events-none absolute -inset-3 rounded-[36px] bg-gradient-to-r from-cyan-400/20 via-sky-400/15 to-indigo-400/20 blur-2xl" />

          <Magnetic>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="group relative overflow-hidden rounded-2xl px-8 py-4 text-lg font-extrabold text-white shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg,#0FB5AE,#06b6d4,#3b82f6)",
              }}
              data-tally-open="wkL1Vd"
              data-tally-overlay="1"
            >
              <span className="relative z-10">
                Préinscription (25 places)
              </span>
              <div className="relative z-10 text-[11px] opacity-85">
                Gratuit • Sans engagement
              </div>
              <span className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)] transition-transform duration-[1200ms] group-hover:translate-x-[120%]" />
            </motion.button>
          </Magnetic>

          <button
            className="group relative rounded-2xl border border-white/30 bg-white/10 px-6 py-4 text-lg font-semibold text-white/90 backdrop-blur-sm transition hover:bg-white/20"
            data-tally-open="3XXYMd"
            data-tally-overlay="1"
          >
            Être recontacté
            <span className="absolute bottom-2 left-6 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-sky-500 transition-all duration-500 group-hover:w-[calc(100%-3rem)]" />
          </button>
        </div>

        {/* Dots + scroll indicator */}
        <div className="mt-8 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-2.5 w-2.5 rounded-full border border-white/30 backdrop-blur-sm transition ${
                  i === index
                    ? "bg-white"
                    : "bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Aller à la slide ${i + 1}`}
              />
            ))}
          </div>

          <motion.a
            href="#programmes"
            className="hidden items-center gap-2 text-xs text-white/70 hover:text-white md:inline-flex"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <span className="h-px w-5 bg-white/40" />
            <span>Faire défiler pour découvrir les programmes</span>
            <span className="inline-block text-sm animate-bounce">↓</span>
          </motion.a>
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
      className={`absolute ${position}-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-white/20 p-3 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/30`}
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
    { href: "#pourquoi-nous", label: "Tarifs & approche" },
    { href: "/tarifs", label: "Page Tarifs complète" },
    { href: "https://tally.so/r/3XXYMd", label: "Être recontacté" },
  ];
  return (
    <nav
      aria-label="Navigation rapide"
      className="relative z-10 mx-auto -mt-6 max-w-6xl px-4"
    >
      <div className="overflow-auto rounded-2xl border border-white/40 bg-white/60 p-2 shadow-sm backdrop-blur">
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
   BANDEAU DÉFILANT — Points clés J-1 (cliquables)
   ========================================================================= */

function ValueMarquee() {
  const items: { label: string; href: string }[] = [
    { label: "Visa J-1 Intern", href: "/programmes/intern" },
    { label: "Visa J-1 Trainee", href: "/programmes/trainee" },
    { label: "Summer Work Travel", href: "/programmes/swt" },
    { label: "Camp Counselor (Summer Camp)", href: "/programmes/camp" },
    { label: "Plan de formation DS-7002", href: "/process" },
    { label: "DS-2019 avec sponsor agréé", href: "/process" },
    { label: "Consulat & entretien J-1", href: "/process" },
    { label: "Frais officiels & budget", href: "/tarifs" },
    { label: "Accompagnement entreprises", href: "/entreprises" },
    {
      label: "Parler de ton projet J-1",
      href: "https://tally.so/r/3XXYMd",
    },
  ];

  const duplicated = [...items, ...items];

  return (
    <section
      aria-label="Points clés Exatlantik"
      className="relative z-20 mt-6 border-y border-white/60 bg-white/50 backdrop-blur-sm"
    >
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white/90 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white/90 to-transparent" />

      <div className="relative mx-auto max-w-7xl overflow-hidden px-4">
        <motion.div
          className="flex gap-4 py-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          {duplicated.map((item, index) => (
            <a
              key={`${item.label}-${index}`}
              href={item.href}
              className="flex shrink-0 items-center gap-2 rounded-full border border-teal-200/70 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:border-teal-300 hover:bg-teal-50"
              {...(item.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#0FB5AE] to-cyan-500" />
              <span>{item.label}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
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
            className="group relative rounded-2xl border border-white/50 bg-white/70 p-5 shadow-sm backdrop-blur"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#0FB5AE] to-cyan-500 text-white shadow">
                {it.icon}
              </div>
              <h3 className="font-semibold text-slate-900">{it.title}</h3>
            </div>
            <p className="mt-2 text-sm text-slate-700">{it.desc}</p>
            <span className="pointer-events-none absolute bottom-3 left-5 right-5 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-teal-400/70 to-transparent transition-transform group-hover:scale-x-100" />
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
        <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl">
          Choisis ton programme
        </h2>
        <p className="mt-3 text-lg text-slate-700">
          <span className="font-semibold text-teal-700">Intern</span>,{" "}
          <span className="font-semibold text-teal-700">Trainee</span>,{" "}
          <span className="font-semibold text-teal-700">
            Summer Work Travel
          </span>{" "}
          ou{" "}
          <span className="font-semibold text-teal-700">
            Camp Counselor (Summer Camp)
          </span>{" "}
          — on t’aide à cadrer la durée, la ville et le sponsor.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((p) => (
            <TiltCard key={p.title} maxTilt={8}>
              <Link
                href={p.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/50 bg-white/80 p-7 shadow-xl backdrop-blur transition"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-3xl opacity-0 ring-2 ring-cyan-300/40 shadow-[0_0_42px_12px_rgba(56,189,248,0.45)] transition duration-700 animate-[breathe_6s_ease-in-out_infinite] group-hover:opacity-100"
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
            <h2 className="text-3xl font-bold md:text-4xl">
              Derniers articles
            </h2>
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
              className="group overflow-hidden rounded-2xl border border-white/50 bg-white/70 shadow-sm backdrop-blur"
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
                <h3 className="mt-2 font-semibold text-slate-900">
                  {p.title}
                </h3>
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
   TIMELINE — Frise verticale + badges temps + teaser /process
   ========================================================================= */

function Timeline() {
  const steps = timelineSteps;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <SectionShell
      id="timeline"
      title="Combien de temps ça prend ?"
      subtitle="Vue réaliste du parcours J-1, de l’éligibilité jusqu’au départ (les délais peuvent varier selon sponsor et saison)."
    >
      <div ref={ref} className="relative mt-12">
        {/* Fond doux derrière la frise */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-4 -inset-y-6 rounded-[40px] bg-gradient-to-br from-cyan-50/90 via-white to-sky-50/80 shadow-[0_18px_60px_rgba(15,181,174,0.12)]"
        />

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,1.4fr)]">
          {/* Colonne timeline */}
          <div className="relative">
            {/* Ligne verticale animée (desktop) */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#0FB5AE] via-cyan-400 to-blue-500 md:block"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: inView ? 1 : 0 }}
              style={{ transformOrigin: "top" }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            />

            {/* Desktop : alternance gauche / droite */}
            <div className="hidden md:grid md:grid-cols-1 md:gap-10">
              {steps.map((step, index) => (
                <TimelineItem
                  key={step.title}
                  step={step}
                  index={index}
                  total={steps.length}
                />
              ))}
            </div>

            {/* Mobile : cartes en colonne */}
            <div className="grid gap-6 md:hidden">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="group"
                >
                  <TimelineNode badge={step.badge} step={step.step} />
                  <div className="mt-3">
                    <TimelineCard
                      title={step.title}
                      desc={step.desc}
                      icon={step.icon}
                      badge={step.badge}
                      step={step.step}
                      index={index}
                      total={steps.length}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Colonne résumé / teaser process */}
          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/90 p-6 text-left shadow-sm backdrop-blur"
          >
            <span className="pointer-events-none absolute -right-24 -top-20 h-48 w-48 rounded-full bg-cyan-100/60 blur-3xl" />
            <span className="pointer-events-none absolute -left-10 bottom-[-40px] h-40 w-40 rounded-full bg-teal-100/60 blur-3xl" />

            <h3 className="relative text-sm font-semibold uppercase tracking-wide text-teal-700">
              Délai global indicatif
            </h3>
            <p className="relative mt-1 text-sm text-slate-700">
              Dans la majorité des dossiers, compte{" "}
              <strong>environ 2 à 3 mois</strong> entre ton premier contact et
              le départ, si ton entreprise et les paiements avancent sans
              blocage.
            </p>

            <dl className="relative mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2">
                <div>
                  <dt className="text-xs font-semibold text-slate-500">
                    Première réponse
                  </dt>
                  <dd className="text-sm font-medium text-slate-900">
                    J+1 à J+3 ouvrés
                  </dd>
                </div>
                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                  Éligibilité
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2">
                <div>
                  <dt className="text-xs font-semibold text-slate-500">
                    Mise en route dossier
                  </dt>
                  <dd className="text-sm font-medium text-slate-900">
                    1–2 semaines
                  </dd>
                </div>
                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                  Matching & DS-7002
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2">
                <div>
                  <dt className="text-xs font-semibold text-slate-500">
                    Dossier complet & consulat
                  </dt>
                  <dd className="text-sm font-medium text-slate-900">
                    3–8 semaines
                  </dd>
                </div>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  DS-2019, SEVIS, MRV
                </span>
              </div>
            </dl>

            <p className="relative mt-4 text-xs text-slate-500">
              Ces délais sont indicatifs : ils dépendent du sponsor choisi, de
              la saison, de la réactivité de ton entreprise d’accueil et des
              disponibilités du consulat.
            </p>

            <div className="relative mt-5 flex flex-col gap-3">
              <AnimatedPrimaryLink
                href="/process"
                label="Voir le parcours détaillé étape par étape"
              />
              <button
                className="rounded-2xl border border-teal-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-teal-50"
                data-tally-open="3XXYMd"
                data-tally-overlay="1"
              >
                Poser une question sur les délais
              </button>
            </div>
          </motion.aside>
        </div>
      </div>
    </SectionShell>
  );
}

/* Item desktop (une ligne de la frise) */
function TimelineItem({
  step,
  index,
  total,
}: {
  step: (typeof timelineSteps)[number];
  index: number;
  total: number;
}) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative grid grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] items-center gap-6"
    >
      {/* Carte gauche */}
      <div className={isLeft ? "" : "pointer-events-none opacity-0"}>
        {isLeft && (
          <TimelineCard
            title={step.title}
            desc={step.desc}
            icon={step.icon}
            badge={step.badge}
            step={step.step}
            index={index}
            total={total}
            align="right"
          />
        )}
      </div>

      {/* Nœud central */}
      <div className="flex flex-col items-center justify-center gap-2">
        <TimelineNode badge={step.badge} step={step.step} />
      </div>

      {/* Carte droite */}
      <div className={isLeft ? "pointer-events-none opacity-0" : ""}>
        {!isLeft && (
          <TimelineCard
            title={step.title}
            desc={step.desc}
            icon={step.icon}
            badge={step.badge}
            step={step.step}
            index={index}
            total={total}
            align="left"
          />
        )}
      </div>
    </motion.div>
  );
}

/* Nœud central : double rond + badge temps juste en dessous */
function TimelineNode({ badge, step }: { badge: string; step: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.07 }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative h-9 w-9">
        <div className="absolute inset-0 rounded-full bg-white shadow-[0_0_0_1px_rgba(148,163,184,0.25),0_8px_18px_rgba(15,23,42,0.18)]" />
        <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-[#0FB5AE] to-cyan-500" />
        <div className="absolute inset-[6px] rounded-full bg-white" />
        <span className="absolute inset-0 grid place-items-center text-[11px] font-semibold text-teal-700">
          {badge}
        </span>
      </div>

      <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/95 px-2.5 py-1 text-[11px] font-medium text-teal-700 shadow-sm">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#0FB5AE] to-cyan-500" />
        {step}
      </div>
    </motion.div>
  );
}

/* Carte étape : avec badge, durée, titre, desc + phase */
function TimelineCard({
  title,
  desc,
  icon,
  badge,
  step,
  index,
  total,
  align,
}: {
  title: string;
  desc: string;
  icon: ReactNode;
  badge: string;
  step: string;
  index: number;
  total: number;
  align?: "left" | "right";
}) {
  const textAlign =
    align === "right" ? "md:text-right" : align === "left" ? "md:text-left" : "";
  const rowDirection = align === "right" ? "md:flex-row-reverse" : "";

  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={`relative overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm backdrop-blur transition group hover:border-teal-200 hover:shadow-lg ${textAlign}`}
    >
      {/* glow au survol */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-50 via-transparent to-sky-50 opacity-0 transition-opacity group-hover:opacity-100" />

      {/* Bandeau étape + durée */}
      <div
        className={`relative inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/95 px-3 py-1 text-[11px] font-semibold text-teal-700 shadow-sm ${
          align === "right" ? "md:ml-auto" : ""
        }`}
      >
        <span className="inline-grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-[#0FB5AE] to-cyan-500 text-[11px] text-white shadow">
          {badge}
        </span>
        <span>Étape {index + 1}</span>
        <span className="text-slate-400">•</span>
        <span>{step}</span>
      </div>

      {/* Titre + icône */}
      <div
        className={`relative mt-3 flex items-center gap-2 text-sm font-semibold text-slate-900 ${rowDirection}`}
      >
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#0FB5AE] to-cyan-500 text-white shadow">
          {icon}
        </span>
        <span>{title}</span>
      </div>

      <p className="relative mt-2 text-xs text-slate-600">{desc}</p>

      {/* Phase sous forme de petit mémo en bas */}
      <div className="relative mt-3 flex items-center justify-between text-[11px] text-slate-400">
        <span>On avance étape par étape, sans surprise.</span>
        <span className="font-medium text-slate-500">
          Phase {index + 1} / {total}
        </span>
      </div>
    </motion.article>
  );
}



/* =========================================================================
   BLOC TARIFS & APPROCHE — mini tableau + teaser vers /tarifs
   ========================================================================= */

/* =========================================================================
   BLOC TARIFS & APPROCHE — Teaser vers /tarifs
   ========================================================================= */

function WhyUsPricingTeaser() {
  const rows = [
    {
      label: "Accompagnement J-1 (Intern / Trainee)",
      value: "À partir de 390 €",
      note: "Tu as déjà une entreprise d’accueil",
    },
    {
      label: "Placement + accompagnement",
      value: "À partir de 590 €",
      note: "On t’aide à trouver l’entreprise + dossier complet",
    },
    {
      label: "Summer Work Travel (SWT)",
      value: "Early Bird dès 390 €",
      note: "Tarif évolutif selon la date d’inscription",
    },
  ];

  return (
    <SectionShell
      id="pourquoi-nous"
      title="Notre approche & nos tarifs, sans surprise"
      subtitle="Honoraires clairs côté Exatlantik, frais officiels séparés (SEVIS, MRV, sponsor, assurance)."
    >
      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
        {/* Colonne texte / valeur ajoutée */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="space-y-4 text-left"
        >
          <p className="text-sm text-slate-700">
            On ne vend pas un “visa magique” : on orchestre{" "}
            <strong>tout le parcours J-1</strong> avec toi et ton entreprise —
            du plan de formation <strong>DS-7002</strong> jusqu’à{" "}
            <strong>l’entretien au consulat</strong>.
          </p>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#0FB5AE] to-cyan-500" />
              <span>
                <strong>Cadrage</strong> : on valide ton éligibilité, la durée,
                la ville et le type de sponsor adapté.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#0FB5AE] to-cyan-500" />
              <span>
                <strong>Montage & conformité</strong> : DS-2019, SEVIS, MRV,
                DS-160, lettres, attestations… on t’évite les erreurs qui font
                perdre des semaines.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#0FB5AE] to-cyan-500" />
              <span>
                <strong>Préparation consulat</strong> : questions possibles,
                angles de réponse, check de ton dossier avant le rendez-vous.
              </span>
            </li>
          </ul>

          <p className="text-xs text-slate-500">
            Les <strong>frais officiels</strong> (SEVIS, MRV, sponsor,
            assurance) représentent en général{" "}
            <strong>~1 500 à 3 000 $</strong> selon la durée et le programme.
            Ils sont réglés directement aux organismes tiers, jamais à
            Exatlantik.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/tarifs"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl border border-teal-300/70 bg-white/80 px-6 py-3 text-sm font-semibold text-teal-700 backdrop-blur transition hover:border-teal-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-200/70"
            >
              <span className="relative z-10">Voir les tarifs détaillés</span>
              <span className="relative z-10 text-lg group-hover:translate-x-0.5 transition">
                →
              </span>
              <span className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-[linear-gradient(90deg,transparent,rgba(16,185,129,0.16),transparent)] transition-transform duration-700 group-hover:translate-x-[120%]" />
            </Link>

            <button
              className="rounded-2xl border border-teal-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-teal-50"
              data-tally-open="3XXYMd"
              data-tally-overlay="1"
            >
              Poser une question sur les coûts
            </button>
          </div>
        </motion.div>

        {/* Colonne tableau tarifs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-5 text-left shadow-sm backdrop-blur"
        >
          <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-100/50 blur-3xl" />
          <h3 className="relative text-sm font-semibold uppercase tracking-wide text-teal-700">
            Aperçu des honoraires Exatlantik
          </h3>
          <p className="relative mt-1 text-xs text-slate-500">
            Exemple de niveaux de prix — le détail complet est sur la page
            Tarifs.
          </p>

          <div className="relative mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white/80 text-sm">
            {rows.map((r) => (
              <div
                key={r.label}
                className="group flex flex-col gap-1 px-4 py-3 transition hover:bg-teal-50/60"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-slate-900">
                    {r.label}
                  </span>
                  <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 shadow-sm">
                    {r.value}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">{r.note}</span>
              </div>
            ))}
          </div>

          <div className="relative mt-4 rounded-xl border border-amber-100 bg-amber-50/70 px-3 py-3 text-xs text-amber-900">
            <div className="font-semibold text-[11px] uppercase tracking-wide">
              Mémo budget global
            </div>
            <p className="mt-1">
              <strong>Honoraires Exatlantik</strong> (ci-dessus) +{" "}
              <strong>frais officiels</strong> (SEVIS, MRV, sponsor, assurance,
              éventuels envois DHL / traductions). Le détail chiffré est
              présenté sur la page Tarifs.
            </p>
          </div>
        </motion.div>
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
        <h2 className="text-2xl font-bold md:text-3xl">
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
        <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
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
      <span className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(90deg,transparent,rgba(16,185,129,0.12),transparent)] transition-transform duration-700 group-hover:translate-x-[120%]" />
      <span className="absolute -inset-8 rounded-[28px] bg-[#0FB5AE]/10 opacity-0 blur-2xl transition group-hover:opacity-100" />
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
      className="group relative overflow-hidden rounded-2xl border border-teal-300/70 bg-white/70 px-7 py-4 font-semibold text-teal-700 backdrop-blur transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-200/70"
    >
      <span className="relative z-10">{label}</span>
      <span className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(90deg,transparent,rgba(16,185,129,0.12),transparent)] transition-transform duration-700 group-hover:translate-x-[120%]" />
      <span className="absolute -inset-8 rounded-[28px] bg-[#0FB5AE]/10 opacity-0 blur-2xl transition group-hover:opacity-100" />
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
      className="pointer-events-none fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-[#0FB5AE] via-cyan-400 to-blue-500"
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
      const x = e.clientX;
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
      <div className="animate-pulse-slow absolute -top-36 -left-28 h-[560px] w-[560px] rounded-full bg-cyan-400/20 blur-[120px]" />
      <div className="animate-pulse-slower absolute top-24 right-[-140px] h-[520px] w-[520px] rounded-full bg-blue-500/20 blur-[110px]" />
      <div className="animate-pulse-slowest absolute bottom-[-220px] left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-indigo-500/16 blur-[130px]" />
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
  {
    href: "/programmes/camp",
    title: "Camp Counselor",
    bullets: [
      "Étudiants & profils pédagogiques",
      "8–12 semaines en summer camp",
      "Vie de camp, collectif international",
    ],
    hoverText:
      "Anime un summer camp, progresse en anglais et en leadership dans un cadre encadré.",
    icon: <IconCamp />,
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
function IconCamp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 19l8-14 8 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 19h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 11l-3 5h6l-3-5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
