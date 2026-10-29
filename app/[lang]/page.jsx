import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getDictionary } from '../get-dictionary';
import { languageAlternates, socialMetadata } from '../seo';
import Footer from '../components/Footer';
import PhotoPlace from '../components/PhotoPlace';
import ProductPath from '../components/ProductPath';
import ProcessSteps from '../components/ProcessSteps';
import PricingPreview from '../components/PricingPreview';
import OnlineSignupSection from '../components/OnlineSignupSection';
import LightClosingBand from '../components/LightClosingBand';
import OrderButton, { pricingHref } from '../components/OrderButton';
import { Section, Eyebrow, GreenTitle, Callout, h1, h2, lead, cardBody, btnPrimary, btnPrimaryWrap, btnSecondary, textLink, heroPanel, cardOnCanvas } from '../components/ui';

// Homepage op de kooproute (29 oktober 2026, brief CLAUDE_BRIEF §2 en §3; hoofdkop vastgesteld door de eigenaar). Volgorde: hero met
// de doelgroepregel, de kop, de lead, één primaire knop naar de planselectie op de prijspagina, de tekstlink naar het proces en de
// transparantieregel; rechts het productpad als groot, leesbaar beeld (fictieve gegevens, in de taal van de pagina, zonder tenantlabel).
// Dan het proces (#how): vijf stappen met de marketingiconen v2 en de uitleg over de verantwoordelijkheid, de taakverdeling, prijs
// (#pricing), start (#start: zelf starten en hulp bij de eerste inrichting), over LIVO APPS (#about), het lichte slot naar de prijzen, footer.
// De demo blijft als tekstlink in de startsectie (geen verplichte toegang tot kopen). Copy uit de dictionaries (bron:
// docs/marketing/website/copy/home.json en nav.json in de product-repo). De vorm komt uit de gedeelde bouwstenen in components/ui.jsx.
// De maandactie (ctaPrimary en monthOfferLine) staat achter MONTH_OFFER_ENABLED (brief §4): zonder poort de knop ctaPlans en de
// transparantieregel zonder de eerste-maandzin. De doos linksonder in de hero en het plantje bij Over LIVO APPS komen uit de tussentijdse set.

const BOX = '/brand/photo/box.png'; // doos, primair (hero); bron docs/huisstijl/beeld/doos.png, licht van linksboven
const SEEDLING = '/brand/photo/seedling.png'; // plantje, op één plek: de sectie Over LIVO APPS; bron docs/huisstijl/beeld/plantje.png
const monthOfferEnabled = () => process.env.MONTH_OFFER_ENABLED === 'true';

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang);
  const { title, description } = dict.home.meta;
  return {
    title,
    description,
    alternates: { canonical: `/${params.lang}`, languages: languageAlternates() },
    ...socialMetadata({ title, description, lang: params.lang, path: `/${params.lang}` }),
  };
}

export default async function LivoAppsWebsite({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const t = dict.home;
  const order = dict.nav.order;
  const pricingEnabled = process.env.PRICING_PAGE_ENABLED === 'true';
  const monthOffer = monthOfferEnabled();
  const transparency = [t.hero.priceLine, monthOffer ? t.hero.monthOfferLine : null, t.hero.helpLine].filter(Boolean).join(' ');

  return (
    <div className="font-sans text-ink">
      {/* 1. Hero: bovenregel, doelgroep, kop, lead, één primaire knop (naar de prijzen), één tekstlink, de transparantieregel; het productpad ernaast (op smal eronder) */}
      <Section tone="canvas" hero>
        <div className={`relative overflow-hidden ${heroPanel} p-6 pb-44 sm:p-8 md:p-12 md:pb-56`}>
          {/* min-w-0 op de kolommen: anders bepaalt de min-content van het productpad de kolombreedte en loopt de tekst op 390 px de kaart uit. */}
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="min-w-0">
              <Eyebrow>{t.hero.eyebrow}</Eyebrow>
              <p className="mb-3 text-sm font-semibold text-ink-blue">{t.hero.audience}</p>
              {/* "verpakkingsregelgeving" past op 360 px niet op één regel: op smal afbreken met een afbreekstreepje (hyphens: auto, taal uit lang)
                  en als vangnet overal afbreekbaar; vanaf 640 px alleen handmatige afbreking. Onder 375 px een maat kleiner. */}
              <h1 lang={lang} className={`${h1} max-[374px]:text-[2rem] max-sm:[hyphens:auto] max-sm:[overflow-wrap:anywhere] lg:text-[2.6rem] xl:text-[3rem]`}>
                <GreenTitle title={t.hero.title} green={t.hero.titleGreen} />
              </h1>
              <p className={`mt-6 max-w-lg ${lead}`}>{t.hero.lead}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <OrderButton lang={lang} t={order} pricingEnabled={pricingEnabled} hash="#plans" label={monthOffer ? t.hero.ctaPrimary : t.hero.ctaPlans} className={btnPrimaryWrap} />
                <Link href={`/${lang}#how`} className={textLink}>{t.hero.ctaHow} <ArrowRight size={16} aria-hidden="true" /></Link>
              </div>
              <p className="mt-4 max-w-lg text-sm font-medium text-ink">{transparency}</p>
            </div>
            <div className="min-w-0">
              <ProductPath t={t.example.path} />
            </div>
          </div>
          {/* De doos steekt uit de hoek linksonder van het heropaneel, deels afgesneden door de rand (overflow-hidden). */}
          <PhotoPlace src={BOX} imgClassName="absolute -bottom-12 -left-8 h-52 w-auto md:-bottom-16 md:-left-12 md:h-72" />
        </div>
      </Section>

      {/* 2. Het proces (#how): kop, intro, vijf stappen met iconen, de uitleg over de verantwoordelijkheid en één link naar de productpagina */}
      <Section id="how">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h2 className={h2}>{t.example.title}</h2>
          <p className={lead}>{t.example.intro}</p>
        </div>
        <ProcessSteps steps={t.example.steps} className="mt-12" />
        <p className="mt-4 text-sm text-sub">{t.example.caption}</p>
        <Callout as="div" className="mt-8">
          <p className="max-w-4xl text-body text-ink">{t.example.responsibility}</p>
        </Callout>
        <Link href={`/${lang}/ppwr`} className={`mt-8 ${btnSecondary}`}>{t.example.cta} <ArrowRight size={18} aria-hidden="true" /></Link>
      </Section>

      {/* 3. Wat neemt LIVO over: drie kaarten (automatisch zichtbaar, klaargezet, jouw beslissing), geen knop */}
      <Section tone="canvas">
        <h2 className={`max-w-3xl ${h2}`}>{t.roles.title}</h2>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {t.roles.groups.map((g) => (
            <li key={g.label} className={`${cardOnCanvas} p-7`}>
              <p className="text-xs font-semibold uppercase tracking-[.14em] text-ink-blue">{g.label}</p>
              <p className={`mt-3 ${cardBody}`}>{g.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <PricingPreview lang={lang} t={t.pricing} order={order} pricingEnabled={pricingEnabled} />
      <OnlineSignupSection lang={lang} t={t.start} order={order} demo={dict.ppwr.hero} demoLabel={dict.nav.demo.cta} pricingEnabled={pricingEnabled} />

      {/* 6. Over LIVO APPS: alleen de aanleiding, de door de eigenaar goedgekeurde tekst in drie alinea's (EUDR als module in ontwikkeling);
          geen naam, foto of biografie. Het plantje als randaccent rechtsonder, alleen vanaf 1024 px. */}
      <Section
        id="about"
        tone="canvas"
        className="relative overflow-hidden"
        after={<PhotoPlace src={SEEDLING} imgClassName="absolute -bottom-10 right-[max(1.5rem,calc(50%_-_600px))] hidden h-52 w-auto lg:block" />}
      >
        <Eyebrow>{t.about.eyebrow}</Eyebrow>
        <h2 className={`max-w-3xl ${h2}`}>{t.about.title}</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-ink">
          {t.about.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
        </div>
      </Section>

      {/* 7. Slot: licht mintpaneel met de uitnodiging om met eigen gegevens te beginnen; de knop wijst naar de planselectie en opent geen mail. */}
      <LightClosingBand tone="mint" title={t.finalCta.title} lead={t.finalCta.lead}>
        <Link href={pricingHref(lang, pricingEnabled, '#plans')} className={btnPrimary}>{t.finalCta.cta} <ArrowRight size={18} aria-hidden="true" /></Link>
      </LightClosingBand>

      <Footer lang={lang} dict={t.footer} />
    </div>
  );
}
