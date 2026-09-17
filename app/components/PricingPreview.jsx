import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Prijs op de homepage: drie regels en één knop (stap c). De knop naar /[lang]/pricing alleen als
// PRICING_PAGE_ENABLED aan staat; anders een contactlink. Geen dode links.
export default function PricingPreview({ lang, t, pricingEnabled }) {
  return (
    <section id="pricing" className="scroll-mt-20 bg-white px-6 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.14em] text-ink-blue">{t.eyebrow}</p>
          <h2 className="font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink md:text-5xl">{t.title}</h2>
        </div>
        <div className="rounded-hero bg-mint p-8 shadow-soft">
          <ul className="space-y-3">
            {t.lines.map((l) => (
              <li key={l} className="flex items-start gap-3 text-lg font-medium text-ink"><span aria-hidden="true" className="mt-2 inline-block h-2.5 w-2.5 flex-none rounded-full bg-accent" />{l}</li>
            ))}
          </ul>
          <div className="mt-8">
            {pricingEnabled ? (
              <Link href={`/${lang}/pricing`} className="inline-flex h-12 items-center gap-2 rounded-control bg-accent px-6 font-semibold text-ink transition-colors duration-150 hover:bg-accent-dark focus-ring">{t.ctaPricing} <ArrowRight size={18} aria-hidden="true" /></Link>
            ) : (
              <a href="mailto:hello@livoapps.software?subject=LIVO%20PPWR%20pricing" className="inline-flex h-12 items-center gap-2 rounded-control bg-accent px-6 font-semibold text-ink transition-colors duration-150 hover:bg-accent-dark focus-ring">{t.ctaAsk} <ArrowRight size={18} aria-hidden="true" /></a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
