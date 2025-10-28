export default function FAQ(){
  const items = [
    { q:"Êtes‑vous un sponsor J‑1 ?", a:"Non. Exatlantik n’émet pas de visa et n’est pas organisme sponsor. Nous t’accompagnons pour constituer un dossier complet et nous coordonnons avec des sponsors désignés ainsi qu’avec l’entreprise d’accueil. La décision finale appartient aux autorités américaines."},
    { q:"Quels frais dois‑je prévoir ?", a:"Les frais officiels (sponsor, SEVIS I‑901, rendez‑vous consulaire, assurance) sont distincts de nos honoraires d’accompagnement. On t’affiche tout clairement dès le départ."},
    { q:"En combien de temps puis‑je partir ?", a:"Selon le programme (Intern/Trainee/SWT), la complétude du dossier et les délais consulaires locaux. On te donne une estimation réaliste dès l’appel de qualification."},
  ];
  return (
    <section className="container py-12">
      <h2 className="h2">FAQ</h2>
      <div className="mt-4 divide-y divide-slate-200 border border-slate-200 rounded-2xl">
        {items.map((it,i)=>(
          <details key={i} className="p-5 group">
            <summary className="font-medium cursor-pointer list-none">{it.q}</summary>
            <p className="text-sm text-slate-700 mt-2">{it.a}</p>
          </details>
        ))}
      </div>
      {/* JSON-LD FAQ for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"FAQPage",
        "mainEntity": items.map(it => ({
          "@type":"Question",
          "name": it.q,
          "acceptedAnswer": { "@type":"Answer", "text": it.a }
        }))
      })}}/>
    </section>
  )
}
