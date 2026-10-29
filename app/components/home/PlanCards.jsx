'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Plus } from 'lucide-react';
import { btnPrimary, btnSecondary, textLink } from '../ui';

// De prijskaarten van het concept (29 oktober 2026): schakelaar maand/jaar, drie kaarten (Starter, Core uitgelicht, Growth),
// de grotere plannen ingeklapt, de telregel ingeklapt. "Bespreek {plan}" opent de demomail met het plan erbij (het concept
// vult het plan in zijn conceptformulier in); de regel eronder linkt naar de prijspagina met alle plannen en de kooproute.
// Bedragen en ladder uit copy/pricing.json (dict.pricing.ladder); teksten uit home.plans.
const num = (n, lang) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, lang === 'nl' ? '.' : ',');
const fill = (s, v) => s.replace('{plan}', v).replace('{n}', v).replace('{total}', v);

export default function PlanCards({ t, ladder, lang, demoHref, pricingHref }) {
  const [annual, setAnnual] = useState(false);
  const top = ladder.plans.slice(0, 3); const rest = ladder.plans.slice(3);
  const price = (p) => `€${num(annual ? p.annualMonthly : p.monthly, lang)}`;
  return (
    <div>
      <div className="text-center">
        <div role="group" className="mt-7 inline-flex gap-1 rounded-control bg-frame p-1">
          {[[false, t.monthly], [true, t.annual]].map(([v, label]) => (
            <button key={label} type="button" aria-pressed={annual === v} onClick={() => setAnnual(v)} className={`flex items-center gap-2 rounded-[5px] px-4 py-2 text-[11px] font-medium leading-relaxed focus-ring ${annual === v ? 'bg-white text-ink shadow-soft' : 'text-sub'}`}>{label}{v && <span className="text-[9px] font-semibold text-green-text">{t.annualBadge}</span>}</button>
          ))}
        </div>
      </div>
      <div className="mt-8 grid gap-3.5 md:grid-cols-3 md:gap-[18px]">
        {top.map((p) => {
          const featured = p.name === t.featured;
          return (
            <article key={p.name} className={`rounded-[11px] border bg-white p-6 md:p-7 max-sm:grid max-sm:grid-cols-[1fr_auto] max-sm:gap-x-3 ${featured ? 'border-accent-dark ring-1 ring-accent-dark' : 'border-frame'}`}>
              <span className="mb-4 block text-[9px] text-sub max-sm:col-span-2 max-sm:text-[10px]">{t.contexts[p.name]}</span>
              <h3 className="font-display text-[29px] font-bold tracking-heading text-ink max-sm:col-start-1 max-sm:row-start-2">{p.name}</h3>
              <p className="mt-2 text-[10px] text-sub md:text-[11px] max-sm:col-start-1 max-sm:row-start-3">{fill(t.skuCount, num(p.limit, lang))}</p>
              <p className="mt-6 flex items-baseline gap-1.5 whitespace-nowrap max-sm:col-start-2 max-sm:row-span-2 max-sm:row-start-2 max-sm:mt-0 max-sm:flex-col max-sm:items-end max-sm:gap-0.5 max-sm:self-center"><span className="font-display text-[39px] leading-none tracking-heading md:text-[47px]">{price(p)}</span><small className="text-[10px] text-sub md:text-[11px]">{t.perMonth}</small></p>
              <p className="mt-2.5 min-h-[15px] text-[9px] text-sub max-sm:col-span-2 max-sm:mt-4">{annual ? fill(t.billedAnnually, `€${num(p.annualTotal, lang)}`) : t.billedMonthly}</p>
              <a href={`${demoHref}${encodeURIComponent(`\nPlan: ${p.name}\n`)}`} className={`${featured ? btnPrimary : btnSecondary} mt-5 flex w-full text-[11px] max-sm:col-span-2 max-sm:min-h-[44px] max-sm:text-xs`}>{fill(t.discuss, p.name)} <ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" /></a>
            </article>
          );
        })}
      </div>
      <p className="mt-5 text-center text-[10px] text-sub md:mt-6">{annual ? t.noteAnnual : t.noteMonthly}</p>
      <details className="group mt-6 border-y border-frame-line/50">
        <summary className="flex cursor-pointer list-none items-start justify-between gap-3 py-5 text-[13px] font-semibold max-sm:block"><span>{t.more}</span><span className="flex items-center gap-3 text-[11px] font-medium text-green-text max-sm:mt-1 max-sm:justify-between">{t.moreLink} <ChevronDown size={15} strokeWidth={1.6} aria-hidden="true" className="transition-transform group-open:rotate-180" /></span></summary>
        <div className="pb-4">
          {[...rest, null].map((p) => {
            const name = p ? p.name : ladder.custom.name;
            return (
              <p key={name} className="grid grid-cols-[1fr_1.4fr_.8fr] items-center gap-2 border-t border-line px-0 py-3.5 text-[9px] md:grid-cols-[1fr_1.5fr_.6fr_.6fr_.7fr] md:gap-3 md:px-2 md:text-[11px]">
                <strong>{name}</strong>
                <span>{p ? fill(t.upTo, num(p.limit, lang)) : fill(t.moreThan, num(ladder.custom.moreThan, lang))}</span>
                <span className="max-sm:hidden">{p ? price(p) : t.onRequest}</span>
                <span className="max-sm:hidden">{p ? t.perMonthLong : ''}</span>
                <a href={`${demoHref}${encodeURIComponent(`\nPlan: ${name}\n`)}`} className="flex items-center justify-end gap-2 text-green-text focus-ring">{t.discussShort} <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" /></a>
              </p>
            );
          })}
        </div>
      </details>
      <details className="group mt-3.5">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-2 text-[10px] text-sub md:text-[11px]">{t.countingQ} <Plus size={14} strokeWidth={1.6} aria-hidden="true" className="flex-none transition-transform group-open:rotate-45" /></summary>
        <p className="max-w-[850px] py-2 pr-1 text-[10px] leading-[1.85] text-sub md:pr-6 md:text-[11px]">{t.countingA}</p>
      </details>
      <p className="mt-6 text-center"><Link href={pricingHref} className={`${textLink} text-green-text`}>{t.allPlans} <ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" /></Link></p>
    </div>
  );
}
