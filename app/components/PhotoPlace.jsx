// Fotoplek (huisstijl v2, besluit 4 en de uitzondering van 17 sep): een ingetekende lege plek met opschrift
// zolang er geen beeld is; met `src` een gegenereerd beeld uit de tussentijdse set (randaccent, decoratief,
// lege alt). Nooit achter tekst, één per sectie.
export default function PhotoPlace({ label, src, className = '', imgClassName = '' }) {
  if (src) {
    return <img src={src} alt="" aria-hidden="true" className={`pointer-events-none select-none ${imgClassName}`} />;
  }
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center rounded-card border-2 border-dashed border-[#C9D3DA] p-4 text-center text-xs text-sub ${className}`}
      style={{ backgroundImage: 'repeating-linear-gradient(135deg,#F7F9FA 0 10px,#FFFFFF 10px 20px)' }}
    >
      {label}
    </div>
  );
}
