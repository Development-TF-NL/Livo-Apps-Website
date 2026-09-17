import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import RegisterFragment from './RegisterFragment';
import HandNote from './HandNote';

// "See what needs attention": het Register-fragment groot, met de zes onderdelen als lijst (stijlblad v2 §06).
export default function AttentionSection({ lang, t, register }) {
  return (
    <section id="attention" className="scroll-mt-20 bg-canvas px-6 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.14em] text-ink-blue">{t.eyebrow}</p>
          <h2 className="font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink md:text-5xl">{t.title}</h2>
          <p className="mt-5 text-lg text-ink-blue">{t.lead}</p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {t.points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-ink"><span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent"><Check size={12} aria-hidden="true" className="text-ink" /></span>{p}</li>
            ))}
          </ul>
          <Link href={`/${lang}/ppwr`} className="mt-8 inline-flex h-12 items-center gap-2 rounded-control bg-accent px-6 font-semibold text-ink transition-colors duration-150 hover:bg-accent-dark focus-ring">
            {t.cta} <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div>
          <RegisterFragment t={register} />
          <p className="mt-4 text-right"><HandNote>{t.note}</HandNote></p>
        </div>
      </div>
    </section>
  );
}
