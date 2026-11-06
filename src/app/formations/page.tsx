import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { formations } from '@/data/formations';
import { prixFcfa } from '@/data/site';
import { EnTetePage } from '@/components/layout/EnTetePage';
import { MentionDemo } from '@/components/ui/Demo';
import { Faq } from '@/components/ui/Faq';
import { SuiviVue } from '@/components/analytics/SuiviVue';
import { BoutonWhatsApp } from '@/components/ui/BoutonWhatsApp';

export const metadata: Metadata = {
  title: 'Academy : formations coiffure et soins capillaires',
  description: "Formations en présentiel et en petits groupes : tresses, nattes et motifs, soins capillaires, accueil et conseil. Apprenez les gestes du métier avec Das'hair.",
  alternates: { canonical: '/formations' },
};

export default function Formations() {
  return (
    <>
      <SuiviVue evenement="view_training" item="liste" />
      <EnTetePage fil={[{ label: 'Academy' }]} titre={['Apprendre', 'le geste.']}
        image={{ src: '/images/academy/atelier-nb.webp', alt: 'Atelier de formation en noir et blanc' }}
        intro="Des formations pratiques, en présentiel et en petits groupes : on démontre, vous pratiquez, on corrige. Du premier geste au perfectionnement.">
        <MentionDemo className="!text-sourdine-clair">Programmes, durées et tarifs indicatifs</MentionDemo>
      </EnTetePage>

      <section aria-label="Formations" className="conteneur section">
        <ol className="border-t border-encre">
          {formations.map((f, i) => (
            <li key={f.slug} className="border-b border-filet">
              <Link href={`/formations/${f.slug}`} className="group grid items-center gap-6 py-8 md:grid-cols-[4rem_1fr_14rem_auto] md:gap-10">
                <span className="chiffres titre text-3xl text-sourdine transition-colors group-hover:text-indigo">0{i + 1}</span>
                <span>
                  <span className="etiquette inline-block rounded-full border border-filet px-3 py-1 uppercase text-sourdine">{f.niveau}</span>
                  <span className="titre mt-3 block text-[clamp(1.8rem,3vw,2.8rem)] leading-tight transition-colors group-hover:text-indigo">{f.nom}</span>
                  <span className="mt-2 block max-w-xl text-sourdine">{f.accroche}</span>
                </span>
                <span className="chiffres text-[0.95rem]">
                  <span className="block text-sourdine">{f.duree} · {f.format}</span>
                  <span className="mt-1 block font-semibold">{prixFcfa(f.tarif)}</span>
                </span>
                <span className="relative hidden h-28 w-24 overflow-hidden rounded-[1rem] md:block">
                  <Image src={f.image.src} alt="" fill sizes="96px" className="object-cover grayscale transition-[filter,transform] duration-500 group-hover:scale-105 group-hover:grayscale-0" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-2 sm:px-4">
        <div className="sur-sombre mx-auto grid max-w-[96rem] gap-8 rounded-[2rem] bg-indigo px-6 py-14 text-white md:grid-cols-[1fr_auto] md:items-center md:px-16">
          <div>
            <h2 className="titre text-[clamp(2rem,3.6vw,3.2rem)]">Vous ne savez pas par où commencer&nbsp;?</h2>
            <p className="mt-3 max-w-xl text-white/80">Dites-nous ce que vous savez déjà faire : l’équipe vous oriente vers la formation adaptée.</p>
          </div>
          <BoutonWhatsApp variante="clair" evenement="training_contact_click" item="orientation" titre="Votre demande est prête"
            message="Bonjour Das'hair, j'aimerais être orientée vers une formation. Mon niveau actuel : ">
            Être orientée
          </BoutonWhatsApp>
        </div>
      </section>

      <div className="conteneur section">
        <Faq questions={[
          { q: 'Faut-il une expérience ?', r: 'Non pour les formations « Débutant ». Chaque fiche précise le public visé et les prérequis.' },
          { q: 'Le matériel est-il fourni ?', r: 'Les têtes d’entraînement et le matériel de base seront précisés pour chaque session par Das’hair.' },
          { q: 'Délivrez-vous un diplôme ?', r: 'Ce prototype ne mentionne aucun diplôme ni certification. Une attestation éventuelle sera indiquée par Das’hair si elle existe.' },
          { q: 'Comment s’inscrire ?', r: 'Ouvrez la formation, remplissez la demande d’inscription : elle est envoyée par WhatsApp et l’équipe confirme la prochaine session.' },
        ]} />
      </div>
    </>
  );
}
