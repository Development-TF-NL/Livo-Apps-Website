// Functionele statuskleuren, gedempt (Brand Bible §2A): ok = lime, warn = amber, risk = rood.
const TONES = {
  ok: 'bg-accent text-navy',
  warn: 'bg-[#FEF3C7] text-[#854F0B]',
  risk: 'bg-[#FEE2E2] text-[#991B1B]',
  quiet: 'border border-line bg-canvas text-sub',
};

export default function StatusPill({ tone = 'quiet', children }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${TONES[tone] ?? TONES.quiet}`}>
      {children}
    </span>
  );
}
