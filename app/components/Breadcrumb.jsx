import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded';

// items: [{ label, href? }] — the last item is the current page (no link)
export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-6 py-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className={`text-sub transition-colors duration-200 hover:text-ink ${focusRing}`}>
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'font-medium text-ink' : 'text-sub'} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight size={14} className="text-sub/60" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
