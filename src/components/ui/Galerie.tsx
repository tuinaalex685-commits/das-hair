'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import type { ImageRef } from '@/types';
import { bloquerDefilement } from '@/components/providers/DefilementDoux';

/** Galerie immersive : image principale en fondu, miniatures, et vue plein écran au clavier. */
export function Galerie({ images, ratio = 'aspect-[4/5]', priorite = true }: { images: ImageRef[]; ratio?: string; priorite?: boolean }) {
  const [i, setI] = useState(0);
  const [plein, setPlein] = useState(false);
  const n = images.length;
  const aller = (d: number) => setI((x) => (x + d + n) % n);

  useEffect(() => {
    if (!plein) return;
    const touche = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPlein(false);
      if (e.key === 'ArrowRight') setI((x) => (x + 1) % n);
      if (e.key === 'ArrowLeft') setI((x) => (x - 1 + n) % n);
    };
    window.addEventListener('keydown', touche);
    bloquerDefilement(true);
    return () => { window.removeEventListener('keydown', touche); bloquerDefilement(false); };
  }, [plein, n]);

  return (
    <div>
      <div className={`group relative overflow-hidden rounded-[1.6rem] bg-fond-2 ${ratio}`}>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}>
            <Image src={images[i].src} alt={images[i].alt} fill priority={priorite && i === 0} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <button onClick={() => setPlein(true)} className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-surface/90 text-encre transition-colors hover:bg-surface" aria-label="Voir en plein écran">
          <Expand size={18} strokeWidth={1.6} />
        </button>
        {n > 1 && (
          <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
            <button onClick={() => aller(-1)} className="grid h-11 w-11 place-items-center rounded-full bg-surface/90" aria-label="Image précédente"><ChevronLeft size={20} /></button>
            <button onClick={() => aller(1)} className="grid h-11 w-11 place-items-center rounded-full bg-surface/90" aria-label="Image suivante"><ChevronRight size={20} /></button>
          </div>
        )}
      </div>
      {n > 1 && (
        <ul className="mt-3 flex gap-3">
          {images.map((im, k) => (
            <li key={im.src + k}>
              <button onClick={() => setI(k)} aria-label={`Afficher l’image ${k + 1}`} aria-current={k === i}
                className={`relative block h-20 w-16 overflow-hidden bg-fond-2 transition-opacity ${k === i ? 'opacity-100 outline outline-1 outline-offset-2 outline-encre' : 'opacity-60 hover:opacity-100'}`}>
                <Image src={im.src} alt="" fill sizes="64px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <AnimatePresence>
        {plein && (
          <motion.div role="dialog" aria-modal="true" aria-label="Galerie en plein écran" className="fixed inset-0 z-[75] grid place-items-center bg-encre/95 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPlein(false)}>
            <motion.div className="relative h-[82vh] w-[min(92vw,70rem)]" initial={{ scale: 0.96 }} animate={{ scale: 1 }} transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }} onClick={(e) => e.stopPropagation()}>
              <Image src={images[i].src} alt={images[i].alt} fill sizes="92vw" className="object-contain" />
            </motion.div>
            <button onClick={() => setPlein(false)} className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-surface text-encre" aria-label="Fermer"><X size={20} /></button>
            {n > 1 && <>
              <button onClick={(e) => { e.stopPropagation(); aller(-1); }} className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-surface" aria-label="Image précédente"><ChevronLeft size={22} /></button>
              <button onClick={(e) => { e.stopPropagation(); aller(1); }} className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-surface" aria-label="Image suivante"><ChevronRight size={22} /></button>
            </>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
