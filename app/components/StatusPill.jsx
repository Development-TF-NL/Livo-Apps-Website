// Statuspil op de v2-tokens (tekst, vlak, punt); tekst plus kleur, nooit kleur alleen.
const TONES = {
  success: 'bg-status-success-bg text-status-success-text',
  warning: 'bg-status-warning-bg text-status-warning-text',
  risk: 'bg-status-risk-bg text-status-risk-text',
  info: 'bg-status-info-bg text-status-info-text',
  ok: 'bg-status-success-bg text-status-success-text',
  quiet: 'border border-line bg-canvas text-sub',
};
const DOTS = { success: 'bg-status-success-dot', warning: 'bg-status-warning-dot', risk: 'bg-status-risk-dot', info: 'bg-status-info-dot', ok: 'bg-status-success-dot', quiet: 'bg-sub' };

export default function StatusPill({ tone = 'quiet', children, dot = true }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${TONES[tone] ?? TONES.quiet}`}>
      {dot && <i aria-hidden="true" className={`inline-block h-2 w-2 rounded-full ${DOTS[tone] ?? DOTS.quiet}`} />}
      {children}
    </span>
  );
}

// Punt plus tekst zonder vlak (voor rijen in UI-fragmenten).
export function StatusDot({ tone = 'info', children }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
      <i aria-hidden="true" className={`inline-block h-2.5 w-2.5 rounded-full ${DOTS[tone] ?? DOTS.quiet}`} />
      {children}
    </span>
  );
}
