import Link from 'next/link';
import { ArrowRight, Check, FileCheck, Mail, Send } from 'lucide-react';
import { getDictionary } from '../get-dictionary';
import { mailto } from '../mailto';
import { socialMetadata } from '../seo';
import Footer from '../components/Footer';
import PhotoPlace from '../components/PhotoPlace';
import RegisterFragment from '../components/RegisterFragment';
import PricingPreview from '../components/PricingPreview';
import OnlineSignupSection from '../components/OnlineSignupSection';
import WhitepaperRow from '../components/WhitepaperRow';
import OrderButton from '../components/OrderButton';

// Homepage v5 (1 oktober 2026), huisstijl v2 uitgesproken. Volgorde: hero, de klantvraag, expertise tijd en
// geld, productbewijs (#how), leveranciers en klanten, prijs (#pricing), start (#start, tijdelijke bestelroute
// per e-mail tot 1 november 2026), whitepaper, over LIVO APPS (#about), slot, footer.
// Copy uit de dictionaries (bron: docs/marketing/website/copy/home.json en nav.json in de product-repo,
// gebouwd uit 06-homepage-tekst-v5-1okt2026.md).
// Beeld: de Register-illustratie (fictieve data, gelabeld) blijft in de hero en bij het productbewijs tot er
// een echte productopname is. De doos linksonder in de hero komt uit de tussentijdse set in docs/huisstijl/beeld/.

const BOX = '/brand/photo/box.png'; // doos, primair (hero); bron docs/huisstijl/beeld/doos.png, licht van linksboven
const chainIcons = [Send, FileCheck];

const h2 = 'font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink md:text-5xl';
const btn = 'inline-flex h-12 items-center gap-2 rounded-control px-6 font-semibold transition-colors duration-150 focus-ring';
const btnPrimary = `${btn} bg-accent text-ink hover:bg-accent-dark`;
const btnSecondary = `${btn} border-[1.5px] border-navy bg-white text-ink hover:bg-canvas`;
const textLink = 'inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-green-text underline-offset-4 hover:underline focus-ring';

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

function Eyebrow({ children }) {
  return <p className="mb-4 text-xs font-semibold uppercase tracking-[.14em] text-ink-blue">{children}</p>;
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
      <section className="bg-canvas px-6 pb-20 pt-16">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-hero border border-line bg-white p-6 pb-48 sm:p-8 md:p-12 md:pb-60">
          {/* min-w-0 op de kolommen: anders bepaalt de min-content van het registerfragment de kolombreedte en loopt de tekst op 390 px de kaart uit. */}
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="min-w-0">
              <Eyebrow>{t.hero.eyebrow}</Eyebrow>
              <p className="mb-3 text-sm font-semibold text-ink-blue">{t.hero.audience}</p>
              <h1 lang={lang} className="font-display text-4xl font-bold leading-[1.04] tracking-tight text-ink [hyphens:auto] sm:[hyphens:manual] sm:text-5xl lg:text-[3.1rem] xl:text-6xl">
                {t.hero.title}
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-blue">{t.hero.lead}</p>
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
          {/* De doos steekt uit de hoek linksonder van de herokaart, deels afgesneden door de kaartrand (overflow-hidden). */}
          <PhotoPlace src={BOX} imgClassName="absolute -bottom-12 -left-8 h-52 w-auto md:-bottom-16 md:-left-12 md:h-72" />
        </div>
      </section>

      {/* 2. De klantvraag: één herkenbare vraag in een witte kaart; de kaart is het beeld */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>{t.question.eyebrow}</Eyebrow>
            <h2 className={h2}>{t.question.title}</h2>
            <p className="mt-5 text-lg text-ink-blue">{t.question.lead}</p>
          </div>
          <div>
            <div className="rounded-card border border-line bg-white p-8">
              <span aria-hidden="true" className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-mint text-accent-dark"><Mail size={24} /></span>
              <p className="mt-5 font-display text-2xl font-bold leading-snug text-ink">{t.question.card}</p>
            </div>
            <p className="mt-6 text-lg font-medium text-ink">{t.question.closing}</p>
          </div>
        </div>
      </section>

      {/* 3. Expertise, tijd en geld: drie kaarten, vaste volgorde, geen lead of knop */}
      <section className="bg-canvas px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className={`max-w-3xl ${h2}`}>{t.value.title}</h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {t.value.cards.map((c) => (
              <li key={c.label} className="rounded-card bg-white p-7 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[.14em] text-ink-blue">{c.label}</p>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-ink">{c.title}</h3>
                <p className="mt-3 text-sub">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Productbewijs (#how): drie bewijsregels naast de Register-illustratie */}
      <section id="how" className="scroll-mt-20 bg-white px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
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
      </section>

      {/* 5. Leveranciers en klanten: twee kaarten als één ketenblok, één expertisezin eronder */}
      <section className="bg-canvas px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>{t.chain.eyebrow}</Eyebrow>
          <h2 className={`max-w-3xl ${h2}`}>{t.chain.title}</h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {t.chain.cards.map((c, i) => {
              const Icon = chainIcons[i] ?? Check;
              return (
                <li key={c.title} className="rounded-card bg-white p-7 shadow-soft">
                  <span aria-hidden="true" className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-mint text-accent-dark"><Icon size={24} /></span>
                  <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-ink">{c.title}</h3>
                  <p className="mt-3 text-sub">{c.body}</p>
                </li>
              );
            })}
          </ul>
          <p className="mt-10 max-w-3xl rounded-card border-l-4 border-accent bg-white px-6 py-5 text-lg text-ink">
            <strong className="font-semibold">{t.chain.expertLead}</strong> {t.chain.expertBody}
          </p>
        </div>
      </section>

      <PricingPreview lang={lang} t={t.pricing} order={order} pricingEnabled={pricingEnabled} />
      <OnlineSignupSection t={t.start} order={order} />
      <WhitepaperRow t={t.whitepaper} />

      {/* 9. Over LIVO APPS: compact tekstblok, de ontwikkelregel klein */}
      <section id="about" className="scroll-mt-20 bg-canvas px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>{t.about.eyebrow}</Eyebrow>
          <h2 className={`max-w-3xl ${h2}`}>{t.about.title}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink">{t.about.body}</p>
          <p className="mt-6 text-sm text-sub">{t.about.moduleLine}</p>
        </div>
      </section>

      {/* 10. Slot: het ene navy moment van de pagina; demo primair, de tijdelijke bestelknop ernaast */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-hero bg-navy px-8 py-14 text-center text-white md:px-12">
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight md:text-4xl">{t.finalCta.title}</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={demo} className={btnPrimary}><Mail size={18} aria-hidden="true" />{t.hero.ctaDemo}</a>
            <OrderButton t={order} className={`${btn} bg-white text-ink hover:bg-canvas`} />
          </div>
        </div>
      </section>

      <Footer lang={lang} dict={t.footer} />
    </div>
  );
}
