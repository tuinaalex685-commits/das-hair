'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Check } from 'lucide-react';
import { getProduit } from '@/data/produits';
import { prixFcfa } from '@/data/site';
import { classeBouton, Fleche } from '@/components/ui/Bouton';
import { suivre } from '@/lib/analytics';

const LIGNES = [
  <>Des cheveux</>,
  <><span className="accent">soignés</span>, une peau</>,
  <>qui <span className="accent">respire</span>.</>,
];

/**
 * Ouverture éditoriale beauté : promesse claire à gauche (titre, bénéfice, deux actions selon
 * l'intention, réassurance), portrait en arche à droite qui se déplace doucement au défilement,
 * et une carte produit flottante qui fait le pont vers la boutique.
 */
export function Hero() {
  const reduit = useReducedMotion();
  const zone = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: zone, offset: ['start start', 'end start'] });
  const yPortrait = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const zoom = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const yProduit = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const produit = getProduit('huile-nourrissante-baobab')!;
  const e = [0.2, 0.8, 0.2, 1] as const;
  const apparait = (delai: number) => (reduit ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: delai, ease: e } });

  return (
    <section ref={zone} className="relative overflow-x-clip pb-16 pt-28 lg:min-h-[100svh] lg:pt-32">
      <div className="conteneur grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6 lg:pb-10">
          <motion.p {...apparait(0)} className="mb-6 inline-flex items-center gap-2 rounded-full border border-filet bg-surface/70 py-1.5 pl-1.5 pr-4 text-[0.88rem] font-medium">
            <span className="rounded-full bg-indigo px-2.5 py-0.5 text-[0.75rem] font-semibold text-white">Maison de beauté</span>
            Soins, boutique et academy
          </motion.p>
          <h1 className="titre text-[clamp(3rem,6.4vw,6rem)] leading-[0.95]">
            <span className="sr-only">Das’hair, maison de beauté : </span>
            {LIGNES.map((l, i) => (
              <span key={i} className="block overflow-hidden pb-[0.1em]">
                <motion.span className="block" initial={reduit ? false : { y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.95, delay: 0.1 + i * 0.09, ease: [0.65, 0, 0.15, 1] }}>{l}</motion.span>
              </span>
            ))}
          </h1>

          <motion.p {...apparait(0.5)} className="mt-6 max-w-lg text-[1.12rem] leading-relaxed text-sourdine">
            Coiffures protectrices et soins en salon, produits choisis pour les cheveux texturés, et des formations pour apprendre le geste. Tout commence par un conseil.
          </motion.p>

          <motion.div {...apparait(0.62)} className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/rendez-vous" onClick={() => suivre('appointment_click', { source: 'hero' })} className={classeBouton('principal')}>
              Réserver un soin<Fleche />
            </Link>
            <Link href="/boutique" onClick={() => suivre('view_shop', { source: 'hero' })} className={classeBouton('secondaire')}>
              Découvrir la boutique
            </Link>
          </motion.div>

          <motion.ul {...apparait(0.74)} className="mt-8 grid gap-2.5 text-[0.95rem] text-sourdine sm:grid-cols-2" aria-label="Pourquoi passer par Das'hair">
            {['Diagnostic avant chaque prestation', 'Conseil avant achat, sans engagement', 'Commande et rendez-vous par WhatsApp', 'Formations en présentiel, petits groupes'].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-indigo-clair text-indigo"><Check size={13} strokeWidth={2.6} /></span>{t}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative lg:col-span-6">
          <motion.div className="relative mx-auto aspect-[4/5] w-full max-w-[32rem] overflow-hidden rounded-t-full rounded-b-[2rem] bg-fond-2"
            initial={reduit ? false : { clipPath: 'inset(100% 0 0 0 round 999px 999px 32px 32px)' }}
            animate={{ clipPath: 'inset(0% 0 0 0 round 999px 999px 32px 32px)' }}
            transition={{ duration: 1.3, delay: 0.15, ease: [0.65, 0, 0.15, 1] }}>
            <motion.div className="absolute inset-[-8%_0]" style={reduit ? {} : { y: yPortrait, scale: zoom }}>
              <Image src="/images/portraits/hero.webp" alt="Portrait d’une femme aux tresses, peau lumineuse" fill priority sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover object-[60%_30%]" />
            </motion.div>
          </motion.div>

          {/* Badge rond qui tourne au défilement */}
          <motion.div aria-hidden style={reduit ? {} : { rotate: rotation }} className="absolute -left-2 top-6 hidden h-32 w-32 sm:block lg:-left-6">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <defs><path id="cercle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
              <circle cx="50" cy="50" r="50" className="fill-encre" />
              <text className="fill-surface text-[9.5px] font-semibold tracking-[0.2em]"><textPath href="#cercle">SOIGNER · SUBLIMER · TRANSMETTRE ·</textPath></text>
              <text x="50" y="58" textAnchor="middle" className="fill-ambre font-serif text-[26px] italic">’</text>
            </svg>
          </motion.div>

          {/* Carte produit flottante : pont vers la boutique */}
          <motion.div style={reduit ? {} : { y: yProduit }} initial={reduit ? false : { opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9, ease: e }}
            className="absolute -bottom-6 right-0 w-[15.5rem] sm:right-4 lg:-right-2 lg:bottom-10">
            <Link href={`/boutique/${produit.slug}`} onClick={() => suivre('view_product', { item: produit.slug, source: 'hero' })}
              className="group flex items-center gap-3 rounded-[1.4rem] bg-surface/90 p-2.5 pr-4 shadow-[0_24px_50px_-20px_rgba(21,19,26,0.45)] backdrop-blur transition-transform duration-300 hover:-translate-y-1">
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[1rem] bg-fond-2">
                <Image src={produit.images[0].src} alt="" fill sizes="64px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.72rem] font-semibold text-indigo">Soin des longueurs</span>
                <span className="block truncate text-[0.95rem] font-semibold leading-tight">{produit.nom}</span>
                <span className="chiffres block text-[0.85rem] text-sourdine">{prixFcfa(produit.prix)}</span>
              </span>
            </Link>
            <p className="mt-2 text-right text-[0.7rem] text-sourdine">Exemple de démonstration</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
