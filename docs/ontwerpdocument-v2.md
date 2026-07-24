# LIVO APPS — Website: ontwerp- & doorontwikkelingsdocument v2.0

*Vervangt versie 1.0 (22 juni 2026). Peildatum 23 juli 2026, gebaseerd op `docs/site-inventaris-v1.md` (website-repo, commit `b487d60`) en het marketing-bronpakket (product-repo). Levend werkdocument; hoort thuis in de website-repo als `docs/ontwerpdocument-v2.md`. Geen juridisch advies.*

---

## 1. Doel en status van dit document

Waarom de site is zoals hij is (principes), hoe hij technisch in elkaar zit (architectuur), wat de feitelijke stand is (inventaris), en wat er in de refresh gebeurt (werklijst met publicatiepoorten). Versie 1.0 beschreef een one-pager met `app/page.jsx` en Namecheap-e-mail; beide bestaan niet meer. Dit document beschrijft de werkelijkheid.

## 2. Merkbelofte en principes (ongewijzigd geldig)

Merknaam **Livo Apps** (juridisch: LIVO APPS B.V., KvK 42105799). Belofte: **"Software that lightens the workflow."** Tone of voice: Simple. Human. Clear. Direct. Persoonlijkheid: Elegant · Intelligent · Human · Confident.

De zes ontwerpprincipes uit v1.0 blijven de toetssteen: lichtheid boven volheid · één boodschap per sectie · eerlijk en geloofwaardig · helderheid in taal · consistentie in kleur en vorm · functioneel, niet decoratief.

**Nieuw sinds v1.0, bindend voor alle site-teksten:** de schrijfregels-checklist uit het marketing-bronpakket §4.2. Kern: geen kastlijntjes in klantteksten; "coming soon" voor besloten-maar-ongebouwd, nooit een leverdatum; geen ongefundeerde social proof; adviesgesprek in plaats van sales call; juridische regels altijd "Livo Apps B.V."; elke publieke pagina draagt de disclaimer-voetregel; claims altijd langs de claims-scheidslijn (§9a prijsstrategie).

## 3. Visuele identiteit

### 3.1 Kleurtokens (canoniek)

| Token | Waarde | Gebruik |
|---|---|---|
| `--navy` / `--ink` | `#081D33` | donkere vlakken, primaire tekst |
| `--accent` | `#7AC143` | CTA's, success, spaarzame accenten |
| `--accent-dark` | `#69AD36` | hover op lime (enige hover-waarde) |
| `--bg` | `#EEF2F3` | licht canvas achter kaarten |
| `--surface` | `#FFFFFF` | kaarten, contentvlakken |
| `--sub` | `#5B6B72` | secundaire tekst |
| `--line` | `#E4E8EA` | zachte randen en scheidingslijnen |

Functionele states: amber `#854F0B` op `#FEF3C7`, rood `#991B1B` op `#FEE2E2`. Flat design: geen schaduwen of gradiënten (focus-ring uitgezonderd).

**Canonisatie-notitie (23 juli 2026):** het originele brand book print Deep Navy als `#0B1D33`; de Brand Bible-skill en alles wat sindsdien gebouwd is (product, auth, prijspagina, flyer) gebruiken `#081D33`. Besloten: **`#081D33` is canon.** De site-waarden `#0B1D33`, `#6B7280`, `#6AB030`, `#1A2F47`, `#2A3F57`, `#5A9030`, `#13294A`, `#9AA7AE` en generieke Tailwind-grays zijn drift en gaan in de refresh naar de tokens. De ene gradient (`#5A9030`) vervalt (flat-regel).

### 3.2 Typografie

Koppen **Satoshi** (500/700), body **Inter** (400/500), regelafstand ≥ 1.5. Feitelijke stand: de site laadt geen van beide (systeemfonts). Refresh: Inter via `next/font/google`; Satoshi self-hosten (Fontshare-licentie) — het fontbestand dient dan meteen ook de flyer-productie (bestaand backlog-item, nu gedeeld belang).

### 3.3 Logo

Het beeldmerk (de L als pillar, de lime swoosh als flow, "strength without heaviness") heeft sinds 23 juli 2026 een **vector-master**: `livo-mark.svg` (navy op licht) en `livo-mark-inverse.svg` (wit op donker), hertekend uit de brand book-scan omdat er nooit een bronbestand heeft bestaan. Vastgelegd in de hertekening: de swoosh loopt **achter** de pillar langs (één doorlopende vorm, L eroverheen). Besluit-doc: `besluit-logo-svg-master-v1` (product-repo, na akkoord eigenaar).

De site gebruikt nu een tekst-gebaseerde inline SVG (`fontFamily="serif"`, 2× gedupliceerd in Nav en footer) die per besturingssysteem anders rendert. Refresh: vervangen door één `<Logo>`-component op basis van de master; daaruit ook favicon, app-icon en OG-afbeelding afleiden (alle drie ontbreken nu volledig).

## 4. Sitestructuur (feitelijk)

- **Tweetalig** (App Router): `app/[lang]/page.jsx` (homepage) + `app/[lang]/ppwr/page.jsx` (productpagina). Alle teksten in `app/dictionaries/{nl,en}.json`; middleware stuurt `/` altijd naar `/en` (bewuste keuze). Dictionaries zijn compleet in beide talen — elke tekstwijziging gaat altijd in beide bestanden.
- **Homepage-secties:** nav · hero · merk · merkpersoonlijkheid · product (PPWR Dashboard) · "waarom het licht voelt" · slot-CTA · footer.
- **PPWR-pagina:** eigen `lp-*`-styling met de tokens als scoped CSS-variabelen; bevat de enige echte productvisual (nagebouwde verplichtingen-kaart).
- **Gepland (refresh):** `/[lang]/pricing` (uit `docs/pricing/livo-apps-pricing-page.html`, EN + NL) · custom 404 · juridische pagina's **pas** zodra de definitieve juristteksten er zijn (DRAFT's publiceren we nooit).

## 5. Technische architectuur

| Onderdeel | Stand |
|---|---|
| Stack | Next.js ^14 (App Router, JSX), React 18, Tailwind 3, lucide-react (**ongepind — pinnen**) |
| Hosting | Vercel, project "livo-apps-website", auto-deploy vanaf GitHub `Development-TF-NL/Livo-Apps-Website` (main) |
| Domein | livoapps.software — registratie/DNS: Namecheap **[TE BEVESTIGEN of dit zo is gebleven]** |
| Productdomein | ppwr.livoapps.software (het dashboard; `/login`-links op de site horen hierheen) |
| E-mail commercieel | Microsoft 365 — adressen **[TE BEVESTIGEN: is hello@livoapps.software nog het commerciële adres; welke persoonlijke boxen]** |
| E-mail product/transactioneel | Scaleway TEM, afzender `support@livoapps.software` (SPF/DKIM/DMARC; monitoring loopt richting `p=quarantine`) |
| M365-status | **[TE BEVESTIGEN: Business-abonnement met agenda/Teams/Office actief?]** |
| Analytics | geen (refresh: Vercel Web Analytics, cookieless — geen banner nodig) |
| Meta/SEO | minimaal: één statische EN-title/description, geen OG/hreflang/sitemap/robots — refresh-item |

**DNS-werkregel (aangescherpt):** drie leveranciers delen het zone-bestand (Vercel web, Microsoft mail, Scaleway productmail). Alleen toevoegen, nooit bestaande records overschrijven. Vóór de DMARC-verscherping één integrale zone-controle uitvoeren en de uitkomst hier als tabel vastleggen. (v1.0-les: MX-records zijn al eens weggevallen bij een DNS-wijziging.)

## 6. Werkwijze

Wijzigingen via GitHub → Vercel auto-deploy (~1 min). Teksten altijd in beide dictionaries. Kleuren en fonts uitsluitend via de tokens (na de centralisatie-stap hieronder). Bij cache-verwarring: hard refresh of Vercel "Promote to Production".

## 7. Refresh-werklijst

**Fase A — fundament (geen poorten, kan direct):**
1. Tokens centraliseren in `tailwind.config.js` + `globals.css`; alle off-token kleuren vervangen; één hover-waarde (`#69AD36`); gradient eruit.
2. Fonts laden (Inter via next/font; Satoshi self-hosted).
3. `<Logo>`-component op de SVG-master; favicon + app-icon + OG-afbeelding genereren.
4. Dode links: nav-ankers aanmaken of items tijdelijk weg; `/login` → `https://ppwr.livoapps.software/login`; footer opschonen (Careers en Twitter verwijderen tot ze bestaan — eerlijk-principe); Privacy/Voorwaarden-links **verwijderen** tot de juristteksten er zijn.
5. Custom 404; lucide-react pinnen; per-pagina metadata + hreflang + sitemap + robots; Vercel Analytics aan.
6. Schrijfregels doorvoeren op beide dictionaries (o.a. kastlijntjes in de trait-regels en overal elders).

**Fase B — inhoud (deels gepoort):**
7. Demo-CTA: mailto vervangen door Microsoft Bookings-link (vergt M365-bevestiging hierboven).
8. Echte productbeelden in plaats van code-placeholders (screenshots dashboard; geen klantdata in beeld — DPA-regel).
9. Productsectie-teksten gelijktrekken met de claims-scheidslijn: "Automatische rapportages" herformuleren (rapportages = M8, bestaat niet — wél waar: DoC + technical file gegenereerd uit eigen data). "Snel ingericht, zonder gedoe" vervangen door de eerlijke onboarding-formulering tot M10 er is.
10. Whitepaper-landingssectie + downloadformulier (lead magnet), zodra de whitepaper af is.

**Fase C — pricing live (poort: concurrentie-offertes binnen):**
11. `/[lang]/pricing` bouwen uit de definitieve prijspagina (EN + NL-vertaling), inclusief lanceeractie-banner ("beschikbaar vanaf 1 september" pas na het lanceeractie-besluit), disclaimer-voetregel, slider-intent-logging (bestaand pricing-meten-item).

**Poorten samengevat:** offertes → prijspagina live · SenS-teksten → juridische pagina's · lanceeractie-besluit → banner-datum · DPA-clausule → elk klantnaam-gebruik · M10 → "live in minuten"-claim terug.

## 8. Statusoverzicht

| Onderdeel | Status |
|---|---|
| Merkidentiteit incl. vector-master | Klaar (master wacht op akkoord eigenaar) |
| Domein + deploy-pijplijn | Klaar |
| Tweetalige site live | Klaar (refresh nodig) |
| Tokens/fonts/logo op de site | Te doen (fase A) |
| Dode links / footer / 404 / SEO | Te doen (fase A) |
| Demo-boeking via M365 Bookings | Te doen (fase B, na M365-bevestiging) |
| Echte productbeelden | Te doen (fase B) |
| Prijspagina live | Wacht op poort (offertes) |
| Juridische pagina's | Wacht op poort (SenS) |
| E-mailwereld gedocumenteerd | Deels — drie [TE BEVESTIGEN]-velden in §5 |

---

*Dit document beschrijft uitsluitend werkwijze- en ontwerpafspraken en is geen juridisch advies.*
