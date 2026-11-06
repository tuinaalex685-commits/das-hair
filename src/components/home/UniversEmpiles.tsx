'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { categoriesProduits } from '@/data/produits';
import { categoriesPrestations } from '@/data/prestations';
import { formations } from '@/data/formations';
import { classeBouton, Fleche } from '@/components/ui/Bouton';

type Univers = { nom: React.ReactNode; phrase: string; image: string; alt: string; href: string; cta: string; liens: { label: string; href: string }[]; theme: string };

const UNIVERS: Univers[] = [
  {
    nom: <>Beauty <span className="accent">&amp; Hair</span> Care</>, href: '/soins', cta: 'Voir les prestations', theme: 'bg-surface text-encre',
    phrase: 'Coiffures protectrices, soins capillaires et beauté du visage, réalisés en salon sur rendez-vous. Chaque prestation commence par un diagnostic.',
    image: '/images/soins/tresses-mains.webp', alt: 'Mains qui tressent des cheveux en petites sections',
    liens: categoriesPrestations.map((c) => ({ label: c.label, href: `/soins?categorie=${c.id}` })),
  },
  {
    nom: <>Beauty <span className="accent">Shop</span></>, href: '/boutique', cta: 'Entrer dans la boutique', theme: 'sur-sombre bg-encre text-surface',
    phrase: 'Des soins pour les cheveux, le corps et le visage, choisis pour les textures bouclées, frisées et crépues. Commande en quelques lignes sur WhatsApp.',
    image: '/images/produits/serum-scene.webp', alt: 'Flacon de sérum mis en scène sur un socle',
    liens: categoriesProduits.map((c) => ({ label: c.label, href: `/boutique?categorie=${c.id}` })),
  },
  {
    nom: <>Das’hair <span className="accent">Academy</span></>, href: '/formations', cta: 'Découvrir les formations', theme: 'sur-sombre bg-indigo text-white',
    phrase: 'Des formations en présentiel, en petits groupes, pour apprendre les métiers de la beauté par la pratique, avec une formatrice à côté de soi.',
    image: '/images/academy/eleves.webp', alt: 'Deux élèves en blouse blanche, souriantes',
    liens: formations.slice(0, 3).map((f) => ({ label: f.nom, href: `/formations/${f.slug}` })),
  },
];

/**
 * Les trois univers en panneaux arrondis qui restent accrochés en haut de l'écran : chaque
 * nouveau panneau glisse par-dessus le précédent, qui recule légèrement.
 */
export function UniversEmpiles() {
  const zone = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: zone, offset: ['start start', 'end end'] });

  return (
    <section aria-labelledby="univers" className="pt-24 lg:pt-32">
      <div className="conteneur">
        <h2 id="univers" className="titre max-w-4xl text-[clamp(2.6rem,5.4vw,5rem)]">
          Trois univers, <span className="accent">une même</span> exigence.
        </h2>
      </div>
      <div ref={zone} className="conteneur mt-14 pb-24">
        {UNIVERS.map((u, i) => (
          <Panneau key={i} u={u} i={i} total={UNIVERS.length} progression={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

function Panneau({ u, i, total, progression }: { u: Univers; i: number; total: number; progression: MotionValue<number> }) {
  const echelle = useTransform(progression, [i / total, 1], [1, 1 - (total - 1 - i) * 0.045]);
  return (
    <div className="sticky h-[88svh] min-h-[36rem] lg:h-[80vh]" style={{ top: `calc(5.5rem + ${i * 1.4}rem)` }}>
      <motion.article style={{ scale: echelle, transformOrigin: '50% 0%' }}
        className={`grid h-[calc(100%-3rem)] overflow-hidden rounded-[2rem] shadow-[0_-20px_50px_-30px_rgba(21,19,26,0.5)] lg:grid-cols-2 ${u.theme}`}>
        <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-14">
          <div>
            <h3 className="titre text-[clamp(2.4rem,5vw,4.6rem)]"><Link href={u.href}>{u.nom}</Link></h3>
            <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed opacity-80">{u.phrase}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {u.liens.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex rounded-full border border-current/20 px-4 py-2 text-[0.88rem] font-medium transition-colors hover:border-current hover:bg-current/10">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href={u.href} className={classeBouton(i === 0 ? 'principal' : 'clair', 'mt-8 w-fit')}>{u.cta}<Fleche variante={i === 0 ? 'principal' : 'clair'} /></Link>
        </div>
        <div className="relative hidden min-h-0 lg:block">
          <Image src={u.image} alt={u.alt} fill sizes="45vw" className="object-cover" />
        </div>
        <div className="relative -mt-2 h-40 lg:hidden">
          <Image src={u.image} alt="" fill sizes="100vw" className="object-cover" />
        </div>
      </motion.article>
    </div>
  );
}
