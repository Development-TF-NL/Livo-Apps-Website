import { Clock, Coins, GraduationCap } from 'lucide-react';

// Gedeelde bouwstenen van de site, op de stijl van het landingspagina-concept (keuze eigenaar 29 oktober 2026):
// papieren pagina, strakke koppen met -0,045 em, groene knoppen met donkere tekst (radius 7), kaarten met een lichte rand
// (radius 12), eyebrows in blad-groen met een levende punt, lichte secties afgewisseld met donkergroene vlakken.
// Kleur, radius, schaduw, breedte en lettergrootte komen uit de tokens in tailwind.config.js; geen losse hexwaarden.

// Tekst
export const eyebrow = 'mb-5 flex items-center gap-2.5 text-[11px] font-bold uppercase leading-normal tracking-[.13em] text-green-text max-sm:text-[9px] max-sm:tracking-[.1em]';
export const h1 = 'font-display text-[clamp(38px,8.5vw,56px)] font-bold leading-[1.065] tracking-heading text-ink lg:text-[clamp(46px,4.65vw,67px)] lg:leading-[1.04] lg:tracking-[-.055em]';
export const h2Base = 'font-display text-[34px] font-bold leading-[1.15] tracking-heading max-sm:[hyphens:auto] max-sm:[overflow-wrap:anywhere] md:text-[clamp(36px,3.75vw,53px)] md:leading-[1.12]';
export const h2 = `${h2Base} text-ink`;
export const lead = 'text-[15px] leading-[1.8] text-sub md:text-base';
export const cardTitle = 'font-display text-[27px] font-bold leading-tight tracking-heading text-ink';
export const cardTitleSmall = 'font-display text-card font-bold tracking-[-.025em] text-ink';
export const cardBody = 'text-sm leading-[1.8] text-sub';

// Knoppen en links
export const btn = 'inline-flex min-h-[46px] items-center justify-center gap-4 rounded-control border border-transparent px-5 py-3 text-[13px] font-semibold leading-snug transition-[background-color,transform,box-shadow] duration-150 focus-ring';
export const btnPrimary = `${btn} bg-accent text-btn-text hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-soft`;
export const btnLarge = `${btnPrimary} min-h-[55px] px-[22px] py-4 text-sm`;
export const btnSecondary = `${btn} border-frame-line/70 bg-transparent text-ink hover:bg-mint`;
export const btnOnNavy = `${btn} bg-white text-ink hover:bg-canvas`;
// Variant voor een langer vastgesteld label: op smalle schermen de volle breedte en zo nodig twee regels.
export const btnPrimaryWrap = `${btnPrimary} w-full whitespace-normal text-center sm:w-auto`;
export const textLink = 'inline-flex min-h-[44px] items-center gap-3 text-sm font-semibold text-ink transition-colors duration-150 hover:text-green-text focus-ring';

// Vlakken
export const container = 'mx-auto w-[min(1240px,calc(100%-40px))] md:w-[min(1240px,calc(100%-76px))] xl:w-[min(1240px,calc(100%-104px))]';
export const heroPanel = 'rounded-hero border border-line bg-white';
export const cardOnCanvas = 'rounded-card border border-frame bg-white';
export const cardOnWhite = 'rounded-card border border-frame bg-white';
export const promoPanel = 'rounded-hero bg-mint';

// De iconen bij expertise, tijd en geld: dezelfde drie op de homepage en de prijspagina.
export const benefitIcons = [GraduationCap, Clock, Coins];

const TONES = { white: 'bg-paper', canvas: 'bg-canvas', dark: 'bg-navy text-on-dark' };

// Een sectie: papier, canvas of donkergroen, met de vaste ruimte en de vaste breedte. `hero` geeft de ruimte van een eerste sectie.
// `after` komt buiten de inhoudsbreedte, binnen de sectie (voor een fotoplek aan de rand).
export function Section({ id, tone = 'white', hero = false, className = '', after, children }) {
  const space = hero ? 'pb-10 pt-10 md:pb-16 md:pt-16' : 'py-14 md:py-24';
  return (
    <section id={id} className={`${space} ${TONES[tone] ?? TONES.white} ${className}`}>
      <div className={container}>{children}</div>
      {after}
    </section>
  );
}

// Het groene deel van een grote kop. `green` is het deel van de titel dat groen wordt; staat het er niet in, dan blijft de titel zoals hij is.
export function GreenTitle({ title, green }) {
  const i = green ? title.indexOf(green) : -1;
  if (i < 0) return title;
  return (
    <>
      {title.slice(0, i)}<span className="text-green-heading">{green}</span>{title.slice(i + green.length)}
    </>
  );
}

// Eyebrow met de levende punt (concept): een kleine groene punt met een zachte ring, dan het label in kapitalen.
export function Eyebrow({ children, dot = false, className = '' }) {
  return (
    <p className={`${eyebrow} ${className}`}>
      {dot && <span aria-hidden="true" className="inline-block h-[7px] w-[7px] rounded-full bg-green-text shadow-[0_0_0_4px_#e3edd9]" />}
      {children}
    </p>
  );
}

// Tweekleurig icoon: een Lucide-icoon in groen op een mintvlak van 48 px. Decoratief.
export function IconCircle({ icon: Icon, className = '' }) {
  return (
    <span aria-hidden="true" className={`inline-flex h-12 w-12 flex-none items-center justify-center rounded-full bg-mint text-accent-dark ${className}`}>
      <Icon size={22} strokeWidth={1.6} />
    </span>
  );
}

// Callout: mintvlak met een groene streep links.
export function Callout({ as: Tag = 'p', className = '', children }) {
  return <Tag className={`rounded-r-control border-l-4 border-accent bg-mint px-6 py-5 text-ink ${className}`}>{children}</Tag>;
}

// Het slotpaneel: het donkergroene moment van een pagina. Kop, eventueel een regel eronder, de knoppen als children,
// eventueel een blok ernaast (`aside`) en een fotoplek als randaccent (`photo`). `footnote` komt onder het paneel.
export function ClosingBand({ tone = 'white', title, lead: leadText, center = false, aside, photo, footnote, children }) {
  return (
    <section className={`px-0 py-14 md:py-20 ${TONES[tone] ?? TONES.white}`}>
      <div className={`relative ${container} overflow-hidden rounded-hero bg-navy px-8 py-12 text-on-dark md:px-12 md:py-14 ${center ? 'text-center' : ''}`}>
        <div className={aside ? `grid items-center gap-8 md:grid-cols-[1fr_auto] ${photo ? 'md:pr-44' : ''}` : ''}>
          <div>
            <h2 className={`${h2Base} max-w-3xl ${center ? 'mx-auto' : ''}`}>{title}</h2>
            {leadText && <p className={`mt-4 max-w-3xl text-base leading-[1.9] text-on-dark-sub ${center ? 'mx-auto' : ''}`}>{leadText}</p>}
            <div className={`mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 ${center ? 'justify-center' : ''}`}>{children}</div>
          </div>
          {aside}
        </div>
        {photo}
      </div>
      {footnote}
    </section>
  );
}
