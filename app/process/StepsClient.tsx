"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Page Étapes (client)
 * - fond dynamique (blobs + grille + « verre »)
 * - timeline cliquable
 * - cartes extensibles très détaillées (Ce que vous faites / Ce qu’on fait pour vous / Documents)
 * - carrousel d’images (scroll-snap)
 * - mini checklists et CTA Tally
 */

const STEPS = [
  {
    k: "eligibility",
    title: "Éligibilité & cadrage",
    cover:
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1600&auto=format&fit=crop",
    summary:
      "On valide ensemble le bon programme (Intern/Trainee/SWT), les dates, la cohérence pédagogique et les contraintes consulaires.",
    youDo: [
      "Remplir le formulaire d’éligibilité (3–4 min)",
      "Partage rapide du CV (format FR ou US, on adapte ensuite)",
      "Call de cadrage (10–15 min) pour caler objectifs et calendrier",
    ],
    weDo: [
      "Vérification des critères J-1 (profil, études/expérience, secteur)",
      "Conseil programme & ville selon ton projet",
      "Roadmap personnalisée jusqu’au départ",
    ],
    docs: ["CV", "Justificatif étudiant ou diplôme < 12 mois (Intern)", "Passeport"],
  },
  {
    k: "ds7002",
    title: "Offre d’accueil & DS-7002",
    cover:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
    summary:
      "Ton entreprise d’accueil est confirmée. On structure le plan de formation (DS-7002) avec ton mentor.",
    youDo: [
      "Obtenir l’offre (ou on t’aide à la formaliser clairement)",
      "Valider les missions en lien direct avec tes études / ton domaine",
      "Coordonner la signature avec le mentor",
    ],
    weDo: [
      "Co-rédaction du DS-7002 (objectifs, catégories d’apprentissage)",
      "Préconisations sur la progression, le reporting et le mentoring",
      "Check conformité entreprise (taille, secteur, encadrement)",
    ],
    docs: ["Offre signée", "DS-7002 (brouillon puis version finale)", "Coordonnées mentor"],
  },
  {
    k: "sponsor",
    title: "Dossier sponsor & DS-2019",
    cover:
      "https://images.unsplash.com/photo-1523958203904-cdcb402031fd?q=80&w=1600&auto=format&fit=crop",
    summary:
      "On monte et soumet le dossier complet au sponsor J-1. S’il valide, il émet le DS-2019.",
    youDo: [
      "Charger en ligne les pièces (passeport, statut/ diplôme, offre…)",
      "Répondre aux éventuelles précisions du sponsor",
      "Souscrire l’assurance exigée par le sponsor",
    ],
    weDo: [
      "Montage complet du dossier et soumission au sponsor",
      "Interface FR/EN avec l’entreprise et le sponsor",
      "Suivi jusqu’à l’émission du DS-2019 (et tracking de l’envoi)",
    ],
    docs: ["Passeport", "Statut étudiant ou diplômes + CV", "Offre & DS-7002", "Assurance"],
  },
  {
    k: "fees",
    title: "SEVIS & MRV, DS-160",
    cover:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1600&auto=format&fit=crop",
    summary:
      "On t’accompagne pour payer SEVIS I-901, les frais MRV, et remplir le DS-160 sans erreurs.",
    youDo: [
      "Payer le SEVIS I-901 (~$220) et les frais MRV (~$185)",
      "Remplir le DS-160 (avec nos captures d’écran/commentaires)",
      "Choisir ton créneau d’entretien consulaire",
    ],
    weDo: [
      "Tutoriels et relecture des champs sensibles (erreurs fréquentes)",
      "Récap des justificatifs à apporter le jour J",
      "Support si besoin pour les uploads/confirmations",
    ],
    docs: ["Reçus SEVIS & MRV", "Confirmation DS-160", "Lettre sponsor/DS-2019"],
  },
  {
    k: "consulate",
    title: "Entretien consulaire & départ",
    cover:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1600&auto=format&fit=crop",
    summary:
      "Tu passes l’entretien, récupères ton passeport visé, et on te prépare aux premières démarches sur place.",
    youDo: [
      "Te présenter au consulat avec les originaux demandés",
      "Récupérer le passeport visé (suivi du centre de collecte)",
      "Finaliser ton départ : logement, arrivée, onboarding",
    ],
    weDo: [
      "Mock-interview + questions types",
      "Checklist finale de documents",
      "Conseils d’arrivée (SSN si requis, transports, banking starter)",
    ],
    docs: ["Passeport + DS-2019", "Reçus & confirmations", "Preuves financières (si exigées)"],
  },
];

export default function StepsClient() {
  const [active, setActive] = useState(0);

  const total = STEPS.length;
  const progress = useMemo(() => ((active + 1) / total) * 100, [active, total]);

  return (
    <div className="relative overflow-hidden">
      <BackgroundArt />

      {/* ===== HERO ===== */}
      <section className="relative z-10 container mx-auto max-w-6xl py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/30 bg-white/40 p-8 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Étapes du visa J-1 — simples & transparentes
            </h1>
            <p className="mt-4 text-slate-700 leading-relaxed">
              On t’explique tout, sans jargon : <strong>ce que tu fais</strong>,{" "}
              <strong>ce qu’on fait pour toi</strong>, et les{" "}
              <strong>documents</strong> à prévoir à chaque étape. Le but :{" "}
              partir sereinement, sans mauvaises surprises.
            </p>

            {/* Barre de progression */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">
                  Progression du parcours
                </span>
                <span className="text-xs tabular-nums text-slate-700">
                  {active + 1}/{total}
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-white/50 ring-1 ring-white/40 backdrop-blur">
                <motion.div
                  className="h-2.5 rounded-full bg-gradient-to-r from-[#0FB5AE] to-cyan-500"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                className="rounded-xl bg-gradient-to-r from-[#0FB5AE] to-cyan-500 px-6 py-3 font-semibold text-white shadow hover:opacity-95"
                data-tally-open="wkL1Vd"
                data-tally-overlay="1"
              >
                Vérifier mon éligibilité
              </button>
              <a
                href="/programmes"
                className="rounded-xl border border-teal-300 px-6 py-3 font-semibold text-teal-700 hover:bg-teal-50"
              >
                Voir les programmes
              </a>
            </div>
          </motion.div>

          {/* Carrousel images (scroll-snap) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#0FB5AE]/20 to-cyan-400/20 blur-2xl" />
            <div className="relative z-10 overflow-x-auto snap-x snap-mandatory flex gap-4 pb-2">
              {STEPS.map((s, i) => (
                <img
                  key={s.k}
                  src={s.cover}
                  alt={s.title}
                  onClick={() => setActive(i)}
                  className={`snap-center h-[260px] w-[420px] shrink-0 rounded-2xl border border-white/50 object-cover transition
                    ${active === i ? "ring-2 ring-[#0FB5AE]" : "opacity-80 hover:opacity-100"}`}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">Fais défiler → puis clique pour ouvrir le détail.</p>
          </motion.div>
        </div>
      </section>

      {/* ===== TIMELINE / CARTES EXTENSIBLES ===== */}
      <section className="relative z-10 container mx-auto max-w-6xl pb-6">
        <ol className="space-y-4">
          {STEPS.map((s, i) => {
            const open = i === active;
            return (
              <motion.li
                key={s.k}
                id={`step-${i + 1}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.35 }}
                className={`group rounded-3xl border p-5 backdrop-blur-xl shadow-sm 
                ${open ? "border-[#0FB5AE]/50 bg-white/60" : "border-white/30 bg-white/40 hover:bg-white/50"}`}
              >
                <button
                  className="flex w-full items-start gap-4 text-left"
                  onClick={() => setActive(i)}
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl 
                      bg-gradient-to-br from-[#0FB5AE] to-cyan-500 text-white shadow">
                    <strong className="font-semibold">{i + 1}</strong>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-slate-900">
                        {s.title}
                      </h2>
                      <span
                        className={`ml-3 inline-flex h-7 w-7 items-center justify-center rounded-full border text-sm transition
                        ${open ? "rotate-45 border-[#0FB5AE] text-[#0FB5AE]" : "border-slate-300 text-slate-500"}`}
                        aria-hidden
                      >
                        +
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-700">{s.summary}</p>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="mt-5 grid gap-6 md:grid-cols-3">
                        <GlassCard title="Ce que tu fais">
                          <List items={s.youDo} />
                        </GlassCard>
                        <GlassCard title="Ce qu’on fait pour toi">
                          <List items={s.weDo} check />
                        </GlassCard>
                        <GlassCard title="Documents à prévoir">
                          <List items={s.docs} dot />
                        </GlassCard>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ol>

        {/* Bande info */}
        <div className="mt-10 rounded-2xl border border-white/40 bg-white/50 p-5 backdrop-blur md:flex md:items-center md:justify-between">
          <div className="max-w-2xl text-sm text-slate-700">
            <strong>Tip budget :</strong> on te donne les fourchettes exactes
            pour les frais officiels (SEVIS, MRV) et l’assurance sponsor,
            et on t’aide à choisir la bonne ville selon ton coût de vie.
          </div>
          <button
            className="mt-3 md:mt-0 rounded-xl bg-gradient-to-r from-[#0FB5AE] to-cyan-500 px-5 py-2 font-semibold text-white shadow hover:opacity-95"
            data-tally-open="wkL1Vd"
            data-tally-overlay="1"
          >
            Parler à un conseiller
          </button>
        </div>
      </section>

      {/* ===== FAQ courte ===== */}
      <section className="relative z-10 container mx-auto max-w-6xl py-14">
        <h3 className="text-center text-2xl font-bold text-slate-900">
          Questions qu’on nous pose souvent
        </h3>
        <div className="mx-auto mt-8 max-w-3xl divide-y divide-white/40 rounded-2xl border border-white/40 bg-white/50 backdrop-blur">
          {FAQ.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="cursor-pointer list-none font-medium text-slate-900 group-open:underline">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-slate-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ===== CTA final ===== */}
      <section className="relative z-10 container mx-auto max-w-6xl pb-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          On s’occupe des détails, tu te concentres sur l’essentiel.
        </h2>
        <p className="mt-2 text-slate-600">
          Éligibilité, DS-7002, sponsor, consulat : notre équipe te guide pas à pas.
        </p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 rounded-xl bg-gradient-to-r from-[#0FB5AE] to-cyan-500 px-7 py-3 font-semibold text-white shadow-lg hover:shadow-cyan-400/40"
          data-tally-open="wkL1Vd"
          data-tally-overlay="1"
        >
          Démarrer mon parcours
        </motion.button>
      </section>
    </div>
  );
}

/* ---------- Composants UI ---------- */

function GlassCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 p-5 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
      <div className="mt-3 text-sm text-slate-700">{children}</div>
    </div>
  );
}

function List({ items, check, dot }: { items: string[]; check?: boolean; dot?: boolean }) {
  return (
    <ul className="space-y-2">
      {items.map((t, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full
            bg-gradient-to-br from-[#0FB5AE] to-cyan-500 text-white">
            {check ? <IconCheck /> : dot ? <IconDot /> : <IconArrow />}
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function BackgroundArt() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {/* Blobs */}
      <div className="absolute -top-48 -left-40 h-[520px] w-[520px] rounded-full bg-[#0FB5AE]/18 blur-[90px]" />
      <div className="absolute top-24 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-400/18 blur-[80px]" />
      <div className="absolute bottom-[-160px] left-1/2 -translate-x-1/2 h-[560px] w-[560px] rounded-full bg-emerald-300/12 blur-[100px]" />

      {/* Grille douce */}
      <div className="absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(60%_40%_at_50%_0%,black,transparent)]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="p" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M32 0H0V32" fill="none" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#p)" className="text-slate-400" />
        </svg>
      </div>

      {/* Liserés « verre » */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/60 to-transparent backdrop-blur" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/60 to-transparent backdrop-blur" />
    </div>
  );
}

/* ---------- mini-icônes inline ---------- */
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
      <path d="M20 6L10 17 4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconDot() {
  return <span className="block h-2 w-2 rounded-full bg-white" />;
}

/* ---------- FAQ courte ---------- */  
const FAQ = [
  {
    q: "Combien de temps entre dossier complet et DS-2019 ?",
    a: "En rythme standard, ~10 jours ouvrés après validation sponsor. Des options express peuvent exister selon la période.",
  },
  {
    q: "Le DS-7002 est-il obligatoire ?",
    a: "Oui pour Intern/Trainee : c’est le plan de formation encadré (catégories, objectifs, mentor).",
  },
  {
    q: "Puis-je voyager après mon programme ?",
    a: "Une période de grâce peut être autorisée selon les consignes du sponsor. On te précise les règles avant le départ.",
  },
];
  