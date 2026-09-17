// Woordmerk vanaf de SVG-masters in public/brand/ (besluit logo-woordmerk v2, 17 september 2026):
// "LIVO" Montserrat 800 navy met lime punt, "APPS" Montserrat 600 eronder (lettertype gemeten op het origineel). Paden, geen font.
// Verhouding 2650:1410. Minimale breedte 96 px. De oude masters staan als livo-mark-v3.svg (bewaard).
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
      width="2650"
      height="1410"
      className={className}
    />
  );
}
