// Beeldmerk vanaf de SVG-master in public/brand/ (besluit-logo-svg-master-v1):
// alle afgeleiden komen uit die vector, nooit uit elkaar. Master-verhouding 956:816.
const SOURCES = {
  default: '/brand/livo-mark.svg', // navy op licht
  inverse: '/brand/livo-mark-inverse.svg', // wit op donker
};

export default function Logo({ variant = 'default', className = 'h-8 w-auto' }) {
  return (
    <img
      src={SOURCES[variant] ?? SOURCES.default}
      alt=""
      aria-hidden="true"
      width="38"
      height="32"
      className={className}
    />
  );
}
