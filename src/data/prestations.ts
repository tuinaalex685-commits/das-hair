import type { CategoriePrestation, Prestation } from '@/types';

/**
 * PRESTATIONS D'EXEMPLE. La liste réelle des services de Das'hair n'est pas encore connue :
 * ces fiches montrent la présentation possible. Durées et tarifs sont INDICATIFS (démonstration).
 * Les bénéfices sont décrits avec prudence, sans promesse de résultat.
 */
export const categoriesPrestations: { id: CategoriePrestation; label: string }[] = [
  { id: 'coiffures', label: 'Coiffures protectrices' },
  { id: 'soins-capillaires', label: 'Soins capillaires' },
  { id: 'beaute', label: 'Beauté et bien-être' },
];

const img = (nom: string, alt: string) => ({ src: `/images/soins/${nom}.webp`, alt });

export const prestations: Prestation[] = [
  {
    slug: 'tresses-sans-noeuds',
    nom: 'Tresses sans nœuds',
    categorie: 'coiffures',
    accroche: 'Des tresses légères, posées sans tirer sur les racines.',
    description:
      'La mèche est ajoutée progressivement au cheveu naturel : la tresse démarre à plat, plus souple et plus légère sur le cuir chevelu. Longueur, épaisseur et finition se choisissent ensemble avant de commencer.',
    deroulement: ['Échange sur la longueur, l’épaisseur et l’entretien souhaités.', 'Démêlage et préparation du cheveu.', 'Pose des tresses section par section.', 'Finition des pointes et conseils d’entretien.'],
    duree: '4 à 6 h selon la longueur',
    tarifAPartirDe: 15000,
    image: img('tresses-mains', 'Mains qui tressent des cheveux en petites sections carrées'),
    galerie: [img('tresses-mains-2', 'Gros plan de mains tressant des cheveux noirs'), img('tresses-outil', 'Tressage précis à l’aide d’un outil fin')],
    aSavoir: 'Venir les cheveux lavés et démêlés permet de raccourcir la séance. La mèche peut être fournie ou apportée.',
  },
  {
    slug: 'nattes-collees',
    nom: 'Nattes collées',
    categorie: 'coiffures',
    accroche: 'Des lignes nettes, du simple au motif dessiné.',
    description:
      'Nattes plaquées sur le cuir chevelu, avec ou sans rajouts. Le motif se décide à l’avance : lignes droites, courbes ou tracés plus graphiques.',
    deroulement: ['Choix du motif et du nombre de nattes.', 'Préparation et séparation des raies.', 'Réalisation des nattes.', 'Finition et conseils pour protéger la coiffure la nuit.'],
    duree: '1 h 30 à 3 h',
    tarifAPartirDe: 8000,
    image: img('coiffage-satin', 'Coiffeuse finalisant une coiffure sur une cliente en blouse satinée'),
    galerie: [img('tresses-mains', 'Mains au travail sur des nattes'), img('salon-cape', 'Cliente souriante installée dans le salon')],
    aSavoir: 'Un cuir chevelu sensible le signale dès l’accueil : la tension est adaptée.',
  },
  {
    slug: 'soin-profond-cuir-chevelu',
    nom: 'Soin profond du cuir chevelu',
    categorie: 'soins-capillaires',
    accroche: 'Un temps de pause entre deux coiffures protectrices.',
    description:
      'Nettoyage en douceur du cuir chevelu, massage et application d’un soin adapté. Une séance pensée pour les cheveux qui sortent de plusieurs semaines de tresses.',
    deroulement: ['Observation du cuir chevelu et des longueurs.', 'Lavage doux et exfoliation légère.', 'Massage et pose du soin.', 'Rinçage et séchage doux.'],
    duree: '1 h',
    tarifAPartirDe: 10000,
    image: img('cuir-chevelu', 'Mains séparant les cheveux pour soigner le cuir chevelu'),
    galerie: [img('salon-lumiere', 'Bac de lavage dans un salon lumineux'), img('detente', 'Femme détendue, les yeux fermés')],
    aSavoir: 'Cette prestation ne remplace pas l’avis d’un médecin en cas de problème de peau.',
  },
  {
    slug: 'rituel-hydratation',
    nom: 'Rituel hydratation',
    categorie: 'soins-capillaires',
    accroche: 'Lavage, masque sous chaleur douce, mise en forme.',
    description:
      'Un rituel complet pour les cheveux secs : lavage adapté à la texture, masque posé sous chaleur douce, puis démêlage et mise en forme au choix.',
    deroulement: ['Diagnostic de la texture et de la porosité.', 'Lavage et masque sous chaleur douce.', 'Démêlage section par section.', 'Mise en forme : vanilles, brushing doux ou définition des boucles.'],
    duree: '1 h 30',
    tarifAPartirDe: 12000,
    image: img('boucles-sechage', 'Femme aux boucles définies séchant ses cheveux'),
    galerie: [img('salon-lumiere', 'Espace de lavage du salon'), img('cuir-chevelu', 'Soin des racines')],
    aSavoir: 'Le diagnostic sert à choisir les produits : il est refait à chaque visite.',
  },
  {
    slug: 'soin-visage-eclat',
    nom: 'Soin visage éclat',
    categorie: 'beaute',
    accroche: 'Nettoyage, masque et massage du visage.',
    description:
      'Un soin du visage pour retrouver une peau nette et confortable : nettoyage, exfoliation douce, masque adapté et massage.',
    deroulement: ['Échange sur le type de peau.', 'Nettoyage et exfoliation douce.', 'Masque et massage.', 'Conseils pour la routine à la maison.'],
    duree: '1 h',
    tarifAPartirDe: 15000,
    image: img('creme-visage', 'Crème appliquée sur la pommette'),
    galerie: [img('soin-serviette', 'Soin du visage, cheveux protégés par une serviette'), img('table-soin', 'Table de soin dans une cabine apaisante')],
    aSavoir: 'Signaler toute allergie connue avant le soin.',
  },
  {
    slug: 'mise-en-beaute',
    nom: 'Mise en beauté événement',
    categorie: 'beaute',
    accroche: 'Pour un mariage, une cérémonie ou une séance photo.',
    description:
      'Coiffure et maquillage préparés ensemble, à partir de la tenue et du moment. Un essai peut être prévu avant le jour J.',
    deroulement: ['Rendez-vous de préparation ou essai.', 'Préparation de la peau.', 'Maquillage et coiffure.', 'Retouches avant le départ.'],
    duree: '2 à 3 h',
    tarifAPartirDe: 25000,
    image: img('salon-cape', 'Cliente souriante installée par la coiffeuse'),
    galerie: [img('coiffage-satin', 'Finition de coiffure'), img('table-soin', 'Cabine de beauté')],
    aSavoir: 'Les dates de week-end se réservent en priorité : prévoir quelques semaines à l’avance.',
  },
];

export const getPrestation = (slug: string) => prestations.find((p) => p.slug === slug);
export const prestationsAssociees = (p: Prestation, n = 2) => prestations.filter((x) => x.slug !== p.slug).slice(0, n);
