const BASE = 'https://livoapps.software';

// De whitepaper-funnel staat hier bewust niet in zolang het formulier
// achter de privacyverklaring-poort zit (besluit-lead-flow-whitepaper-v1).
export default function sitemap() {
  const pages = ['', '/ppwr'];
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
