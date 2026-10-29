import OrderButton from './OrderButton';
import DemoLink from './DemoLink';
import HandNote from './HandNote';
import MarketingIcon from './MarketingIcon';
import { Section, Eyebrow, h2, btnPrimary, cardOnCanvas, cardTitleSmall, cardBody } from './ui';

const PPWR_LOGIN_URL = 'https://ppwr.livoapps.software/login';

// Startsectie (kooproute 29 oktober 2026): drie stappen van plan kiezen tot hulp bij de eerste inrichting, elk met een
// marketingicoon (zelf-starten, verplichtingen, hulp-bij-start), één knop naar de planselectie en de demo als tekstlink.
// De bestaande login blijft beschikbaar. Geen mailto als hoofdactie.
export default function OnlineSignupSection({ lang, t, order, demo, demoLabel, pricingEnabled }) {
  return (
    <Section id="start" tone="canvas">
      <Eyebrow>{t.eyebrow}</Eyebrow>
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
        <h2 className={`max-w-3xl ${h2}`}>{t.title}</h2>
        <HandNote className="mb-1">{t.hand}</HandNote>
      </div>
      <ol className="mt-10 grid gap-6 md:grid-cols-3">
        {t.steps.map((s, i) => (
          <li key={s.title} className={`${cardOnCanvas} p-7`}>
            <div className="flex items-center justify-between gap-3">
              <MarketingIcon name={s.icon} />
              <span className="font-display text-sm font-bold text-ink-blue">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className={`mt-5 ${cardTitleSmall}`}>{s.title}</h3>
            <p className={`mt-2 ${cardBody}`}>{s.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <OrderButton lang={lang} t={order} pricingEnabled={pricingEnabled} hash="#plans" className={btnPrimary} />
        <p className="text-sm text-sub">
          {t.customer}{' '}
          <a href={PPWR_LOGIN_URL} rel="noopener noreferrer" className="rounded font-semibold text-green-text underline-offset-4 transition-colors duration-150 hover:underline focus-ring">{t.login}</a>
        </p>
      </div>
      <p className="mt-3 flex flex-wrap items-center gap-x-2 text-sm text-sub">{t.note} <DemoLink demo={demo} label={demoLabel} className="min-h-0 text-sm" /></p>
    </Section>
  );
}
