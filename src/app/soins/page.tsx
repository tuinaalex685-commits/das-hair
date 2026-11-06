import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { prestations, categoriesPrestations } from '@/data/prestations';
import { prixFcfa } from '@/data/site';
import { EnTetePage } from '@/components/layout/EnTetePage';
import { BoutonLien } from '@/components/ui/Bouton';
import { MentionDemo } from '@/components/ui/Demo';
import { Faq } from '@/components/ui/Faq';
import { SuiviVue } from '@/components/analytics/SuiviVue';
import type { CategoriePrestation } from '@/types';

export const metadata: Metadata = {
  title: 'Beauty & Hair Care : coiffures, soins capillaires et beauté',
  description: "Tresses sans nœuds, nattes collées, soins du cuir chevelu, rituels d'hydratation et mise en beauté. Chaque prestation Das'hair commence par un diagnostic.",
  alternates: { canonical: '/soins' },
};

type Params = Promise<{ categorie?: string }>;

async function ListeFiltree({ searchParams }: { searchParams: Params }) {
  const { categorie } = await searchParams;
  return <Liste filtre={categoriesPrestations.find((c) => c.id === categorie)?.id} />;
}

export default function Soins({ searchParams }: { searchParams: Params }) {
  return (
    <>
      <SuiviVue evenement="view_service" item="liste" />
      <EnTetePage fil={[{ label: 'Beauty & Hair Care' }]} titre={['Beauty &', 'Hair Care']}
        image={{ src: '/images/soins/tresses-mains.webp', alt: 'Mains qui tressent des cheveux en petites sections' }}
        intro="Coiffures protectrices, soins du cheveu et du cuir chevelu, beauté du visage. Au salon, sur rendez-vous, et toujours après un échange sur votre cheveu ou votre peau.">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <BoutonLien href="/rendez-vous" variante="indigo">Prendre rendez-vous</BoutonLien>
          <MentionDemo className="!text-sourdine-clair">Prestations, durées et tarifs indicatifs</MentionDemo>
        </div>
      </EnTetePage>

      {/* Le filtre vient de l'URL : sans lui (pendant le prérendu), la liste complète s'affiche. */}
      <Suspense fallback={<Liste />}>
        <ListeFiltree searchParams={searchParams} />
      </Suspense>

      <div className="conteneur section">
        <Faq questions={[
          { q: 'Comment réserver ?', r: 'Remplissez la demande de rendez-vous (soin, jour, moment, numéro). Elle est rédigée pour vous et s’envoie par WhatsApp ; l’équipe confirme un créneau précis.' },
          { q: 'Les tarifs sont-ils fixes ?', r: 'Ce sont des tarifs « à partir de », indicatifs dans ce prototype. Le prix final dépend de la longueur, de l’épaisseur et du travail demandé ; il est annoncé avant de commencer.' },
          { q: 'Dois-je venir les cheveux lavés ?', r: 'Pour les coiffures protectrices, c’est conseillé : la séance est plus courte. Pour un soin, venez tel quel, il commence par le lavage.' },
          { q: 'Puis-je annuler ou déplacer ?', r: 'Oui, prévenez l’équipe dès que possible par WhatsApp. Les conditions exactes seront précisées par Das’hair.' },
        ]} />
      </div>
    </>
  );
}

function Liste({ filtre }: { filtre?: CategoriePrestation }) {
  const groupes = categoriesPrestations.filter((c) => !filtre || c.id === filtre);
  return (
    <>
      <nav aria-label="Filtrer les prestations" className="conteneur sticky top-3 z-30 mt-10">
        <ul className="flex w-max max-w-full gap-1 overflow-x-auto rounded-full border border-filet bg-surface/85 p-1.5 backdrop-blur">
          {[{ id: undefined, label: 'Tout' }, ...categoriesPrestations].map((c) => {
            const actif = filtre === c.id;
            return (
              <li key={c.label} className="shrink-0">
                <Link href={c.id ? `/soins?categorie=${c.id}` : '/soins'} scroll={false} aria-current={actif ? 'true' : undefined}
                  className={`block rounded-full px-4 py-2 text-[0.9rem] font-medium transition-colors ${actif ? 'bg-encre text-surface' : 'hover:bg-fond-2'}`}>{c.label}</Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="conteneur pb-10">
        {groupes.map((c, gi) => (
          <section key={c.id} aria-labelledby={`cat-${c.id}`} className="pt-16">
            <div className="flex items-baseline justify-between gap-6 border-b border-encre pb-4">
              <h2 id={`cat-${c.id}`} className="titre text-[clamp(2rem,3.4vw,3rem)]">{c.label}</h2>
              <span className="chiffres text-sourdine">0{gi + 1}</span>
            </div>
            <ul className="mt-8 grid gap-x-6 gap-y-14 md:grid-cols-2">
              {prestations.filter((p) => p.categorie === c.id).map((p) => (
                <li key={p.slug}>
                  <Link href={`/soins/${p.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-carte)] bg-fond-2">
                      <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 768px) 45vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-[var(--ease-sortie)] group-hover:scale-[1.04]" />
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-6">
                      <div>
                        <h3 className="titre text-[clamp(1.6rem,2.4vw,2.1rem)] leading-tight transition-colors group-hover:text-indigo">{p.nom}</h3>
                        <p className="mt-2 max-w-md text-sourdine">{p.accroche}</p>
                      </div>
                      <p className="chiffres shrink-0 text-right text-[0.92rem]">
                        <span className="block text-sourdine">{p.duree}</span>
                        <span className="block font-semibold">dès {prixFcfa(p.tarifAPartirDe)}</span>
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
