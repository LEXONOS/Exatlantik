export default function Reassure(){
  const points = [
    { title: "Clair & transparent", desc: "Frais officiels distincts de nos honoraires. Pas de coûts cachés."},
    { title: "Réponse < 24 h ouvrées", desc: "Tu n’attends pas : on valide ton éligibilité rapidement."},
    { title: "Pas sponsor J‑1", desc: "Nous préparons ton dossier et coordonnons avec des sponsors reconnus."},
  ];
  return (
    <section className="container py-10">
      <div className="grid md:grid-cols-3 gap-4">
        {points.map((p,i)=>(
          <div key={i} className="card p-5 motion-pop" aria-live="polite">
            <div className="font-semibold">{p.title}</div>
            <p className="text-sm text-slate-600 mt-1">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
