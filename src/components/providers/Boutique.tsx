'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { lienWhatsApp } from '@/lib/whatsapp';
import { MessageDialog } from '@/components/ui/MessageDialog';
import { Toast } from '@/components/ui/Toast';

/**
 * État partagé du prototype : panier de démonstration, favoris, message WhatsApp à préparer
 * et notifications. Persistance locale (navigateur du visiteur uniquement), jamais envoyée.
 */
type Ligne = { slug: string; quantite: number };
type Ctx = {
  panier: Ligne[];
  ajouter: (slug: string, quantite?: number) => void;
  changerQuantite: (slug: string, quantite: number) => void;
  retirer: (slug: string) => void;
  vider: () => void;
  favoris: string[];
  basculerFavori: (slug: string) => void;
  panierOuvert: boolean;
  ouvrirPanier: (ouvert: boolean) => void;
  preparerWhatsApp: (message: string, titre?: string) => void;
  notifier: (texte: string) => void;
};

const BoutiqueCtx = createContext<Ctx | null>(null);

function lire<T>(cle: string, defaut: T): T {
  try {
    const v = localStorage.getItem(cle);
    return v ? (JSON.parse(v) as T) : defaut;
  } catch {
    return defaut;
  }
}
function ecrire(cle: string, valeur: unknown) {
  try { localStorage.setItem(cle, JSON.stringify(valeur)); } catch { /* stockage indisponible : sans conséquence */ }
}

export function BoutiqueProvider({ children }: { children: React.ReactNode }) {
  const [panier, setPanier] = useState<Ligne[]>([]);
  const [favoris, setFavoris] = useState<string[]>([]);
  const [charge, setCharge] = useState(false);
  const [panierOuvert, ouvrirPanier] = useState(false);
  const [message, setMessage] = useState<{ texte: string; titre: string } | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    // Lecture après le premier rendu : le HTML serveur et client restent identiques.
    const id = requestAnimationFrame(() => {
      setPanier(lire('dashair:panier', []));
      setFavoris(lire('dashair:favoris', []));
      setCharge(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);
  useEffect(() => { if (charge) ecrire('dashair:panier', panier); }, [panier, charge]);
  useEffect(() => { if (charge) ecrire('dashair:favoris', favoris); }, [favoris, charge]);

  const notifier = useCallback((texte: string) => {
    setToast(texte);
    window.setTimeout(() => setToast((t) => (t === texte ? null : t)), 2600);
  }, []);

  const ajouter = useCallback((slug: string, quantite = 1) => {
    setPanier((p) => {
      const l = p.find((x) => x.slug === slug);
      return l ? p.map((x) => (x.slug === slug ? { ...x, quantite: Math.min(20, x.quantite + quantite) } : x)) : [...p, { slug, quantite }];
    });
  }, []);
  const changerQuantite = useCallback((slug: string, quantite: number) => {
    setPanier((p) => (quantite < 1 ? p.filter((x) => x.slug !== slug) : p.map((x) => (x.slug === slug ? { ...x, quantite: Math.min(20, quantite) } : x))));
  }, []);
  const retirer = useCallback((slug: string) => setPanier((p) => p.filter((x) => x.slug !== slug)), []);
  const vider = useCallback(() => setPanier([]), []);
  const basculerFavori = useCallback((slug: string) => {
    setFavoris((f) => (f.includes(slug) ? f.filter((x) => x !== slug) : [...f, slug]));
  }, []);

  const preparerWhatsApp = useCallback((texte: string, titre = 'Votre message est prêt') => {
    const lien = lienWhatsApp(texte);
    if (lien) window.open(lien, '_blank', 'noopener,noreferrer');
    else setMessage({ texte, titre });
  }, []);

  const valeur = useMemo<Ctx>(() => ({
    panier, ajouter, changerQuantite, retirer, vider, favoris, basculerFavori,
    panierOuvert, ouvrirPanier, preparerWhatsApp, notifier,
  }), [panier, ajouter, changerQuantite, retirer, vider, favoris, basculerFavori, panierOuvert, preparerWhatsApp, notifier]);

  return (
    <BoutiqueCtx.Provider value={valeur}>
      {children}
      <MessageDialog message={message} onClose={() => setMessage(null)} onCopie={() => notifier('Message copié')} />
      <Toast texte={toast} />
    </BoutiqueCtx.Provider>
  );
}

export function useBoutique() {
  const c = useContext(BoutiqueCtx);
  if (!c) throw new Error('useBoutique doit être utilisé dans <BoutiqueProvider>.');
  return c;
}
