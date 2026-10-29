# Hoe het zoekbewijs in het ontwerp zit, en de wekelijkse vindbaarheidsroutine (29 oktober 2026)

*Aanvulling op `06-positionering-hero-zoekbewijs.md`. Geen juridisch advies.*

## 1. Verwerking van de zoekresultaten in het websiteontwerp

| Bevinding | Wat ermee is gedaan | Waar |
|---|---|---|
| Alle klikken zijn merkzoekopdrachten naar de homepage (NL, BE, DK) | De homepage is de landingsplek voor wie LIVO al kent: belofte, appbeeld, planselectie en hulp bovenaan; geen omweg via een demo | `app/[lang]/page.jsx` (hero, hulpblok) |
| `/nl/ppwr` staat op positie 3,9 zonder klikken | De NL-titel "PPWR-software voor importeurs en groothandels · LIVO" en de omschrijving met het productvoorbeeld blijven; de productpagina is de bestemming van de koopingang "ppwr software" en van de informatievraag over verplichtingen (sectie Voor wie). Voorstel voor de eigenaar: één alinea onder Voor wie met een redactionele vraagkop "Welke PPWR-verplichtingen gelden voor importeurs en groothandels?" met EUR-Lex als bron, pas na juridische review | `copy/ppwr.json` (product-repo), nog niet gewijzigd |
| 25 vertoningen "product data for packaging" op het Engelse leveranciersartikel, positie 57, Engelstalige landen | De EN-titel en -omschrijving van het klantvraagartikel dragen de term; voorstel: ook het leveranciersartikel een korte alinea met die woordgroep geven. Geen Nederlandse prioriteit | `app/content/kennis.json` (metadata EN) |
| "packaging data software" (2 vertoningen) | De EN-omschrijving van de productpagina begint met "Packaging data software for small teams" | `copy/ppwr.json` (product-repo) |
| "leveranciersverklaring" 100 tot 1K per maand in NL, maar breder dan PPWR | Niet verwerkt in tekst; eerst toetsen welke betekenis zoekers bedoelen (btw, douane of verpakking). Voorstel: alinea in het leveranciersartikel met bron, na review | open punt |
| "ppwr verplichtingen", "verpakkingsverordening", "verpakkingswetgeving" (elk 10 tot 100, NL) | De drie vragen in de hero ("Welke regels gelden voor jouw producten? Welke gegevens ontbreken? Wat moet je nu doen?") sluiten op deze intentie aan als productuitleg, niet als zoekopdracht; de kennisingang en de productpagina dragen de termen | hero en `/nl/kennis` |
| "ppwr" 1K tot 10K per maand | Te breed voor een koopknop; de term staat in titels en koppen, zonder eigen pagina | geen wijziging |
| Technische signalen uit de review | Canonical, hreflang, sitemap, robots en og:url op www; Organization-, BreadcrumbList- en Article-JSON-LD; kennisingang met controledatum en bronnen | `app/seo.js`, `app/sitemap.js`, `app/robots.js`, `Article.jsx` |

Niet gedaan, bewust: geen nieuwe pagina's op onbewezen vraag, geen FAQ-markup, geen koopknop op brede informatietermen, geen claims die de app niet waarmaakt.

## 2. De wekelijkse routine

Een cloud-routine in Claude Code (claude.ai/code/routines) draait elke maandag om 08:00 Nederlandse tijd (07:00 UTC) met de repo `Development-TF-NL/Livo-Apps-Website`. Zij meet de live site (statuscodes, canonicals, hreflang, metadata, H1, JSON-LD, sitemap, robots, redirects, interne links, afbeeldingsgrootte), leest Search Console als daar een toegang voor is ingericht, vergelijkt met het vorige rapport in `docs/vindbaarheid/` en herstelt alleen technische punten op een branch `seo/<jaar>-<week>` met een PR naar `main`. Teksten wijzigt zij nooit (die staan in de copybron van de product-repo); contentvoorstellen komen met zoekbewijs in het rapport. Poorten, voorwaarden en dependencies blijven buiten haar bereik. De eigenaar beslist over merge en deploy.

### Wat de eigenaar moet regelen

1. **Search Console-toegang voor de routine.** De cloud-omgeving heeft geen aanmelding van de eigenaar. Twee opties: een serviceaccount in Google Cloud met leesrechten op de property `sc-domain:livoapps.software` (JSON-sleutel als omgevingsvariabele `GSC_SERVICE_ACCOUNT_JSON` in de cloud-omgeving, met `google-auth` beschikbaar), of een regelmatig vernieuwd OAuth-token als `GSC_ACCESS_TOKEN`. Tot die tijd rapporteert de routine alleen de technische metingen en meldt zij de ontbrekende bron.
2. **Pushrechten.** De routine opent PR's op een eigen branch; zij merget nooit. Als de omgeving geen push toestaat, levert zij het rapport als eindantwoord in de run.
3. **Semrush** (API-eenheden) en **Zoekwoordplanner België** blijven handwerk tot er toegang is.
4. Het vorige rapport leeft in `docs/vindbaarheid/` zodra de eerste PR gemerged is; daarvoor vergelijkt de routine met de cijfers van 29 oktober uit haar opdracht.

*Dit document beschrijft bouw- en werkwijze-afspraken en is geen juridisch advies.*
