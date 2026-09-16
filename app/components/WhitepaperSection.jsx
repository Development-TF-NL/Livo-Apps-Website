import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded';

// Whitepaper-sectie (brief §8) zonder werkend formulier (begrenzing 2, fase 1): de knop
// wijst naar /[lang]/whitepaper, waar het formulier achter WHITEPAPER_FORM_ENABLED blijft.
export default function WhitepaperSection({ lang, t }) {
  return (
    <section id="whitepaper" className="scroll-mt-20 bg-navy px-6 py-20 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-display font-bold uppercase tracking-wide text-accent">{t.eyebrow}</p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">{t.title}</h2>
          <p className="mt-4 text-lg text-white/70">{t.lead}</p>
          <ul className="mt-6 space-y-2">
            {t.points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-white/85">
                <Check size={16} aria-hidden="true" className="mt-0.5 flex-none text-accent" /> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/5 p-8">
          <h3 className="font-display text-xl font-bold">{t.cta}</h3>
          <p className="mt-3 text-sm text-white/70">{t.note}</p>
          <Link href={`/${lang}/whitepaper`} className={`mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent-dark ${focusRing}`}>
            {t.cta} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
