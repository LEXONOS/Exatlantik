import type { Metadata } from "next";
import TarifsClient from "./TarifsClient";

export const metadata: Metadata = {
  title: "Tarifs & frais officiels — Exatlantik",
  description:
    "Transparence totale : frais officiels (sponsor, SEVIS, MRV, assurance) distincts de nos honoraires d’accompagnement.",
};

export default function Page() {
  return <TarifsClient />;
}
