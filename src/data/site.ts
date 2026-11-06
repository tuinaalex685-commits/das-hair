/**
 * CONFIGURATION CENTRALE DU SITE — à compléter avec les informations réelles de Das'hair.
 *
 * Tout ce qui vaut `null` est volontairement vide : le prototype n'invente ni numéro, ni adresse,
 * ni réseau social. Les composants affichent alors un emplacement « à compléter ».
 */
export const site = {
  nom: "Das'hair",
  signature: 'Maison de beauté',
  url: 'https://dashair.example', // À REMPLACER par le domaine réel
  description:
    "Das'hair réunit des produits de soin, des prestations capillaires et beauté, et une académie pour apprendre les gestes du métier.",

  /** Numéro WhatsApp au format international SANS « + » ni espaces (ex. 226XXXXXXXX). À fournir par Das'hair. */
  whatsapp: '22657138126' as string | null, // +226 57 13 81 26 (fourni le 06/11)
  telephone: null as string | null,
  email: null as string | null,
  adresse: null as string | null,
  horaires: null as string | null,
  reseaux: { instagram: null, facebook: null, tiktok: null } as Record<string, string | null>,

  devise: 'FCFA',
  /** Le prototype affiche des contenus, prix et durées de démonstration : bandeau visible tant que c'est vrai. */
  demonstration: true,
} as const;

export const navigation = [
  { href: '/boutique', label: 'Beauty Shop' },
  { href: '/soins', label: 'Beauty & Hair Care' },
  { href: '/formations', label: 'Academy' },
  { href: '/a-propos', label: 'La maison' },
  { href: '/contact', label: 'Contact' },
] as const;

export function prixFcfa(montant: number): string {
  // Espace fine insécable comme séparateur de milliers, espace insécable avant l'unité.
  return `${new Intl.NumberFormat('fr-FR').format(montant)} ${site.devise}`;
}
