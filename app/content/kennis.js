import data from './kennis.json';

// Kennisartikelen (AI-vindbaarheid, 14 oktober 2026). De teksten staan in kennis.json, overgenomen uit het
// inhoudspakket van 13 oktober; dit bestand kent alleen de routes en de kleine navigatielabels.
// Afwijking van de gewone bron (dictionaries uit de product-repo): dit pakket raakt de product-repo niet,
// dus de artikelteksten staan hier in de website-repo. Verhuizen kan later via het sync-script.
// Per taal een eigen URL (section en slug verschillen per taal); de tegenhanger in de andere taal is het
// artikel met dezelfde id. Geen aparte AI-bestanden, geen nieuwe dependency.
export const ARTICLES = data.articles;

export const KENNIS_UI = {
  nl: { breadcrumbHome: 'LIVO APPS', section: 'Kennis', eyebrow: 'Kennis', more: 'Meer lezen', moreLead: 'Twee praktische artikelen over verpakkingsdata.', demoLead: 'Zien hoe dit werkt met fictieve artikelgegevens?' },
  en: { breadcrumbHome: 'LIVO APPS', section: 'Resources', eyebrow: 'Resources', more: 'Read next', moreLead: 'Two practical articles on packaging data.', demoLead: 'Want to see how this works with fictional product data?' },
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
