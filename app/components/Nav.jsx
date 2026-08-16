'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { BOOKINGS_URL, bookingLinkProps } from '../booking';
import Logo from './Logo';

// Visible keyboard focus, flat (outline, not a shadow/ring)
const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded';

const languages = [
  ['en', 'EN'],
  ['nl', 'NL'],
];

export default function Nav({ lang, dict }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname() || `/${lang}`;

  // Same page, other locale: swap the leading /<lang> segment.
  const switchPath = (locale) =>
    `/${locale}${pathname.replace(new RegExp(`^/${lang}(?=/|$)`), '')}`;

  const close = () => setIsMenuOpen(false);

  const navItems = [
    { label: dict.products, href: `/${lang}/ppwr` },
    { label: dict.solutions, href: `/${lang}#solutions` },
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
            className={`px-2.5 py-1 transition-colors duration-200 ${focusRing} ${
              active ? 'bg-navy text-white' : 'text-sub hover:text-ink'
            }`}
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
        <Link href={`/${lang}`} aria-label="Livo Apps — home" className={`flex items-center gap-2 ${focusRing}`}>
          <Logo />
          <span className="text-lg font-display font-bold tracking-wider text-ink">LIVO APPS</span>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className={`text-sm text-ink transition-colors duration-200 hover:text-accent-dark ${focusRing}`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right cluster */}
        <div className="hidden items-center gap-4 md:flex">
          {langSwitch}
          <Link href={`/${lang}/login`} className={`text-sm text-ink transition-colors duration-200 hover:text-accent-dark ${focusRing}`}>
            {dict.login}
          </Link>
          <a href={BOOKINGS_URL} {...bookingLinkProps} className={`rounded-md bg-accent px-5 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent-dark ${focusRing}`}>
            {dict.bookDemo}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className={`text-ink md:hidden ${focusRing}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-line bg-white px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} onClick={close} className={`block py-2 text-sm text-ink transition-colors duration-200 hover:text-accent-dark ${focusRing}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
            <Link href={`/${lang}/login`} onClick={close} className={`text-sm text-ink transition-colors duration-200 hover:text-accent-dark ${focusRing}`}>
              {dict.login}
            </Link>
            {langSwitch}
          </div>
          <a href={BOOKINGS_URL} {...bookingLinkProps} onClick={close} className={`mt-4 block rounded-md bg-accent px-5 py-2.5 text-center text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent-dark ${focusRing}`}>
            {dict.bookDemo}
          </a>
        </div>
      )}
    </header>
  );
}
