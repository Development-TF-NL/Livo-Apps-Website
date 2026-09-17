'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import StatusPill from './StatusPill';

// Neutrale "Log in"-knop met een compact menu "Your LIVO apps" (brief §4): één rij per
// module. Vandaag: LIVO PPWR (open) en de volgende module (in ontwikkeling, geen link,
// geen datum: beslissing 3 van 16 september). Toetsenbord: Escape sluit, Tab loopt door.
const PPWR_LOGIN_URL = 'https://ppwr.livoapps.software/login';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy rounded';

export default function ProductLoginMenu({ dict, mobile = false }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onClick = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
  }, [open]);

  const panel = (
    <div
      id="login-menu"
      role="menu"
      aria-label={dict.loginMenuTitle}
      className={`${mobile ? 'mt-2' : 'absolute right-0 mt-2 w-72'} rounded-lg border border-line bg-white p-2 text-left`}
    >
      <p className="px-2 pb-1 pt-1 text-xs font-semibold uppercase tracking-wide text-sub">{dict.loginMenuTitle}</p>
      <a
        role="menuitem"
        href={PPWR_LOGIN_URL}
        rel="noopener noreferrer"
        className={`flex items-center justify-between gap-3 rounded-md px-2 py-2 transition-colors duration-200 hover:bg-canvas ${focusRing}`}
      >
        <span>
          <span className="block text-sm font-semibold text-ink">{dict.loginPpwr}</span>
          <span className="block text-xs text-sub">{dict.loginPpwrSub}</span>
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-dark">
          {dict.loginOpen} <ExternalLink size={14} aria-hidden="true" />
        </span>
      </a>
      <div role="menuitem" aria-disabled="true" className="flex items-center justify-between gap-3 px-2 py-2 text-sub">
        <span>
          <span className="block text-sm font-semibold">{dict.loginNext}</span>
          <span className="block text-xs">{dict.loginNextSub}</span>
        </span>
        <StatusPill tone="quiet">{dict.loginNextSub}</StatusPill>
      </div>
    </div>
  );

  return (
    <div ref={rootRef} className={mobile ? '' : 'relative'}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="login-menu"
        aria-haspopup="menu"
        className={`inline-flex items-center gap-1 text-sm text-ink transition-colors duration-200 hover:text-accent-dark ${focusRing}`}
      >
        {dict.login} <ChevronDown size={16} aria-hidden="true" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && panel}
    </div>
  );
}
