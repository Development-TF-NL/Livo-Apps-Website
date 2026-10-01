import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import OrderButton from './OrderButton';
import { Section, Eyebrow, h2, btnPrimary, textLink, promoPanel } from './ui';

// Prijs op de homepage: drie regels, de tijdelijke bestelknop (mailto, tot 1 november 2026) en een kleine
// tekstlink ernaast. De tekstlink wijst naar /[lang]/pricing alleen als PRICING_PAGE_ENABLED aan staat;
// anders is het een contactlink. Geen dode links. Het mintpaneel staat op wit en draagt geen schaduw.
export default function PricingPreview({ lang, t, order, pricingEnabled }) {
  return (
    <Section id="pricing">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className={h2}>{t.title}</h2>
        </div>
        <div className={`${promoPanel} p-8`}>
          <ul className="space-y-3">
            {t.lines.map((l) => (
              <li key={l} className="flex items-start gap-3 text-lg font-medium text-ink"><span aria-hidden="true" className="mt-2 inline-block h-2.5 w-2.5 flex-none rounded-full bg-accent" />{l}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <OrderButton t={order} className={btnPrimary} />
            {pricingEnabled ? (
              <Link href={`/${lang}/pricing`} className={`${textLink} text-sm`}>{t.ctaPricing} <ArrowRight size={16} aria-hidden="true" /></Link>
            ) : (
              <a href="mailto:hello@livoapps.software?subject=LIVO%20PPWR%20pricing" className={`${textLink} text-sm`}>{t.ctaAsk} <ArrowRight size={16} aria-hidden="true" /></a>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
