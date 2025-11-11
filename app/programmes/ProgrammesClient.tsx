// FILE: app/programmes/ProgrammesClient.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";
import { ArrowUpRight, ArrowRightLeft, Sparkles } from "lucide-react";

/* ================= Brand & Layout ================= */

const brand = {
  teal: "#0FB5AE",
  navy: "#0C3836",
  indigo: "#4F46E5",
};

const pageBg =
  "bg-[radial-gradient(120%_70%_at_70%_-10%,#E9F7F5_0%,#EEF2FF_42%,#F8FAFF_100%)]";

const blockH = "min-h-[360px] sm:min-h-[400px] md:h-[440px]";

/* ================= Util Types ================= */

type MotionLinkProps = React.ComponentProps<typeof Link> & {
  children?: ReactNode;
};

const MotionLink = motion<MotionLinkProps>(Link);

/* ================= Global Decor ================= */

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
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={
        {
          ["--mx" as any]: "50vw",
          ["--my" as any]: "30vh",
          background:
            "radial-gradient(600px 320px at var(--mx) var(--my), rgba(15,181,174,0.14), transparent 55%)",
        } as CSSProperties
      }
    />
  );
}

function BackgroundArt() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {/* Aurora */}
      <div className="absolute inset-0 opacity-[0.6] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent_70%)]">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 h-[720px] w-[1200px] blur-[70px]"
          style={{
            background:
              "conic-gradient(from 160deg at 50% 50%, rgba(15,181,174,.22), rgba(79,70,229,.22), rgba(12,56,54,.22), rgba(15,181,174,.22))",
          }}
        />
      </div>
      {/* Glow blobs */}
      <div className="absolute -top-48 -left-40 h-[520px] w-[520px] rounded-full bg-[#0FB5AE]/16 blur-[90px]" />
      <div className="absolute top-24 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-400/16 blur-[80px]" />
      <div className="absolute bottom-[-160px] left-1/2 -translate-x-1/2 h-[560px] w-[560px] rounded-full bg-emerald-300/10 blur-[110px]" />
      {/* Grid + subtle noise */}
      <div className="absolute inset-0 opacity-[0.14] [mask-image:radial-gradient(65%_50%_at_50%_0%,black,transparent)]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="p-prog" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M32 0H0V32" fill="none" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#p-prog)" className="text-slate-300" />
        </svg>
      </div>
      <div className="absolute inset-0 mix-blend-multiply opacity-[0.05] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:6px_6px]" />
    </div>
  );
}

function PageFrame() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-2 rounded-[28px] z-10"
      style={{
        boxShadow:
          "inset 0 0 0 1px rgba(255,255,255,0.45), 0 0 0 1px rgba(15,23,42,0.06)",
      }}
    />
  );
}

/* ================= Scroll progress ================= */

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 360, damping: 26 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left"
      style={{
        scaleX,
        backgroundImage:
          "linear-gradient(90deg, rgba(15,181,174,1) 0%, rgba(79,70,229,1) 100%)",
      }}
    />
  );
}

/* ================= Animations ================= */

const sectionVariants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: [0.2, 0.8, 0.25, 1] },
  },
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
      viewport={{ once: true, amount: 0.16, margin: "-18% 0px" }}
    >
      {children}
    </motion.section>
  );
}

/* ================= CTAs ================= */

function PrimaryCTA({ href, label }: { href: string; label: string }) {
  return (
    <MotionLink
      href={href}
      className="relative inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_-18px_rgba(15,23,42,0.7)] bg-[linear-gradient(120deg,#0FB5AE_0%,#4F46E5_55%,#0C3836_110%)] overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 focus-visible:ring-offset-transparent"
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      aria-label={label}
    >
      <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_0%_0%,rgba(79,70,229,0.18),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(15,181,174,0.22),transparent_55%)] transition-opacity duration-300" />
      <span className="relative">{label}</span>
      <motion.span
        className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/15"
        animate={{ x: [0, 3, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      </motion.span>
    </MotionLink>
  );
}

function SecondaryCTA({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-[11px] font-semibold text-slate-800 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.18)] backdrop-blur-md transition hover:-translate-y-[1px] hover:bg-slate-900/90 hover:text-white hover:border-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
      aria-label={label}
    >
      <ArrowRightLeft className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}

function BadgeLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-full border border-teal-300/80 bg-white/95 px-3 py-1 text-[9px] font-semibold text-teal-700 shadow-sm backdrop-blur-md transition hover:scale-[1.05] hover:shadow-teal-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
    >
      <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-gradient-to-br from-[#0FB5AE] to-cyan-500">
        <Sparkles className="h-2 w-2 text-white" aria-hidden="true" />
      </span>
      {children}
    </Link>
  );
}

/* ================= Page Root ================= */

export default function ProgramsPageClient() {
  return (
    <main
      className={`relative min-h-screen w-full overflow-x-hidden ${pageBg} isolate`}
      style={{ color: brand.navy }}
    >
      <BackgroundArt />
      <GlobalPointerHalo />
      <PageFrame />
      <ScrollProgressBar />

      <header className="relative z-20">
        <Hero />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <ProgramsQuickNav />
        </div>
      </header>

      <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 md:px-8 space-y-20 pb-28">
        <SectionSWT />
        <SectionIntern />
        <SectionTrainee />
        <SectionCamp />
        <ComparisonSection />
      </div>

      <FooterHint />
    </main>
  );
}

/* ================= Hero ================= */

function Hero() {
  return (
    <AnimatedSection className="pt-12 pb-8">
      <section
        aria-labelledby="programmes-hero-title"
        className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/85 backdrop-blur-2xl shadow-[0_18px_60px_-28px_rgba(15,23,42,0.9)] p-6 sm:p-8 md:p-10"
      >
        <div className="grid gap-8 md:gap-10 md:grid-cols-[1.5fr_minmax(0,1fr)] items-center">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-[9px] font-semibold text-teal-700">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              Programmes J-1 USA · Summer Work & Travel · Intern · Trainee · Camp
            </div>

            <h1
              id="programmes-hero-title"
              className="text-3xl sm:text-4xl md:text-[2.6rem] font-extrabold leading-tight text-slate-900"
            >
              Accueille un{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0FB5AE] via-[#4F46E5] to-[#0C3836]">
                programme J-1
              </span>{" "}
              qui a du sens.
              <br />
              Nous sécurisons la conformité. Tu restes focus sur l’essentiel.
            </h1>

            <p className="max-w-2xl text-[0.95rem] text-slate-700">
              Quatre formats, une méthode claire : critères lisibles, délais annoncés,
              documents cadrés avec le sponsor et suivi continu. Décide en confiance,
              sans blabla.
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <PrimaryCTA href="/contact" label="Parler à un conseiller" />
              <SecondaryCTA href="#comparatif" label="Comparer en un coup d’œil" />
            </div>

            <p className="mt-1 text-[0.78rem] text-slate-500">
              Informations concrètes : coûts, délais, critères, obligations — mises à jour
              et vérifiées avant chaque départ.
            </p>
          </div>

          <div className="relative w-full">
            <motion.figure
              className={`relative rounded-3xl overflow-hidden border border-white/60 bg-slate-900/5 shadow-[0_12px_44px_-24px_rgba(15,23,42,0.75)] ${blockH}`}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop"
                alt="Côte américaine au coucher du soleil"
                fill
                className="object-cover"
                priority
              />
              <figcaption className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between text-[8px] text-white/85 drop-shadow">
                <span className="rounded-full bg-black/35 px-2 py-0.5 backdrop-blur">
                  Visa J-1 conforme · Sponsors agréés
                </span>
                <span className="rounded-full bg-black/35 px-2 py-0.5 backdrop-blur">
                  Support avant · pendant · après
                </span>
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}

/* ================= Quick Nav ================= */

function ProgramsQuickNav() {
  const links = [
    { href: "#swt", label: "Summer Work & Travel" },
    { href: "#intern", label: "Intern" },
    { href: "#trainee", label: "Trainee" },
    { href: "#camp", label: "Camp Counselor" },
    { href: "#comparatif", label: "Comparatif" },
  ];
  return (
    <AnimatedSection className="sticky top-3 sm:top-4 z-30 mb-10">
      <nav
        aria-label="Navigation rapide entre les programmes J-1"
        className="flex items-center gap-2 overflow-x-auto rounded-full border border-white/75 bg-white/85 backdrop-blur-xl px-3 py-2 text-[10px] text-slate-600 shadow-[0_14px_40px_-26px_rgba(15,23,42,0.75)]"
      >
        <div className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-1 text-[9px] font-semibold text-teal-700 shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
          <span>Accès rapide</span>
        </div>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="whitespace-nowrap rounded-full px-3 py-1.5 transition-colors hover:bg-slate-900/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </AnimatedSection>
  );
}

/* ================= Section Shell ================= */

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
      className={`grid gap-8 md:gap-10 md:grid-cols-2 items-stretch ${
        reverse ? "md:[&>div:first-child]:order-2" : ""
      }`}
    >
      {/* IMAGE */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="relative"
      >
        <Link
          href={ctaHref}
          aria-label={
            typeof title === "string" ? `Découvrir le programme ${title}` : pre
          }
          className={`group relative block rounded-3xl overflow-hidden border border-white/80 bg-slate-900/5 shadow-[0_10px_36px_-18px_rgba(15,24,32,0.28)] ${blockH} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
          <span className="pointer-events-none absolute inset-0 rounded-3xl ring-0 ring-teal-300/0 transition-all group-hover:ring-2 group-hover:ring-teal-300/60" />
          <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-between items-center text-[8px] text-white/90 drop-shadow">
            <span className="rounded-full bg-black/40 px-2 py-0.5 backdrop-blur">
              Aperçu du cadre de vie
            </span>
            <span className="rounded-full bg-black/40 px-2 py-0.5 backdrop-blur">
              Cliquer pour les détails
            </span>
          </div>
        </Link>
      </motion.div>

      {/* CONTENT */}
      <motion.article
        className={`group relative rounded-3xl border border-white/80 bg-white/92 backdrop-blur-xl shadow-[0_10px_34px_-18px_rgba(15,23,42,0.22)] p-6 md:p-8 flex flex-col justify-between ${blockH}`}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        {badge && (
          <div className="absolute -top-3 right-4 z-20">
            {typeof badge === "string" ? (
              <span className="rounded-full border border-teal-300 bg-white/95 px-3 py-1 text-[9px] font-semibold text-teal-700 backdrop-blur">
                {badge}
              </span>
            ) : (
              badge
            )}
          </div>
        )}

        <div className="relative z-10">
          <p className="text-[9px] uppercase tracking-[0.18em] text-[#0FB5AE]">
            {pre}
          </p>
          <h2 className="mt-1 text-2xl md:text-3xl font-bold text-slate-900">
            {title}
          </h2>
          <ul className="mt-4 space-y-2 text-[0.9rem] text-slate-700">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0FB5AE]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href={ctaHref}
            className="relative inline-flex items-center justify-center gap-1.5 rounded-md px-5 py-2.5 text-[11px] font-semibold text-slate-900 bg-white/98 border border-slate-200 shadow-[0_8px_22px_-16px_rgba(15,24,32,.22)] transition hover:-translate-y-[1px] hover:shadow-[0_14px_34px_-18px_rgba(15,24,32,.3)] hover:bg-[rgba(223,245,255,0.98)] hover:border-teal-300/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            aria-label={ctaLabel}
          >
            <span className="relative z-10">{ctaLabel}</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="pointer-events-none absolute inset-x-3 bottom-1 h-px bg-gradient-to-r from-transparent via-teal-300/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>

        <span className="pointer-events-none absolute left-5 right-5 bottom-3 z-0 h-px bg-gradient-to-r from-transparent via-teal-400/70 to-transparent scale-x-0 group-hover:scale-x-100 origin-center transition-transform" />
      </motion.article>
    </div>
  );
}

/* ================= Programme Sections ================= */

function SectionSWT() {
  return (
    <AnimatedSection id="swt" className="scroll-mt-28">
      <SectionShell
        pre="Summer Work & Travel · Été"
        title={
          <>
            Un été rémunéré aux USA,{" "}
            <span className="text-slate-800">simple et encadré.</span>
          </>
        }
        bullets={[
          "Visa J-1 SWT + SEVIS : job déclaré, cadre officiel.",
          "Démarches sponsor gérées, délais annoncés dès le départ.",
          "Aide logement & arrivée pour limiter les imprévus.",
        ]}
        ctaHref="/programmes/swt"
        ctaLabel="Découvrir le programme SWT"
        img={{
          src: "https://images.unsplash.com/photo-1468413253725-0d5181091126?q=80&w=1400&auto=format&fit=crop",
          alt: "Étudiants sur une plage américaine pendant l'été",
        }}
        badge={<BadgeLink href="/tarifs#swt">Early bird · places limitées</BadgeLink>}
      />
    </AnimatedSection>
  );
}

function SectionIntern() {
  return (
    <AnimatedSection id="intern" className="scroll-mt-28">
      <SectionShell
        pre="Intern · 3 à 12 mois"
        title="Un stage J-1 clair et crédible sur ton CV."
        bullets={[
          "Pour étudiants & jeunes diplômés en lien direct avec le cursus.",
          "DS-7002 & DS-2019 cadrés avec le sponsor.",
          "Coaching CV/entretien + suivi opérationnel.",
        ]}
        ctaHref="/programmes/intern"
        ctaLabel="Explorer le programme Intern"
        img={{
          src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1400&auto=format&fit=crop",
          alt: "Stagiaire en entreprise aux États-Unis",
        }}
        reverse
        badge="Le plus choisi"
      />
    </AnimatedSection>
  );
}

function SectionTrainee() {
  return (
    <AnimatedSection id="trainee" className="scroll-mt-28">
      <SectionShell
        pre="Trainee · 6 à 18 mois"
        title="Structurer une vraie étape de carrière aux USA."
        bullets={[
          "Pour diplômés avec expérience ou profils confirmés.",
          "Plan de formation long, responsabilités progressives.",
          "Accompagnement de projet, d’entreprise et de visa.",
        ]}
        ctaHref="/programmes/trainee"
        ctaLabel="Découvrir le programme Trainee"
        img={{
          src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop",
          alt: "Réunion professionnelle dans un open-space américain",
        }}
        badge="Parcours carrière"
      />
    </AnimatedSection>
  );
}

function SectionCamp() {
  return (
    <AnimatedSection id="camp" className="scroll-mt-28">
      <SectionShell
        pre="Camp Counselor · Été"
        title="Une expérience humaine forte en summer camp."
        bullets={[
          "Animation, pédagogie, vie en communauté internationale.",
          "Salaire + logement + repas souvent inclus.",
          "Anglais intensif, autonomie et leadership.",
        ]}
        ctaHref="/programmes/camp"
        ctaLabel="Explorer le programme Camp Counselor"
        img={{
          src: "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=1400&auto=format&fit=crop",
          alt: "Feu de camp dans un summer camp américain",
        }}
        reverse
      />
    </AnimatedSection>
  );
}

/* ================= Comparatif - Data & Types (unique) ================= */

type ProgramKey = "swt" | "intern" | "trainee" | "camp";

type ProgramDetails = {
  key: ProgramKey;
  label: string;
  meta: string;
  baseline: string;
  profil: string;
  objectif: string;
  duree: string;
  poste: string;
  anglais: string;
  budget: string;
  preparation: string;
  href: string;
};

const PROGRAMS: Record<ProgramKey, ProgramDetails> = {
  swt: {
    key: "swt",
    label: "SWT",
    meta: "2–4 mois · Été",
    baseline: "Job d’été rémunéré, encadré, accessible.",
    profil:
      "Étudiants / jeunes actifs voulant un job d’été officiel, sans paperasse opaque.",
    objectif:
      "Financer l’été, voyager, pratiquer l’anglais dans un cadre J-1 sécurisé.",
    duree:
      "2 à 4 mois l’été, selon dates validées avec l’employeur.",
    poste:
      "Saisonnier déclaré : hôtellerie, parcs, restaurants, zones touristiques.",
    anglais:
      "A2/B1 : comprendre les consignes, échanger simplement avec clients & équipe.",
    budget:
      "Frais de programme + billet d’avion ; salaire couvrant la vie sur place.",
    preparation:
      "3–6 mois : matching employeur, validation sponsor, démarches J-1.",
    href: "/programmes/swt",
  },
  intern: {
    key: "intern",
    label: "Intern",
    meta: "3–12 mois",
    baseline: "Stage qualifié aligné avec ton cursus.",
    profil:
      "Étudiants & jeunes diplômés avec projet en lien direct avec les études.",
    objectif:
      "Première expérience US lisible et validée académiquement.",
    duree: "3 à 12 mois selon exigences académiques et besoins de l’entreprise.",
    poste:
      "Missions encadrées (marketing, finance, ingénierie, IT…) cohérentes avec la formation.",
    anglais: "B1/B2 : suivre réunions, collaborer, rédiger des mails pro.",
    budget:
      "Rémunération variable ; prévoir un coussin logement au démarrage.",
    preparation:
      "3–6 mois : offre, DS-7002, DS-2019, validation sponsor, consulat.",
    href: "/programmes/intern",
  },
  trainee: {
    key: "trainee",
    label: "Trainee",
    meta: "6–18 mois",
    baseline: "Immersion longue, montée en responsabilités.",
    profil:
      "Diplômés avec expérience ou profils confirmés visant un rôle plus autonome.",
    objectif:
      "Piloter des projets, renforcer un profil international solide.",
    duree: "6 à 18 mois selon le plan de formation et la stratégie de carrière.",
    poste:
      "Postes avec responsabilités : gestion de projet, expertise, coordination.",
    anglais: "B2/C1 : à l’aise à l’oral et à l’écrit en contexte exigeant.",
    budget:
      "Rémunération plus élevée, alignée au niveau de responsabilité.",
    preparation:
      "4–8 mois : cadrage projet, choix entreprise, dossier J-1 complet.",
    href: "/programmes/trainee",
  },
  camp: {
    key: "camp",
    label: "Camp",
    meta: "8–12 semaines · Été",
    baseline: "Camp counselor : humain, encadré, abordable.",
    profil:
      "Étudiants, animateurs, profils pédagogiques à l’aise en collectif.",
    objectif:
      "Vivre une expérience humaine forte, gagner en leadership et en anglais.",
    duree: "8 à 12 semaines l’été selon le camp.",
    poste: "Animation d’activités, vie de camp, rôle de référent.",
    anglais: "B1/B2 : interactions continues avec équipes et campeurs.",
    budget: "Salaire + logement + repas souvent inclus.",
    preparation: "3–6 mois : matching camp, contrôles, formalités J-1.",
    href: "/programmes/camp",
  },
};

type CriterionKey =
  | "profil"
  | "objectif"
  | "duree"
  | "poste"
  | "anglais"
  | "budget"
  | "preparation";

const CRITERIA: { key: CriterionKey; label: string }[] = [
  { key: "profil", label: "Profil idéal" },
  { key: "objectif", label: "Objectif principal" },
  { key: "duree", label: "Durée" },
  { key: "poste", label: "Type de poste / mission" },
  { key: "anglais", label: "Niveau d’anglais conseillé" },
  { key: "budget", label: "Budget & rémunération" },
  { key: "preparation", label: "Timing & préparation" },
];

const SHORTCUTS: { label: string; description: string; duo: [ProgramKey, ProgramKey] }[] =
  [
    { label: "Job d’été encadré", description: "Comparer SWT et Camp", duo: ["swt", "camp"] },
    { label: "Stage vs carrière", description: "Comparer Intern et Trainee", duo: ["intern", "trainee"] },
    { label: "Accessible & structurant", description: "Comparer SWT et Intern", duo: ["swt", "intern"] },
  ];

const modeSwitchVariants = {
  enter: { opacity: 0, y: 4 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
};

/* ================= Comparatif Section (unique) ================= */

function ComparisonSection() {
  const [mode, setMode] = useState<"table" | "duo">("table");
  const [duo, setDuo] = useState<[ProgramKey, ProgramKey]>(["intern", "trainee"]);

  const setDuoPair = (a: ProgramKey, b: ProgramKey) => {
    if (a === b) return;
    setMode("duo");
    setDuo([a, b]);
  };

  const addToDuo = (key: ProgramKey) => {
    setMode("duo");
    setDuo((prev) => {
      if (prev.includes(key)) return prev;
      return [prev[1], key];
    });
  };

  return (
    <section id="comparatif" aria-labelledby="comparatif-title" className="scroll-mt-32">
      <motion.div
        className="space-y-5"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.22 }}
      >
        {/* HEADER */}
        <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1.5">
            <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-600">
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-teal-50">
                <Sparkles className="h-2 w-2 text-teal-500" aria-hidden="true" />
              </span>
              Comparer en un coup d’œil
            </p>
            <h2 id="comparatif-title" className="text-base sm:text-lg font-semibold text-slate-900">
              Trois niveaux de lecture pour décider sans hésiter.
            </h2>
            <p className="text-[0.85rem] text-slate-600 max-w-2xl">
              Un strip rapide, un tableau précis, puis un face-à-face ciblé. Mêmes critères
              partout, repères stables, lecture fluide.
            </p>
          </div>

          {/* MODE SWITCH */}
          <div className="flex flex-col items-start gap-2">
            <div
              className="inline-flex items-center gap-1 rounded-full border border-white/80 bg-white/95 px-1 py-1 text-[10px] shadow-[0_10px_32px_-20px_rgba(15,23,42,0.6)] backdrop-blur-xl"
              role="tablist"
              aria-label="Mode de comparaison"
            >
              <button
                type="button"
                onClick={() => setMode("table")}
                role="tab"
                aria-selected={mode === "table"}
                className={`rounded-full px-3 py-1.5 transition flex items-center gap-1.5 ${
                  mode === "table" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Vue 4 programmes
              </button>
              <button
                type="button"
                onClick={() => setMode("duo")}
                role="tab"
                aria-selected={mode === "duo"}
                className={`rounded-full px-3 py-1.5 transition flex items-center gap-1.5 ${
                  mode === "duo" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <ArrowRightLeft className="h-3.5 w-3.5" aria-hidden="true" />
                Face-à-face
              </button>
            </div>
            <p className="text-[0.7rem] text-slate-500">
              Change de vue à tout moment : mêmes repères, détail adapté.
            </p>
          </div>
        </header>

        {/* NIVEAU 1 : STRIP */}
        <ProgramQuickStrip onSelect={addToDuo} />

        {/* SHORTCUTS */}
        <div className="flex flex-wrap gap-2 text-[0.72rem]">
          {SHORTCUTS.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => setDuoPair(s.duo[0], s.duo[1])}
              className="group inline-flex items-center gap-1.5 rounded-full border border-teal-100 bg-white/95 px-3 py-1 shadow-sm backdrop-blur hover:-translate-y-[1px] hover:border-teal-400 hover:shadow-[0_10px_26px_-18px_rgba(15,23,42,0.3)] transition"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              <span className="font-medium text-teal-800">{s.label}</span>
              <span className="text-[0.65rem] text-slate-500 group-hover:text-slate-700">
                {s.description}
              </span>
            </button>
          ))}
        </div>

        {/* NIVEAU 2 & 3 : SWITCH */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {mode === "table" ? (
              <motion.div
                key="mode-table"
                variants={modeSwitchVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.18 }}
              >
                <ComparisonTable onSelectForDuo={addToDuo} />
              </motion.div>
            ) : (
              <motion.div
                key="mode-duo"
                variants={modeSwitchVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.18 }}
              >
                <FaceToFaceComparison duo={duo} onChangeDuo={setDuoPair} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA FINAL */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-teal-50 bg-gradient-to-r from-white/98 via-white/96 to-teal-50/80 px-4 py-3 text-[0.8rem] shadow-[0_10px_28px_-20px_rgba(15,23,42,0.45)] backdrop-blur">
          <p className="text-slate-600">
            Un doute ? En quelques questions, on confirme le programme J-1 le plus cohérent
            pour ton profil, ton budget et tes dates.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-1.5 text-[0.78rem] font-semibold text-white shadow-[0_10px_26px_-18px_rgba(15,23,42,0.9)] hover:-translate-y-[1px] hover:shadow-[0_16px_40px_-22px_rgba(15,23,42,0.95)] transition"
          >
            Parler à un conseiller
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ================= Comparatif Sub-components ================= */

function ProgramQuickStrip({ onSelect }: { onSelect: (key: ProgramKey) => void }) {
  const list = Object.values(PROGRAMS) as ProgramDetails[];
  return (
    <div className="grid gap-2 sm:gap-3 grid-cols-2 md:grid-cols-4">
      {list.map((p) => (
        <motion.button
          key={p.key}
          type="button"
          onClick={() => onSelect(p.key)}
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="group relative flex flex-col items-start gap-1 rounded-2xl border border-white/80 bg-white/95 px-3 py-2.5 text-left text-[0.72rem] shadow-[0_10px_26px_-20px_rgba(15,23,42,0.4)] backdrop-blur hover:shadow-[0_16px_40px_-24px_rgba(15,23,42,0.55)] hover:border-teal-200"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[0.65rem] font-semibold text-slate-500">{p.meta}</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs font-semibold text-slate-900">{p.label}</span>
            <span className="text-[0.65rem] text-teal-600">{p.baseline}</span>
          </div>
          <p className="line-clamp-2 text-[0.7rem] text-slate-600">{p.profil}</p>
          <span className="mt-0.5 inline-flex items-center gap-1 text-[0.65rem] text-teal-700">
            Voir en face-à-face
            <ArrowRightLeft className="h-3 w-3" />
          </span>
          <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-50/0 via-transparent to-indigo-50/0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      ))}
    </div>
  );
}

function ComparisonTable({ onSelectForDuo }: { onSelectForDuo: (key: ProgramKey) => void }) {
  const list = Object.values(PROGRAMS) as ProgramDetails[];
  return (
    <div className="mt-3 overflow-x-auto rounded-2xl border border-white/85 bg-white/98 shadow-[0_18px_46px_-26px_rgba(15,23,42,0.35)] backdrop-blur">
      <table className="min-w-full border-collapse text-[0.72rem] text-slate-700">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-white/98 px-3 py-3 text-left text-[0.7rem] font-semibold text-slate-500">
              Critère
            </th>
            {list.map((p) => (
              <th key={p.key} className="px-3 py-3 text-left align-bottom">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.65rem] font-semibold text-slate-500">{p.meta}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-900">{p.label}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectForDuo(p.key)}
                    className="inline-flex items-center gap-1 rounded-full border border-teal-100 bg-teal-50/70 px-2 py-0.5 text-[0.6rem] text-teal-700 hover:bg-teal-100 hover:border-teal-300 transition"
                  >
                    Ajouter au face-à-face
                    <ArrowRightLeft className="h-3 w-3" />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CRITERIA.map((c, idx) => (
            <tr key={c.key} className={idx % 2 === 0 ? "bg-slate-50/40" : ""}>
              <th className="sticky left-0 z-10 bg-inherit px-3 py-2 text-left text-[0.65rem] font-semibold text-slate-600">
                {c.label}
              </th>
              {list.map((p) => (
                <td key={p.key} className="px-3 py-2 align-top text-[0.7rem] text-slate-700">
                  {(p as any)[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FaceToFaceComparison({
  duo,
  onChangeDuo,
}: {
  duo: [ProgramKey, ProgramKey];
  onChangeDuo: (a: ProgramKey, b: ProgramKey) => void;
}) {
  const [left, right] = duo;
  const programs = Object.values(PROGRAMS) as ProgramDetails[];
  const leftP = PROGRAMS[left];
  const rightP = PROGRAMS[right];

  const chooseLeft = (key: ProgramKey) => {
    if (key === right) return;
    onChangeDuo(key, right);
  };
  const chooseRight = (key: ProgramKey) => {
    if (key === left) return;
    onChangeDuo(left, key);
  };

  return (
    <div className="mt-3 space-y-3">
      {/* Sélecteurs */}
      <div className="flex flex-wrap items-center gap-2 text-[0.7rem]">
        <span className="text-slate-500">Face-à-face personnalisé :</span>
        <div className="inline-flex flex-wrap gap-1">
          {programs.map((p) => (
            <button
              key={`left-${p.key}`}
              type="button"
              onClick={() => chooseLeft(p.key)}
              className={`rounded-full px-2 py-0.5 border text-[0.65rem] ${
                p.key === left
                  ? "bg-slate-900 text-white border-slate-900"
                  : "border-slate-200 text-slate-600 hover:border-slate-400"
              }`}
            >
              {p.label} (col. gauche)
            </button>
          ))}
        </div>
        <div className="inline-flex flex-wrap gap-1">
          {programs.map((p) => (
            <button
              key={`right-${p.key}`}
              type="button"
              onClick={() => chooseRight(p.key)}
              className={`rounded-full px-2 py-0.5 border text-[0.65rem] ${
                p.key === right
                  ? "bg-teal-600 text-white border-teal-600"
                  : "border-slate-200 text-slate-600 hover:border-slate-400"
              }`}
            >
              {p.label} (col. droite)
            </button>
          ))}
        </div>
      </div>

      {/* Cartes face-à-face */}
      <div className="grid gap-3 md:grid-cols-2">
        <motion.div
          layout
          className="relative rounded-2xl border border-white/90 bg-white/98 p-3.5 text-[0.72rem] shadow-[0_14px_40px_-24px_rgba(15,23,42,0.35)]"
        >
          <FaceToFaceHeader program={leftP} tone="dark" />
          <dl className="mt-2 space-y-1.5 text-slate-700">
            {CRITERIA.map((c) => (
              <div key={c.key} className="border-b border-slate-100/80 pb-1.5">
                <dt className="text-[0.6rem] font-semibold uppercase tracking-wide text-slate-500">
                  {c.label}
                </dt>
                <dd>{(leftP as any)[c.key]}</dd>
              </div>
            ))}
          </dl>
          <FaceToFaceCTA href={leftP.href} />
        </motion.div>

        <motion.div
          layout
          className="relative rounded-2xl border border-teal-100 bg-teal-50/70 p-3.5 text-[0.72rem] shadow-[0_16px_44px_-24px_rgba(15,23,42,0.4)]"
        >
          <FaceToFaceHeader program={rightP} tone="teal" />
          <dl className="mt-2 space-y-1.5 text-slate-800">
            {CRITERIA.map((c) => (
              <div key={c.key} className="border-b border-teal-100/90 pb-1.5">
                <dt className="text-[0.6rem] font-semibold uppercase tracking-wide text-teal-700">
                  {c.label}
                </dt>
                <dd>{(rightP as any)[c.key]}</dd>
              </div>
            ))}
          </dl>
          <FaceToFaceCTA href={rightP.href} />
        </motion.div>
      </div>
    </div>
  );
}

function FaceToFaceHeader({
  program,
  tone,
}: {
  program: ProgramDetails;
  tone: "dark" | "teal";
}) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <div>
        <p className={`text-[0.65rem] font-semibold ${tone === "teal" ? "text-teal-700" : "text-slate-500"}`}>
          {program.meta}
        </p>
        <h3 className="text-xs font-bold text-slate-900">
          {program.label} · {program.baseline}
        </h3>
      </div>
      <span
        className={`rounded-full px-2 py-0.5 text-[0.6rem] ${
          tone === "teal" ? "bg-teal-600 text-white" : "bg-slate-900 text-white"
        }`}
      >
        Option
      </span>
    </div>
  );
}

function FaceToFaceCTA({ href }: { href: string }) {
  return (
    <div className="mt-2 flex justify-end">
      <Link
        href={href}
        className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-[0.65rem] font-semibold text-white shadow-[0_10px_26px_-18px_rgba(15,23,42,0.85)] hover:-translate-y-[1px] hover:shadow-[0_16px_40px_-22px_rgba(15,23,42,0.95)] transition"
      >
        Voir le détail
        <ArrowUpRight className="h-3 w-3" />
      </Link>
    </div>
  );
}

/* ================= Footer Hint ================= */

function FooterHint() {
  return (
    <footer className="relative z-20 mt-16 border-t border-white/60/50 bg-white/70 backdrop-blur py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 text-[0.78rem] text-slate-600">
        <p>
          Exatlantik agit en tant qu’interface et accompagnateur entre l’entreprise, le
          candidat et les sponsors J-1 agréés. Nous ne sommes pas sponsor J-1.
        </p>
      </div>
    </footer>
  );
}
