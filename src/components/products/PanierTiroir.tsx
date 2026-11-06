'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { Minus, Plus, X } from 'lucide-react';
import { useEffect } from 'react';
import { getProduit } from '@/data/produits';
import { prixFcfa } from '@/data/site';
import { useBoutique } from '@/components/providers/Boutique';
import { composerMessage } from '@/lib/whatsapp';
import { MentionDemo } from '@/components/ui/Demo';

/** Panier de démonstration : il prépare une commande WhatsApp, il n'encaisse rien. */
export function PanierTiroir() {
  const { panier, panierOuvert, ouvrirPanier, changerQuantite, retirer, vider, preparerWhatsApp } = useBoutique();
  const lignes = panier.map((l) => ({ ...l, p: getProduit(l.slug) })).filter((l) => l.p);
  const total = lignes.reduce((s, l) => s + (l.p!.prix * l.quantite), 0);

  useEffect(() => {
    if (!panierOuvert) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && ouvrirPanier(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [panierOuvert, ouvrirPanier]);

  const commander = () => preparerWhatsApp(composerMessage([
    "Bonjour Das'hair, je souhaite commander :",
    '',
    ...lignes.map((l) => `• ${l.p!.nom} (${l.p!.contenance}) × ${l.quantite}`),
    '',
    `Total indicatif : ${prixFcfa(total)}`,
    'Merci de me confirmer la disponibilité et les modalités de retrait ou de livraison.',
  ]), 'Votre commande est prête');

  return (
    <AnimatePresence>
      {panierOuvert && (
        <>
          <motion.div key="voile" className="fixed inset-0 z-[60] bg-encre/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => ouvrirPanier(false)} />
          <motion.aside key="tiroir" role="dialog" aria-modal="true" aria-label="Panier de démonstration"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.38, ease: [0.65, 0, 0.15, 1] }}
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-surface">
            <div className="flex items-center justify-between border-b border-filet px-6 py-5">
              <div>
                <p className="titre text-2xl">Votre sélection</p>
                <MentionDemo className="mt-1">Panier de démonstration</MentionDemo>
              </div>
              <button onClick={() => ouvrirPanier(false)} className="-m-2 p-2" aria-label="Fermer le panier"><X size={20} /></button>
            </div>

            {lignes.length === 0 ? (
              <div className="flex flex-1 flex-col items-start justify-center gap-4 px-6">
                <p className="titre text-3xl">Votre sélection est vide.</p>
                <p className="text-sourdine">Ajoutez des produits depuis la boutique : la commande se prépare ensuite en un message WhatsApp.</p>
                <Link href="/boutique" onClick={() => ouvrirPanier(false)} className="mt-2 font-semibold underline underline-offset-4">Voir la boutique</Link>
              </div>
            ) : (
              <>
                <ul data-lenis-prevent className="flex-1 divide-y divide-filet overflow-y-auto px-6">
                  {lignes.map(({ slug, quantite, p }) => (
                    <li key={slug} className="flex gap-4 py-5">
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-fond-2">
                        <Image src={p!.images[0].src} alt={p!.images[0].alt} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-3">
                          <Link href={`/boutique/${slug}`} onClick={() => ouvrirPanier(false)} className="font-semibold leading-snug hover:underline">{p!.nom}</Link>
                          <button onClick={() => retirer(slug)} className="text-sourdine hover:text-encre" aria-label={`Retirer ${p!.nom}`}><X size={16} /></button>
                        </div>
                        <p className="text-sm text-sourdine">{p!.contenance}</p>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-filet">
                            <button onClick={() => changerQuantite(slug, quantite - 1)} className="p-2" aria-label="Diminuer la quantité"><Minus size={14} /></button>
                            <span className="chiffres w-8 text-center text-sm" aria-live="polite">{quantite}</span>
                            <button onClick={() => changerQuantite(slug, quantite + 1)} className="p-2" aria-label="Augmenter la quantité"><Plus size={14} /></button>
                          </div>
                          <p className="chiffres font-semibold">{prixFcfa(p!.prix * quantite)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-filet px-6 py-6">
                  <div className="flex items-baseline justify-between">
                    <p className="text-sourdine">Total indicatif</p>
                    <p className="titre chiffres text-3xl">{prixFcfa(total)}</p>
                  </div>
                  <button onClick={commander} className="mt-5 flex h-13 w-full items-center justify-center rounded-[var(--radius-ctrl)] bg-action font-semibold text-surface transition-colors hover:bg-action-fonce">
                    Préparer la commande WhatsApp
                  </button>
                  <button onClick={vider} className="mt-3 w-full py-2 text-sm text-sourdine underline-offset-4 hover:underline">Vider la sélection</button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
