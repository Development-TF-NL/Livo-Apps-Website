import Link from 'next/link';
import { ArrowRight, Check, FileCheck, Mail, Send } from 'lucide-react';
import { getDictionary } from '../get-dictionary';
import { mailto } from '../mailto';
import { languageAlternates, socialMetadata } from '../seo';
import Footer from '../components/Footer';
import PhotoPlace from '../components/PhotoPlace';
import RegisterFragment from '../components/RegisterFragment';
import PricingPreview from '../components/PricingPreview';
import OnlineSignupSection from '../components/OnlineSignupSection';
import WhitepaperRow from '../components/WhitepaperRow';
import OrderButton from '../components/OrderButton';
import HandNote from '../components/HandNote';
import { Section, Eyebrow, IconCircle, Callout, ClosingBand, GreenTitle, benefitIcons, h1, h2, lead, cardTitle, cardBody, btnPrimary, btnSecondary, btnOnNavy, textLink, heroPanel, cardOnCanvas, cardOnWhite } from '../components/ui';

// Homepage v5 (1 oktober 2026), huisstijl v2 uitgesproken. Volgorde: hero, de klantvraag, expertise tijd en
// geld, productbewijs (#how), leveranciers en klanten, prijs (#pricing), start (#start, tijdelijke bestelroute
// per e-mail tot 1 november 2026), whitepaper, over LIVO APPS (#about), slot, footer.
// Copy uit de dictionaries (bron: docs/marketing/website/copy/home.json en nav.json in de product-repo,
// gebouwd uit 06-homepage-tekst-v5-1okt2026.md). De vorm komt uit de gedeelde bouwstenen in components/ui.jsx.
// Beeld: de Register-illustratie (fictieve data, gelabeld) blijft in de hero en bij het productbewijs tot er
// een echte productopname is. De doos linksonder in de hero en het plantje in de sectie Over LIVO APPS komen uit de
// tussentijdse set in docs/huisstijl/beeld/. Handschrift: één notitie bij de klantvraag en één bij de startsectie.

const BOX = '/brand/photo/box.png'; // doos, primair (hero); bron docs/huisstijl/beeld/doos.png, licht van linksboven
const SEEDLING = '/brand/photo/seedling.png'; // plantje, op één plek: de sectie Over LIVO APPS; bron docs/huisstijl/beeld/plantje.png
const chainIcons = [Send, FileCheck];

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
      {/* 1. Hero: doelgroep bij de kop, één primaire knop (demo), één tekstlink, het anker klein eronder */}
      <Section tone="canvas" hero>
        <div className={`relative overflow-hidden ${heroPanel} p-6 pb-48 sm:p-8 md:p-12 md:pb-60`}>
          {/* min-w-0 op de kolommen: anders bepaalt de min-content van het registerfragment de kolombreedte en loopt de tekst op 390 px de kaart uit. */}
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="min-w-0">
              <Eyebrow>{t.hero.eyebrow}</Eyebrow>
              <p className="mb-3 text-sm font-semibold text-ink-blue">{t.hero.audience}</p>
              <h1 lang={lang} className={`${h1} [hyphens:auto] sm:[hyphens:manual] lg:text-[3.1rem]`}>
                <GreenTitle title={t.hero.title} green={t.hero.titleGreen} />
              </h1>
              <p className={`mt-6 max-w-lg ${lead}`}>{t.hero.lead}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href={demo} className={btnPrimary}><Mail size={18} aria-hidden="true" />{t.hero.ctaDemo}</a>
                <Link href={`/${lang}#how`} className={textLink}>{t.hero.ctaHow} <ArrowRight size={16} aria-hidden="true" /></Link>
              </div>
              <p className="mt-4 text-sm text-sub">{t.hero.anchor}</p>
            </div>
            <div className="min-w-0">
              <RegisterFragment t={t.hero.visual.register} compact />
              <p className="mt-3 text-right text-xs text-sub">{t.hero.visual.label}</p>
            </div>
          </div>
          {/* De doos steekt uit de hoek linksonder van het heropaneel, deels afgesneden door de rand (overflow-hidden). */}
          <PhotoPlace src={BOX} imgClassName="absolute -bottom-12 -left-8 h-52 w-auto md:-bottom-16 md:-left-12 md:h-72" />
        </div>
      </Section>

      {/* 2. De klantvraag: één herkenbare vraag in een witte kaart; de kaart is het beeld */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>{t.question.eyebrow}</Eyebrow>
            <h2 className={h2}>{t.question.title}</h2>
            <p className={`mt-5 ${lead}`}>{t.question.lead}</p>
          </div>
          <div>
            <div className={`relative ${cardOnWhite} p-8`}>
              <HandNote className="absolute right-7 top-9">{t.question.hand}</HandNote>
              <IconCircle icon={Mail} />
              <p className={`mt-5 ${cardTitle} leading-snug`}>{t.question.card}</p>
            </div>
            <p className="mt-6 text-lg font-medium text-ink">{t.question.closing}</p>
          </div>
        </div>
      </Section>

      {/* 3. Expertise, tijd en geld: drie kaarten met een icoon, vaste volgorde, geen lead of knop */}
      <Section tone="canvas">
        <h2 className={`max-w-3xl ${h2}`}>{t.value.title}</h2>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {t.value.cards.map((c, i) => (
            <li key={c.label} className={`${cardOnCanvas} p-7`}>
              <IconCircle icon={benefitIcons[i] ?? Check} />
              <p className="mt-5 text-xs font-semibold uppercase tracking-[.14em] text-ink-blue">{c.label}</p>
              <h3 className={`mt-3 ${cardTitle}`}>{c.title}</h3>
              <p className={`mt-3 ${cardBody}`}>{c.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4. Productbewijs (#how): drie bewijsregels naast de Register-illustratie */}
      <Section id="how">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>{t.how.eyebrow}</Eyebrow>
            <h2 className={h2}>{t.how.title}</h2>
            <ul className="mt-8 space-y-5">
              {t.how.proofs.map((p) => (
                <li key={p.lead} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent"><Check size={14} className="text-ink" /></span>
                  <p className="text-lg text-ink"><strong className="font-semibold">{p.lead}</strong> <span className="text-sub">{p.body}</span></p>
                </li>
              ))}
            </ul>
            <Link href={`/${lang}/ppwr`} className={`mt-8 ${btnSecondary}`}>{t.how.cta} <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
          <div className="min-w-0">
            <RegisterFragment t={t.hero.visual.register} />
            <p className="mt-3 text-right text-xs text-sub">{t.hero.visual.label}</p>
          </div>
        </div>
      </Section>

      {/* 5. Leveranciers en klanten: twee kaarten als één ketenblok, één expertisezin eronder */}
      <Section tone="canvas">
        <Eyebrow>{t.chain.eyebrow}</Eyebrow>
        <h2 className={`max-w-3xl ${h2}`}>{t.chain.title}</h2>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {t.chain.cards.map((c, i) => (
            <li key={c.title} className={`${cardOnCanvas} p-7`}>
              <IconCircle icon={chainIcons[i] ?? Check} />
              <h3 className={`mt-4 ${cardTitle}`}>{c.title}</h3>
              <p className={`mt-3 ${cardBody}`}>{c.body}</p>
            </li>
          ))}
        </ul>
        <Callout className="mt-10 max-w-3xl text-lg">
          <strong className="font-semibold">{t.chain.expertLead}</strong> {t.chain.expertBody}
        </Callout>
      </Section>

      <PricingPreview lang={lang} t={t.pricing} order={order} pricingEnabled={pricingEnabled} />
      <OnlineSignupSection t={t.start} order={order} />
      <WhitepaperRow t={t.whitepaper} />

      {/* 9. Over LIVO APPS: compact tekstblok, de ontwikkelregel klein. Het plantje staat als randaccent rechtsonder,
          bij de regel over de volgende module; alleen vanaf 1024 px, waar de tekst links ruimte overlaat. */}
      <Section
        id="about"
        tone="canvas"
        className="relative overflow-hidden"
        after={<PhotoPlace src={SEEDLING} imgClassName="absolute -bottom-10 right-[max(1.5rem,calc(50%_-_600px))] hidden h-52 w-auto lg:block" />}
      >
        <Eyebrow>{t.about.eyebrow}</Eyebrow>
        <h2 className={`max-w-3xl ${h2}`}>{t.about.title}</h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink">{t.about.body}</p>
        <p className="mt-6 text-sm text-sub">{t.about.moduleLine}</p>
      </Section>

      {/* 10. Slot: het ene navy moment van de pagina; demo primair, de tijdelijke bestelknop ernaast */}
      <ClosingBand title={t.finalCta.title} center>
        <a href={demo} className={btnPrimary}><Mail size={18} aria-hidden="true" />{t.hero.ctaDemo}</a>
        <OrderButton t={order} className={btnOnNavy} />
      </ClosingBand>

      <Footer lang={lang} dict={t.footer} />
    </div>
  );
}
