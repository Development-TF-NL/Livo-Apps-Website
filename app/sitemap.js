const BASE = 'https://livoapps.software';

// De whitepaperpagina staat erin sinds 17 september 2026 (aanvraag per e-mail; het formulier
// blijft achter de privacyverklaring-poort). De prijspagina alleen als de PRICING_PAGE_ENABLED-poort open is (fase C).
export default function sitemap() {
  const pages = ['', '/ppwr', '/whitepaper'];
  if (process.env.PRICING_PAGE_ENABLED === 'true') pages.push('/pricing');
  return pages.flatMap((page) =>
    ['en', 'nl'].map((lang) => ({
      url: `${BASE}/${lang}${page}`,
      changeFrequency: 'monthly',
      alternates: {
        languages: {
          en: `${BASE}/en${page}`,
          nl: `${BASE}/nl${page}`,
        },
      },
    }))
  );
}
