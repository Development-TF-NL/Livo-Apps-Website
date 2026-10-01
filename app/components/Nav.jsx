'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import ProductLoginMenu from './ProductLoginMenu';
import OrderButton from './OrderButton';

// Header volgens homepage v5 (1 oktober 2026): drie menulinks (How it works, Pricing, About LIVO APPS),
// taalwissel, Log in (menu) en de tijdelijke bestelknop (mailto, tot 1 november 2026).
// Geen dode links: de drie links zijn ankers op de homepage; de productpagina en de whitepaper
// staan lager op de pagina en in de footer.

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy rounded';

// Volgorde van de taalwissel: de standaardtaal eerst (NL · EN).
const languages = [
  ['nl', 'NL'],
  ['en', 'EN'],
];

export default function Nav({ lang, dict }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname() || `/${lang}`;

  const switchPath = (locale) =>
    `/${locale}${pathname.replace(new RegExp(`^/${lang}(?=/|$)`), '')}`;

  const close = () => setIsMenuOpen(false);

  const navItems = [
    { label: dict.how, href: `/${lang}#how` },
    { label: dict.pricing, href: `/${lang}#pricing` },
    { label: dict.about, href: `/${lang}#about` },
  ];

  const langSwitch = (
    <div className="flex items-center overflow-hidden rounded-md border border-line text-xs font-semibold" role="group" aria-label={dict.language}>
      {languages.map(([code, label]) => {
        const active = code === lang;
        return (
          <Link
            key={code}
            href={switchPath(code)}
            hrefLang={code}
            onClick={close}
            aria-current={active ? 'true' : undefined}
            className={`px-2.5 py-1 transition-colors duration-200 ${focusRing} ${active ? 'bg-navy text-white' : 'text-sub hover:text-ink'}`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href={`/${lang}`} aria-label="Livo Apps, home" className={`flex items-center gap-2 ${focusRing}`}>
          <Logo className="h-10 w-auto" />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className={`text-sm text-ink transition-colors duration-200 hover:text-accent-dark ${focusRing}`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          {langSwitch}
          <ProductLoginMenu dict={dict} />
          <OrderButton t={dict.order} className={`inline-flex items-center gap-2 rounded-control bg-accent px-5 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent-dark ${focusRing}`} />
        </div>

        <button
          type="button"
          className={`text-ink lg:hidden ${focusRing}`}
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
                <Link href={item.href} onClick={close} className={`block py-2 text-sm text-ink transition-colors duration-200 hover:text-accent-dark ${focusRing}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-start justify-between border-t border-line pt-4">
            <ProductLoginMenu dict={dict} mobile />
            {langSwitch}
          </div>
          <OrderButton t={dict.order} onClick={close} className={`mt-4 flex items-center justify-center gap-2 rounded-control bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent-dark ${focusRing}`} />
        </div>
      )}
    </header>
  );
}
