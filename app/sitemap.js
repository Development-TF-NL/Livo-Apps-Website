import { i18n } from './i18n-config';
import { ARTICLES } from './content/kennis';

const BASE = 'https://livoapps.software';

// De whitepaperpagina staat erin sinds 17 september 2026 (aanvraag per e-mail; het formulier
// blijft achter de privacyverklaring-poort). De prijspagina alleen als de PRICING_PAGE_ENABLED-poort open is (fase C).
export default function sitemap() {
  const pages = ['', '/ppwr', '/whitepaper'];
  if (process.env.PRICING_PAGE_ENABLED === 'true') pages.push('/pricing');
  // Kennisartikelen (14 oktober 2026): per taal een eigen URL, met de tegenhanger in de andere taal als hreflang.
  const articles = ARTICLES.flatMap((a) =>
    i18n.locales.map((lang) => ({
      url: `${BASE}${a.path[lang]}`,
      changeFrequency: 'monthly',
      alternates: { languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `${BASE}${a.path[l]}`])), 'x-default': `${BASE}${a.path[i18n.defaultLocale]}` } },
    }))
  );
  return pages.flatMap((page) =>
    i18n.locales.map((lang) => ({
      url: `${BASE}/${lang}${page}`,
      changeFrequency: 'monthly',
      alternates: {
        languages: {
          nl: `${BASE}/nl${page}`,
          en: `${BASE}/en${page}`,
          'x-default': `${BASE}/${i18n.defaultLocale}${page}`,
        },
      },
    }))
  ).concat(articles);
}
