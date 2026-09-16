import Link from 'next/link';
import { ArrowRight, ExternalLink, Check } from 'lucide-react';
import StatusPill from './StatusPill';

const PPWR_APP_URL = 'https://ppwr.livoapps.software/';
const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded';

// Productkaart (brief §5, §13). variant "ppwr": navy kaart met punten en twee CTA's.
// variant "next": lichte kaart, status "In development", geen eigenschappen, geen datum
// (beslissing 3 van 16 september).
export default function ProductCard({ lang, variant, t }) {
  if (variant === 'ppwr') {
    return (
      <article className="flex h-full flex-col rounded-2xl bg-navy p-8 text-white">
        <StatusPill tone="ok">{t.status}</StatusPill>
        <h3 className="mt-4 font-display text-2xl font-bold">{t.name}</h3>
        <p className="mt-3 text-white/70 leading-relaxed">{t.body}</p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {t.points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm text-white/85">
              <Check size={16} aria-hidden="true" className="mt-0.5 flex-none text-accent" /> {p}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href={`/${lang}/ppwr`} className={`inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent-dark ${focusRing}`}>
            {t.ctaExplore} <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <a href={PPWR_APP_URL} rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 text-sm font-semibold text-white/85 transition-colors duration-200 hover:text-accent ${focusRing}`}>
            {t.ctaOpen} <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      </article>
    );
  }
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-8">
      <StatusPill tone="quiet">{t.status}</StatusPill>
      <h3 className="mt-4 font-display text-2xl font-bold text-ink">{t.name}</h3>
      <p className="mt-3 text-sub leading-relaxed">{t.body}</p>
      <div className="mt-auto pt-8">
        <a href="mailto:hello@livoapps.software?subject=Next%20LIVO%20module" className={`inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors duration-200 hover:text-accent-dark ${focusRing}`}>
          {t.cta} <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
