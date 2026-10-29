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

### Ingericht op 29 oktober 2026 (avond, via Chrome met de aanmelding van de eigenaar)

| Stap | Stand |
|---|---|
| Google Cloud-project | `livo-search-console` aangemaakt (account catelijnejoling@gmail.com, geen organisatie, gratis proefperiode) |
| Google Search Console API | ingeschakeld in dat project |
| Serviceaccount | `search-console-reader@livo-search-console.iam.gserviceaccount.com`, zonder projectrollen, nog zonder sleutel |
| Search Console, Gebruikers en rechten | het serviceaccount is toegevoegd aan de property `livoapps.software` (bedoelde rol Beperkt; zie de controle in de sessie) |
| Sleutel en omgevingsvariabele | **niet door Claude gedaan**: een sleutel is een wachtwoord. De eigenaar maakt in Google Cloud (IAM en beheer, Serviceaccounts, search-console-reader, tabblad Sleutels) een JSON-sleutel en plakt de inhoud als `GSC_SERVICE_ACCOUNT_JSON` in de cloud-omgeving "Default" op https://claude.ai/code/environments, met `GSC_PROPERTY=sc-domain:livoapps.software` en als setup-opdracht `pip install google-auth google-auth-httplib2`. |

### Eerste runs en waar de resultaten staan (29 oktober 2026, avond)

De routine draaide twee keer handmatig (19:38 en 20:08 UTC). Beide runs konden de live site niet bereiken (netwerkpolicy van de omgeving) en niet pushen (de Claude GitHub-app heeft geen toegang tot de repo, 403). De tweede run zag `GSC_PROPERTY` en `GSC_SERVICE_ACCOUNT_JSON` wel staan, maar riep de API nog niet aan. De prompt is daarna aangescherpt: echte tokenaanvraag met het serviceaccount, herkenning van de proxyblokkade, rapport plus diff in het eindantwoord als pushen faalt, en twee vaste slotblokken (Stand, Acties voor de eigenaar). Resultaten staan per run onder https://claude.ai/code/routines/trig_01CXK326ngSytJhTKmJTsi3G (niet in de gewone sessielijst), als pushmelding op de telefoon, en zodra pushen werkt als PR op branch `seo/<jaar>-<week>` en na merge in `docs/vindbaarheid/`. Derde run (20:20 UTC, na GitHub-app en netwerktoegang door de eigenaar): live site gemeten, rapport gepusht als PR 3 (https://github.com/Development-TF-NL/Livo-Apps-Website/pull/3); Search Console nog 403 omdat de Google Search Console API in project `livo-search-console` niet ingeschakeld bleek (eigenaar klikt Enable). Het weekrapport 44 met de eigenaarsacties staat in `docs/kooproute-vindbaarheid-20261029/08-weekrapport-44-eigenaarsacties.md` (het rapport van de routine zelf staat in PR 3 als `docs/vindbaarheid/2026-44.md`).

### Wat de eigenaar moet regelen

1. **Search Console-toegang voor de routine.** De cloud-omgeving heeft geen aanmelding van de eigenaar. Twee opties: een serviceaccount in Google Cloud met leesrechten op de property `sc-domain:livoapps.software` (JSON-sleutel als omgevingsvariabele `GSC_SERVICE_ACCOUNT_JSON` in de cloud-omgeving, met `google-auth` beschikbaar), of een regelmatig vernieuwd OAuth-token als `GSC_ACCESS_TOKEN`. Tot die tijd rapporteert de routine alleen de technische metingen en meldt zij de ontbrekende bron.
2. **Pushrechten.** De routine opent PR's op een eigen branch; zij merget nooit. Pushen werkt pas als de Claude GitHub-app op de repo is geïnstalleerd (https://github.com/apps/claude/installations/select_target); tot die tijd levert zij het rapport met diff als eindantwoord in de run. Daarnaast moet de netwerktoegang van de cloud-omgeving `www.livoapps.software`, `livoapps.software`, `oauth2.googleapis.com` en `searchconsole.googleapis.com` toestaan.
3. **Semrush** (API-eenheden) en **Zoekwoordplanner België** blijven handwerk tot er toegang is.
4. Het vorige rapport leeft in `docs/vindbaarheid/` zodra de eerste PR gemerged is; daarvoor vergelijkt de routine met de cijfers van 29 oktober uit haar opdracht.

*Dit document beschrijft bouw- en werkwijze-afspraken en is geen juridisch advies.*
