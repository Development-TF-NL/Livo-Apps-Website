'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';
import Logo from './Logo';
import ProductLoginMenu from './ProductLoginMenu';
import { ARTICLES, KENNIS_INDEX } from '../content/kennis';

// Kopbalk op het landingspagina-concept (29 oktober 2026): plakkend, papier met vervaging, logo met het label PPWR, de menulinks
// (Hoe het werkt, Voor wie, Prijzen, Kennis, Hulp) met een groene onderstreping bij hover, Inloggen (menu) en de knop naar de
// planselectie (nav.order.cta; besluit eigenaar 29 oktober avond). Prijzen wijst naar de prijspagina zodra de poort open is, anders naar het prijsblok.
const focusRing = 'focus-ring rounded';
const languages = [['nl', 'NL'], ['en', 'EN']];

export default function Nav({ lang, dict, pricingEnabled = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname() || `/${lang}`;
  const switchPath = (locale) => {
    const article = ARTICLES.find((a) => a.path[lang] === pathname);
    if (article) return article.path[locale];
    if (pathname === KENNIS_INDEX[lang]) return KENNIS_INDEX[locale];
    return `/${locale}${pathname.replace(new RegExp(`^/${lang}(?=/|$)`), '')}`;
  };
  const close = () => setIsMenuOpen(false);
  const navItems = [
    { label: dict.how, href: `/${lang}#werkwijze` },
    { label: dict.forWhom, href: `/${lang}#voor-wie` },
    { label: dict.pricing, href: pricingEnabled ? `/${lang}/pricing` : `/${lang}#prijzen` },
    { label: dict.kennis, href: KENNIS_INDEX[lang] },
    { label: dict.help, href: `/${lang}#hulp` },
  ];
  const ctaHref = pricingEnabled ? `/${lang}/pricing#plans` : `/${lang}#prijzen`;
  const cta = 'inline-flex min-h-[36px] items-center gap-2.5 rounded-control bg-accent px-3 text-[10px] font-semibold text-btn-text transition-colors duration-150 hover:bg-accent-hover md:min-h-[41px] md:gap-3 md:px-4 md:text-[11px] lg:min-h-[46px] lg:px-5 lg:text-[13px]';
  const langSwitch = (
    <div className="flex items-center rounded-md border border-line text-xs font-semibold" role="group" aria-label={dict.language}>
      {languages.map(([code, label]) => {
        const active = code === lang;
        return (
          <Link key={code} href={switchPath(code)} hrefLang={code} onClick={close} aria-current={active ? 'true' : undefined}
            className={`relative px-2.5 py-1 transition-colors duration-150 after:absolute after:inset-x-0 after:-inset-y-2.5 ${focusRing} focus-visible:z-10 ${active ? 'bg-navy text-white' : 'text-sub hover:text-ink'}`}>{label}</Link>
        );
      })}
    </div>
  );
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-paper/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-[69px] w-[min(1320px,calc(100%-40px))] items-center justify-between gap-4 md:h-[82px] md:w-[min(1320px,calc(100%-60px))] xl:w-[min(1320px,calc(100%-80px))]">
        <Link href={`/${lang}`} aria-label="LIVO PPWR, home" className={`flex h-11 flex-none items-center gap-4 ${focusRing}`}>
          <Logo className="h-9 w-auto md:h-10" />
          <span className="border-l border-frame-line/70 pl-4 text-[11px] font-semibold tracking-[.08em] text-sub max-md:hidden">PPWR</span>
        </Link>
        <ul className="ml-auto hidden items-center gap-5 lg:flex xl:gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className={`relative inline-flex h-11 items-center text-xs font-medium text-ink transition-colors duration-150 after:absolute after:bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-[width] hover:text-green-text hover:after:w-full ${focusRing}`}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-5 lg:flex">
          {langSwitch}
          <ProductLoginMenu dict={dict} />
          <Link href={ctaHref} className={`${cta} ${focusRing}`}>{dict.order.cta} <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" /></Link>
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          <Link href={ctaHref} onClick={close} className={`${cta} ${focusRing}`}>{dict.order.cta} <ArrowRight size={14} strokeWidth={1.6} aria-hidden="true" /></Link>
          <button type="button" className={`inline-flex h-10 w-9 items-center justify-center text-ink ${focusRing}`} onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen} aria-controls="mobile-menu" aria-label={isMenuOpen ? dict.menuClose : dict.menuOpen}>
            {isMenuOpen ? <X size={22} strokeWidth={1.6} /> : <Menu size={22} strokeWidth={1.6} />}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-line bg-paper px-6 pb-6 pt-3 lg:hidden">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.label}><Link href={item.href} onClick={close} className={`flex min-h-[44px] items-center text-[15px] text-ink hover:text-green-text ${focusRing}`}>{item.label}</Link></li>
            ))}
          </ul>
          <div className="mt-3 flex items-start justify-between border-t border-line pt-4">
            <ProductLoginMenu dict={dict} mobile />
            {langSwitch}
          </div>
        </div>
      )}
    </header>
  );
}
