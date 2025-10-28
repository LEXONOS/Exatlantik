"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

/* =========================
   PAGE CLIENT
   ========================= */
export default function SwtClient() {
  /* ---------- FAQ JSON-LD ---------- */
  const faqJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Qui peut demander un visa J-1 Summer Work Travel ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Uniquement les étudiants actuellement inscrits dans l’enseignement supérieur, âgés de 18 à 28 ans, avec un emploi saisonnier validé par un sponsor agréé.",
          },
        },
        {
          "@type": "Question",
          name: "Quelle est la durée maximale du programme ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "De 2 à 4 mois pendant l’été, aligné sur ton calendrier universitaire. Une période de grâce de 30 jours peut être prévue pour voyager après ton emploi.",
          },
        },
        {
          "@type": "Question",
          name: "Quels secteurs sont éligibles ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Principalement les secteurs saisonniers : hôtellerie, restauration, parcs d’attractions, centres de vacances.",
          },
        },
      ],
    }),
    []
  );

  /* ---------- Simulateur de coûts ---------- */
  const [months, setMonths] = useState(3);
  const SEVIS = 220;
  const MRV = 185;
  const INSURANCE = 80;
  const officialTotal = SEVIS + MRV + INSURANCE * months;

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
              Visa J-1 Summer Work Travel — Job d’été de 2 à 4 mois
            </h1>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Le <strong>visa J-1 Summer Work Travel (SWT)</strong> te permet de
              travailler l’été aux États-Unis dans un emploi saisonnier, de{" "}
              <strong>gagner un salaire en dollars</strong> et de vivre une{" "}
              <strong>expérience culturelle unique</strong>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img
              src="https://images.unsplash.com/photo-1615882953403-227f2609b653?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Travail saisonnier aux USA"
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
              Qu’est-ce que le Visa J-1 Summer Work Travel ?
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Ce visa est réservé aux <strong>étudiants en cours d’études</strong>
              , entre 18 et 28 ans. Il offre la possibilité de{" "}
              <strong>travailler 2 à 4 mois</strong> dans un emploi saisonnier
              encadré (hôtellerie, restauration, parcs, centres de vacances).
            </p>
            <p className="text-slate-700 leading-relaxed">
              L’objectif : te permettre de <strong>financer ton été</strong>,{" "}
              <strong>améliorer ton anglais</strong> et{" "}
              <strong>voyager aux États-Unis</strong> dans un cadre officiel et
              sécurisé.
            </p>
          </div>

          <div className="rounded-2xl border border-white/40 bg-white/60 p-6 backdrop-blur-md shadow">
            <h3 className="font-semibold text-slate-900">Résumé rapide</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li>Durée : 2 à 4 mois pendant l’été</li>
              <li>Réservé aux étudiants (18–28 ans)</li>
              <li>Secteurs : hôtellerie, restauration, tourisme</li>
              <li>Possibilité de voyager 30 jours après ton contrat</li>
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
            Ajuste la durée de ton job pour voir combien prévoir.
          </p>

          <div className="mt-8">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Durée :{" "}
              <span className="text-[#0FB5AE] font-semibold">{months} mois</span>
            </label>
            <input
              type="range"
              min={2}
              max={4}
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
              {months === 2 && "Parfait pour un été court et intense."}
              {months === 3 && "Le choix le plus courant pour un job d’été complet."}
              {months === 4 && "Un été entier pour maximiser ton expérience."}
            </p>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 text-sm text-slate-700">
            <div>
              <Row label="SEVIS" value={`$${SEVIS}`} />
              <Row label="Visa MRV" value={`$${MRV}`} />
              <Row
                label={`Assurance (${months} mois)`}
                value={`$${INSURANCE * months}`}
              />
            </div>
            <div className="rounded-xl border border-white/30 bg-white/50 p-4 backdrop-blur-md">
              <h3 className="font-semibold text-slate-900">Conseils</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>On t’aide à trouver ton placement via nos partenaires.</li>
                <li>Préparation à l’entretien consulaire incluse.</li>
                <li>Anticipe ton logement et ton budget voyage.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA final ===== */}
      <section className="relative z-10">
        <div className="container mx-auto max-w-6xl py-16 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Tu veux qu’on t’accompagne pour ton job d’été ?
          </h2>
          <p className="mt-2 text-slate-600">
            On vérifie ton éligibilité et on t’accompagne pas à pas.
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
        </div>
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
