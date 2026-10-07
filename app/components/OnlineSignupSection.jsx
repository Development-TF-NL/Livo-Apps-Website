import OrderButton from './OrderButton';
import HandNote from './HandNote';
import { MAIL, mailto } from '../mailto';
import { Section, Eyebrow, h2, btnPrimary, cardOnCanvas, cardTitleSmall, cardBody } from './ui';

const PPWR_LOGIN_URL = 'https://ppwr.livoapps.software/login';

// Startsectie M1 (7 oktober 2026): drie stappen naar een demo en een zichtbaar contactadres.
// De aanvraag opent een e-mailconcept. De bestaande login blijft beschikbaar.
export default function OnlineSignupSection({ t, order }) {
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
            <span className="font-display text-sm font-bold text-ink-blue">{String(i + 1).padStart(2, '0')}</span>
            <h3 className={`mt-2 ${cardTitleSmall}`}>{s.title}</h3>
            <p className={`mt-2 ${cardBody}`}>{s.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <OrderButton t={order} className={btnPrimary} />
        <p className="text-sm text-sub">
          {t.note}{' '}{t.customer}{' '}
          <a href={PPWR_LOGIN_URL} rel="noopener noreferrer" className="rounded font-semibold text-green-text underline-offset-4 transition-colors duration-150 hover:underline focus-ring">{t.login}</a>
        </p>
      </div>
      <a href={mailto(order.mailSubject, order.mailBody)} className="mt-3 inline-flex min-h-[44px] max-w-full items-center rounded text-sm text-green-text underline underline-offset-4 [overflow-wrap:anywhere] focus-ring">{MAIL}</a>
    </Section>
  );
}
