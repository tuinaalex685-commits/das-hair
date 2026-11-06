import Image from 'next/image';
import Link from 'next/link';
import { LignesTitre } from '@/components/animations/Revelation';

/**
 * En-tête de page intérieure. Avec image : bandeau cinéma indigo (photo à droite, titre qui
 * monte ligne par ligne). Sans image : version claire et éditoriale.
 */
export function EnTetePage({ fil, titre, intro, image, children }: {
  fil: { label: string; href?: string }[];
  titre: string[];
  intro: string;
  image?: { src: string; alt: string; position?: string };
  children?: React.ReactNode;
}) {
  const sombre = !!image;
  return (
    <header className={`${sombre ? 'sur-sombre bg-encre text-surface' : ''} relative overflow-hidden`}>
      <div className="conteneur grid gap-10 pb-14 pt-32 lg:grid-cols-12 lg:pb-20 lg:pt-40">
        <div className={image ? 'lg:col-span-6' : 'lg:col-span-9'}>
          <nav aria-label="Fil d’Ariane">
            <ol className={`flex flex-wrap gap-2 text-[0.85rem] ${sombre ? 'text-sourdine-clair' : 'text-sourdine'}`}>
              <li><Link href="/" className="hover:underline">Accueil</Link></li>
              {fil.map((f) => (
                <li key={f.label} className="flex gap-2"><span aria-hidden>/</span>{f.href ? <Link href={f.href} className="hover:underline">{f.label}</Link> : <span aria-current="page">{f.label}</span>}</li>
              ))}
            </ol>
          </nav>
          <h1 className="titre mt-8 text-[clamp(3.1rem,7.5vw,7rem)] leading-[0.9]">
            <LignesTitre lignes={titre} />
          </h1>
          <p className={`mt-8 max-w-xl text-[1.1rem] leading-relaxed ${sombre ? 'text-surface/80' : 'text-sourdine'}`}>{intro}</p>
          {children && <div className="mt-8">{children}</div>}
        </div>
        {image && (
          <div className="relative aspect-[4/3] lg:col-span-5 lg:col-start-8 lg:aspect-auto lg:min-h-[26rem]">
            <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className={`object-cover ${image.position ?? ''}`} />
          </div>
        )}
      </div>
    </header>
  );
}
