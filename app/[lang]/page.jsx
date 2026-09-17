import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getDictionary } from '../get-dictionary';
import { BOOKINGS_URL, bookingLinkProps } from '../booking';
import { socialMetadata } from '../seo';
import Footer from '../components/Footer';
import HeroFlow from '../components/HeroFlow';
import HandNote from '../components/HandNote';
import PhotoPlace from '../components/PhotoPlace';
import RequestFlow from '../components/RequestFlow';
import AttentionSection from '../components/AttentionSection';
import SupplierRound from '../components/SupplierRound';
import ProductCard from '../components/ProductCard';
import PricingPreview from '../components/PricingPreview';
import WhitepaperObject from '../components/WhitepaperObject';
import OnlineSignupSection from '../components/OnlineSignupSection';

// Homepage, huisstijl v2 uitgesproken (stap c, 17 sep 2026): lichte hero met de inputs-visual naar het echte
// Register, request-flow, "see what needs attention", supplier round, productfamilie zonder datum, prijs in
// drie regels en één knop, whitepaper als object zonder werkend formulier, aankoop als uitleg, about, footer.
// Copy uit de dictionaries (bron: docs/marketing/website/copy/home.json in de product-repo).
// Fotoplekken: de doos (primair) linksonder in de hero en het plantje op één plek (next module), beide uit de
// tussentijdse gegenereerde set in docs/huisstijl/beeld/ (uitzondering in het besluit huisstijl v2); etiket en blad nog leeg.

const SEEDLING = '/brand/photo/seedling.png'; // plantje: supplier round en next module (het etiket bestaat nog niet)
const BOX = '/brand/photo/box.png'; // doos, primair (hero); bron docs/huisstijl/beeld/doos.png, licht van linksboven

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
  const pricingEnabled = process.env.PRICING_PAGE_ENABLED === 'true';

  return (
    <div className="font-sans text-ink">
      {/* Hero: licht, inputs naar het Register */}
      <section className="bg-canvas px-6 pb-20 pt-16">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-hero border border-line bg-white p-6 pb-48 sm:p-8 md:p-12 md:pb-60">
          {/* min-w-0 op de kolommen: anders bepaalt de min-content van het registerfragment de kolombreedte en loopt de tekst op 390 px de kaart uit. */}
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)]">
            <div className="min-w-0">
              <Eyebrow>{t.hero.brandLine}</Eyebrow>
              <h1 lang={lang} className="font-display text-4xl font-bold leading-[1.04] tracking-tight text-ink [hyphens:auto] sm:text-5xl md:text-6xl">
                {t.hero.titleBefore}<span className="text-green-heading">{t.hero.titleGreen}</span>{t.hero.titleAfter}
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-blue">{t.hero.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/${lang}#pricing`} className="inline-flex h-12 items-center gap-2 rounded-control bg-accent px-6 font-semibold text-ink transition-colors duration-150 hover:bg-accent-dark focus-ring">{t.hero.ctaPrimary} <ArrowRight size={18} aria-hidden="true" /></Link>
                <Link href={`/${lang}/ppwr`} className="inline-flex h-12 items-center rounded-control border-[1.5px] border-navy bg-white px-6 font-semibold text-ink transition-colors duration-150 hover:bg-canvas focus-ring">{t.hero.ctaSecondary}</Link>
              </div>
              <p className="mt-7"><HandNote>{t.hero.note}</HandNote></p>
              <p className="mt-6 text-sm text-sub">{t.hero.roadmap}</p>
            </div>
            <HeroFlow t={t.hero.visual} />
          </div>
          {/* De doos steekt uit de hoek linksonder van de herokaart, deels afgesneden door de kaartrand (overflow-hidden). */}
          <PhotoPlace src={BOX} imgClassName="absolute -bottom-12 -left-8 h-52 w-auto md:-bottom-16 md:-left-12 md:h-72" />
        </div>
      </section>

      <RequestFlow t={t.requestFlow} />
      <AttentionSection lang={lang} t={t.attention} register={t.hero.visual.register} />
      <SupplierRound t={t.supplierRound} photoSrc={SEEDLING} />

      {/* Productfamilie */}
      <section id="products" className="scroll-mt-20 bg-canvas px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>{t.products.eyebrow}</Eyebrow>
          <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <h2 className="font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink md:text-5xl">{t.products.title}</h2>
            <p className="text-lg text-ink-blue">{t.products.lead}</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <ProductCard lang={lang} variant="ppwr" t={t.products.ppwr} />
            <ProductCard lang={lang} variant="next" t={t.products.next} />
          </div>
        </div>
      </section>

      <PricingPreview lang={lang} t={t.pricing} pricingEnabled={pricingEnabled} />
      <WhitepaperObject lang={lang} t={t.whitepaper} />
      <OnlineSignupSection t={t.start} />

      {/* About */}
      <section id="about" className="scroll-mt-20 bg-canvas px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>{t.about.eyebrow}</Eyebrow>
          <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink md:text-5xl">{t.about.title}</h2>
          <p className="mt-5 max-w-3xl text-lg text-ink-blue">{t.about.lead}</p>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {t.about.principles.map((p) => (
              <li key={p.title} className="rounded-card bg-white p-7 shadow-soft">
                <h3 className="font-display text-xl font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm text-sub">{p.body}</p>
              </li>
            ))}
          </ul>
          <h3 className="mt-14 font-display text-2xl font-bold text-ink">{t.about.traitsTitle}</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {t.about.traits.map((tr) => (
              <li key={tr.title} className="rounded-card bg-white px-5 py-4 shadow-soft">
                <p className="font-display font-bold text-ink">{tr.title}</p>
                <p className="text-sm text-sub">{tr.sub}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Next module: geen datum, geen eigenschappen; het plantje als randaccent (één plek) */}
      <section className="relative overflow-hidden bg-white px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_auto_200px]">
          <div>
            <Eyebrow>{t.nextModule.eyebrow}</Eyebrow>
            <h2 className="font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink">{t.nextModule.title}</h2>
            <p className="mt-4 max-w-3xl text-lg text-sub">{t.nextModule.body}</p>
          </div>
          <a href="mailto:hello@livoapps.software?subject=Next%20LIVO%20module" className="inline-flex h-12 items-center gap-2 rounded-control border-[1.5px] border-navy px-6 font-semibold text-ink transition-colors duration-150 hover:bg-canvas focus-ring">{t.nextModule.cta} <ArrowRight size={16} aria-hidden="true" /></a>
          <PhotoPlace src={SEEDLING} imgClassName="h-44 w-auto justify-self-end" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-canvas px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink md:text-5xl">{t.finalCta.title}</h2>
          <p className="mt-5 text-lg text-ink-blue">{t.finalCta.body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={`/${lang}#pricing`} className="inline-flex h-12 items-center gap-2 rounded-control bg-accent px-6 font-semibold text-ink transition-colors duration-150 hover:bg-accent-dark focus-ring">{t.finalCta.ctaPricing} <ArrowRight size={18} aria-hidden="true" /></Link>
            <a href={BOOKINGS_URL} {...bookingLinkProps} className="inline-flex h-12 items-center rounded-control border-[1.5px] border-navy bg-white px-6 font-semibold text-ink transition-colors duration-150 hover:bg-canvas focus-ring">{t.finalCta.ctaDemo}</a>
          </div>
        </div>
      </section>

      <Footer lang={lang} dict={t.footer} />
    </div>
  );
}
