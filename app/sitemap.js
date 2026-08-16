const BASE = 'https://livoapps.software';

// De whitepaper-funnel staat hier bewust niet in zolang het formulier
// achter de privacyverklaring-poort zit (besluit-lead-flow-whitepaper-v1);
// de prijspagina alleen als de PRICING_PAGE_ENABLED-poort open is (fase C).
export default function sitemap() {
  const pages = ['', '/ppwr'];
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
