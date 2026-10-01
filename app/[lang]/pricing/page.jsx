import { notFound } from 'next/navigation';
import { Check, Mail } from 'lucide-react';
import { getDictionary } from '../../get-dictionary';
import { mailto } from '../../mailto';
import Footer from '../../components/Footer';
import OrderButton from '../../components/OrderButton';
import { languageAlternates, socialMetadata } from '../../seo';

// Prijspagina (1 oktober 2026), in de lijn van de prijsflyer: navy band, drie voordelen, de prijstabel met
// "wat telt" erbij, vier functies met het anker, een lime band met de twee knoppen. Tekst en bedragen komen
// uit één bron (docs/marketing/website/copy/pricing.json in de product-repo), dezelfde als de flyer.
// Achter de poort PRICING_PAGE_ENABLED: dicht = notFound() en noindex; open = de pagina, in de sitemap en
// in het menu. Bestellen loopt tot 1 november 2026 via de bestelmail van de homepage, hier met het plan erin.
const pricingEnabled = () => process.env.PRICING_PAGE_ENABLED === 'true';

const eyebrow = 'text-xs font-semibold uppercase tracking-[.14em] text-ink-blue';
// De focusrand komt van de klasse focus-ring (globals.css), zoals op de homepage en de productpagina.
const btn = 'inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-control px-6 font-semibold transition-colors duration-150 focus-ring';

// 1008 wordt "1.008" (NL) of "1,008" (EN); de bedragen staan één keer als getal in de bron.
const num = (n, lang) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, lang === 'nl' ? '.' : ',');
const fill = (template, plan) => template.replace('{plan}', plan);

// De bestelmail van de homepage, met het plan in het onderwerp en als eerste ingevulde regel van de velden.
function planMail(order, page, plan, subjectTemplate) {
  const parts = order.mailBody.split('\n\n');
  parts[parts.length - 1] = `${fill(page.planLine, plan)}\n${parts[parts.length - 1]}`;
  return mailto(fill(subjectTemplate, plan), parts.join('\n\n'));
}

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang);
  const { title, description } = dict.pricing.meta;
  return {
    title,
    description,
    alternates: { canonical: `/${params.lang}/pricing`, languages: languageAlternates('/pricing') },
    ...socialMetadata({ title, description, lang: params.lang }),
    robots: pricingEnabled() ? undefined : { index: false, follow: false },
  };
}

export default async function PricingPage({ params }) {
  if (!pricingEnabled()) notFound();

  const { lang } = params;
  const dict = await getDictionary(lang);
  const t = dict.pricing;
  const order = dict.nav.order;
  const demo = mailto(dict.ppwr.hero.demoSubject, dict.ppwr.hero.demoBody);
  const { plans, custom } = t.ladder;

  return (
    <div className="bg-canvas font-sans text-ink">
      {/* 1. Navy band: kop, trigger, doelgroep en prijs */}
      <header className="bg-navy px-6 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl">
          <h1 lang={lang} className="max-w-4xl font-display text-4xl font-bold leading-[1.06] tracking-tight md:text-5xl">{t.head.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{t.head.trigger}</p>
          <p className="mt-5 font-semibold">{t.head.audience}</p>
        </div>
      </header>

      {/* 2. Drie voordelen in één rij */}
      <section className="px-6 pt-12">
        <ul className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3 md:gap-0">
          {t.benefits.map((b, i) => (
            <li key={b.label} className={i === 0 ? 'md:pr-8' : 'md:border-l md:border-line md:px-8'}>
              <p className={eyebrow}>{b.label}</p>
              <p className="mt-2 font-display text-xl font-bold leading-snug text-ink">{b.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. De prijstabel met de schakelaar (alleen CSS: werkt ook zonder JavaScript) en "wat telt" erbij */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl rounded-hero border border-line bg-white p-6 md:p-10">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">{t.price.title}</h2>
          <p className="mt-3 text-sub">{t.price.line}</p>

          {/* De twee keuzerondjes sturen met CSS (peer) welke prijs zichtbaar is; standaard maandelijks
              (besluit prijzen 1 oktober 2026: de maandprijs is de standaard, jaarbetaling de optie met korting).
              Zonder CSS staan beide bedragen er, elk met zijn naam ervoor. De focus landt op het verborgen
              keuzerondje; het label ernaast krijgt dan dezelfde rand als de klasse focus-ring (--focus-ring). */}
          <input type="radio" name="billing" id="billing-monthly" defaultChecked className="peer/monthly sr-only" />
          <input type="radio" name="billing" id="billing-annual" className="peer/annual sr-only" />
          <div className="mt-6 inline-flex rounded-control border border-line bg-canvas p-1 text-sm font-semibold peer-checked/annual:[&_.t-annual]:bg-navy peer-checked/annual:[&_.t-annual]:text-white peer-checked/monthly:[&_.t-monthly]:bg-navy peer-checked/monthly:[&_.t-monthly]:text-white peer-focus-visible/annual:[&_.t-annual]:[box-shadow:var(--focus-ring)] peer-focus-visible/monthly:[&_.t-monthly]:[box-shadow:var(--focus-ring)]">
            <label htmlFor="billing-monthly" className="t-monthly inline-flex min-h-[44px] cursor-pointer items-center rounded-[8px] px-4 text-sub">{t.page.toggleMonthly}</label>
            <label htmlFor="billing-annual" className="t-annual inline-flex min-h-[44px] cursor-pointer items-center rounded-[8px] px-4 text-sub">{t.page.toggleAnnual}</label>
          </div>

          <div className="mt-6 peer-checked/annual:[&_.p-monthly]:hidden peer-checked/monthly:[&_.p-annual]:hidden">
            <div className={`hidden border-b-[1.5px] border-navy pb-2 md:grid md:grid-cols-[1fr_1fr_1.2fr_17rem] md:gap-6 ${eyebrow}`} aria-hidden="true">
              <span>{t.price.columns.plan}</span>
              <span>{t.price.columns.skus}</span>
              <span><span className="p-monthly">{t.price.columns.monthly}</span> <span className="p-annual">{t.price.columns.annual}</span></span>
              <span />
            </div>
            <ul>
              {plans.map((p) => (
                <li key={p.name} className="grid items-center gap-3 border-b border-line py-5 md:grid-cols-[1fr_1fr_1.2fr_17rem] md:gap-6 md:py-4">
                  <h3 className="font-display text-2xl font-bold tracking-tight md:text-xl">{p.name}</h3>
                  <p className="text-sub"><span className="md:hidden">{t.price.columns.skus}: </span>{t.price.upTo} {num(p.limit, lang)}</p>
                  <div>
                    <p className="p-monthly">
                      <span className="sr-only">{t.page.toggleMonthly}: </span>
                      <span className="font-display text-2xl font-bold text-ink">€{num(p.monthly, lang)}</span> <span className="text-sm text-sub">{t.price.perMonth}</span>
                    </p>
                    <p className="p-annual">
                      <span className="sr-only">{t.price.columns.annual}: </span>
                      <span className="font-display text-2xl font-bold text-ink">€{num(p.annualMonthly, lang)}</span> <span className="text-sm text-sub">{t.price.perMonth}</span>
                      <span className="block text-sm text-sub">€{num(p.annualTotal, lang)} {t.price.perYear}</span>
                    </p>
                  </div>
                  <a href={planMail(order, t.page, p.name, t.page.orderSubject)} className={`${btn} bg-accent text-ink hover:bg-accent-dark`}>
                    <Mail size={18} aria-hidden="true" />{fill(t.page.orderPlan, p.name)}
                  </a>
                </li>
              ))}
              <li className="grid items-center gap-3 py-5 md:grid-cols-[1fr_1fr_1.2fr_17rem] md:gap-6 md:py-4">
                <h3 className="font-display text-2xl font-bold tracking-tight md:text-xl">{custom.name}</h3>
                <p className="text-sub"><span className="md:hidden">{t.price.columns.skus}: </span>{t.price.moreThan} {num(custom.moreThan, lang)}</p>
                <p className="font-medium text-ink">{t.price.onRequest}</p>
                <a href={planMail(order, t.page, custom.name, t.page.customSubject)} className={`${btn} border-[1.5px] border-navy bg-white text-ink hover:bg-canvas`}>
                  <Mail size={18} aria-hidden="true" />{t.page.customCta}
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-6 rounded-r-control border-l-4 border-accent bg-mint px-6 py-5">
            <h3 className="font-display text-xl font-bold text-ink">{t.counts.title}</h3>
            <p className="mt-2 max-w-4xl text-ink">{t.counts.body}</p>
          </div>
        </div>
      </section>

      {/* 4. Vier functies, twee bij twee, het anker eronder */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2">
            {t.features.map((f) => (
              <li key={f.title} className="flex items-start gap-4">
                <span aria-hidden="true" className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-mint text-green-text"><Check size={18} /></span>
                <div>
                  <h3 className="font-display text-xl font-bold text-ink">{f.title}</h3>
                  <p className="mt-1 text-sub">{f.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-10 font-display text-xl font-bold text-ink">{t.anchor}</p>
        </div>
      </section>

      {/* 5. Lime band: slotkop, startregel, demo en bestellen */}
      <section className="bg-accent px-6 py-14 text-ink">
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">{t.closing.title}</h2>
          <p className="mt-4 max-w-3xl text-lg">{t.closing.start}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={demo} className={`${btn} bg-navy text-white hover:bg-ink`}><Mail size={18} aria-hidden="true" />{dict.home.hero.ctaDemo}</a>
            <OrderButton t={order} className={`${btn} bg-white text-ink hover:bg-canvas`} />
          </div>
        </div>
      </section>

      <Footer lang={lang} dict={dict.home.footer} />
    </div>
  );
}
