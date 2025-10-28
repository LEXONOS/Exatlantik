"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

/* =========================
   PAGE CLIENT
   ========================= */
export default function TraineeClient() {
  /* ---------- JSON-LD ---------- */
  const faqJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Qui peut demander un visa J-1 Trainee ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Toute personne de plus de 18 ans, diplômée depuis plus d’un an avec au moins 12 mois d’expérience pro, ou sans diplôme mais avec 5 ans d’expérience en rapport avec le stage.",
          },
        },
        {
          "@type": "Question",
          name: "Quelle est la durée maximale du programme ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Le J-1 Trainee peut durer jusqu’à 18 mois, selon ton projet et la validation du sponsor.",
          },
        },
        {
          "@type": "Question",
          name: "Quelle est la différence avec le J-1 Intern ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Le J-1 Intern est réservé aux étudiants ou jeunes diplômés (-12 mois). Le J-1 Trainee s’adresse aux profils plus expérimentés, pour une immersion professionnelle longue.",
          },
        },
        {
          "@type": "Question",
          name: "Quels sont les délais d’obtention ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Sous 10 jours ouvrés après validation du dossier par le sponsor. Une procédure express peut réduire ce délai à 72h ouvrées.",
          },
        },
      ],
    }),
    []
  );

  /* ---------- Simulateur de coûts ---------- */
  const [months, setMonths] = useState(12);
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
              Visa J-1 Trainee — Immersion professionnelle longue durée
            </h1>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Le <strong>visa J-1 Trainee</strong> s’adresse aux jeunes
              professionnels qui veulent se perfectionner aux États-Unis,
              jusqu’à <strong>18 mois</strong>.  
              L’objectif : acquérir une <strong>expertise concrète</strong>,
              évoluer dans un environnement international et valoriser une
              expérience forte sur ton CV.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600&auto=format&fit=crop"
              alt="Professionnels en entreprise aux USA"
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
              Qu’est-ce que le Visa J-1 Trainee ?
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Conçu pour les <strong>jeunes pros diplômés</strong> (ou avec 5 ans
              d’expérience), le J-1 Trainee permet une
              <strong> immersion longue</strong> en entreprise, de 6 à 18 mois.
              Les missions doivent correspondre à ton domaine d’études ou ton
              parcours professionnel.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Ce programme n’est pas un simple emploi : il vise à renforcer ton{" "}
              <strong>savoir-faire</strong>, développer un réseau
              international et te donner une longueur d’avance dans ta carrière.
            </p>
          </div>

          <div className="rounded-2xl border border-white/40 bg-white/60 p-6 backdrop-blur-md shadow">
            <h3 className="font-semibold text-slate-900">Résumé rapide</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li>Durée : jusqu’à 18 mois</li>
              <li>Stage qualifié ou V.I.E en lien avec ton domaine</li>
              <li>Diplôme + expérience, ou 5 ans d’expérience sans diplôme</li>
              <li>Encadrement sponsor + DS-2019 obligatoire</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Éligibilité ===== */}
      <section className="container relative z-10 mx-auto max-w-6xl py-16">
        <h2 className="text-2xl font-bold text-slate-900">
          Critères d’éligibilité
        </h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <EligibilityCard title="Âge" desc="18 ans minimum" />
          <EligibilityCard title="Diplôme + 1 an d’expérience" desc="OU 5 ans d’expérience sans diplôme" />
          <EligibilityCard title="Stage signé" desc="Obligatoire avec une entreprise américaine éligible" />
          <EligibilityCard title="Lien direct" desc="Missions en rapport avec ton domaine d’études ou ton parcours" />
        </div>
      </section>

      {/* ===== Simulateur amélioré ===== */}
      <section className="container relative z-10 mx-auto max-w-6xl py-16">
        <div className="rounded-3xl border border-white/40 bg-white/60 p-8 backdrop-blur-md shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900">
            💰 Simulateur de frais officiels
          </h2>
          <p className="mt-2 text-slate-600">
            Ajuste la durée de ton programme pour voir combien prévoir.
          </p>

          <div className="mt-8">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Durée :{" "}
              <span className="text-[#0FB5AE] font-semibold">{months} mois</span>
            </label>
            <input
              type="range"
              min={6}
              max={18}
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
                <li>Bien aligner le stage avec ton domaine</li>
                <li>Préparer ton entretien consulaire</li>
                <li>Anticiper budget et logement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Délais & Carence ===== */}
      <section className="container relative z-10 mx-auto max-w-6xl py-16">
        <h2 className="text-2xl font-bold text-slate-900">Délais à prévoir</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <DelayCard
            title="Délai classique"
            badge="~10 jours ouvrés"
            desc="Après validation du dossier complet, le sponsor émet le DS-2019 sous environ 10 jours."
          />
          <DelayCard
            title="Procédure express"
            badge="~72 h ouvrées"
            desc="Une option express peut réduire le délai sponsor à environ 72h ouvrées."
          />
        </div>
        <div className="mt-10 rounded-xl border border-white/40 bg-white/50 p-6 backdrop-blur-md">
          <h3 className="text-lg font-semibold text-slate-900">
            Règles de carence
          </h3>
          <p className="mt-2 text-sm text-slate-700">
            Après un J-1 Trainee, il faut attendre <strong>2 ans</strong> avant
            de pouvoir en redemander un autre.  
            Entre un J-1 Intern et un J-1 Trainee : même règle, 2 ans minimum de
            retour au pays.
          </p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="container relative z-10 mx-auto max-w-6xl py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">FAQ</h2>
        <div className="divide-y divide-slate-200 rounded-xl border border-white/40 bg-white/50 backdrop-blur-md">
          {[ 
            {
              q: "Quelle est la différence entre Intern et Trainee ?",
              a: "Intern : étudiants ou jeunes diplômés (-12 mois). Trainee : pros diplômés + expérience, ou 5 ans d’expérience sans diplôme.",
            },
            {
              q: "Puis-je rester aux USA après mon stage ?",
              a: "Une période de grâce peut être prévue. On t’explique ce qui est possible selon ton sponsor.",
            },
            {
              q: "Quels documents dois-je fournir ?",
              a: "Identité, diplômes ou preuves d’expérience, offre de stage, DS-7002. Pas besoin d’originaux ni de test TOEIC.",
            },
          ].map((item) => (
            <details key={item.q} className="p-5 group">
              <summary className="cursor-pointer list-none font-medium text-slate-900 group-hover:underline">
                {item.q}
              </summary>
              <p className="mt-2 text-sm text-slate-700">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ===== CTA final ===== */}
      <section className="relative z-10">
        <div className="container mx-auto max-w-6xl py-16 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Prêt à booster ta carrière avec un J-1 Trainee ?
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
            Être contacté
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

function EligibilityCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-white/40 bg-white/50 p-5 backdrop-blur-md shadow">
      <div className="font-semibold text-slate-900">{title}</div>
      <p className="mt-1 text-sm text-slate-700">{desc}</p>
    </div>
  );
}

function DelayCard({
  title,
  badge,
  desc,
}: {
  title: string;
  badge: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-white/40 bg-white/50 p-6 backdrop-blur-md shadow">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <span className="rounded-full bg-[#0FB5AE]/10 text-[#0FB5AE] px-3 py-1 text-xs font-medium">
          {badge}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-700">{desc}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-700">{label}</span>
      <span className="tabular-nums font-semibold text-slate-900">{value}</span>
    </div>
  );
}
