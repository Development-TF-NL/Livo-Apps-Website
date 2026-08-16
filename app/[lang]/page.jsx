import Link from 'next/link';
import { ArrowRight, Heart, Brain, Shield, Zap, CheckSquare, LayoutDashboard } from 'lucide-react';
import { getDictionary } from '../get-dictionary';
import { BOOKINGS_URL, bookingLinkProps } from '../booking';
import Logo from '../components/Logo';

// Icons stay in code (non-text), matched to traits by index.
const traitIcons = [Heart, Brain, Heart, Shield];
// Icons for the "why it feels light" strip, matched to t.whyLight by index.
const whyLightIcons = [CheckSquare, LayoutDashboard, Zap];

export default async function LivoAppsWebsite({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const t = dict.home;

  return (
    <div className="bg-navy text-white font-sans">
      <section className="pt-20 pb-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-accent text-sm font-semibold mb-4 tracking-wide">{t.hero.eyebrow}</div>
          <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6">{t.hero.titleBefore}<span className="text-accent">{t.hero.titleHighlight}</span>{t.hero.titleAfter}</h1>
          <p className="text-lg text-white/70 mb-8 leading-relaxed">{t.hero.lead}</p>
          <div className="flex gap-4 flex-wrap">
            <a href={BOOKINGS_URL} {...bookingLinkProps} className="bg-accent text-ink px-8 py-3 rounded hover:bg-accent-dark transition font-semibold flex items-center gap-2">{t.hero.ctaPrimary} <ArrowRight size={18} /></a>
            <Link href={`/${lang}/ppwr`} className="border border-white/30 px-8 py-3 rounded hover:border-accent transition font-semibold inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{t.hero.ctaSecondary}</Link>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="bg-white/5 rounded-lg p-8 aspect-square flex items-center justify-center border border-white/10">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-navy rounded-lg mb-4 mx-auto flex items-center justify-center"><Zap size={32} /></div>
              <p className="text-sm text-white/60">{t.hero.previewTitle}</p>
              <p className="text-xs text-white/50 mt-2">{t.hero.previewSubtitle}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6 bg-white text-ink">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-semibold text-accent mb-4 tracking-wide">{t.brand.eyebrow}</div>
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-display font-bold mb-6">{t.brand.whoTitle}</h3>
              <p className="text-lg text-sub leading-relaxed">{t.brand.whoBody1}</p>
              <p className="text-lg text-sub leading-relaxed mt-4">{t.brand.whoBody2}</p>
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold mb-6">{t.brand.promiseTitle}</h3>
              <p className="text-lg font-semibold text-ink mb-3">{t.brand.promiseLead}</p>
              <p className="text-lg text-sub leading-relaxed">{t.brand.promiseBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-navy">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-semibold text-accent mb-4 tracking-wide">{t.personality.eyebrow}</div>
          <div className="grid md:grid-cols-4 gap-8">
            {t.personality.traits.map((trait, i) => {
              const Icon = traitIcons[i] ?? Heart;
              return (
                <div className="text-center" key={trait.title}>
                  <div className="w-16 h-16 mx-auto mb-4 border-2 border-accent rounded-full flex items-center justify-center"><Icon size={28} className="text-accent" /></div>
                  <h4 className="font-display font-bold text-lg mb-2">{trait.title}</h4>
                  <p className="text-white/60 text-sm">{trait.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="product" className="py-20 px-6 bg-white text-ink">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-semibold text-accent mb-4 tracking-wide">{t.product.eyebrow}</div>
          <h2 className="text-4xl font-display font-bold mb-4">{t.product.title}</h2>
          <p className="text-lg text-sub mb-12">{t.product.subtitle}</p>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-navy rounded-lg p-8 aspect-video flex items-center justify-center border border-white/10">
              <div className="text-center"><p className="text-lg font-display font-bold text-accent mb-2">{t.product.previewLabel}</p><p className="text-white/60 text-sm">{t.product.previewNote}</p></div>
            </div>
            <div className="space-y-6">
              {t.product.features.map((f) => (
                <div className="flex gap-4" key={f.title}><div className="w-6 h-6 rounded-full bg-accent flex-shrink-0 flex items-center justify-center mt-1"><span className="text-ink text-xs font-display font-bold">&#10003;</span></div><div><h4 className="font-display font-bold text-lg mb-2">{f.title}</h4><p className="text-sub">{f.body}</p></div></div>
              ))}
            </div>
          </div>
          <div className="mt-12">
            <Link href={`/${lang}/ppwr`} className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3 rounded font-semibold transition-colors duration-200 hover:bg-navy/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              {t.product.cta} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-navy border-t border-white/10 px-6 py-24">
        <ul className="mx-auto grid max-w-5xl gap-12 md:grid-cols-3 md:items-start">
          {t.whyLight.map((line, i) => {
            const Icon = whyLightIcons[i] ?? CheckSquare;
            return (
              <li key={line} className="flex flex-col items-center gap-3 text-center">
                <Icon size={28} aria-hidden="true" className="text-accent" />
                <p className="max-w-[16rem] text-sm leading-relaxed text-white/60 [text-wrap:balance]">{line}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="py-20 px-6 bg-white text-ink">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">{t.finalCta.titleBefore}<span className="text-accent">{t.finalCta.titleHighlight}</span>{t.finalCta.titleAfter}</h2>
          <p className="text-lg text-sub mb-8">{t.finalCta.body}</p>
          <a href={BOOKINGS_URL} {...bookingLinkProps} className="bg-accent text-ink px-8 py-4 rounded hover:bg-accent-dark transition font-semibold flex items-center gap-2 mx-auto text-lg">{t.finalCta.cta} <ArrowRight size={20} /></a>
        </div>
      </section>

      <footer className="bg-navy border-t border-white/10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Logo variant="inverse" />
                <span className="text-lg font-display font-bold tracking-wider">LIVO APPS</span>
              </div>
              <p className="text-white/60 text-sm">{t.footer.tagline}</p>
            </div>
            {[t.footer.columns.product, t.footer.columns.company].map((col) => (
              <div key={col.title}>
                <h4 className="font-display font-bold mb-4 text-sm tracking-wide">{col.title}</h4>
                <ul className="space-y-3 text-sm text-white/60">
                  {col.items.map(({ label, href }) => (
                    // Interne links in de dictionary staan zonder taalprefix.
                    <li key={label}>
                      <a href={href.startsWith('/') || href.startsWith('#') ? `/${lang}${href}` : href} className="hover:text-accent">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/50 mb-8">{t.footer.disclaimer}</p>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
            <p>{t.footer.copyright}</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              {t.footer.social.map(({ label, href }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-accent" key={label}>{label}</a>
              ))}
              <a href="mailto:hello@livoapps.software" className="hover:text-accent">hello@livoapps.software</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
