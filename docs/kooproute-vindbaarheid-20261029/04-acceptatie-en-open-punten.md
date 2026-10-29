# Kooproute en vindbaarheid · acceptatietabel, meetrapport en open punten (29 oktober 2026)

*Branch `website/kooproute-vindbaarheid-20261029` (website-repo, vanaf `origin/main` `c593279` met cherry-pick `195043e`) en `website/kooproute-20261029` (product-repo, copybron, vanaf `f3c7ee9`). Niet gepusht, niet gepubliceerd, geen contractwijziging: de eigenaar neemt het vrijgavebesluit. Preview lokaal: `npm run build && npx next start -p 3100` met de poorten uit `.env.example`. Geen juridisch advies.*

## 1. Wat werkt, wat voorstel is, wat nog een echte omgevingstest mist

| Onderdeel | Stand | Toelichting |
|---|---|---|
| Canonical, hreflang, sitemap, robots, og:url op `www` | **werkt** (lokale build) | 14 van 14 pagina's: canonical = eigen www-URL; hreflang nl, en en x-default wederkerig; sitemap 14 URL's, alle op www en alle 200; robots wijst naar de www-sitemap. Live pas na deploy; daarna in Search Console controleren welke canonical Google kiest. |
| Redirects in één stap | **deels, buiten de code** | De apex-naar-www-redirect (308) en http-naar-https zitten in de Vercel-domeininstelling; `/` naar `/nl` (307) in de middleware. Een bezoek op `https://livoapps.software/` eindigt in twee stappen op `www…/nl`. Alle sitemap-URL's zelf redirecten na de fix niet meer. Eén stap voor de apex vereist een redirect naar `www…/nl` in Vercel (eigenaar). |
| Gestructureerde data | **werkt** | `Organization` op elke pagina (naam, logo, e-mail, LinkedIn: alle zichtbaar in de footer); `BreadcrumbList` op de productpagina, de kennisingang en de artikelen (volgt het zichtbare kruimelpad); `Article` op de twee artikelen (kop, omschrijving, taal, publicatie- en controledatum, organisatie als auteur). Geen FAQ, sterren of reviews. |
| Planselectie als primaire conversieroute | **werkt** | Hero, kopbalk, mobiel menu, prijsblok, startsectie, slot op homepage en productpagina en de artikelen gaan zonder mailprogramma naar `/[lang]/pricing#plans`. De demo blijft als tekstlink (startsectie, productpagina, prijspagina, artikelen). Mailto's op de homepage: van 7 naar 3 (demo-tekstlink, contact in de footer twee keer). |
| Bestelknop naar `/order` | **werkt in de code, ongetest op productie** | Met `SELF_SERVICE_ORDER_ENABLED=true` linken de vijf maandplannen naar `https://ppwr.livoapps.software/order?plan=<code>&period=monthly` (codes starter, core, growth, scale, enterprise, gelijk aan `choiceFromParams`). Op productie geeft `/order` op 29 oktober **404**: de route is nog niet uitgerold (uitvoerdag 30 oktober, incassokeuze bij de eigenaar). Poort uit = de startmail "LIVO PPWR starten: {plan}" met de regel "Bestellen via de website volgt". De hele kooproute (bestellen, betaalstap, bevestiging, beheerderstoegang) is alleen in de productcode en kloonproeven van de product-repo gezien, niet door Claude in een echte omgeving doorlopen. |
| Jaarbetaling | **contactroute** | "Bespreek jaarbetaling" per mail; de directe link met `period=yearly` staat klaar achter `SELF_SERVICE_ANNUAL_ORDER_ENABLED` (uit) voor ná de test (de app meldt bij jaarbetaling nu "needs a separate payment arrangement"). |
| Custom | **aanvraag** | "Vraag een passend aanbod" per mail (onderwerp "LIVO PPWR maatwerk"). |
| Taalovergang naar de Engelse bestelroute | **expliciet gemaakt** | Regel onder de plannen zodra de bestelpoort open is: "Je bestelt in de app LIVO PPWR. Het bestelformulier en de orderbevestiging zijn in het Engels; de contractdocumenten zijn Engels met een Nederlandse weergave." De orderknoppen dragen `hreflang="en"`. Een Nederlandse bestelroute is een productbacklogitem (voorstel §5.6 in `03-…`). |
| Maandactie "Probeer het een maand" | **voorstel, achter poort** | Copy van §3 staat in de bron en de dictionaries; de website toont haar alleen met `MONTH_OFFER_ENABLED=true` (hero-knop en transparantieregel, termijnregel en zoekresultaattekst van de prijspagina). Uit (standaard): "Kies je abonnement" en de standaardtermijn van 30 dagen, conform AV 6.5 en het aanbod in de app. Contract- en backendvoorstel: `03-contract-en-backendvoorstel.md`. De eerste-maand-opzegcase is **niet testbaar**: er is geen registratie van opzeggingen en de route staat niet op productie. |
| Prijsregel los van de wettelijke rol | **werkt** | Prijspagina: "Welke producten tellen mee voor je abonnement?" met de toelichting uit §3 ("Dit is alleen een prijsregel; je wettelijke verplichtingen hangen af van je rol per product en markt."). Productpagina, kaart groothandel: herschreven zonder de lezing als vrijstelling (tekstvoorstel van Claude, ter goedkeuring; geen nieuwe juridische regel). |
| Plannen hoger op de prijspagina | **werkt** | Volgorde: korte hero (kop, termijn, doelgroep en vanafprijs), direct de plannen met schakelaar, knoppen, taal- of mailregel, hulp bij de start, prijsregel; daarna de vier startstappen, voordelen, functies, slot. Op 390 px staan prijs, SKU-grens, termijn, btw-regel, hulpregel en bestelactie binnen één kaart. |
| Marketingiconen v2 | **werkt** | Twaalf iconen inline (geen dependency), navy lijnen, één lime accent, op een mintvlak van 64 px (icoon 40 px) of 48 px; `aria-hidden`; gebruikt in de vijf processtappen en het productpad (homepage), de startsecties (homepage en prijspagina) en de vier features (productpagina). Bronbestanden ongewijzigd in `public/brand/icons/`. |
| Productpad als groot beeld | **werkt (illustratie)** | Vijf rijen (import, open punten, leveranciersvraag, beoordeling, klantbestand) in de taal van de pagina, fictief artikel VH-2001, zonder tenantlabel en zonder productstatussen, gelabeld "Illustratie met fictieve gegevens"; leesbaar op 360 px. Het is een illustratie in app-stijl, geen opname van de echte (Engelstalige) app: de keuze tussen echte Engelse schermopnames en een vertaalde illustratie ligt bij de eigenaar (open punt 4). |
| Kennisingang | **werkt** | `/nl/kennis` en `/en/resources` (menu-item Kennis/Resources, footer, productpagina) met de twee artikelen en de whitepaper; per artikel "Door LIVO APPS B.V. · Inhoud gecontroleerd op 14 oktober 2026", een bronnenblok (de verordening op EUR-Lex per taal) en de vervolgstap (productpagina, demo als tekstlink). De verkeerde taal op een sectie (`/en/kennis`, `/nl/resources`) geeft 404. Geen nieuwe wettelijke inhoud. |
| Zoekresultaatteksten §3 | **werkt** | Home, product en prijzen in NL en EN; de prijsomschrijving volgt de poort van de maandactie. |
| Animatie | **niet geraakt** | Apart spoor. |

## 2. Meetrapport (lokale build, 29 oktober 2026)

| Toets | Uitkomst |
|---|---|
| `next build` met de poorten open (`PRICING`, `SELF_SERVICE_ORDER`, `MONTH_OFFER`) en dicht | beide groen (exit 0), 32 routes |
| Sitebrede woordtoets (`copy/woordtoets-site.py`, product-repo) op de productiebuild | 0 fouten met de poorten open en dicht; dezelfde regels op de zes kennisroutes: 0 fouten |
| Horizontale overloop op 360, 390, 768 en 1280 px, 14 pagina's NL en EN | 56 van 56 zonder overloop (`scrollWidth` ≤ viewport; geen element rechts buiten beeld). Twee herstelde gevallen: "verpakkingsregelgeving!" in de herokop en "verpakkingsgegevens." in de slotkoppen braken niet af op 360 px: koppen breken onder 640 px af met een afbreekstreepje (`hyphens: auto`, taal uit `lang`). |
| Toetsenbord en focus | op `/nl`, `/nl/pricing`, `/nl/ppwr`, `/nl/kennis` en een artikel draagt elk focusbaar element (143 in totaal) de klasse `focus-ring`; de schakelaar op de prijspagina houdt de bestaande randregel |
| Interne links en ankers | 29 unieke interne links, alle 200; ankers `#how`, `#about`, `#plans` bestaan; externe doelen (EUR-Lex nl/en, LinkedIn, app-login) bereikbaar |
| Canonical, hreflang, og:url, title, description, JSON-LD | per pagina gecontroleerd, zie §1; één H1 per pagina |
| CTA-bestemmingen | poort dicht: hero "Kies je abonnement" naar `/nl/pricing#plans`; plannen per startmail; transparantieregel zonder maandactie; prijsomschrijving standaard. Poort open: "Probeer LIVO PPWR een maand"; vijf `/order?plan=…&period=monthly`-links; jaarbetaling en Custom per mail; taalregel aanwezig |
| Schakelaar maand/jaar | werkt zonder JavaScript (CSS), beide standen gecontroleerd op 390 en 1280 px |
| Lighthouse of mobiele prestatietest | **niet uitgevoerd** (geen tooling zonder nieuwe dependency); nulmeting door de eigenaar in PageSpeed Insights vóór en na publicatie; geen snelheidswinst geclaimd |
| Search Console vóór- en nameting | **niet uitgevoerd** (geen toegang vanuit de bouwomgeving); eigenaar: indexstatus, gekozen canonical en zoekvragen vastleggen vóór de deploy en 2 tot 4 weken erna |
| Route bezoek naar orderstart en bevestiging | **niet meetbaar** zonder nieuwe tracking; voorstel: de bestaande Vercel Analytics-paginaweergaven op `/[lang]/pricing` en de ordertellingen in de app (`customer_order`) naast elkaar leggen, zonder extra tracking |
| Eerste-maand-opzegcase | **niet testbaar** (zie §1); testgeval beschreven in `03-…` §7 |
| Bestaande waarschuwing in de dev-server | "Each child in a list should have a unique key" uit `FeatureVisuals.jsx` (StatusVisual, fragment zonder key), vóór deze ronde al aanwezig; niet gewijzigd (bestand van de eigenaar) |

## 3. Open punten voor de eigenaar

1. **Vrijgave en publicatievolgorde.** Voorstel: eerst de SEO-commit (www, sitemap, JSON-LD) zodat de canonicalconflicten verdwijnen; daarna de kooproute-commit zodra `/order` op productie staat en `SELF_SERVICE_ORDER_ENABLED=true` gezet kan worden; `MONTH_OFFER_ENABLED` pas na §6 van `03-…`. Elke poortwijziging is een nieuwe deploy.
2. **Contractwijziging art. 6.5/6.5a** en de aanbodteksten: vrijgave door eigenaar en jurist (`03-…` §3 en §4); zonder die vrijgave blijft de maandactie uit.
3. **Jaarbetaling** via `/order?period=yearly` testen op productie vóór `SELF_SERVICE_ANNUAL_ORDER_ENABLED`.
4. **Productbeeld**: echte Engelse schermopnames van de app (met fictieve gegevens) of de vertaalde illustratie die nu staat; bij echte opnames vervalt "geen Engels in een Nederlands productbeeld" of komt er een Nederlandse app-taal.
5. **Tekstvoorstellen van Claude buiten §3** ter goedkeuring: de kaart Groothandel en distributeurs op de productpagina; de startsecties (homepage drie stappen, prijspagina vier stappen); de prijsregel "Vragen over functies of landendekking? Mail ons vóór je bestelt."; de labels van de kennisingang en de bronnenblokken; de SEO-fallbackteksten bij de poort uit (`termsStandard`, `descriptionStandard`).
6. **Voorwaarden op de website**: er staan geen juridische pagina's op `www.livoapps.software` (`/nl/legal` 404); de bestelroute toont ze in de app. Publicatiepaden blijven een backlogitem (werkafspraak regel 3).
7. **`prijskaart-20261014`** (voordeelkaart "Vraag je leveranciers uit") blijft een aparte, ongepubliceerde branch in beide repo's; niet samengevoegd en niet overschreven.
8. **Redirect apex in één stap** naar `www…/nl` in de Vercel-domeininstelling (buiten de code).
9. **Nederlandse bestelroute** (`copy.nl.json`, taalparameter) als productbacklogitem; tot die tijd de taalregel op de prijspagina.
10. **Metingen door de eigenaar**: PageSpeed Insights en Search Console vóór en na; de ordertellingen in de app naast de paginaweergaven.

*Dit document beschrijft bouw- en werkwijze-afspraken en is geen juridisch advies.*
