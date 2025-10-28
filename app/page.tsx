// app/page.tsx
import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Visa J-1 (Intern, Trainee, SWT) — Accompagnement complet | Exatlantik",
  description:
    "Exatlantik t’accompagne pour obtenir ton visa J-1 : éligibilité, sponsor, DS-2019, entretien consulaire. Programmes Intern, Trainee, Summer Work Travel.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Visa J-1 (Intern, Trainee, SWT) — Accompagnement complet | Exatlantik",
    description:
      "Éligibilité en <24h, dossier fluide, étapes claires. Programmes Intern, Trainee, SWT.",
    url: "https://www.exactlantic.com",
    siteName: "Exatlantik",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <HomeClient />;
}
