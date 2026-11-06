import type { Metadata } from 'next';
import { Suspense } from 'react';
import { EnTetePage } from '@/components/layout/EnTetePage';
import { ExplorateurBoutique } from '@/components/products/ExplorateurBoutique';
import { SuiviVue } from '@/components/analytics/SuiviVue';
import { BoutonWhatsApp } from '@/components/ui/BoutonWhatsApp';
import { MentionDemo } from '@/components/ui/Demo';
import { Faq } from '@/components/ui/Faq';

export const metadata: Metadata = {
  title: 'Beauty Shop : soins des cheveux, du corps et du visage',
  description: "Huiles, sérums, beurres et soins pour cheveux texturés, corps et visage. Commandez en quelques lignes sur WhatsApp ou demandez conseil à l'équipe Das'hair.",
  alternates: { canonical: '/boutique' },
};

export default function Boutique() {
  return (
    <>
      <SuiviVue evenement="view_shop" />
      <EnTetePage fil={[{ label: 'Beauty Shop' }]} titre={['Beauty', 'Shop']}
        intro="Des soins choisis pour les cheveux bouclés, frisés et crépus, la peau du corps et du visage. Choisissez vos produits, la commande se prépare en un message.">
        <MentionDemo>Catalogue et prix de démonstration, à remplacer par la gamme réelle</MentionDemo>
      </EnTetePage>

      <section className="conteneur pb-24">
        <Suspense fallback={<div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">{Array.from({ length: 8 }, (_, i) => <div key={i} className="aspect-[4/5] animate-pulse bg-fond-2" />)}</div>}>
          <ExplorateurBoutique />
        </Suspense>
      </section>

      <section className="bg-fond-2">
        <div className="conteneur grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="titre text-[clamp(2rem,3.4vw,3rem)] leading-tight">Vous hésitez entre deux produits&nbsp;?</h2>
            <p className="mt-3 max-w-xl text-sourdine">Décrivez votre cheveu ou votre peau : l’équipe vous oriente vers le soin adapté avant toute commande.</p>
          </div>
          <BoutonWhatsApp evenement="product_contact_click" item="boutique" titre="Votre demande de conseil est prête"
            message="Bonjour Das'hair, j'aimerais un conseil pour choisir un produit. Mon cheveu / ma peau : ">
            Demander conseil
          </BoutonWhatsApp>
        </div>
      </section>

      <div className="conteneur section">
        <Faq questions={[
          { q: 'Comment passer commande ?', r: 'Ajoutez vos produits à votre sélection, puis cliquez sur « Préparer la commande WhatsApp » : le message est rédigé avec les produits et les quantités. L’équipe vous confirme ensuite la disponibilité.' },
          { q: 'Comment se passent le paiement et la livraison ?', r: 'Les modalités de paiement, de retrait et de livraison seront précisées par Das’hair. Dans ce prototype, elles restent à confirmer.' },
          { q: 'Comment savoir quel produit me convient ?', r: 'Chaque fiche indique pour qui le produit est pensé et comment l’utiliser. En cas de doute, demandez conseil : c’est sans engagement.' },
          { q: 'Les prix affichés sont-ils définitifs ?', r: 'Non. Les produits et les prix de ce prototype sont des exemples de présentation, à remplacer par la gamme réelle de Das’hair.' },
        ]} />
      </div>
    </>
  );
}
