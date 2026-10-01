import { Mail } from 'lucide-react';
import { btnPrimary, cardOnWhite, cardOnCanvas, cardTitleSmall, cardBody } from './ui';

// Aanvraagblok voor de whitepaper (17 september 2026): geen invulveld, geen opslag, geen downloadlink.
// De knop opent een mailto naar hello@livoapps.software met onderwerp en een korte voorgevulde tekst.
// Formulier met opslag volgt bij Attio en de website-privacyverklaring (backlog).
// `onCanvas`: de kaart staat op canvas en draagt de schaduw; anders staat hij op wit met een rand.
export function mailtoHref(t) {
  return `mailto:hello@livoapps.software?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(t.mailBody)}`;
}

export default function WhitepaperRequest({ t, onCanvas = false, className = '' }) {
  return (
    <div className={`${onCanvas ? cardOnCanvas : cardOnWhite} p-6 ${className}`}>
      <h2 className={cardTitleSmall}>{t.title}</h2>
      <p className={`mt-2 ${cardBody}`}>{t.lead}</p>
      <a href={mailtoHref(t)} className={`mt-5 ${btnPrimary} !px-4 sm:!px-6`}>
        <Mail size={18} aria-hidden="true" />{t.button}
      </a>
    </div>
  );
}
