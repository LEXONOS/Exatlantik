// FILE: app/programmes/Camp/CampClient.tsx
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

/* =========================
   PAGE CLIENT – CAMP COUNSELOR
   ========================= */
export default function CampClient() {
  /* ---------- FAQ JSON-LD ---------- */
  const faqJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Qui peut demander un visa J-1 Camp Counselor ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Le programme Camp Counselor est destiné aux étudiants et jeunes adultes avec un bon niveau d’anglais et une première expérience avec des enfants ou en animation (colonies, centres de loisirs, baby-sitting, BAFA, etc.).",
          },
        },
        {
          "@type": "Question",
          name: "Combien de temps dure le programme Camp Counselor ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "La plupart des camps durent entre 8 et 12 semaines, généralement de juin à fin août. Une période de grâce de 30 jours peut te permettre de voyager après la fin de ton contrat.",
          },
        },
        {
          "@type": "Question",
          name: "Logement et repas sont-ils inclus au camp ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Oui, dans la majorité des cas, tu es logé(e) sur place dans le camp et les repas sont inclus. Ton salaire devient alors principalement de l’argent de poche pour tes voyages et activités.",
          },
        },
      ],
    }),
    []
  );

  /* ---------- Simulateur de budget ---------- */
  const [weeks, setWeeks] = useState(10);
  const weeklyStipend = 250; // estimation moyenne en dollars
  const estimatedPocketMoney = weeks * weeklyStipend;

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
              Visa J-1 Camp Counselor — Vivre et travailler dans un summer camp
            </h1>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Le <strong>visa J-1 Camp Counselor</strong> te permet de travailler
              dans un <strong>camp de vacances aux États-Unis</strong> en tant
              qu’animateur·rice, encadrant·e ou moniteur·rice. Tu vis sur place,
              tu encadres des activités, tu progressses en anglais et tu
              construis une expérience humaine très forte.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img
              src="https://images.unsplash.com/photo-1569429594956-0cbe485b9caa?q=80&w=1200&auto=format&fit=crop"
              alt="Summer camp aux États-Unis"
              className="rounded-2xl border border-white/50 bg-white/30 backdrop-blur-md shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ===== Présentation du programme ===== */}
      <section className="container relative z-10 mx-auto max-w-6xl py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">
              Qu’est-ce que le visa J-1 Camp Counselor ?
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Ce programme est fait pour les{" "}
              <strong>étudiants et jeunes diplômés</strong> qui aiment encadrer,
              animer et travailler en équipe. Tu rejoins un{" "}
              <strong>summer camp américain</strong> et tu participes à la vie
              du camp : activités sportives, artistiques, plein air, veillées…
            </p>
            <p className="text-slate-700 leading-relaxed">
              Tu es généralement <strong>logé(e) et nourri(e) sur place</strong>,
              ce qui te permet de conserver une grande partie de ton salaire
              comme <strong>argent de poche</strong> pour voyager avant ou après
              le camp.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Exatlantik t’aide à comprendre les{" "}
              <strong>conditions d’éligibilité</strong>, à préparer ton{" "}
              <strong>dossier avec le sponsor J-1</strong> et à anticiper les
              étapes clés : placement en camp, entretien consulaire, départ,
              arrivée, et fin de programme.
            </p>
          </div>

          <div className="rounded-2xl border border-white/40 bg-white/60 p-6 backdrop-blur-md shadow">
            <h3 className="font-semibold text-slate-900">
              Profil idéal pour le Camp Counselor
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li>Tu as entre 18 et 28 ans (souvent un peu de flexibilité).</li>
              <li>
                Tu as une première expérience avec des enfants ou ados (animation,
                BAFA, scoutisme, baby-sitting…).
              </li>
              <li>Tu peux te rendre disponible tout l’été (8 à 12 semaines).</li>
              <li>Tu as un niveau d’anglais solide pour communiquer au camp.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Simulateur « argent de poche » ===== */}
      <section className="container relative z-10 mx-auto max-w-6xl py-16">
        <div className="rounded-3xl border border-white/40 bg-white/60 p-8 backdrop-blur-md shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900">
            💰 Estimation de ton argent de poche au camp
          </h2>
          <p className="mt-2 text-slate-600">
            Les camps versent généralement un{" "}
            <strong>stipend hebdomadaire</strong>. Ici, on part sur une
            estimation moyenne pour te donner un ordre d’idée.
          </p>

          <div className="mt-8">
            <label className="mb-3 block text-sm font-medium text-slate-700">
              Durée du camp :{" "}
              <span className="text-[#0FB5AE] font-semibold">
                {weeks} semaines
              </span>
            </label>
            <input
              type="range"
              min={8}
              max={12}
              value={weeks}
              onChange={(e) => setWeeks(parseInt(e.target.value))}
              className="w-full cursor-pointer accent-[#0FB5AE]"
            />

            <motion.div
              key={weeks}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mt-4 text-4xl font-extrabold text-slate-900"
            >
              ~${estimatedPocketMoney.toLocaleString("en-US")}
            </motion.div>

            <p className="mt-2 text-sm text-slate-600 italic">
              Basé sur un stipend moyen estimé à ${weeklyStipend}/semaine.
              Le logement et les repas étant généralement inclus, ce montant
              correspond surtout à ton argent disponible pour tes activités
              et voyages.
            </p>
          </div>

          <div className="mt-6 grid gap-6 text-sm text-slate-700 md:grid-cols-2">
            <div>
              <Row label="Durée estimée" value={`${weeks} semaines`} />
              <Row
                label="Stipend hebdomadaire estimé"
                value={`$${weeklyStipend}`}
              />
              <Row
                label="Total estimé"
                value={`$${estimatedPocketMoney.toLocaleString("en-US")}`}
              />
            </div>
            <div className="rounded-xl border border-white/30 bg-white/50 p-4 backdrop-blur-md">
              <h3 className="font-semibold text-slate-900">
                Ce que l’on regarde avec toi
              </h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Ton niveau d’anglais et ton aisance à l’oral.</li>
                <li>Ton expérience avec des enfants ou en animation.</li>
                <li>Ton calendrier (disponibilités été).</li>
                <li>
                  Le type de camp qui te correspond (sport, plein air, artistique…).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA final ===== */}
      <section className="relative z-10">
        <div className="container mx-auto max-w-6xl py-16 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Tu veux partir en summer camp avec le visa J-1 Camp Counselor ?
          </h2>
          <p className="mt-2 text-slate-600">
            On vérifie ton éligibilité, on t’explique le fonctionnement des
            camps et on t’aide à structurer ton projet de A à Z.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r 
                       from-[#0FB5AE] to-cyan-500 px-7 py-3 text-lg font-semibold text-white 
                       shadow-lg transition-all duration-300 hover:from-cyan-500 hover:to-[#0FB5AE] hover:shadow-cyan-400/50"
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
      <div className="absolute bottom-[-160px] left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[100px]" />
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
