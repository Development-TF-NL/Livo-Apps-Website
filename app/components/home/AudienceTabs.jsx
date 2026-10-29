'use client';

import { useState } from 'react';
import { Check, Info, LayoutGrid, Package, ShieldCheck } from 'lucide-react';

// Drie doelgroepen als tabs (concept 29 oktober 2026): importeurs, groothandels, eigen merken. Geen functieclaims per rol;
// de notitie eronder zegt dat de wettelijke verplichtingen van rol, verpakking en markt afhangen.
const icons = [Package, LayoutGrid, ShieldCheck];

export default function AudienceTabs({ t }) {
  const [i, setI] = useState(0);
  const a = t.tabs[i]; const Icon = icons[i];
  const onKey = (e, k) => {
    let n; if (e.key === 'ArrowRight') n = (k + 1) % 3; if (e.key === 'ArrowLeft') n = (k + 2) % 3; if (e.key === 'Home') n = 0; if (e.key === 'End') n = 2;
    if (n !== undefined) { e.preventDefault(); setI(n); document.getElementById(`audience-${n}`)?.focus(); }
  };
  return (
    <div>
      <div role="tablist" className="flex gap-1 border-b border-frame-line/60">
        {t.tabs.map((tab, k) => (
          <button key={tab.tab} id={`audience-${k}`} role="tab" aria-selected={k === i} aria-controls="audience-panel" tabIndex={k === i ? 0 : -1} onClick={() => setI(k)} onKeyDown={(e) => onKey(e, k)}
            className={`relative flex-1 whitespace-nowrap px-2 py-3 text-[11px] font-medium focus-ring md:px-3.5 md:text-xs ${k === i ? 'text-ink after:absolute after:-bottom-px after:left-2 after:right-2 after:h-[3px] after:rounded-sm after:bg-accent-dark md:after:left-3.5 md:after:right-3.5' : 'text-sub'}`}>{tab.tab}</button>
        ))}
      </div>
      <div id="audience-panel" role="tabpanel" aria-labelledby={`audience-${i}`} key={i} className="min-h-[244px] animate-[panel-in_.3s_ease] px-1 pb-6 pt-7 md:min-h-[238px] md:px-3">
        <Icon size={27} strokeWidth={1.6} aria-hidden="true" className="mb-3.5 text-accent-dark" />
        <h3 className="max-w-[330px] font-display text-[25px] font-bold leading-[1.22] tracking-heading text-ink md:text-[22px] lg:text-[25px]">{a.title}</h3>
        <p className="mt-4 text-[13px] leading-[1.85] text-sub">{a.body}</p>
        <span className="mt-5 flex items-center gap-2 text-[10px] text-green-text"><Check size={14} strokeWidth={1.6} aria-hidden="true" />{a.scenario}</span>
      </div>
      <p className="flex items-start gap-2 border-t border-line px-1 pt-4 text-[10px] leading-[1.7] text-sub md:px-3"><Info size={14} strokeWidth={1.6} aria-hidden="true" className="mt-0.5 flex-none" />{t.note}</p>
    </div>
  );
}
