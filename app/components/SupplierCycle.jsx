import { FileText, Send, PencilLine, ClipboardCheck } from 'lucide-react';

const icons = [FileText, Send, PencilLine, ClipboardCheck];

// Leveranciersronde als cirkel (flyer 2026-09-17, illustratie 03), groot, met de vier stappen ernaast.
// Nuance uit de review van 16 september: de klant verstuurt de uitvraag; LIVO bereidt voor en beoordeelt niets zelf.
export default function SupplierCycle({ t }) {
  const pill = 'absolute rounded-full px-4 py-1.5 text-sm font-semibold';
  return (
    <section id="suppliers" className="scroll-mt-20 bg-white px-6 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <div aria-hidden="true" className="relative mx-auto aspect-[100/62] w-full max-w-[560px] rounded-hero bg-canvas">
          <div className="absolute inset-8">
            <svg viewBox="0 0 100 56" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              <path d="M25,28a25,18 0 1,1 50,0a25,18 0 1,1 -50,0" fill="none" stroke="#B9C6CE" strokeWidth="0.9" />
              <path d="M-3.2 -2.6 L0 0 L-3.2 2.6" transform="translate(68.5 14.9) rotate(50)" fill="none" stroke="#2F5FB3" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M-3.2 -2.6 L0 0 L-3.2 2.6" transform="translate(31.5 41.1) rotate(230)" fill="none" stroke="#2F5FB3" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={`${pill} left-1/2 top-0 -translate-x-1/2 bg-mint text-green-text`}>{t.steps[0].title}</span>
            <span className={`${pill} right-0 top-1/2 -translate-y-1/2 border border-line bg-white text-ink`}>{t.steps[2].title}</span>
            <span className={`${pill} bottom-0 left-1/2 -translate-x-1/2 bg-mint text-green-text`}>{t.steps[3].title}</span>
            <span className={`${pill} left-0 top-1/2 -translate-y-1/2 border border-line bg-white text-ink`}>{t.steps[1].title}</span>
            <span className="absolute left-1/2 top-1/2 flex h-20 w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-card border-2 border-navy bg-white text-center leading-none">
              <b className="font-display text-lg font-bold text-ink">{t.coreTitle}</b><span className="mt-1.5 text-xs text-sub">{t.coreSub}</span>
            </span>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.14em] text-ink-blue">{t.eyebrow}</p>
          <h2 className="font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink md:text-5xl">{t.title}</h2>
          <p className="mt-5 text-lg text-ink-blue">{t.lead}</p>
          <ol className="mt-8 space-y-4">
            {t.steps.map((s, i) => {
              const Icon = icons[i];
              return (
                <li key={s.title} className="flex gap-4">
                  <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full bg-mint text-green-text"><Icon size={20} aria-hidden="true" /></span>
                  <div><p className="font-display text-lg font-bold text-ink">{i + 1} · {s.title}</p><p className="mt-1 text-sm text-sub">{s.body}</p></div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
