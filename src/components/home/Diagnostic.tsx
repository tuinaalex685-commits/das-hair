'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Droplets, GraduationCap, RotateCcw, Check } from 'lucide-react';
import { getPrestation } from '@/data/prestations';
import { getFormation } from '@/data/formations';
import { getProduit } from '@/data/produits';
import { prixFcfa } from '@/data/site';
import { useBoutique } from '@/components/providers/Boutique';
import { composerMessage } from '@/lib/whatsapp';
import { suivre } from '@/lib/analytics';
import { Fleche } from '@/components/ui/Bouton';

type Domaine = 'cheveux' | 'peau' | 'apprendre';
type Besoin = { id: string; label: string; prestation?: string; formation?: string; produit?: string };

const DOMAINES: { id: Domaine; label: string; detail: string; Icone: typeof Sparkles }[] = [
  { id: 'cheveux', label: 'Mes cheveux', detail: 'Coiffure, soin, cuir chevelu', Icone: Sparkles },
  { id: 'peau', label: 'Ma peau', detail: 'Visage, corps, événement', Icone: Droplets },
  { id: 'apprendre', label: 'Apprendre le métier', detail: 'Formations en présentiel', Icone: GraduationCap },
];

const BESOINS: Record<Domaine, Besoin[]> = {
  cheveux: [
    { id: 'secs', label: 'Longueurs sèches, pointes fragiles', prestation: 'rituel-hydratation', produit: 'huile-nourrissante-baobab' },
    { id: 'protectrice', label: 'Une coiffure protectrice', prestation: 'tresses-sans-noeuds', produit: 'serum-cuir-chevelu' },
    { id: 'cuir', label: 'Cuir chevelu qui tire ou démange', prestation: 'soin-profond-cuir-chevelu', produit: 'serum-cuir-chevelu' },
    { id: 'boucles', label: 'Des boucles mieux définies', prestation: 'rituel-hydratation', produit: 'lait-hydratant-boucles' },
  ],
  peau: [
    { id: 'eclat', label: 'Un teint plus lumineux', prestation: 'soin-visage-eclat', produit: 'serum-eclat' },
    { id: 'corps', label: 'Peau du corps qui tiraille', produit: 'beurre-corps-fouette' },
    { id: 'evenement', label: 'Être prête pour un événement', prestation: 'mise-en-beaute', produit: 'eau-florale-hibiscus' },
  ],
  apprendre: [
    { id: 'debuter', label: 'Je débute', formation: 'initiation-tresses' },
    { id: 'motifs', label: 'Je veux maîtriser les nattes et motifs', formation: 'nattes-et-motifs' },
    { id: 'soins', label: 'Je veux proposer des soins', formation: 'soins-capillaires-pratique' },
    { id: 'accueil', label: 'Je veux mieux accueillir et conseiller', formation: 'accueil-espace-beaute' },
  ],
};

const DELAIS = ['Cette semaine', 'Ce mois-ci', 'Je me renseigne'];

/**
 * Diagnostic en trois touches : domaine, besoin, délai. La recommandation (soin ou formation,
 * plus un produit) s'affiche aussitôt et le message WhatsApp est rédigé avec ces choix.
 * Le panneau indigo arrive en grandissant quand on y descend.
 */
export function Diagnostic() {
  const [domaine, setDomaine] = useState<Domaine | null>(null);
  const [besoin, setBesoin] = useState<Besoin | null>(null);
  const [delai, setDelai] = useState<string | null>(null);
  const { preparerWhatsApp } = useBoutique();
  const zone = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: zone, offset: ['start end', 'start 0.25'] });
  const echelle = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const rayon = useTransform(scrollYProgress, [0, 1], [80, 32]);

  const prestation = besoin?.prestation ? getPrestation(besoin.prestation) : undefined;
  const formation = besoin?.formation ? getFormation(besoin.formation) : undefined;
  const produit = besoin?.produit ? getProduit(besoin.produit) : undefined;
  const principal = prestation ?? formation;
  const recommence = () => { setDomaine(null); setBesoin(null); setDelai(null); };

  const envoyer = () => {
    if (!besoin) return;
    const evenement = formation ? 'training_registration_click' : prestation ? 'appointment_click' : 'product_order_click';
    suivre(evenement, { item: principal?.slug ?? produit?.slug, source: 'diagnostic' });
    suivre('whatsapp_click', { item: principal?.slug ?? produit?.slug, source: 'diagnostic' });
    preparerWhatsApp(composerMessage([
      "Bonjour Das'hair,",
      formation ? `je souhaite m'inscrire ou me renseigner sur la formation « ${formation.nom} ».` :
        prestation ? `je souhaite prendre rendez-vous pour « ${prestation.nom} ».` : `je souhaite commander « ${produit?.nom} ».`,
      `Mon besoin : ${besoin.label.toLowerCase()}.`,
      produit && principal ? `Je suis aussi intéressé(e) par le produit « ${produit.nom} ».` : '',
      delai ? `Quand : ${delai.toLowerCase()}.` : '',
      'Merci de me dire les disponibilités.',
    ].filter(Boolean)), 'Votre demande est prête');
  };

  return (
    <section ref={zone} id="votre-demande" aria-labelledby="diagnostic-titre" className="px-2 sm:px-4">
      <motion.div style={{ scale: echelle, borderRadius: rayon }} className="sur-sombre mx-auto max-w-[96rem] overflow-hidden bg-indigo text-white">
        <div className="conteneur grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-5">
            <p className="etiquette text-white/70">Diagnostic en 30 secondes</p>
            <h2 id="diagnostic-titre" className="titre mt-4 text-[clamp(2.8rem,5.6vw,5.2rem)]">
              Trouvez <span className="accent !text-white">votre</span> soin.
            </h2>
            <p className="mt-6 max-w-md text-[1.08rem] leading-relaxed text-white/80">
              Trois questions, et nous vous orientons vers la bonne prestation, le bon produit ou la bonne formation. Votre message est ensuite prêt à envoyer.
            </p>
            {domaine && (
              <button onClick={recommence} className="mt-8 inline-flex items-center gap-2 text-[0.92rem] font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline">
                <RotateCcw size={15} /> Recommencer
              </button>
            )}
          </div>

          <div className="lg:col-span-7">
            {/* 1. Domaine */}
            <fieldset>
              <legend className="etiquette mb-4 text-white/70">1. Pour quoi venez-vous&nbsp;?</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {DOMAINES.map(({ id, label, detail, Icone }) => {
                  const choisi = domaine === id;
                  return (
                    <button key={id} type="button" aria-pressed={choisi}
                      onClick={() => { setDomaine(id); setBesoin(null); }}
                      className={`relative flex min-h-36 flex-col justify-between rounded-[1.4rem] border p-5 text-left transition-[background-color,border-color,color,transform] duration-300 active:scale-[0.97] ${choisi ? 'border-encre bg-encre text-white' : 'border-white/25 bg-white/8 hover:border-white/60 hover:bg-white/14'}`}>
                      <span className="flex items-start justify-between gap-3">
                        <span className="text-[1.15rem] font-bold leading-tight">{label}</span>
                        <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors ${choisi ? 'border-white bg-white text-encre' : 'border-white/50'}`}>{choisi && <Check size={14} strokeWidth={3} />}</span>
                      </span>
                      <span className="flex items-end justify-between gap-2">
                        <span className="text-[0.85rem] text-white/70">{detail}</span>
                        <Icone size={22} strokeWidth={1.5} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* 2. Besoin */}
            <AnimatePresence initial={false}>
              {domaine && (
                <motion.fieldset key={domaine} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }} className="mt-8">
                  <legend className="etiquette mb-4 text-white/70">2. Votre besoin</legend>
                  <div className="flex flex-wrap gap-2.5">
                    {BESOINS[domaine].map((b) => (
                      <button key={b.id} type="button" aria-pressed={besoin?.id === b.id} onClick={() => setBesoin(b)}
                        className={`rounded-full border px-5 py-3 text-[0.95rem] font-medium transition-colors duration-200 ${besoin?.id === b.id ? 'border-encre bg-encre text-white' : 'border-white/30 hover:border-white'}`}>
                        {b.label}
                      </button>
                    ))}
                  </div>
                </motion.fieldset>
              )}
            </AnimatePresence>

            {/* 3. Délai */}
            <AnimatePresence initial={false}>
              {besoin && (
                <motion.fieldset initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }} className="mt-8">
                  <legend className="etiquette mb-4 text-white/70">3. Pour quand&nbsp;?</legend>
                  <div className="flex flex-wrap gap-2.5">
                    {DELAIS.map((d) => (
                      <button key={d} type="button" aria-pressed={delai === d} onClick={() => setDelai(d)}
                        className={`rounded-full border px-5 py-3 text-[0.95rem] font-medium transition-colors duration-200 ${delai === d ? 'border-white bg-white text-indigo' : 'border-white/30 hover:border-white'}`}>
                        {d}
                      </button>
                    ))}
                  </div>
                </motion.fieldset>
              )}
            </AnimatePresence>

            {/* Recommandation */}
            <AnimatePresence mode="wait">
              {besoin && (
                <motion.div key={besoin.id} initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                  className="mt-10 rounded-[1.6rem] bg-surface p-3 text-encre" aria-live="polite">
                  <div className="grid gap-4 sm:grid-cols-[9rem_1fr]">
                    {(principal ?? produit) && (
                      <div className="relative aspect-square overflow-hidden rounded-[1.2rem] bg-fond-2 sm:aspect-auto">
                        <Image src={principal ? principal.image.src : produit!.images[0].src} alt="" fill sizes="144px" className="object-cover" />
                      </div>
                    )}
                    <div className="p-2 sm:py-3">
                      <p className="etiquette text-indigo">Notre recommandation</p>
                      <p className="titre mt-2 text-[1.8rem]">{principal?.nom ?? produit?.nom}</p>
                      <p className="chiffres mt-1 text-[0.95rem] text-sourdine">
                        {prestation && <>{prestation.duree}, dès {prixFcfa(prestation.tarifAPartirDe)}</>}
                        {formation && <>{formation.duree.replace('Exemple : ', '')}, {prixFcfa(formation.tarif)}</>}
                        {!principal && produit && <>{produit.contenance}, {prixFcfa(produit.prix)}</>}
                        <span className="ml-1 text-[0.8rem]">(exemple)</span>
                      </p>
                      {produit && principal && (
                        <Link href={`/boutique/${produit.slug}`} className="mt-3 inline-flex items-center gap-2 rounded-full bg-fond px-3 py-1.5 text-[0.85rem] font-medium hover:bg-fond-2">
                          À associer : {produit.nom}
                        </Link>
                      )}
                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <button onClick={envoyer} className="group/btn inline-flex h-13 items-center gap-3 rounded-full bg-encre pl-6 pr-1.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-black">
                          {formation ? 'Demander mon inscription' : prestation ? 'Demander un rendez-vous' : 'Commander ce produit'}<Fleche />
                        </button>
                        <Link href={formation ? `/formations/${formation.slug}` : prestation ? `/soins/${prestation.slug}` : `/boutique/${produit?.slug}`}
                          className="text-[0.92rem] font-semibold underline decoration-filet underline-offset-4 hover:decoration-indigo">Voir le détail</Link>
                      </div>
                      <p className="mt-3 text-[0.82rem] text-sourdine">Le message s’ouvre prêt à envoyer. Rien n’est réservé tant que l’équipe n’a pas confirmé.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
