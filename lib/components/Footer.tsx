import Link from "next/link";

export default function Footer(){
  return (
    <footer className="mt-16 border-t border-slate-0">
      <div className="container py-8 grid md:grid-cols-3 gap-8">
        <div>
          <div className="font-extrabold text-slate-900">Exactlantic</div>
          <p className="text-sm text-slate-600 mt-2">
            Accompagnement FR pour programmes J‑1 (Intern, Trainee, Job d’été) et placement aux USA.
          </p>
        </div>
        <nav className="text-sm space-y-2">
          <div className="font-semibold">Navigation</div>
          <div><Link href="/">Accueil</Link></div>
          <div><Link href="/programmes">Programmes</Link></div>
          <div><Link href="/entreprises">Entreprises</Link></div>
          <div><Link href="/tarifs">Tarifs</Link></div>
          <div><Link href="/contact">Contact</Link></div>
        </nav>
        <div className="text-xs text-slate-500">
          <div className="font-semibold mb-2">Disclaimers</div>
          <p>
            Exatlantik n’émet pas de visas et n’est pas un sponsor J‑1. Le certificat DS‑2019 est émis par un sponsor
            désigné par le Département d’État US. La décision finale de visa relève du consulat des États‑Unis.
          </p>
          <p className="mt-2"><Link className="underline" href="/a-propos-legal">Mentions & informations légales</Link></p>
        </div>
      </div>
      <div className="text-center py-6 border-t text-xs text-slate-500">
        © {new Date().getFullYear()} Exactlantic. Tous droits réservés.
      </div>
    </footer>
  );
}
