import type { Metadata } from 'next';
import { PageLegale } from '@/components/layout/PageLegale';
import { ACompleter } from '@/components/ui/Demo';

export const metadata: Metadata = {
  title: 'Confidentialité',
  alternates: { canonical: '/confidentialite' },
  robots: { index: false },
};

export default function Confidentialite() {
  return (
    <PageLegale titre={['Confidentialité']} intro="Ce que le site fait, et ne fait pas, de vos informations."
      sections={[
        { t: 'Formulaires', c: <><p>Les formulaires (rendez-vous, inscription, contact) ne transmettent rien à un serveur : ils rédigent un message que vous choisissez ou non d’envoyer par WhatsApp.</p><p>Une fois envoyé, ce message est traité par l’équipe Das’hair uniquement pour vous répondre.</p></> },
        { t: 'Votre sélection de produits', c: <p>La liste des produits que vous ajoutez est gardée dans votre navigateur, sur votre appareil. Vous pouvez la vider à tout moment.</p> },
        { t: 'Mesure d’audience', c: <p>Le site peut compter des actions anonymes (page vue, clic sur « Réserver »). Aucune donnée personnelle (nom, téléphone, message) n’est mesurée. Cette mesure ne fonctionne qu’avec votre accord (voir la politique de cookies).</p> },
        { t: 'Vos droits', c: <p>Pour toute demande sur vos données, écrivez à Das’hair : <ACompleter>adresse e-mail de contact</ACompleter>.</p> },
      ]} />
  );
}
