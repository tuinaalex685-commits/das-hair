import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prestations, getPrestation, prestationsAssociees, categoriesPrestations } from '@/data/prestations';
import { prixFcfa } from '@/data/site';
import { Galerie } from '@/components/ui/Galerie';
import { BoutonLien } from '@/components/ui/Bouton';
import { BoutonWhatsApp } from '@/components/ui/BoutonWhatsApp';
import { MentionDemo } from '@/components/ui/Demo';
import { SuiviVue } from '@/components/analytics/SuiviVue';

export function generateStaticParams() {
  return prestations.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPrestation((await params).slug);
  if (!p) return {};
  return {
    title: p.nom,
    description: `${p.accroche} ${p.description}`.slice(0, 158),
    alternates: { canonical: `/soins/${p.slug}` },
    openGraph: { images: [{ url: p.image.src, alt: p.image.alt }] },
  };
}

export default async function FichePrestation({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPrestation((await params).slug);
  if (!p) notFound();
  const categorie = categoriesPrestations.find((c) => c.id === p.categorie)!;

  return (
    <>
      <SuiviVue evenement="view_service" item={p.slug} categorie={p.categorie} />
      <div className="conteneur pt-28 lg:pt-32">
        <nav aria-label="Fil d’Ariane">
          <ol className="flex flex-wrap gap-2 text-[0.85rem] text-sourdine">
            <li><Link href="/" className="hover:underline">Accueil</Link></li>
            <li className="flex gap-2"><span aria-hidden>/</span><Link href="/soins" className="hover:underline">Beauty &amp; Hair Care</Link></li>
            <li className="flex gap-2"><span aria-hidden>/</span><Link href={`/soins?categorie=${categorie.id}`} className="hover:underline">{categorie.label}</Link></li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:col-span-6 lg:self-start">
            <Galerie images={[p.image, ...p.galerie]} />
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-[0.9rem] text-sourdine">{categorie.label}</p>
            <h1 className="titre mt-3 text-[clamp(2.6rem,4.6vw,4.2rem)] leading-[0.95]">{p.nom}</h1>
            <p className="mt-5 text-[1.12rem] leading-relaxed">{p.accroche}</p>

            <dl className="mt-7 grid grid-cols-2 border-y border-filet">
              <div className="border-r border-filet py-5 pr-4"><dt className="text-[0.82rem] text-sourdine">Durée</dt><dd className="chiffres mt-1 font-semibold">{p.duree}</dd></div>
              <div className="py-5 pl-5"><dt className="text-[0.82rem] text-sourdine">Tarif</dt><dd className="titre chiffres mt-1 text-2xl">dès {prixFcfa(p.tarifAPartirDe)}</dd></div>
            </dl>
            <MentionDemo className="mt-3">Durée et tarif indicatifs, confirmés avant la séance</MentionDemo>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BoutonLien href={`/rendez-vous?prestation=${p.slug}`} variante="indigo">Réserver ce soin</BoutonLien>
              <BoutonWhatsApp variante="secondaire" evenement="appointment_click" item={p.slug} titre="Votre question est prête"
                message={`Bonjour Das'hair, j'ai une question sur la prestation « ${p.nom} » : `}>
                Poser une question
              </BoutonWhatsApp>
            </div>

            <div className="mt-12">
              <h2 className="titre text-2xl">Ce qui vous attend</h2>
              <p className="mt-4 leading-relaxed text-sourdine">{p.description}</p>
            </div>

            <div className="mt-10">
              <h2 className="titre text-2xl">Déroulement</h2>
              <ol className="mt-5 space-y-0 border-t border-filet">
                {p.deroulement.map((d, i) => (
                  <li key={d} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-filet py-4">
                    <span className="chiffres grid h-8 w-8 place-items-center rounded-full bg-encre text-[0.8rem] font-bold text-surface">{i + 1}</span>
                    <span className="pt-1">{d}</span>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="mt-10 rounded-[1.2rem] bg-indigo-clair p-6">
              <p className="etiquette uppercase text-indigo-fonce">Bon à savoir</p>
              <p className="mt-2 leading-relaxed">{p.aSavoir}</p>
            </aside>
          </div>
        </div>
      </div>

      <section aria-labelledby="autres" className="section">
        <div className="conteneur">
          <h2 id="autres" className="titre text-[clamp(2.2rem,3.6vw,3.2rem)]">D’autres <span className="accent">soins</span> à découvrir</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {prestationsAssociees(p).map((s) => (
              <li key={s.slug}>
                <Link href={`/soins/${s.slug}`} className="group grid grid-cols-[7rem_1fr] items-center gap-5 rounded-[var(--radius-carte)] border border-filet p-3 transition-colors hover:border-encre sm:grid-cols-[9rem_1fr]">
                  <span className="relative aspect-square overflow-hidden rounded-[1.2rem]"><Image src={s.image.src} alt="" fill sizes="144px" className="object-cover" /></span>
                  <span>
                    <span className="titre block text-[1.5rem] leading-tight group-hover:text-indigo">{s.nom}</span>
                    <span className="chiffres mt-2 block text-[0.9rem] text-sourdine">{s.duree} · dès {prixFcfa(s.tarifAPartirDe)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
