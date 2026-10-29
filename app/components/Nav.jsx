'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import ProductLoginMenu from './ProductLoginMenu';
import OrderButton from './OrderButton';
import { ARTICLES, KENNIS_INDEX } from '../content/kennis';

// Header (kooproute 29 oktober 2026): vier menulinks (Hoe het werkt, Prijzen, Kennis, Over LIVO APPS),
// taalwissel, Log in (menu) en de knop naar de planselectie op de prijspagina (OrderButton, geen mailto).
// Geen dode links: Prijzen wijst naar /pricing zodra de poort open is, anders naar het prijsblok op de homepage;
// Kennis wijst naar de kennisingang van de taal; de productpagina en de whitepaper staan in de footer.

// De focusrand komt van de klasse focus-ring (globals.css); rounded geeft de rand afgeronde hoeken.
const focusRing = 'focus-ring rounded';

// Volgorde van de taalwissel: de standaardtaal eerst (NL · EN). Het blokje heeft geen overflow-hidden,
// anders wordt de focusrand afgesneden; de link met focus ligt boven zijn buur. De links zijn 24 px hoog;
// een onzichtbaar vlak eromheen (after) maakt het klikdoel 44 px.
const languages = [
  ['nl', 'NL'],
  ['en', 'EN'],
];

export default function Nav({ lang, dict, pricingEnabled = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname() || `/${lang}`;

  // Kennisartikelen (14 oktober 2026) hebben per taal een eigen pad; de wissel gaat dan naar de tegenhanger.
  const switchPath = (locale) => {
    const article = ARTICLES.find((a) => a.path[lang] === pathname);
    if (article) return article.path[locale];
    if (pathname === KENNIS_INDEX[lang]) return KENNIS_INDEX[locale];
    return `/${locale}${pathname.replace(new RegExp(`^/${lang}(?=/|$)`), '')}`;
  };

  const close = () => setIsMenuOpen(false);

  const navItems = [
    { label: dict.how, href: `/${lang}#how` },
    // Poort open (PRICING_PAGE_ENABLED): naar de prijspagina; dicht: naar het prijsblok op de homepage.
    { label: dict.pricing, href: pricingEnabled ? `/${lang}/pricing` : `/${lang}#pricing` },
    { label: dict.kennis, href: KENNIS_INDEX[lang] },
    { label: dict.about, href: `/${lang}#about` },
  ];

  const langSwitch = (
    <div className="flex items-center rounded-md border border-line text-xs font-semibold" role="group" aria-label={dict.language}>
      {languages.map(([code, label]) => {
        const active = code === lang;
        return (
          <Link
            key={code}
            href={switchPath(code)}
            hrefLang={code}
            onClick={close}
            aria-current={active ? 'true' : undefined}
            className={`relative px-2.5 py-1 transition-colors duration-150 after:absolute after:inset-x-0 after:-inset-y-2.5 ${focusRing} focus-visible:z-10 ${active ? 'bg-navy text-white' : 'text-sub hover:text-ink'}`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <nav className="mx-auto box-content flex h-16 max-w-content items-center justify-between px-6">
        <Link href={`/${lang}`} aria-label="Livo Apps, home" className={`flex h-11 items-center gap-2 ${focusRing}`}>
          <Logo className="h-10 w-auto" />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className={`inline-flex h-11 items-center text-sm text-ink transition-colors duration-150 hover:text-accent-dark ${focusRing}`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          {langSwitch}
          <ProductLoginMenu dict={dict} />
          <OrderButton lang={lang} t={dict.order} pricingEnabled={pricingEnabled} hash="#plans" className={`inline-flex h-11 items-center gap-2 rounded-control bg-accent px-5 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-accent-dark ${focusRing}`} />
        </div>

        <button
          type="button"
          className={`inline-flex h-11 w-11 items-center justify-center text-ink lg:hidden ${focusRing}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? dict.menuClose : dict.menuOpen}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-line bg-white px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} onClick={close} className={`flex min-h-[44px] items-center text-sm text-ink transition-colors duration-150 hover:text-accent-dark ${focusRing}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-start justify-between border-t border-line pt-4">
            <ProductLoginMenu dict={dict} mobile />
            {langSwitch}
          </div>
          <OrderButton lang={lang} t={dict.order} pricingEnabled={pricingEnabled} hash="#plans" onClick={close} className={`mt-4 flex h-12 items-center justify-center gap-2 rounded-control bg-accent px-5 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-accent-dark ${focusRing}`} />
        </div>
      )}
    </header>
  );
}
