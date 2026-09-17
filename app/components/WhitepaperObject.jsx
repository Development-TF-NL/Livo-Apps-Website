import { Check } from 'lucide-react';
import WhitepaperRequest from './WhitepaperRequest';

// Whitepaper als object: cover-mock plus aanvraagblok (mailto). Geen formulier, geen opslag (17 september 2026).
export default function WhitepaperObject({ lang, t }) {
  return (
    <section id="whitepaper" className="scroll-mt-20 bg-canvas px-6 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.14em] text-ink-blue">{t.eyebrow}</p>
          <h2 className="font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink md:text-5xl">{t.title}</h2>
          <p className="mt-5 text-lg text-ink-blue">{t.lead}</p>
          <ul className="mt-6 space-y-2">
            {t.points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-ink"><Check size={16} aria-hidden="true" className="mt-0.5 flex-none text-accent-dark" />{p}</li>
            ))}
          </ul>
        </div>
        <div className="grid gap-6 sm:grid-cols-[200px_1fr] sm:items-start">
          <div aria-hidden="true" className="mx-auto w-[200px] rounded-[12px] bg-navy p-6 text-white shadow-soft" style={{ aspectRatio: '3/4' }}>
            <span className="font-display text-xs font-bold tracking-widest">LIVO <span className="text-accent">PPWR</span></span>
            <p className="mt-10 font-display text-xl font-bold leading-tight">{t.coverTitle}</p>
            <p className="mt-4 text-xs text-white/70">{t.coverSub}</p>
          </div>
          <WhitepaperRequest t={t.request} />
        </div>
      </div>
    </section>
  );
}
