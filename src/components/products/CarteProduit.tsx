'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import type { Produit } from '@/types';
import { prixFcfa } from '@/data/site';
import { categoriesProduits } from '@/data/produits';
import { useBoutique } from '@/components/providers/Boutique';

/** Carte produit : la photographie d'abord, puis le nom, l'usage et le prix (de démonstration). */
export function CarteProduit({ produit, priorite = false, tailles = '(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 80vw' }: {
  produit: Produit; priorite?: boolean; tailles?: string;
}) {
  const { favoris, basculerFavori, notifier } = useBoutique();
  const favori = favoris.includes(produit.slug);
  const categorie = categoriesProduits.find((c) => c.id === produit.categorie)?.label;

  return (
    <article className="group relative flex flex-col">
      <Link href={`/boutique/${produit.slug}`} className="relative block aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-fond-2">
        <Image src={produit.images[0].src} alt={produit.images[0].alt} fill sizes={tailles} priority={priorite}
          className="object-cover transition-transform duration-[900ms] ease-[var(--ease-sortie)] group-hover:scale-[1.04]" />
        {produit.images[1] && (
          <Image src={produit.images[1].src} alt="" aria-hidden fill sizes={tailles}
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        )}
      </Link>
      <button
        onClick={() => { basculerFavori(produit.slug); notifier(favori ? 'Retiré des favoris' : 'Ajouté aux favoris'); }}
        aria-pressed={favori} aria-label={favori ? `Retirer ${produit.nom} des favoris` : `Ajouter ${produit.nom} aux favoris`}
        className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-surface/90 text-encre transition-colors hover:bg-surface">
        <Heart size={17} strokeWidth={1.6} className={favori ? 'fill-ambre text-ambre' : ''} />
      </button>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.82rem] text-sourdine">{categorie}</p>
          <h3 className="mt-1 text-[1.05rem] font-semibold leading-snug">
            <Link href={`/boutique/${produit.slug}`} className="hover:underline hover:underline-offset-4">{produit.nom}</Link>
          </h3>
          <p className="mt-1 text-[0.92rem] leading-snug text-sourdine">{produit.accroche}</p>
        </div>
        <p className="chiffres shrink-0 text-[0.98rem] font-semibold">{prixFcfa(produit.prix)}</p>
      </div>
    </article>
  );
}
