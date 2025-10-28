"use client";
import { useEffect, useState } from "react";

export default function CTASticky(){
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 inset-x-0 px-4 z-40">
      <div className="container">
        <div className="card shadow-lg p-3 flex items-center justify-between gap-3">
          <div className="text-sm">Prêt à vérifier ton éligibilité J-1 ?</div>
          <button
            type="button"
            className="btn btn-primary"
            data-tally-open="wkL1Vd"
            data-tally-overlay="1"
            data-tally-width="700"
            aria-label="Ouvrir le test d’éligibilité J-1"
          >
            Tester maintenant
          </button>
        </div>
      </div>
    </div>
  );
}
