'use client';

import { useState } from 'react';
import { ArrowRight, Check, Download, FileText, Info, Send } from 'lucide-react';
import StatusPill from '../StatusPill';

// De werkwijze als interactief productvenster (concept 29 oktober 2026; correctie eigenaar: de echte app-interface). Het venster
// volgt de app: witte topbalk met het beeldmerk en "LIVO PPWR", de hoofdnavigatie Overview · Obligations | Register · Suppliers |
// Passports met de mint actieve tab, canvas als achtergrond, witte kaarten, statuspillen met de statussen die in het product bestaan
// (Ready, Needs data, Missing, Open). De app is Engelstalig; het venster is dat in beide talen. Fictieve gegevens (VH-2001).
// Drie stappen: Register (open punten), Suppliers (uitvraag en voorgestelde gegevens ter beoordeling), Passports (afgerond dossier, export).
const ic = { size: 14, strokeWidth: 1.6, 'aria-hidden': true };
const Btn = ({ children, onClick, icon: I = ArrowRight, primary = false }) => (
  <button type="button" onClick={onClick} className={`mt-3 inline-flex min-h-[32px] items-center gap-2 rounded-control px-3 text-[11px] font-medium focus-ring ${primary ? 'bg-accent text-btn-text hover:bg-accent-hover' : 'border border-line bg-white text-ink hover:bg-canvas'}`}>{children} <I {...ic} /></button>
);
const Notice = ({ text, icon: I = Info }) => (
  <p className="mt-4 flex items-start gap-2 rounded-control border border-line bg-canvas px-3 py-2 text-[11px] leading-[1.7] text-sub"><I {...ic} className="mt-0.5 flex-none text-accent-dark" />{text}</p>
);
const Row = ({ label, children }) => <div className="flex items-center justify-between gap-3 border-b border-line py-2 text-xs last:border-b-0"><span className="text-ink">{label}</span>{children}</div>;

function downloadCsv(w) {
  const rows = w.panels[0].table.rows.map((r) => [w.product.code, r[0], r[1], r[2] === 'Missing' ? w.panels[1].reply.value : r[2], r[3]].join(';'));
  const csv = `﻿${w.footer};\r\n${w.panels[0].table.head.join(';')}\r\n${rows.join('\r\n')}\r\n`;
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  const a = document.createElement('a'); a.href = url; a.download = 'LIVO_example_customer_file_VH-2001.csv'; document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function WorkflowDemo({ t }) {
  const [step, setStep] = useState(0);
  const [reply, setReply] = useState(false);
  const [approved, setApproved] = useState(false);
  const w = t.window; const p = w.panels[step];
  const go = (n) => { setStep(n); setReply(false); setApproved(false); };
  const onKey = (e, i) => {
    let n; if (['ArrowDown', 'ArrowRight'].includes(e.key)) n = (i + 1) % 3; if (['ArrowUp', 'ArrowLeft'].includes(e.key)) n = (i + 2) % 3; if (e.key === 'Home') n = 0; if (e.key === 'End') n = 2;
    if (n !== undefined) { e.preventDefault(); go(n); document.getElementById(`step-${n}`)?.focus(); }
  };
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

      {/* Het venster: adresbalk, dan de app-shell zoals in het product */}
      <div className="mx-auto w-full min-w-0 max-w-[690px] overflow-hidden rounded-card border border-white/15 bg-canvas text-ink shadow-deep lg:max-w-none">
        <div className="relative flex h-[32px] items-center justify-center border-b border-line bg-frame-bar px-3 text-[10px] text-sub">
          <span aria-hidden="true" className="absolute left-3 flex gap-1"><i className="h-[6px] w-[6px] rounded-full bg-frame-dot" /><i className="h-[6px] w-[6px] rounded-full bg-frame-dot" /><i className="h-[6px] w-[6px] rounded-full bg-frame-dot" /></span>
          <span className="rounded-[4px] bg-white px-3 py-0.5">{w.bar}</span>
        </div>
        <header className="border-b border-line bg-white px-4 pt-3 md:px-5">
          <div className="flex items-center gap-2 pb-2.5">
            <img src="/brand/livo-mark.svg" alt="" aria-hidden="true" className="h-5 w-auto md:h-6" />
            <span className="font-display text-sm font-bold text-ink md:text-base">LIVO <span className="text-green-text">PPWR</span></span>
            <span className="ml-auto rounded-control border border-line px-2 py-0.5 text-[10px] text-sub">{w.product.meta.split(' · ')[1]}</span>
          </div>
          <nav aria-hidden="true" className="flex flex-wrap items-center gap-1 pb-2">
            {w.nav.map((label, i) => (
              <span key={label} className="flex items-center">
                {(i === 2 || i === 4) && <span className="mx-1.5 h-[14px] w-px bg-line" />}
                <span className={`rounded-control px-2 py-1 text-[11px] md:px-2.5 md:text-xs ${i === w.active[step] ? 'bg-mint font-semibold text-green-text' : 'text-sub'}`}>{label}</span>
              </span>
            ))}
          </nav>
        </header>
        <div id="workflow-panel" role="tabpanel" aria-labelledby={`step-${step}`} tabIndex={0} key={step} className="min-h-[330px] animate-[panel-in_.3s_ease] p-3 md:p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-lg font-medium tracking-[-.02em] text-ink md:text-xl">{p.title}</h3>
            <span className="text-[11px] text-sub">{p.meta}</span>
          </div>
          <div className="mt-3 rounded-card border border-line bg-white p-3 md:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
              <div><span className="block text-[10px] uppercase tracking-[.08em] text-sub">{w.product.code}</span><strong className="block text-sm font-medium">{w.product.name}</strong></div>
              <StatusPill tone={step === 2 && approved ? 'success' : p.tone}>{p.pill}</StatusPill>
            </div>
            <p className="mt-2.5 text-[11px] text-sub">{p.sub}</p>

            {step === 0 && (
              <>
                <table className="mt-2 w-full border-collapse text-[11px] md:text-xs">
                  <thead><tr>{p.table.head.map((h) => <th key={h} className="border-b border-line py-1.5 pr-2 text-left text-[10px] font-medium uppercase tracking-wide text-sub">{h}</th>)}</tr></thead>
                  <tbody>{p.table.rows.map((r) => (
                    <tr key={r[0]}><td className="border-b border-line py-2 pr-2 font-medium">{r[0]}</td><td className="border-b border-line py-2 pr-2">{r[1]}</td><td className={`border-b border-line py-2 pr-2 ${r[2] === 'Missing' ? 'text-amber' : ''}`}>{r[2]}</td><td className="border-b border-line py-2"><StatusPill tone={r[4]}>{r[3]}</StatusPill></td></tr>
                  ))}</tbody>
                </table>
                <Notice text={p.alert} />
                <Btn onClick={() => go(1)} icon={Send} primary>{p.action}</Btn>
              </>
            )}
            {step === 1 && (
              <>
                <div className="mt-3 rounded-control border border-line p-3">
                  <div className="flex items-center justify-between gap-2"><strong className="text-xs font-medium">{p.request.supplier}</strong><span className="text-[10px] text-sub">{p.request.label}</span></div>
                  {p.request.items.map((it) => <Row key={it} label={it}><StatusPill tone="warning">Needs data</StatusPill></Row>)}
                  <p className="mt-2 text-[10px] text-sub">{p.request.note}</p>
                </div>
                {reply && (
                  <div className="mt-3 rounded-control border border-line bg-canvas p-3">
                    <div className="flex items-center justify-between gap-2"><strong className="text-xs font-medium">{p.reply.title}</strong><span className="text-[10px] text-sub">{p.request.supplier}</span></div>
                    <Row label={p.reply.row}><span className="flex items-center gap-2"><strong className="text-sm">{p.reply.value}</strong>{approved ? <StatusPill tone="success">Ready</StatusPill> : <StatusPill tone="info">{p.reply.pill}</StatusPill>}</span></Row>
                    <p className="mt-2 text-[10px] text-sub">{p.reply.note}</p>
                    {!approved && <Btn onClick={() => setApproved(true)} icon={Check} primary>{p.reply.approve}</Btn>}
                  </div>
                )}
                <Btn onClick={() => setReply((v) => !v)} icon={reply ? Check : ArrowRight}>{reply ? p.reply.hide : p.reply.show}</Btn>
                <Notice text={p.alert} />
              </>
            )}
            {step === 2 && (
              <>
                <div className="mt-1">{p.rows.map((r) => <Row key={r[0]} label={r[0]}><StatusPill tone={r[2]}>{r[1]}</StatusPill></Row>)}</div>
                <div className="mt-3 flex items-center gap-2.5 rounded-control bg-mint p-3"><FileText size={22} strokeWidth={1.6} aria-hidden="true" className="text-accent-dark" /><div><strong className="block text-xs font-medium">{p.export.title}</strong><span className="text-[10px] text-sub">{p.export.sub}</span></div></div>
                <Notice text={p.alert} />
                <Btn onClick={() => downloadCsv(w)} icon={Download} primary>{p.action}</Btn>
              </>
            )}
          </div>
        </div>
        <div className="flex h-[42px] items-center justify-between gap-2.5 border-t border-line bg-white px-3 text-[10px] text-sub md:px-5">
          <span>{w.footer}</span>
          <button type="button" onClick={() => go((step + 1) % 3)} className="flex items-center gap-2 py-2 text-[11px] font-semibold text-green-text focus-ring">{step === 2 ? w.again : w.next} <ArrowRight {...ic} /></button>
        </div>
      </div>
    </div>
  );
}
