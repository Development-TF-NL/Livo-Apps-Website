const PPWR_LOGIN_URL = 'https://ppwr.livoapps.software/login';
const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy rounded';

// Aankoopsectie als uitleg (begrenzing 3, fase 1): de bedoelde route in vier stappen,
// zonder knop naar een checkout en zonder toegangsbelofte. Stappen volgen AV 5.3
// (orderbevestiging), 13.3 (incasso) en het lanceeractie-besluit (gratis tot 1 november 2026).
export default function OnlineSignupSection({ t }) {
  return (
    <section id="start" className="scroll-mt-20 bg-white px-6 py-20 text-ink">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-sm font-display font-bold uppercase tracking-wide text-accent-dark">{t.eyebrow}</p>
        <h2 className="max-w-3xl font-display text-3xl font-bold md:text-4xl">{t.title}</h2>
        <p className="mt-4 max-w-3xl text-lg text-sub">{t.lead}</p>
        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {t.steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-line bg-canvas p-6">
              <span className="font-display text-sm font-bold text-accent-dark">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-sub">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-sub">
          {t.customer}{' '}
          <a href={PPWR_LOGIN_URL} rel="noopener noreferrer" className={`font-semibold text-ink transition-colors duration-200 hover:text-accent-dark ${focusRing}`}>{t.login}</a>
        </p>
      </div>
    </section>
  );
}
