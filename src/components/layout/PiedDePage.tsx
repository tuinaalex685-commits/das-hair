'use client';

import Link from 'next/link';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { ArrowUp, ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { navigation, site } from '@/data/site';
import { useBoutique } from '@/components/providers/Boutique';
import { defilerVers } from '@/components/providers/DefilementDoux';
import { IconeWhatsApp } from '@/components/ui/BoutonWhatsApp';
import { suivre } from '@/lib/analytics';
import { LienGererCookies } from '@/components/ui/BandeauCookies';

/**
 * Pied de page : un dernier appel (rendez-vous), les contacts réels « à compléter »,
 * et le nom de la maison en très grand. Le rond d'appel suit légèrement la souris.
 */
export function PiedDePage() {
  const annee = 2026; // fixe : Next 16 refuse une date calculée pendant la génération statique
  const { preparerWhatsApp } = useBoutique();
  const reduit = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 18 });
  const y = useSpring(my, { stiffness: 200, damping: 18 });

  const aimant = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduit || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.3);
    my.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const contacts = [
    { label: 'WhatsApp', Icone: IconeWhatsApp, action: () => { suivre('whatsapp_click', { source: 'pied_de_page' }); preparerWhatsApp("Bonjour Das'hair, j'aimerais avoir des informations.", 'Votre message est prêt'); } },
    { label: site.telephone ? `Appeler le ${site.telephone}` : 'Téléphone (à compléter)', Icone: Phone, href: site.telephone ? `tel:${site.telephone}` : undefined },
    { label: site.email ? `Écrire à ${site.email}` : 'E-mail (à compléter)', Icone: Mail, href: site.email ? `mailto:${site.email}` : undefined },
    { label: site.adresse ?? 'Adresse (à compléter)', Icone: MapPin },
  ];

  return (
    <footer className="sur-sombre relative mt-24 overflow-hidden rounded-t-[2rem] bg-encre pb-28 text-surface lg:pb-0">
      <div className="conteneur pt-20 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="titre text-[clamp(2.8rem,6vw,5.6rem)]">
              Votre prochain soin <span className="accent">commence</span> ici.
            </h2>
            <p className="mt-6 max-w-lg text-[1.05rem] text-sourdine-clair">Choisissez une prestation : votre demande de rendez-vous est rédigée pour vous, l’équipe confirme le créneau.</p>
          </div>
          <div className="flex lg:col-span-4 lg:justify-end">
            <motion.a href="/rendez-vous" onPointerMove={aimant} onPointerLeave={() => { mx.set(0); my.set(0); }}
              onClick={() => suivre('appointment_click', { source: 'pied_de_page' })}
              style={{ x, y }}
              className="group grid h-44 w-44 place-items-center rounded-full bg-indigo text-center text-white transition-colors hover:bg-indigo-fonce lg:h-52 lg:w-52">
              <span className="flex flex-col items-center gap-2 text-[1.05rem] font-semibold">
                <ArrowUpRight size={26} className="transition-transform duration-300 group-hover:rotate-45" />Prendre<br />rendez-vous
              </span>
            </motion.a>
          </div>
        </div>

        <div className="mt-20 grid gap-12 border-t border-surface/10 pt-12 md:grid-cols-12">
          <ul className="flex flex-wrap gap-3 md:col-span-5" aria-label="Nous joindre">
            {contacts.map(({ label, Icone, href, action }) => {
              const classe = 'grid h-13 w-13 place-items-center rounded-full border border-surface/15 transition-colors hover:border-surface hover:bg-surface hover:text-encre';
              return (
                <li key={label}>
                  {action ? <button onClick={action} aria-label={label} title={label} className={classe}><Icone size={19} /></button>
                    : href ? <a href={href} aria-label={label} title={label} className={classe}><Icone size={19} /></a>
                      : <span role="img" aria-label={label} title={label} className={`${classe} cursor-help opacity-50`}><Icone size={19} /></span>}
                </li>
              );
            })}
            <li>
              <button onClick={() => defilerVers(0)} aria-label="Revenir en haut" className="grid h-13 w-13 place-items-center rounded-full border border-surface/15 transition-colors hover:border-surface hover:bg-surface hover:text-encre"><ArrowUp size={19} /></button>
            </li>
          </ul>
          <nav aria-label="Pied de page" className="grid grid-cols-2 gap-8 text-[0.95rem] md:col-span-7 md:grid-cols-3">
            <ul className="space-y-3">
              {navigation.map((n) => <li key={n.href}><Link href={n.href} className="text-sourdine-clair transition-colors hover:text-white">{n.label}</Link></li>)}
            </ul>
            <ul className="space-y-3">
              <li><Link href="/mentions-legales" className="text-sourdine-clair hover:text-white">Mentions légales</Link></li>
              <li><Link href="/confidentialite" className="text-sourdine-clair hover:text-white">Confidentialité</Link></li>
              <li><Link href="/cookies" className="text-sourdine-clair hover:text-white">Politique de cookies</Link></li>
              <li><LienGererCookies className="text-left text-sourdine-clair hover:text-white" /></li>
              <li><Link href="/contact" className="text-sourdine-clair hover:text-white">Écrire à la maison</Link></li>
            </ul>
            <p className="col-span-2 text-[0.85rem] text-sourdine-clair md:col-span-1">Horaires&nbsp;: {site.horaires ?? 'à compléter'}</p>
          </nav>
        </div>
      </div>

      <p aria-hidden className="titre pointer-events-none mt-16 select-none whitespace-nowrap px-3 text-center text-[clamp(5rem,21vw,22rem)] leading-[0.78] text-surface">
        Das<span className="text-ambre">’</span><span className="accent !text-surface">hair</span>
      </p>
      <div className="conteneur flex flex-col gap-2 border-t border-surface/10 py-6 text-[0.8rem] text-sourdine-clair md:flex-row md:justify-between">
        <p>© {annee} Das&rsquo;hair. Prototype : produits, prestations, formations et prix sont des exemples.</p>
        <p>Photographies : Unsplash (licence Unsplash).</p>
      </div>
    </footer>
  );
}
