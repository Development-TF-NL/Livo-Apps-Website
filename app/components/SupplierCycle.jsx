import { FileText, Send, PencilLine, ClipboardCheck } from 'lucide-react';
import { Section, Eyebrow, IconCircle, h2, lead, cardTitleSmall, cardBody } from './ui';

const icons = [FileText, Send, PencilLine, ClipboardCheck];

// Leveranciersronde als cirkel (flyer 2026-09-17, illustratie 03), groot, met de vier stappen ernaast.
// Nuance uit de review van 16 september: de klant verstuurt de uitvraag; LIVO bereidt voor en beoordeelt niets zelf.
// De sectie staat op canvas; het diagram staat in een wit paneel met de zachte schaduw. De twee zijlabels staan
// schuin boven en onder het middenvak (27% en 73%), zodat op geen enkele breedte een label achter het vak valt;
// op mobiel is het paneel hoger.
export default function SupplierCycle({ t }) {
  const pill = 'absolute whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold';
  return (
    <Section id="suppliers" tone="canvas">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <div aria-hidden="true" className="relative mx-auto aspect-[100/110] w-full max-w-[560px] rounded-hero bg-white shadow-soft sm:aspect-[100/80]">
          <div className="absolute inset-x-3 inset-y-8">
            <svg viewBox="0 0 100 56" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              <path d="M25,28a25,18 0 1,1 50,0a25,18 0 1,1 -50,0" fill="none" className="stroke-frame-line" strokeWidth="0.9" />
              <path d="M-3.2 -2.6 L0 0 L-3.2 2.6" transform="translate(68.5 14.9) rotate(50)" fill="none" className="stroke-ink-blue" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M-3.2 -2.6 L0 0 L-3.2 2.6" transform="translate(31.5 41.1) rotate(230)" fill="none" className="stroke-ink-blue" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={`${pill} left-1/2 top-0 -translate-x-1/2 bg-mint text-green-text`}>{t.steps[0].title}</span>
            <span className={`${pill} right-0 top-[73%] -translate-y-1/2 border border-line bg-canvas text-ink`}>{t.steps[2].title}</span>
            <span className={`${pill} bottom-0 left-1/2 -translate-x-1/2 bg-mint text-green-text`}>{t.steps[3].title}</span>
            <span className={`${pill} left-0 top-[27%] -translate-y-1/2 border border-line bg-canvas text-ink`}>{t.steps[1].title}</span>
            <span className="absolute left-1/2 top-1/2 flex h-20 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-card border-2 border-navy bg-white text-center leading-none">
              <b className="font-display text-lg font-bold text-ink">{t.coreTitle}</b><span className="mt-1.5 text-xs text-sub">{t.coreSub}</span>
            </span>
          </div>
        </div>
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className={h2}>{t.title}</h2>
          <p className={`mt-5 ${lead}`}>{t.lead}</p>
          <ol className="mt-8 space-y-4">
            {t.steps.map((s, i) => {
              const Icon = icons[i];
              return (
                <li key={s.title} className="flex gap-4">
                  <IconCircle icon={Icon} />
                  <div><p className={cardTitleSmall}>{i + 1} · {s.title}</p><p className={`mt-1 ${cardBody}`}>{s.body}</p></div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
