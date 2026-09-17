// Woordmerk vanaf de SVG-masters in public/brand/ (besluit logo-woordmerk, 17 september 2026):
// "LIVO" Satoshi 800 navy met lime punt, "APPS" eronder. Tekst is naar paden omgezet; geen fontafhankelijkheid.
// Verhouding 2552:1404. Minimale breedte 96 px. De oude masters staan als livo-mark-v3.svg (bewaard).
const SOURCES = {
  default: '/brand/livo-wordmark.svg', // navy op licht
  inverse: '/brand/livo-wordmark-inverse.svg', // wit op navy
  mono: '/brand/livo-wordmark-mono-navy.svg',
  ppwr: '/brand/livo-ppwr.svg',
};

export default function Logo({ variant = 'default', className = 'h-9 w-auto' }) {
  return (
    <img
      src={SOURCES[variant] ?? SOURCES.default}
      alt="LIVO APPS"
      width="2552"
      height="1404"
      className={className}
    />
  );
}
