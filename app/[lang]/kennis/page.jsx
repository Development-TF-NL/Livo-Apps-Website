import { notFound } from 'next/navigation';
import { KennisIndex } from '../../components/Article';
import { getDictionary } from '../../get-dictionary';
import { socialMetadata } from '../../seo';
import { i18n } from '../../i18n-config';
import { KENNIS_INDEX, KENNIS_UI } from '../../content/kennis';

// Kennisingang onder /kennis/ (29 oktober 2026): alleen voor de taal 'nl'; de tegenhanger in de andere taal heeft een eigen
// sectie (zie KENNIS_INDEX). Een andere taal op dit pad geeft 404. Canonical en hreflang per taal.
const LANG = 'nl';
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: LANG }];
}

export async function generateMetadata({ params }) {
  if (params.lang !== LANG) return {};
  const ui = KENNIS_UI[LANG];
  const languages = Object.fromEntries(i18n.locales.map((l) => [l, KENNIS_INDEX[l]]));
  languages['x-default'] = KENNIS_INDEX[i18n.defaultLocale];
  const title = ui.indexMetaTitle; const description = ui.indexDescription;
  return { title, description, alternates: { canonical: KENNIS_INDEX[LANG], languages }, ...socialMetadata({ title, description, lang: LANG, path: KENNIS_INDEX[LANG] }) };
}

export default async function KennisIndexPage({ params }) {
  if (params.lang !== LANG) notFound();
  const dict = await getDictionary(LANG);
  return <KennisIndex lang={LANG} dict={dict} />;
}
