import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, FileCheck, FileSpreadsheet, ListChecks, Mail, Send } from 'lucide-react';
import { getDictionary } from '../../get-dictionary';
import { mailto } from '../../mailto';
import Footer from '../../components/Footer';
import DemoLink from '../../components/DemoLink';
import MarketingIcon from '../../components/MarketingIcon';
import PhotoPlace from '../../components/PhotoPlace';
import { languageAlternates, socialMetadata } from '../../seo';
import LightClosingBand from '../../components/LightClosingBand';
import { Section, Eyebrow, IconCircle, Callout, GreenTitle, benefitIcons, eyebrow, h1, h2, cardTitleSmall, cardBody, btnPrimary, btnSecondary, heroPanel, cardOnCanvas, cardOnWhite } from '../../components/ui';

// Prijspagina (kooproute 29 oktober 2026). Tekst en bedragen komen uit één bron (docs/marketing/website/copy/pricing.json
// in de product-repo), dezelfde als de prijsflyer. Volgorde: een korte hero (kop, termijnregel, doelgroep en vanafprijs), direct
// daarna de plannen (#plans) met de schakelaar, de bestelknoppen, de taalnotitie, hulp bij de start en de prijsregel; dan de vier
// startstappen met de marketingiconen, de drie voordelen, de vier functies en het lichte slot naar de plannen met de demo als tekstlink.
// Poorten (bouwvariabelen, nieuwe deploy nodig):
// - PRICING_PAGE_ENABLED: dicht = notFound() en noindex; open = de pagina, in de sitemap en in het menu.
// - SELF_SERVICE_ORDER_ENABLED: aan = maandplannen linken naar /order?plan=<code>&period=monthly in de app (Engels; de taalnotitie
//   staat erbij); uit = de knop opent een e-mail om te starten (orderSubject), met de regel dat bestellen via de website volgt.
// - SELF_SERVICE_ANNUAL_ORDER_ENABLED: aan (pas na de test van de jaarroute) = directe link met period=yearly; uit = contactroute per mail.
// - MONTH_OFFER_ENABLED: aan = de termijnregel en de zoekresultaattekst van de maandactie (brief §4); uit = de standaardtermijn.
// Custom blijft altijd een aanvraag per mail. Plancodes van het aanbod: starter, core, growth, scale, enterprise (kleine letters).
const pricingEnabled = () => process.env.PRICING_PAGE_ENABLED === 'true';
const selfServiceOrderEnabled = () => process.env.SELF_SERVICE_ORDER_ENABLED === 'true';
const annualOrderEnabled = () => process.env.SELF_SERVICE_ANNUAL_ORDER_ENABLED === 'true';
const monthOfferEnabled = () => process.env.MONTH_OFFER_ENABLED === 'true';

const ORDER_URL = 'https://ppwr.livoapps.software/order';
const BOX = '/brand/photo/box.png'; // doos uit de tussentijdse set (docs/huisstijl/beeld/doos.png), randaccent in de hero
const featureIcons = [FileSpreadsheet, Send, ListChecks, FileCheck];

// 1008 wordt "1.008" (NL) of "1,008" (EN); de bedragen staan één keer als getal in de bron.
const num = (n, lang) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, lang === 'nl' ? '.' : ',');
const fill = (template, plan) => template.replace('{plan}', plan);
const orderHref = (plan, period) => `${ORDER_URL}?plan=${encodeURIComponent(plan.toLowerCase())}&period=${period}`;

// De startmail met het plan in het onderwerp en als eerste regel van de tekst (de route zonder de bestelpoort, en voor jaarbetaling en Custom).
function planMail(page, plan, subjectTemplate) {
  return mailto(fill(subjectTemplate, plan), `${page.orderBody}\n${fill(page.planLine, plan)}\n`);
}

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang);
  const { title } = dict.pricing.meta;
  const description = monthOfferEnabled() ? dict.pricing.meta.description : dict.pricing.meta.descriptionStandard;
  return {
    title,
    description,
    alternates: { canonical: `/${params.lang}/pricing`, languages: languageAlternates('/pricing') },
    ...socialMetadata({ title, description, lang: params.lang, path: `/${params.lang}/pricing` }),
    robots: pricingEnabled() ? undefined : { index: false, follow: false },
  };
}

export default async function PricingPage({ params }) {
  if (!pricingEnabled()) notFound();

  const { lang } = params;
  const dict = await getDictionary(lang);
  const t = dict.pricing;
  const { plans, custom } = t.ladder;
  const selfService = selfServiceOrderEnabled();
  const annualSelfService = selfService && annualOrderEnabled();
  const terms = monthOfferEnabled() ? t.head.terms : t.head.termsStandard;
  const row = 'grid items-center gap-3 md:grid-cols-[1fr_1fr_1.2fr_17rem] md:gap-6';
  // De plan-knoppen mogen over twee regels lopen (bijvoorbeeld "Vraag een passend aanbod" in de kolom van 17rem): hoogte volgt de inhoud.
  const wrap = 'w-full !h-auto min-h-12 whitespace-normal py-2 text-center sm:w-auto';
  const planBtn = `${btnPrimary} ${wrap}`;

  return (
    <div className="font-sans text-ink">
      {/* 1. Hero, kort: kop, de termijnregel (maandactie of standaard), doelgroep en vanafprijs; de doos als randaccent rechtsonder */}
      <Section tone="canvas" hero>
        <div className={`relative overflow-hidden ${heroPanel} p-6 sm:p-8 md:p-12`}>
          <div className="md:pr-64">
            <h1 lang={lang} className={`${h1} max-w-3xl lg:text-[3.4rem]`}><GreenTitle title={t.head.title} green={t.head.titleGreen} /></h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-ink">{terms}</p>
            <p className="mt-4 text-body text-sub">{t.head.audience}</p>
          </div>
          <PhotoPlace src={BOX} imgClassName="absolute -bottom-14 -right-10 hidden h-64 w-auto md:block" />
        </div>
      </Section>

      {/* 2. De plannen (#plans), direct na de hero: schakelaar (alleen CSS: werkt ook zonder JavaScript), de tabel met per plan de
          bestelactie, de taalnotitie bij de bestelroute, hulp bij de start, en de prijsregel los van de wettelijke rol */}
      <Section id="plans" tone="canvas" className="!pt-0 md:!pt-0">
        <div className={`${cardOnCanvas} p-6 md:p-10`}>
          <h2 className={h2}>{t.price.title}</h2>
          <p className="mt-4 text-body text-sub">{t.price.line}</p>

          {/* De twee keuzerondjes sturen met CSS (peer) welke prijs zichtbaar is; standaard maandelijks
              (besluit prijzen 1 oktober 2026: de maandprijs is de standaard, jaarbetaling de optie met korting).
              Zonder CSS staan beide bedragen er, elk met zijn naam ervoor. De focus landt op het verborgen
              keuzerondje; het label ernaast krijgt dan dezelfde rand als de klasse focus-ring (--focus-ring),
              alleen bij toetsenbordfocus (niet als het rondje door een muisklik focus kreeg). Op mobiel vult de
              schakelaar de breedte, met kleinere letters en minder ruimte, zodat het lange label op één regel past. */}
          <input type="radio" name="billing" id="billing-monthly" defaultChecked className="peer/monthly sr-only" />
          <input type="radio" name="billing" id="billing-annual" className="peer/annual sr-only" />
          <div className="mt-6 flex rounded-control border border-line bg-canvas p-1 text-[13px] font-semibold sm:inline-flex sm:text-sm peer-checked/annual:[&_.t-annual]:bg-navy peer-checked/annual:[&_.t-annual]:text-white peer-checked/monthly:[&_.t-monthly]:bg-navy peer-checked/monthly:[&_.t-monthly]:text-white peer-[:focus-visible:not([data-pointer-focus])]/annual:[&_.t-annual]:[box-shadow:var(--focus-ring)] peer-[:focus-visible:not([data-pointer-focus])]/monthly:[&_.t-monthly]:[box-shadow:var(--focus-ring)]">
            <label htmlFor="billing-monthly" className="t-monthly inline-flex min-h-[44px] flex-auto cursor-pointer items-center justify-center rounded-[8px] px-2 text-center text-sub transition-colors duration-150 sm:px-4">{t.page.toggleMonthly}</label>
            <label htmlFor="billing-annual" className="t-annual inline-flex min-h-[44px] flex-auto cursor-pointer items-center justify-center rounded-[8px] px-2 text-center text-sub transition-colors duration-150 sm:px-4">{t.page.toggleAnnual}</label>
          </div>

          <div className="mt-6 peer-checked/annual:[&_.p-monthly]:hidden peer-checked/monthly:[&_.p-annual]:hidden">
            <div className={`hidden border-b-[1.5px] border-navy pb-2 md:grid md:grid-cols-[1fr_1fr_1.2fr_17rem] md:gap-6 ${eyebrow} !mb-0`} aria-hidden="true">
              <span>{t.price.columns.plan}</span>
              <span>{t.price.columns.skus}</span>
              <span><span className="p-monthly">{t.price.columns.monthly}</span> <span className="p-annual">{t.price.columns.annual}</span></span>
              <span />
            </div>
            <ul>
              {plans.map((p) => (
                <li key={p.name} className={`${row} border-b border-line py-5 md:py-4`}>
                  <h3 className="font-display text-2xl font-bold tracking-tight md:text-card">{p.name}</h3>
                  <p className="text-body text-sub"><span className="md:hidden">{t.price.columns.skus}: </span>{t.price.upTo} {num(p.limit, lang)}</p>
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
                  {/* Maandplan: de bestelroute in de app zodra de poort open is, anders de startmail. Jaarbetaling: directe link alleen na de test, anders de contactroute. */}
                  {selfService ? (
                    <a href={orderHref(p.name, 'monthly')} hrefLang="en" className={`${planBtn} p-monthly`}>
                      {fill(t.page.orderPlan, p.name)} <ArrowRight size={18} aria-hidden="true" />
                    </a>
                  ) : (
                    <a href={planMail(t.page, p.name, t.page.orderSubject)} className={`${planBtn} p-monthly`}>
                      <Mail size={18} aria-hidden="true" />{fill(t.page.orderMail, p.name)}
                    </a>
                  )}
                  {annualSelfService ? (
                    <a href={orderHref(p.name, 'yearly')} hrefLang="en" className={`${planBtn} p-annual`}>
                      {fill(t.page.orderAnnual, p.name)} <ArrowRight size={18} aria-hidden="true" />
                    </a>
                  ) : (
                    <a href={planMail(t.page, p.name, t.page.annualSubject)} className={`${btnSecondary} ${wrap} p-annual`}>
                      <Mail size={18} aria-hidden="true" />{t.page.annualContact}
                    </a>
                  )}
                </li>
              ))}
              <li className={`${row} py-5 md:py-4`}>
                <h3 className="font-display text-2xl font-bold tracking-tight md:text-card">{custom.name}</h3>
                <p className="text-body text-sub"><span className="md:hidden">{t.price.columns.skus}: </span>{t.price.moreThan} {num(custom.moreThan, lang)}</p>
                <p className="font-medium text-ink">{t.price.onRequest}</p>
                <a href={planMail(t.page, custom.name, t.page.customSubject)} className={`${btnSecondary} ${wrap}`}>
                  <Mail size={18} aria-hidden="true" />{t.page.customCta}
                </a>
              </li>
            </ul>
          </div>

          {/* De vervolgregels: de taalovergang naar de Engelse bestelroute (alleen als die open is), anders de regel dat bestellen via de
              website volgt; altijd hulp bij de eerste inrichting. */}
          <ul className="mt-6 space-y-2 text-sm text-sub">
            <li className="flex items-start gap-2"><Check size={16} aria-hidden="true" className="mt-1 flex-none text-accent-dark" />{selfService ? t.page.languageNote : t.page.mailNote}</li>
            <li className="flex items-start gap-2"><Check size={16} aria-hidden="true" className="mt-1 flex-none text-accent-dark" />{t.page.helpLine}</li>
          </ul>

          <Callout as="div" className="mt-6">
            <h3 className={cardTitleSmall}>{t.counts.title}</h3>
            <p className="mt-2 max-w-4xl text-body text-ink">{t.counts.body}</p>
          </Callout>
        </div>
      </Section>

      {/* 3. Zo start je: vier stappen van plan kiezen tot hulp bij de eerste inrichting, elk met een marketingicoon */}
      <Section id="start">
        <Eyebrow>{t.start.eyebrow}</Eyebrow>
        <h2 className={`max-w-3xl ${h2}`}>{t.start.title}</h2>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.start.steps.map((s, i) => (
            <li key={s.title} className={`${cardOnWhite} p-6`}>
              <div className="flex items-center justify-between gap-3">
                <MarketingIcon name={s.icon} />
                <span className="font-display text-sm font-bold text-ink-blue">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className={`mt-5 ${cardTitleSmall}`}>{s.title}</h3>
              <p className={`mt-2 ${cardBody}`}>{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 4. Drie voordelen, elk met een icoon in een mintcirkel */}
      <Section tone="canvas">
        <ul className="grid gap-6 md:grid-cols-3">
          {t.benefits.map((b, i) => (
            <li key={b.label} className={`${cardOnCanvas} p-7`}>
              <IconCircle icon={benefitIcons[i] ?? Check} />
              <p className={`mt-5 ${eyebrow} !mb-0`}>{b.label}</p>
              <p className="mt-3 font-display text-2xl font-bold leading-snug text-ink">{b.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 5. Vier functies, twee bij twee, elk met een icoon in een mintcirkel; het anker eronder */}
      <Section>
        <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {t.features.map((f, i) => (
            <li key={f.title} className="flex items-start gap-4">
              <IconCircle icon={featureIcons[i] ?? Check} />
              <div>
                <h3 className={cardTitleSmall}>{f.title}</h3>
                <p className={`mt-1 ${cardBody}`}>{f.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-10 font-display text-2xl font-bold text-ink">{t.anchor}</p>
      </Section>

      {/* 6. Slot: licht wit paneel op canvas; de knop gaat naar de plannen, de demo blijft als tekstlink (ppwr.hero is de ene bron van de demomail). */}
      <LightClosingBand tone="card" title={t.closing.title} lead={t.closing.start}>
        <Link href={`/${lang}/pricing#plans`} className={btnPrimary}>{t.closing.cta} <ArrowRight size={18} aria-hidden="true" /></Link>
        <DemoLink demo={dict.ppwr.hero} label={t.closing.demo} className="text-sm" />
      </LightClosingBand>

      <Footer lang={lang} dict={dict.home.footer} />
    </div>
  );
}
