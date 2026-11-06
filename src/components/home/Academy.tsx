'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { formations } from '@/data/formations';
import { prixFcfa } from '@/data/site';
import { BoutonLien } from '@/components/ui/Bouton';
import { MentionDemo } from '@/components/ui/Demo';

/**
 * Academy : les formations en cartes superposées qui s'ouvrent en éventail à mesure qu'on
 * descend. Chaque carte mène à son programme. Aucune promesse de diplôme.
 */
export function Academy() {
  const zone = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: zone, offset: ['start end', 'center center'] });
  const liste = formations.slice(0, 3);

  return (
    <section ref={zone} aria-labelledby="academy" className="section overflow-x-clip">
      <div className="conteneur grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="etiquette text-indigo">Das’hair Academy</p>
          <h2 id="academy" className="titre mt-4 text-[clamp(2.8rem,5.6vw,5.2rem)]">
            Apprenez le geste, <span className="accent">pas seulement</span> la théorie.
          </h2>
          <p className="mt-6 max-w-md text-[1.08rem] leading-relaxed text-sourdine">
            Des formations en présentiel, en petits groupes : sur tête d’entraînement d’abord, puis en situation réelle, avec une formatrice à côté de vous.
          </p>
          <ul className="mt-7 space-y-2 text-[0.98rem]">
            {['Pour débuter ou se perfectionner', 'Pratique sur tête d’entraînement, puis sur modèle', 'Matériel et attestation : à confirmer par Das’hair'].map((t) => (
              <li key={t} className="flex gap-3"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo" />{t}</li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <BoutonLien href="/formations">Voir les formations</BoutonLien>
            <MentionDemo>Programmes et tarifs indicatifs</MentionDemo>
          </div>
        </div>

        <div className="relative h-[30rem] sm:h-[34rem] lg:col-span-7">
          {liste.map((f, i) => (
            <CarteFormation key={f.slug} f={f} i={i} progression={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CarteFormation({ f, i, progression }: { f: (typeof formations)[number]; i: number; progression: MotionValue<number> }) {
  const ecart = i - 1; // -1, 0, 1
  const x = useTransform(progression, [0, 1], ['0%', `${ecart * 46}%`]);
  const rotate = useTransform(progression, [0, 1], [ecart * 2, ecart * 7]);
  const y = useTransform(progression, [0, 1], [0, Math.abs(ecart) * 26]);
  return (
    <motion.div style={{ x, rotate, y, zIndex: i === 1 ? 3 : 2 - Math.abs(ecart) }}
      className="absolute left-1/2 top-0 w-[62%] max-w-[19rem] -translate-x-1/2 sm:w-[46%]">
      <Link href={`/formations/${f.slug}`} className="group block overflow-hidden rounded-[1.6rem] bg-surface p-2 shadow-[0_30px_60px_-25px_rgba(21,19,26,0.45)] transition-transform duration-300 hover:-translate-y-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.2rem] bg-fond-2">
          <Image src={f.image.src} alt={f.image.alt} fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute right-3 top-3 grid h-16 w-16 rotate-12 place-items-center rounded-full bg-indigo text-center text-[0.68rem] font-bold leading-tight text-white">En<br />présentiel</span>
          <span className="chiffres absolute bottom-3 left-3 rounded-full bg-surface/95 px-3 py-1 text-[0.82rem] font-semibold">{prixFcfa(f.tarif)}</span>
        </div>
        <div className="px-2 pb-2 pt-3">
          <p className="text-[0.8rem] text-sourdine">{f.niveau}, {f.duree.replace('Exemple : ', '')}</p>
          <p className="mt-0.5 text-[1.05rem] font-bold leading-snug">{f.nom}</p>
        </div>
      </Link>
    </motion.div>
  );
}
