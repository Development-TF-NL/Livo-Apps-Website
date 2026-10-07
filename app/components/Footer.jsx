import Logo from './Logo';

// Site-footer: Product en Company met login-link; whitepaperpromotie wacht op review. Voetregel
// van 15 september ("not legal advice and does not guarantee compliance").
// dict = home.footer; interne links in de dictionary staan zonder taalprefix.
// De link Prijzen volgt de poort, net als het menu: open (PRICING_PAGE_ENABLED) naar de prijspagina,
// dicht naar het prijsblok op de homepage. De poortstand komt uit de omgeving; op de 404 wordt hij meegegeven,
// omdat de footer daar in de browser draait (FooterForPath).
export default function Footer({ lang, dict, pricingEnabled = process.env.PRICING_PAGE_ENABLED === 'true' }) {
  const columns = [dict.columns.product, dict.columns.resources, dict.columns.company]
    .filter(Boolean)
    .map((column) => ({ ...column, items: column.items.filter(({ href }) => href !== '/whitepaper') }))
    .filter((column) => column.items.length > 0);
  const resolve = (href) => {
    if (href === '#pricing' && pricingEnabled) return `/${lang}/pricing`;
    return href.startsWith('/') || href.startsWith('#') ? `/${lang}${href}` : href;
  };
  return (
    <footer className="bg-navy text-white border-t border-white/10 px-6 py-16">
      <div className="mx-auto max-w-content">
        <div className="grid gap-12 mb-12 md:grid-cols-3">
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
          <div className="mt-2 flex max-w-full flex-wrap items-center justify-center gap-x-6 gap-y-2 md:mt-0">
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
