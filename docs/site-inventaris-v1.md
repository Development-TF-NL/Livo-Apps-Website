# Site-inventaris v1 — Livo Apps Website

*Peildatum: 23 juli 2026 · branch `main` (commit `b487d60`) · alleen-lezen inventaris t.b.v. website-refresh.*

**Vooraf:** er bestaat geen `app/page.jsx`. De homepage is `app/[lang]/page.jsx` (App Router, tweetalig).
Alle klantzichtbare teksten staan in `app/dictionaries/nl.json` en `app/dictionaries/en.json`; de
paginabestanden bevatten alleen layout. Deze inventaris dekt de homepage volledig (sectie 1–2) en de
rest van de site voor structuur/assets/techniek (sectie 3–5).

---

## 1. Klantzichtbare teksten homepage (`app/[lang]/page.jsx`)

Bron: `dictionaries/nl.json` en `en.json`, sleutel `home.*` plus `nav.*` (navigatie via layout).
Notatie: **NL** eerst, *EN* cursief erachter.

### 1.1 Navigatiebalk (`app/components/Nav.jsx`, via layout op elke pagina)

- Logo-tekst: **LIVO APPS**
- Menu-items: **Producten** *(Products)* · **Oplossingen** *(Solutions)* · **Prijzen** *(Pricing)* · **Over ons** *(About)*
- Rechts: **Inloggen** *(Log in)* · knop **Demo aanvragen** *(Book a Demo)*
- Taalwissel: **EN / NL** (aria-label "Taal" / "Language")

### 1.2 Hero (navy, met preview-blok)

- Eyebrow: **SOFTWARE DIE WERK LICHTER MAAKT** *(SOFTWARE THAT LIGHTENS)*
- H1: **Software die je werk *lichter* maakt.** *(Software that **lightens** the workflow.)* — highlight-woord in lime
- Lead: **Niet alleen door taken te automatiseren. Maar door minder wrijving. Door complexiteit begrijpelijk te maken. En door rust te brengen in drukke organisaties.** *(Not just by automating tasks. But by reducing friction. Making complexity understandable. And creating calm in busy organizations.)*
- CTA primair: **Demo aanvragen** *(Book a Demo)* → mailto (zie §3)
- CTA secundair: **Bekijk het product** *(Explore the Product)* → `/[lang]/ppwr`
- Preview-blok (alleen ≥ md zichtbaar): **PPWR Dashboard** / **Bekijk het live in een demo.** *(PPWR Dashboard / See it live in a demo.)*

### 1.3 Merk-sectie (wit)

- Eyebrow: **01 ONS MERK** *(01 OUR BRAND)*
- Kop: **Wie we zijn** *(Who we are)*
  - **Livo Apps maakt elegante software die complexiteit weghaalt uit alledaagse bedrijfsprocessen.**
  - **Wij geloven dat software mensen niet moet overweldigen. Software hoort duidelijkheid te scheppen. Software hoort licht aan te voelen.**
  - *(Livo Apps develops elegant software that removes complexity from everyday business processes. / We believe software should not overwhelm people. Software should create clarity. Software should feel light.)*
- Kop: **Onze belofte** *(Our promise)*
  - Lead: **Software die je werk lichter maakt.** *(Software that lightens the workflow.)*
  - Body: identiek aan hero-lead (NL en EN).

### 1.4 Merkpersoonlijkheid (navy, 4 traits met icoon)

- Eyebrow: **02 MERKPERSOONLIJKHEID** *(02 BRAND PERSONALITY)*
- **Elegant — Nooit luidruchtig.** *(Elegant — Never noisy.)*
- **Intelligent — Nooit arrogant.** *(Intelligent — Never arrogant.)*
- **Menselijk — Nooit bureaucratisch.** *(Human — Never bureaucratic.)*
- **Zelfverzekerd — Nooit agressief.** *(Confident — Never aggressive.)*

### 1.5 Product-sectie (wit, `id="product"`)

- Eyebrow: **03 ONS EERSTE PRODUCT** *(03 OUR FIRST PRODUCT)*
- H2: **PPWR Dashboard**
- Subtitel: **Verander verpakkingsregels in heldere acties.** *(Transform packaging regulations into clear actions.)*
- Preview-placeholder: **PPWR Dashboard** / **Illustratie — één heldere status per verpakkingstype.** *(Illustration — one clear status per packaging type.)*
- Features (met vinkje):
  1. **Zicht op je compliance** — Al je verpakkingsdata op één plek, zodat je klaar bent als er een audit komt. *(Keep compliance in view — All your packaging data in one place, so you're ready when an audit comes.)*
  2. **Automatische rapportages** — Maak PPWR-rapporten zonder ze met de hand op te bouwen. *(Automated reporting — Generate PPWR reports without rebuilding them by hand.)*
  3. **Samenwerken met leveranciers** — Deel data veilig. Werk samen. Zonder wrijving. *(Collaborate with suppliers — Share data securely. Work together. No friction.)*
- CTA: **Bekijk PPWR Dashboard** *(Explore PPWR Dashboard)* → `/[lang]/ppwr`

### 1.6 "Waarom het licht voelt"-strip (navy, 3 punten met icoon)

- **Het systeem stelt voor, jij bevestigt.** *(The system proposes, you confirm.)*
- **Al je compliance in één rustig overzicht — geen overvolle schermen.** *(All your compliance in one calm overview — no cluttered screens.)*
- **Snel ingericht, zonder gedoe.** *(Set up quickly, without the hassle.)*

### 1.7 Slot-CTA (wit)

- H2: **Klaar om je werk *lichter* te maken?** *(Ready to **lighten** the workflow?)*
- Body: **Vraag een persoonlijke demo aan en ontdek hoe Livo je compliance-proces verandert.** *(Book a personalized demo and see how Livo can transform your compliance process.)*
- CTA: **Demo aanvragen** *(Book a Demo)* → mailto

### 1.8 Footer (navy)

- Logo **LIVO APPS** + tagline: **Software die je werk lichter maakt.** *(Software that lightens the workflow.)*
- Kolom **PRODUCT**: PPWR Dashboard · Functies *(Features)* · Prijzen *(Pricing)*
- Kolom **BEDRIJF** *(COMPANY)*: Over ons *(About Us)* · Vacatures *(Careers)* · Contact
- Kolom **JURIDISCH** *(LEGAL)*: Privacybeleid *(Privacy Policy)* · Voorwaarden *(Terms)*
- Copyright: **© 2026 Livo Apps. Alle rechten voorbehouden.** *(© 2026 Livo Apps. All rights reserved.)*
- Social: **LinkedIn** · **Twitter** · **hello@livoapps.software**

---

## 2. Kleuren, fonts en classes

### 2.1 Referentie-tokens (Brand Bible)

| Token | Waarde | Token | Waarde |
|---|---|---|---|
| navy | `#081D33` | ink | `#081D33` |
| lime | `#7AC143` | sub | `#5B6B72` |
| accent-dark | `#69AD36` | line | `#E4E8EA` |
| bg | `#EEF2F3` | surface | `#FFFFFF` |

Koppen: **Satoshi** · Body: **Inter**.

De tokens zijn als CSS-variabelen gedefinieerd in **één bestand**: `app/[lang]/ppwr/page.jsx:20-44`
(inline `<style>`-blok, scoped op `.lp-root`). Nergens anders (niet in `tailwind.config.js` — die is
leeg: `theme: { extend: {} }` — en niet in `globals.css`). De homepage en Nav gebruiken uitsluitend
hardgecodeerde Tailwind arbitrary values.

### 2.2 Token-conforme kleuren en vindplaatsen

| Kleur | Vindplaats |
|---|---|
| `#081D33` (navy/ink) | `page.jsx` overal (achtergronden regels 17, 57, 98, 120; tekst op wit 39, 75, 112; knoptekst 24, 116; knop-bg 91); `Nav.jsx` tekst/actieve taalknop (22, 58, 73, 80 e.v.); `Breadcrumb.jsx:17,21`; `ppwr/page.jsx` `--navy`/`--ink` |
| `#7AC143` (lime) | `page.jsx` eyebrows (20, 41, 59, 77), highlight-spans (21, 114), CTA-knoppen (24, 116), trait-cirkels/iconen (65), vinkjes (86), focus-ring (25, 91), hover footerlinks (142, 153, 155), logo-swoosh (128); `Nav.jsx` CTA (93, 129), focus-ring (11), logo (23); `ppwr/page.jsx` `--accent` |
| `#69AD36` (accent-dark) | `Nav.jsx` hoverkleur links (80, 90, 117, 124) en CTA-hover (93, 129); `ppwr/page.jsx` `--accent-dark` (btn-hover r62, tekstlink r125) |
| `#5B6B72` (sub) | `Nav.jsx:58` (inactieve taalknop); `Breadcrumb.jsx:17,21`; `ppwr/page.jsx` `--sub` |
| `#E4E8EA` (line) | `Nav.jsx` borders (47, 69, 113, 123); `ppwr/page.jsx` `--line` |
| `#EEF2F3` (bg) | alleen `ppwr/page.jsx` `--bg` (canvas + icoontegels). **Niet op de homepage.** |
| `#FFFFFF` (surface) | `bg-white` op homepage-secties (39, 75, 112) en Nav (69, 113); `ppwr/page.jsx` `--surface` |

### 2.3 Afwijkingen van de tokens

**Kleuren (homepage & componenten):**

| Afwijkende waarde | Vindplaats | Opmerking |
|---|---|---|
| `#6AB030` | `page.jsx:24,116` (`hover:bg-[#6AB030]` op beide CTA's) | **Bijna-duplicaat van accent-dark `#69AD36`** — Nav gebruikt wél `#69AD36`; twee verschillende lime-hovers op één site |
| `#1A2F47` | `page.jsx:29,98,120,149` | Off-token navy-tint: preview-kaart-bg en footer-borders |
| `#2A3F57` | `page.jsx:29,81` | Off-token borderkleur op donkere preview-kaarten |
| `#5A9030` | `page.jsx:31` | Gradient-eindpunt (`from-[#7AC143] to-[#5A9030]`) — enige gradient op de site; Brand Bible-stijl is verder flat |
| `#13294A` | `page.jsx:91` | Hover van navy-knop, off-token |
| Tailwind `gray-300…gray-700` | `page.jsx:22,32,33,45,67,79,86,105,115,133…` | Generieke grijstinten i.p.v. `sub #5B6B72` voor vrijwel alle secundaire tekst op de homepage |
| Tailwind `border-gray-500` | `page.jsx:25` | Ghost-knop-border, off-token |
| `#9AA7AE` | `Breadcrumb.jsx:25` | Chevron-kleur, komt in geen tokenlijst voor |

**Kleuren (ppwr-pagina, bewust functioneel maar niet in de tokenlijst):**

| Waarde | Vindplaats | Rol |
|---|---|---|
| `#EAF6DD` / `#3F6B16` | `ppwr/page.jsx:32` | status "ok" pill |
| `#FEF3C7` / `#854F0B` | `ppwr/page.jsx:33` | status "warn" pill |
| `#FEE2E2` / `#991B1B` | `ppwr/page.jsx:34` | status "risk" pill |
| `#C2CDD6`, `#B8C4CE` | `ppwr/page.jsx:56,113,118` | lichte tekst op navy (off-token grijsblauw) |
| `#C9D6CC` | `ppwr/page.jsx:104` | hover-border feature-kaarten |
| `rgba(255,255,255,…)` | `ppwr/page.jsx:63,114` | ghost-knop-border, principes-grid-lijnen |

**Fonts — grootste afwijking:**

- **Satoshi en Inter worden nergens geladen.** Geen `next/font`, geen `@font-face`, geen `<link>` naar een font-CDN, niets in `public/` (die map bestaat niet).
- Homepage gebruikt `font-sans` (`page.jsx:17`) → Tailwind-default systeemstack (ui-sans-serif/system-ui), niet Inter.
- De ppwr-pagina declareert `--display: "Satoshi", "Inter", …` en `--body: "Inter", …` (`ppwr/page.jsx:36-37`), maar valt in de praktijk óók terug op de systeemstack omdat de fonts ontbreken.
- Logo-"L" gebruikt `fontFamily="serif"` (`Nav.jsx:22`, `page.jsx:127`) — rendert per OS anders.
- Conclusie voor de refresh: fonts echt laden (bij voorkeur `next/font`) én tokens centraal in Tailwind-theme zetten i.p.v. losse arbitrary values + gedupliceerd CSS-blok.

**Overige class-observaties:**

- Focus-ring-classstring is 3× gedupliceerd (`Nav.jsx:10`, `Breadcrumb.jsx:4`, inline in `page.jsx:25,91`).
- Homepage: Tailwind utilities; ppwr-pagina: eigen `lp-*` klassen via `dangerouslySetInnerHTML`-`<style>` — twee stylingsystemen naast elkaar.
- Beide systemen hebben `prefers-reduced-motion`-fallbacks (`globals.css:8-10`, `ppwr/page.jsx:140-142`).

---

## 3. Structuur: routes, navigatie en linkdoelen

### 3.1 Routes

| Route | Bestand | Status |
|---|---|---|
| `/` | `middleware.js` | Redirect naar `/en` (default locale hardcoded, geen Accept-Language) |
| `/en`, `/nl` | `app/[lang]/page.jsx` | Homepage, statisch gegenereerd (`generateStaticParams`) |
| `/en/ppwr`, `/nl/ppwr` | `app/[lang]/ppwr/page.jsx` | Productpagina LIVO PPWR |
| `/[lang]/login` | — | **Bestaat niet** — Nav linkt er wel heen → 404 |
| Onbekende locale (bv. `/de`) | `layout.jsx:18` | `notFound()` → default Next-404 |

Meer routes zijn er niet. Geen `not-found.jsx`, geen privacy-, voorwaarden-, about-, pricing- of careers-pagina.

### 3.2 Navigatiebalk (alle pagina's)

| Item | Doel | Status |
|---|---|---|
| Logo "LIVO APPS" | `/[lang]` | ✅ werkt |
| Producten / Products | `/[lang]/ppwr` | ✅ werkt |
| Oplossingen / Solutions | `/[lang]#solutions` | ⚠️ **dood anker** — geen element met `id="solutions"` |
| Prijzen / Pricing | `/[lang]#pricing` | ⚠️ **dood anker** — geen `id="pricing"` |
| Over ons / About | `/[lang]#about` | ⚠️ **dood anker** — geen `id="about"` (homepage heeft alleen `id="product"`, waar juist níets naartoe linkt) |
| Inloggen / Log in | `/[lang]/login` | ❌ **route bestaat niet → 404** |
| Demo aanvragen / Book a Demo | `mailto:hello@livoapps.software` | ⚠️ placeholder — `app/booking.js` heeft een TODO om dit te vervangen door een Microsoft Bookings-URL |
| Taalwissel EN/NL | zelfde pad, andere locale | ✅ werkt (incl. `hrefLang`) |

### 3.3 Homepage-links (buiten de nav)

- Hero-CTA "Demo aanvragen" en slot-CTA → mailto-placeholder (zie boven).
- Hero-CTA "Bekijk het product" en product-CTA "Bekijk PPWR Dashboard" → `/[lang]/ppwr` ✅.
- **Footer: vrijwel alles is dood (`href="#"`)** — PPWR Dashboard, Functies, Prijzen, Over ons, Vacatures, Privacybeleid, Voorwaarden, LinkedIn en Twitter (`page.jsx:140,153`). Alleen Contact (`mailto:`) en het e-mailadres werken.

### 3.4 PPWR-pagina-links

- Breadcrumb: Livo Apps → `/[lang]` ✅ · Producten → `/[lang]/ppwr` (linkt naar zichzelf) · LIVO PPWR (huidige pagina).
- CTA's "Demo aanvragen" (2×) → mailto-placeholder; "Bekijk hoe het werkt" → `#how-it-works` ✅ (anker bestaat, `ppwr/page.jsx:251`).
- E-maillink `hello@livoapps.software` in de slot-CTA ✅.

---

## 4. Assets

- **Geen `public/`-map.** Er staan nul statische assets in het project.
- **Logo:** geen bestand; het is een inline SVG (serif-"L" + lime swoosh, viewBox 40×40) die **2× gedupliceerd** is:
  - `Nav.jsx:18-27` (navy "L" op wit)
  - `page.jsx:126-129` (witte "L" op navy, in de footer)
- **Favicon: ontbreekt volledig** (geen `app/favicon.ico`, geen `icon.png`, geen metadata-icons) → browser toont default/404 op `/favicon.ico`.
- **Afbeeldingen/mockups: geen.** Alle "visuals" zijn code-placeholders:
  - Hero-previewblok homepage (`page.jsx:28-36`): gekleurd vlak + Zap-icoon + tekst "PPWR Dashboard".
  - Product-preview homepage (`page.jsx:81-83`): navy vlak met alleen tekst ("Illustratie — …").
  - PPWR-heropakket (`ppwr/page.jsx:200-221`): in HTML/CSS nagebouwde "verplichtingen-kaart" (progressbar 67%, 4 rijen met status-pills) — dit is de enige echte productvisual op de site.
- **Iconen:** `lucide-react` (npm, "latest" — ongepind) op homepage/Nav/Breadcrumb; handgemaakte inline stroke-SVG's op de ppwr-pagina (`ppwr/page.jsx:146-154`). Twee icoonsystemen.
- Geen OG-/social-share-afbeelding.

---

## 5. Technische observaties voor de refresh

**Stack:** Next.js ^14 (App Router, JSX zonder TypeScript), React 18, Tailwind 3, lucide-react. `next.config.js` is leeg.

1. **Fontlading: afwezig.** Satoshi/Inter worden nooit geladen (zie §2.3); de hele site draait op systeemfonts. Voor de refresh: `next/font` (Inter via Google; Satoshi is niet op Google Fonts — vergt self-hosting of Fontshare).
2. **Meta/SEO: minimaal.** Eén statische `metadata` in `app/[lang]/layout.jsx:7-10` (Engelse title + description, ook op `/nl`). Geen per-pagina metadata voor `/ppwr`, geen Open Graph/Twitter-tags, geen canonical, geen `hreflang`-alternates in de metadata (alleen `hrefLang` op de taalwissel-links), geen `sitemap.xml`, geen `robots.txt`, geen structured data.
3. **Analytics: geen.** Geen tracking-, consent- of cookiescript aanwezig (dus ook geen cookiebanner nodig in de huidige staat).
4. **404/legal: ontbreken.** Geen custom `not-found.jsx` (onbekende locale en `/login` vallen terug op de kale Next-404), en de footer belooft Privacybeleid/Voorwaarden die niet bestaan.
5. **Responsiveness: in orde, met kanttekening.** Homepage via Tailwind `md:`-breakpoints (grids klappen naar 1 kolom; hero-preview verdwijnt < md; werkende mobiele hamburger met aria-attributen in `Nav.jsx`). PPWR-pagina via eigen media query op 880px (`ppwr/page.jsx:135-139`) — een tweede, afwijkend breakpoint-systeem. Geen `viewport`-export nodig (Next default).
6. **i18n:** middleware redirect `/` → `/en` altijd (geen taal-detectie, bewuste keuze per commentaar). Dictionaries zijn netjes compleet in beide talen.
7. **Toegankelijkheid (positief):** consequente focus-visible-ringen, `aria-expanded`/`aria-controls` op de hamburger, `aria-current` op taal en breadcrumb, `prefers-reduced-motion` afgedekt.
8. **Architectuur-aandachtspunten voor de refresh:**
   - Tokens bestaan alleen als CSS-variabelen ín de ppwr-pagina; `tailwind.config.js` is leeg → geen gedeelde design-tokens. Centraliseren is de grootste quick win.
   - Twee stylingsystemen (Tailwind vs. inline `lp-*`-CSS via `dangerouslySetInnerHTML`) en twee icoonsystemen naast elkaar.
   - Logo-SVG, focus-ring-string en de mailto-demo-link (`app/booking.js`, met TODO voor Microsoft Bookings) zijn de drie centrale punten die bij een refresh in één keer goed gezet kunnen worden.
   - `lucide-react: "latest"` is ongepind in `package.json`.
