import Link from 'next/link';
import { ArrowRight, Clock, MessageSquare, SlidersHorizontal, FileInput, Eye, Users, ShieldCheck } from 'lucide-react';
import { getDictionary } from '../get-dictionary';
import { BOOKINGS_URL, bookingLinkProps } from '../booking';
import { socialMetadata } from '../seo';
import Footer from '../components/Footer';
import StatusPill from '../components/StatusPill';
import ProductCard from '../components/ProductCard';
import PricingPreview from '../components/PricingPreview';
import WhitepaperSection from '../components/WhitepaperSection';
import OnlineSignupSection from '../components/OnlineSignupSection';

// Homepage volgens brief §11 (fase 1, 16 september 2026), met de vier begrenzingen uit de
// review: geen EUDR-datum of -eigenschappen, whitepaper zonder formulier, aankoop als uitleg,
// prijsknop alleen als de prijspagina aan staat. Alle copy uit de dictionaries (bron:
// docs/marketing/website/copy/home.json in de product-repo).

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded';

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang);
  const { title, description } = dict.home.meta;
  return {
    title,
    description,
    alternates: { canonical: `/${params.lang}`, languages: { en: '/en', nl: '/nl' } },
    ...socialMetadata({ title, description }),
  };
}

const benefitIcons = [FileInput, Eye, Users, ShieldCheck];
const painIcons = [Clock, MessageSquare, SlidersHorizontal];

function Eyebrow({ children, light }) {
  return <p className={`mb-3 text-sm font-display font-bold uppercase tracking-wide ${light ? 'text-accent' : 'text-accent-dark'}`}>{children}</p>;
}

export default async function LivoAppsWebsite({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const t = dict.home;
  const pricingEnabled = process.env.PRICING_PAGE_ENABLED === 'true';

  return (
    <div className="font-sans text-ink">
      {/* 2. Hero */}
      <section className="bg-navy px-6 pb-20 pt-16 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow light>{t.hero.brandLine}</Eyebrow>
            <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">{t.hero.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">{t.hero.lead}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={`/${lang}#pricing`} className={`inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3 font-semibold text-ink transition-colors duration-200 hover:bg-accent-dark ${focusRing}`}>
                {t.hero.ctaPrimary} <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href={`/${lang}/ppwr`} className={`inline-flex items-center rounded-md border border-white/30 px-7 py-3 font-semibold transition-colors duration-200 hover:border-accent ${focusRing}`}>
                {t.hero.ctaSecondary}
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/60">{t.hero.roadmap}</p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6 text-ink" aria-label={t.hero.card.label}>
            <div className="flex items-center justify-between gap-3">
              <span className="font-display text-lg font-bold">{t.hero.card.product}</span>
              <StatusPill tone="ok">{t.hero.card.status}</StatusPill>
            </div>
            <p className="mt-2 text-sm text-sub">{t.hero.card.lead}</p>
            <ul className="mt-5 divide-y divide-line border-t border-line">
              {t.hero.card.rows.map((r) => (
                <li key={r.label} className="flex items-center justify-between py-3 text-sm">
                  <span>{r.label}</span>
                  <StatusPill tone={r.tone}>{r.value}</StatusPill>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-sub">{t.hero.card.label}</p>
          </div>
        </div>
      </section>

      {/* 3. Benefit strip */}
      <section className="border-b border-line bg-white px-6 py-10">
        <ul className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
          {t.benefits.map((b, i) => {
            const Icon = benefitIcons[i] ?? Eye;
            return (
              <li key={b.title} className="flex gap-3">
                <Icon size={22} aria-hidden="true" className="mt-0.5 flex-none text-accent-dark" />
                <div>
                  <h3 className="font-display font-bold">{b.title}</h3>
                  <p className="mt-1 text-sm text-sub">{b.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 4. Pain */}
      <section className="bg-canvas px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>{t.pain.eyebrow}</Eyebrow>
          <h2 className="max-w-3xl font-display text-3xl font-bold md:text-4xl">{t.pain.title}</h2>
          <p className="mt-4 max-w-3xl text-lg text-sub">{t.pain.lead}</p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {t.pain.items.map((p, i) => {
              const Icon = painIcons[i] ?? Clock;
              return (
                <li key={p.title} className="rounded-2xl border border-line bg-white p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-canvas"><Icon size={20} aria-hidden="true" className="text-ink" /></span>
                  <h3 className="mt-4 font-display text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-sub">{p.body}</p>
                </li>
              );
            })}
          </ul>
          <blockquote className="mt-8 rounded-2xl border-l-4 border-accent bg-white px-6 py-5 text-lg font-medium">{t.pain.quote}</blockquote>
        </div>
      </section>

      {/* 5. Product family */}
      <section id="products" className="scroll-mt-20 bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>{t.products.eyebrow}</Eyebrow>
          <div className="grid items-end gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <h2 className="font-display text-3xl font-bold md:text-4xl">{t.products.title}</h2>
            <p className="text-sub">{t.products.lead}</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <ProductCard lang={lang} variant="ppwr" t={t.products.ppwr} />
            <ProductCard lang={lang} variant="next" t={t.products.next} />
          </div>
        </div>
      </section>

      {/* 6. How LIVO works */}
      <section id="how" className="scroll-mt-20 bg-canvas px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>{t.how.eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl font-bold md:text-4xl">{t.how.title}</h2>
            <p className="mt-4 text-lg text-sub">{t.how.lead}</p>
            <ol className="mt-8 space-y-6">
              {t.how.steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="font-display text-sm font-bold text-accent-dark">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display text-lg font-bold">{s.title}</h3>
                    <p className="mt-1 text-sm text-sub">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="self-start rounded-2xl border border-line bg-navy p-6 text-white">
            <p className="text-xs uppercase tracking-wide text-white/60">{t.how.card.label}</p>
            <ul className="mt-4 divide-y divide-white/10">
              {t.how.card.rows.map((r, i) => (
                <li key={r.title} className="flex items-center justify-between gap-4 py-3">
                  <div className="flex gap-3">
                    <span className="font-display text-xs font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="text-sm font-semibold">{r.title}</p>
                      <p className="text-xs text-white/60">{r.body}</p>
                    </div>
                  </div>
                  <StatusPill tone={r.tone}>{r.status}</StatusPill>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Pricing preview */}
      <PricingPreview lang={lang} t={t.pricing} pricingEnabled={pricingEnabled} />

      {/* 8. Whitepaper */}
      <WhitepaperSection lang={lang} t={t.whitepaper} />

      {/* 9. Start online (als uitleg) */}
      <OnlineSignupSection t={t.start} />

      {/* 10. About / brand principles */}
      <section id="about" className="scroll-mt-20 bg-canvas px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>{t.about.eyebrow}</Eyebrow>
          <h2 className="max-w-3xl font-display text-3xl font-bold md:text-4xl">{t.about.title}</h2>
          <p className="mt-4 max-w-3xl text-lg text-sub">{t.about.lead}</p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {t.about.principles.map((p) => (
              <li key={p.title} className="rounded-2xl border border-line bg-white p-6">
                <h3 className="font-display text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-sub">{p.body}</p>
              </li>
            ))}
          </ul>
          <h3 className="mt-14 font-display text-xl font-bold">{t.about.traitsTitle}</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {t.about.traits.map((tr) => (
              <li key={tr.title} className="rounded-xl border border-line bg-white px-5 py-4">
                <p className="font-display font-bold">{tr.title}</p>
                <p className="text-sm text-sub">{tr.sub}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 11. Next module band (zonder datum, zonder eigenschappen) */}
      <section className="bg-navy px-6 py-16 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow light>{t.nextModule.eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl font-bold">{t.nextModule.title}</h2>
            <p className="mt-3 max-w-3xl text-white/70">{t.nextModule.body}</p>
          </div>
          <a href="mailto:hello@livoapps.software?subject=Next%20LIVO%20module" className={`inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-semibold transition-colors duration-200 hover:border-accent ${focusRing}`}>
            {t.nextModule.cta} <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* 12. Final CTA */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">{t.finalCta.title}</h2>
          <p className="mt-4 text-lg text-sub">{t.finalCta.body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={`/${lang}#pricing`} className={`inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3 font-semibold text-ink transition-colors duration-200 hover:bg-accent-dark ${focusRing}`}>
              {t.finalCta.ctaPricing} <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href={BOOKINGS_URL} {...bookingLinkProps} className={`inline-flex items-center rounded-md border border-line px-7 py-3 font-semibold text-ink transition-colors duration-200 hover:border-sub ${focusRing}`}>
              {t.finalCta.ctaDemo}
            </a>
          </div>
        </div>
      </section>

      <Footer lang={lang} dict={t.footer} />
    </div>
  );
}
