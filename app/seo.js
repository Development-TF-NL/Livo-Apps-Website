// Eén bron voor de social-tags. Next.js voegt page-level `openGraph` niet samen
// met de layout maar vervangt het object als geheel — een pagina die alleen
// { title, description } zet, drukt daarmee ongemerkt de og:image weg. Daarom
// bouwt elke pagina (en de layout-fallback) zijn openGraph/twitter via deze helper.
import { i18n } from './i18n-config';

export const OG_IMAGE = {
  url: '/og.png', // relatief; metadataBase (layout) maakt er een absolute URL van
  width: 1200,
  height: 630,
  alt: 'LIVO APPS wordmark',
};

// hreflang per pagina: beide talen plus x-default naar de standaardtaal (i18n-config, voorlopig Nederlands).
// path is het pad na de taal, bijvoorbeeld '' of '/ppwr'.
export function languageAlternates(path = '') {
  return {
    ...Object.fromEntries(i18n.locales.map((l) => [l, `/${l}${path}`])),
    'x-default': `/${i18n.defaultLocale}${path}`,
  };
}

const OG_LOCALE = { nl: 'nl_NL', en: 'en_GB' };

// lang: de taal van de pagina voor og:locale; zonder lang (de 404-fallback in de layout) geen og:locale.
export function socialMetadata({ title, description, lang }) {
  const locale = lang && OG_LOCALE[lang]
    ? { locale: OG_LOCALE[lang], alternateLocale: i18n.locales.filter((l) => l !== lang).map((l) => OG_LOCALE[l]) }
    : {};
  return {
    openGraph: {
      siteName: 'Livo Apps',
      type: 'website',
      ...locale,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
