import '../globals.css';
import { notFound } from 'next/navigation';
import Nav from '../components/Nav';
import { getDictionary } from '../get-dictionary';
import { i18n } from '../i18n-config';

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
    <html lang={lang}>
      <body>
        <Nav lang={lang} dict={dict.nav} />
        {children}
      </body>
    </html>
  );
}
