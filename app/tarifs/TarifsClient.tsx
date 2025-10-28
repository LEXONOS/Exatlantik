// FILE: app/(site)/tarifs/TarifsClient.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/**
 * TARIFS — Exatlantik
 * Architecture :
 * - GlobalPointerHalo (halo souris sur toute la page, fixe, non-buggé)
 * - StickySubnav (ancres internes)
 * - Hero + CTA Pré-inscription
 * - Packs (3 offres, effet d’ancrage, CTAs Tally)
 * - Early Bird SWT (exclusif, dynamique)
 * - Comparatif (packs)
 * - Estimation des frais officiels (simulateur pédagogique)
 * - Timeline frais officiels (explications claires, hors packs)
 * - Valeurs (rassurance)
 * - FAQ + CTA final (recontact)
 *
 * Tally :
 * - Pré-inscription : wkL1Vd
 * - Être recontacté : 3XXYMd
 */

type ProgramKey = "intern" | "trainee" | "swt";

type Pack = {
  key: string;
  title: string;
  price: number;
  features: string[];
  highlight?: boolean;
  badge?: string;
  sub?: string;
  ctaLabel?: string;
};

export default function TarifsClient() {
  return (
    <div className="relative overflow-hidden text-slate-900">
      <GlobalPointerHalo />
      <BackgroundArt />

      <StickySubnav />

      <section id="paiement" className="relative z-10">
        <Hero />
      </section>

      <section id="packs" className="relative z-10">
        <Packs />
      </section>

      <section id="swt" className="relative z-10">
        <EarlyBirdSWT />
      </section>

      <section id="comparatif" className="relative z-10">
        <PacksComparatif />
      </section>

      <section id="simulateur" className="relative z-10">
        <Simulator />
      </section>

      <section id="officiels" className="relative z-10">
        <OfficialFeesTimeline />
      </section>

      <section id="valeurs" className="relative z-10">
        <Valeurs />
      </section>

      <section id="faq" className="relative z-10">
        <FAQSection />
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               GLOBAL DECORS                                */
/* -------------------------------------------------------------------------- */

function GlobalPointerHalo() {
  // Halo global fixé au viewport (suit la souris sur toute la page, même au scroll)
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      style={
        {
          ["--mx" as any]: "50vw",
          ["--my" as any]: "25vh",
          background:
            "radial-gradient(700px 320px at var(--mx) var(--my), rgba(14,165,233,0.22), transparent 55%)",
        } as React.CSSProperties
      }
    />
  );
}

function BackgroundArt() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
      {/* blobs */}
      <div className="absolute -top-48 -left-40 h-[520px] w-[520px] rounded-full bg-[#0FB5AE]/16 blur-[90px]" />
      <div className="absolute top-24 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-400/16 blur-[80px]" />
      <div className="absolute bottom-[-160px] left-1/2 -translate-x-1/2 h-[560px] w-[560px] rounded-full bg-emerald-300/12 blur-[100px]" />
      {/* grille douce */}
      <div className="absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(60%_40%_at_50%_0%,black,transparent)]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="p" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M32 0H0V32" fill="none" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#p)" className="text-slate-400" />
        </svg>
      </div>
      {/* liserés verre */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/60 to-transparent backdrop-blur" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/60 to-transparent backdrop-blur" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               STICKY SUBNAV                                */
/* -------------------------------------------------------------------------- */

function StickySubnav() {
  const items = [
    { href: "#paiement", label: "Paiement" },
    { href: "#packs", label: "Packs" },
    { href: "#swt", label: "SWT Early Bird" },
    { href: "#comparatif", label: "Comparatif" },
    { href: "#simulateur", label: "Estimation" },
    { href: "#officiels", label: "Officiels" },
    { href: "#valeurs", label: "Valeurs" },
    { href: "#faq", label: "FAQ" },
  ];
  return (
    <div className="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur">
      <nav className="container mx-auto max-w-6xl px-4 py-2 flex flex-wrap gap-2">
        {items.map((it) => (
          <a
            key={it.href}
            href={it.href}
            className="rounded-xl border border-white/40 bg-white/70 px-3 py-1.5 text-sm text-slate-700 hover:bg-white"
          >
            {it.label}
          </a>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <span className="rounded-full border border-teal-300 bg-white/80 px-3 py-1 text-xs font-semibold text-teal-700">
            Phase pilote : 25 places
          </span>
        </div>
      </nav>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    HERO                                    */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="grid gap-8 md:grid-cols-2 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border border-white/30 bg-white/60 p-7 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Tarifs & Frais officiels — <span className="text-teal-600">100% transparents</span>
          </h1>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Les <strong>frais officiels</strong> (SEVIS, MRV, assurance, sponsor/DS-2019) sont payés à des{" "}
            <strong>organismes tiers</strong> — ce <strong>n’est pas pour Exatlantik</strong>. Nos packs couvrent
            l’accompagnement expert qui <em>sécurise</em> et <em>accélère</em> ton parcours.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              className="rounded-xl bg-gradient-to-r from-[#0FB5AE] to-cyan-500 px-6 py-3 font-semibold text-white shadow hover:opacity-95"
              data-tally-open="wkL1Vd"
              data-tally-overlay="1"
            >
              Pré-inscription gratuite (25 places)
            </button>
            <button
              className="rounded-xl border border-teal-300 px-6 py-3 font-semibold text-teal-700 hover:bg-teal-50"
              data-tally-open="3XXYMd"
              data-tally-overlay="1"
            >
              Être recontacté
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Pas d’acompte à la pré-inscription • Diagnostic gratuit • Réponse 48–72h
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#0FB5AE]/18 to-cyan-400/18 blur-2xl" />
          <img
            src="https://images.unsplash.com/photo-1523958203904-cdcb402031fd?q=80&w=1600&auto=format&fit=crop"
            alt="Transparence des tarifs"
            className="relative z-10 w-full rounded-2xl border border-white/50 bg-white/50 backdrop-blur-md shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    PACKS                                   */
/* -------------------------------------------------------------------------- */

function Packs() {
  // Effet d’ancrage : le pack du milieu est “le plus choisi”
  const PACKS: Pack[] = [
    {
      key: "assist",
      title: "Pack Accompagnement",
      price: 390,
      sub: "Tu as déjà une entreprise d’accueil",
      features: [
        "Audit d’éligibilité + cadrage",
        "Montage dossier sponsor (DS-2019)",
        "Guides & relecture SEVIS / MRV / DS-160",
        "Préparation entretien consulaire",
        "Suivi jusqu’au départ",
      ],
      ctaLabel: "Choisir ce pack",
    },
    {
      key: "placement",
      title: "Placement + Accompagnement",
      price: 590, // proche du pack 1 pour l’ancrage
      sub: "Tu n’as pas encore d’entreprise",
      features: [
        "Tout le Pack Accompagnement",
        "Matching entreprise + coaching entretien",
        "Harmonisation DS-7002 avec le mentor",
        "Interface FR/EN sponsor & entreprise",
      ],
      highlight: true,
      badge: "Le plus choisi",
      ctaLabel: "Commencer avec ce pack",
    },
    {
      key: "express",
      title: "Premium Express",
      price: 990,
      sub: "Dossier prioritaire & coaching perso",
      features: [
        "Priorité calendrier & retours <48h",
        "Coaching consulat 1:1 + mock interview",
        "Checkpoints hebdomadaires dédiés",
        "Aide lettres & pièces sensibles",
      ],
      badge: "Express",
      ctaLabel: "Démarrer en express",
    },
  ];

  return (
    <section className="container mx-auto max-w-6xl px-4 pb-4">
      <h2 className="text-2xl font-bold text-slate-900 text-center">Choisis la formule adaptée</h2>
      <p className="mt-2 text-center text-slate-600">
        Honoraires Exatlantik — <em>distincts des frais officiels</em> (SEVIS, MRV, assurance, sponsor).
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {PACKS.map((p, idx) => (
          <motion.div
            key={p.key}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className={`relative rounded-2xl border p-6 backdrop-blur-xl shadow-sm ${
              p.highlight ? "border-teal-300/60 bg-white/75" : "border-white/40 bg-white/60"
            }`}
          >
            {p.badge && (
              <span className="absolute -top-3 right-4 rounded-full border border-teal-300 bg-white/90 px-3 py-1 text-xs font-semibold text-teal-700 backdrop-blur">
                {p.badge}
              </span>
            )}
            <h3 className="text-xl font-semibold text-slate-900">{p.title}</h3>
            {p.sub && <p className="mt-1 text-sm text-slate-600">{p.sub}</p>}
            <div className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">{p.price} €</div>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-gradient-to-br from-[#0FB5AE] to-cyan-500" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <button
                className="w-full rounded-xl bg-gradient-to-r from-[#0FB5AE] to-cyan-500 px-5 py-2.5 font-semibold text-white shadow hover:opacity-95"
                data-tally-open="wkL1Vd"
                data-tally-overlay="1"
              >
                {p.ctaLabel ?? "Choisir ce pack"}
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Pré-inscription gratuite · Paiement au lancement du dossier sponsor
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                EARLY BIRD SWT                              */
/* -------------------------------------------------------------------------- */

function EarlyBirdSWT() {
  return (
    <section className="container mx-auto max-w-6xl px-4 py-10">
      <div className="relative overflow-hidden rounded-3xl border border-teal-300/50 bg-gradient-to-br from-teal-50 via-cyan-50 to-white p-6 md:p-8">
        <div className="absolute -top-10 -left-10 h-56 w-56 rounded-full bg-teal-300/20 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-3 py-1 text-sm font-semibold text-teal-700 shadow">
              <Sparkle /> Offre exclusive
            </div>
            <h3 className="mt-3 text-2xl md:text-3xl font-extrabold text-slate-900">
              Early Bird — <span className="text-teal-600">Summer Work & Travel</span>
            </h3>
            <p className="mt-2 text-slate-700">
              Plus tu t’inscris tôt, <strong>moins c’est cher</strong> — et plus on sécurise ton dossier à temps.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 w-full md:w-auto">
            {[
              { label: "Avant 31 janv.", price: 390 },
              { label: "Fév.–Mars", price: 490 },
              { label: "Après avril", price: 590 },
            ].map((t) => (
              <div
                key={t.label}
                className="rounded-xl border border-white/60 bg-white/80 p-4 text-center backdrop-blur shadow-sm hover:shadow-md transition"
              >
                <div className="text-xs text-slate-600">{t.label}</div>
                <div className="mt-1 text-2xl font-extrabold text-slate-900">{t.price} €</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 relative z-10">
          <button
            className="rounded-xl bg-gradient-to-r from-[#0FB5AE] to-cyan-500 px-6 py-3 font-semibold text-white shadow hover:opacity-95"
            data-tally-open="wkL1Vd"
            data-tally-overlay="1"
          >
            Pré-inscription Early Bird (25 places)
          </button>
          <button
            className="rounded-xl border border-teal-300 bg-white/80 px-6 py-3 font-semibold text-teal-700 hover:bg-white"
            data-tally-open="3XXYMd"
            data-tally-overlay="1"
          >
            Question sur SWT
          </button>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 COMPARATIF                                 */
/* -------------------------------------------------------------------------- */

function PacksComparatif() {
  return (
    <section className="container mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-2xl font-bold text-slate-900 text-center">Ce que chaque pack inclut</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[760px] rounded-2xl overflow-hidden border border-white/40 bg-white/60 backdrop-blur">
          <thead className="text-left text-sm text-slate-600">
            <tr className="border-b border-white/40">
              <th className="p-4">Éléments</th>
              <th className="p-4">Accompagnement</th>
              <th className="p-4">Placement + Accompagnement</th>
              <th className="p-4">Premium Express</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-800">
            {[
              ["Audit d’éligibilité & cadrage", true, true, true],
              ["Montage dossier sponsor (DS-2019)", true, true, true],
              ["Guides & relecture SEVIS / MRV / DS-160", true, true, true],
              ["Préparation entretien consulaire", true, true, true],
              ["Matching entreprise & coaching entretien", false, true, true],
              ["Harmonisation DS-7002 avec le mentor", false, true, true],
              ["Priorité calendrier & checkpoints hebdo", false, false, true],
            ].map(([label, a, b, c], i) => (
              <tr key={i} className="border-b border-white/30 last:border-0">
                <td className="p-4">{label as string}</td>
                <td className="p-4">{a ? <Check /> : <Dash />}</td>
                <td className="p-4">{b ? <Check /> : <Dash />}</td>
                <td className="p-4">{c ? <Check /> : <Dash />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 SIMULATEUR                                 */
/* -------------------------------------------------------------------------- */

function Simulator() {
  const [program, setProgram] = useState<ProgramKey>("intern");
  const [months, setMonths] = useState<number>(6); // Intern/Trainee
  const [summerMonths, setSummerMonths] = useState<number>(3); // SWT
  const [currency, setCurrency] = useState<"USD" | "EUR">("USD");

  // Hypothèses indicatives (affinables) — valeurs pédagogiques
  const SEVIS = 220; // USD
  const MRV = 185; // USD
  const INSURANCE_PER_MONTH_MIN = 70;
  const INSURANCE_PER_MONTH_MAX = 90;

  // Frais sponsor indicatifs (varient par organisme/durée)
  const sponsorUSD = (prog: ProgramKey, m: number) => {
    if (prog === "swt") return 900 + Math.max(0, m - 2) * 60; // 2–4 mois
    if (prog === "intern") return 1200 + Math.max(0, m - 6) * 80; // 2–12 mois
    return 1400 + Math.max(0, m - 6) * 100; // trainee 2–18 mois
  };

  const duration = program === "swt" ? summerMonths : months;
  const sponsor = sponsorUSD(program, duration);
  const insuranceMin = INSURANCE_PER_MONTH_MIN * duration;
  const insuranceMax = INSURANCE_PER_MONTH_MAX * duration;

  const officialUSD_min = Math.round(SEVIS + MRV + sponsor + insuranceMin);
  const officialUSD_max = Math.round(SEVIS + MRV + sponsor + insuranceMax);

  // Conversion approximative pour affichage (sans requête réseau)
  const EUR_RATE = 0.93;
  const toDisplay = (usd: number) => (currency === "USD" ? usd : Math.round(usd * EUR_RATE));
  const currencySymbol = currency === "USD" ? "$" : "€";

  return (
    <section className="container mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-3xl border border-white/40 bg-white/65 p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Estimation des frais officiels <span className="text-teal-600">(hors packs)</span>
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Ces montants sont réglés aux <strong>organismes tiers</strong> : gouvernement US, sponsor J-1, assureur.{" "}
              Les honoraires Exatlantik (<em>packs</em>) sont séparés.
            </p>
          </div>
          <CurrencySwitch currency={currency} onChange={setCurrency} />
        </div>

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {/* Contrôles */}
          <div>
            <label className="block text-sm font-medium text-slate-800">Programme</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <Radio label="Intern" active={program === "intern"} onClick={() => setProgram("intern")} />
              <Radio label="Trainee" active={program === "trainee"} onClick={() => setProgram("trainee")} />
              <Radio label="SWT" active={program === "swt"} onClick={() => setProgram("swt")} />
            </div>

            {program !== "swt" ? (
              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-800">
                  Durée (mois) : <span className="text-[#0FB5AE] font-semibold">{months}</span>
                </label>
                <input
                  type="range"
                  min={2}
                  max={program === "intern" ? 12 : 18}
                  value={months}
                  onChange={(e) => setMonths(parseInt(e.target.value))}
                  className="mt-2 w-full accent-[#0FB5AE]"
                />
              </div>
            ) : (
              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-800">
                  Durée été (mois) : <span className="text-[#0FB5AE] font-semibold">{summerMonths}</span>
                </label>
                <input
                  type="range"
                  min={2}
                  max={4}
                  value={summerMonths}
                  onChange={(e) => setSummerMonths(parseInt(e.target.value))}
                  className="mt-2 w-full accent-[#0FB5AE]"
                />
              </div>
            )}
          </div>

          {/* Résultats */}
          <motion.div
            key={`${program}-${duration}-${currency}`}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="rounded-2xl border border-white/40 bg-white/75 p-5 backdrop-blur-xl"
          >
            <h3 className="font-semibold text-slate-900">Total estimatif des frais officiels</h3>
            <div className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900 tabular-nums">
              ~{currencySymbol}
              {toDisplay(officialUSD_min)}–{currencySymbol}
              {toDisplay(officialUSD_max)}
              {currency === "EUR" && (
                <span className="ml-2 text-xs text-slate-500">(≈ {EUR_RATE.toString().replace(".", ",")} €/USD)</span>
              )}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <Row label="SEVIS I-901 (Dept. of Homeland Security)" value={`$${SEVIS}`} />
              <Row label="Frais MRV (Visa — Ambassade des USA)" value={`$${MRV}`} />
              <Row label="Assurance J-1 (obligatoire)" value={`$${INSURANCE_PER_MONTH_MIN}–$${INSURANCE_PER_MONTH_MAX} × ${duration}`} />
              <Row label="Frais sponsor (incl. émission DS-2019)" value={`~$${sponsor}`} />
            </div>

            <ul className="mt-4 text-xs text-slate-600 space-y-1">
              <li>• <strong>MRV</strong> = frais de rendez-vous en ambassade pour l’entretien du visa (non remboursable).</li>
              <li>• <strong>Assurance</strong> exigée par le sponsor (minima réglementaires J-1) — payée à l’assureur/sponsor.</li>
              <li>• <strong>DS-160</strong> : formulaire en ligne requis (0 $) — c’est le MRV qui est payant.</li>
              <li>• <strong>Annexes</strong> possibles : envois DHL, traductions assermentées (≈ 50–150 €).</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                           OFFICIAL FEES — TIMELINE                         */
/* -------------------------------------------------------------------------- */

function OfficialFeesTimeline() {
  const steps = [
    {
      title: "Étape 1 — SEVIS I-901",
      price: "$220",
      who: "Department of Homeland Security (US)",
      desc:
        "Enregistrement officiel dans le système SEVIS. Indispensable pour tous les programmes J-1.",
    },
    {
      title: "Étape 2 — MRV (Visa)",
      price: "$185",
      who: "Ambassade / Consulat des États-Unis",
      desc:
        "Frais de rendez-vous en ambassade pour l’entretien du visa (non remboursable quelle que soit l’issue).",
    },
    {
      title: "Étape 3 — Assurance J-1",
      price: "$70–90 / mois",
      who: "Assureur partenaire / sponsor",
      desc:
        "Couverture minimale réglementaire exigée par le sponsor pour toute la durée du programme.",
    },
    {
      title: "Étape 4 — Frais sponsor",
      price: "~$900–$1 900",
      who: "Organisme sponsor J-1 agréé",
      desc:
        "Vérification de la conformité, émission du DS-2019, suivi administratif pendant le programme.",
    },
    {
      title: "Étape 5 — Annexes éventuelles",
      price: "50–150 €",
      who: "Prestataires tiers",
      desc:
        "Envois de documents, traductions assermentées, etc. — toujours annoncés en amont.",
    },
  ];

  return (
    <section className="container mx-auto max-w-6xl px-4 pb-6">
      <h2 className="text-2xl font-bold text-slate-900 text-center">Frais officiels — clairs & séparés</h2>
      <p className="mt-2 text-center text-slate-600">
        Ces frais sont payés à des <strong>entités tierces</strong> (pas à Exatlantik). Notre rôle : éviter les erreurs,
        fluidifier les délais, t’accompagner jusqu’au départ.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-5">
        {steps.map((s, i) => (
          <motion.article
            key={s.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.25, once: true }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative rounded-2xl border border-white/60 bg-white/70 p-5 backdrop-blur-md shadow-sm transition"
          >
            <div className="text-xs font-semibold text-teal-700">Étape {i + 1}</div>
            <h3 className="mt-1 font-semibold text-slate-900">{s.title}</h3>
            <div className="mt-1 text-sm text-slate-600">Bénéficiaire : {s.who}</div>
            <p className="mt-2 text-sm text-slate-700">{s.desc}</p>
            <div className="mt-3 text-lg font-extrabold text-slate-900">{s.price}</div>
            <span className="pointer-events-none absolute left-5 right-5 bottom-3 h-px bg-gradient-to-r from-transparent via-teal-400/70 to-transparent scale-x-0 group-hover:scale-x-100 origin-center transition-transform" />
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   VALEURS                                  */
/* -------------------------------------------------------------------------- */

function Valeurs() {
  const cards = [
    {
      title: "Transparence",
      desc:
        "Honoraires distincts des frais officiels. Pas de frais cachés. Tu sais qui tu paies et pour quoi.",
    },
    {
      title: "Qualité & conformité",
      desc:
        "Dossiers solides, anticipation des points sensibles avec sponsor & entreprise — on limite les refus.",
    },
    {
      title: "Sérénité & vitesse",
      desc:
        "Checklists, modèles, retours rapides. Tu avances avec un plan net, sans surprises.",
    },
  ];
  return (
    <section className="container mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-2xl font-bold text-slate-900 text-center">Nos engagements</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-white/60 bg-white/70 p-6 backdrop-blur shadow-sm hover:shadow-md"
          >
            <h3 className="text-slate-900 font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm text-slate-700">{c.desc}</p>
          </motion.div>
        ))}
      </div>
      {/* Disponibilités (zones horaires) */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { tz: "🇫🇷 Europe/Paris", hours: "9h–19h", note: "Support principal" },
          { tz: "🇺🇸 US/Eastern", hours: "9am–1pm", note: "Fenêtre US côte Est" },
          { tz: "🌐 Async", hours: "Réponses rapides", note: "Docs & relectures" },
        ].map((b) => (
          <div key={b.tz} className="rounded-xl border border-white/50 bg-white/70 p-4 text-sm">
            <div className="font-semibold text-slate-900">{b.tz}</div>
            <div className="text-slate-700">{b.hours}</div>
            <div className="text-slate-600">{b.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                     FAQ                                    */
/* -------------------------------------------------------------------------- */

function FAQSection() {
  const FAQ = [
    {
      q: "Pourquoi séparer nos honoraires des frais officiels ?",
      a: "Pour une transparence totale : SEVIS/MRV/assurance/sponsor sont payés à des organismes tiers. Nos packs couvrent l’accompagnement expert qui sécurise et accélère ton parcours.",
    },
    {
      q: "Les montants du simulateur sont-ils garantis ?",
      a: "Non — ce sont des estimations indicatives selon la durée, le sponsor choisi et la saison. Nous confirmons précisément après étude du profil.",
    },
    {
      q: "Quand dois-je payer les honoraires ?",
      a: "Pré-inscription gratuite. Les honoraires sont déclenchés lorsque ton dossier sponsor/DS-2019 est lancé (après validation d’éligibilité et cadrage).",
    },
    {
      q: "Et si je n’ai pas encore d’entreprise ?",
      a: "Choisis le pack Placement + Accompagnement : on identifie des pistes sérieuses, on te coach pour l’entretien, et on harmonise le DS-7002 avec le mentor.",
    },
    {
      q: "Puis-je étaler les paiements ?",
      a: "Oui, selon les jalons (cadrage → sponsor → consulat). On clarifie ensemble un calendrier simple.",
    },
  ];
  return (
    <section className="container mx-auto max-w-6xl px-4 pb-14">
      <h2 className="text-2xl font-bold text-slate-900 text-center">FAQ Tarifs & transparence</h2>
      <div className="mx-auto mt-8 max-w-3xl divide-y divide-white/40 rounded-2xl border border-white/40 bg-white/60 backdrop-blur">
        {FAQ.map((f) => (
          <details key={f.q} className="group p-5">
            <summary className="cursor-pointer list-none font-medium text-slate-900 group-open:underline">
              {f.q}
            </summary>
            <p className="mt-2 text-sm text-slate-700">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <button
          className="rounded-xl bg-gradient-to-r from-[#0FB5AE] to-cyan-500 px-7 py-3 font-semibold text-white shadow hover:shadow-cyan-400/40"
          data-tally-open="wkL1Vd"
          data-tally-overlay="1"
        >
          Pré-inscription (gratuite)
        </button>
        <button
          className="rounded-xl border border-teal-300 px-7 py-3 font-semibold text-teal-700 hover:bg-teal-50"
          data-tally-open="3XXYMd"
          data-tally-overlay="1"
        >
          Être recontacté
        </button>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  UI HELPERS                                */
/* -------------------------------------------------------------------------- */

function Radio({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border px-3 py-2 text-sm font-medium transition backdrop-blur ${
        active ? "border-teal-300 bg-white/85 text-teal-700" : "border-white/40 bg-white/60 text-slate-700 hover:bg-white/80"
      }`}
    >
      {label}
    </button>
  );
}

function CurrencySwitch({
  currency,
  onChange,
}: {
  currency: "USD" | "EUR";
  onChange: (v: "USD" | "EUR") => void;
}) {
  return (
    <div className="flex items-center rounded-xl border border-white/40 bg-white/70 backdrop-blur">
      <button
        onClick={() => onChange("USD")}
        className={`px-3 py-2 text-sm font-medium rounded-l-xl ${
          currency === "USD" ? "bg-white text-teal-700 border-r border-white/40" : "text-slate-700"
        }`}
      >
        USD
      </button>
      <button
        onClick={() => onChange("EUR")}
        className={`px-3 py-2 text-sm font-medium rounded-r-xl ${
          currency === "EUR" ? "bg-white text-teal-700" : "text-slate-700"
        }`}
      >
        EUR (≈)
      </button>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/40 bg-white/65 px-3 py-2 backdrop-blur">
      <span className="text-slate-700">{label}</span>
      <span className="tabular-nums font-semibold text-slate-900">{value}</span>
    </div>
  );
}

function Check() {
  return (
    <span className="inline-grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-[#0FB5AE] to-cyan-500 text-white">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
        <path d="M20 6L10 17 4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}
function Dash() {
  return <span className="inline-block h-1 w-5 rounded bg-slate-300" />;
}

function Sparkle() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" fill="currentColor" />
    </svg>
  );
}
