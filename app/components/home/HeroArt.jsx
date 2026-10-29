import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import StatusPill from '../StatusPill';

// Het herobeeld van het landingspagina-concept (29 oktober 2026): de foto van de vaas met doos en beschermpapier in een kader met
// één grote ronde hoek, daarover de klantvraag als notitie (licht gedraaid) en de artikelkaart VH-2001 zoals in de echte app:
// Engels, het beeldmerk, de statuspillen Ready en Needs data (correctie eigenaar 29 oktober, avond).
// Fictieve gegevens; het bijschrift zegt dat. De foto is decoratief voor de lay-out maar draagt een alt-tekst (het is een echt beeld).
const VASE = '/brand/photo/vaas.png';

export default function HeroArt({ t, lang }) {
  return (
    <div className="relative mx-auto mt-2 h-[360px] w-full max-w-[480px] px-2.5 sm:h-[400px] md:h-[455px] lg:ml-4 lg:mt-1 lg:h-[500px] lg:max-w-none lg:px-0">
      <div className="absolute inset-[15px_3px_37px] overflow-hidden rounded-[75px_14px_14px_14px] bg-mint md:inset-[22px_0_45px_0] md:rounded-[105px_18px_18px_18px]">
        <Image src={VASE} alt={t.photoAlt} width={1536} height={1024} priority sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full object-cover object-[47%_50%]" />
      </div>
      <div className="absolute left-0 right-10 top-0 z-[2] flex -rotate-[1.5deg] items-center gap-3 rounded-[10px] border border-line bg-white/95 px-4 py-3.5 shadow-soft md:-left-[22px] md:right-[52px] md:-rotate-2 md:px-5 md:py-4">
        <span aria-hidden="true" className="grid h-[33px] w-[33px] flex-none place-items-center rounded-full bg-mint text-green-text md:h-[38px] md:w-[38px]"><Mail size={18} strokeWidth={1.6} /></span>
        <div>
          <span className="block text-[8px] font-semibold uppercase tracking-[.09em] text-sub md:text-[9px]">{t.note.label}</span>
          <p className="mt-1 text-xs font-medium leading-snug text-ink md:text-[13px]">{t.note.text}</p>
        </div>
      </div>
      <div className="absolute bottom-[18px] left-[34px] right-0 rotate-[1.5deg] overflow-hidden rounded-card border border-frame bg-white shadow-deep md:bottom-5 md:left-[42px] md:-right-2.5">
        <div className="flex items-center gap-2.5 border-b border-line p-3 md:p-4">
          <img src="/brand/livo-mark.svg" alt="" aria-hidden="true" className="h-6 w-auto flex-none md:h-7" />
          <div><span className="block text-[9px] uppercase tracking-[.09em] text-sub">{t.record.code}</span><strong className="block text-[12px] font-medium leading-[1.45] text-ink md:text-[13px]">{t.record.name}</strong></div>
          <StatusPill tone="warning" className="ml-auto !text-[10px]">{t.record.pill}</StatusPill>
        </div>
        {t.record.rows.map((r) => (
          <div key={r.part} className="flex items-center gap-3 px-4 py-2 text-[11px] md:px-5 md:py-2.5">
            <span className="font-medium text-ink">{r.part}</span>
            <span className={`ml-auto ${r.tone === 'warning' ? 'text-amber' : 'text-sub'}`}>{r.value}</span>
            <StatusPill tone={r.tone} className="!text-[10px]">{r.status}</StatusPill>
          </div>
        ))}
        <Link href={`/${lang}#werkwijze`} className="mt-1.5 flex items-center justify-between bg-mint px-4 py-2.5 text-[10px] font-semibold text-green-text focus-ring">{t.record.link} <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" /></Link>
      </div>
      <span className="absolute -bottom-1 right-0 text-[8px] tracking-[.02em] text-sub md:text-[9px]">{t.caption}</span>
    </div>
  );
}
