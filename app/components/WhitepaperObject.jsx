import { Check } from 'lucide-react';
import WhitepaperRequest from './WhitepaperRequest';
import { Section, Eyebrow, h2, lead } from './ui';

// Whitepaper als object: cover-mock plus aanvraagblok (mailto). Geen formulier, geen opslag (17 september 2026).
// De sectie staat op wit; de aanvraagkaart heeft een rand. Tussen 1024 en 1280 px staat de omslag boven de kaart,
// anders is de kaart te smal voor de knop.
export default function WhitepaperObject({ t }) {
  return (
    <Section id="whitepaper">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className={h2}>{t.title}</h2>
          <p className={`mt-5 ${lead}`}>{t.lead}</p>
          <ul className="mt-6 space-y-2">
            {t.points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-body text-ink"><Check size={18} aria-hidden="true" className="mt-1 flex-none text-accent-dark" />{p}</li>
            ))}
          </ul>
        </div>
        <div className="grid gap-6 sm:grid-cols-[200px_1fr] sm:items-start lg:grid-cols-1 xl:grid-cols-[200px_1fr]">
          <div aria-hidden="true" className="mx-auto w-[200px] rounded-control bg-navy p-6 text-white lg:mx-0 xl:mx-auto" style={{ aspectRatio: '3/4' }}>
            <span className="font-display text-xs font-bold tracking-widest">LIVO <span className="text-accent">PPWR</span></span>
            <p className="mt-10 font-display text-xl font-bold leading-tight">{t.coverTitle}</p>
            <p className="mt-4 text-xs text-white/70">{t.coverSub}</p>
          </div>
          <WhitepaperRequest t={t.request} />
        </div>
      </div>
    </Section>
  );
}
