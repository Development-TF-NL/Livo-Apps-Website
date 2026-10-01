'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';
import { i18n } from '../i18n-config';

// De gedeelde footer op de 404. Een not-found krijgt geen taal mee, dus de taal komt hier uit het pad
// (/en/... geeft de Engelse footer, al het andere de standaardtaal). De footer zelf is ongewijzigd.
export default function FooterForPath({ footers, pricingEnabled }) {
  const segment = (usePathname() || '').split('/')[1];
  const lang = i18n.locales.includes(segment) ? segment : i18n.defaultLocale;
  return <Footer lang={lang} dict={footers[lang]} pricingEnabled={pricingEnabled} />;
}
