import { CircleAlert, Send, PencilLine, Check } from 'lucide-react';
import PhotoPlace from './PhotoPlace';

const icons = [CircleAlert, Send, PencilLine, Check];

// Leveranciersronde in vier stappen; de klant verstuurt het verzoek zelf (nuance uit de review van 16 sep).
export default function SupplierRound({ t, photoSrc }) {
  return (
    <section id="suppliers" className="scroll-mt-20 bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[.14em] text-ink-blue">{t.eyebrow}</p>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink md:text-5xl">{t.title}</h2>
          <p className="text-lg text-ink-blue">{t.lead}</p>
        </div>
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((s, i) => {
            const Icon = icons[i] ?? Check;
            return (
              <li key={s.title} className="rounded-card border border-line bg-white p-6 text-center">
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-mint ${i === 3 ? 'text-ink' : 'text-accent-dark'}`}><Icon size={24} aria-hidden="true" /></span>
                <p className="mt-4 font-display text-lg font-bold text-ink">{i + 1} · {s.title}</p>
                <p className="mt-2 text-sm text-sub">{s.body}</p>
              </li>
            );
          })}
        </ol>
        <div className="mt-8 flex justify-end"><PhotoPlace label={t.photo} src={photoSrc} className="h-24 w-64" imgClassName="h-32 w-auto" /></div>
      </div>
    </section>
  );
}
