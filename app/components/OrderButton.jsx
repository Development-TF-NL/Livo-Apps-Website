import { Mail } from 'lucide-react';
import { mailto } from '../mailto';

// Tijdelijke bestelroute per e-mail (homepage v5, 1 oktober 2026): een mailto met onderwerp en voorgevulde
// tekst uit de dictionary (nav.order), velden leeg. Geldt tot 1 november 2026 en vervalt zodra het bestelproces
// op de website staat. Eén component, zodat de route op één plek weg kan.
export default function OrderButton({ t, className = '', onClick }) {
  return (
    <a href={mailto(t.mailSubject, t.mailBody)} onClick={onClick} className={className}>
      <Mail size={18} aria-hidden="true" />
      {t.cta}
    </a>
  );
}
