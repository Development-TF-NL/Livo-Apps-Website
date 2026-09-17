import { StatusDot } from './StatusPill';

// UI-fragment van het echte Register (topbalk, tabs, titel, lijst) met fictieve data en alleen bestaande
// statussen; dun apparaatkader zonder glans (website, uitgesproken). Gelabeld als illustratie door de ouder.
export default function RegisterFragment({ t, compact = false }) {
  return (
    <div className="overflow-hidden rounded-[18px] border-[1.5px] border-[#C9D3DA] bg-white shadow-soft">
      <div className="flex h-7 items-center gap-1.5 border-b border-line bg-[#F6F8F9] px-3.5" aria-hidden="true">
        <i className="h-2 w-2 rounded-full bg-[#D5DDE3]" /><i className="h-2 w-2 rounded-full bg-[#D5DDE3]" /><i className="h-2 w-2 rounded-full bg-[#D5DDE3]" />
      </div>
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-display text-base font-bold tracking-wide text-ink">LIVO <span className="text-green-text">PPWR</span></span>
        <span className="text-xs text-sub">{t.tenant}</span>
      </div>
      <div className="flex gap-1 border-b border-line px-3 py-2">
        {t.tabs.map((tab) => (
          <span key={tab} className={`rounded-control px-2.5 py-1.5 text-xs font-medium ${tab === 'Register' ? 'bg-mint font-semibold text-green-text' : 'text-sub'}`}>{tab}</span>
        ))}
      </div>
      <div className="bg-canvas p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-display text-lg font-bold text-ink">{t.title}</span>
          <span className="rounded-control bg-accent px-3 py-1.5 text-xs font-semibold text-ink">{t.action}</span>
        </div>
        <ul className="divide-y divide-line overflow-hidden rounded-card border border-line bg-white">
          {t.rows.map((r) => (
            <li key={r.name} className={`grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 px-3.5 ${compact ? 'py-2.5' : 'py-3'}`}>
              <span className="truncate text-sm text-ink">{r.name}</span>
              <StatusDot tone={r.tone}>{r.status}</StatusDot>
              <span className="text-xs font-medium text-ink-blue">{r.next}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
