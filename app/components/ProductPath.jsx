import MarketingIcon from './MarketingIcon';
import { StatusDot } from './StatusPill';

// Het productpad (29 oktober 2026, P1): één fictief artikel in vijf rijen, import, open punten, leveranciersvraag,
// beoordeling en klantbestand, in een dun apparaatkader zoals het Register-fragment. Fictieve gegevens uit de copy
// (home.example.path), in de taal van de pagina, zonder tenantlabel en zonder productstatussen. Illustratie: de tekst
// in de stappen ernaast draagt de betekenis; de rijen zelf zijn leesbaar op 360 px (icoon, titel, detail, toestand).
const icons = ['excel-import', 'open-punten', 'leveranciersuitvraag', 'beoordelen', 'klantbestand'];

export default function ProductPath({ t }) {
  return (
    <figure className="min-w-0">
      <div className="overflow-hidden rounded-card border-[1.5px] border-frame bg-white shadow-soft">
        <div className="flex h-7 items-center gap-1.5 border-b border-line bg-frame-bar px-3.5" aria-hidden="true">
          <i className="h-2 w-2 rounded-full bg-frame-dot" /><i className="h-2 w-2 rounded-full bg-frame-dot" /><i className="h-2 w-2 rounded-full bg-frame-dot" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-line px-4 py-2.5">
          <span className="font-display text-base font-bold tracking-wide text-ink">LIVO <span className="text-green-text">PPWR</span></span>
          <span className="text-xs font-medium text-sub">{t.product}</span>
        </div>
        <ol className="divide-y divide-line bg-canvas">
          {t.rows.map((r, i) => (
            <li key={r.title} className="flex items-start gap-3 px-4 py-3">
              <MarketingIcon name={icons[i]} size="sm" className="!bg-white border border-line" />
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                  <span className="font-display text-sm font-bold text-ink"><span className="text-ink-blue">{i + 1}</span> · {r.title}</span>
                  <StatusDot tone={r.tone}>{r.status}</StatusDot>
                </p>
                <p className="mt-0.5 text-xs leading-snug text-sub">{r.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="mt-3 text-right text-xs text-sub">{t.label}</figcaption>
    </figure>
  );
}
