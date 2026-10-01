import OrderButton from './OrderButton';

const PPWR_LOGIN_URL = 'https://ppwr.livoapps.software/login';

// Startsectie met de tijdelijke bestelroute (homepage v5, 1 oktober 2026): drie stappen en de bestelknop
// (mailto). Geldt tot 1 november 2026; daarna vervangt het bestelproces op de website deze tekst en de knop.
export default function OnlineSignupSection({ t, order }) {
  return (
    <section id="start" className="scroll-mt-20 bg-canvas px-6 py-24 text-ink">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[.14em] text-ink-blue">{t.eyebrow}</p>
        <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1.06] tracking-tight md:text-5xl">{t.title}</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {t.steps.map((s, i) => (
            <li key={s.title} className="rounded-card bg-white p-7 shadow-soft">
              <span className="font-display text-sm font-bold text-ink-blue">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sub">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <OrderButton t={order} className="inline-flex h-12 items-center gap-2 rounded-control bg-accent px-6 font-semibold text-ink transition-colors duration-150 hover:bg-accent-dark focus-ring" />
          <p className="text-sm text-sub">
            {t.note}{' '}{t.customer}{' '}
            <a href={PPWR_LOGIN_URL} rel="noopener noreferrer" className="font-semibold text-green-text underline-offset-4 hover:underline focus-ring">{t.login}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
