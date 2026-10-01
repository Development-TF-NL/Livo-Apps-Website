import { Mail } from 'lucide-react';
import { mailtoHref } from './WhitepaperRequest';

// Whitepaper op de homepage als één compacte rij (homepage v5, 1 oktober 2026): kleine omslag, kop, één zin
// en de bestaande aanvraag per e-mail. Geen opsomming, geen aparte aanvraagkaart, geen opslag.
// De productpagina houdt het grote blok (WhitepaperObject).
export default function WhitepaperRow({ t }) {
  return (
    <section id="whitepaper" className="scroll-mt-20 bg-white px-6 py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 sm:flex-row sm:items-center">
        <div aria-hidden="true" className="w-[150px] flex-none rounded-[12px] bg-navy p-4 text-white" style={{ aspectRatio: '3/4' }}>
          <span className="font-display text-[10px] font-bold tracking-widest">LIVO <span className="text-accent">PPWR</span></span>
          <p className="mt-5 font-display text-sm font-bold leading-tight">{t.coverTitle}</p>
          <p className="mt-3 text-[10px] leading-tight text-white/70">{t.coverSub}</p>
        </div>
        <div className="min-w-0">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">{t.rowTitle}</h2>
          <p className="mt-3 max-w-2xl text-lg text-ink-blue">{t.rowBody}</p>
          <a href={mailtoHref(t.request)} className="mt-6 inline-flex h-12 items-center gap-2 rounded-control border-[1.5px] border-navy bg-white px-6 font-semibold text-ink transition-colors duration-150 hover:bg-canvas focus-ring">
            <Mail size={18} aria-hidden="true" />{t.request.button}
          </a>
        </div>
      </div>
    </section>
  );
}
