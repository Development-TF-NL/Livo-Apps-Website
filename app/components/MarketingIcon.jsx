// De twaalf marketingiconen v2 (overdrachtspakket 29 oktober 2026, iconen-v2/svg; de bronbestanden staan ongewijzigd in
// public/brand/icons/). Inline SVG, geen dependency; de lijnen in navy (currentColor via text-ink), één lime accent
// (stroke-accent of fill-accent) en een mintvlak (fill-mint) uit de tokens. Decoratief bij tekst: altijd aria-hidden,
// de zichtbare tekst draagt de betekenis. Bedoeld voor 48 tot 64 px op de homepage en de productpagina; voor kleine
// interface-acties blijven de Lucide-iconen. Namen: klantvraag, excel-import, open-punten, leveranciersuitvraag,
// beoordelen, klantbestand, bewijsstukken, verpakkingsregister, verplichtingen, zelf-starten, hulp-bij-start, markten.
const LIME = 'stroke-accent';
const ICONS = {
  klantvraag: (
    <>
      <path d="M14 17h27a8 8 0 0 1 8 8v8a8 8 0 0 1-8 8H27l-9 7v-7h-4a8 8 0 0 1-8-8v-8a8 8 0 0 1 8-8Z" />
      <path d="M17 28h18M17 34h11" />
      <circle cx="46" cy="17" r="7" className="fill-accent" stroke="none" />
      <path d="M46 14v4m0 3h.01" strokeWidth="2.4" />
    </>
  ),
  'excel-import': (
    <>
      <rect x="9" y="13" width="31" height="38" rx="5" />
      <path d="M9 24h31M20 24v27M9 36h22" />
      <path d="M40 32h13m-5-5 5 5-5 5" className={LIME} strokeWidth="3.4" />
    </>
  ),
  'open-punten': (
    <>
      <rect x="9" y="13" width="33" height="38" rx="6" />
      <path d="M18 24h16M18 33h13M18 42h9" />
      <circle cx="44" cy="42" r="9" className="fill-mint" />
      <path d="M44 38v5m0 4h.01" className={LIME} strokeWidth="3.4" />
    </>
  ),
  leveranciersuitvraag: (
    <>
      <path d="M11 18h28v25H11z" />
      <path d="m11 20 14 11 14-11" />
      <path d="M36 47h16m-6-6 6 6-6 6" className={LIME} strokeWidth="3.4" />
    </>
  ),
  beoordelen: (
    <>
      <rect x="10" y="11" width="31" height="39" rx="5" />
      <path d="m17 23 3 3 5-6M29 24h6M17 35h15" />
      <circle cx="43" cy="43" r="9" className="fill-mint" />
      <path d="m39 43 3 3 6-7" className={LIME} strokeWidth="3.4" />
    </>
  ),
  klantbestand: (
    <>
      <path d="M12 12h25l8 8v31H12z" />
      <path d="M37 12v9h8M19 28h18M19 35h12" />
      <path d="M37 43h16m-6-6 6 6-6 6" className={LIME} strokeWidth="3.4" />
    </>
  ),
  bewijsstukken: (
    <>
      <path d="M14 10h26l8 8v32H14z" />
      <path d="M40 10v9h8M21 28h18M21 35h13" />
      <path d="m25 44 4 4 8-9" className={LIME} strokeWidth="3.4" />
    </>
  ),
  verpakkingsregister: (
    <>
      <path d="m13 23 18-10 18 10-18 10-18-10Z" />
      <path d="M13 23v18l18 10 18-10V23M31 33v18" />
      <path d="m24 17 18 10" className={LIME} strokeWidth="3.4" />
    </>
  ),
  verplichtingen: (
    <>
      <path d="M14 11h28l7 7v33H14z" />
      <path d="M42 11v8h7M21 26h20M21 34h20" />
      <path d="M21 42h20" className={LIME} strokeWidth="3.4" />
    </>
  ),
  'zelf-starten': (
    <>
      <rect x="10" y="18" width="44" height="30" rx="15" />
      <circle cx="38" cy="33" r="10" className="fill-accent" stroke="none" />
      <path d="m34 33 3 3 6-7" strokeWidth="2.7" />
    </>
  ),
  'hulp-bij-start': (
    <>
      <path d="M12 14h40v27H30l-9 9v-9h-9z" />
      <path d="M22 26h19M22 33h11" />
      <path d="M44 26h8m-4-4v8" className={LIME} strokeWidth="3.4" />
    </>
  ),
  markten: (
    <>
      <circle cx="32" cy="32" r="21" />
      <path d="M11 32h42M32 11c-7 7-10 14-10 21s3 14 10 21M32 11c7 7 10 14 10 21s-3 14-10 21" />
      <circle cx="43" cy="20" r="5" className="fill-accent" stroke="none" />
    </>
  ),
};

export const MARKETING_ICON_NAMES = Object.keys(ICONS);

// Het icoon zelf (zonder vlak). size in px.
export function MarketingGlyph({ name, size = 40, className = '' }) {
  const paths = ICONS[name];
  if (!paths) return null;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" focusable="false" className={`text-ink ${className}`} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      {paths}
    </svg>
  );
}

// Het icoon op een mintvlak (radius 16): 64 px met het icoon op 40 px; `size="sm"` geeft 48 px met het icoon op 30 px.
export default function MarketingIcon({ name, size = 'md', className = '' }) {
  const box = size === 'sm' ? 'h-12 w-12' : 'h-16 w-16';
  return (
    <span aria-hidden="true" className={`inline-flex flex-none items-center justify-center rounded-card bg-mint ${box} ${className}`}>
      <MarketingGlyph name={name} size={size === 'sm' ? 30 : 40} />
    </span>
  );
}
