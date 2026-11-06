import type { Formation } from '@/types';

/**
 * FORMATIONS D'EXEMPLE (présentiel). Programmes, durées et tarifs sont INDICATIFS.
 * Le prototype ne mentionne AUCUN diplôme, certification ou reconnaissance officielle :
 * à n'ajouter que si Das'hair en dispose réellement.
 */
const img = (nom: string, alt: string) => ({ src: `/images/academy/${nom}.webp`, alt });

export const formations: Formation[] = [
  {
    slug: 'initiation-tresses',
    nom: 'Initiation aux tresses',
    niveau: 'Débutant',
    accroche: 'Les gestes de base, de la séparation des raies à la finition.',
    description:
      'Une formation pratique pour apprendre à préparer le cheveu, séparer proprement et réaliser des tresses régulières. Chaque séance alterne démonstration et pratique sur tête d’entraînement.',
    objectifs: ['Préparer et démêler un cheveu texturé.', 'Tracer des raies nettes et régulières.', 'Réaliser des tresses simples avec et sans rajouts.', 'Conseiller l’entretien à une cliente.'],
    programme: [
      { titre: 'Le cheveu texturé', detail: 'Observer, démêler, préparer sans casser.' },
      { titre: 'Raies et sections', detail: 'Tracer, mesurer, garder la tension régulière.' },
      { titre: 'La tresse', detail: 'Main, rythme, ajout progressif de la mèche.' },
      { titre: 'Finitions et conseils', detail: 'Pointes, durée de tenue, entretien.' },
    ],
    public: 'Personnes qui débutent, ou qui coiffent déjà à la maison et veulent un geste propre.',
    prerequis: 'Aucun.',
    duree: 'Exemple : 5 jours',
    format: 'Présentiel, en petit groupe',
    tarif: 75000,
    image: img('tresses-mains-3', 'Mains tressant des cheveux foncés en petites sections'),
  },
  {
    slug: 'nattes-et-motifs',
    nom: 'Nattes et motifs',
    niveau: 'Intermédiaire',
    accroche: 'Dessiner des lignes, des courbes et des motifs nets.',
    description:
      'Pour les personnes qui savent déjà natter et veulent travailler la précision : motifs courbes, croisements, symétrie et rapidité.',
    objectifs: ['Concevoir un motif avant de commencer.', 'Réaliser des courbes et des croisements.', 'Gagner en régularité et en vitesse.'],
    programme: [
      { titre: 'Dessiner le motif', detail: 'Repères, symétrie, proportions selon la tête.' },
      { titre: 'Courbes et croisements', detail: 'Changer de direction sans perdre la tension.' },
      { titre: 'Rajouts et volume', detail: 'Intégrer la mèche proprement.' },
      { titre: 'Mise en situation', detail: 'Réalisation complète, chronométrée.' },
    ],
    public: 'Coiffeuses et coiffeurs qui maîtrisent la natte de base.',
    prerequis: 'Savoir réaliser une natte collée simple.',
    duree: 'Exemple : 4 jours',
    format: 'Présentiel, en petit groupe',
    tarif: 90000,
    image: img('atelier-nb', 'Coiffeuses réalisant des nattes collées en atelier'),
  },
  {
    slug: 'soins-capillaires-pratique',
    nom: 'Soins capillaires en pratique',
    niveau: 'Intermédiaire',
    accroche: 'Diagnostiquer un cheveu et construire un soin adapté.',
    description:
      'Comprendre la texture, la porosité et l’état du cuir chevelu pour proposer un soin cohérent, en salon ou à conseiller à domicile.',
    objectifs: ['Réaliser un diagnostic simple et argumenté.', 'Choisir les produits selon la texture.', 'Mener un rituel de soin complet.'],
    programme: [
      { titre: 'Diagnostic', detail: 'Texture, porosité, cuir chevelu.' },
      { titre: 'Produits', detail: 'Lire une composition, choisir sans surcharger.' },
      { titre: 'Le rituel', detail: 'Lavage, masque, chaleur douce, mise en forme.' },
    ],
    public: 'Professionnelles de la coiffure, ou personnes en reconversion.',
    prerequis: 'Notions de base en coiffure recommandées.',
    duree: 'Exemple : 3 jours',
    format: 'Présentiel',
    tarif: 60000,
    image: img('geste-nb', 'Silhouette d’une coiffeuse au travail, en noir et blanc'),
  },
  {
    slug: 'accueil-espace-beaute',
    nom: 'Accueillir et conseiller',
    niveau: 'Perfectionnement',
    accroche: 'L’accueil, le conseil et l’organisation d’un espace beauté.',
    description:
      'Une formation sur ce qui se passe autour du fauteuil : accueillir, écouter une demande, conseiller un produit, organiser les rendez-vous et l’hygiène du poste.',
    objectifs: ['Accueillir et reformuler une demande.', 'Conseiller sans forcer la vente.', 'Organiser un planning et un poste de travail propre.'],
    programme: [
      { titre: 'L’accueil', detail: 'Premiers mots, écoute, reformulation.' },
      { titre: 'Le conseil', detail: 'Proposer un soin ou un produit adapté.' },
      { titre: 'L’organisation', detail: 'Rendez-vous, hygiène, matériel.' },
    ],
    public: 'Personnes qui travaillent ou souhaitent travailler dans un salon ou une boutique.',
    prerequis: 'Aucun.',
    duree: 'Exemple : 2 jours',
    format: 'Présentiel',
    tarif: 40000,
    image: img('eleves', 'Deux élèves en blouse blanche, souriantes'),
  },
];

export const getFormation = (slug: string) => formations.find((f) => f.slug === slug);
