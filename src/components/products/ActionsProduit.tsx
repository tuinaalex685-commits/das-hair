'use client';

import { useState } from 'react';
import { Heart, Minus, Plus } from 'lucide-react';
import type { Produit } from '@/types';
import { prixFcfa } from '@/data/site';
import { useBoutique } from '@/components/providers/Boutique';
import { composerMessage } from '@/lib/whatsapp';
import { suivre } from '@/lib/analytics';

/** Bloc d'achat : quantité, commande WhatsApp (action principale), sélection, favori, conseil. */
export function ActionsProduit({ produit }: { produit: Produit }) {
  const [quantite, setQuantite] = useState(1);
  const { ajouter, ouvrirPanier, favoris, basculerFavori, preparerWhatsApp, notifier } = useBoutique();
  const favori = favoris.includes(produit.slug);

  const commander = () => {
    suivre('product_order_click', { item: produit.slug, quantite });
    suivre('whatsapp_click', { item: produit.slug, source: 'product_order_click' });
    preparerWhatsApp(composerMessage([
      "Bonjour Das'hair, je souhaite commander :",
      `• ${produit.nom} (${produit.contenance}) × ${quantite}`,
      `Total indicatif : ${prixFcfa(produit.prix * quantite)}`,
      'Merci de me confirmer la disponibilité et les modalités de retrait ou de livraison.',
    ]), 'Votre commande est prête');
  };
  const conseil = () => {
    suivre('product_contact_click', { item: produit.slug });
    suivre('whatsapp_click', { item: produit.slug, source: 'product_contact_click' });
    preparerWhatsApp(`Bonjour Das'hair, je souhaite avoir des renseignements sur le produit ${produit.nom}.`, 'Votre question est prête');
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex h-13 items-center border border-filet bg-surface" role="group" aria-label="Quantité">
          <button onClick={() => setQuantite((q) => Math.max(1, q - 1))} className="grid h-full w-12 place-items-center hover:bg-fond" aria-label="Diminuer la quantité"><Minus size={16} /></button>
          <span className="chiffres w-10 text-center font-semibold" aria-live="polite">{quantite}</span>
          <button onClick={() => setQuantite((q) => Math.min(20, q + 1))} className="grid h-full w-12 place-items-center hover:bg-fond" aria-label="Augmenter la quantité"><Plus size={16} /></button>
        </div>
        <button onClick={commander} className="inline-flex h-13 flex-1 items-center justify-center rounded-[var(--radius-ctrl)] bg-action px-7 text-[0.95rem] font-semibold text-surface transition-colors hover:bg-action-fonce sm:flex-none">
          Commander via WhatsApp
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        <button onClick={() => { ajouter(produit.slug, quantite); notifier(`${produit.nom} ajouté à votre sélection`); ouvrirPanier(true); }}
          className="inline-flex h-12 items-center rounded-[var(--radius-ctrl)] border border-encre/80 px-6 text-[0.92rem] font-semibold transition-colors hover:bg-encre hover:text-surface">
          Ajouter à ma sélection
        </button>
        <button onClick={() => { basculerFavori(produit.slug); notifier(favori ? 'Retiré des favoris' : 'Ajouté aux favoris'); }} aria-pressed={favori}
          className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-ctrl)] border border-filet px-5 text-[0.92rem] font-semibold transition-colors hover:border-encre">
          <Heart size={16} strokeWidth={1.6} className={favori ? 'fill-ambre text-ambre' : ''} /> {favori ? 'Dans vos favoris' : 'Favori'}
        </button>
      </div>
      <p className="mt-5 text-[0.92rem] text-sourdine">
        Un doute sur ce produit&nbsp;? <button onClick={conseil} className="font-semibold text-encre underline decoration-filet underline-offset-4 hover:decoration-ambre">Posez votre question à l’équipe</button>, c’est sans engagement.
      </p>
    </div>
  );
}
