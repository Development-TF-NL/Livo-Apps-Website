import { NextResponse } from 'next/server';
import { i18n } from './app/i18n-config';

// De standaardtaal komt uit i18n-config (voorlopig Nederlands, 1 oktober 2026). De browsertaal
// (Accept-Language) wordt bewust genegeerd. De site bewaart geen taalkeuze (geen cookie, geen opslag):
// wie zelf EN kiest, blijft op EN doordat elke interne link de taal in het pad draagt.
function getLocale() {
  return i18n.defaultLocale;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return;

  // Geen taal in het pad: door naar de standaardtaal ("/" wordt "/nl", "/ppwr" wordt "/nl/ppwr").
  // Paden die met /en of /nl beginnen blijven ongemoeid, dus bestaande links naar /en blijven Engels.
  const locale = getLocale();
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and anything with a file extension (static assets).
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
