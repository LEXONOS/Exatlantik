// FILE: app/programmes/page.tsx
import type { Metadata } from "next";
import ProgramsPageClient from "./ProgrammesClient";

export const metadata: Metadata = {
  title: "Programmes J-1 USA — SWT, Intern, Trainee, Camp | Exatlantik",
  description:
    "Comparez clairement les programmes J-1 (Summer Work & Travel, Intern, Trainee, Camp Counselor). Textes concis, critères clés, face-à-face interactif. Accompagnement fiable et conforme.",
  alternates: { canonical: "/programmes" },
  openGraph: {
    title: "Programmes J-1 USA — SWT, Intern, Trainee, Camp | Exatlantik",
    description:
      "Vue d’ensemble moderne et lisible des 4 formats J-1, avec comparatif guidé et conseils d’orientation.",
    url: "https://exatlantik.vercel.app/programmes",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <ProgramsPageClient />;
}
