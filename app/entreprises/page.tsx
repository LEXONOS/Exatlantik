// FILE: app/entreprises/page.tsx
import type { Metadata } from "next";
import EntreprisesClient from "./EntreprisesClient";

export const metadata: Metadata = {
  title: "Entreprises hôtes Visa J-1 — Exatlantik",
  description:
    "Accompagnez vos stagiaires Intern/Trainee en toute simplicité : DS-7002 prêt, conformité garantie, coordination avec sponsor J-1 et point de contact FR/EN.",
  alternates: { canonical: "/entreprises" },
  openGraph: {
    title: "Entreprises hôtes Visa J-1 — Exatlantik",
    description:
      "Intern/Trainee J-1 sans friction : shortlist, DS-7002, sponsor, assurance et suivi. Prise de contact simple.",
    url: "/entreprises",
    type: "website",
    siteName: "Exatlantik",
  },
};

export default function Page() {
  return <EntreprisesClient />;
}
