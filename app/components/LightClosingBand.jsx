import { container, h2Base } from './ui';

// Licht slotpaneel (M2-nazorg, 13 oktober 2026): de lichte variant van het slot voor de homepage en de prijspagina.
// Twee tonen: 'mint' = een mintpaneel op wit (homepage); 'card' = een wit paneel op canvas met de ene zachte huisstijlschaduw
// (prijspagina). Navy kop, Ink Blue toelichting, de knop als children (lime met navy tekst). Eén knop, geen formulier, geen beeld;
// de hoogte volgt uit de inhoud, met iets minder binnenruimte dan het navy slot zodat het paneel compact blijft. Het standaard navy ClosingBand (ui.jsx) blijft ongewijzigd en is het slot van de productpagina.
const TONES = {
  mint: { section: 'bg-white', panel: 'bg-mint' },
  card: { section: 'bg-canvas', panel: 'bg-white shadow-soft' },
};

export default function LightClosingBand({ tone = 'mint', title, lead, children }) {
  const t = TONES[tone] ?? TONES.mint;
  return (
    <section className={`px-6 py-16 md:py-20 ${t.section}`}>
      <div className={`${container} rounded-hero p-6 md:p-10 ${t.panel}`}>
        <h2 className={`${h2Base} max-w-3xl text-ink`}>{title}</h2>
        {lead && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-blue">{lead}</p>}
        <div className="mt-6 flex flex-wrap gap-3">{children}</div>
      </div>
    </section>
  );
}
