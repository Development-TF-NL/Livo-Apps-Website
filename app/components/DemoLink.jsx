import { Mail } from 'lucide-react';
import { mailto } from '../mailto';
import { textLink } from './ui';

// De demo als secundaire route (29 oktober 2026): een tekstlink die de bestaande demomail opent (onderwerp en tekst
// uit ppwr.hero, de ene bron). Niet de verplichte toegang tot kopen; de primaire knop is OrderButton.
export default function DemoLink({ demo, label, className = '' }) {
  return (
    <a href={mailto(demo.demoSubject, demo.demoBody)} className={`${textLink} ${className}`}>
      <Mail size={16} aria-hidden="true" />{label}
    </a>
  );
}
