import Link from "next/link";

export default function Hero(){
  return (
    <section className="container py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="h1">Partir aux États‑Unis avec le bon <span className="text-brand-teal">Visa J‑1</span></h1>
          <p className="lead mt-4">
            Intern, Trainee, Job d’été (SWT) — on vous accompagne de A à Z : placement en entreprise,
            vérification d’éligibilité, constitution du dossier et prise de rendez‑vous consulaire.
          </p>
          <div className="mt-6 flex gap-3">
            <Link className="btn btn-primary" href="/contact#eligibilite">Tester mon éligibilité</Link>
            <Link className="btn btn-ghost" href="/programmes">Voir les programmes</Link>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Transparence : nous ne sommes pas sponsor J‑1. Le DS‑2019 est émis par un sponsor agréé. Mais nous vous accompagnons dans le processus de A à States
          </p>
        </div>
        <div className="card p-6">
          <ul className="space-y-3">
            <li>✅ Process clair en 5 étapes</li>
            <li>✅ Délai & coûts communiqués dès le départ</li>
            <li>✅ Support humain (FR) par email & visio</li>
            <li>✅ Placement entreprise possible</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
