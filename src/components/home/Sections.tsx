import { BoutonLien } from '@/components/ui/Bouton';
import { MentionDemo } from '@/components/ui/Demo';
import { CarteProduit } from '@/components/products/CarteProduit';
import { produitsVedettes } from '@/data/produits';
import { prestations } from '@/data/prestations';
import { formations } from '@/data/formations';

/** Bande des savoir-faire : défile seule, s'arrête au survol. */
export function Bandeau() {
  const mots = [...prestations.map((p) => p.nom), ...formations.slice(0, 2).map((f) => f.nom)];
  const ligne = (cache: boolean) => (
    <ul aria-hidden={cache} className="flex shrink-0 items-center">
      {mots.map((m) => (
        <li key={m} className="flex items-center">
          <span className="titre whitespace-nowrap px-6 text-[clamp(1.6rem,3vw,2.6rem)]">{m}</span>
          <span aria-hidden className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-indigo" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Nos savoir-faire" className="group overflow-hidden border-y border-filet py-7">
      <div className="flex w-max animate-defile group-hover:[animation-play-state:paused]">
        {ligne(false)}{ligne(true)}
      </div>
    </section>
  );
}

/** La sélection : une bande de produits qui défile au doigt, comme une vitrine. */
export function Selection() {
  const vedettes = produitsVedettes();
  return (
    <section aria-labelledby="selection" className="section">
      <div className="conteneur flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 id="selection" className="titre text-[clamp(2.6rem,5vw,4.6rem)]">La sélection <span className="accent">du moment</span></h2>
          <MentionDemo className="mt-4">Produits et prix de démonstration</MentionDemo>
        </div>
        <BoutonLien href="/boutique" variante="secondaire">Toute la boutique</BoutonLien>
      </div>
      <div className="mt-12 overflow-x-auto pb-6 [scrollbar-width:none]" data-lenis-prevent-wheel>
        <ul className="conteneur flex snap-x snap-mandatory gap-5 lg:grid lg:grid-cols-4 lg:gap-6">
          {vedettes.map((p) => (
            <li key={p.slug} className="w-[74vw] shrink-0 snap-start sm:w-[42vw] lg:w-auto">
              <CarteProduit produit={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
