import { Mail } from 'lucide-react';

// Aanvraagblok voor de whitepaper (17 september 2026): geen invulveld, geen opslag, geen downloadlink.
// De knop opent een mailto naar hello@livoapps.software met onderwerp en een korte voorgevulde tekst.
// Formulier met opslag volgt bij Attio en de website-privacyverklaring (backlog).
export function mailtoHref(t) {
  return `mailto:hello@livoapps.software?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(t.mailBody)}`;
}

export default function WhitepaperRequest({ t, className = '' }) {
  return (
    <div className={`rounded-card border border-line bg-white p-6 ${className}`}>
      <h2 className="font-display text-xl font-bold text-ink">{t.title}</h2>
      <p className="mt-2 text-sm text-sub">{t.lead}</p>
      <a href={mailtoHref(t)} className="mt-5 inline-flex h-12 items-center gap-2 rounded-control bg-accent px-6 font-semibold text-ink transition-colors duration-150 hover:bg-accent-dark focus-ring">
        <Mail size={18} aria-hidden="true" />{t.button}
      </a>
    </div>
  );
}
