import { NextResponse } from 'next/server';
import { i18n } from './app/i18n-config';

// For now the default locale is always English (no Accept-Language sniffing yet).
function getLocale() {
  return i18n.defaultLocale;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return;

  // No locale in the path → redirect to the default one ("/" → "/en").
  const locale = getLocale();
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and anything with a file extension (static assets).
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
