import Link from 'next/link';
import { ArrowRight, Heart, Brain, Shield, Zap } from 'lucide-react';
import { getDictionary } from '../get-dictionary';
import { BOOKINGS_URL, bookingLinkProps } from '../booking';

// Icons stay in code (non-text), matched to traits by index.
const traitIcons = [Heart, Brain, Heart, Shield];

export default async function LivoAppsWebsite({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const t = dict.home;

  return (
    <div className="bg-[#0B1D33] text-white font-sans">
      <section className="pt-20 pb-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-[#7AC143] text-sm font-semibold mb-4 tracking-wide">{t.hero.eyebrow}</div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">{t.hero.titleBefore}<span className="text-[#7AC143]">{t.hero.titleHighlight}</span>{t.hero.titleAfter}</h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">{t.hero.lead}</p>
          <div className="flex gap-4 flex-wrap">
            <a href={BOOKINGS_URL} {...bookingLinkProps} className="bg-[#7AC143] text-[#0B1D33] px-8 py-3 rounded hover:bg-[#6AB030] transition font-semibold flex items-center gap-2">{t.hero.ctaPrimary} <ArrowRight size={18} /></a>
            <Link href={`/${lang}/ppwr`} className="border border-gray-500 px-8 py-3 rounded hover:border-[#7AC143] transition font-semibold inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7AC143]">{t.hero.ctaSecondary}</Link>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="bg-[#1A2F47] rounded-lg p-8 aspect-square flex items-center justify-center border border-[#2A3F57]">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#7AC143] to-[#5A9030] rounded-lg mb-4 mx-auto flex items-center justify-center"><Zap size={32} /></div>
              <p className="text-sm text-gray-400">{t.hero.previewTitle}</p>
              <p className="text-xs text-gray-500 mt-2">{t.hero.previewSubtitle}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white text-[#0B1D33]">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-semibold text-[#7AC143] mb-4 tracking-wide">{t.brand.eyebrow}</div>
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6">{t.brand.whoTitle}</h3>
              <p className="text-lg text-gray-700 leading-relaxed">{t.brand.whoBody1}</p>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">{t.brand.whoBody2}</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">{t.brand.promiseTitle}</h3>
              <p className="text-lg font-semibold text-[#0B1D33] mb-3">{t.brand.promiseLead}</p>
              <p className="text-lg text-gray-700 leading-relaxed">{t.brand.promiseBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#0B1D33]">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-semibold text-[#7AC143] mb-4 tracking-wide">{t.personality.eyebrow}</div>
          <div className="grid md:grid-cols-4 gap-8">
            {t.personality.traits.map((trait, i) => {
              const Icon = traitIcons[i] ?? Heart;
              return (
                <div className="text-center" key={trait.title}>
                  <div className="w-16 h-16 mx-auto mb-4 border-2 border-[#7AC143] rounded-full flex items-center justify-center"><Icon size={28} className="text-[#7AC143]" /></div>
                  <h4 className="font-bold text-lg mb-2">{trait.title}</h4>
                  <p className="text-gray-400 text-sm">{trait.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="product" className="py-20 px-6 bg-white text-[#0B1D33]">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-semibold text-[#7AC143] mb-4 tracking-wide">{t.product.eyebrow}</div>
          <h2 className="text-4xl font-bold mb-4">{t.product.title}</h2>
          <p className="text-lg text-gray-700 mb-12">{t.product.subtitle}</p>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-[#0B1D33] rounded-lg p-8 aspect-video flex items-center justify-center border border-[#2A3F57]">
              <div className="text-center"><p className="text-lg font-bold text-[#7AC143] mb-2">{t.product.previewLabel}</p><p className="text-gray-400 text-sm">{t.product.previewNote}</p></div>
            </div>
            <div className="space-y-6">
              {t.product.features.map((f) => (
                <div className="flex gap-4" key={f.title}><div className="w-6 h-6 rounded-full bg-[#7AC143] flex-shrink-0 flex items-center justify-center mt-1"><span className="text-[#0B1D33] text-xs font-bold">&#10003;</span></div><div><h4 className="font-bold text-lg mb-2">{f.title}</h4><p className="text-gray-600">{f.body}</p></div></div>
              ))}
            </div>
          </div>
          <div className="mt-12">
            <Link href={`/${lang}/ppwr`} className="inline-flex items-center gap-2 bg-[#0B1D33] text-white px-8 py-3 rounded font-semibold transition-colors duration-200 hover:bg-[#13294A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7AC143]">
              {t.product.cta} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#0B1D33] border-t border-[#1A2F47]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-400 text-sm tracking-wide">{t.trusted}</p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white text-[#0B1D33]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.finalCta.titleBefore}<span className="text-[#7AC143]">{t.finalCta.titleHighlight}</span>{t.finalCta.titleAfter}</h2>
          <p className="text-lg text-gray-700 mb-8">{t.finalCta.body}</p>
          <a href={BOOKINGS_URL} {...bookingLinkProps} className="bg-[#7AC143] text-[#0B1D33] px-8 py-4 rounded hover:bg-[#6AB030] transition font-semibold flex items-center gap-2 mx-auto text-lg">{t.finalCta.cta} <ArrowRight size={20} /></a>
        </div>
      </section>

      <footer className="bg-[#0B1D33] border-t border-[#1A2F47] px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 relative">
                  <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="28" fontWeight="bold" fill="white" fontFamily="serif">L</text>
                    <path d="M 20 18 Q 25 22 22 28" stroke="#7AC143" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-lg font-bold tracking-wider">LIVO APPS</span>
              </div>
              <p className="text-gray-400 text-sm">{t.footer.tagline}</p>
            </div>
            {[t.footer.columns.product, t.footer.columns.company, t.footer.columns.legal].map((col) => (
              <div key={col.title}>
                <h4 className="font-bold mb-4 text-sm tracking-wide">{col.title}</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  {col.items.map((item) => (
                    <li key={item}><a href="#" className="hover:text-[#7AC143]">{item}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-[#1A2F47] pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>{t.footer.copyright}</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              {t.footer.social.map((s) => (
                <a href="#" className="hover:text-[#7AC143]" key={s}>{s}</a>
              ))}
              <a href="mailto:hello@livoapps.software" className="hover:text-[#7AC143]">hello@livoapps.software</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
