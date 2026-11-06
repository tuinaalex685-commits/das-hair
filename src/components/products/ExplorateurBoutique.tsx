'use client';

import { useMemo, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Search, X } from 'lucide-react';
import { produits, categoriesProduits } from '@/data/produits';
import { useBoutique } from '@/components/providers/Boutique';
import { CarteProduit } from './CarteProduit';

type Tri = 'pertinence' | 'prix-croissant' | 'prix-decroissant' | 'nom';
const TRIS: { id: Tri; label: string }[] = [
  { id: 'pertinence', label: 'Sélection de la maison' },
  { id: 'prix-croissant', label: 'Prix croissant' },
  { id: 'prix-decroissant', label: 'Prix décroissant' },
  { id: 'nom', label: 'Nom (A à Z)' },
];

const sansAccents = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

/**
 * Boutique : recherche, catégories, tri et favoris. L'état vit dans l'URL (partageable, retour
 * arrière fiable) ; la grille se réorganise avec une transition de mise en page.
 */
export function ExplorateurBoutique() {
  const params = useSearchParams();
  const router = useRouter();
  const chemin = usePathname();
  const [, demarrer] = useTransition();
  const { favoris } = useBoutique();

  const categorie = params.get('categorie') ?? '';
  const tri = (params.get('tri') as Tri) || 'pertinence';
  const favorisSeuls = params.get('favoris') === '1';
  const [recherche, setRecherche] = useState(params.get('q') ?? '');

  const maj = (cle: string, valeur: string) => {
    const p = new URLSearchParams(params.toString());
    if (valeur) p.set(cle, valeur); else p.delete(cle);
    demarrer(() => router.replace(`${chemin}${p.size ? `?${p}` : ''}`, { scroll: false }));
  };

  const resultats = useMemo(() => {
    const q = sansAccents(recherche.trim());
    let liste = produits.filter((p) =>
      (!categorie || p.categorie === categorie) &&
      (!favorisSeuls || favoris.includes(p.slug)) &&
      (!q || sansAccents(`${p.nom} ${p.accroche} ${p.description} ${p.pourQui}`).includes(q)));
    if (tri === 'prix-croissant') liste = [...liste].sort((a, b) => a.prix - b.prix);
    if (tri === 'prix-decroissant') liste = [...liste].sort((a, b) => b.prix - a.prix);
    if (tri === 'nom') liste = [...liste].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
    return liste;
  }, [categorie, tri, favorisSeuls, favoris, recherche]);

  const filtresActifs = !!(categorie || recherche || favorisSeuls);

  return (
    <div>
      <div className="sticky top-18 z-20 -mx-5 border-b border-filet bg-fond/95 px-5 py-4 md:-mx-10 md:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Catégories" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
            {[{ id: '', label: 'Tout' }, ...categoriesProduits].map((c) => {
              const actif = categorie === c.id;
              return (
                <button key={c.id || 'tout'} onClick={() => maj('categorie', c.id)} aria-pressed={actif}
                  className={`relative shrink-0 rounded-full border px-4 py-2 text-[0.9rem] font-medium transition-colors ${actif ? 'border-encre text-surface' : 'border-filet text-encre hover:border-encre'}`}>
                  {actif && <motion.span layoutId="puce-categorie" className="absolute inset-0 -z-10 rounded-full bg-encre" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                  {c.label}
                </button>
              );
            })}
            <button onClick={() => maj('favoris', favorisSeuls ? '' : '1')} aria-pressed={favorisSeuls}
              className={`shrink-0 rounded-full border px-4 py-2 text-[0.9rem] font-medium transition-colors ${favorisSeuls ? 'border-ambre bg-ambre text-surface' : 'border-filet hover:border-encre'}`}>
              Mes favoris{favoris.length ? ` (${favoris.length})` : ''}
            </button>
          </div>
          <div className="flex gap-3">
            <label className="relative flex-1 lg:w-72 lg:flex-none">
              <span className="sr-only">Rechercher un produit</span>
              <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sourdine" aria-hidden />
              <input type="search" value={recherche} placeholder="Rechercher : huile, boucles, visage…"
                onChange={(e) => setRecherche(e.target.value)} onBlur={() => maj('q', recherche.trim())}
                className="h-11 w-full rounded-[var(--radius-ctrl)] border border-filet bg-surface pl-10 pr-3 text-[0.95rem] outline-none focus:border-encre" />
            </label>
            <label>
              <span className="sr-only">Trier les produits</span>
              <select value={tri} onChange={(e) => maj('tri', e.target.value === 'pertinence' ? '' : e.target.value)}
                className="h-11 rounded-[var(--radius-ctrl)] border border-filet bg-surface px-3 text-[0.95rem] outline-none focus:border-encre">
                {TRIS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between text-[0.92rem] text-sourdine" aria-live="polite">
        <p>{resultats.length} produit{resultats.length > 1 ? 's' : ''}</p>
        {filtresActifs && (
          <button onClick={() => { setRecherche(''); demarrer(() => router.replace(chemin, { scroll: false })); }} className="inline-flex items-center gap-1.5 font-semibold text-encre hover:underline">
            <X size={15} /> Effacer les filtres
          </button>
        )}
      </div>

      {resultats.length === 0 ? (
        <div className="py-24 text-center">
          <p className="titre text-4xl">Aucun produit ne correspond.</p>
          <p className="mx-auto mt-4 max-w-md text-sourdine">Essayez un autre mot, ou affichez toute la boutique. Vous pouvez aussi demander conseil : l’équipe vous orientera.</p>
        </div>
      ) : (
        <motion.ul layout className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {resultats.map((p, i) => (
              <motion.li key={p.slug} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.03, ease: [0.2, 0.8, 0.2, 1] }}>
                <CarteProduit produit={p} priorite={i < 4} tailles="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, 46vw" />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
