import { ArrowRight, Check } from 'lucide-react';
import StatusPill from './StatusPill';

// De vier feature-illustraties van de flyer 2026-09-17 in de v2-tokens: fictieve data, geen productstatussen
// die niet bestaan. Decoratief; de tekst ernaast draagt de betekenis.
const frame = 'relative h-44 overflow-hidden rounded-control bg-canvas p-5';

export function ImportVisual() {
  return (
    <div className={frame} aria-hidden="true">
      <div className="absolute left-[6%] top-6 h-24 w-[34%] rounded-[6px] border border-line bg-white p-3">
        <span className="absolute right-2 top-1.5 text-[9px] font-bold text-green-text">XLSX</span>
        <i className="mt-3 block h-1.5 w-full rounded bg-line" /><i className="mt-2 block h-1.5 w-4/5 rounded bg-line" /><i className="mt-2 block h-1.5 w-11/12 rounded bg-line" />
      </div>
      <ArrowRight size={28} className="absolute left-[46%] top-[74px] -translate-x-1/2 text-ink-blue" />
      <div className="absolute left-[56%] top-5 grid h-28 w-[38%] grid-cols-2 gap-2 rounded-[6px] border border-line bg-white p-3">
        <i className="rounded bg-canvas" /><i className="rounded bg-mint" /><i className="rounded bg-canvas" /><i className="rounded bg-canvas" /><i className="rounded bg-mint" /><i className="rounded bg-canvas" />
      </div>
    </div>
  );
}

export function StatusVisual({ rows }) {
  return (
    <div className={frame} aria-hidden="true">
      <div className="grid h-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 rounded-[8px] border border-line bg-white px-4 py-3">
        {rows.map((r) => (
          <>
            <i key={`${r.status}-l`} className="block h-1.5 rounded bg-canvas" />
            <StatusPill key={`${r.status}-p`} tone={r.tone}>{r.status}</StatusPill>
          </>
        ))}
      </div>
    </div>
  );
}

export function CycleVisual({ t }) {
  return (
    <div className={frame} aria-hidden="true">
      <div className="absolute inset-4">
        <svg viewBox="0 0 100 56" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path d="M25,28a25,18 0 1,1 50,0a25,18 0 1,1 -50,0" fill="none" stroke="#B9C6CE" strokeWidth="1.2" />
          <path d="M-3.2 -2.6 L0 0 L-3.2 2.6" transform="translate(68.5 14.9) rotate(50)" fill="none" stroke="#2F5FB3" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M-3.2 -2.6 L0 0 L-3.2 2.6" transform="translate(31.5 41.1) rotate(230)" fill="none" stroke="#2F5FB3" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-mint px-3 py-1 text-[11px] font-semibold text-green-text">{t.steps[0].title}</span>
        <span className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border border-line bg-white px-3 py-1 text-[11px] font-semibold text-ink">{t.steps[2].title}</span>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-mint px-3 py-1 text-[11px] font-semibold text-green-text">{t.steps[3].title}</span>
        <span className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border border-line bg-white px-3 py-1 text-[11px] font-semibold text-ink">{t.steps[1].title}</span>
        <span className="absolute left-1/2 top-1/2 flex h-12 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[8px] border-[1.5px] border-navy bg-white text-center leading-none">
          <b className="font-display text-[11px] font-bold text-ink">{t.coreTitle}</b><span className="mt-1 text-[9px] text-sub">{t.coreSub}</span>
        </span>
      </div>
    </div>
  );
}

export function FileVisual({ labels }) {
  const [inputs, file, outputs] = labels;
  return (
    <div className={frame} aria-hidden="true">
      <div className="grid h-full grid-cols-[auto_16px_minmax(0,1fr)] items-center gap-1 sm:grid-cols-[auto_20px_minmax(0,1fr)_20px_auto]">
        <div className="flex flex-col gap-1.5">{inputs.map((l) => <span key={l} className="rounded-full border border-line bg-white px-3 py-1 text-center text-[10px] font-semibold text-sub">{l}</span>)}</div>
        <ArrowRight size={16} className="text-ink-blue" />
        <div className="relative rounded-[8px] border-[1.5px] border-navy bg-white p-3">
          <span className="absolute right-2 top-2 rounded-full bg-status-success-bg px-1.5 py-0.5 text-[8px] font-bold text-status-success-text">{file.badge}</span>
          <b className="font-display text-[11px] font-bold text-ink">{file.title}</b>
          {file.rows.map((r) => <span key={r} className="mt-1 flex items-center justify-between text-[9px] text-sub">{r}<Check size={10} className="text-green-text" /></span>)}
        </div>
        <ArrowRight size={16} className="hidden text-ink-blue sm:block" />
        <div className="hidden flex-col gap-1.5 sm:flex">{outputs.map((l) => <span key={l} className="w-24 rounded-[5px] border border-line bg-white p-2 text-[9px] font-bold text-ink"><span className="block">{l}</span><i className="mt-2 block h-1 w-full rounded bg-canvas" /><i className="mt-1 block h-1 w-3/4 rounded bg-canvas" /></span>)}</div>
      </div>
    </div>
  );
}
