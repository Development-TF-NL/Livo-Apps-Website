import Link from 'next/link';
import { ArrowRight, Check, FileText, Info, LifeBuoy, Mail, Play, Search, ShieldCheck, Users, Wrench } from 'lucide-react';
import { getDictionary } from '../get-dictionary';
import { mailto } from '../mailto';
import { languageAlternates, socialMetadata } from '../seo';
import { ARTICLES, articlePath } from '../content/kennis';
import Footer from '../components/Footer';
import HeroArt from '../components/home/HeroArt';
import WorkflowDemo from '../components/home/WorkflowDemo';
import AudienceTabs from '../components/home/AudienceTabs';
import PlanCards from '../components/home/PlanCards';
import Faq from '../components/home/Faq';
import { Section, Eyebrow, GreenTitle, container, h1, h2, btnLarge, btnPrimary, btnSecondary, textLink } from '../components/ui';

// Homepage op het landingspagina-concept (keuze eigenaar 29 oktober 2026, LIVO_Landingspagina.html): hero met de vaasfoto, de
// klantvraag en de artikelkaart; de basisstrip; Herkenbaar? (met de kop van de eigenaar over verdrinken in de regelgeving);
// de werkwijze als interactief productvoorbeeld op donkergroen (#werkwijze); LIVO zet klaar tegenover Jij beslist; voor wie als tabs
// (#voor-wie); de prijskaarten (#prijzen); de vragen (#vragen); de kennisingang; Over LIVO APPS (#about, de goedgekeurde tekst van M2);
// het hulpblok op donkergroen (#hulp; besluit eigenaar 29 oktober avond: planselectie voorop, demo mogelijk maar niet verplicht, hulp op elk
// moment bij keuze, inrichting en vragen) in plaats van het demoformulier van het concept (dat verstuurde niets). Alle tekst uit de
// dictionaries (bron: docs/marketing/website/copy/home.json, nav.json, ppwr.json en pricing.json in de product-repo).
const icons = { strip: [FileText, Users, ShieldCheck], help: [LifeBuoy, Wrench, Mail] };
const ic = { strokeWidth: 1.6, 'aria-hidden': true };

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang);
  const { title, description } = dict.home.meta;
  return { title, description, alternates: { canonical: `/${params.lang}`, languages: languageAlternates() }, ...socialMetadata({ title, description, lang: params.lang, path: `/${params.lang}` }) };
}

export default async function HomePage({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const t = dict.home;
  const demo = dict.ppwr.hero;
  const demoHref = mailto(demo.demoSubject, demo.demoBody);
  const pricingEnabled = process.env.PRICING_PAGE_ENABLED === 'true';
  const pricingHref = pricingEnabled ? `/${lang}/pricing#plans` : `/${lang}#prijzen`;
  const Lines = ({ lines, green, className = '' }) => (
    <>{lines.map((l) => <span key={l} className={className}>{l}<br /></span>)}<span className="text-green-heading">{green}</span></>
  );

  return (
    <div className="bg-paper font-sans text-ink">
      <main id="main">
        {/* Hero: kop in drie regels met de groene derde regel, lead, demoknop en werkwijze-link, de prijsregel; rechts het beeld */}
        <div className={`${container} grid items-center gap-9 pb-10 pt-10 lg:min-h-[690px] lg:grid-cols-[1.04fr_1fr] lg:gap-10 lg:pb-[72px] lg:pt-[70px]`}>
          <div className="relative z-[2]">
            <Eyebrow dot>{t.hero.eyebrow}</Eyebrow>
            <h1 lang={lang} className={h1}><Lines lines={t.hero.lines} green={t.hero.titleGreen} /></h1>
            <p className={`mt-6 max-w-[480px] text-sm leading-[1.8] text-sub md:text-base md:leading-[1.75]`}>{t.hero.lead}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-4 max-[370px]:flex-col max-[370px]:items-start">
              <Link href={pricingHref} className={btnLarge}>{t.hero.ctaPrimary} <ArrowRight size={18} {...ic} /></Link>
              <Link href={`/${lang}#werkwijze`} className="inline-flex min-h-[44px] items-center gap-2.5 text-xs font-semibold text-ink hover:text-green-text focus-ring rounded"><span className="grid h-[29px] w-[29px] place-items-center rounded-full border border-frame-line/80"><Play size={14} strokeWidth={1.4} aria-hidden="true" /></span>{t.hero.ctaHow}</Link>
            </div>
            <p className="mt-5 text-[11px] font-medium text-sub md:text-xs">{t.hero.support}</p>
          </div>
          <HeroArt t={t.hero} lang={lang} />
        </div>

        {/* De basisstrip: drie regels met een icoon tussen twee lijnen */}
        <div className={`${container} grid gap-4 border-y border-line py-6 md:flex md:justify-between md:gap-6`} aria-label={t.strip.join(', ')}>
          {t.strip.map((s, i) => { const I = icons.strip[i]; return <span key={s} className="flex items-center gap-3 text-xs font-medium"><I size={20} {...ic} className="text-accent-dark" />{s}</span>; })}
        </div>

        {/* Herkenbaar?: de kop van de eigenaar, de oude kop als eerste regel, de verspreide bestanden als chips */}
        <Section>
          <div className="grid gap-6 md:grid-cols-2 md:gap-12 lg:gap-[90px]">
            <div><Eyebrow>{t.problem.eyebrow}</Eyebrow><h2 className={`${h2} md:text-[41px]`}><GreenTitle title={t.problem.title} green={t.problem.titleGreen} /></h2></div>
            <div className="md:pt-3">
              <p className="font-display text-[22px] font-bold leading-tight tracking-heading text-ink md:text-[26px]">{t.problem.intro}</p>
              <p className="mt-4 text-sm leading-[1.85] md:text-base md:leading-[1.8]">{t.problem.body}</p>
              <p className="mt-3 text-[13px] text-sub md:text-sm">{t.problem.muted}</p>
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                {t.problem.files.map((f, i) => { const I = i === 1 ? Mail : FileText; return <span key={f} className={`flex items-center gap-2 rounded-[5px] border border-frame bg-white px-2.5 py-2 text-[10px] text-sub ${i === 1 ? 'rotate-2' : '-rotate-2'}`}><I size={14} {...ic} />{f}</span>; })}
              </div>
            </div>
          </div>
        </Section>

        {/* Werkwijze op donkergroen: kop, de drie stappen en het interactieve productvenster, de notitie eronder */}
        <section id="werkwijze" className="relative overflow-hidden bg-navy pb-7 pt-14 text-on-dark md:pb-11 md:pt-[83px]">
          <span aria-hidden="true" className="pointer-events-none absolute -right-[140px] -top-[240px] h-[600px] w-[600px] rounded-full border border-on-dark/10" />
          <div className={container}>
            <div className="mb-7 md:mb-12 md:flex md:items-end md:justify-between md:gap-10">
              <div><Eyebrow className="text-on-dark-accent">{t.workflow.eyebrow}</Eyebrow><h2 className={`${h2Dark} max-w-3xl`}>{t.workflow.title}</h2></div>
              <p className="mt-4 max-w-xs text-xs leading-[1.8] text-on-dark-sub md:mt-0 md:pb-1.5 md:text-[13px]">{t.workflow.aside}</p>
            </div>
            <WorkflowDemo t={t.workflow} />
            <p className="mt-7 flex items-start gap-2.5 border-t border-on-dark/15 pt-5 text-[9px] leading-[1.8] text-on-dark-sub md:mt-11 md:text-[10px]"><Info size={15} {...ic} className="mt-0.5 flex-none" />{t.workflow.note}</p>
          </div>
        </section>

        {/* Het onderscheid in drie kolommen: wat LIVO signaleert, wat LIVO voorbereidt, wat jij deelt, beoordeelt en bevestigt; geen beloften over mailen, bewijs of verantwoordelijkheid */}
        <Section>
          <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow>{t.control.eyebrow}</Eyebrow>
              <h2 className={`${h2} md:text-[40px]`}>{t.control.title}</h2>
              <p className="mt-5 max-w-[430px] text-sm leading-[1.85] text-sub">{t.control.body}</p>
              <a href={`/${lang}#hulp`} className={`${textLink} mt-5 text-green-text lg:mt-7`}>{t.control.link} <ArrowRight size={20} {...ic} /></a>
            </div>
            <div>
              <div className="grid overflow-hidden rounded-card border border-frame md:grid-cols-3">
                {t.control.columns.map((col, i) => { const I = [Search, Wrench, ShieldCheck][i]; return (
                  <div key={col.title} className={`p-5 md:p-6 ${i === 1 ? 'bg-mint' : 'bg-white'} ${i > 0 ? 'max-md:border-t max-md:border-line' : ''}`}>
                    <div className="mb-4 flex items-center gap-2.5"><I size={18} {...ic} className="flex-none text-accent-dark" /><h3 className="font-display text-[17px] font-bold leading-tight tracking-[-.025em]">{col.title}</h3></div>
                    <ul>{col.items.map((it) => <li key={it} className="mb-3 flex items-start gap-2.5 text-xs leading-[1.7] last:mb-0"><Check size={13} {...ic} className="mt-[3px] flex-none text-accent-dark" />{it}</li>)}</ul>
                  </div>
                ); })}
              </div>
              <p className="mt-3 flex items-start gap-2 text-[11px] leading-[1.7] text-sub"><Info size={14} {...ic} className="mt-0.5 flex-none" />{t.control.note}</p>
            </div>
          </div>
        </Section>

        {/* Voor wie: kop met de groene derde regel en de drie tabs */}
        <section id="voor-wie" className="border-y border-line bg-paper py-14 md:py-20">
          <div className={`${container} grid items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-[100px]`}>
            <div>
              <Eyebrow>{t.audience.eyebrow}</Eyebrow>
              <h2 className={`${h2} md:text-[37px] lg:text-[46px]`}><Lines lines={t.audience.lines} green={t.audience.titleGreen} /></h2>
              <p className="mt-5 max-w-[400px] text-sm leading-[1.8] text-sub">{t.audience.lead}</p>
            </div>
            <AudienceTabs t={t.audience} />
          </div>
        </section>

        {/* Prijzen op canvas: gecentreerde intro, schakelaar, drie kaarten, de grotere plannen en de telregel ingeklapt */}
        <Section id="prijzen" tone="canvas" className="scroll-mt-20 md:!pb-[90px] md:!pt-[100px]">
          <div className="text-center">
            <Eyebrow className="justify-center">{t.plans.eyebrow}</Eyebrow>
            <h2 className={`${h2} mx-auto max-w-3xl md:text-[41px] lg:text-[48px]`}>{t.plans.title}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-xs leading-[1.85] text-sub md:text-sm">{t.plans.lead}</p>
          </div>
          <PlanCards t={t.plans} ladder={dict.pricing.ladder} lang={lang} demoHref={demoHref} pricingHref={pricingHref} />
        </Section>

        {/* Vragen */}
        <Section id="vragen" className="scroll-mt-20">
          <div className="grid gap-7 md:grid-cols-[.75fr_1fr] md:gap-12 lg:grid-cols-[.75fr_1.15fr] lg:gap-[100px]">
            <div>
              <Eyebrow>{t.faq.eyebrow}</Eyebrow>
              <h2 className={`${h2} md:text-[34px] lg:text-[42px]`}>{t.faq.title}</h2>
              <p className="mt-5 max-w-[380px] text-[13px] leading-[1.8] text-sub md:text-sm">{t.faq.lead}</p>
              <a href={`/${lang}#hulp`} className={`${textLink} mt-5 text-xs text-green-text lg:mt-7`}>{t.faq.link} <ArrowRight size={20} {...ic} /></a>
            </div>
            <Faq items={t.faq.items} />
          </div>
        </Section>

        {/* Kennis: twee artikelen als vlakken */}
        <div className={`${container} grid items-center gap-3.5 border-t border-line pb-11 pt-8 md:grid-cols-2 md:gap-4 md:pb-20 md:pt-10 lg:grid-cols-[.85fr_1fr_1fr] lg:gap-7`}>
          <div className="md:max-lg:col-span-2"><Eyebrow className="mb-3 text-[9px]">{t.knowledge.eyebrow}</Eyebrow><h3 className="font-display text-[26px] font-bold leading-tight tracking-heading md:text-2xl">{t.knowledge.title}</h3></div>
          {t.knowledge.items.map((k, i) => {
            const article = ARTICLES.find((a) => a.id === k.id);
            return (
              <Link key={k.id} href={article ? articlePath(article, lang) : `/${lang}`} className="flex min-h-[108px] items-center gap-4 rounded-control bg-mint px-5 py-6 transition-colors duration-150 hover:bg-status-success-bg focus-ring md:min-h-[122px]">
                <span className="font-display text-[23px] tracking-[-.05em] text-accent-dark/70 md:text-[27px]">{String(i + 1).padStart(2, '0')}</span>
                <span><small className="mb-1.5 block text-[8px] uppercase tracking-[.09em] text-green-text">{k.label}</small><strong className="block font-display text-base font-bold leading-[1.35] tracking-[-.025em] md:text-[17px]">{k.title}</strong></span>
                <ArrowRight size={18} {...ic} className="ml-auto flex-none text-accent-dark" />
              </Link>
            );
          })}
        </div>

        {/* Over LIVO APPS: de goedgekeurde tekst van M2 (drie alinea's) */}
        <Section id="about" tone="canvas" className="scroll-mt-20">
          <Eyebrow>{t.about.eyebrow}</Eyebrow>
          <h2 className={`${h2} max-w-3xl md:text-[41px]`}>{t.about.title}</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-sm leading-[1.85] text-ink md:text-base">{t.about.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}</div>
        </Section>

        {/* Hulp op donkergroen (#hulp): zelfstandig starten, hulp op elk moment; drie kaarten (keuze, inrichting, vragen), elk met een mail */}
        <section id="hulp" className="scroll-mt-20 bg-navy py-14 text-on-dark md:py-[70px] lg:py-[90px]">
          <div className={container}>
            <div className="grid items-start gap-9 md:grid-cols-[.9fr_1fr] md:gap-10 lg:gap-[90px]">
              <div>
                <Eyebrow className="text-on-dark-accent">{t.help.eyebrow}</Eyebrow>
                <h2 className={`${h2Dark} text-[40px] md:text-[46px] lg:text-[54px] lg:leading-[1.06]`}><Lines lines={t.help.lines} green={t.help.titleGreen} className="text-white" /></h2>
              </div>
              <div className="md:pt-9">
                <p className="max-w-[460px] text-sm leading-[1.9] text-on-dark-sub">{t.help.body}</p>
                <ul className="mt-6 grid gap-3.5">{t.help.points.map((pt) => <li key={pt} className="flex items-center gap-3 text-xs text-on-dark"><Check size={16} {...ic} className="text-on-dark-accent" />{pt}</li>)}</ul>
              </div>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-[18px]">
              {t.help.cards.map((c, i) => { const I = icons.help[i]; return (
                <div key={c.label} className="flex flex-col rounded-card bg-white p-6 text-ink md:p-7">
                  <span className="flex items-center gap-2.5 text-[9px] font-semibold uppercase tracking-[.09em] text-green-text"><I size={16} {...ic} className="text-accent-dark" />{c.label}</span>
                  <h3 className="mt-3 font-display text-[23px] font-bold leading-[1.15] tracking-[-.035em]">{c.title}</h3>
                  <p className="mt-3 text-[13px] leading-[1.8] text-sub">{c.body}</p>
                  <div className="mt-auto pt-5">
                    <a href={mailto(c.subject, i === 0 ? demo.demoBody : undefined)} className={`${i === 0 ? btnPrimary : btnSecondary} flex w-full text-xs`}><Mail size={16} {...ic} />{c.cta}</a>
                    {c.faqLink && <a href={`/${lang}#vragen`} className={`${textLink} mt-2 min-h-0 text-xs text-green-text`}>{c.faqLink} <ArrowRight size={15} {...ic} /></a>}
                  </div>
                </div>
              ); })}
            </div>
            <p className="mt-6 text-center text-[10px] leading-[1.7] text-on-dark-sub">{t.help.note} <a href={`mailto:${t.help.mail}`} className="underline hover:text-white focus-ring rounded">{t.help.mail}</a></p>
          </div>
        </section>
      </main>
      <Footer lang={lang} dict={t.footer} />
    </div>
  );
}

const h2Dark = `${h2.replace('text-ink', 'text-white')}`;
