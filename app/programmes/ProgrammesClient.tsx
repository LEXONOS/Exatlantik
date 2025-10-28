// FILE: app/programmes/ProgrammesClient.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

/* ================= Brand ================= */
const brand = {
  teal: "#0FB5AE",
  navy: "#0C3836",
  indigo: "#4F46E5",
};

const pageBg =
  "bg-[radial-gradient(80%_60%_at_20%_0%,#DDF7F3_0%,#E9F2FF_45%,#F7FAFF_100%)]";

/* ================= Décors globaux ================= */
function GlobalPointerHalo() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
      style={
        {
          ["--mx" as any]: "50vw",
          ["--my" as any]: "25vh",
          background:
            "radial-gradient(700px 320px at var(--mx) var(--my), rgba(14,165,233,0.22), transparent 55%)",
        } as CSSProperties
      }
    />
  );
}

function BackgroundArt() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-48 -left-40 h-[520px] w-[520px] rounded-full bg-[#0FB5AE]/16 blur-[90px]" />
      <div className="absolute top-24 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-400/16 blur-[80px]" />
      <div className="absolute bottom-[-160px] left-1/2 -translate-x-1/2 h-[560px] w-[560px] rounded-full bg-emerald-300/12 blur-[100px]" />
      <div className="absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(60%_40%_at_50%_0%,black,transparent)]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="p-prog" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M32 0H0V32" fill="none" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#p-prog)" className="text-slate-400" />
        </svg>
      </div>
    </div>
  );
}

function PageFrame() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-2 rounded-[28px] z-10"
      style={{
        boxShadow:
          "inset 0 0 0 1px rgba(255,255,255,0.55), 0 0 0 1px rgba(255,255,255,0.25)",
      }}
    />
  );
}

/* ================= Progress (fine & rapide) ================= */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 360, damping: 26 });
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, rgba(15,181,174,1) 0%, rgba(79,70,229,1) 100%)",
      }}
    />
  );
}

/* ================= Animations section ================= */
const sectionVariants = {
  hidden: { opacity: 0, y: 4 },
  show: { opacity: 1, y: 0, transition: { duration: 0.18, ease: [0.2, 0.8, 0.2, 1] } },
};
function AnimatedSection({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      className={className}
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.06, margin: "-18% 0px" }}
    >
      {children}
    </motion.section>
  );
}

/* ================= CTAs SIMPLES ================= */

/** HeroCTA : pill dégradé, très simple */
function HeroCTA({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full px-7 py-3 font-semibold text-white shadow-[0_12px_30px_-16px_rgba(79,70,229,.45)] transition will-change-transform
                 bg-[linear-gradient(130deg,#0FB5AE_0%,#4F46E5_100%)]
                 hover:-translate-y-[1px] active:translate-y-[0px] active:scale-[0.99]"
    >
      {label}
    </a>
  );
}

/** SimpleBlockCTA : blanc (texte noir) → bleu clair au hover (bloc & direct) */
function SimpleBlockCTA({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`relative inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold
                  text-slate-900 bg-white/98 border border-slate-200
                  shadow-[0_8px_22px_-16px_rgba(15,24,32,.22)] transition
                  hover:-translate-y-[1px] hover:shadow-[0_14px_34px_-18px_rgba(15,24,32,.28)]
                  group-hover:bg-[rgba(223,245,255,0.9)] group-hover:border-teal-300
                  hover:bg-[rgba(223,245,255,0.95)] ${className}`}
    >
      {label}
    </a>
  );
}

/* ================= Badge lien (Early Bird) ================= */
function BadgeLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-teal-300 bg-white/90 px-3 py-1 text-xs font-semibold text-teal-700 shadow-sm transition will-change-transform hover:scale-[1.06] hover:shadow-teal-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#0FB5AE] to-cyan-500" />
      {children}
    </Link>
  );
}

/* ================= PAGE ================= */
export default function ProgrammesClient() {
  return (
    <main className={`relative min-h-screen overflow-x-hidden ${pageBg}`} style={{ color: brand.navy }}>
      <BackgroundArt />
      <GlobalPointerHalo />
      <PageFrame />
      <ScrollProgressBar />

      <Hero />

      <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 md:px-8 space-y-20 pb-28">
        <SectionSWT />
        <SectionIntern />
        <SectionTrainee />
        <SectionCamp />
        <AllProgramsGrid />
      </div>
    </main>
  );
}

/* ================= HERO ================= */
function Hero() {
  return (
    <section className="relative z-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 pt-14 pb-10">
        <AnimatedSection>
          <div className="rounded-3xl border border-white/40 bg-white/75 backdrop-blur-xl shadow-[0_10px_36px_-18px_rgba(15,24,32,0.2)] p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] items-center">
              <div>
                <div className="text-[11px] tracking-widest uppercase text-[#0FB5AE]">
                  Programmes J-1 · USA
                </div>
                <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">
                  Choisis ton programme.{" "}
                  <span style={{ color: brand.teal }}>Passe à l’action</span> aujourd’hui.
                </h1>
                <p className="mt-4 max-w-2xl text-slate-700">
                  De l’été inoubliable au stage pro jusqu’à 18 mois, on s’occupe du sponsor, des démarches et du chemin.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <HeroCTA href="/contact" label="Parler à un conseiller" />
                </div>
              </div>

              <div className="relative hidden md:block">
                <Link
                  href="#tous"
                  className="group relative block h-64 md:h-72 w-full rounded-2xl overflow-hidden border border-white"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop"
                    alt="Sunset over a US coastline"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    priority
                  />
                  <span className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-teal-300/0 transition group-hover:ring-2 group-hover:ring-teal-300/60" />
                  <div className="absolute bottom-3 left-3 text-[11px] text-white/90 drop-shadow">
                    Unsplash — nate_nasr
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ================= SECTION SHELL ================= */
type ShellImg = { src: string; alt: string };

function SectionShell({
  pre,
  title,
  bullets,
  ctaHref,
  ctaLabel,
  img,
  reverse = false,
  badge,
}: {
  pre: string;
  title: string | ReactNode;
  bullets: string[];
  ctaHref: string;
  ctaLabel: string;
  img: ShellImg;
  reverse?: boolean;
  badge?: string | ReactNode;
}) {
  return (
    <div
      className={`grid gap-8 md:gap-10 md:grid-cols-2 items-center ${
        reverse ? "md:[&>div:first-child]:order-2" : ""
      }`}
    >
      {/* IMAGE */}
      <Link
        href={ctaHref}
        aria-label={pre}
        className="group relative block h-64 md:h-80 rounded-3xl overflow-hidden border border-white shadow-[0_10px_36px_-18px_rgba(15,24,32,0.2)]"
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="pointer-events-none absolute inset-0 rounded-3xl ring-0 ring-teal-300/0 transition group-hover:ring-2 group-hover:ring-teal-300/60" />
      </Link>

      <article className="group relative rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 md:p-8 transition">
        {badge && (
          <div className="absolute -top-3 right-4 z-20">
            {typeof badge === "string" ? (
              <span className="rounded-full border border-teal-300 bg-white/90 px-3 py-1 text-xs font-semibold text-teal-700 backdrop-blur">
                {badge}
              </span>
            ) : (
              badge
            )}
          </div>
        )}

        <div className="relative z-10">
          <div className="text-[10px] uppercase tracking-wider text-[#0FB5AE]">{pre}</div>
          <h2 className="mt-1 text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0FB5AE]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-center">
            <SimpleBlockCTA href={ctaHref} label={ctaLabel} />
          </div>
        </div>

        {/* ligne bleue SOUS le contenu / bouton */}
        <span className="pointer-events-none absolute left-5 right-5 bottom-3 z-0 h-px bg-gradient-to-r from-transparent via-teal-400/70 to-transparent scale-x-0 group-hover:scale-x-100 origin-center transition-transform" />
      </article>
    </div>
  );
}

/* ================= Sections ================= */
function SectionSWT() {
  return (
    <AnimatedSection id="swt" className="scroll-mt-20">
      <SectionShell
        pre="SWT · Été 2025"
        title={
          <>
            Un été payé aux USA, <span className="text-slate-800">légal & encadré</span>.
          </>
        }
        bullets={[
          "Job saisonnier via visa J-1 SWT + SEVIS",
          "Démarches sponsor gérées de A à Z",
          "Aide au logement et à l’arrivée",
        ]}
        ctaHref="/programmes/swt"
        ctaLabel="Je veux mon été US"
        img={{
          src: "https://images.unsplash.com/photo-1468413253725-0d5181091126?q=80&w=1400&auto=format&fit=crop",
          alt: "Summer beach in the US",
        }}
        reverse={false}
        badge={<BadgeLink href="/tarifs#swt">Early Bird</BadgeLink>}
      />
    </AnimatedSection>
  );
}

function SectionIntern() {
  return (
    <AnimatedSection id="intern" className="scroll-mt-20">
      <SectionShell
        pre="Intern · max 12 mois"
        title="Stage pro J-1, boost carrière."
        bullets={[
          "Pour étudiants / récents diplômés (Bac+2/3)",
          "DS-7002 + DS-2019, sponsor & conformité",
          "Coaching CV & entretien, suivi pendant la mission",
        ]}
        ctaHref="/programmes/intern"
        ctaLabel="Découvrir Intern"
        img={{
          src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1400&auto=format&fit=crop",
          alt: "Intern in a US company",
        }}
        reverse
        badge="Le plus choisi"
      />
    </AnimatedSection>
  );
}

function SectionTrainee() {
  return (
    <AnimatedSection id="trainee" className="scroll-mt-20">
      <SectionShell
        pre="Trainee · 6–18 mois"
        title="Immersion pro longue, encadrée."
        bullets={[
          "Pour profils avec expérience / études avancées",
          "Plan de formation structuré, sponsor + conformité",
          "Suivi sur place et accompagnement global",
        ]}
        ctaHref="/programmes/trainee"
        ctaLabel="Découvrir Trainee"
        img={{
          src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop",
          alt: "Trainee program in the US",
        }}
        reverse={false}
        badge="Express"
      />
    </AnimatedSection>
  );
}

function SectionCamp() {
  return (
    <AnimatedSection id="camp" className="scroll-mt-20">
      <SectionShell
        pre="Camp Counselor"
        title="Un été en camp américain, tout compris."
        bullets={[
          "Vie en communauté, activités outdoor, salaire + logement/nourriture inclus",
          "Programme encadré et sécurisé",
          "Réseau international et anglais boosté",
        ]}
        ctaHref="/programmes/camp"
        ctaLabel="Je pars en camp"
        img={{
          src: "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=1400&auto=format&fit=crop",
          alt: "Kids playing at summer camp",
        }}
        reverse
      />
    </AnimatedSection>
  );
}

/* ================= Grid Tous les programmes ================= */
type ProgramItem = { slug: string; title: string; meta: string; bullets: string[] };

function AllProgramsGrid() {
  const items: ProgramItem[] = [
    {
      slug: "swt",
      title: "Summer Work & Travel",
      meta: "Plage, parcs, villes",
      bullets: ["Un été payé aux USA, légal et encadré.", "Job saisonnier via J-1 SWT", "SEVIS + démarches sponsor"],
    },
    {
      slug: "intern",
      title: "Intern (J-1)",
      meta: "Bac+2/3 · max 12 mois",
      bullets: ["Stage pro rémunéré", "DS-7002 + DS-2019", "Coaching CV/entretien"],
    },
    {
      slug: "trainee",
      title: "Trainee (J-1)",
      meta: "6–18 mois",
      bullets: ["Plan de formation complet", "Sponsorship & conformité", "Suivi sur place"],
    },
    {
      slug: "camp",
      title: "Camp Counselor",
      meta: "Nature & activités",
      bullets: ["Vie au camp + salaire", "Ambiance 100% US", "Communauté internationale"],
    },
  ];

  return (
    <AnimatedSection id="tous" className="scroll-mt-24">
      <div className="mb-6">
        <h3 className="text-lg tracking-wider uppercase text-[#0FB5AE]">Tous les programmes</h3>
        <p className="text-slate-600">Quatre voies pour vivre l’Amérique selon ton objectif et ta durée idéale.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((it, i) => (
          <ProgramCard key={it.slug} item={it} index={i} />
        ))}
      </div>
    </AnimatedSection>
  );
}

function ProgramCard({ item, index }: { item: ProgramItem; index: number }) {
  const { slug, title, meta, bullets } = item;

  return (
    <div className="block group">
      <motion.div
        initial={{ y: 4, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.06, margin: "-18% 0px" }}
        transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1], delay: index * 0.02 }}
        className="relative rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
      >
        <div className="grid grid-cols-[1fr_auto] gap-3 items-start">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-slate-500">
              {meta}
            </div>
            <h4 className="text-xl font-bold text-slate-900 mt-0.5">{title}</h4>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0FB5AE]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex justify-center relative z-10">
              <SimpleBlockCTA href={`/programmes/${slug}`} label="Voir le programme" />
            </div>
          </div>

          <div className="h-16 w-16 shrink-0 rounded-xl bg-gradient-to-br from-[#0FB5AE]/30 to-[#4F46E5]/30 border border-slate-200 grid place-content-center">
            <div className="h-6 w-6 rounded-md bg-teal-400/30" />
          </div>
        </div>

        {/* ligne bleue SOUS le contenu / bouton */}
        <span className="pointer-events-none absolute left-5 right-5 bottom-3 z-0 h-px bg-gradient-to-r from-transparent via-teal-400/70 to-transparent scale-x-0 group-hover:scale-x-100 origin-center transition-transform" />
      </motion.div>
    </div>
  );
}
