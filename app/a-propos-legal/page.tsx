export default function Page() {
  return (
    <section className="container py-16 prose prose-slate max-w-3xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        Mentions légales & informations réglementaires
      </h1>

      <p>
        <strong>Exatlantik</strong> est une société d’accompagnement indépendante spécialisée
        dans la préparation et le suivi des dossiers pour les programmes
        <strong> Visa J-1 (Intern, Trainee, Summer Work Travel, Job d’été)</strong>.
        Nous ne sommes pas organisme sponsor J-1, établissement d’enseignement, ni cabinet d’avocats.
        Notre rôle est de faciliter la constitution d’un dossier complet,
        d’expliquer les étapes et de coordonner avec des sponsors reconnus et l’entreprise d’accueil.
        La décision finale appartient exclusivement aux autorités américaines
        (sponsors agréés, consulats et ambassades).
      </p>

      <h2 id="editeur">Éditeur du site</h2>
      <ul>
        <li><strong>Raison sociale :</strong> Exatlantik</li>
        <li><strong>Statut juridique :</strong> [SASU / Micro-entreprise – à préciser]</li>
        <li><strong>Siège social :</strong> [Adresse en France]</li>
        <li><strong>Responsable de la publication :</strong> Louis Renaut</li>
        <li><strong>Email :</strong> <a href="mailto:hello@exatlantik.com">hello@exatlantik.com</a></li>
      </ul>

      <h2 id="hebergeur">Hébergement</h2>
      <p>
        Le site <strong>exatlantik.com</strong> est hébergé par
        <strong> Vercel Inc.,</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
      </p>

      <h2 id="cookies">Cookies & mesure d’audience</h2>
      <p>
        Nous privilégions des solutions respectueuses de la vie privée
        (ex. <strong>Plausible Analytics</strong>) qui ne collectent pas de données personnelles
        ni de cookies de suivi. Si nous activons d’autres services (chat, vidéos externes, outils marketing),
        votre consentement préalable sera systématiquement demandé.
      </p>

      <h2 id="donnees">Protection des données (RGPD)</h2>
      <p>
        Conformément au Règlement Général sur la Protection des Données (RGPD – UE 2016/679),
        Exatlantik collecte uniquement les informations strictement nécessaires au traitement
        des demandes (nom, email, projet de visa). Ces données sont utilisées sur la base de
        l’<strong>intérêt légitime</strong> pour la pré-qualification et avec
        <strong> consentement explicite</strong> pour toute communication marketing.
      </p>
      <p>
        Vous disposez d’un droit d’accès, de rectification et de suppression de vos données.
        Pour exercer vos droits : <a href="mailto:hello@exatlantik.com">hello@exatlantik.com</a>.
      </p>

      <h2 id="responsabilite">Limitation de responsabilité</h2>
      <p>
        Exatlantik s’engage à fournir des informations fiables, claires et à jour.
        Toutefois, les délais et décisions liés au visa relèvent exclusivement des
        <strong> autorités américaines</strong>. En conséquence, Exatlantik ne peut garantir
        l’obtention du visa ni les délais de traitement.
      </p>

      <h2 id="propriete">Propriété intellectuelle</h2>
      <p>
        L’ensemble des contenus du site (textes, graphismes, logos, vidéos, documents PDF)
        est protégé par le droit d’auteur. Toute reproduction, diffusion ou exploitation sans
        autorisation écrite préalable est interdite.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Pour toute question concernant ces mentions légales ou vos données personnelles,
        vous pouvez nous contacter à :<br />
        <a href="mailto:hello@exatlantik.com">hello@exatlantik.com</a>
      </p>
    </section>
  );
}
