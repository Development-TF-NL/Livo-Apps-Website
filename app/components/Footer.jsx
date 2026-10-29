import { ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { ARTICLES, ARTICLE_LABELS, articlePath } from '../content/kennis';

// Site-footer op het landingspagina-concept (29 oktober 2026): licht, op papier, met het logo, de tagline en het e-mailadres
// bovenaan, de drie kolommen (Product, Hulpmiddelen met de kennisingang en de artikelen, Bedrijf met Inloggen) en onderaan de
// voetregel over juridisch advies naast het copyright. dict = home.footer; interne links staan zonder taalprefix.
// De link Prijzen volgt de poort: open (PRICING_PAGE_ENABLED) naar de prijspagina, dicht naar het prijsblok op de homepage.
export default function Footer({ lang, dict, pricingEnabled = process.env.PRICING_PAGE_ENABLED === 'true' }) {
  const columns = [dict.columns.product, dict.columns.resources, dict.columns.company]
    .filter(Boolean)
    .map((column) => ({ ...column, items: column.items.filter(({ href }) => href !== '/whitepaper') }))
    .map((column) => (column.title === dict.columns.resources?.title ? { ...column, items: [...column.items, ...ARTICLES.map((a) => ({ label: ARTICLE_LABELS[a.id][lang], href: articlePath(a, lang), absolute: true }))] } : column))
    .filter((column) => column.items.length > 0);
  const resolve = (href, absolute) => {
    if (absolute) return href;
    if (href === '#pricing' && pricingEnabled) return `/${lang}/pricing`;
    if (href === '#pricing') return `/${lang}#prijzen`;
    if (href === '#how') return `/${lang}#werkwijze`;
    return href.startsWith('/') || href.startsWith('#') ? `/${lang}${href}` : href;
  };
  const link = 'inline-flex min-h-[44px] items-center rounded text-sm text-ink transition-colors duration-150 hover:text-green-text focus-ring';
  return (
    <footer className="border-t border-line bg-paper pb-7 pt-9 text-ink">
      <div className="mx-auto w-[min(1240px,calc(100%-40px))] md:w-[min(1240px,calc(100%-76px))] xl:w-[min(1240px,calc(100%-104px))]">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Logo className="h-9 w-auto" />
          <p className="text-[11px] text-sub">{dict.tagline}</p>
          <a href="mailto:hello@livoapps.software" className="flex items-center gap-3 text-[11px] font-medium md:ml-auto max-md:w-full">hello@livoapps.software <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" /></a>
        </div>
        <div className="mt-8 grid gap-8 border-t border-line pt-8 md:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-2 text-[11px] font-bold tracking-[.13em] text-green-text">{col.title}</h4>
              <ul>
                {col.items.map(({ label, href, absolute }) => (
                  <li key={label}><a href={resolve(href, absolute)} className={link} {...(href.startsWith('https://') ? { rel: 'noopener noreferrer' } : {})}>{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-7 flex flex-col gap-4 border-t border-line pt-5 text-[9px] leading-[1.75] text-sub md:flex-row md:items-start md:justify-between md:gap-8">
          <p className="max-w-[540px]">{dict.disclaimer}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {dict.social.map(({ label, href }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="rounded hover:text-green-text focus-ring">{label}</a>)}
            <span>{dict.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
