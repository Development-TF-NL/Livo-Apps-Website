import { Clock, Coins, GraduationCap } from 'lucide-react';

// Gedeelde bouwstenen van de site: huisstijl v2 (17 september 2026), smaak "uitgesproken".
// Eén plek voor ruimte, breedte, koppen, knoppen, kaarten en iconen, zodat elke pagina dezelfde vorm heeft.
// Kleur, radius, schaduw, breedte en lettergrootte komen uit de tokens in tailwind.config.js; geen losse hexwaarden.
//
// Regels die hier vastliggen:
// - inhoud maximaal 1200 px (max-w-content); sectieruimte 96 px op desktop en 64 px op mobiel;
// - een kaart op canvas draagt de ene zachte schaduw, een kaart op wit een rand van 1 px; radius 16;
// - hero- en promopanelen radius 22; knoppen 48 px hoog, radius 10, overgang 150 ms;
// - labels en leadalinea's in Ink Blue; iconen uit Lucide in een mintcirkel van 48 px;
// - navy als vlak op één plek per pagina: het slotpaneel (ClosingBand). De footer telt niet mee.

// Tekst
export const eyebrow = 'mb-4 text-xs font-semibold uppercase tracking-[.14em] text-ink-blue';
export const h1 = 'font-display text-4xl font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl xl:text-6xl';
export const h2Base = 'font-display text-4xl font-bold leading-[1.06] tracking-tight md:text-5xl';
export const h2 = `${h2Base} text-ink`;
export const lead = 'text-lg leading-relaxed text-ink-blue';
export const cardTitle = 'font-display text-2xl font-bold leading-tight text-ink';
export const cardTitleSmall = 'font-display text-card font-bold text-ink';
export const cardBody = 'text-body text-sub';

// Knoppen en links
export const btn = 'inline-flex h-12 items-center justify-center gap-2 rounded-control px-6 font-semibold transition-colors duration-150 focus-ring';
export const btnPrimary = `${btn} bg-accent text-ink hover:bg-accent-dark`;
export const btnSecondary = `${btn} border-[1.5px] border-navy bg-white text-ink hover:bg-canvas`;
export const btnOnNavy = `${btn} bg-white text-ink hover:bg-canvas`;
export const textLink = 'inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-green-text underline-offset-4 transition-colors duration-150 hover:underline focus-ring';

// Vlakken
export const container = 'mx-auto max-w-content';
export const heroPanel = 'rounded-hero border border-line bg-white';
export const cardOnCanvas = 'rounded-card bg-white shadow-soft';
export const cardOnWhite = 'rounded-card border border-line bg-white';
export const promoPanel = 'rounded-hero bg-mint';

// De iconen bij expertise, tijd en geld: dezelfde drie op de homepage en de prijspagina.
export const benefitIcons = [GraduationCap, Clock, Coins];

const TONES = { white: 'bg-white', canvas: 'bg-canvas' };

// Een sectie: wit of canvas, met de vaste ruimte en de vaste breedte. `hero` geeft de ruimte van een eerste sectie.
// `after` komt buiten de inhoudsbreedte, binnen de sectie (voor een fotoplek aan de rand).
export function Section({ id, tone = 'white', hero = false, className = '', after, children }) {
  const space = hero ? 'pb-16 pt-12 md:pb-24 md:pt-20' : 'py-16 md:py-24';
  return (
    <section id={id} className={`scroll-mt-20 px-6 ${space} ${TONES[tone] ?? TONES.white} ${className}`}>
      <div className={container}>{children}</div>
      {after}
    </section>
  );
}

// Eén groen woord in een grote kop (Green Heading). `green` is het deel van de titel dat groen wordt;
// staat het er niet in, dan blijft de titel zoals hij is. De tekst zelf verandert niet.
export function GreenTitle({ title, green }) {
  const i = green ? title.indexOf(green) : -1;
  if (i < 0) return title;
  return (
    <>
      {title.slice(0, i)}<span className="text-green-heading">{green}</span>{title.slice(i + green.length)}
    </>
  );
}

export function Eyebrow({ children }) {
  return <p className={eyebrow}>{children}</p>;
}

// Tweekleurig icoon: een Lucide-icoon in Lime Dark op een mintcirkel van 48 px. Decoratief.
export function IconCircle({ icon: Icon, className = '' }) {
  return (
    <span aria-hidden="true" className={`inline-flex h-12 w-12 flex-none items-center justify-center rounded-full bg-mint text-accent-dark ${className}`}>
      <Icon size={24} />
    </span>
  );
}

// Positieve callout: mint vlak met een lime streep links.
export function Callout({ as: Tag = 'p', className = '', children }) {
  return <Tag className={`rounded-r-control border-l-4 border-accent bg-mint px-6 py-5 text-ink ${className}`}>{children}</Tag>;
}

// Het slotpaneel: het ene navy moment van een pagina. Kop, eventueel een regel eronder, de knoppen als children,
// eventueel een blok ernaast (`aside`) en een fotoplek als randaccent (`photo`). `footnote` komt onder het paneel.
export function ClosingBand({ tone = 'white', title, lead: leadText, center = false, aside, photo, footnote, children }) {
  return (
    <section className={`px-6 py-16 md:py-20 ${TONES[tone] ?? TONES.white}`}>
      <div className={`relative ${container} overflow-hidden rounded-hero bg-navy px-8 py-12 text-white md:px-12 md:py-14 ${center ? 'text-center' : ''}`}>
        <div className={aside ? `grid items-center gap-8 md:grid-cols-[1fr_auto] ${photo ? 'md:pr-44' : ''}` : ''}>
          <div>
            <h2 className={`${h2Base} max-w-3xl ${center ? 'mx-auto' : ''}`}>{title}</h2>
            {leadText && <p className={`mt-4 max-w-3xl text-lg text-white/80 ${center ? 'mx-auto' : ''}`}>{leadText}</p>}
            <div className={`mt-8 flex flex-wrap gap-3 ${center ? 'justify-center' : ''}`}>{children}</div>
          </div>
          {aside}
        </div>
        {photo}
      </div>
      {footnote}
    </section>
  );
}
