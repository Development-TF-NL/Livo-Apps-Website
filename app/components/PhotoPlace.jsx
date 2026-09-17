// Fotoplek (huisstijl v2, besluit 4 en de uitzondering van 17 sep). Met `src` een beeld uit de tussentijdse set
// (randaccent, decoratief, lege alt). Zonder beeld verdwijnt de plek uit de lay-out: op productie wordt er niets
// gerenderd (geen lege ruimte, geen gestreept vlak). Alleen in ontwikkelmodus is de ingetekende plek met opschrift
// zichtbaar, gemarkeerd met data-placeholder zodat de woordtoets hem vangt. Nooit achter tekst, één per sectie.
const DEV = process.env.NODE_ENV !== 'production';

export default function PhotoPlace({ label, src, className = '', imgClassName = '' }) {
  if (src) {
    return <img src={src} alt="" aria-hidden="true" className={`pointer-events-none select-none ${imgClassName}`} />;
  }
  if (!DEV) return null;
  return (
    <div
      aria-hidden="true"
      data-placeholder="photo"
      className={`flex items-center justify-center rounded-card border-2 border-dashed border-[#C9D3DA] p-4 text-center text-xs text-sub ${className}`}
      style={{ backgroundImage: 'repeating-linear-gradient(135deg,#F7F9FA 0 10px,#FFFFFF 10px 20px)' }}
    >
      {label}
    </div>
  );
}
