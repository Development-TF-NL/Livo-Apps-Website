import { Mail, Search, AlertTriangle, Clock, Check, ArrowRight } from 'lucide-react';
import HandNote from './HandNote';

const icons = [Mail, Search, AlertTriangle, Clock];

// "A familiar situation?": vier stappen van de handmatige route tegenover "With LIVO" (stijlblad v2 §06).
export default function RequestFlow({ t }) {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[.14em] text-ink-blue">{t.eyebrow}</p>
        <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink md:text-5xl">{t.title}</h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto_minmax(280px,0.5fr)] lg:items-center">
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.steps.map((s, i) => {
              const Icon = icons[i] ?? Clock;
              return (
                <li key={s.title} className="rounded-card bg-canvas p-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink-blue"><Icon size={22} aria-hidden="true" /></span>
                  <p className="mt-4 text-sm font-semibold text-ink">{i + 1}. {s.title}</p>
                  <p className="mt-1 text-sm text-sub">{s.body}</p>
                </li>
              );
            })}
          </ol>
          <ArrowRight size={32} aria-hidden="true" className="mx-auto hidden text-ink-blue lg:block" />
          <div className="relative rounded-card bg-mint p-6 shadow-soft">
            <p className="font-display text-xl font-bold text-green-text">{t.withTitle}</p>
            <ul className="mt-4 space-y-3">
              {t.with.map((w) => (
                <li key={w} className="flex items-center gap-3 text-sm font-medium text-ink"><span className="inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent text-ink"><Check size={14} aria-hidden="true" /></span>{w}</li>
              ))}
            </ul>
            <div className="absolute -top-7 right-4 hidden lg:block"><HandNote>{t.note}</HandNote></div>
          </div>
        </div>
        <blockquote className="mt-10 rounded-card border-l-4 border-accent bg-canvas px-6 py-5 text-lg font-medium text-ink">{t.quote}</blockquote>
      </div>
    </section>
  );
}
