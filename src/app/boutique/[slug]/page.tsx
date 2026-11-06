import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { produits, getProduit, produitsAssocies, categoriesProduits } from '@/data/produits';
import { prixFcfa } from '@/data/site';
import { Galerie } from '@/components/ui/Galerie';
import { ActionsProduit } from '@/components/products/ActionsProduit';
import { CarteProduit } from '@/components/products/CarteProduit';
import { SuiviVue } from '@/components/analytics/SuiviVue';
import { MentionDemo } from '@/components/ui/Demo';

export function generateStaticParams() {
  return produits.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduit((await params).slug);
  if (!p) return {};
  return {
    title: `${p.nom} (${p.contenance})`,
    description: `${p.accroche} ${p.description}`.slice(0, 158),
    alternates: { canonical: `/boutique/${p.slug}` },
    openGraph: { images: [{ url: p.images[0].src, alt: p.images[0].alt }] },
  };
}

export default async function FicheProduit({ params }: { params: Promise<{ slug: string }> }) {
  const produit = getProduit((await params).slug);
  if (!produit) notFound();
  const categorie = categoriesProduits.find((c) => c.id === produit.categorie)!;

  return (
    <>
      <SuiviVue evenement="view_product" item={produit.slug} categorie={produit.categorie} />
      <div className="conteneur pt-28 lg:pt-32">
        <nav aria-label="Fil d’Ariane">
          <ol className="flex flex-wrap gap-2 text-[0.85rem] text-sourdine">
            <li><Link href="/" className="hover:underline">Accueil</Link></li>
            <li className="flex gap-2"><span aria-hidden>/</span><Link href="/boutique" className="hover:underline">Beauty Shop</Link></li>
            <li className="flex gap-2"><span aria-hidden>/</span><Link href={`/boutique?categorie=${categorie.id}`} className="hover:underline">{categorie.label}</Link></li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6 lg:self-start lg:sticky lg:top-28">
            <Galerie images={produit.images} />
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-[0.9rem] text-sourdine">{categorie.label}</p>
            <h1 className="titre mt-3 text-[clamp(2.6rem,4.6vw,4.2rem)] leading-[0.95]">{produit.nom}</h1>
            <p className="mt-5 text-[1.12rem] leading-relaxed">{produit.accroche}</p>
            <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-y border-filet py-5">
              <p className="titre chiffres text-4xl">{prixFcfa(produit.prix)}</p>
              <p className="text-sourdine">{produit.contenance}</p>
              <MentionDemo className="basis-full">Produit et prix de démonstration</MentionDemo>
            </div>

            <div className="mt-8"><ActionsProduit produit={produit} /></div>

            <ul className="mt-10 space-y-3 border-l-2 border-ambre pl-5 text-[0.95rem]">
              <li><span className="font-semibold">Commande en un message&nbsp;:</span> la liste est rédigée pour vous, l’équipe confirme la disponibilité.</li>
              <li><span className="font-semibold">Conseil avant achat&nbsp;:</span> vous pouvez poser vos questions avant de commander.</li>
              <li><span className="font-semibold">Paiement, retrait et livraison&nbsp;:</span> modalités à confirmer par Das’hair.</li>
            </ul>

            <div className="mt-12 border-t border-encre">
              {[
                { t: 'Ce que fait ce soin', c: <p>{produit.description}</p>, ouvert: true },
                { t: 'Pour qui', c: <p>{produit.pourQui}</p> },
                { t: 'Comment l’utiliser', c: <ol className="list-decimal space-y-1.5 pl-5">{produit.utilisation.map((u) => <li key={u}>{u}</li>)}</ol> },
                { t: 'Composition', c: <p>{produit.ingredients}</p> },
              ].map((s) => (
                <details key={s.t} open={s.ouvert} className="group border-b border-filet">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-5 font-semibold [&::-webkit-details-marker]:hidden">
                    {s.t}<span aria-hidden className="text-xl leading-none transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <div className="pb-6 leading-relaxed text-sourdine">{s.c}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section aria-labelledby="associes" className="section">
        <div className="conteneur">
          <h2 id="associes" className="titre text-[clamp(2.2rem,3.6vw,3.2rem)]">À associer dans votre routine</h2>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-3">
            {produitsAssocies(produit).map((p) => <li key={p.slug}><CarteProduit produit={p} /></li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
