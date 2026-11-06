export type ImageRef = { src: string; alt: string };

export type CategorieProduit = 'cheveux' | 'huiles' | 'corps' | 'visage';

export interface Produit {
  slug: string;
  nom: string;
  categorie: CategorieProduit;
  accroche: string;
  description: string;
  /** Prix de DÉMONSTRATION en FCFA : à remplacer par le tarif réel. */
  prix: number;
  contenance: string;
  images: ImageRef[];
  pourQui: string;
  utilisation: string[];
  ingredients: string;
  vedette?: boolean;
}

export type CategoriePrestation = 'coiffures' | 'soins-capillaires' | 'beaute';

export interface Prestation {
  slug: string;
  nom: string;
  categorie: CategoriePrestation;
  accroche: string;
  description: string;
  deroulement: string[];
  /** Durée et tarif INDICATIFS de démonstration. */
  duree: string;
  tarifAPartirDe: number;
  image: ImageRef;
  galerie: ImageRef[];
  aSavoir: string;
}

export interface Formation {
  slug: string;
  nom: string;
  niveau: 'Débutant' | 'Intermédiaire' | 'Perfectionnement';
  accroche: string;
  description: string;
  objectifs: string[];
  programme: { titre: string; detail: string }[];
  public: string;
  prerequis: string;
  /** Durée, format et tarif INDICATIFS de démonstration. */
  duree: string;
  format: string;
  tarif: number;
  image: ImageRef;
}
