import { Hero } from '@/components/home/Hero';
import { Bandeau, Selection } from '@/components/home/Sections';
import { UniversEmpiles } from '@/components/home/UniversEmpiles';
import { Diagnostic } from '@/components/home/Diagnostic';
import { PrestationsVitrine } from '@/components/home/PrestationsVitrine';
import { Academy } from '@/components/home/Academy';
import { CommentCaMarche } from '@/components/home/CommentCaMarche';

/**
 * Accueil, construit comme une page de conversion :
 * promesse + actions → savoir-faire → trois parcours → produits → diagnostic guidé →
 * prestations → academy → comment ça marche + questions → appel final (pied de page).
 */
export default function Accueil() {
  return (
    <>
      <Hero />
      <Bandeau />
      <UniversEmpiles />
      <Selection />
      <Diagnostic />
      <div className="h-6 lg:h-10" />
      <PrestationsVitrine />
      <Academy />
      <CommentCaMarche />
    </>
  );
}
