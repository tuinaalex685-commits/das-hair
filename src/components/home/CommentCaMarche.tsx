import { Faq } from '@/components/ui/Faq';
import { BoutonWhatsApp } from '@/components/ui/BoutonWhatsApp';

const ETAPES = [
  { titre: 'Vous choisissez', texte: 'Un soin, des produits ou une formation, directement sur le site ou avec le diagnostic.' },
  { titre: 'Le message se prépare', texte: 'Votre demande est rédigée pour vous, avec vos choix et vos quantités. Vous l’envoyez sur WhatsApp.' },
  { titre: 'L’équipe confirme', texte: 'Disponibilité, date du rendez-vous, retrait ou livraison : tout est validé avec vous avant de payer.' },
];

/** Lever les freins : comment se passe une demande, et les questions qu'on se pose avant d'écrire. */
export function CommentCaMarche() {
  return (
    <section aria-labelledby="comment" className="section bg-fond-2">
      <div className="conteneur">
        <h2 id="comment" className="titre max-w-3xl text-[clamp(2.6rem,5vw,4.6rem)]">
          Simple, <span className="accent">du premier message</span> au rendez-vous.
        </h2>
        <ol className="mt-14 grid gap-4 md:grid-cols-3">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="relative rounded-[var(--radius-carte)] bg-surface p-7 lg:p-9">
              <span className="titre chiffres text-[3.4rem] text-indigo">{i + 1}</span>
              <h3 className="mt-6 text-[1.3rem] font-bold">{e.titre}</h3>
              <p className="mt-2 text-sourdine">{e.texte}</p>
            </li>
          ))}
        </ol>

        <div className="mt-24 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="titre text-[clamp(2.2rem,3.6vw,3.2rem)]">Vos questions</h2>
            <p className="mt-4 max-w-sm text-sourdine">Une autre question&nbsp;? L’équipe vous répond directement.</p>
            <BoutonWhatsApp className="mt-8" evenement="whatsapp_click" item="faq" titre="Votre question est prête"
              message="Bonjour Das'hair, j'ai une question : ">Poser ma question</BoutonWhatsApp>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq questions={[
              { q: 'Faut-il prendre rendez-vous pour une prestation ?', r: 'Oui. Choisissez la prestation, envoyez la demande préparée, et l’équipe vous propose un créneau. Rien n’est réservé tant qu’elle n’a pas confirmé.' },
              { q: 'Comment savoir quel soin ou quel produit me convient ?', r: 'Utilisez le diagnostic plus haut, ou décrivez votre cheveu et votre peau dans votre message : l’équipe vous oriente avant toute commande ou réservation.' },
              { q: 'Comment se passent le paiement et la livraison ?', r: 'Les moyens de paiement, le retrait et la livraison seront précisés par Das’hair. Dans ce prototype, ils restent à confirmer.' },
              { q: 'Les formations donnent-elles un diplôme ?', r: 'Les formations sont pratiques et en présentiel. Le type d’attestation remise en fin de formation sera précisé par Das’hair ; aucun diplôme d’État n’est annoncé ici.' },
            ]} />
          </div>
        </div>
      </div>
    </section>
  );
}
