import { notFound } from 'next/navigation';
import { Check, FileCheck, FileSpreadsheet, ListChecks, Mail, Send } from 'lucide-react';
import { getDictionary } from '../../get-dictionary';
import { mailto } from '../../mailto';
import Footer from '../../components/Footer';
import PhotoPlace from '../../components/PhotoPlace';
import { languageAlternates, socialMetadata } from '../../seo';
import { Section, IconCircle, Callout, ClosingBand, GreenTitle, benefitIcons, eyebrow, h1, h2, lead, cardTitleSmall, cardBody, btnPrimary, btnSecondary, heroPanel, cardOnCanvas, cardOnWhite } from '../../components/ui';

// Prijspagina (1 oktober 2026). Tekst en bedragen komen uit één bron (docs/marketing/website/copy/pricing.json
// in de product-repo), dezelfde als de prijsflyer. De vorm komt uit dezelfde bouwstenen als de homepage
// (components/ui.jsx): een lichte hero, drie voordelen met een icoon, de prijstabel in een kaart met "wat telt"
// erbij, vier functies met een icoon en het anker, en het navy slotpaneel met één demoaanvraag.
// Achter de poort PRICING_PAGE_ENABLED: dicht = notFound() en noindex; open = de pagina, in de sitemap en
// in het menu. Een plan opent een demoaanvraag per e-mail, met het gekozen plan erin.
const pricingEnabled = () => process.env.PRICING_PAGE_ENABLED === 'true';

const BOX = '/brand/photo/box.png'; // doos uit de tussentijdse set (docs/huisstijl/beeld/doos.png), randaccent in de hero
const featureIcons = [FileSpreadsheet, Send, ListChecks, FileCheck];

// 1008 wordt "1.008" (NL) of "1,008" (EN); de bedragen staan één keer als getal in de bron.
const num = (n, lang) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, lang === 'nl' ? '.' : ',');
const fill = (template, plan) => template.replace('{plan}', plan);

// De demoaanvraag van de homepage, met het plan in het onderwerp en bij de optionele gegevens.
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
  const row = 'grid items-center gap-3 md:grid-cols-[1fr_1fr_1.2fr_17rem] md:gap-6';

  return (
    <div className="font-sans text-ink">
      {/* 1. Hero, licht: kop, trigger als lead, doelgroep en vanafprijs; de doos als randaccent rechtsonder */}
      <Section tone="canvas" hero>
        <div className={`relative overflow-hidden ${heroPanel} p-6 sm:p-8 md:p-12`}>
          <div className="md:pr-64">
            <h1 lang={lang} className={`${h1} max-w-3xl lg:text-[3.4rem]`}><GreenTitle title={t.head.title} green={t.head.titleGreen} /></h1>
            <p className={`mt-6 max-w-2xl ${lead}`}>{t.head.trigger}</p>
            <p className="mt-5 font-semibold text-ink">{t.head.audience}</p>
          </div>
          <PhotoPlace src={BOX} imgClassName="absolute -bottom-14 -right-10 hidden h-64 w-auto md:block" />
        </div>
      </Section>

      {/* 2. Drie voordelen, elk met een icoon in een mintcirkel */}
      <Section>
        <ul className="grid gap-6 md:grid-cols-3">
          {t.benefits.map((b, i) => (
            <li key={b.label} className={`${cardOnWhite} p-7`}>
              <IconCircle icon={benefitIcons[i] ?? Check} />
              <p className={`mt-5 ${eyebrow} !mb-0`}>{b.label}</p>
              <p className="mt-3 font-display text-2xl font-bold leading-snug text-ink">{b.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. De prijstabel in een kaart, met de schakelaar (alleen CSS: werkt ook zonder JavaScript) en "wat telt" erbij */}
      <Section tone="canvas">
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
                  <a href={planMail(order, t.page, p.name, t.page.orderSubject)} className={`${btnPrimary} whitespace-nowrap`}>
                    <Mail size={18} aria-hidden="true" />{fill(t.page.orderPlan, p.name)}
                  </a>
                </li>
              ))}
              <li className={`${row} py-5 md:py-4`}>
                <h3 className="font-display text-2xl font-bold tracking-tight md:text-card">{custom.name}</h3>
                <p className="text-body text-sub"><span className="md:hidden">{t.price.columns.skus}: </span>{t.price.moreThan} {num(custom.moreThan, lang)}</p>
                <p className="font-medium text-ink">{t.price.onRequest}</p>
                <a href={planMail(order, t.page, custom.name, t.page.customSubject)} className={`${btnSecondary} whitespace-nowrap`}>
                  <Mail size={18} aria-hidden="true" />{t.page.customCta}
                </a>
              </li>
            </ul>
          </div>

          <Callout as="div" className="mt-6">
            <h3 className={cardTitleSmall}>{t.counts.title}</h3>
            <p className="mt-2 max-w-4xl text-body text-ink">{t.counts.body}</p>
          </Callout>
        </div>
      </Section>

      {/* 4. Vier functies, twee bij twee, elk met een icoon in een mintcirkel; het anker eronder */}
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

      {/* 5. Slot: het ene navy moment van de pagina, met één demoaanvraag. */}
      <ClosingBand tone="canvas" title={t.closing.title} lead={t.closing.start}>
        <a href={demo} className={btnPrimary}><Mail size={18} aria-hidden="true" />{dict.home.hero.ctaDemo}</a>
      </ClosingBand>

      <Footer lang={lang} dict={dict.home.footer} />
    </div>
  );
}
