import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { site } from '@/data/site';
import { EnTetePage } from '@/components/layout/EnTetePage';
import { Formulaire } from '@/components/forms/Formulaire';
import { BoutonWhatsApp } from '@/components/ui/BoutonWhatsApp';
import { ACompleter } from '@/components/ui/Demo';

export const metadata: Metadata = {
  title: 'Contact',
  description: "Une question sur un produit, un soin ou une formation ? Écrivez à Das'hair : la réponse arrive sur WhatsApp.",
  alternates: { canonical: '/contact' },
};

export default function Contact() {
  const infos = [
    { Icone: Phone, t: 'Téléphone', v: site.telephone, href: site.telephone ? `tel:${site.telephone}` : undefined },
    { Icone: Mail, t: 'E-mail', v: site.email, href: site.email ? `mailto:${site.email}` : undefined },
    { Icone: MapPin, t: 'Adresse du salon', v: site.adresse },
    { Icone: Clock, t: 'Horaires', v: site.horaires },
  ];

  return (
    <>
      <EnTetePage fil={[{ label: 'Contact' }]} titre={['Parlons-en.']}
        intro="Un produit, un soin, une formation : posez votre question, l’équipe vous répond sur WhatsApp. Pour réserver directement, passez par la demande de rendez-vous." />

      <div className="conteneur grid gap-16 pb-24 lg:grid-cols-12">
        <section aria-labelledby="ecrire" className="lg:col-span-7">
          <div className="rounded-[var(--radius-carte)] border border-filet bg-surface p-6 md:p-10">
            <h2 id="ecrire" className="titre text-3xl">Écrire à la maison</h2>
            <div className="mt-7">
              <Formulaire evenement="contact_form_submit" item="contact" bouton="Préparer mon message" titreMessage="Votre message est prêt"
                intro="Bonjour Das'hair,"
                champs={[
                  { nom: 'nom', label: 'Nom et prénom', requis: true, autoComplete: 'name' },
                  { nom: 'telephone', label: 'Téléphone (WhatsApp)', type: 'tel', requis: true, autoComplete: 'tel' },
                  { nom: 'sujet', label: 'Sujet', type: 'select', requis: true, options: ['Un produit de la boutique', 'Une prestation au salon', 'Une formation Academy', 'Autre chose'] },
                  { nom: 'message', label: 'Votre message', type: 'textarea', requis: true },
                ]} />
            </div>
          </div>
        </section>

        <aside className="lg:col-span-4 lg:col-start-9">
          <h2 className="etiquette uppercase text-sourdine">Coordonnées</h2>
          <ul className="mt-4 border-t border-encre">
            {infos.map(({ Icone, t, v, href }) => (
              <li key={t} className="flex gap-4 border-b border-filet py-5">
                <Icone size={20} strokeWidth={1.6} className="mt-0.5 shrink-0 text-indigo" />
                <div>
                  <p className="text-[0.85rem] text-sourdine">{t}</p>
                  <p className="mt-0.5 font-semibold">{v ? (href ? <a href={href} className="hover:underline">{v}</a> : v) : <ACompleter>{t}</ACompleter>}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <BoutonWhatsApp evenement="whatsapp_click" item="contact" titre="Votre message est prêt" message="Bonjour Das'hair, ">
              Écrire sur WhatsApp
            </BoutonWhatsApp>
          </div>
          <p className="mt-8 text-sourdine">
            Envie de réserver&nbsp;? <Link href="/rendez-vous" className="font-semibold text-encre underline decoration-filet underline-offset-[6px] hover:decoration-indigo">Prendre rendez-vous</Link>
          </p>
        </aside>
      </div>
    </>
  );
}
