import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/**
 * Système de boutons en pilule.
 * - principal : pilule noire, flèche dans un rond indigo qui tourne au survol ;
 * - indigo : la même en couleur vive (action clé d'une section) ;
 * - secondaire : pilule à filet ; clair : pilule blanche (sur photo ou fond sombre) ;
 * - lien : texte souligné pour les actions tertiaires.
 */
export type Variante = 'principal' | 'indigo' | 'secondaire' | 'lien' | 'clair';

const base = 'group/btn inline-flex items-center justify-center gap-3 rounded-full text-[0.95rem] font-semibold transition-[background-color,color,border-color,transform] duration-200 ease-[var(--ease-sortie)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50';
const styles: Record<Variante, string> = {
  principal: 'h-14 bg-action pl-7 pr-2 text-surface hover:bg-action-fonce',
  indigo: 'h-14 bg-indigo pl-7 pr-2 text-white hover:bg-indigo-fonce',
  secondaire: 'h-14 border border-encre/25 px-7 text-encre hover:border-encre hover:bg-encre hover:text-surface',
  clair: 'h-14 bg-surface pl-7 pr-2 text-encre hover:bg-white',
  lien: 'h-auto rounded-none px-0 text-encre underline decoration-filet decoration-1 underline-offset-[6px] hover:decoration-indigo',
};

/** Le rond fléché des pilules principales. */
export function Fleche({ variante = 'principal' }: { variante?: Variante }) {
  if (variante === 'secondaire' || variante === 'lien') return null;
  const fond = variante === 'indigo' ? 'bg-white text-indigo' : 'bg-indigo text-white';
  return (
    <span aria-hidden className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${fond} transition-transform duration-300 ease-[var(--ease-sortie)] group-hover/btn:rotate-45`}>
      <ArrowUpRight size={18} strokeWidth={2} />
    </span>
  );
}

export const classeBouton = (variante: Variante = 'principal', className = '') => `${base} ${styles[variante]} ${className}`;

export function BoutonLien({ href, children, variante = 'principal', className = '' }: {
  href: string; children: React.ReactNode; variante?: Variante; className?: string;
}) {
  return (
    <Link href={href} className={classeBouton(variante, className)}>
      {children}<Fleche variante={variante} />
    </Link>
  );
}

export function Bouton({ children, variante = 'principal', className = '', ...props }:
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variante?: Variante }) {
  return (
    <button {...props} className={classeBouton(variante, className)}>
      {children}<Fleche variante={variante} />
    </button>
  );
}
