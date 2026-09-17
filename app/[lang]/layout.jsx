import '../globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Inter, Caveat } from 'next/font/google';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import Nav from '../components/Nav';
import { getDictionary } from '../get-dictionary';
import { i18n } from '../i18n-config';
import { socialMetadata } from '../seo';

// Body-font per ontwerpdocument v2 §3.2. Koppen: Satoshi (self-hosted, Fontshare-licentie)
// — TODO: fontbestanden toevoegen onder app/fonts/ zodra opgehaald; de `font-display`-stack
// valt tot die tijd terug op Inter.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
// Huisstijl v2 (17 sep 2026): Satoshi self-hosted (Fontshare, bestanden uit de product-repo) en
// Caveat als handschrift-accent (alleen website en flyer; nooit app, documenten, e-mail).
const satoshi = localFont({
  src: [
    { path: '../fonts/Satoshi-500.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/Satoshi-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
});
const caveat = Caveat({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-caveat', display: 'swap' });

// Fallback voor pagina's zonder eigen generateMetadata (praktisch alleen de 404);
// dit statische metadata-object kent geen taal, dus de EN-versie.
const FALLBACK_TITLE = 'Livo Apps · Software that lightens the workflow';
const FALLBACK_DESCRIPTION = 'Know which rules apply. Prove that you comply.';

export const metadata = {
  metadataBase: new URL('https://livoapps.software'),
  title: FALLBACK_TITLE,
  description: FALLBACK_DESCRIPTION,
  icons: {
    // Afgeleiden van de SVG-master in public/ (besluit-logo-svg-master-v1)
    icon: [
      { url: '/favicon.svg?v=3', type: 'image/svg+xml' },
      { url: '/favicon-32.png?v=3', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png?v=3', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon-180.png?v=3',
    shortcut: '/favicon.ico?v=3',
  },
  ...socialMetadata({ title: FALLBACK_TITLE, description: FALLBACK_DESCRIPTION }),
};

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }) {
  const { lang } = params;
  if (!i18n.locales.includes(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${inter.variable} ${satoshi.variable} ${caveat.variable}`}>
      <body className="font-sans text-ink">
        <Nav lang={lang} dict={dict.nav} />
        {children}
        {/* Cookieless (geen banner nodig) — ontwerpdocument v2 §5 */}
        <Analytics />
      </body>
    </html>
  );
}
