import Link from 'next/link';
import { ArrowRight, Mail, Package, Layers, Globe, FileCheck, Clock, MessageSquareWarning, FileSearch, Users } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import RegisterFragment from '../../components/RegisterFragment';
import HandNote from '../../components/HandNote';
import PhotoPlace from '../../components/PhotoPlace';
import StatusPill from '../../components/StatusPill';
import SupplierCycle from '../../components/SupplierCycle';
import WhitepaperObject from '../../components/WhitepaperObject';
import { ImportVisual, StatusVisual, CycleVisual, FileVisual } from '../../components/FeatureVisuals';
import { getDictionary } from '../../get-dictionary';
import { socialMetadata } from '../../seo';

// Productpagina LIVO PPWR, ontwerp v2 (17 september 2026): ruggengraat is de flyer 2026-09-17
// (probleem, kosten, wat LIVO verandert, walkthrough), uitgebreid waar een pagina meer ruimte heeft.
// Alle tekst uit de dictionaries (bron: docs/marketing/website/copy/ppwr.json). Geen schaduw op canvas-kaarten.
const SEEDLING = '/brand/photo/seedling.png';
const factorIcons = [Package, Layers, Globe, FileCheck];
const costIcons = [Clock, MessageSquareWarning, FileSearch, Users];
const eyebrow = 'mb-4 text-xs font-semibold uppercase tracking-[.14em] text-ink-blue';
const h2 = 'font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink md:text-5xl';
const btn = 'inline-flex h-12 items-center gap-2 rounded-control px-6 font-semibold transition-colors duration-150 focus-ring';
const mailto = (subject, body) => `mailto:hello@livoapps.software?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang);
  const { title, description } = dict.ppwr.meta;
  return { title, description, alternates: { canonical: `/${params.lang}/ppwr`, languages: { en: '/en/ppwr', nl: '/nl/ppwr' } }, ...socialMetadata({ title, description }) };
}

export default async function PpwrPage({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const t = dict.ppwr;
  const register = { ...dict.home.hero.visual.register, tenant: t.hero.registerTenant };
  const pricing = dict.home.pricing;
  const walkthrough = mailto(t.hero.walkthroughSubject, t.hero.walkthroughBody);
  const statusRows = register.rows.map((r) => ({ status: r.status, tone: r.tone }));
  const fileLabels = [[t.changes.fileInputs[0], t.changes.fileInputs[1], t.changes.fileInputs[2]], { title: t.changes.fileTitle, badge: t.changes.fileBadge, rows: t.changes.fileRows }, t.changes.fileOutputs];
  const visuals = [<ImportVisual key="v1" />, <StatusVisual key="v2" rows={statusRows} />, <CycleVisual key="v3" t={t.cycle} />, <FileVisual key="v4" labels={fileLabels} />];

  return (
    <div className="bg-canvas">
      <Breadcrumb items={[{ label: t.breadcrumb[0], href: `/${lang}` }, { label: t.breadcrumb[1], href: `/${lang}/ppwr` }, { label: t.breadcrumb[2] }]} />

      {/* 1. Hero, licht: kop met één groen woord, lead uit de flyer, het echte Register-fragment */}
      <section className="px-6 pb-20 pt-4">
        <div className="mx-auto max-w-7xl rounded-hero border border-line bg-white p-6 sm:p-8 md:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="min-w-0">
              <p className={eyebrow}>{t.hero.eyebrow}</p>
              <p className="mb-3 text-sm font-semibold text-ink-blue">{t.hero.apply}</p>
              <h1 lang={lang} className="font-display text-4xl font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem] xl:text-6xl">
                {t.hero.titleBefore}<span className="text-green-heading">{t.hero.titleGreen}</span>{t.hero.titleAfter}
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-blue">{t.hero.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/${lang}#pricing`} className={`${btn} bg-accent text-ink hover:bg-accent-dark`}>{t.hero.ctaPrimary} <ArrowRight size={18} aria-hidden="true" /></Link>
                <a href={walkthrough} className={`${btn} border-[1.5px] border-navy bg-white text-ink hover:bg-canvas`}><Mail size={18} aria-hidden="true" />{t.hero.ctaWalkthrough}</a>
              </div>
            </div>
            <div className="min-w-0">
              <RegisterFragment t={register} />
              <p className="mt-3 text-right text-xs text-sub">{t.hero.illustration}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why the work grows: vier factoren en de spreadsheetzin */}
      <section id="grows" className="scroll-mt-20 px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrow}>{t.grows.eyebrow}</p>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h2 className={h2}>{t.grows.title}</h2>
            <p className="text-lg text-ink-blue">{t.grows.lead}</p>
          </div>
          <div className="mt-12 grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
            {t.grows.factors.map((f, i) => {
              const Icon = factorIcons[i];
              return (
                <div key={f.title} className="contents">
                  <div className="rounded-card border border-line bg-white p-6">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-mint text-green-text"><Icon size={24} aria-hidden="true" /></span>
                    <p className="mt-5 font-display text-xl font-bold text-ink">{f.title}</p>
                    <p className="mt-2 text-sm text-sub">{f.body}</p>
                  </div>
                  {i < 3 && <span aria-hidden="true" className="hidden items-center justify-center px-1 font-display text-3xl font-bold text-accent-dark lg:flex">×</span>}
                </div>
              );
            })}
          </div>
          <div className="mt-6 grid items-center gap-4 rounded-card border border-line bg-white p-6 md:grid-cols-[auto_1fr] md:gap-8">
            <p className="max-w-xs font-display text-xl font-bold text-ink">{t.grows.resultTitle}</p>
            <p className="text-sub">{t.grows.resultBody} <HandNote className="ml-2 align-baseline">{t.grows.note}</HandNote></p>
          </div>
        </div>
      </section>

      {/* 3. What this costs you */}
      <section id="costs" className="scroll-mt-20 bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrow}>{t.costs.eyebrow}</p>
          <h2 className={`${h2} max-w-3xl`}>{t.costs.title}</h2>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {t.costs.items.map((c, i) => {
              const Icon = costIcons[i];
              return (
                <li key={c.title} className="grid grid-cols-[auto_1fr] gap-4 rounded-card border border-line bg-white p-6">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-mint text-green-text"><Icon size={22} aria-hidden="true" /></span>
                  <div><p className="font-display text-lg font-bold text-ink">{c.title}</p><p className="mt-1.5 text-sm text-sub">{c.body}</p></div>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 rounded-r-control border-l-4 border-accent bg-mint px-6 py-4 font-display text-lg font-bold text-ink">{t.costs.transition}</p>
        </div>
      </section>

      {/* 4. What LIVO changes: vier features met de vier illustraties, elk met de status Live */}
      <section id="changes" className="scroll-mt-20 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrow}>{t.changes.eyebrow}</p>
          <h2 className={`${h2} max-w-3xl`}>{t.changes.title}</h2>
          <p className="mt-5 font-display text-lg font-bold text-green-text">{t.changes.benefit}</p>
          <p className="mt-2 max-w-3xl text-lg text-ink-blue">{t.changes.lead}</p>
          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2">
            {t.changes.features.map((f, i) => (
              <article key={f.title} className="min-w-0 rounded-card border border-line bg-white p-6">
                {visuals[i]}
                <div className="mt-5 flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[.12em] text-ink-blue">{f.tag}</p>
                  <StatusPill tone="success">{t.changes.live}</StatusPill>
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold text-ink">{f.title}</h3>
                <p className="mt-3 text-sub">{f.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-3 text-right text-xs text-sub">{t.hero.illustration}</p>
        </div>
      </section>

      {/* 5. Supplier round als cirkel */}
      <SupplierCycle t={t.cycle} />

      {/* 6. For whom: vragen, geen functieclaims */}
      <section id="for-whom" className="scroll-mt-20 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrow}>{t.forWhom.eyebrow}</p>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h2 className={h2}>{t.forWhom.title}</h2>
            <p className="text-lg text-ink-blue">{t.forWhom.lead}</p>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.forWhom.cards.map((c) => (
              <li key={c.title} className="rounded-card border border-line bg-white p-6">
                <p className="font-display text-lg font-bold text-ink">{c.title}</p>
                <p className="mt-2 text-sm text-sub">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Pricing: drie regels en één knop naar de prijssectie op de homepage */}
      <section id="pricing" className="scroll-mt-20 bg-white px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className={eyebrow}>{pricing.eyebrow}</p>
            <h2 className={h2}>{pricing.title}</h2>
          </div>
          <div className="rounded-hero bg-mint p-8">
            <ul className="space-y-3">
              {pricing.lines.map((l) => (
                <li key={l} className="flex items-start gap-3 text-lg font-medium text-ink"><span aria-hidden="true" className="mt-2 inline-block h-2.5 w-2.5 flex-none rounded-full bg-accent" />{l}</li>
              ))}
            </ul>
            <div className="mt-8"><Link href={`/${lang}#pricing`} className={`${btn} bg-accent text-ink hover:bg-accent-dark`}>{t.pricing.cta} <ArrowRight size={18} aria-hidden="true" /></Link></div>
          </div>
        </div>
      </section>

      <WhitepaperObject lang={lang} t={dict.home.whitepaper} />

      {/* Slot: walkthrough-CTA als navy band met plantje */}
      <section className="px-6 pb-24 pt-4">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-hero bg-navy px-8 py-12 text-white md:px-12">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto] md:pr-44">
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">{t.closing.title}</h2>
              <p className="mt-4 max-w-xl text-white/80">{t.closing.lead}</p>
              <a href={walkthrough} className={`${btn} mt-8 bg-accent text-ink hover:bg-accent-dark`}><Mail size={18} aria-hidden="true" />{t.closing.cta}</a>
            </div>
            <div className="text-sm md:text-right"><b className="block font-semibold text-accent">{t.closing.site}</b><a href="mailto:hello@livoapps.software" className="text-white/80 hover:text-white">{t.closing.mail}</a></div>
          </div>
          <PhotoPlace src={SEEDLING} imgClassName="pointer-events-none absolute -bottom-10 -right-6 hidden h-52 w-auto md:block" />
        </div>
        <p className="mx-auto mt-8 max-w-7xl text-xs text-sub">{t.footer.line}</p>
      </section>
    </div>
  );
}
