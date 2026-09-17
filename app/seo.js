// Eén bron voor de social-tags. Next.js voegt page-level `openGraph` niet samen
// met de layout maar vervangt het object als geheel — een pagina die alleen
// { title, description } zet, drukt daarmee ongemerkt de og:image weg. Daarom
// bouwt elke pagina (en de layout-fallback) zijn openGraph/twitter via deze helper.
export const OG_IMAGE = {
  url: '/og.png', // relatief; metadataBase (layout) maakt er een absolute URL van
  width: 1200,
  height: 630,
  alt: 'LIVO APPS wordmark',
};

export function socialMetadata({ title, description }) {
  return {
    openGraph: {
      siteName: 'Livo Apps',
      type: 'website',
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
