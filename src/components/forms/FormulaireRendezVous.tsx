'use client';

import Image from 'next/image';
import { useId, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ArrowLeft } from 'lucide-react';
import { prestations, categoriesPrestations } from '@/data/prestations';
import { prixFcfa } from '@/data/site';
import { useBoutique } from '@/components/providers/Boutique';
import { composerMessage, propre } from '@/lib/whatsapp';
import { suivre } from '@/lib/analytics';
import { classeBouton, Fleche } from '@/components/ui/Bouton';

/**
 * Prise de rendez-vous en trois étapes : le soin → le moment → vos coordonnées.
 * Aucune réservation n'est enregistrée (pas de serveur) : la demande complète est rédigée
 * puis envoyée par WhatsApp ; l'équipe confirme le créneau réel.
 */
const CRENEAUX = [
  { id: 'matin', label: 'Matin', detail: '8 h – 12 h' },
  { id: 'midi', label: 'Début d’après-midi', detail: '12 h – 15 h' },
  { id: 'soir', label: 'Fin de journée', detail: '15 h – 19 h' },
] as const;

const ETAPES = ['Le soin', 'Le moment', 'Vos coordonnées'] as const;

type Valeurs = { prestation: string; date: string; creneau: string; souple: boolean; nom: string; telephone: string; cheveux: string; note: string };

const aujourdhui = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

function dateLisible(iso: string) {
  if (!iso) return '';
  return new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(`${iso}T12:00:00`));
}

export function FormulaireRendezVous({ initiale }: { initiale?: string }) {
  const id = useId();
  const { preparerWhatsApp } = useBoutique();
  const depart = prestations.some((p) => p.slug === initiale) ? initiale! : '';
  const [etape, setEtape] = useState(depart ? 1 : 0);
  const [sens, setSens] = useState(1);
  const [fini, setFini] = useState(false);
  const [v, setV] = useState<Valeurs>({ prestation: depart, date: '', creneau: '', souple: false, nom: '', telephone: '', cheveux: '', note: '' });
  const [erreurs, setErreurs] = useState<Partial<Record<keyof Valeurs, string>>>({});
  const choisie = useMemo(() => prestations.find((p) => p.slug === v.prestation), [v.prestation]);
  const maj = <K extends keyof Valeurs>(k: K, val: Valeurs[K]) => { setV((x) => ({ ...x, [k]: val })); setErreurs((e) => ({ ...e, [k]: undefined })); };

  const verifier = (n: number) => {
    const e: typeof erreurs = {};
    if (n === 0 && !v.prestation) e.prestation = 'Choisissez la prestation souhaitée.';
    if (n === 1) {
      if (!v.date) e.date = 'Indiquez le jour qui vous arrange.';
      else if (v.date < aujourdhui()) e.date = 'Choisissez une date à venir.';
      if (!v.creneau) e.creneau = 'Choisissez un moment de la journée.';
    }
    if (n === 2) {
      if (v.nom.trim().length < 2) e.nom = 'Indiquez votre nom.';
      if (!/^\+?[\d\s.-]{8,18}$/.test(v.telephone.trim())) e.telephone = 'Indiquez un numéro joignable avec l’indicatif, par exemple +226 70 00 00 00.';
    }
    setErreurs(e);
    const premier = Object.keys(e)[0];
    if (premier) document.getElementById(`${id}-${premier}`)?.focus();
    return !premier;
  };

  const suivant = () => {
    if (!verifier(etape)) return;
    if (etape < 2) { setSens(1); setEtape(etape + 1); return; }
    suivre('appointment_click', { item: v.prestation, source: 'formulaire_rendez_vous' });
    suivre('contact_form_submit', { item: v.prestation, source: 'rendez_vous' });
    setFini(true);
  };
  const precedent = () => { setSens(-1); setEtape(Math.max(0, etape - 1)); };

  const message = () => composerMessage([
    'Bonjour Das’hair, je souhaite prendre rendez-vous.',
    '',
    `Prestation : ${choisie?.nom ?? ''}`,
    `Date souhaitée : ${dateLisible(v.date)}${v.souple ? ' (je suis flexible)' : ''}`,
    `Moment : ${CRENEAUX.find((c) => c.id === v.creneau)?.label ?? ''}`,
    `Nom : ${propre(v.nom, 80)}`,
    `Téléphone : ${propre(v.telephone, 30)}`,
    v.cheveux && `Mes cheveux / ma peau : ${propre(v.cheveux)}`,
    v.note && `Précisions : ${propre(v.note)}`,
  ]);

  const champ = (k: keyof Valeurs) => `mt-2 block w-full rounded-[var(--radius-ctrl)] border bg-surface px-4 py-3.5 text-[1rem] text-encre outline-none transition-colors placeholder:text-sourdine/70 focus:border-encre ${erreurs[k] ? 'border-erreur' : 'border-filet'}`;
  const Erreur = ({ k }: { k: keyof Valeurs }) => erreurs[k] ? <p id={`${id}-${k}-err`} role="alert" className="mt-2 text-sm text-erreur">{erreurs[k]}</p> : null;

  if (fini) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        role="status" className="rounded-[var(--radius-carte)] bg-surface p-6 md:p-10">
        <motion.span initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 380, damping: 20 }}
          className="grid h-12 w-12 place-items-center rounded-full bg-indigo text-white"><Check size={22} /></motion.span>
        <p className="titre mt-6 text-[clamp(2rem,3.4vw,2.8rem)]">Votre demande est <span className="accent">prête</span>.</p>
        <dl className="mt-8 grid gap-x-8 gap-y-4 border-y border-filet py-6 sm:grid-cols-2">
          {[
            ['Prestation', choisie?.nom],
            ['Durée indicative', choisie?.duree],
            ['Jour souhaité', `${dateLisible(v.date)}${v.souple ? ', flexible' : ''}`],
            ['Moment', CRENEAUX.find((c) => c.id === v.creneau)?.label],
            ['Au nom de', v.nom],
            ['Téléphone', v.telephone],
          ].map(([t, d]) => (
            <div key={t}><dt className="text-[0.82rem] text-sourdine">{t}</dt><dd className="mt-1 font-semibold first-letter:uppercase">{d}</dd></div>
          ))}
        </dl>
        <p className="mt-6 max-w-xl text-sourdine">
          Rien n’est encore réservé : envoyez la demande par WhatsApp, elle est déjà rédigée. L’équipe vous répond avec un créneau confirmé.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <button onClick={() => { suivre('whatsapp_click', { item: v.prestation, source: 'rendez_vous' }); preparerWhatsApp(message(), 'Votre demande de rendez-vous est prête'); }}
            className={classeBouton('indigo')}>Envoyer par WhatsApp<Fleche variante="indigo" /></button>
          <button onClick={() => { setFini(false); setEtape(2); }} className={classeBouton('lien')}>Modifier ma demande</button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="rounded-[var(--radius-carte)] bg-surface p-5 md:p-10">
      {/* Progression : pastilles numérotées reliées par un filet qui se remplit */}
      <ol className="flex items-center gap-3" aria-label="Étapes de la demande">
        {ETAPES.map((t, i) => (
          <li key={t} className="flex flex-1 items-center gap-3 last:flex-none" aria-current={i === etape ? 'step' : undefined}>
            <span className={`chiffres grid h-9 w-9 shrink-0 place-items-center rounded-full text-[0.85rem] font-bold transition-colors duration-300 ${i < etape ? 'bg-indigo text-white' : i === etape ? 'bg-encre text-surface' : 'border border-filet text-sourdine'}`}>
              {i < etape ? <Check size={15} /> : i + 1}
            </span>
            <span className={`hidden text-[0.9rem] font-semibold sm:block ${i === etape ? 'text-encre' : 'text-sourdine'}`}>{t}</span>
            {i < ETAPES.length - 1 && (
              <span className="relative h-px flex-1 bg-filet" aria-hidden>
                <motion.span className="absolute inset-y-0 left-0 bg-indigo" initial={false} animate={{ width: i < etape ? '100%' : '0%' }} transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }} />
              </span>
            )}
          </li>
        ))}
      </ol>
      <p className="mt-4 text-[0.9rem] text-sourdine sm:hidden">Étape {etape + 1} sur 3 · {ETAPES[etape]}</p>

      <form onSubmit={(e) => { e.preventDefault(); suivant(); }} noValidate className="mt-8">
        <AnimatePresence mode="wait" initial={false} custom={sens}>
          <motion.div key={etape} custom={sens}
            initial={{ opacity: 0, x: sens * 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: sens * -24 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}>

            {etape === 0 && (
              <fieldset aria-describedby={erreurs.prestation ? `${id}-prestation-err` : undefined}>
                <legend className="titre text-[clamp(1.7rem,2.6vw,2.2rem)]">Quel soin vous ferait plaisir&nbsp;?</legend>
                <p className="mt-2 text-sourdine">Pas sûre&nbsp;? Choisissez le plus proche : on ajuste ensemble au salon.</p>
                {categoriesPrestations.map((c) => (
                  <div key={c.id} className="mt-7">
                    <p className="etiquette uppercase text-sourdine">{c.label}</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {prestations.filter((p) => p.categorie === c.id).map((p, i) => {
                        const actif = v.prestation === p.slug;
                        return (
                          <label key={p.slug} className={`group relative flex cursor-pointer items-center gap-4 rounded-[1.1rem] border p-3 pr-4 transition-[background-color,border-color,color] duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-indigo ${actif ? 'border-encre bg-encre text-surface' : 'border-filet hover:border-encre'}`}>
                            <input id={i === 0 && c.id === categoriesPrestations[0].id ? `${id}-prestation` : undefined} type="radio" name="prestation" value={p.slug} checked={actif}
                              onChange={() => maj('prestation', p.slug)} className="sr-only" />
                            <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[0.8rem]">
                              <Image src={p.image.src} alt="" fill sizes="64px" className="object-cover" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-semibold leading-tight">{p.nom}</span>
                              <span className={`chiffres mt-1 block text-[0.85rem] ${actif ? 'text-sourdine-clair' : 'text-sourdine'}`}>{p.duree} · dès {prixFcfa(p.tarifAPartirDe)}</span>
                            </span>
                            <span aria-hidden className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors ${actif ? 'border-indigo bg-indigo text-white' : 'border-filet'}`}>
                              {actif && <Check size={13} strokeWidth={3} />}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <Erreur k="prestation" />
              </fieldset>
            )}

            {etape === 1 && (
              <div>
                <p className="titre text-[clamp(1.7rem,2.6vw,2.2rem)]">Quand passeriez-vous&nbsp;?</p>
                <p className="mt-2 text-sourdine">Indiquez votre préférence. L’équipe confirme selon les disponibilités.</p>
                <div className="mt-7 max-w-sm">
                  <label htmlFor={`${id}-date`} className="text-[0.92rem] font-semibold">Jour souhaité</label>
                  <input id={`${id}-date`} type="date" min={aujourdhui()} value={v.date} onChange={(e) => maj('date', e.target.value)}
                    aria-invalid={!!erreurs.date} aria-describedby={erreurs.date ? `${id}-date-err` : undefined} className={champ('date')} />
                  <Erreur k="date" />
                </div>
                <fieldset className="mt-7" aria-describedby={erreurs.creneau ? `${id}-creneau-err` : undefined}>
                  <legend className="text-[0.92rem] font-semibold">Moment de la journée</legend>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {CRENEAUX.map((c, i) => {
                      const actif = v.creneau === c.id;
                      return (
                        <label key={c.id} className={`cursor-pointer rounded-[1.1rem] border px-5 py-4 transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-indigo ${actif ? 'border-encre bg-encre text-surface' : 'border-filet hover:border-encre'}`}>
                          <input id={i === 0 ? `${id}-creneau` : undefined} type="radio" name="creneau" value={c.id} checked={actif} onChange={() => maj('creneau', c.id)} className="sr-only" />
                          <span className="block font-semibold">{c.label}</span>
                          <span className={`chiffres mt-1 block text-[0.85rem] ${actif ? 'text-sourdine-clair' : 'text-sourdine'}`}>{c.detail}</span>
                        </label>
                      );
                    })}
                  </div>
                  <Erreur k="creneau" />
                </fieldset>
                <label className="mt-6 inline-flex cursor-pointer items-center gap-3 text-[0.95rem]">
                  <input type="checkbox" checked={v.souple} onChange={(e) => maj('souple', e.target.checked)} className="h-5 w-5 accent-[var(--color-indigo)]" />
                  Je suis flexible, un autre jour proche me convient aussi
                </label>
              </div>
            )}

            {etape === 2 && (
              <div>
                <p className="titre text-[clamp(1.7rem,2.6vw,2.2rem)]">Comment vous joindre&nbsp;?</p>
                <p className="mt-2 text-sourdine">Uniquement pour confirmer le rendez-vous.</p>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${id}-nom`} className="text-[0.92rem] font-semibold">Nom et prénom</label>
                    <input id={`${id}-nom`} autoComplete="name" maxLength={80} value={v.nom} onChange={(e) => maj('nom', e.target.value)}
                      aria-invalid={!!erreurs.nom} aria-describedby={erreurs.nom ? `${id}-nom-err` : undefined} className={champ('nom')} />
                    <Erreur k="nom" />
                  </div>
                  <div>
                    <label htmlFor={`${id}-telephone`} className="text-[0.92rem] font-semibold">Téléphone (WhatsApp)</label>
                    <input id={`${id}-telephone`} type="tel" inputMode="tel" autoComplete="tel" maxLength={20} placeholder="+226 70 00 00 00" value={v.telephone} onChange={(e) => maj('telephone', e.target.value)}
                      aria-invalid={!!erreurs.telephone} aria-describedby={erreurs.telephone ? `${id}-telephone-err` : undefined} className={champ('telephone')} />
                    <Erreur k="telephone" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor={`${id}-cheveux`} className="text-[0.92rem] font-semibold">Vos cheveux ou votre peau <span className="font-normal text-sourdine">(facultatif)</span></label>
                    <input id={`${id}-cheveux`} maxLength={160} placeholder="Ex. cheveux crépus, épaules, cuir chevelu sensible" value={v.cheveux} onChange={(e) => maj('cheveux', e.target.value)} className={champ('cheveux')} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor={`${id}-note`} className="text-[0.92rem] font-semibold">Une précision <span className="font-normal text-sourdine">(facultatif)</span></label>
                    <textarea id={`${id}-note`} rows={3} maxLength={500} placeholder="Longueur souhaitée, mèche fournie ou non, événement…" value={v.note} onChange={(e) => maj('note', e.target.value)} className={champ('note')} />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-filet pt-6">
          {etape > 0
            ? <button type="button" onClick={precedent} className="inline-flex h-12 items-center gap-2 rounded-full px-2 font-semibold text-sourdine transition-colors hover:text-encre"><ArrowLeft size={18} />Retour</button>
            : <span className="text-[0.9rem] text-sourdine">{choisie ? <>Choisi : <strong className="text-encre">{choisie.nom}</strong></> : 'Environ 1 minute'}</span>}
          <button type="submit" className={classeBouton(etape === 2 ? 'indigo' : 'principal')}>
            {etape === 2 ? 'Préparer ma demande' : 'Continuer'}<Fleche variante={etape === 2 ? 'indigo' : 'principal'} />
          </button>
        </div>
      </form>
    </div>
  );
}
