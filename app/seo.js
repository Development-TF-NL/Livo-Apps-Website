// Eén bron voor de social-tags, de absolute site-URL en de gestructureerde data. Next.js voegt page-level `openGraph` niet samen
// met de layout maar vervangt het object als geheel — een pagina die alleen
// { title, description } zet, drukt daarmee ongemerkt de og:image weg. Daarom
// bouwt elke pagina (en de layout-fallback) zijn openGraph/twitter via deze helper.
import { i18n } from './i18n-config';

// De definitieve host (29 oktober 2026): de apex geeft een 308 naar www; canonical, hreflang, sitemap, robots en de
// social-URL's wijzen daarom allemaal naar www, zodat elke indexeerbare pagina naar haar eigen 200-URL verwijst.
export const SITE_URL = 'https://www.livoapps.software';
export const absoluteUrl = (path = '') => `${SITE_URL}${path}`;

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
// path: het pad van de pagina (met taal) voor og:url, zodat de social-URL dezelfde is als de canonical.
export function socialMetadata({ title, description, lang, path }) {
  const locale = lang && OG_LOCALE[lang]
    ? { locale: OG_LOCALE[lang], alternateLocale: i18n.locales.filter((l) => l !== lang).map((l) => OG_LOCALE[l]) }
    : {};
  return {
    openGraph: {
      siteName: 'Livo Apps',
      type: 'website',
      ...locale,
      ...(path ? { url: path } : {}),
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

// Gestructureerde data (29 oktober 2026): alleen wat de zichtbare pagina draagt. Geen sterren, reviews of FAQ.
// Organization: naam, adres van de site, logo, het e-mailadres en de LinkedIn-pagina uit de footer.
export const ORGANIZATION = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'LIVO APPS B.V.',
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  email: 'hello@livoapps.software',
  sameAs: ['https://www.linkedin.com/company/livoapps-software'],
};

export function organizationJsonLd() {
  return { '@context': 'https://schema.org', ...ORGANIZATION };
}

// items: [{ label, href }] zoals het zichtbare kruimelpad; het laatste item is de huidige pagina (zonder href).
export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

// Een kennisartikel: kop, omschrijving, taal, publicatie- en controledatum, de organisatie als auteur en uitgever.
export function articleJsonLd({ headline, description, lang, path, datePublished, dateModified }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    inLanguage: lang,
    mainEntityOfPage: absoluteUrl(path),
    datePublished,
    dateModified,
    author: { '@type': 'Organization', name: ORGANIZATION.name, url: SITE_URL },
    publisher: { '@id': ORGANIZATION['@id'] },
  };
}
