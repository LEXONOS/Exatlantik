export default function TrustBar(){
  return (
    <div className="bg-brand-cloud/60 border-y border-slate-200">
      <div className="container py-3 text-xs md:text-sm flex flex-wrap gap-3 items-center justify-center">
        <span className="badge">Réponse {'<'} 24 h</span>
        <span className="badge">Transparence des frais</span>
        <span className="badge">Explications simples</span>
      </div>
    </div>
  );
}
