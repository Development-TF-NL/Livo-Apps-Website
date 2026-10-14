import { notFound } from 'next/navigation';
import Article from '../../../components/Article';
import { getDictionary } from '../../../get-dictionary';
import { socialMetadata } from '../../../seo';
import { i18n } from '../../../i18n-config';
import { findArticle, articleParams, articlePath } from '../../../content/kennis';

// Kennisartikel onder /resources/ (14 oktober 2026). Elke taal heeft een eigen sectie en slug; de combinatie taal,
// sectie en slug moet in content/kennis.js bestaan, anders 404. Canonical en hreflang per artikel.
const SECTION = 'resources';
export const dynamicParams = false;

export function generateStaticParams() {
  return i18n.locales.flatMap((lang) => articleParams(lang, SECTION));
}

export async function generateMetadata({ params }) {
  const article = findArticle(params.lang, SECTION, params.slug);
  if (!article) return {};
  const { title, description } = article[params.lang].meta;
  const languages = Object.fromEntries(i18n.locales.map((l) => [l, articlePath(article, l)]));
  languages['x-default'] = articlePath(article, i18n.defaultLocale);
  return { title, description, alternates: { canonical: articlePath(article, params.lang), languages }, ...socialMetadata({ title, description, lang: params.lang }) };
}

export default async function KennisPage({ params }) {
  const { lang, slug } = params;
  const article = findArticle(lang, SECTION, slug);
  if (!article) notFound();
  const dict = await getDictionary(lang);
  return <Article lang={lang} article={article} dict={dict} />;
}
