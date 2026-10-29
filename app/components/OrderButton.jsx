import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// De bestelknop (29 oktober 2026): geen mailto meer, maar de link naar de planselectie op de prijspagina
// (nav.order.cta). Als de prijspagina achter de poort zit, naar het prijsblok op de homepage. Eén component,
// zodat de bestemming op één plek staat: kopbalk, mobiel menu, prijsblok, startsectie en slot.
export function pricingHref(lang, pricingEnabled = process.env.PRICING_PAGE_ENABLED === 'true', hash = '') {
  return pricingEnabled ? `/${lang}/pricing${hash}` : `/${lang}#pricing`;
}

export default function OrderButton({ lang, t, className = '', onClick, pricingEnabled, label, hash = '' }) {
  return (
    <Link href={pricingHref(lang, pricingEnabled, hash)} onClick={onClick} className={className}>
      {label ?? t.cta}
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}
