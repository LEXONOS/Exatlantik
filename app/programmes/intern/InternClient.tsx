"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

/* =========================
   PAGE CLIENT
   ========================= */
export default function InternClient() {
  /* ---------- JSON-LD ---------- */
  const faqJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Qui peut demander un visa J-1 Intern ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Les étudiants actuellement inscrits à l’université (hors USA) ou jeunes diplômés (≤ 12 mois), avec un stage qualifié en lien direct avec leur filière.",
          },
        },
        {
          "@type": "Question",
          name: "Quelle est la durée maximale du programme J-1 Intern ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Jusqu’à 12 mois, sous réserve de validation par le sponsor et le consulat américain.",
          },
        },
        {
          "@type": "Question",
          name: "Dois-je fournir des documents originaux ou un test type TOEIC ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Nous ne demandons pas les originaux ni de test type TOEIC. Le dossier se fait en ligne et nous te guidons sur les preuves nécessaires.",
          },
        },
      ],
    }),
    []
  );

  /* ---------- Simulateur de coûts ---------- */
  const [months, setMonths] = useState(6);
  const SEVIS = 220;
  const MRV = 185;
  const INSURANCE_PER_MONTH = 80;
  const LOGISTICS = 70;
  const officialTotal = SEVIS + MRV + LOGISTICS + INSURANCE_PER_MONTH * months;

  return (
    <div className="relative overflow-hidden">
      <BgMesh />

      {/* ===== HERO ===== */}
      <section className="container relative z-10 mx-auto max-w-6xl py-16 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/30 bg-white/40 p-8 backdrop-blur-md shadow-xl"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Visa J-1 Intern — Stage qualifié jusqu’à 12 mois
            </h1>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Le <strong>visa J-1 Intern</strong> permet aux étudiants et jeunes
              diplômés de réaliser un stage aux États-Unis, jusqu’à 12 mois.
              L’objectif : acquérir une expérience professionnelle concrète tout
              en découvrant la culture américaine. Ce n’est pas un emploi
              classique, mais une <strong>opportunité formatrice</strong> avec
              encadrement officiel.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img
              src="https://images.unsplash.com/photo-1557064349-d835670beb60?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Stage en entreprise aux USA"
              className="rounded-2xl border border-white/50 bg-white/30 backdrop-blur-md shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ===== Explication ===== */}
      <section className="container relative z-10 mx-auto max-w-6xl py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">
              Qu’est-ce que le Visa J-1 Intern ?
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Il s’adresse aux étudiants inscrits dans l’enseignement supérieur
              (hors USA) ou diplômés depuis moins de 12 mois. Ce programme
              favorise <strong>l’apprentissage pratique</strong> via un
              encadrement (DS-7002, mentor en entreprise, sponsor agréé).
            </p>
            <p className="text-slate-700 leading-relaxed">
              L’objectif n’est pas de remplacer un emploi mais d’offrir une{" "}
              <strong>expérience structurée</strong>, valorisable dans ton
              parcours académique et professionnel.
            </p>
          </div>

          <div className="rounded-2xl border border-white/40 bg-white/60 p-6 backdrop-blur-md shadow">
            <h3 className="font-semibold text-slate-900">Résumé rapide</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li>Durée : jusqu’à 12 mois</li>
              <li>Stage lié directement à tes études</li>
              <li>Encadrement obligatoire (DS-7002, mentor)</li>
              <li>Sponsor agréé qui émet le DS-2019</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Simulateur amélioré ===== */}
      <section className="container relative z-10 mx-auto max-w-6xl py-16">
        <div className="rounded-3xl border border-white/40 bg-white/60 p-8 backdrop-blur-md shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900">
            💰 Simulateur de frais officiels
          </h2>
          <p className="mt-2 text-slate-600">
            Ajuste la durée de ton stage pour voir combien prévoir.
          </p>

          <div className="mt-8">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Durée :{" "}
              <span className="text-[#0FB5AE] font-semibold">{months} mois</span>
            </label>
            <input
              type="range"
              min={2}
              max={12}
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value))}
              className="w-full accent-[#0FB5AE] cursor-pointer"
            />

            <motion.div
              key={months}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mt-4 text-4xl font-extrabold text-slate-900"
            >
              ~${officialTotal}
            </motion.div>

            <p className="mt-2 text-sm text-slate-600 italic">
              {months <= 4 &&
                "Stage court = parfait pour l’été ou une césure rapide."}
              {months > 4 &&
                months <= 8 &&
                "Durée idéale pour valoriser un semestre universitaire."}
              {months > 8 &&
                "Immersion longue = vraie expérience professionnelle internationale."}
            </p>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 text-sm text-slate-700">
            <div>
              <Row label="SEVIS" value={`$${SEVIS}`} />
              <Row label="Visa MRV" value={`$${MRV}`} />
              <Row
                label={`Assurance (${months} mois)`}
                value={`$${INSURANCE_PER_MONTH * months}`}
              />
              <Row label="Logistique" value={`$${LOGISTICS}`} />
            </div>
            <div className="rounded-xl border border-white/30 bg-white/50 p-4 backdrop-blur-md">
              <h3 className="font-semibold text-slate-900">Conseil Projet</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1">
<li>Nous t&apos;aiderons à choisir le bon sponsor.</li>
                <li>Aiderons à trouver le logement</li>
                <li>Préparer ton entretien consulaire avec soin.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA final ===== */}
      <section className="relative z-10">
        <div className="container mx-auto max-w-6xl py-16 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Tu veux qu’on t’accompagne ?
          </h2>
          <p className="mt-2 text-slate-600">
            On vérifie ton éligibilité et on te guide pas à pas.
          </p>
          <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative mt-8 inline-flex items-center justify-center px-7 py-3 text-lg font-semibold text-white rounded-xl 
                     bg-gradient-to-r from-[#0FB5AE] to-cyan-500 
                     hover:from-cyan-500 hover:to-[#0FB5AE]
                     transition-all duration-300 shadow-lg hover:shadow-cyan-400/50"
          data-tally-open="wkL1Vd"
        >
          Etre contacté
        </motion.button>
        </div>s
      </section>

      {/* ===== JSON-LD ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  );
}

/* =========================
   SUBCOMPONENTS
   ========================= */
function BgMesh() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#0FB5AE]/20 blur-[90px]" />
      <div className="absolute top-10 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[80px]" />
      <div className="absolute bottom-[-160px] left-1/2 -translate-x-1/2 h-[560px] w-[560px] rounded-full bg-emerald-400/10 blur-[100px]" />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-700">{label}</span>
      <span className="tabular-nums font-semibold text-slate-900">{value}</span>
    </div>
  );
}
