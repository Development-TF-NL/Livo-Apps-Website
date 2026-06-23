'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Products', href: '/ppwr' },
  { label: 'Solutions', href: '/#solutions' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'About', href: '/#about' },
];

// Visible keyboard focus, flat (outline, not a shadow/ring)
const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7AC143] rounded';

function LivoMark() {
  return (
    <span className="block w-8 h-8" aria-hidden="true">
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#0B1D33" fontFamily="serif">L</text>
        <path d="M 20 18 Q 25 22 22 28" stroke="#7AC143" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('EN'); // visual only for now

  const langToggle = (
    <div className="flex items-center overflow-hidden rounded-md border border-[#E4E8EA] text-xs font-semibold" role="group" aria-label="Language">
      {['EN', 'NL'].map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2.5 py-1 transition-colors duration-200 ${focusRing} ${
            lang === l ? 'bg-[#0B1D33] text-white' : 'text-[#5B6B72] hover:text-[#0B1D33]'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[#E4E8EA] bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" aria-label="Livo Apps — home" className={`flex items-center gap-2 ${focusRing}`}>
          <LivoMark />
          <span className="text-lg font-bold tracking-wider text-[#0B1D33]">LIVO APPS</span>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className={`text-sm text-[#0B1D33] transition-colors duration-200 hover:text-[#69AD36] ${focusRing}`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right cluster */}
        <div className="hidden items-center gap-4 md:flex">
          {langToggle}
          <Link href="/login" className={`text-sm text-[#0B1D33] transition-colors duration-200 hover:text-[#69AD36] ${focusRing}`}>
            Log in
          </Link>
          <Link href="/#demo" className={`rounded-md bg-[#7AC143] px-5 py-2 text-sm font-semibold text-[#0B1D33] transition-colors duration-200 hover:bg-[#69AD36] ${focusRing}`}>
            Book a Demo
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className={`text-[#0B1D33] md:hidden ${focusRing}`}
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
        <div id="mobile-menu" className="border-t border-[#E4E8EA] bg-white px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 text-sm text-[#0B1D33] transition-colors duration-200 hover:text-[#69AD36] ${focusRing}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-[#E4E8EA] pt-4">
            <Link href="/login" onClick={() => setIsMenuOpen(false)} className={`text-sm text-[#0B1D33] transition-colors duration-200 hover:text-[#69AD36] ${focusRing}`}>
              Log in
            </Link>
            {langToggle}
          </div>
          <Link
            href="/#demo"
            onClick={() => setIsMenuOpen(false)}
            className={`mt-4 block rounded-md bg-[#7AC143] px-5 py-2.5 text-center text-sm font-semibold text-[#0B1D33] transition-colors duration-200 hover:bg-[#69AD36] ${focusRing}`}
          >
            Book a Demo
          </Link>
        </div>
      )}
    </header>
  );
}
