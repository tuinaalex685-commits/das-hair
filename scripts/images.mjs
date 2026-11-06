// Télécharge les photographies du prototype (licence Unsplash : usage commercial gratuit,
// sans attribution obligatoire) en WebP, aux bonnes dimensions, dans public/images/.
// Relancer : node scripts/images.mjs   (n'écrase pas les fichiers déjà présents)
import { mkdir, writeFile, access } from 'node:fs/promises';

const W = { hero: 2400, large: 1800, carre: 1400 };
const IMAGES = {
  portraits: {
    hero: ['1613730317928-246094cb6a82', W.hero], 'profil-tresse-ocre': ['1527203561188-dae1bc1a417f', W.large],
    'afro-regard': ['1632765854612-9b02b6ec2b15', W.large], 'afro-mains': ['1632765866070-3fadf25d3d5b', W.large],
    'col-roule': ['1548207800-8c16d068bf17', W.large], 'tailleur-raye': ['1613876214872-a73df2a1b8bc', W.large],
    'nattes-nb': ['1673470907547-1c0c6a996095', W.large], 'peau-lumineuse': ['1637851362556-46d07c374023', W.large],
    'afro-ombre': ['1598363576971-69666ab1130a', W.large], 'dos-cheveux': ['1770993840152-8aee4b804dfb', W.large],
    'profil-boucles': ['1577746838851-816a43ca8733', W.large], cauris: ['1713845784497-fe3d7ed176d8', W.large],
  },
  soins: {
    'tresses-mains': ['1757866332661-d82bb649dbb8', W.large], 'tresses-mains-2': ['1757866332394-a2581b937482', W.large],
    'tresses-outil': ['1757866333063-4960512eee0c', W.large], 'cuir-chevelu': ['1757866332728-86fd6b8bf7ef', W.large],
    'coiffage-satin': ['1657563920440-0ac6d8932f20', W.large], 'salon-cape': ['1761839256791-6a93f89fb8b0', W.large],
    'salon-lumiere': ['1695527081827-fdbc4e77be9b', W.large], 'table-soin': ['1787651343620-8d5303006ecb', W.large],
    'creme-visage': ['1693004923522-806dafe5a1a0', W.large], detente: ['1716827173458-8bde30d6c78f', W.large],
    'soin-serviette': ['1648203276014-20f97ba1f817', W.large], 'boucles-sechage': ['1712641966810-611ff1503c6d', W.large],
  },
  academy: {
    eleves: ['1704453961898-38a07a700128', W.large], 'atelier-nb': ['1763048208932-cbe149724374', W.large],
    'geste-nb': ['1729005732908-de02acdeca5d', W.large], 'tresses-mains-3': ['1757866332729-c04470c57a43', W.large],
  },
  produits: {
    'huile-lin': ['1671493235081-5842463637cd', W.carre], 'flacon-lin': ['1671493234254-15fc6c91aa87', W.carre],
    apothicaire: ['1574670700790-fa314ab37787', W.carre], 'duo-lin': ['1671493234884-b1611bcf3e69', W.carre],
    'compte-gouttes': ['1608571702600-5a5419d31475', W.carre], 'compte-gouttes-ombre': ['1608571424237-381e6b43a2a7', W.carre],
    'goutte-main': ['1608571702419-f1267e9a18fb', W.carre], 'serum-scene': ['1630893174210-eea582de3c74', W.carre],
    'tube-citron': ['1609097164468-b498a4ab436a', W.carre], 'pot-bois': ['1768235146417-4ccc5befad83', W.carre],
    beurre: ['1573812461383-e5f8b759d12e', W.carre], 'tube-etagere': ['1714479140002-62d1824fffb5', W.carre],
    'tube-lumiere': ['1711034940156-3fd9bbd94f30', W.carre], 'huile-main': ['1515377905703-c4788e51af15', W.carre],
    'flacon-ambre': ['1608571424266-edeb9bbefdec', W.carre], 'pots-ambre': ['1636718566772-0232f1d12299', W.carre],
  },
  textures: {
    'creme-ocre': ['1632127579802-ff69469091a4', W.large], 'creme-beige': ['1585945037805-5fd82c2e60b1', W.large],
    satin: ['1758216434916-0819f9cd3a4d', W.large], 'peigne-nb': ['1773078280516-df823e1c9d78', W.large],
  },
};

const credits = [];
let n = 0;
for (const [dossier, liste] of Object.entries(IMAGES)) {
  await mkdir(`public/images/${dossier}`, { recursive: true });
  for (const [nom, [id, w]] of Object.entries(liste)) {
    const fichier = `public/images/${dossier}/${nom}.webp`;
    const source = `https://images.unsplash.com/photo-${id}`;
    credits.push({ fichier: fichier.replace('public', ''), source, licence: 'Unsplash License (https://unsplash.com/license)' });
    try { await access(fichier); continue; } catch { /* à télécharger */ }
    const r = await fetch(`${source}?w=${w}&q=74&fm=webp&auto=format`);
    if (!r.ok) { console.error('échec', nom, r.status); continue; }
    await writeFile(fichier, Buffer.from(await r.arrayBuffer()));
    n++;
  }
}
await writeFile('public/images/CREDITS.json', JSON.stringify(credits, null, 2));
console.log(`${n} images téléchargées, ${credits.length} référencées dans public/images/CREDITS.json`);
