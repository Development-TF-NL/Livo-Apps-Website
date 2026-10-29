import { i18n } from './i18n-config';
import { ARTICLES, KENNIS_INDEX } from './content/kennis';
import { SITE_URL } from './seo';

// Alleen 200-URL's op de definitieve host (www, 29 oktober 2026), elk met wederkerige hreflang.
// De whitepaperpagina staat erin sinds 17 september 2026 (aanvraag per e-mail; het formulier
// blijft achter de privacyverklaring-poort). De prijspagina alleen als de PRICING_PAGE_ENABLED-poort open is (fase C).
export default function sitemap() {
  const pages = ['', '/ppwr', '/whitepaper'];
  if (process.env.PRICING_PAGE_ENABLED === 'true') pages.push('/pricing');
  const alternatesFor = (paths) => ({
    languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `${SITE_URL}${paths[l]}`])), 'x-default': `${SITE_URL}${paths[i18n.defaultLocale]}` },
  });
  // Kennisingang (29 oktober 2026) en kennisartikelen (14 oktober 2026): per taal een eigen URL, met de tegenhanger als hreflang.
  const kennis = [KENNIS_INDEX, ...ARTICLES.map((a) => a.path)].flatMap((paths) =>
    i18n.locales.map((lang) => ({ url: `${SITE_URL}${paths[lang]}`, changeFrequency: 'monthly', alternates: alternatesFor(paths) }))
  );
  return pages.flatMap((page) =>
    i18n.locales.map((lang) => ({
      url: `${SITE_URL}/${lang}${page}`,
      changeFrequency: 'monthly',
      alternates: alternatesFor(Object.fromEntries(i18n.locales.map((l) => [l, `/${l}${page}`]))),
    }))
  ).concat(kennis);
}
