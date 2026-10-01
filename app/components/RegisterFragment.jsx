import { StatusDot } from './StatusPill';

// UI-fragment van het echte Register (topbalk, tabs, titel, lijst) met fictieve data en alleen bestaande
// statussen; dun apparaatkader zonder glans (website, uitgesproken), kleuren uit de tokens frame. Gelabeld als illustratie door de ouder.
// Op smal (1 oktober 2026): een rij loopt over twee regels als naam, status en actie niet naast elkaar passen
// (de naam wordt niet meer afgekapt), en de laatste tab is onder 640 px verborgen in plaats van half zichtbaar.
export default function RegisterFragment({ t, compact = false }) {
  return (
    <div className="overflow-hidden rounded-card border-[1.5px] border-frame bg-white shadow-soft">
      <div className="flex h-7 items-center gap-1.5 border-b border-line bg-frame-bar px-3.5" aria-hidden="true">
        <i className="h-2 w-2 rounded-full bg-frame-dot" /><i className="h-2 w-2 rounded-full bg-frame-dot" /><i className="h-2 w-2 rounded-full bg-frame-dot" />
      </div>
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-display text-base font-bold tracking-wide text-ink">LIVO <span className="text-green-text">PPWR</span></span>
        <span className="text-xs text-sub">{t.tenant}</span>
      </div>
      <div className="flex gap-1 border-b border-line px-3 py-2">
        {t.tabs.map((tab, i) => (
          <span key={tab} className={`whitespace-nowrap rounded-control px-2.5 py-1.5 text-xs font-medium ${tab === 'Register' ? 'bg-mint font-semibold text-green-text' : 'text-sub'} ${i === t.tabs.length - 1 && tab !== 'Register' ? 'hidden sm:inline' : ''}`}>{tab}</span>
        ))}
      </div>
      <div className="bg-canvas p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="whitespace-nowrap font-display text-base font-bold text-ink sm:text-lg">{t.title}</span>
          <span className="whitespace-nowrap rounded-control bg-accent px-3 py-1.5 text-xs font-semibold text-ink">{t.action}</span>
        </div>
        <ul className="divide-y divide-line overflow-hidden rounded-control border border-line bg-white">
          {t.rows.map((r) => (
            <li key={r.name} className={`flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-3.5 ${compact ? 'py-2.5' : 'py-3'}`}>
              <span className="text-sm text-ink">{r.name}</span>
              <span className="flex items-center gap-3">
                <StatusDot tone={r.tone}>{r.status}</StatusDot>
                <span className="whitespace-nowrap text-xs font-medium text-ink-blue">{r.next}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
