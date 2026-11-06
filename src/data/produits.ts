import type { CategorieProduit, Produit } from '@/types';

/**
 * CATALOGUE DE DÉMONSTRATION. Ces produits sont fictifs : ils montrent comment la boutique
 * présenterait la gamme réelle de Das'hair. Noms, prix, contenances et compositions sont à
 * remplacer avant toute publication. Aucune promesse d'efficacité médicale.
 */
export const categoriesProduits: { id: CategorieProduit; label: string }[] = [
  { id: 'cheveux', label: 'Soins des cheveux' },
  { id: 'huiles', label: 'Huiles et sérums' },
  { id: 'corps', label: 'Soins du corps' },
  { id: 'visage', label: 'Soins du visage' },
];

const img = (nom: string, alt: string) => ({ src: `/images/produits/${nom}.webp`, alt });

export const produits: Produit[] = [
  {
    slug: 'huile-nourrissante-baobab',
    nom: 'Huile nourrissante Baobab',
    categorie: 'huiles',
    accroche: 'Pour les longueurs sèches et les pointes fragiles.',
    description:
      "Une huile légère à appliquer sur cheveux humides ou secs, pensée pour les textures bouclées, frisées et crépues. Quelques gouttes suffisent pour gainer les pointes sans alourdir.",
    prix: 9500,
    contenance: '50 ml',
    images: [img('compte-gouttes', "Flacon compte-gouttes en verre ambré posé sur du marbre"), img('goutte-main', "Une goutte d'huile tombe d'une pipette"), img('huile-main', "Main tenant un flacon ambré")],
    pourQui: 'Cheveux secs, bouclés à crépus.',
    utilisation: ["Chauffer 3 à 5 gouttes entre les paumes.", 'Appliquer sur les longueurs et les pointes.', 'Peut se poser avant ou après le coiffage.'],
    ingredients: 'Composition à confirmer par Das’hair (exemple : huile de baobab, huile de sésame, vitamine E).',
    vedette: true,
  },
  {
    slug: 'serum-cuir-chevelu',
    nom: 'Sérum apaisant cuir chevelu',
    categorie: 'huiles',
    accroche: 'Pour les cuirs chevelus tirés par les coiffures protectrices.',
    description:
      'Un sérum fluide à appliquer raie par raie entre deux tresses ou nattes. Sa pipette permet de doser précisément, sans graisser les racines.',
    prix: 11000,
    contenance: '30 ml',
    images: [img('compte-gouttes-ombre', 'Flacon compte-gouttes ambré dans un jeu d’ombre'), img('serum-scene', 'Sérum sur un plateau avec des fleurs séchées')],
    pourQui: 'Cuirs chevelus secs ou sensibles, coiffures protectrices.',
    utilisation: ['Séparer les cheveux raie par raie.', 'Déposer quelques gouttes sur le cuir chevelu.', 'Masser du bout des doigts, sans frotter.'],
    ingredients: 'Composition à confirmer par Das’hair.',
    vedette: true,
  },
  {
    slug: 'beurre-demelant-karite',
    nom: 'Beurre démêlant Karité',
    categorie: 'cheveux',
    accroche: 'Le geste du jour de lavage, pour démêler sans casser.',
    description:
      'Une texture riche à répartir sur cheveux mouillés avant le démêlage. Elle aide le peigne à glisser et limite la casse pendant le coiffage.',
    prix: 8500,
    contenance: '250 ml',
    images: [img('beurre', 'Pot de beurre onctueux avec une cuillère dorée'), img('pot-bois', 'Petit pot de crème posé sur un carré de bois')],
    pourQui: 'Cheveux épais, frisés à crépus.',
    utilisation: ['Sur cheveux mouillés, travailler par sections.', 'Démêler des pointes vers les racines.', 'Rincer ou laisser une fine couche selon la densité.'],
    ingredients: 'Composition à confirmer par Das’hair (exemple : beurre de karité, aloe vera).',
    vedette: true,
  },
  {
    slug: 'lait-hydratant-boucles',
    nom: 'Lait hydratant Boucles',
    categorie: 'cheveux',
    accroche: 'Pour définir les boucles et les garder souples.',
    description:
      'Un lait léger qui s’applique sur cheveux humides pour faciliter la définition des boucles et des vanilles.',
    prix: 7500,
    contenance: '200 ml',
    images: [img('tube-lumiere', 'Tube de soin dans la lumière du matin'), img('tube-etagere', 'Tube blanc posé sur une étagère en bois')],
    pourQui: 'Cheveux bouclés et frisés.',
    utilisation: ['Appliquer sur cheveux humides.', 'Répartir avec les doigts ou une brosse souple.', 'Laisser sécher à l’air ou au diffuseur.'],
    ingredients: 'Composition à confirmer par Das’hair.',
  },
  {
    slug: 'masque-reparateur',
    nom: 'Masque réparateur',
    categorie: 'cheveux',
    accroche: 'Le soin profond de la semaine.',
    description:
      'Un masque à laisser poser sous une serviette chaude ou un bonnet. Il s’intègre au rituel hebdomadaire, avant le coiffage.',
    prix: 10500,
    contenance: '250 ml',
    images: [img('pots-ambre', 'Pots en verre ambré alignés sur un meuble'), img('pot-bois', 'Pot de soin sur un carré de bois')],
    pourQui: 'Cheveux fragilisés par la chaleur ou les colorations.',
    utilisation: ['Appliquer sur cheveux propres et essorés.', 'Laisser poser 15 à 20 minutes.', 'Rincer abondamment.'],
    ingredients: 'Composition à confirmer par Das’hair.',
  },
  {
    slug: 'huile-seche-corps',
    nom: 'Huile sèche corps',
    categorie: 'corps',
    accroche: 'Une peau satinée, sans film gras.',
    description: 'Une huile qui pénètre vite, à appliquer après la douche sur peau encore légèrement humide.',
    prix: 12000,
    contenance: '100 ml',
    images: [img('huile-lin', 'Flacon ambré couché sur un linge de lin'), img('duo-lin', 'Deux flacons ambrés sur du lin')],
    pourQui: 'Tous types de peau.',
    utilisation: ['Après la douche, sur peau légèrement humide.', 'Masser jusqu’à pénétration.'],
    ingredients: 'Composition à confirmer par Das’hair.',
    vedette: true,
  },
  {
    slug: 'beurre-corps-fouette',
    nom: 'Beurre corps fouetté',
    categorie: 'corps',
    accroche: 'Une texture aérienne pour les zones très sèches.',
    description: 'Un beurre fouetté qui fond au contact de la peau. Idéal pour les coudes, genoux et talons.',
    prix: 9000,
    contenance: '200 ml',
    images: [img('beurre', 'Beurre onctueux dans un pot en verre'), img('pot-bois', 'Pot de beurre sur bois')],
    pourQui: 'Peaux sèches.',
    utilisation: ['Prélever une noisette.', 'Réchauffer entre les mains et appliquer en massant.'],
    ingredients: 'Composition à confirmer par Das’hair.',
  },
  {
    slug: 'gel-nettoyant-visage',
    nom: 'Gel nettoyant visage',
    categorie: 'visage',
    accroche: 'Le premier geste du matin et du soir.',
    description: 'Un gel doux qui mousse légèrement, pour nettoyer sans tirailler.',
    prix: 8000,
    contenance: '150 ml',
    images: [img('tube-citron', 'Tube de soin entouré de citrons frais'), img('tube-etagere', 'Tube posé sur une étagère')],
    pourQui: 'Peaux normales à mixtes.',
    utilisation: ['Faire mousser sur peau humide.', 'Masser une minute, puis rincer.'],
    ingredients: 'Composition à confirmer par Das’hair.',
  },
  {
    slug: 'serum-eclat',
    nom: 'Sérum éclat',
    categorie: 'visage',
    accroche: 'Pour un teint plus lumineux au fil des semaines.',
    description: 'Un sérum fluide à appliquer avant la crème, matin et soir.',
    prix: 14500,
    contenance: '30 ml',
    images: [img('flacon-ambre', 'Flacon de sérum ambré sur fond clair'), img('compte-gouttes-ombre', 'Pipette de sérum')],
    pourQui: 'Tous types de peau.',
    utilisation: ['Déposer 3 gouttes sur peau propre.', 'Tapoter du bout des doigts.', 'Appliquer une protection solaire le jour.'],
    ingredients: 'Composition à confirmer par Das’hair.',
  },
  {
    slug: 'eau-florale-hibiscus',
    nom: 'Eau florale Hibiscus',
    categorie: 'visage',
    accroche: 'Fraîcheur et préparation de la peau.',
    description: 'Une eau à vaporiser après le nettoyage ou dans la journée pour rafraîchir le teint.',
    prix: 6500,
    contenance: '100 ml',
    images: [img('apothicaire', 'Flacon d’apothicaire brun à étiquette blanche'), img('flacon-lin', 'Flacon ambré sur un linge')],
    pourQui: 'Tous types de peau.',
    utilisation: ['Vaporiser à 20 cm du visage.', 'Laisser sécher ou tapoter.'],
    ingredients: 'Composition à confirmer par Das’hair.',
  },
];

export const getProduit = (slug: string) => produits.find((p) => p.slug === slug);
export const produitsVedettes = () => produits.filter((p) => p.vedette);
export const produitsAssocies = (p: Produit, n = 3) =>
  [...produits.filter((x) => x.slug !== p.slug && x.categorie === p.categorie), ...produits.filter((x) => x.categorie !== p.categorie)].slice(0, n);
