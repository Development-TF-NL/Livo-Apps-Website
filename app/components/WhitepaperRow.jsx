import { Mail } from 'lucide-react';
import { mailtoHref } from './WhitepaperRequest';
import { Section, h2, lead, btnSecondary } from './ui';

// Whitepaper op de homepage als één compacte rij (homepage v5, 1 oktober 2026): kleine omslag, kop, één zin
// en de bestaande aanvraag per e-mail. Geen opsomming, geen aparte aanvraagkaart, geen opslag.
// De productpagina houdt het grote blok (WhitepaperObject).
export default function WhitepaperRow({ t }) {
  return (
    <Section id="whitepaper">
      <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
        <div aria-hidden="true" className="w-[150px] flex-none rounded-control bg-navy p-4 text-white" style={{ aspectRatio: '3/4' }}>
          <span className="font-display text-[10px] font-bold tracking-widest">LIVO <span className="text-accent">PPWR</span></span>
          <p className="mt-5 font-display text-sm font-bold leading-tight">{t.coverTitle}</p>
          <p className="mt-3 text-[10px] leading-tight text-white/70">{t.coverSub}</p>
        </div>
        <div className="min-w-0">
          <h2 className={h2}>{t.rowTitle}</h2>
          <p className={`mt-3 max-w-2xl ${lead}`}>{t.rowBody}</p>
          <a href={mailtoHref(t.request)} className={`mt-6 ${btnSecondary}`}>
            <Mail size={18} aria-hidden="true" />{t.request.button}
          </a>
        </div>
      </div>
    </Section>
  );
}
