import Link from 'next/link';
import { BoutonLien } from '@/components/ui/Bouton';

export default function PageIntrouvable() {
  return (
    <section className="conteneur flex min-h-[80svh] flex-col justify-center pb-16 pt-32">
      <p className="chiffres etiquette uppercase text-sourdine">Erreur 404</p>
      <h1 className="titre mt-6 text-[clamp(3.2rem,9vw,8rem)] leading-[0.88]">
        Cette page a <span className="accent">filé</span>.
      </h1>
      <p className="mt-8 max-w-lg text-[1.1rem] leading-relaxed text-sourdine">
        Le lien est peut-être ancien, ou l’adresse mal recopiée. Reprenez depuis l’un de ces chemins.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <BoutonLien href="/">Retour à l’accueil</BoutonLien>
        <BoutonLien href="/rendez-vous" variante="secondaire">Prendre rendez-vous</BoutonLien>
      </div>
      <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-filet pt-6 text-[0.95rem] font-semibold">
        {[['/boutique', 'Beauty Shop'], ['/soins', 'Beauty & Hair Care'], ['/formations', 'Academy'], ['/contact', 'Contact']].map(([h, l]) => (
          <li key={h}><Link href={h} className="underline decoration-filet underline-offset-[6px] hover:decoration-indigo">{l}</Link></li>
        ))}
      </ul>
    </section>
  );
}
