import RegisterFragment from './RegisterFragment';
import { Check, ArrowRight } from 'lucide-react';

const FILE = {
  excel: { bg: 'bg-file-excel', label: 'XLS' },
  mail: { bg: 'bg-file-mail', label: '@' },
  pdf: { bg: 'bg-file-pdf', label: 'PDF' },
  folder: { bg: 'bg-file-folder', label: '▭' },
};

// Hero-visual (stijlblad v2 §05): inputkaartjes met bestandstype-pictogrammen, verbinder in Ink Blue,
// het Register als middelpunt, uitkomstkaart in mint.
export default function HeroFlow({ t }) {
  return (
    <div aria-label={t.label} className="min-w-0">
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-4 md:grid-cols-[184px_40px_minmax(0,1fr)]">
        <ul className="grid gap-3">
          {t.files.map((f) => {
            const k = FILE[f.kind] ?? FILE.folder;
            return (
              <li key={f.title} className="flex items-center gap-3 rounded-[14px] bg-white p-3 shadow-soft">
                <span aria-hidden="true" className={`flex h-10 w-10 flex-none items-center justify-center rounded-[10px] text-xs font-bold text-white ${k.bg}`}>{k.label}</span>
                <span className="min-w-0"><span className="block text-sm font-semibold leading-tight text-ink">{f.title}</span><span className="block text-xs text-sub">{f.sub}</span></span>
              </li>
            );
          })}
        </ul>
        <ArrowRight size={36} aria-hidden="true" className="mx-auto rotate-90 text-ink-blue md:rotate-0" />
        <RegisterFragment t={t.register} compact />
      </div>
      <div className="mt-4 flex justify-end">
        <div className="inline-flex items-center gap-2.5 rounded-[14px] bg-mint px-4 py-3 font-semibold text-ink shadow-soft">
          <Check size={22} aria-hidden="true" className="text-accent-dark" /> {t.outcome}
        </div>
      </div>
      <p className="mt-3 text-right text-xs text-sub">{t.label}</p>
    </div>
  );
}
