import { notFound } from 'next/navigation';
import { getDictionary } from '../../get-dictionary';
import { BOOKINGS_URL, bookingLinkProps } from '../../booking';
import Footer from '../../components/Footer';
import { socialMetadata } from '../../seo';

// Prijspagina achter een poort (fase C, ontwerpdocument v2 §7.11): PRICING_PAGE_ENABLED
// blijft uit tot de concurrentie-offertes binnen zijn. Poort dicht = notFound(), noindex
// en niet in de sitemap; anders dan bij de whitepaper is er geen coming-soon-kaart,
// omdat er nog niets heen linkt en de vergelijkingsclaim nog geverifieerd wordt.
const pricingEnabled = () => process.env.PRICING_PAGE_ENABLED === 'true';

// Startpunt tot de echte signup-route er is; nakijken bij het openen van de poort.
const START_URL = 'https://ppwr.livoapps.software/login';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

function StatusPill({ status, live }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold whitespace-nowrap ${
        live ? 'bg-accent/15 text-ink' : 'border border-line bg-canvas text-sub'
      }`}
    >
      {status}
    </span>
  );
}

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang);
  const { title, description } = dict.pricing.meta;
  return {
    title,
    description,
    alternates: { canonical: `/${params.lang}/pricing`, languages: { en: '/en/pricing', nl: '/nl/pricing' } },
    ...socialMetadata({ title, description }),
    robots: pricingEnabled() ? undefined : { index: false, follow: false },
  };
}

export default async function PricingPage({ params }) {
  if (!pricingEnabled()) notFound();

  const { lang } = params;
  const dict = await getDictionary(lang);
  const t = dict.pricing;

  return (
    <div className="bg-canvas text-ink">
      {/* Lanceeractie (besluit-lanceeractie-v1) */}
      <div className="bg-accent/10 border-b border-line px-6 py-4">
        <p className="max-w-5xl mx-auto text-sm leading-relaxed">
          <span className="font-semibold">{t.banner.lead}</span> {t.banner.body}
        </p>
      </div>

      {/* Hero */}
      <header className="bg-navy text-white px-6 pt-16 pb-20">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-accent text-sm font-display font-bold tracking-wide mb-4">{t.hero.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6">
              {t.hero.titleLine1}
              <br />
              {t.hero.titleLine2}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-8">{t.hero.lead}</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <a href={START_URL} className={`rounded-md bg-accent px-6 py-3 text-sm font-semibold text-navy transition-colors duration-200 hover:bg-accent-dark ${focusRing}`}>
                {t.hero.ctaPrimary}
              </a>
              <a href={BOOKINGS_URL} {...bookingLinkProps} className={`rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-accent ${focusRing}`}>
                {t.hero.ctaSecondary}
              </a>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
              {t.hero.bullets.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          {/* Samenvattingskaart "Every paid plan" */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <p className="text-sm text-white/60 mb-1">{t.card.title}</p>
            <p className="text-3xl font-display font-bold mb-2">{t.card.price}</p>
            <p className="text-sm text-white/60 mb-6">{t.card.note}</p>
            <ul className="space-y-3">
              {t.card.bullets.map((line) => (
                <li key={line} className="flex gap-3 text-sm text-white/80">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* 01 · Plannen */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-accent text-sm font-display font-bold tracking-wide mb-3">{t.plans.eyebrow}</p>
          <h2 className="text-3xl font-display font-bold mb-4">{t.plans.title}</h2>
          <p className="text-sub leading-relaxed max-w-2xl mb-8">{t.plans.body}</p>

          <div className="bg-surface border border-line rounded-xl p-6 mb-8 max-w-2xl">
            <p className="font-display font-bold mb-1">{t.plans.freeTitle}</p>
            <p className="text-sm text-sub">{t.plans.freeBody}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-4">
            {t.plans.items.map((plan) => (
              <div key={plan.name} className="bg-surface border border-line rounded-xl p-6 flex flex-col">
                <p className="text-xs text-sub mb-2">{plan.audience}</p>
                <h3 className="text-lg font-display font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-sub mb-4">{plan.limit}</p>
                <p className="mt-auto text-2xl font-display font-bold">
                  {plan.monthly} <span className="text-sm font-sans font-normal text-sub">{t.plans.perMonth}</span>
                </p>
                <p className="text-xs text-sub mt-1">{plan.yearly}</p>
              </div>
            ))}
          </div>
          {/* Jaarkorting expliciet (prijsstrategie v2.3: jaarfacturatie −15%) */}
          <p className="text-sm text-sub mb-8">{t.plans.yearlyNote}</p>

          <div className="bg-navy text-white rounded-xl p-8 md:flex md:items-center md:justify-between md:gap-8">
            <div>
              <h3 className="text-lg font-display font-bold mb-2">{t.plans.customTitle}</h3>
              <p className="text-sm text-white/70 max-w-xl">{t.plans.customBody}</p>
            </div>
            <a href={BOOKINGS_URL} {...bookingLinkProps} className={`mt-6 md:mt-0 inline-block flex-shrink-0 rounded-md border border-white/30 px-6 py-3 text-sm font-semibold transition-colors duration-200 hover:border-accent ${focusRing}`}>
              {t.plans.customCta}
            </a>
          </div>
        </div>
      </section>

      {/* 02 · Wat je echt krijgt */}
      <section className="bg-surface border-y border-line px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-accent text-sm font-display font-bold tracking-wide mb-3">{t.get.eyebrow}</p>
          <h2 className="text-3xl font-display font-bold mb-4 max-w-2xl">{t.get.title}</h2>
          <p className="text-sub leading-relaxed max-w-2xl mb-10">{t.get.body}</p>
          <div className="grid gap-5 md:grid-cols-2">
            {t.get.items.map((item) => (
              <div key={item.n} className="border border-line rounded-xl p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-display font-bold">
                    <span className="text-accent-dark">{item.n}</span> · {item.title}
                  </h3>
                  <StatusPill status={item.status} live={item.live} />
                </div>
                <p className="text-sm text-sub leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 · Wat het vervangt */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-accent text-sm font-display font-bold tracking-wide mb-3">{t.replaces.eyebrow}</p>
          <h2 className="text-3xl font-display font-bold mb-4">{t.replaces.title}</h2>
          <p className="text-sub leading-relaxed max-w-2xl mb-10">{t.replaces.body}</p>
          <div className="grid gap-5 md:grid-cols-2 max-w-4xl">
            {[t.replaces.left, t.replaces.right].map((col, i) => (
              <div key={col.title} className={`rounded-xl border p-6 ${i === 1 ? 'bg-navy text-white border-white/10' : 'bg-surface border-line'}`}>
                <h3 className="font-display font-bold mb-4">{col.title}</h3>
                <dl className={`text-sm divide-y ${i === 1 ? 'divide-white/10' : 'divide-line'}`}>
                  {col.rows.map((row) => (
                    <div key={row.label} className="flex justify-between gap-4 py-2.5">
                      <dt className={i === 1 ? 'text-white/70' : 'text-sub'}>{row.label}</dt>
                      <dd className="text-right font-medium">{row.value}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between gap-4 py-3 font-display font-bold">
                    <dt>{col.totalLabel}</dt>
                    <dd className={`text-right ${i === 1 ? 'text-accent' : ''}`}>{col.totalValue}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <p className="text-xs text-sub max-w-2xl mt-6">{t.replaces.footnote}</p>
        </div>
      </section>

      {/* 04 · In elk plan */}
      <section className="bg-surface border-y border-line px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-accent text-sm font-display font-bold tracking-wide mb-3">{t.everyPlan.eyebrow}</p>
          <h2 className="text-3xl font-display font-bold mb-4 max-w-2xl">{t.everyPlan.title}</h2>
          <p className="text-sub leading-relaxed max-w-2xl mb-8">{t.everyPlan.body}</p>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mb-8">
            {t.everyPlan.items.map((line) => (
              <li key={line} className="flex gap-3 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {line}
              </li>
            ))}
          </ul>
          <p className="text-sm text-sub max-w-2xl mb-6">{t.everyPlan.freeNote}</p>
          {/* Onboarding-alinea woordelijk uit de canonieke prijspagina (product-repo) */}
          <p className="text-sm text-sub max-w-2xl border-l-2 border-accent pl-4">{t.everyPlan.onboarding}</p>
        </div>
      </section>

      {/* 05 · Integraties */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-accent text-sm font-display font-bold tracking-wide mb-3">{t.integrations.eyebrow}</p>
          <h2 className="text-3xl font-display font-bold mb-4 max-w-2xl">{t.integrations.title}</h2>
          <p className="text-sub leading-relaxed max-w-2xl mb-10">{t.integrations.body}</p>
          <div className="grid gap-5 md:grid-cols-2 mb-8">
            {t.integrations.items.map((item) => (
              <div key={item.title} className="bg-surface border border-line rounded-xl p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-display font-bold">{item.title}</h3>
                  <StatusPill status={item.status} live={item.live} />
                </div>
                <p className="text-sm text-sub leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-sub max-w-2xl">{t.integrations.custom}</p>
        </div>
      </section>

      {/* 06 · Vragen */}
      <section className="bg-surface border-y border-line px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent text-sm font-display font-bold tracking-wide mb-3">{t.faq.eyebrow}</p>
          <h2 className="text-3xl font-display font-bold mb-10">{t.faq.title}</h2>
          <dl className="divide-y divide-line">
            {t.faq.items.map((item) => (
              <div key={item.q} className="py-6">
                <dt className="font-display font-bold mb-2">{item.q}</dt>
                <dd className="text-sm text-sub leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Slot-CTA */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t.closing.title}</h2>
          <p className="text-sub mb-8">{t.closing.body}</p>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a href={START_URL} className={`rounded-md bg-accent px-6 py-3 text-sm font-semibold text-navy transition-colors duration-200 hover:bg-accent-dark ${focusRing}`}>
              {t.closing.ctaPrimary}
            </a>
            <a href={BOOKINGS_URL} {...bookingLinkProps} className={`rounded-md border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:border-accent ${focusRing}`}>
              {t.closing.ctaSecondary}
            </a>
          </div>
          <p className="text-xs text-sub">{t.closing.ctaNote}</p>
          <p className="text-xs text-sub mt-12 pt-6 border-t border-line">{t.disclaimer}</p>
        </div>
      </section>

      <Footer lang={lang} dict={dict.home.footer} />
    </div>
  );
}
