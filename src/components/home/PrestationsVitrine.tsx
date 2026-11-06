'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { prestations, categoriesPrestations } from '@/data/prestations';
import { prixFcfa } from '@/data/site';
import { classeBouton, Fleche } from '@/components/ui/Bouton';

/**
 * Les prestations sur fond indigo : une liste lisible (nom, durée, tarif indicatif) et, sur
 * grand écran, une photographie qui change selon la prestation survolée ou focalisée.
 */
export function PrestationsVitrine() {
  const [active, setActive] = useState(0);
  const p = prestations[active];

  return (
    <section aria-labelledby="soins" className="px-2 sm:px-4"><div className="sur-sombre section mx-auto max-w-[96rem] rounded-[2rem] bg-encre text-surface">
      <div className="conteneur grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="soins" className="titre text-[clamp(3rem,6vw,5.4rem)] leading-[0.92]">Le soin, <span className="accent">sur mesure</span>.</h2>
          <p className="mt-6 max-w-md text-[1.08rem] leading-relaxed text-sourdine-clair">
            Chaque prestation commence par un échange : on regarde le cheveu ou la peau, puis on décide ensemble de ce qui convient.
          </p>
          <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-encre-2 lg:block">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div key={p.slug} className="absolute inset-0" initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}>
                <Image src={p.image.src} alt={p.image.alt} fill sizes="38vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="text-[0.82rem] text-sourdine-clair">Prestations d’exemple. Durées et tarifs indicatifs, à confirmer.</p>
          <ul className="mt-6 border-t border-surface/30">
            {prestations.map((s, i) => (
              <li key={s.slug} className="border-b border-surface/15">
                <Link href={`/soins/${s.slug}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
                  className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-6">
                  <span className="text-[0.82rem] text-sourdine-clair">{categoriesPrestations.find((c) => c.id === s.categorie)?.label}</span>
                  <span className="chiffres row-span-2 self-center text-right text-[0.95rem]">
                    <span className="block text-sourdine-clair">{s.duree}</span>
                    <span className="block font-semibold">dès {prixFcfa(s.tarifAPartirDe)}</span>
                  </span>
                  <span className={`titre text-[clamp(1.7rem,2.6vw,2.3rem)] leading-tight transition-colors ${i === active ? 'text-indigo-clair' : 'group-hover:text-indigo-clair'}`}>{s.nom}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/soins" className={classeBouton("clair", "mt-10")}>
            Toutes les prestations<Fleche variante="clair" />
          </Link>
        </div>
      </div>
    </div></section>
  );
}
