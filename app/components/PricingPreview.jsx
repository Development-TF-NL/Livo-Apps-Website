import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded';

// Prijspreview op de homepage (brief §6): de prijslogica, geen bedragen. De knop naar
// /[lang]/pricing verschijnt alleen als PRICING_PAGE_ENABLED aan staat (die pagina gaat pas
// na de toets tegen prijsstrategie v2.3 aan, koersbesluit 15 september); anders een
// kalme placeholder met een contactlink. Geen dode links.
export default function PricingPreview({ lang, t, pricingEnabled }) {
  return (
    <section id="pricing" className="scroll-mt-20 bg-canvas px-6 py-20 text-ink">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-sm font-display font-bold uppercase tracking-wide text-accent-dark">{t.eyebrow}</p>
        <h2 className="max-w-3xl font-display text-3xl font-bold md:text-4xl">{t.title}</h2>
        <p className="mt-4 max-w-3xl text-lg text-sub">{t.lead}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-navy p-8 text-white">
            <h3 className="font-display text-2xl font-bold">{t.cardTitle}</h3>
            <p className="mt-3 text-white/70 leading-relaxed">{t.cardBody}</p>
            <ul className="mt-6 space-y-2">
              {t.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-white/85">
                  <Check size={16} aria-hidden="true" className="mt-0.5 flex-none text-accent" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col rounded-2xl border border-line bg-white p-8">
            <h3 className="font-display text-2xl font-bold">{t.planTitle}</h3>
            <p className="mt-3 text-sub leading-relaxed">{t.planBody}</p>
            <div className="mt-6" aria-hidden="true">
              <div className="h-2 rounded-full bg-line">
                <div className="h-2 w-2/5 rounded-full bg-accent" />
              </div>
              <div className="mt-2 flex justify-between text-xs text-sub">
                <span>{t.scaleFrom}</span>
                <span>{t.scaleTo}</span>
              </div>
            </div>
            <div className="mt-auto pt-8">
              {pricingEnabled ? (
                <Link href={`/${lang}/pricing`} className={`inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent-dark ${focusRing}`}>
                  {t.ctaPricing} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              ) : (
                <div>
                  <p className="text-sm text-sub">{t.pricingSoon}</p>
                  <a href="mailto:hello@livoapps.software?subject=LIVO%20PPWR%20pricing" className={`mt-3 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors duration-200 hover:text-accent-dark ${focusRing}`}>
                    {t.ctaAsk} <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
