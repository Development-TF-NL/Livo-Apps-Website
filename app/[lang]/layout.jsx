import '../globals.css';
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
  title: 'Livo Apps - Software that lightens the workflow',
  description: 'Elegant software that removes complexity from everyday business processes.',
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
      </body>
    </html>
  );
}
