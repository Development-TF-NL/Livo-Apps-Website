'use client';

import { useState } from 'react';
import { ArrowRight, Download, FileText, Info, LayoutGrid, Package, ShieldCheck, Users } from 'lucide-react';

// De interactieve werkwijze van het concept (29 oktober 2026): drie stappen als tabs naast een productvenster met fictieve
// gegevens (VH-2001). Stap 1 toont het artikel met open punten, stap 2 de leveranciersuitvraag met een voorbeeldreactie,
// stap 3 het klantbestand met de download van een fictief CSV-bestand. Alle tekst uit de dictionary (home.workflow).
const pill = { amber: 'bg-status-warning-bg text-status-warning-text', green: 'bg-status-success-bg text-status-success-text', gray: 'bg-status-info-bg text-status-info-text' };
const Pill = ({ tone = 'gray', dot = false, children, className = '' }) => (
  <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-[4px] px-1.5 py-[3px] text-[8px] font-medium leading-normal md:text-[9px] ${pill[tone]} ${className}`}>{dot && <i aria-hidden="true" className="h-[5px] w-[5px] rounded-full bg-current" />}{children}</span>
);
const icon = { size: 13, strokeWidth: 1.6, 'aria-hidden': true };

function Table({ t, filled }) {
  const tones = ['green', 'amber', 'gray'];
  return (
    <table className="mt-2.5 w-full border-collapse text-[9px] leading-[1.7] md:text-[10px]">
      <thead><tr>{t.head.map((h) => <th key={h} className="whitespace-nowrap border-b border-line px-1 py-1.5 text-left text-[7px] font-semibold uppercase tracking-[.06em] text-sub">{h}</th>)}</tr></thead>
      <tbody>
        {t.rows.map((r, i) => (
          <tr key={r[0]}>
            <td className="border-b border-line px-1 py-2.5 font-medium">{r[0]}</td>
            <td className="border-b border-line px-1 py-2.5">{r[1]}</td>
            <td className="border-b border-line px-1 py-2.5">{i === 2 ? (filled ? t.filled : <span className="text-[8px] text-amber">{r[2]}</span>) : r[2]}</td>
            <td className="border-b border-line px-1 py-2.5"><Pill tone={tones[i]}>{r[3]}</Pill></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const Alert = ({ icon: I = Info, label, text }) => (
  <div className="mt-4 flex items-start gap-2 rounded-[5px] border border-status-warning-bg bg-[color:var(--status-warning-bg)]/60 px-2.5 py-2 text-[8px] leading-[1.8] text-status-warning-text md:text-[9px]">
    <I size={13} strokeWidth={1.6} aria-hidden="true" className="mt-0.5 flex-none" /><span>{label && <strong className="font-semibold">{label} </strong>}{text}</span>
  </div>
);
const Mini = ({ children, onClick, icon: I = ArrowRight }) => (
  <button type="button" onClick={onClick} className="mt-3 inline-flex items-center gap-2 rounded-[4px] bg-mint px-2.5 py-2 text-[9px] font-semibold text-green-text hover:bg-status-success-bg focus-ring md:text-[10px]">{children} <I {...icon} /></button>
);

function downloadCsv(t) {
  const rows = t.table.rows.map((r, i) => [t.product.title.split(' · ')[0], r[0], r[1], i === 2 ? t.table.filled.replace(/\D/g, '') : r[2].replace(/\D/g, ''), r[3]].join(';'));
  const csv = `﻿${t.footer};\r\n${t.table.head.join(';')}\r\n${rows.join('\r\n')}\r\n`;
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  const a = document.createElement('a'); a.href = url; a.download = 'LIVO_fictief_klantbestand_VH-2001.csv'; document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function WorkflowDemo({ t }) {
  const [step, setStep] = useState(0);
  const [reply, setReply] = useState(false);
  const w = t.window; const p = w.panels[step];
  const go = (n) => { setStep(n); setReply(false); };
  const onKey = (e, i) => {
    let n; if (['ArrowDown', 'ArrowRight'].includes(e.key)) n = (i + 1) % 3; if (['ArrowUp', 'ArrowLeft'].includes(e.key)) n = (i + 2) % 3; if (e.key === 'Home') n = 0; if (e.key === 'End') n = 2;
    if (n !== undefined) { e.preventDefault(); go(n); document.getElementById(`step-${n}`)?.focus(); }
  };
  const product = <div className="mt-3.5 flex items-center gap-2.5 border-b border-line py-3.5"><Package size={24} strokeWidth={1.6} aria-hidden="true" className="text-accent-dark" /><div><strong className="block text-[10px] font-semibold md:text-xs">{w.product.title}</strong><small className="text-[8px] text-sub md:text-[9px]">{w.product.sub}</small></div></div>;
  return (
    <div className="grid items-center gap-6 lg:grid-cols-[.72fr_1fr] lg:gap-16">
      <div role="tablist" aria-orientation="vertical" className="grid gap-2 max-lg:grid-cols-3 max-lg:gap-5 max-sm:gap-2">
        {t.steps.map((s, i) => {
          const active = i === step;
          return (
            <button key={s.title} id={`step-${i}`} role="tab" aria-selected={active} aria-controls="workflow-panel" tabIndex={active ? 0 : -1} onClick={() => go(i)} onKeyDown={(e) => onKey(e, i)}
              className={`group flex items-start gap-4 border-b border-on-dark/15 py-6 pr-4 text-left transition-opacity focus-ring max-lg:block max-lg:border-b-2 max-lg:pb-5 max-lg:pt-2.5 ${active ? 'opacity-100 max-lg:border-on-dark-accent' : 'opacity-65 hover:opacity-100'}`}>
              <span className={`relative text-[11px] leading-[2.3] tracking-[.06em] max-lg:mb-2 max-lg:block max-lg:leading-normal ${active ? 'text-on-dark-accent lg:before:absolute lg:before:-left-3 lg:before:top-2 lg:before:h-[13px] lg:before:w-[3px] lg:before:rounded-sm lg:before:bg-accent' : 'text-on-dark-sub'}`}>{String(i + 1).padStart(2, '0')}</span>
              <span className="flex-1">
                <strong className={`block font-display text-sm font-bold leading-[1.3] tracking-[-.025em] md:text-[17px] lg:text-[22px] ${active ? 'text-on-dark-accent' : 'text-white'}`}>{s.title}</strong>
                <span className="mt-2 block max-w-[285px] text-xs leading-[1.8] text-on-dark-sub max-sm:hidden">{s.body}</span>
              </span>
              <ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" className={`mt-1 transition-transform max-lg:hidden ${active ? 'translate-x-1 text-on-dark-accent' : '-translate-x-1'}`} />
            </button>
          );
        })}
      </div>
      <div className="mx-auto w-full min-w-0 max-w-[690px] overflow-hidden rounded-card border border-white/15 bg-white text-ink shadow-deep lg:max-w-none">
        <div className="relative flex h-[35px] items-center justify-center gap-4 border-b border-line bg-frame-bar px-3 text-[8px] text-sub max-sm:justify-start max-sm:pl-12">
          <span aria-hidden="true" className="absolute left-3 flex gap-1"><i className="h-[5px] w-[5px] rounded-full bg-frame-dot" /><i className="h-[5px] w-[5px] rounded-full bg-frame-dot" /><i className="h-[5px] w-[5px] rounded-full bg-frame-dot" /></span>
          <span>{w.bar}</span>
          <span className="absolute right-3 flex items-center gap-1 text-green-text"><i aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" /> {w.live}</span>
        </div>
        <div className="flex min-h-[344px]">
          <aside aria-hidden="true" className="flex w-9 flex-none flex-col items-center gap-6 border-r border-line bg-paper px-2 pt-4 text-sub md:w-12 md:px-2.5">
            <span className="font-display text-lg leading-none text-ink md:text-[21px]">L<span className="text-accent">•</span></span>
            <LayoutGrid size={16} strokeWidth={1.6} /><span className="rounded-sm bg-mint p-1.5 text-green-text"><Package size={16} strokeWidth={1.6} /></span><Users size={16} strokeWidth={1.6} /><FileText size={16} strokeWidth={1.6} />
          </aside>
          <div id="workflow-panel" role="tabpanel" aria-labelledby={`step-${step}`} tabIndex={0} key={step} className="min-w-0 flex-1 animate-[panel-in_.3s_ease] px-3 pb-5 pt-5 md:px-6 md:pt-6 lg:px-6">
            <div className="flex gap-2 text-[8px] text-sub md:text-[10px]">{p.crumb[0]} <span>/</span> {p.crumb[1]}</div>
            <div className="mt-3 flex items-center justify-between gap-2.5"><h3 className="font-display text-lg font-bold tracking-[-.03em] md:text-[20px] lg:text-[20px]">{p.title}</h3><Pill tone={step === 0 ? 'amber' : 'green'} dot={step === 0}>{p.pill}</Pill></div>
            <p className="mt-1.5 text-[9px] text-sub md:text-[10px]">{p.sub}</p>
            {step === 0 && <>{product}<Table t={w.table} /><Alert label={p.alertLabel} text={p.alert} /><Mini onClick={() => go(1)}>{p.action}</Mini></>}
            {step === 1 && (
              <>
                <div className="mt-4 rounded-control border border-frame p-3">
                  <header className="flex items-center gap-2 border-b border-line pb-2.5"><span className="grid h-[26px] w-[26px] place-items-center rounded-full bg-mint text-[9px] font-semibold text-green-text">{p.supplier.initials}</span><div><strong className="block text-[10px] md:text-[11px]">{p.supplier.name}</strong><small className="text-[8px] text-sub md:text-[9px]">{p.supplier.sub}</small></div><Pill className="ml-auto">{p.supplier.pill}</Pill></header>
                  <div className="pt-3 text-[9px] leading-[1.8] md:text-[11px]">{p.supplier.intro}{p.supplier.items.map((it) => <strong key={it} className="block">{it}</strong>)}<span className="mt-1.5 block text-[8px] text-sub md:text-[9px]">{p.supplier.note}</span></div>
                  {reply && <><div className="mt-3.5 flex items-center justify-between gap-2 rounded-[4px] bg-mint px-2.5 py-2 text-[9px]"><span>{p.reply.label}</span><strong className="text-[13px] text-green-text">{p.reply.value}</strong><Pill tone="amber">{p.reply.pill}</Pill></div><p className="mt-1.5 text-[9px] text-sub">{p.reply.note}</p></>}
                </div>
                <Mini onClick={() => setReply((v) => !v)}>{reply ? p.reply.hide : p.reply.show}</Mini>
                <Alert icon={ShieldCheck} text={p.alert} />
              </>
            )}
            {step === 2 && (
              <>
                <div className="mt-4 flex items-center gap-2.5 rounded-control bg-mint p-3"><FileText size={28} strokeWidth={1.6} aria-hidden="true" className="text-accent-dark" /><div><strong className="block text-[10px]">{p.export.title}</strong><small className="text-[8px] text-sub">{p.export.sub}</small></div><Pill tone="amber" className="ml-auto">{p.export.pill}</Pill></div>
                <Table t={w.table} filled />
                <Alert label={p.alertLabel} text={p.alert} />
                <Mini onClick={() => downloadCsv(w)} icon={Download}>{p.action}</Mini>
              </>
            )}
          </div>
        </div>
        <div className="flex h-[46px] items-center justify-between gap-2.5 border-t border-line px-3 text-[8px] text-sub md:px-5">
          <span>{w.footer}</span>
          <button type="button" onClick={() => go((step + 1) % 3)} className="flex items-center gap-2 py-2 text-[9px] font-semibold text-green-text focus-ring">{step === 2 ? w.again : w.next} <ArrowRight {...icon} /></button>
        </div>
      </div>
    </div>
  );
}
