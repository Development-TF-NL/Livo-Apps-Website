import Link from 'next/link';
import { ArrowRight, ExternalLink, Check } from 'lucide-react';
import StatusPill from './StatusPill';

const PPWR_APP_URL = 'https://ppwr.livoapps.software/';

// Productkaart v2 (licht, schaduw op canvas). variant "next": in ontwikkeling, geen datum, geen eigenschappen.
export default function ProductCard({ lang, variant, t }) {
  const ppwr = variant === 'ppwr';
  return (
    <article className="flex h-full flex-col rounded-hero bg-white p-8 shadow-soft">
      <div><StatusPill tone={ppwr ? 'success' : 'quiet'} dot={ppwr}>{t.status}</StatusPill></div>
      <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink">{t.name}</h3>
      <p className="mt-3 text-sub">{t.body}</p>
      {ppwr && (
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {t.points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm text-ink"><Check size={16} aria-hidden="true" className="mt-0.5 flex-none text-accent-dark" />{p}</li>
          ))}
        </ul>
      )}
      <div className="mt-auto flex flex-wrap items-center gap-4 pt-8">
        {ppwr ? (
          <>
            <Link href={`/${lang}/ppwr`} className="inline-flex h-11 items-center gap-2 rounded-control bg-accent px-5 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-accent-dark focus-ring">{t.ctaExplore} <ArrowRight size={16} aria-hidden="true" /></Link>
            <a href={PPWR_APP_URL} rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-text focus-ring">{t.ctaOpen} <ExternalLink size={14} aria-hidden="true" /></a>
          </>
        ) : (
          <a href="mailto:hello@livoapps.software?subject=Next%20LIVO%20module" className="inline-flex items-center gap-2 text-sm font-semibold text-green-text focus-ring">{t.cta} <ArrowRight size={16} aria-hidden="true" /></a>
        )}
      </div>
    </article>
  );
}
