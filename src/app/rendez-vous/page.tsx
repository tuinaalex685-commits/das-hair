import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { FormulaireRendezVous } from '@/components/forms/FormulaireRendezVous';
import { LignesTitre } from '@/components/animations/Revelation';
import { MentionDemo } from '@/components/ui/Demo';
import { SuiviVue } from '@/components/analytics/SuiviVue';

export const metadata: Metadata = {
  title: 'Prendre rendez-vous',
  description: "Choisissez votre soin, le jour qui vous arrange et laissez votre numéro : votre demande de rendez-vous Das'hair est rédigée en une minute.",
  alternates: { canonical: '/rendez-vous' },
};

type Params = Promise<{ prestation?: string }>;

/** Seule la présélection dépend de l'URL : elle est lue dans un îlot Suspense, le reste se prérend. */
async function FormulaireDepuisUrl({ searchParams }: { searchParams: Params }) {
  const { prestation } = await searchParams;
  return <FormulaireRendezVous initiale={prestation} />;
}

export default function RendezVous({ searchParams }: { searchParams: Params }) {
  return (
    <>
      <SuiviVue evenement="view_service" item="rendez-vous" />
      <div className="sur-sombre relative overflow-hidden bg-encre text-surface">
        <Image src="/images/soins/salon-lumiere.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-encre/40 to-encre" aria-hidden />
        <div className="conteneur relative grid gap-12 pb-20 pt-32 lg:grid-cols-12 lg:pb-28 lg:pt-40">
          <div className="lg:col-span-4">
            <nav aria-label="Fil d’Ariane">
              <ol className="flex gap-2 text-[0.85rem] text-sourdine-clair">
                <li><Link href="/" className="hover:underline">Accueil</Link></li>
                <li className="flex gap-2"><span aria-hidden>/</span><span aria-current="page">Rendez-vous</span></li>
              </ol>
            </nav>
            <h1 className="titre mt-8 text-[clamp(3rem,6.4vw,5.8rem)] leading-[0.9]">
              <LignesTitre lignes={['Votre', 'moment', 'au salon.']} />
            </h1>
            <p className="mt-8 max-w-sm text-[1.08rem] leading-relaxed text-surface/80">
              Trois questions, une minute. La demande est rédigée pour vous, l’équipe vous confirme le créneau sur WhatsApp.
            </p>
            <ol className="mt-10 space-y-5 border-l border-surface/20 pl-6 text-[0.95rem]">
              {[
                ['Vous choisissez', 'Le soin, le jour, le moment.'],
                ['On confirme', 'Un créneau précis, selon l’agenda du salon.'],
                ['Vous venez', 'Le soin commence par un échange.'],
              ].map(([t, d], i) => (
                <li key={t}><span className="chiffres text-indigo-clair">0{i + 1}</span> <strong>{t}</strong><span className="block text-sourdine-clair">{d}</span></li>
              ))}
            </ol>
            <MentionDemo className="mt-8">Prestations et tarifs de démonstration</MentionDemo>
          </div>
          <div className="text-encre lg:col-span-8">
            <Suspense fallback={<div className="h-[42rem] animate-pulse rounded-[var(--radius-carte)] bg-surface/90" />}>
              <FormulaireDepuisUrl searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
