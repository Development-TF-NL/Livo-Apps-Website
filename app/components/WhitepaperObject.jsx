import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

// Whitepaper als object: cover-mock plus formulier zonder werking (fase 1: geen data verstuurd).
// Het echte formulier staat op /[lang]/whitepaper achter WHITEPAPER_FORM_ENABLED.
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
          <form className="rounded-card bg-white p-6 shadow-soft" onSubmit={undefined} aria-describedby="wp-note">
            <fieldset disabled className="space-y-3">
              <label className="block text-sm font-medium text-ink">{t.form.email}<input type="email" className="mt-1 h-11 w-full rounded-control border border-line px-3 text-sm" placeholder="name@company.com" /></label>
              <label className="block text-sm font-medium text-ink">{t.form.name}<input type="text" className="mt-1 h-11 w-full rounded-control border border-line px-3 text-sm" /></label>
              <label className="block text-sm font-medium text-ink">{t.form.company}<input type="text" className="mt-1 h-11 w-full rounded-control border border-line px-3 text-sm" /></label>
              <button type="button" className="h-12 w-full rounded-control bg-accent font-semibold text-ink opacity-60">{t.form.submit}</button>
            </fieldset>
            <p id="wp-note" className="mt-3 text-xs text-sub">{t.form.disabledNote}</p>
            <Link href={`/${lang}/whitepaper`} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-green-text focus-ring">{t.cta} <ArrowRight size={14} aria-hidden="true" /></Link>
          </form>
        </div>
      </div>
    </section>
  );
}
