# Vindbaarheid: weekrapport 44 (29 oktober 2026) met acties voor de eigenaar

*Opgesteld in de werksessie van 29 oktober 2026 op basis van de twee eerste runs van de cloud-routine "LIVO website: vindbaarheid en indexering (wekelijks)". De routine zelf kon haar rapport nog niet in de repo zetten (zie Stand). Geen juridisch advies.*

## Waar je de resultaten elke week vindt

| Plek | Wat je daar ziet | Stand |
|---|---|---|
| https://claude.ai/code/routines/trig_01CXK326ngSytJhTKmJTsi3G | De routine met al haar runs. Klik op een run voor het volledige eindantwoord. Runs staan **niet** in de gewone sessielijst van claude.ai/code. | werkt |
| Pushmelding op je telefoon (Claude-app) | Korte samenvatting direct na elke run. | werkt (beide runs stuurden er een) |
| Pull request op GitHub, branch `seo/<jaar>-<week>`, met het rapport als beschrijving | De plek waar je mergt en deployt. | werkt sinds run 3: https://github.com/Development-TF-NL/Livo-Apps-Website/pull/3 |
| `docs/vindbaarheid/<jaar>-<week>.md` op `main` | Het archief, nadat je de PR hebt gemerged. | leeg tot de eerste merge |

Vanaf de volgende run eindigt elk rapport met twee vaste blokken: **Stand** en **Acties voor de eigenaar** (push, merge en deploy; toegang en instellingen; besluiten), met per actie de exacte handeling en de melding "nog open sinds week …" voor wat blijft liggen.

## Stand na de runs van 29 oktober 2026

| Run | Tijd (UTC) | Resultaat |
|---|---|---|
| cse_01L4oLKPFUeF4V7Pn27qgPWg | 19:38 tot 19:42 | Live site onbereikbaar (netwerkpolicy, 403 op CONNECT). Geen `GSC_*`-variabelen. Lokale build gemeten: alle pagina's 200, unieke title en description, één H1, wederkerige hreflang, 14 interne links 200. Gevonden: canonicals, sitemap en robots op `main` wijzen naar de apex in plaats van www; geen JSON-LD; `box.png` 1,8 MB en `seedling.png` 1,4 MB. Fix lokaal gemaakt, push 403, geen PR. |
| cse_01L4oLKRtvUYL2ysKeeVbzXV | 20:20 tot 20:23 | Na de GitHub-app en de netwerktoegang (eigenaar, 20:19): live site gemeten (14 pagina's, 27 interne links zonder 404, redirects apex en http naar www en https in orde; op `main` nog apex-canonicals, geen JSON-LD, `/nl/kennis` en `/en/resources` 404, `box.png` 1,8 MB en `seedling.png` 1,4 MB). Search Console: tokenaanvraag gelukt, alle zestien aanroepen 403 omdat de Google Search Console API in project 132315037746 (`livo-search-console`) niet is ingeschakeld. Rapport gepusht op `seo/2026-44`, PR 3 geopend, geen codewijziging. |
| cse_01L4oLKQA7UMcxLJ2qJRxbrn | 20:08 tot 20:11 | Live site nog steeds onbereikbaar. `GSC_PROPERTY` en `GSC_SERVICE_ACCOUNT_JSON` zijn nu aanwezig (de omgevingsvariabelen staan dus goed), maar de routine deed geen echte tokenaanvraag en meldde Search Console als niet gemeten. Zelfde apex-fout hersteld op een lokale branch, build groen, push 403, geen PR. |

De apex-fout, de ontbrekende JSON-LD en de zware hero-afbeeldingen zijn op de werkbranch `website/kooproute-vindbaarheid-20261029` al opgelost (www-canonicals, Organization-, BreadcrumbList- en Article-JSON-LD, vaasfoto via `next/image`). De routine ziet alleen `main`, en daar staat die branch nog niet op. Zodra de branch gemerged is, vindt de routine deze punten niet meer.

Prompt van de routine aangescherpt op 29 oktober (avond): Search Console wordt voortaan echt aangeroepen met het serviceaccount (tokenaanvraag, zoekopdrachten, pagina's, landen NL en BE, URL-inspectie van veertien pagina's), een 403 van de proxy wordt herkend als netwerkblokkade, bij een push-403 levert zij rapport plus diff in het eindantwoord, en elk rapport sluit af met de twee vaste blokken.

## Metingen

**A. Live site:** niet gemeten (netwerkpolicy). Lokale productiebuild van `main`: 14 pagina's 200, metadata compleet, apex-canonicals (fout, zie boven).

**B. Search Console:** niet opgehaald. Variabelen staan klaar; de volgende run doet de echte aanroep. Laatste handmatige cijfers (13 tot 27 oktober): 120 vertoningen, 8 klikken, alle klikken op merkzoekopdrachten; `/nl/ppwr` positie 3,9 zonder klikken; "product data for packaging" 25 vertoningen op het Engelse leveranciersartikel (positie 57).

**C. Vergelijking met vorige week:** eerste rapport, geen vergelijking.

## Acties voor de eigenaar

### (a) Push, merge en deploy

1. **Websiteronde vrijgeven.** Branch `website/kooproute-vindbaarheid-20261029` (16 commits, niets gepusht) bevat de kooproute, het nieuwe ontwerp, de www-canonicals, JSON-LD en de kennisingang. Na je vrijgavebesluit:
   ```bash
   cd "/Users/catelijnejoling/Documents/GitHub/Livo Apps Website" && git push -u origin website/kooproute-vindbaarheid-20261029
   ```
   Open daarna op GitHub een PR naar `main`, merge, en zet in Vercel de nieuwe bouwvariabelen (`SELF_SERVICE_ORDER_ENABLED`, `SELF_SERVICE_ANNUAL_ORDER_ENABLED`, `MONTH_OFFER_ENABLED`, standaard `false`) voordat de deploy draait.
2. **Copybron vrijgeven.** Product-repo, worktree `~/LIVO_AUDIT/WEBSITE-KOOPROUTE-20261029/product-wt`, branch `website/kooproute-20261029`:
   ```bash
   cd ~/LIVO_AUDIT/WEBSITE-KOOPROUTE-20261029/product-wt && git push -u origin website/kooproute-20261029
   ```
   De maandactie ("Probeer het een maand") blijft dicht tot AV 6.5a is vastgesteld (`docs/kooproute-vindbaarheid-20261029/03-contract-en-backendvoorstel.md`).

### (b) Toegang en instellingen

3. **GitHub-toegang voor de routine.** Gedaan door de eigenaar op 29 oktober (20:19): run 3 pushte en opende PR 3.
4. **Netwerktoegang van de cloud-omgeving.** Gedaan door de eigenaar op 29 oktober: run 3 bereikte de live site en Google.
4a. **Google Search Console API inschakelen.** In project `livo-search-console` (nummer 132315037746) staat de API nog op "Enable"; de inschakeling van eerder op de avond is niet doorgekomen en drie klikken via Chrome op 29 oktober (21:25) veranderden niets. Open https://console.cloud.google.com/apis/library/searchconsole.googleapis.com?project=livo-search-console, klik op **Enable** en wacht tot de knop verandert in "Manage". Controle: op https://console.cloud.google.com/apis/dashboard?project=livo-search-console moet "Google Search Console API" in de lijst staan. Daarna de routine opnieuw starten; de tokenaanvraag werkte al.
5. **Rol van het serviceaccount.** In Search Console staat `search-console-reader@livo-search-console.iam.gserviceaccount.com` op de property `livoapps.software` nu met de rol Volledig; de bedoelde rol is Beperkt (lezen is genoeg). Search Console, Instellingen, Gebruikers en rechten, de drie puntjes achter het account, Rechten wijzigen.
6. **Nog open:** Semrush zonder API-eenheden; Zoekwoordplanner België niet gelukt. Handwerk tot er toegang is.

### (c) Besluiten

7. Contentvoorstellen uit `docs/kooproute-vindbaarheid-20261029/06-positionering-hero-zoekbewijs.md`: alinea over PPWR-verplichtingen op `/nl/ppwr` (pas na juridische review), korte alinea "product data for packaging" in het Engelse leveranciersartikel, betekenis van "leveranciersverklaring" toetsen voordat die term ergens landt.
8. Huisstijl: het concept-palet (donkergroen, lime van het logo) wijkt af van huisstijl v2.1; besluit nodig of dit v2.2 wordt (`docs/kooproute-vindbaarheid-20261029/05-herontwerp-landingspagina-concept.md`).
