import Logo from './Logo';

// De site-footer, gedeeld door homepage en overige pagina's.
// dict = home.footer uit de dictionaries; teksten dus altijd in beide talen.
export default function Footer({ lang, dict }) {
  return (
    <footer className="bg-navy text-white border-t border-white/10 px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Logo variant="inverse" />
              <span className="text-lg font-display font-bold tracking-wider">LIVO APPS</span>
            </div>
            <p className="text-white/60 text-sm">{dict.tagline}</p>
          </div>
          {[dict.columns.product, dict.columns.company].map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-bold mb-4 text-sm tracking-wide">{col.title}</h4>
              <ul className="space-y-3 text-sm text-white/60">
                {col.items.map(({ label, href }) => (
                  // Interne links in de dictionary staan zonder taalprefix.
                  <li key={label}>
                    <a href={href.startsWith('/') || href.startsWith('#') ? `/${lang}${href}` : href} className="hover:text-accent">
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
