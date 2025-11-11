export default function Page() {
  return (
    <section className="container py-16 max-w-3xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">
        Contact & Test d’éligibilité Visa J-1
      </h1>
      <p className="text-lg text-slate-600 mb-6">
        Une question sur ton projet aux États-Unis ? 
        Commence par notre <strong>test d’éligibilité</strong> : 
        gratuit, rapide ({"<"}3 minutes) et sans engagement.  
        Tu recevras une réponse personnalisée sous <strong>24 h ouvrées</strong>.
      </p>

      <div id="eligibilite" className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
        <iframe
          src="https://tally.so/r/wkL1Vd"
          width="100%" 
          height="700"
          frameBorder="0"
          title="Test d’éligibilité — Exatlantik"
          className="rounded-lg"
        ></iframe>
      </div>

      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Autres moyens de contact
        </h2>
        <p className="text-slate-600">
          Si tu préfères, tu peux aussi nous écrire ou réserver un rendez-vous rapide :
        </p>
        <ul className="list-disc ml-6 text-slate-700">
          <li>
            📧 <a href="mailto:hello@exatlantik.com" className="text-teal-600 hover:underline">
              hello@exatlantik.com
            </a>
          </li>
          <li>
            📅 <a href="https://calendly.com/louismcrenault/30min/2025-09-25T16:30:00+02:00" target="_blank" className="text-teal-600 hover:underline">
              Réserver un appel de 15 min
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-12 bg-slate-50 rounded-lg p-6 border border-slate-200">
        <h3 className="text-xl font-semibold mb-3">🔒 Confidentialité</h3>
        <p className="text-slate-600">
          Tes données restent confidentielles. Elles sont utilisées uniquement pour analyser ton projet de Visa J-1 
          et ne sont jamais revendues. Conformément au <strong>RGPD</strong>, tu peux demander la suppression à tout moment.
        </p>
      </div>
    </section>
  );
}
