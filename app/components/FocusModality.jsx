'use client';

import { useEffect } from 'react';

// De focusrand hoort bij toetsenbordfocus. Dit onderdeel merkt een link, knop of keuzerondje dat focus kreeg door
// een muisklik of aanraking met data-pointer-focus; de klasse focus-ring (globals.css) slaat zo'n element over.
// Het merk verdwijnt zodra het element de focus verliest. Tekstvelden worden niet gemerkt: daar hoort de rand ook
// bij een klik. De focus zelf blijft waar hij is; dit verandert alleen wat er te zien is.
const TEXT_FIELD = 'input:not([type=radio]):not([type=checkbox]):not([type=button]):not([type=submit]), textarea, select, [contenteditable="true"]';

export default function FocusModality() {
  useEffect(() => {
    let pointer = false;
    const onPointerDown = () => { pointer = true; };
    const onKeyDown = () => { pointer = false; };
    const onFocusIn = (e) => {
      if (pointer && e.target instanceof Element && !e.target.matches(TEXT_FIELD)) e.target.setAttribute('data-pointer-focus', '');
    };
    const onFocusOut = (e) => {
      if (e.target instanceof Element) e.target.removeAttribute('data-pointer-focus');
    };
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('focusin', onFocusIn, true);
    document.addEventListener('focusout', onFocusOut, true);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('focusin', onFocusIn, true);
      document.removeEventListener('focusout', onFocusOut, true);
    };
  }, []);
  return null;
}
