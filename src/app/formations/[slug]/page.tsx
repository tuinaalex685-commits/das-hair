import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formations, getFormation } from '@/data/formations';
import { prixFcfa } from '@/data/site';
import { Formulaire } from '@/components/forms/Formulaire';
import { MentionDemo } from '@/components/ui/Demo';
import { SuiviVue } from '@/components/analytics/SuiviVue';
import { LignesTitre } from '@/components/animations/Revelation';

export function generateStaticParams() {
  return formations.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const f = getFormation((await params).slug);
  if (!f) return {};
  return {
    title: `Formation : ${f.nom}`,
    description: `${f.accroche} ${f.description}`.slice(0, 158),
    alternates: { canonical: `/formations/${f.slug}` },
    openGraph: { images: [{ url: f.image.src, alt: f.image.alt }] },
  };
}

export default async function FicheFormation({ params }: { params: Promise<{ slug: string }> }) {
  const f = getFormation((await params).slug);
  if (!f) notFound();

  return (
    <>
      <SuiviVue evenement="view_training" item={f.slug} />
      <header className="sur-sombre relative overflow-hidden bg-encre text-surface">
        <div className="conteneur grid gap-10 pb-16 pt-32 lg:grid-cols-12 lg:pb-20 lg:pt-40">
          <div className="lg:col-span-7">
            <nav aria-label="Fil d’Ariane">
              <ol className="flex flex-wrap gap-2 text-[0.85rem] text-sourdine-clair">
                <li><Link href="/" className="hover:underline">Accueil</Link></li>
                <li className="flex gap-2"><span aria-hidden>/</span><Link href="/formations" className="hover:underline">Academy</Link></li>
              </ol>
            </nav>
            <span className="etiquette mt-8 inline-block rounded-full bg-indigo px-3 py-1.5 uppercase text-white">{f.niveau}</span>
            <h1 className="titre mt-5 text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.92]"><LignesTitre lignes={[f.nom]} /></h1>
            <p className="mt-6 max-w-xl text-[1.1rem] leading-relaxed text-surface/80">{f.accroche}</p>
            <dl className="mt-10 grid max-w-xl grid-cols-3 border-t border-surface/15 pt-6 text-[0.95rem]">
              <div><dt className="text-[0.8rem] text-sourdine-clair">Durée</dt><dd className="mt-1 font-semibold">{f.duree}</dd></div>
              <div><dt className="text-[0.8rem] text-sourdine-clair">Format</dt><dd className="mt-1 font-semibold">{f.format}</dd></div>
              <div><dt className="text-[0.8rem] text-sourdine-clair">Tarif</dt><dd className="chiffres mt-1 font-semibold">{prixFcfa(f.tarif)}</dd></div>
            </dl>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-carte)] lg:col-span-5 lg:aspect-auto">
            <Image src={f.image.src} alt={f.image.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </header>

      <div className="conteneur grid gap-16 py-20 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="text-[1.15rem] leading-relaxed">{f.description}</p>

          <h2 className="titre mt-14 text-3xl">Vous saurez</h2>
          <ul className="mt-5 space-y-3">
            {f.objectifs.map((o) => (
              <li key={o} className="flex gap-3"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo" />{o}</li>
            ))}
          </ul>

          <h2 className="titre mt-14 text-3xl">Programme</h2>
          <ol className="mt-5 border-t border-encre">
            {f.programme.map((m, i) => (
              <li key={m.titre} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-filet py-5">
                <span className="chiffres titre text-2xl text-indigo">0{i + 1}</span>
                <span><strong className="block">{m.titre}</strong><span className="text-sourdine">{m.detail}</span></span>
              </li>
            ))}
          </ol>

          <dl className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-[1.2rem] bg-fond-2 p-6"><dt className="etiquette uppercase text-sourdine">Pour qui</dt><dd className="mt-2">{f.public}</dd></div>
            <div className="rounded-[1.2rem] bg-fond-2 p-6"><dt className="etiquette uppercase text-sourdine">Prérequis</dt><dd className="mt-2">{f.prerequis}</dd></div>
          </dl>
        </div>

        <aside id="inscription" className="lg:sticky lg:top-28 lg:col-span-5 lg:col-start-8 lg:self-start">
          <div className="rounded-[var(--radius-carte)] border border-filet bg-surface p-6 md:p-8">
            <h2 className="titre text-3xl">Demander mon <span className="accent">inscription</span></h2>
            <p className="mt-2 text-sourdine">L’équipe vous confirme la prochaine session et les modalités.</p>
            <div className="mt-7">
              <Formulaire evenement="training_registration_click" item={f.slug} bouton="Préparer ma demande" titreMessage="Votre demande d’inscription est prête"
                intro={`Bonjour Das'hair, je souhaite m'inscrire à la formation « ${f.nom} ».`}
                champs={[
                  { nom: 'nom', label: 'Nom et prénom', requis: true, autoComplete: 'name' },
                  { nom: 'telephone', label: 'Téléphone (WhatsApp)', type: 'tel', requis: true, autoComplete: 'tel' },
                  { nom: 'niveau', label: 'Votre niveau actuel', type: 'select', options: ['Je débute complètement', 'Je coiffe à la maison', 'Je coiffe déjà des clientes'] },
                  { nom: 'message', label: 'Une question', type: 'textarea' },
                ]} />
            </div>
            <MentionDemo className="mt-5">Formation et tarif de démonstration</MentionDemo>
          </div>
        </aside>
      </div>
    </>
  );
}
