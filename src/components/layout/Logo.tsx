import Link from 'next/link';

/** Mot-marque provisoire (le logo réel de Das'hair le remplacera). */
export function Logo({ className = '', onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className={`relative z-10 text-[1.6rem] leading-none ${className}`} aria-label="Das'hair, accueil">
      <span className="titre">Das</span><span className="text-ambre">’</span><span className="accent">hair</span>
    </Link>
  );
}
