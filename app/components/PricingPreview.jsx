import OrderButton from './OrderButton';
import { Section, Eyebrow, h2, btnPrimary, textLink, promoPanel } from './ui';

// Prijs op de homepage (M2, 12 oktober 2026; kooproute 29 oktober 2026): de vanafprijs zonder implementatiekosten als kop,
// de prijsregel(s) uit de dictionary en één knop naar de planselectie op de prijspagina (OrderButton). Zit de prijspagina
// achter de poort, dan wijst de knop naar dit blok en staat er een contactlink. Geen mailto als hoofdactie, geen dode links.
// Bedragen, ladder en poort staan niet in dit bestand (bron: copy/pricing.json en de prijspagina).
export default function PricingPreview({ lang, t, order, pricingEnabled }) {
  return (
    <Section id="pricing">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          {/* Onder 375 px een maat kleiner (M2-nazorg, 13 oktober 2026): op 360 px stak "implementatiekosten." 5 px buiten beeld. */}
          <h2 className={`${h2} max-[374px]:text-[2rem]`}>{t.title}</h2>
        </div>
        <div className={`${promoPanel} p-8`}>
          <ul className="space-y-3">
            {t.lines.map((l) => (
              <li key={l} className="flex items-start gap-3 text-lg font-medium text-ink"><span aria-hidden="true" className="mt-2 inline-block h-2.5 w-2.5 flex-none rounded-full bg-accent" />{l}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            {pricingEnabled ? (
              <OrderButton lang={lang} t={order} pricingEnabled={pricingEnabled} hash="#plans" className={btnPrimary} />
            ) : (
              <a href="mailto:hello@livoapps.software?subject=LIVO%20PPWR%20pricing" className={`${textLink} text-sm`}>{t.ctaAsk}</a>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
