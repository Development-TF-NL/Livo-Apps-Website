import Link from 'next/link';
import { ArrowRight, Mail, Package, Layers, Globe, FileCheck, Clock, MessageSquareWarning, FileSearch, Users } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import RegisterFragment from '../../components/RegisterFragment';
import HandNote from '../../components/HandNote';
import StatusPill from '../../components/StatusPill';
import SupplierCycle from '../../components/SupplierCycle';
import Footer from '../../components/Footer';
import { ImportVisual, StatusVisual, CycleVisual, FileVisual } from '../../components/FeatureVisuals';
import { getDictionary } from '../../get-dictionary';
import { mailto } from '../../mailto';
import { languageAlternates, socialMetadata } from '../../seo';
import { Section, Eyebrow, IconCircle, Callout, ClosingBand, h1, h2, lead, cardTitle, cardTitleSmall, cardBody, btnPrimary, heroPanel, cardOnCanvas, cardOnWhite, promoPanel } from '../../components/ui';

// Productpagina LIVO PPWR, ontwerp v2 (17 september 2026): ruggengraat is de flyer 2026-09-17
// (probleem, kosten, wat LIVO verandert, demo), uitgebreid waar een pagina meer ruimte heeft.
// Hero (M1, 7 oktober 2026): één demoaanvraag per e-mail. Whitepaperpromotie wacht op de inhoudelijke review.
// Alle tekst uit de dictionaries (bron: docs/marketing/website/copy/ppwr.json).
// Vorm (1 oktober 2026): de gedeelde bouwstenen uit components/ui.jsx. Na de hero wisselen wit en canvas elkaar af;
// kaarten op canvas dragen de schaduw, kaarten op wit een rand; nergens meer dan twee kaarten naast elkaar.
const factorIcons = [Package, Layers, Globe, FileCheck];
const costIcons = [Clock, MessageSquareWarning, FileSearch, Users];

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang);
  const { title, description } = dict.ppwr.meta;
  return { title, description, alternates: { canonical: `/${params.lang}/ppwr`, languages: languageAlternates('/ppwr') }, ...socialMetadata({ title, description, lang: params.lang }) };
}

export default async function PpwrPage({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const t = dict.ppwr;
  const register = { ...dict.home.hero.visual.register, tenant: t.hero.registerTenant };
  const pricing = dict.home.pricing;
  const pricingEnabled = process.env.PRICING_PAGE_ENABLED === 'true';
  const demo = mailto(t.hero.demoSubject, t.hero.demoBody);
  const statusRows = register.rows.map((r) => ({ status: r.status, tone: r.tone }));
  const fileLabels = [[t.changes.fileInputs[0], t.changes.fileInputs[1], t.changes.fileInputs[2]], { title: t.changes.fileTitle, badge: t.changes.fileBadge, rows: t.changes.fileRows }, t.changes.fileOutputs];
  const visuals = [<ImportVisual key="v1" />, <StatusVisual key="v2" rows={statusRows} />, <CycleVisual key="v3" t={t.cycle} />, <FileVisual key="v4" labels={fileLabels} />];

  return (
    <div className="bg-canvas">
      <Breadcrumb items={[{ label: t.breadcrumb[0], href: `/${lang}` }, { label: t.breadcrumb[1], href: `/${lang}/ppwr` }, { label: t.breadcrumb[2] }]} />

      {/* 1. Hero, licht: kop met één groen woord, lead uit de flyer, het echte Register-fragment */}
      <Section tone="canvas" className="!pt-2 md:!pt-2">
        <div className={`${heroPanel} p-6 sm:p-8 md:p-12`}>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="min-w-0">
              <Eyebrow>{t.hero.eyebrow}</Eyebrow>
              <p className="mb-3 text-sm font-semibold text-ink-blue">{t.hero.apply}</p>
              <h1 lang={lang} className={`${h1} lg:text-[3.4rem]`}>
                {t.hero.titleBefore}<span className="text-green-heading">{t.hero.titleGreen}</span>{t.hero.titleAfter}
              </h1>
              <p className={`mt-6 max-w-lg ${lead}`}>{t.hero.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={demo} className={btnPrimary}><Mail size={18} aria-hidden="true" />{t.hero.ctaDemo}</a>
              </div>
            </div>
            <div className="min-w-0">
              <RegisterFragment t={register} />
              <p className="mt-3 text-right text-xs text-sub">{t.hero.illustration}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 2. Why the work grows: vier factoren, twee bij twee met het maalteken ertussen, en de spreadsheetzin */}
      <Section id="grows">
        <Eyebrow>{t.grows.eyebrow}</Eyebrow>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <h2 className={h2}>{t.grows.title}</h2>
          <p className={lead}>{t.grows.lead}</p>
        </div>
        <div className="mt-12 grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr]">
          {t.grows.factors.map((f, i) => (
            <div key={f.title} className="contents">
              <div className={`${cardOnWhite} p-6`}>
                <IconCircle icon={factorIcons[i]} />
                <p className={`mt-5 ${cardTitle}`}>{f.title}</p>
                <p className={`mt-2 ${cardBody}`}>{f.body}</p>
              </div>
              {/* Het maalteken: tussen de kaarten op een rij, en gecentreerd tussen de twee rijen. Alleen op desktop. */}
              {i < 3 && <span aria-hidden="true" className={`hidden items-center justify-center px-1 font-display text-3xl font-bold text-accent-dark lg:flex ${i === 1 ? 'lg:col-span-3' : ''}`}>×</span>}
            </div>
          ))}
        </div>
        <div className={`mt-6 grid items-center gap-4 ${cardOnWhite} p-6 md:grid-cols-[auto_1fr] md:gap-8`}>
          <p className={`max-w-xs ${cardTitleSmall}`}>{t.grows.resultTitle}</p>
          <p className={cardBody}>{t.grows.resultBody} <HandNote className="ml-2 align-baseline">{t.grows.note}</HandNote></p>
        </div>
      </Section>

      {/* 3. What this costs you */}
      <Section id="costs" tone="canvas">
        <Eyebrow>{t.costs.eyebrow}</Eyebrow>
        <h2 className={`${h2} max-w-3xl`}>{t.costs.title}</h2>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {t.costs.items.map((c, i) => (
            <li key={c.title} className={`grid grid-cols-[auto_1fr] gap-4 ${cardOnCanvas} p-6`}>
              <IconCircle icon={costIcons[i]} />
              <div><p className={cardTitleSmall}>{c.title}</p><p className={`mt-1.5 ${cardBody}`}>{c.body}</p></div>
            </li>
          ))}
        </ul>
        <Callout className="mt-8 font-display text-lg font-bold">{t.costs.transition} <HandNote className="ml-2 align-baseline">{t.costs.hand}</HandNote></Callout>
      </Section>

      {/* 4. What LIVO changes: vier features met de vier illustraties, elk met de status Live */}
      <Section id="changes">
        <Eyebrow>{t.changes.eyebrow}</Eyebrow>
        <h2 className={`${h2} max-w-3xl`}>{t.changes.title}</h2>
        <p className="mt-5 font-display text-lg font-bold text-green-text">{t.changes.benefit}</p>
        <p className={`mt-2 max-w-3xl ${lead}`}>{t.changes.lead}</p>
        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2">
          {t.changes.features.map((f, i) => (
            <article key={f.title} className={`min-w-0 ${cardOnWhite} p-6`}>
              {visuals[i]}
              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[.12em] text-ink-blue">{f.tag}</p>
                <StatusPill tone="success">{t.changes.live}</StatusPill>
              </div>
              <h3 className={`mt-2 ${cardTitle}`}>{f.title}</h3>
              <p className={`mt-3 ${cardBody}`}>{f.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-right text-xs text-sub">{t.hero.illustration}</p>
      </Section>

      {/* 5. Supplier round als cirkel */}
      <SupplierCycle t={t.cycle} />

      {/* 6. For whom: vragen, geen functieclaims; twee bij twee */}
      <Section id="for-whom">
        <Eyebrow>{t.forWhom.eyebrow}</Eyebrow>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <h2 className={h2}>{t.forWhom.title}</h2>
          <p className={lead}>{t.forWhom.lead}</p>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {t.forWhom.cards.map((c) => (
            <li key={c.title} className={`${cardOnWhite} p-6`}>
              <p className={cardTitleSmall}>{c.title}</p>
              <p className={`mt-2 ${cardBody}`}>{c.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-right"><HandNote>{t.forWhom.hand}</HandNote></p>
      </Section>

      {/* 7. Pricing: drie regels en één knop. De knop volgt de poort, net als menu en footer:
          open (PRICING_PAGE_ENABLED) naar de prijspagina, dicht naar het prijsblok op de homepage. */}
      <Section id="pricing" tone="canvas">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>{pricing.eyebrow}</Eyebrow>
            <h2 className={h2}>{pricing.title}</h2>
          </div>
          <div className={`${promoPanel} p-8`}>
            <ul className="space-y-3">
              {pricing.lines.map((l) => (
                <li key={l} className="flex items-start gap-3 text-lg font-medium text-ink"><span aria-hidden="true" className="mt-2 inline-block h-2.5 w-2.5 flex-none rounded-full bg-accent" />{l}</li>
              ))}
            </ul>
            <div className="mt-8"><Link href={pricingEnabled ? `/${lang}/pricing` : `/${lang}#pricing`} className={btnPrimary}>{t.pricing.cta} <ArrowRight size={18} aria-hidden="true" /></Link></div>
          </div>
        </div>
      </Section>

      {/* Slot: het ene navy moment van de pagina. De voetregel staat in de gedeelde footer. */}
      <ClosingBand
        tone="canvas"
        title={t.closing.title}
        lead={t.closing.lead}
        aside={<div className="text-sm md:text-right"><b className="block font-semibold text-accent">{t.closing.site}</b><a href="mailto:hello@livoapps.software" className="inline-flex min-h-[44px] items-center rounded text-white/80 transition-colors duration-150 hover:text-white focus-ring">{t.closing.mail}</a></div>}
      >
        <a href={demo} className={btnPrimary}><Mail size={18} aria-hidden="true" />{t.closing.cta}</a>
      </ClosingBand>

      <Footer lang={lang} dict={dict.home.footer} />
    </div>
  );
}
