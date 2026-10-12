import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { getDictionary } from '../get-dictionary';
import { mailto } from '../mailto';
import { languageAlternates, socialMetadata } from '../seo';
import Footer from '../components/Footer';
import PhotoPlace from '../components/PhotoPlace';
import RegisterFragment from '../components/RegisterFragment';
import PricingPreview from '../components/PricingPreview';
import OnlineSignupSection from '../components/OnlineSignupSection';
import { Section, Eyebrow, ClosingBand, GreenTitle, h1, h2, lead, cardBody, btnPrimary, btnSecondary, textLink, heroPanel, cardOnCanvas, cardOnWhite } from '../components/ui';

// Homepage M2 (12 oktober 2026, pakket M2_WEBSITE_MKB_2026-10-10; hoofdkop vastgesteld door de eigenaar). Volgorde: hero met de
// prijsregel, één doorlopend fictief artikelvoorbeeld (#how, VH-2001 uit het demonstratiedossier), de taakverdeling, prijs (#pricing),
// start met demoaanvraag en zichtbaar e-mailadres (#start), over LIVO APPS (#about, alleen de aanleiding), slot, footer.
// De klantvraagsectie, de drie voordeelkaarten en de tweede identieke registerillustratie zijn vervallen; de productpagina draagt de
// diepere uitleg. Copy uit de dictionaries (bron: docs/marketing/website/copy/home.json en nav.json in de product-repo). De vorm komt
// uit de gedeelde bouwstenen in components/ui.jsx. Beeld: in de hero één product in het Register-fragment (fictieve data, als
// illustratie gelabeld) tot er een gecontroleerde productopname is; de doos linksonder in de hero en het plantje bij Over LIVO APPS
// komen uit de tussentijdse set in docs/huisstijl/beeld/. Eén hoofdactie per sectie.

const BOX = '/brand/photo/box.png'; // doos, primair (hero); bron docs/huisstijl/beeld/doos.png, licht van linksboven
const SEEDLING = '/brand/photo/seedling.png'; // plantje, op één plek: de sectie Over LIVO APPS; bron docs/huisstijl/beeld/plantje.png

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang);
  const { title, description } = dict.home.meta;
  return {
    title,
    description,
    alternates: { canonical: `/${params.lang}`, languages: languageAlternates() },
    ...socialMetadata({ title, description, lang: params.lang }),
  };
}

export default async function LivoAppsWebsite({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const t = dict.home;
  const order = dict.nav.order;
  // De demomail (onderwerp en voorgevulde tekst) is dezelfde als op de productpagina: één bron, ppwr.hero.
  const demo = mailto(dict.ppwr.hero.demoSubject, dict.ppwr.hero.demoBody);
  const pricingEnabled = process.env.PRICING_PAGE_ENABLED === 'true';

  return (
    <div className="font-sans text-ink">
      {/* 1. Hero: bovenregel, doelgroep, kop, lead, één primaire knop (demo), één tekstlink, de prijsregel; het beeld erna (op smal eronder) */}
      <Section tone="canvas" hero>
        <div className={`relative overflow-hidden ${heroPanel} p-6 pb-48 sm:p-8 md:p-12 md:pb-60`}>
          {/* min-w-0 op de kolommen: anders bepaalt de min-content van het registerfragment de kolombreedte en loopt de tekst op 390 px de kaart uit. */}
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="min-w-0">
              <Eyebrow>{t.hero.eyebrow}</Eyebrow>
              <p className="mb-3 text-sm font-semibold text-ink-blue">{t.hero.audience}</p>
              <h1 lang={lang} className={`${h1} lg:text-[2.75rem] xl:text-[3.1rem]`}>
                <GreenTitle title={t.hero.title} green={t.hero.titleGreen} />
              </h1>
              <p className={`mt-6 max-w-lg ${lead}`}>{t.hero.lead}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href={demo} className={btnPrimary}><Mail size={18} aria-hidden="true" />{t.hero.ctaDemo}</a>
                <Link href={`/${lang}#how`} className={textLink}>{t.hero.ctaHow} <ArrowRight size={16} aria-hidden="true" /></Link>
              </div>
              <p className="mt-4 text-sm font-medium text-ink">{t.hero.priceLine}</p>
            </div>
            <div className="min-w-0">
              <RegisterFragment t={t.hero.visual.example} compact />
              <p className="mt-3 text-right text-xs text-sub">{t.hero.visual.label}</p>
            </div>
          </div>
          {/* De doos steekt uit de hoek linksonder van het heropaneel, deels afgesneden door de rand (overflow-hidden). */}
          <PhotoPlace src={BOX} imgClassName="absolute -bottom-12 -left-8 h-52 w-auto md:-bottom-16 md:-left-12 md:h-72" />
        </div>
      </Section>

      {/* 2. Eén artikel van import tot klantbestand (#how): vijf genummerde stappen, het bijschrift en één link naar de productpagina */}
      <Section id="how">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className={h2}>{t.example.title}</h2>
            <p className={`mt-5 ${lead}`}>{t.example.intro}</p>
            <Link href={`/${lang}/ppwr`} className={`mt-8 ${btnSecondary}`}>{t.example.cta} <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
          <div className="min-w-0">
            <ol className="space-y-4">
              {t.example.steps.map((step, i) => (
                <li key={step} className={`flex items-start gap-4 ${cardOnWhite} p-5`}>
                  <span aria-hidden="true" className="mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-mint font-display text-sm font-bold text-green-text">{i + 1}</span>
                  <p className="text-lg leading-snug text-ink">{step}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-sub">{t.example.caption}</p>
          </div>
        </div>
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
      <OnlineSignupSection t={t.start} order={order} />

      {/* 6. Over LIVO APPS: alleen de aanleiding (kandidaattekst, inhoudelijke controle door de eigenaar vóór publicatie); geen naam,
          foto of biografie. Het plantje als randaccent rechtsonder, alleen vanaf 1024 px. */}
      <Section
        id="about"
        tone="canvas"
        className="relative overflow-hidden"
        after={<PhotoPlace src={SEEDLING} imgClassName="absolute -bottom-10 right-[max(1.5rem,calc(50%_-_600px))] hidden h-52 w-auto lg:block" />}
      >
        <Eyebrow>{t.about.eyebrow}</Eyebrow>
        <h2 className={`max-w-3xl ${h2}`}>{t.about.title}</h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink">{t.about.body}</p>
      </Section>

      {/* 7. Slot: het ene navy moment van de pagina, met één demoaanvraag. */}
      <ClosingBand title={t.finalCta.title} center>
        <a href={demo} className={btnPrimary}><Mail size={18} aria-hidden="true" />{t.hero.ctaDemo}</a>
      </ClosingBand>

      <Footer lang={lang} dict={t.footer} />
    </div>
  );
}
