import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import { site } from '@/data/site';
import { BoutiqueProvider } from '@/components/providers/Boutique';
import { EnTete } from '@/components/layout/EnTete';
import { PiedDePage } from '@/components/layout/PiedDePage';
import { PanierTiroir } from '@/components/products/PanierTiroir';
import { DefilementDoux } from '@/components/providers/DefilementDoux';
import { Curseur } from '@/components/ui/Curseur';

const bodoni = Bodoni_Moda({ subsets: ['latin'], variable: '--font-bodoni', axes: ['opsz'], style: ['normal', 'italic'], display: 'swap' });
const hanken = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-hanken', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Das'hair · Maison de beauté", template: "%s · Das'hair" },
  description: site.description,
  openGraph: { siteName: "Das'hair", locale: 'fr_FR', type: 'website' },
  // Prototype de présentation : pas d'indexation tant que les contenus réels ne sont pas en ligne.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: '#f5f2ec' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${bodoni.variable} ${hanken.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-surface focus:px-4 focus:py-2">
          Aller au contenu
        </a>
        <BoutiqueProvider>
          <EnTete />
          <main id="contenu" className="flex-1">{children}</main>
          <PiedDePage />
          <PanierTiroir />
          <DefilementDoux />
          <Curseur />
        </BoutiqueProvider>
        <p className="pointer-events-none fixed bottom-4 left-4 z-30 hidden rounded-full border border-filet bg-surface/85 px-4 py-1.5 text-encre backdrop-blur text-[0.78rem] font-medium md:block">
          Prototype : contenus de démonstration
        </p>
      </body>
    </html>
  );
}
