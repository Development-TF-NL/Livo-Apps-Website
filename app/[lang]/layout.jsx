import '../globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import Nav from '../components/Nav';
import { getDictionary } from '../get-dictionary';
import { i18n } from '../i18n-config';

// Body-font per ontwerpdocument v2 §3.2. Koppen: Satoshi (self-hosted, Fontshare-licentie)
// — TODO: fontbestanden toevoegen onder app/fonts/ zodra opgehaald; de `font-display`-stack
// valt tot die tijd terug op Inter.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://livoapps.software'),
  title: 'Livo Apps — Software that lightens the workflow',
  description: 'Elegant software that removes complexity from everyday business processes.',
  icons: {
    // Afgeleiden van de SVG-master in public/ (besluit-logo-svg-master-v1)
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon-180.png',
  },
  openGraph: {
    siteName: 'Livo Apps',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
};

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }) {
  const { lang } = params;
  if (!i18n.locales.includes(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={inter.variable}>
      <body className="font-sans text-ink">
        <Nav lang={lang} dict={dict.nav} />
        {children}
        {/* Cookieless (geen banner nodig) — ontwerpdocument v2 §5 */}
        <Analytics />
      </body>
    </html>
  );
}
