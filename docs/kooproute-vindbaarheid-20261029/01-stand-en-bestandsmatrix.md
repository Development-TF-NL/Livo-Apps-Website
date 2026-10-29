# Kooproute en vindbaarheid · stand van 29 oktober 2026 en bestandsmatrix

*Read-only vergelijking vóór de bouw, uitgevoerd op 29 oktober 2026 op opdracht van de eigenaar (overdrachtspakket `WEBSITE_KOOPROUTE_VINDBAARHEID_2026-10-29`, `CLAUDE_BRIEF.md`). Niets in dit document is een besluit; de besluiten staan in de brief. Geen juridisch advies.*

## 1. Basis van de branch (aantoonbaar)

| Vraag | Gemeten | Keuze |
|---|---|---|
| Website `main` lokaal vs. `origin/main` | lokaal `195043e` = `origin/main` `c593279` + 1 eigen commit (`Prepare gated PPWR self-service links on pricing page`, 25 oktober: `.env.example`, `app/[lang]/pricing/page.jsx`); `origin/main` heeft 5 commits (kennispagina's, PR 2) die lokaal ontbreken. Merge-basis `072ad69`. Bestanden overlappen niet. | Branch `website/kooproute-vindbaarheid-20261029` vanaf `origin/main` (`c593279`, de live stand: `www.livoapps.software` toont de kennispagina's en de M2-nazorgcopy), daarop `195043e` als cherry-pick (`19b6e31`). Lokale `main` blijft op `195043e`; niets is overschreven. |
| Welke productcommit reproduceert de gepubliceerde dictionaries? | `sync-dictionaries.py` uit `origin/m2-nazorg-20261013` (`f3c7ee9`) geeft byte-gelijk `nl.json` en `en.json` van `origin/main`; `68c9b54` verschilt (10 regels), `prijskaart-20261014` (`4f81ada`) verschilt (4 regels: voordeelkaart leveranciers, niet live). | Copybron-branch `website/kooproute-20261029` in de product-repo vanaf `f3c7ee9`, als worktree `~/LIVO_AUDIT/WEBSITE-KOOPROUTE-20261029/product-wt` (de hoofdkopie staat op `k1-01-recorded-declarations` met 116 ongepushte commits en is niet aangeraakt). `prijskaart-20261014` blijft een aparte, ongepubliceerde branch. |

## 2. Veranderlijke feiten, opnieuw gemeten op 29 oktober 2026 (curl, read-only)

| Onderdeel | Gemeten | Gevolg |
|---|---|---|
| Host | `https://livoapps.software/nl` → 308 → `https://www.livoapps.software/nl` (200). `http://` → 308 → `https://` apex → 308 → www. | `www` is de definitieve host (bevestigt de review). Canonical, hreflang, sitemap, robots en `metadataBase` staan in de code nog op de apex: te corrigeren. |
| Canonical en hreflang live | `<link rel="canonical" href="https://livoapps.software/nl">`, hreflang nl/en/x-default naar de apex; `og:image` en `og:url`-basis op de apex. | Conflict canonical vs. redirect, zoals de review meldde. |
| Sitemap en robots | `sitemap.xml` bevat 12 apex-URL's (alle 308 naar www); `robots.txt` wijst naar de apex-sitemap. `/pricing` staat in de sitemap: de poort `PRICING_PAGE_ENABLED` staat op productie open. | Alleen 200-URL's op www opnemen. |
| Kennisingang | `/nl/kennis` en `/en/resources` geven 404; de twee artikelen geven 200; geen menu-item Kennis. | Indexpagina's en menu-item bouwen (P1). |
| Juridische pagina's op de website | `/nl/legal`, `/legal/terms` (307 naar `/nl/legal/terms` → 404): er staan geen voorwaarden op de website. | De contractdocumenten worden in de bestelroute van de app getoond (`/order/document/<id>`); de website linkt niet naar voorwaarden. Open punt voor de eigenaar (publicatiepaden, backlog). |
| Bestelroute productie | `https://ppwr.livoapps.software/order` en `/order?plan=core&period=monthly`: **404**. `/login` 200. | De publieke bestelroute is op productie niet uitgerold. De productcode (hostspiegel `release-kandidaat-20261029`, `e3e1d44`) bevat de route; de backlog (W-B8-097, 29 oktober) noemt 30 oktober als uitvoerdag met de incassokeuze bij de eigenaar. De website houdt de knoppen achter `SELF_SERVICE_ORDER_ENABLED` (standaard uit). |
| Taal van de bestelroute | `src/components/order/copy.en.json` (alleen Engels); `OrderJourney.jsx` heeft vaste Engelse labels; de contractdocumenten zijn Engels met Nederlandse weergave (`fixed.document_language`). | Geen Nederlandse bestelroute. De website maakt de taalovergang expliciet vóór de knop (P0). Nederlandse bestelcopy is een productbacklogitem (zie `03-contract-en-backendvoorstel.md`). |
| Aanbodteksten in de app | `b2_offer_json`: maandelijks "Indefinite term, billed monthly in advance." / "You may cancel at any time with at least 30 days' notice." / "Continues until cancelled."; jaarlijks "One year, billed annually in advance." / "You may cancel at the end of the annual term with at least 30 days' notice." Vóór 1 november 2026: dienst vanaf besteldatum, facturering vanaf 1 november 2026. | De maandactie (stoppen vóór maand twee) staat nergens in aanbod, review, bevestiging of voorwaarden (AV 2026.1 art. 6.5: minimaal 30 dagen). Niet live zetten zonder de afstemming uit §4 van de brief; op de website achter `MONTH_OFFER_ENABLED` (standaard uit). |
| Jaarbetaling in de app | `proposedErrors.payment_limit_exceeded`: "Annual payment needs a separate payment arrangement. Choose monthly billing or contact LIVO." | Jaarbetaling krijgt geen directe bestelknop; blijft een contactroute, achter `SELF_SERVICE_ANNUAL_ORDER_ENABLED` (standaard uit) voor ná de test. |
| Custom | `quote_only` → `quote_required` in de app; website: aanvraag per mail. | Blijft een aanvraag. |
| Demo-knoppen live | 5 `mailto:`-knoppen met onderwerp op `/nl` (hero, prijsblok, startsectie, menu, kopbalk mobiel) plus 2 kale mailto's. | Vervangen door planselectie (P0); demo blijft als tekstlink beschikbaar. |
| Prijsregel live | Prijspagina: "Alleen je eigen merken en import tellen." Productpagina (Groothandel en distributeurs): "Alleen je eigen merken en import tellen; wat je doorverkoopt niet." | Beide herformuleren als prijsregel, los van de wettelijke rol (P0). |
| Gestructureerde data live | geen JSON-LD. | `Organization`, `BreadcrumbList`, `Article` alleen waar de zichtbare pagina het draagt. |
| Lighthouse / mobiele prestatietest | niet beschikbaar in deze omgeving (geen Lighthouse zonder nieuwe dependency). | Niet gemeten; geen snelheidsclaim. Nulmeting door de eigenaar in PageSpeed Insights vóór en na publicatie. |
| Search Console | geen toegang vanuit de bouwomgeving. | Vóór- en nameting door de eigenaar (indexstatus, canonical gekozen door Google, zoekvragen). |

## 3. Bestandsmatrix: één schrijver per bestand

Schrijver "Claude (website)" = deze branch in de website-repo; "Claude (copybron)" = de branch `website/kooproute-20261029` in de product-repo (worktree); "sync" = gegenereerd met `docs/marketing/website/copy/sync-dictionaries.py`, nooit met de hand; "eigenaar" = niet door Claude gewijzigd.

| Bestand | Schrijver | Wat |
|---|---|---|
| `docs/marketing/website/copy/home.json` (product) | Claude (copybron) | homepage: hero, kooproute, proces met vijf stappen, verantwoordelijkheid, start, slot, metadata (§3 van de brief) |
| `docs/marketing/website/copy/nav.json` (product) | Claude (copybron) | menu: Kennis; de kopbalkknop naar de prijzen; de demomail als aparte sleutel |
| `docs/marketing/website/copy/ppwr.json` (product) | Claude (copybron) | productpagina: knoppen naar de prijzen, slot, prijsregel bij groothandel, metadata (§3) |
| `docs/marketing/website/copy/pricing.json` (product) | Claude (copybron) | prijspagina: H1, termijnregel, knoplabels, prijsregelkop en -toelichting, startstappen, taalnotitie, metadata (§3); ladder ongewijzigd |
| `docs/marketing/website/copy/whitepaper.json` (product) | eigenaar | ongewijzigd |
| `docs/marketing/website/CHANGELOG.md` (product) | Claude (copybron) | één regel voor deze ronde |
| `app/dictionaries/nl.json`, `app/dictionaries/en.json` | sync | gegenereerd |
| `app/seo.js` | Claude (website) | `SITE_URL` (www), hreflang, social, JSON-LD-helpers |
| `app/[lang]/layout.jsx` | Claude (website) | `metadataBase` op www; Organization-JSON-LD |
| `app/sitemap.js`, `app/robots.js` | Claude (website) | www; kennisindex erbij |
| `app/[lang]/page.jsx` | Claude (website) | homepage op de nieuwe klantreis |
| `app/[lang]/pricing/page.jsx` | Claude (website) | plannen bovenaan, termijn, hulp bij start, knoppen per poort, prijsregel, startstappen |
| `app/[lang]/ppwr/page.jsx` | Claude (website) | knoppen naar de prijzen, iconen, kennisblok, breadcrumb-JSON-LD |
| `app/[lang]/kennis/page.jsx`, `app/[lang]/resources/page.jsx` | Claude (website) | nieuw: kennisingang per taal |
| `app/components/Nav.jsx`, `Footer.jsx` | Claude (website) | menu-item Kennis; kopbalkknop naar de prijzen |
| `app/components/OrderButton.jsx` | Claude (website) | wordt de link naar de prijspagina (geen mailto) |
| `app/components/DemoLink.jsx` | Claude (website) | nieuw: de demomail als tekstlink (secundair) |
| `app/components/PricingPreview.jsx`, `OnlineSignupSection.jsx` | Claude (website) | knop naar de prijzen; startsectie op zelf starten en hulp bij de start |
| `app/components/MarketingIcon.jsx` | Claude (website) | nieuw: de twaalf v2-iconen (inline SVG, geen dependency) |
| `app/components/ProcessSteps.jsx`, `ProductPath.jsx` | Claude (website) | nieuw: vijf processtappen met iconen; het grote productpad als illustratie |
| `app/components/JsonLd.jsx` | Claude (website) | nieuw |
| `app/components/Article.jsx` | Claude (website) | verantwoordelijke organisatie, controledatum, bronnen, vervolgstap, Article- en BreadcrumbList-JSON-LD; leesblok met whitepaper |
| `app/content/kennis.json`, `kennis.js` | Claude (website) | controledatum en bronnen per artikel; indexlabels (de artikelteksten staan in de website-repo, zie de notitie van 14 oktober) |
| `public/brand/icons/*.svg` | Claude (website) | de twaalf SVG's ongewijzigd gekopieerd (referentie; de component rendert inline) |
| `.env.example` | Claude (website) | `SELF_SERVICE_ANNUAL_ORDER_ENABLED`, `MONTH_OFFER_ENABLED` |
| `middleware.js`, `next.config.js`, `tailwind.config.js`, `app/globals.css`, `app/components/ui.jsx`, `RegisterFragment.jsx`, `FeatureVisuals.jsx`, `SupplierCycle.jsx`, whitepaper-bestanden, `app/api/*` | eigenaar | ongewijzigd |
| Animatie | apart spoor | niet geraakt |

*Dit document beschrijft bouw- en werkwijze-afspraken en is geen juridisch advies.*
