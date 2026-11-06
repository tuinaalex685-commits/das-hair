import type { Metadata } from 'next';
import Image from 'next/image';
import { EnTetePage } from '@/components/layout/EnTetePage';
import { BoutonLien } from '@/components/ui/Bouton';
import { ACompleter } from '@/components/ui/Demo';
import { RevelationImage } from '@/components/animations/Revelation';

export const metadata: Metadata = {
  title: 'La maison',
  description: "Das'hair, maison de beauté : une boutique de soins, un salon pour les coiffures et les soins, une académie pour transmettre les gestes du métier.",
  alternates: { canonical: '/a-propos' },
};

const PRINCIPES = [
  { t: 'Regarder avant de toucher', d: 'Chaque prestation commence par un échange sur le cheveu, le cuir chevelu ou la peau. On décide ensemble, jamais à votre place.' },
  { t: 'Le cheveu texturé, d’abord', d: 'Bouclé, frisé, crépu : des gestes et des produits pensés pour lui, sans chercher à le transformer.' },
  { t: 'Dire les choses simplement', d: 'Durée, prix, entretien : tout est annoncé avant de commencer. Pas de promesse de miracle.' },
  { t: 'Transmettre', d: 'L’Academy partage le geste juste avec celles qui veulent apprendre, à la maison ou pour en faire leur métier.' },
];

export default function APropos() {
  return (
    <>
      <EnTetePage fil={[{ label: 'La maison' }]} titre={['Une maison', 'de beauté.']}
        intro="Une boutique de soins, un salon et une académie, réunis sous un même toit et autour d’une même idée : prendre soin du cheveu tel qu’il est." />

      <section className="conteneur grid gap-10 pb-20 lg:grid-cols-12">
        <RevelationImage className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-carte)] lg:col-span-5">
          <Image src="/images/portraits/profil-boucles.webp" alt="Profil d’une femme aux cheveux bouclés" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </RevelationImage>
        <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
          <p className="titre text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.02]">
            Le soin <span className="accent">commence</span> par l’écoute, et se poursuit à la maison.
          </p>
          <p className="mt-8 max-w-lg text-[1.08rem] leading-relaxed text-sourdine">
            Das’hair réunit trois métiers complémentaires : choisir les bons produits, réaliser les coiffures et les soins au salon, et apprendre les gestes pour les refaire soi-même.
          </p>
          <p className="mt-5 max-w-lg text-[1.08rem] leading-relaxed text-sourdine">
            <ACompleter>L’histoire de la fondatrice, l’année d’ouverture et le quartier du salon</ACompleter>
          </p>
        </div>
      </section>

      <section aria-labelledby="principes" className="px-2 sm:px-4">
        <div className="sur-sombre section mx-auto max-w-[96rem] rounded-[2rem] bg-encre text-surface">
          <div className="conteneur">
            <h2 id="principes" className="titre text-[clamp(2.4rem,4.6vw,4.2rem)]">Ce qui ne <span className="accent">change pas</span>.</h2>
            <ol className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
              {PRINCIPES.map((p, i) => (
                <li key={p.t} className="border-t border-surface/20 pt-6">
                  <span className="chiffres text-indigo-clair">0{i + 1}</span>
                  <h3 className="titre mt-3 text-[1.9rem]">{p.t}</h3>
                  <p className="mt-3 max-w-md text-sourdine-clair">{p.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="conteneur section grid items-center gap-10 md:grid-cols-[1fr_auto]">
        <h2 className="titre text-[clamp(2rem,3.4vw,3rem)]">Venez nous voir au salon.</h2>
        <div className="flex flex-wrap gap-4">
          <BoutonLien href="/rendez-vous" variante="indigo">Prendre rendez-vous</BoutonLien>
          <BoutonLien href="/contact" variante="secondaire">Nous écrire</BoutonLien>
        </div>
      </section>
    </>
  );
}
