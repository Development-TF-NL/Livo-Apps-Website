// Server-only loader. The two JSON dictionaries live in ./dictionaries.
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  nl: () => import('./dictionaries/nl.json').then((module) => module.default),
};

export async function getDictionary(locale) {
  const load = dictionaries[locale] ?? dictionaries.en;
  return load();
}
