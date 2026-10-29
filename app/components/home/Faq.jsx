import { Plus } from 'lucide-react';

// De vragenlijst van het concept (29 oktober 2026): native details, de eerste open; het plusje draait bij openen.
export default function Faq({ items }) {
  return (
    <div className="border-t border-line">
      {items.map(([q, a], i) => (
        <details key={q} open={i === 0} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-xs font-medium leading-[1.7] md:gap-6 md:text-[13px]">{q} <Plus size={17} strokeWidth={1.6} aria-hidden="true" className="flex-none text-accent-dark transition-transform group-open:rotate-45" /></summary>
          <p className="pb-5 pr-4 text-xs leading-[1.85] text-sub md:pb-6 md:pr-8">{a}</p>
        </details>
      ))}
    </div>
  );
}
