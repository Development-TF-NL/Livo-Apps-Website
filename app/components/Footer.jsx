import Logo from './Logo';

// Site-footer (brief §11 punt 13): Product, Resources, Company met login-link; voetregel
// van 15 september ("not legal advice and does not guarantee compliance").
// dict = home.footer; interne links in de dictionary staan zonder taalprefix.
// De link Prijzen volgt de poort, net als het menu: open (PRICING_PAGE_ENABLED) naar de prijspagina,
// dicht naar het prijsblok op de homepage.
export default function Footer({ lang, dict }) {
  const columns = [dict.columns.product, dict.columns.resources, dict.columns.company].filter(Boolean);
  const pricingEnabled = process.env.PRICING_PAGE_ENABLED === 'true';
  const resolve = (href) => {
    if (href === '#pricing' && pricingEnabled) return `/${lang}/pricing`;
    return href.startsWith('/') || href.startsWith('#') ? `/${lang}${href}` : href;
  };
  return (
    <footer className="bg-navy text-white border-t border-white/10 px-6 py-16">
      <div className="mx-auto max-w-content">
        <div className="grid gap-12 mb-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Logo variant="inverse" className="h-12 w-auto" />
            </div>
            <p className="text-white/60 text-sm">{dict.tagline}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-2 font-display text-sm font-bold tracking-wide">{col.title}</h4>
              <ul className="text-sm text-white/60">
                {col.items.map(({ label, href }) => (
                  <li key={label}>
                    <a href={resolve(href)} className="inline-flex min-h-[44px] items-center rounded transition-colors duration-150 hover:text-accent focus-ring" {...(href.startsWith('https://') ? { rel: 'noopener noreferrer' } : {})}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/50 mb-8">{dict.disclaimer}</p>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <p>{dict.copyright}</p>
          <div className="mt-2 flex items-center gap-6 md:mt-0">
            {dict.social.map(({ label, href }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center rounded transition-colors duration-150 hover:text-accent focus-ring" key={label}>{label}</a>
            ))}
            <a href="mailto:hello@livoapps.software" className="inline-flex min-h-[44px] items-center rounded transition-colors duration-150 hover:text-accent focus-ring">hello@livoapps.software</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
