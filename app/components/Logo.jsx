// Woordmerk vanaf de SVG-masters in public/brand/ (besluit logo-woordmerk v3, 17 september 2026):
// "LIVO" gevectoriseerd en geregulariseerd uit het ontwerp van de eigenaar (navy, lime punt), "APPS" uit Nunito Sans 700 eronder. Paden, geen font.
// Verhouding 3600:1855. Minimale breedte 96 px. De oude masters staan als livo-mark-v3.svg (bewaard).
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
      width="3600"
      height="1855"
      className={className}
    />
  );
}
