import Logo from './Logo';

// Site-footer (brief §11 punt 13): Product, Resources, Company met login-link; voetregel
// van 15 september ("not legal advice and does not guarantee compliance").
// dict = home.footer; interne links in de dictionary staan zonder taalprefix.
export default function Footer({ lang, dict }) {
  const columns = [dict.columns.product, dict.columns.resources, dict.columns.company].filter(Boolean);
  const resolve = (href) => (href.startsWith('/') || href.startsWith('#') ? `/${lang}${href}` : href);
  return (
    <footer className="bg-navy text-white border-t border-white/10 px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-12 mb-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Logo variant="inverse" className="h-12 w-auto" />
            </div>
            <p className="text-white/60 text-sm">{dict.tagline}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-bold mb-4 text-sm tracking-wide">{col.title}</h4>
              <ul className="space-y-3 text-sm text-white/60">
                {col.items.map(({ label, href }) => (
                  <li key={label}>
                    <a href={resolve(href)} className="hover:text-accent" {...(href.startsWith('https://') ? { rel: 'noopener noreferrer' } : {})}>
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
          <div className="flex gap-6 mt-4 md:mt-0">
            {dict.social.map(({ label, href }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-accent" key={label}>{label}</a>
            ))}
            <a href="mailto:hello@livoapps.software" className="hover:text-accent">hello@livoapps.software</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
