export function Pillars(){
  const items = [
    { title: "Clair & conforme", desc: "Coordination avec des organismes accrédités (pas de conseil juridique)." },
    { title: "Placement réel", desc: "2–3 entretiens garantis pour profils plaçables." },
    { title: "Suivi A→Z", desc: "DS‑7002, dossier sponsor, consulat, pré‑départ." },
  ];
  return (
    <section className="bg-white">
      <div className="container grid md:grid-cols-3 gap-6">
        {items.map((it,i)=> (
          <div key={i} className="card">
            <div className="font-semibold text-navy">{it.title}</div>
            <p className="mt-2 text-sm">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
