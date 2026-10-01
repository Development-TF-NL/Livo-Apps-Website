// Server-only loader. The two JSON dictionaries live in ./dictionaries.
import { i18n } from './i18n-config';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  nl: () => import('./dictionaries/nl.json').then((module) => module.default),
};

export async function getDictionary(locale) {
  const load = dictionaries[locale] ?? dictionaries[i18n.defaultLocale];
  return load();
}
