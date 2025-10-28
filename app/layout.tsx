// FILE: app/(site)/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/lib/components/Header";
import Footer from "@/lib/components/Footer";
import CookieBanner from "@/lib/components/CookieBanner";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.exatlantik.com"),
  title: {
    default: "Exatlantik — Visas J-1 & placements USA (FR)",
    template: "%s — Exatlantik",
  },
  description:
    "Exatlantik accompagne les étudiants et jeunes pros en France pour partir aux États-Unis : programmes J-1 (Intern, Trainee, SWT), placement en entreprise et démarches administratives.",
  openGraph: {
    title: "Exatlantik — Visas J-1 & placements USA (FR)",
    description:
      "Programmes J-1 (Intern, Trainee, Job d’été), placement + démarches visa claires et rapides. Transparence totale des coûts et délais.",
    url: "https://www.exatlantik.com",
    siteName: "Exatlantik",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const baseUrl = "https://www.exatlantik.com";

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Exatlantik",
    url: baseUrl,
    logo: `${baseUrl}/icon.png`,
    sameAs: [
      // ajoute tes réseaux si dispo
      // "https://www.linkedin.com/company/exatlantik",
      // "https://www.instagram.com/exatlantik",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        availableLanguage: ["French", "English"],
      },
    ],
  };

  const siteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Exatlantik",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        {/* Tally embed */}
        <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />

        {/* JSON-LD: Organization */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />

        {/* JSON-LD: WebSite (avec SearchAction vers /blog) */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-brand-teal/20 selection:text-brand-graphite">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}

