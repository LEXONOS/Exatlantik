"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ShieldCheck,
  Clock3,
  Users,
  Globe2,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
} from "lucide-react";

const brand = {
  teal: "#0FB5AE",
  navy: "#0C3836",
  indigo: "#4F46E5",
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

type Benefit = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const benefits: Benefit[] = [
  {
    title: "Conformité & sécurité",
    description:
      "Dossiers structurés, coordination avec les sponsors agréés et respect du cadre J-1 pour protéger votre structure.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Gain de temps",
    description:
      "Nous cadrons le besoin, centralisons les pièces et suivons les échanges : vous restez concentré sur votre activité.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Un seul interlocuteur",
    description:
      "Un point de contact unique FR/EN pour votre équipe, le candidat et le sponsor.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Attractivité internationale",
    description:
      "Valorisez votre marque employeur en intégrant des talents internationaux motivés et encadrés.",
    icon: <Globe2 className="h-5 w-5" />,
  },
];

const hostSectors: string[] = [
  "Hôtellerie & restauration",
  "Tourisme & loisirs",
  "Agences & groupes hôteliers",
  "Communication, marketing, digital",
  "Finance, comptabilité, audit",
  "Tech & IT",
  "Ingénierie & bureaux d'études",
  "Retail & e-commerce",
  "Startups & PME en croissance",
];

const hostConditions: string[] = [
  "Disposer d’un mentor / référent dédié",
  "Proposer des missions formatrices et structurées",
  "Offrir un environnement professionnel stable",
  "Respecter la réglementation J-1 et les guidelines du sponsor",
];

const exatlantikTasks: string[] = [
  "Cadrage du besoin et validation de l’éligibilité J-1",
  "Structuration du plan de formation (DS-7002) avec le sponsor",
  "Checklist documentaire claire pour votre équipe",
  "Interface entre entreprise, candidat et sponsor agréé",
  "Suivi jusqu’à l’obtention du visa (en lien avec le sponsor)",
  "Support FR/EN pendant toute la préparation",
];

const companyTasks: string[] = [
  "Définir les missions, objectifs et encadrement du candidat",
  "Fournir les informations et documents requis",
  "Assurer l’intégration et le suivi quotidien du talent J-1",
  "Respecter le programme validé avec le sponsor",
];

type Step = {
  label: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    label: "Étape 1",
    title: "Call de cadrage — 15 minutes",
    description:
      "Vous nous présentez votre besoin ou votre candidat. Nous validons ensemble la faisabilité J-1 et le type de programme adapté.",
  },
  {
    label: "Étape 2",
    title: "Montage & validation du dossier",
    description:
      "Nous coordonnons la préparation du DS-7002 avec le sponsor, guidons votre équipe et le candidat sur chaque document attendu.",
  },
  {
    label: "Étape 3",
    title: "Visa, arrivée & suivi",
    description:
      "Le sponsor gère la validation finale et le suivi réglementaire. Nous restons disponibles en support opérationnel jusqu’à l’arrivée.",
  },
];

type Case = {
  sector: string;
  location: string;
  duration: string;
  profile: string;
  result: string;
};

const cases: Case[] = [
  {
    sector: "Hôtellerie 4★ — Côte Est",
    location: "États-Unis",
    duration: "12 mois — Programme Trainee",
    profile: "Jeune manager F&B européen",
    result:
      "Structuration du plan de formation, coordination sponsor, arrivée sécurisée. L’établissement a pérennisé le poste à l’issue du J-1.",
  },
  {
    sector: "Agence marketing digitale",
    location: "Ouest des États-Unis",
    duration: "6 mois — Programme Intern",
    profile: "Étudiante en communication & social media",
    result:
      "Missions cadrées, reporting mensuel, montée en compétence rapide. L’agence a renforcé son image internationale auprès de ses clients.",
  },
];

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "Quelles sont les conditions pour devenir entreprise hôte J-1 ?",
    answer:
      "Avoir une structure légalement établie aux États-Unis, offrir des missions formatrices, nommer un mentor et respecter le cadre défini avec le sponsor agréé.",
  },
  {
    question: "Quelles sont nos responsabilités légales en tant qu’entreprise hôte ?",
    answer:
      "Vous encadrez le participant au quotidien, respectez le plan validé, signalez les changements importants et respectez les lois locales. Le sponsor reste responsable du suivi réglementaire J-1.",
  },
  {
    question: "Exatlantik est-il sponsor J-1 ?",
    answer:
      "Non. Exatlantik agit comme interface entre votre entreprise, le candidat et les sponsors J-1 agréés. Nous facilitons, structurons et sécurisons le parcours.",
  },
  {
    question: "Quel niveau de rémunération proposer ?",
    answer:
      "La rémunération dépend du programme, du niveau et de la localisation. Nous vous indiquons des fourchettes cohérentes et conformes aux attentes des sponsors.",
  },
  {
    question: "Quels sont les délais moyens pour accueillir un candidat J-1 ?",
    answer:
      "En moyenne 6 à 10 semaines entre le cadrage et l’arrivée, selon la réactivité de chacun et les délais consulaires. Nous aidons à sécuriser chaque étape.",
  },
  {
    question: "Comment démarrer avec Exatlantik ?",
    answer:
      "Deux options : vous avez déjà un candidat et nous structurons le dossier, ou vous explorez la possibilité de devenir entreprise hôte via un call de 15 minutes.",
  },
];

export default function EntreprisesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(90%_80%_at_0%_0%,#0FB5AE15,transparent),radial-gradient(80%_70%_at_100%_0%,#4F46E515,transparent),radial-gradient(70%_60%_at_0%_100%,#0C383610,transparent)]"
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        {/* HERO */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(260px,2fr)] lg:items-center"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-slate-950/70 px-3 py-1 text-xs font-medium text-teal-300/90 backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Accompagnement J-1 dédié aux entreprises hôtes</span>
            </div>

            <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
              Accueillir un talent international en J-1, sans complexité.
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Exatlantik simplifie la mise en place de votre programme J-1 :
              cadrage, coordination avec les sponsors agréés, dossiers complets
              et communication fluide. Vous gagnez un talent, pas de la
              paperasse.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="https://tally.so/r/wkL1Vd"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-teal-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-teal-500/30 transition hover:bg-teal-300"
              >
                J&apos;ai déjà un candidat
                <ArrowRight className="h-4 w-4" />
              </motion.a>

              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="https://calendly.com/louismcrenault/30min/2025-09-25T16:30:00+02:00"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-teal-500/40 bg-slate-950/60 px-4 py-2.5 text-sm font-semibold text-teal-300 backdrop-blur transition hover:border-teal-400 hover:text-teal-200"
              >
                Je veux devenir entreprise hôte
                <PhoneCall className="h-4 w-4" />
              </motion.a>
            </div>

            <div className="flex flex-wrap gap-3 text-[11px] text-slate-300/90">
              <ReassurancePill label="Conformité J-1 (avec sponsors agréés)" />
              <ReassurancePill label="Support FR / EN" />
              <ReassurancePill label="Process clair & documenté" />
              <ReassurancePill label="Un interlocuteur unique" />
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-3xl bg-gradient-to-br from-teal-500/20 via-indigo-500/10 to-transparent blur-2xl" />
            <div className="flex h-full flex-col justify-between rounded-3xl border border-slate-800/80 bg-slate-950/70 p-5 shadow-[0_18px_60px_rgba(15,181,174,0.15)] backdrop-blur">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal-300">
                Vue entreprise
              </h2>
              <p className="mb-4 text-xs text-slate-300">
                Nous intervenons comme interface opérationnelle entre :
              </p>
              <ul className="mb-4 space-y-2 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-teal-400" />
                  <span>Votre équipe (RH, manager, direction)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-teal-400" />
                  <span>Le candidat (Intern / Trainee / SWT, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-teal-400" />
                  <span>
                    Les sponsors J-1 agréés, pour la validation réglementaire.
                  </span>
                </li>
              </ul>
              <div className="mt-auto rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-3 text-[10px] text-slate-300">
                <p className="font-medium text-teal-300">
                  Résultat : un parcours balisé, sans surprise.
                </p>
                <p className="mt-1">
                  Vous savez qui fait quoi, à chaque étape. Nous ne remplaçons
                  pas le sponsor officiel : nous vous permettons de gagner en
                  clarté, en temps et en sécurité.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* BENEFITS */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="space-y-4"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
              Ce que vous gagnez avec Exatlantik.
            </h2>
            <p className="hidden max-w-md text-xs text-slate-400 sm:block">
              Une approche pensée pour les dirigeants et RH qui veulent un
              dispositif J-1 structuré, sans alourdir leurs équipes.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {benefits.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col gap-2 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 text-sm shadow-[0_14px_40px_rgba(15,15,30,0.45)] backdrop-blur-md"
              >
                <div className="flex items-center gap-2 text-teal-300">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-500/10 text-teal-300">
                    {item.icon}
                  </span>
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* WHO CAN HOST */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="grid gap-6 rounded-3xl border border-slate-900/80 bg-slate-950/80 p-5 backdrop-blur lg:grid-cols-[minmax(0,3fr)_minmax(260px,2fr)]"
        >
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-50">
              Qui peut devenir entreprise hôte J-1 ?
            </h2>
            <p className="text-xs text-slate-300">
              Nous travaillons avec des structures sérieuses, capables
              d&apos;offrir un environnement formateur et conforme aux attentes
              des sponsors.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {hostSectors.map((sector) => (
                <span
                  key={sector}
                  className="rounded-full border border-slate-800 bg-slate-950/80 px-2.5 py-1 text-[10px] text-slate-300"
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 rounded-2xl bg-slate-900/70 p-4 text-xs text-slate-300">
            <p className="mb-1 text-[11px] font-semibold text-teal-300">
              Conditions clés à réunir :
            </p>
            <ul className="space-y-1.5">
              {hostConditions.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-teal-400" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* WHO DOES WHAT */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold text-slate-50">
            Qui fait quoi ? Un cadre simple et lisible.
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-teal-500/30 bg-slate-950/80 p-4 text-xs text-slate-200">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-teal-300">
                Exatlantik — votre interface opérationnelle
              </h3>
              <ul className="space-y-1.5">
                {exatlantikTasks.map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3 w-3 text-teal-400" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-200">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-100">
                Votre entreprise — un engagement raisonnable
              </h3>
              <ul className="space-y-1.5">
                {companyTasks.map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3 w-3 text-slate-500" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[10px] text-slate-400">
                L&apos;objectif : vous concentrer sur l&apos;accueil et la
                montée en compétence, pas sur la navigation réglementaire.
              </p>
            </div>
          </div>
        </motion.section>

        {/* TIMELINE */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold text-slate-50">
            Un process balisé, en trois étapes.
          </h2>
          <div className="relative grid gap-4 md:grid-cols-3">
            <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-teal-500/40 via-slate-700/40 to-transparent md:block" />
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={fadeInUp}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="relative flex flex-col gap-2 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs text-slate-300"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/15 text-[10px] font-semibold text-teal-300">
                    {index + 1}
                  </span>
                  <p className="text-[10px] font-medium text-teal-300">
                    {step.label}
                  </p>
                </div>
                <h3 className="text-sm font-semibold text-slate-50">
                  {step.title}
                </h3>
                <p className="leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CASE STUDIES */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="space-y-3"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-semibold text-slate-50">
              Cas pratiques (exemples anonymisés).
            </h2>
            <p className="hidden text-[10px] text-slate-400 sm:block">
              Des situations réelles qui illustrent le cadre J-1 accompagné par
              Exatlantik.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {cases.map((c) => (
              <div
                key={c.sector + c.duration}
                className="flex h-full flex-col gap-1.5 rounded-2xl border border-slate-800/80 bg-slate-950/85 p-4 text-[10px] text-slate-300 backdrop-blur"
              >
                <p className="text-[11px] font-semibold text-teal-300">
                  {c.sector}
                </p>
                <p className="text-[10px] text-slate-400">
                  {c.location} · {c.duration}
                </p>
                <p className="mt-1">
                  <span className="font-semibold text-slate-100">
                    Profil :
                  </span>{" "}
                  {c.profile}
                </p>
                <p className="mt-1 leading-relaxed">
                  <span className="font-semibold text-slate-100">
                    Résultat :
                  </span>{" "}
                  {c.result}
                </p>
              </div>
            ))}
            <div className="flex flex-col justify-between gap-2 rounded-2xl border border-dashed border-slate-700/80 bg-slate-950/60 p-4 text-[10px] text-slate-400">
              <p>
                Vous souhaitez voir si votre projet entre dans le cadre
                réglementaire J-1 ?
              </p>
              <p className="text-slate-300">
                Utilisez le call de 15 minutes pour valider en direct la
                faisabilité avec Exatlantik.
              </p>
              <Link
                href="https://calendly.com/louismcrenault/30min/2025-09-25T16:30:00+02:00"
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-teal-300 hover:text-teal-200"
              >
                Planifier un échange rapide
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="space-y-3"
        >
          <h2 className="text-lg font-semibold text-slate-50">
            FAQ Entreprises.
          </h2>
          <div className="grid gap-2 md:grid-cols-2">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-slate-800/90 bg-slate-950/85 p-3 text-[10px] text-slate-300 backdrop-blur"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[11px] font-semibold text-slate-100">
                  <span>{item.question}</span>
                  <span className="ml-2 flex h-4 w-4 items-center justify-center rounded-full border border-slate-600 text-[9px] text-slate-400 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2 leading-relaxed text-slate-300">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </motion.section>

        {/* FINAL CTA */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mt-4 rounded-3xl border border-teal-500/25 bg-gradient-to-r from-slate-950/95 via-slate-950/90 to-slate-900/95 p-5 text-sm text-slate-200 shadow-[0_18px_70px_rgba(4,120,87,0.18)] backdrop-blur"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-base font-semibold text-teal-300">
                Valider votre projet J-1 en 15 minutes.
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                Présentez-nous votre situation (avec ou sans candidat identifié).
                Nous vous donnons une réponse claire sur la faisabilité, les
                étapes et le rôle d’Exatlantik.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://calendly.com/louismcrenault/30min/2025-09-25T16:30:00+02:00"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-teal-400 px-4 py-2.5 text-xs font-semibold text-slate-950 shadow-lg shadow-teal-500/30 transition hover:bg-teal-300"
              >
                Planifier un call de 15 minutes
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://tally.so/r/wkL1Vd"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:border-teal-500/40 hover:text-teal-200"
              >
                Soumettre un besoin / candidat
              </a>
            </div>
          </div>
        </motion.section>
      </div>

      <JsonLd />
    </main>
  );
}

function ReassurancePill({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-slate-800/80 bg-slate-950/80 px-2.5 py-1 backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
      <span>{label}</span>
    </div>
  );
}

function JsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Exatlantik",
    url: "https://exatlantik.com/",
    logo: "https://exatlantik.com/og.jpeg",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "partners@exatlantik.com",
        availableLanguage: ["English", "French"],
      },
    ],
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Accompagnement entreprises hôtes J-1",
    provider: { "@type": "Organization", name: "Exatlantik" },
    description:
      "Interface opérationnelle entre entreprises hôtes, candidats et sponsors J-1 agréés pour des programmes Intern, Trainee et Summer Work Travel.",
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: "Support et structuration de dossiers J-1",
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
