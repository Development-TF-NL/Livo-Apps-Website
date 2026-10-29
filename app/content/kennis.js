import data from './kennis.json';

// Kennisartikelen (AI-vindbaarheid, 14 oktober 2026). De teksten staan in kennis.json, overgenomen uit het
// inhoudspakket van 13 oktober; dit bestand kent alleen de routes en de kleine navigatielabels.
// Afwijking van de gewone bron (dictionaries uit de product-repo): dit pakket raakt de product-repo niet,
// dus de artikelteksten staan hier in de website-repo. Verhuizen kan later via het sync-script.
// Per taal een eigen URL (section en slug verschillen per taal); de tegenhanger in de andere taal is het
// artikel met dezelfde id. Geen aparte AI-bestanden, geen nieuwe dependency.
// 29 oktober 2026: de kennisingang (/nl/kennis en /en/resources) met de twee artikelen en de whitepaper; per artikel
// verantwoordelijke organisatie, controledatum, bronnen en een vervolgstap (labels hieronder, data in kennis.json).
export const ARTICLES = data.articles;

export const KENNIS_INDEX = { nl: '/nl/kennis', en: '/en/resources' };
export const KENNIS_SECTION = { nl: 'kennis', en: 'resources' };

export const KENNIS_UI = {
  nl: {
    breadcrumbHome: 'LIVO APPS', section: 'Kennis', eyebrow: 'Kennis', more: 'Meer lezen', moreLead: 'Twee praktische artikelen over verpakkingsdata en de whitepaper.',
    indexTitle: 'Kennis over verpakkingsdata', indexMetaTitle: 'Kennis over verpakkingsdata en de PPWR · LIVO PPWR',
    indexDescription: 'Praktische artikelen over klantvragen, leveranciersuitvragen en bewijs, en de PPWR-whitepaper. Gekoppeld aan vragen uit het dagelijkse werk.',
    indexLead: 'Begin bij de vraag die nu op je bureau ligt: een klant die om verpakkingsdata vraagt, of een leverancier die gegevens moet aanleveren.',
    articles: 'Artikelen', whitepaper: 'Whitepaper', read: 'Lees het artikel', readWhitepaper: 'Naar de whitepaper',
    by: 'Door', reviewed: 'Inhoud gecontroleerd op', sources: 'Bronnen', sourcesLead: 'Primaire bron voor de juridische basis. De artikelen geven een werkwijze, geen juridisch oordeel.',
    nextLead: 'Zien hoe LIVO PPWR dit ondersteunt?', nextCta: 'Bekijk LIVO PPWR', nextDemo: 'Of vraag een demo aan',
  },
  en: {
    breadcrumbHome: 'LIVO APPS', section: 'Resources', eyebrow: 'Resources', more: 'Read next', moreLead: 'Two practical articles on packaging data and the whitepaper.',
    indexTitle: 'Resources on packaging data', indexMetaTitle: 'Resources on packaging data and the PPWR · LIVO PPWR',
    indexDescription: 'Practical articles on customer requests, supplier requests and evidence, plus the PPWR whitepaper. Linked to questions from everyday work.',
    indexLead: 'Start with the question on your desk today: a customer asking for packaging data, or a supplier who needs to provide it.',
    articles: 'Articles', whitepaper: 'Whitepaper', read: 'Read the article', readWhitepaper: 'Go to the whitepaper',
    by: 'By', reviewed: 'Content checked on', sources: 'Sources', sourcesLead: 'Primary source for the legal basis. The articles describe a workflow, not a legal assessment.',
    nextLead: 'Want to see how LIVO PPWR supports this?', nextCta: 'Explore LIVO PPWR', nextDemo: 'Or request a demo',
  },
};

// Korte labels voor voettekst en leesblok (afgeleid van de koppen).
export const ARTICLE_LABELS = {
  klantvraag: { nl: 'Je klant vraagt om verpakkingsdata', en: 'A customer asks for packaging data' },
  leveranciers: { nl: 'Verpakkingsgegevens opvragen bij leveranciers', en: 'Packaging data to request from suppliers' },
};

export function articlePath(article, lang) {
  return article.path[lang];
}

// Vindt het artikel bij een taal, sectie en slug; null als de combinatie niet bestaat (dan 404).
export function findArticle(lang, section, slug) {
  return ARTICLES.find((a) => a.path[lang] === `/${lang}/${section}/${slug}`) ?? null;
}

export function articleParams(lang, section) {
  return ARTICLES.filter((a) => a.path[lang].startsWith(`/${lang}/${section}/`)).map((a) => ({ lang, slug: a.path[lang].split('/').pop() }));
}

export function articleById(id) {
  return ARTICLES.find((a) => a.id === id);
}

// Datum in de taal van de pagina, zonder tijdzone-effect (de datum staat als YYYY-MM-DD in kennis.json).
export function formatDate(iso, lang) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(lang === 'nl' ? 'nl-NL' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(y, m - 1, d)));
}
