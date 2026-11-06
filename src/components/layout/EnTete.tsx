'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ShoppingBag, X, Store, GraduationCap, Scissors, LayoutGrid } from 'lucide-react';
import { navigation } from '@/data/site';
import { useBoutique } from '@/components/providers/Boutique';
import { bloquerDefilement } from '@/components/providers/DefilementDoux';
import { IconeWhatsApp } from '@/components/ui/BoutonWhatsApp';
import { classeBouton, Fleche } from '@/components/ui/Bouton';
import { suivre } from '@/lib/analytics';
import { Logo } from './Logo';

const MESSAGE_GENERAL = "Bonjour Das'hair, j'aimerais avoir des informations sur vos produits, vos soins ou vos formations.";

/**
 * En-tête : logo, navigation centrale en pilule (ordinateur), panier et rendez-vous.
 * Il se replie quand on descend et revient dès qu'on remonte.
 * Sur téléphone : barre d'actions flottante en bas, à portée de pouce.
 */
export function EnTete() {
  const chemin = usePathname();
  const [menu, setMenu] = useState(false);
  const [cache, setCache] = useState(false);
  const [defile, setDefile] = useState(false);
  const { panier, ouvrirPanier, preparerWhatsApp } = useBoutique();
  const nb = panier.reduce((s, l) => s + l.quantite, 0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const avant = scrollY.getPrevious() ?? 0;
    setDefile(y > 30);
    setCache(y > 240 && y > avant);
  });
  useEffect(() => { bloquerDefilement(menu); }, [menu]);
  useEffect(() => { setMenu(false); }, [chemin]);

  const whatsapp = () => {
    suivre('whatsapp_click', { source: 'barre_navigation' });
    preparerWhatsApp(MESSAGE_GENERAL, 'Votre message est prêt');
  };

  return (
    <>
      <motion.header
        animate={{ y: cache && !menu ? '-110%' : '0%' }} transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${defile ? 'border-b border-filet/70 bg-fond/80 backdrop-blur-md' : 'border-b border-transparent'}`}>
        <div className="conteneur flex h-18 items-center justify-between gap-6">
          <Logo />
          <nav aria-label="Navigation principale" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-filet bg-surface/70 p-1.5 backdrop-blur">
              {navigation.map((n) => {
                const actif = chemin.startsWith(n.href);
                return (
                  <li key={n.href} className="relative">
                    {actif && <motion.span layoutId="nav-actif" className="absolute inset-0 rounded-full bg-encre" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                    <Link href={n.href} aria-current={actif ? 'page' : undefined}
                      className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-[0.9rem] font-medium transition-colors ${actif ? 'text-surface' : 'text-encre hover:bg-fond-2'}`}>
                      {n.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => ouvrirPanier(true)} className="relative grid h-11 w-11 place-items-center rounded-full border border-filet bg-surface/70 transition-colors hover:border-encre" aria-label={`Ma sélection, ${nb} article${nb > 1 ? 's' : ''}`}>
              <ShoppingBag size={19} strokeWidth={1.6} />
              <AnimatePresence>
                {nb > 0 && (
                  <motion.span key={nb} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="chiffres absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-indigo px-1 text-[0.68rem] font-bold text-white">{nb}</motion.span>
                )}
              </AnimatePresence>
            </button>
            <Link href="/soins" className={classeBouton('principal', 'hidden !h-11 !pl-5 !pr-1.5 text-[0.88rem] md:inline-flex')}>
              Prendre rendez-vous<span className="scale-[0.85]"><Fleche /></span>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Barre flottante mobile */}
      <nav aria-label="Actions rapides" className="fixed inset-x-3 bottom-3 z-50 lg:hidden">
        <ul className="mx-auto flex max-w-md items-center justify-between rounded-full bg-encre/95 p-1.5 text-surface shadow-[0_18px_40px_-12px_rgba(21,19,26,0.55)] backdrop-blur">
          {[
            { href: '/boutique', label: 'Boutique', Icone: Store },
            { href: '/soins', label: 'Soins', Icone: Scissors },
          ].map(({ href, label, Icone }) => (
            <li key={href} className="flex-1">
              <Link href={href} aria-current={chemin.startsWith(href) ? 'page' : undefined}
                className={`flex flex-col items-center gap-0.5 rounded-full py-2 text-[0.68rem] font-medium ${chemin.startsWith(href) ? 'text-white' : 'text-sourdine-clair'}`}>
                <Icone size={19} strokeWidth={1.6} />{label}
              </Link>
            </li>
          ))}
          <li>
            <button onClick={whatsapp} aria-label="Écrire à Das'hair sur WhatsApp"
              className="mx-1 grid h-13 w-13 place-items-center rounded-full bg-indigo text-white transition-transform active:scale-90">
              <IconeWhatsApp size={24} />
            </button>
          </li>
          <li className="flex-1">
            <Link href="/formations" aria-current={chemin.startsWith('/formations') ? 'page' : undefined}
              className={`flex flex-col items-center gap-0.5 rounded-full py-2 text-[0.68rem] font-medium ${chemin.startsWith('/formations') ? 'text-white' : 'text-sourdine-clair'}`}>
              <GraduationCap size={19} strokeWidth={1.6} />Academy
            </Link>
          </li>
          <li className="flex-1">
            <button onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-controls="menu-mobile"
              className="flex w-full flex-col items-center gap-0.5 rounded-full py-2 text-[0.68rem] font-medium text-sourdine-clair">
              {menu ? <X size={19} strokeWidth={1.6} /> : <LayoutGrid size={19} strokeWidth={1.6} />}{menu ? 'Fermer' : 'Menu'}
            </button>
          </li>
        </ul>
      </nav>

      <AnimatePresence>
        {menu && (
          <motion.div id="menu-mobile" key="menu" data-lenis-prevent
            initial={{ clipPath: 'circle(0% at 82% 96%)' }} animate={{ clipPath: 'circle(150% at 82% 96%)' }} exit={{ clipPath: 'circle(0% at 82% 96%)' }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.15, 1] }}
            className="sur-sombre fixed inset-0 z-40 flex flex-col overflow-y-auto bg-encre pb-28 pt-24 text-surface lg:hidden">
            <nav aria-label="Navigation mobile" className="conteneur flex-1">
              <ul>
                {[{ href: '/', label: 'Accueil' }, ...navigation].map((n, i) => (
                  <motion.li key={n.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + i * 0.05, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                    className="border-b border-surface/10">
                    <Link href={n.href} className="flex items-center justify-between py-4">
                      <span className="titre text-[2.6rem]">{n.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
