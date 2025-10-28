import StepsClient from "./StepsClient";

export const metadata = {
  title: "Étapes du visa J-1 — parcours complet & accompagnement | Exatlantik",
  description:
    "Le parcours du visa J-1 expliqué clairement : éligibilité, offre & DS-7002, dossier sponsor & DS-2019, SEVIS/MRV & DS-160, entretien consulaire. Exatlantik vous accompagne à chaque étape.",
};

export default function Page() {
  // JSON-LD HowTo (SEO)
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Obtenir un visa J-1 avec Exatlantik",
    description:
      "Parcours pas-à-pas : élaboration du plan de formation, validation sponsor, paiement SEVIS/MRV, DS-160, entretien consulaire.",
    totalTime: "P1M",
    step: [
      {
        "@type": "HowToStep",
        name: "Vérifier l’éligibilité",
        url: "https://www.exatlantik.com/process#step-1",
        itemListElement: [
          { "@type": "HowToDirection", text: "Formulaire d’éligibilité en ligne" },
          { "@type": "HowToDirection", text: "Call de cadrage (10–15 min)" },
        ],
      },
      {
        "@type": "HowToStep",
        name: "Offre & DS-7002",
        url: "https://www.exatlantik.com/process#step-2",
        itemListElement: [
          { "@type": "HowToDirection", text: "Offre d’accueil signée" },
          { "@type": "HowToDirection", text: "Plan de formation DS-7002" },
        ],
      },
      {
        "@type": "HowToStep",
        name: "Dossier sponsor & DS-2019",
        url: "https://www.exatlantik.com/process#step-3",
        itemListElement: [
          { "@type": "HowToDirection", text: "Soumission au sponsor" },
          { "@type": "HowToDirection", text: "Émission du DS-2019" },
        ],
      },
      {
        "@type": "HowToStep",
        name: "SEVIS/MRV & DS-160",
        url: "https://www.exatlantik.com/process#step-4",
        itemListElement: [
          { "@type": "HowToDirection", text: "Paiement SEVIS I-901" },
          { "@type": "HowToDirection", text: "Frais MRV + DS-160" },
        ],
      },
      {
        "@type": "HowToStep",
        name: "Entretien au consulat",
        url: "https://www.exatlantik.com/process#step-5",
        itemListElement: [
          { "@type": "HowToDirection", text: "Préparation à l’entretien" },
          { "@type": "HowToDirection", text: "Récupération du passeport visé" },
        ],
      },
    ],
  };

  return (
    <>
      <StepsClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }}
      />
    </>
  );
}
