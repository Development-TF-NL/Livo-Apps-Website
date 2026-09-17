'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import ProductLoginMenu from './ProductLoginMenu';

// Header volgens brief §3 en §11 (fase 1, 16 september 2026): Products, Pricing, Resources,
// How LIVO works, About Livo, taalwissel, Log in (menu), Get LIVO PPWR.
// Geen dode links: Pricing en Get LIVO PPWR wijzen naar de prijssectie op de homepage
// zolang /[lang]/pricing achter de poort staat; Resources wijst naar /[lang]/whitepaper
// (beslissing 5: geen /resources-index tot er een tweede resource is).

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy rounded';

const languages = [
  ['en', 'EN'],
  ['nl', 'NL'],
];

export default function Nav({ lang, dict }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname() || `/${lang}`;

  const switchPath = (locale) =>
    `/${locale}${pathname.replace(new RegExp(`^/${lang}(?=/|$)`), '')}`;

  const close = () => setIsMenuOpen(false);

  const navItems = [
    { label: dict.products, href: `/${lang}/ppwr` },
    { label: dict.pricing, href: `/${lang}#pricing` },
    { label: dict.resources, href: `/${lang}/whitepaper` },
    { label: dict.how, href: `/${lang}#how` },
    { label: dict.about, href: `/${lang}#about` },
  ];

  const ctaHref = `/${lang}#pricing`;

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
          <Link href={ctaHref} className={`rounded-control bg-accent px-5 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent-dark ${focusRing}`}>
            {dict.cta}
          </Link>
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
          <Link href={ctaHref} onClick={close} className={`mt-4 block rounded-control bg-accent px-5 py-2.5 text-center text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent-dark ${focusRing}`}>
            {dict.cta}
          </Link>
        </div>
      )}
    </header>
  );
}
