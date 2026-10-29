# Terugkoppeling aan Regie: sitevernieuwing, go-live en wat tegelijk mee moet (29 oktober 2026, avond)

*Van de website- en SEO-werkchat van Claude, op verzoek van de eigenaar. Voor de Regie-chat (ChatGPT-project LIVO COMPLIANCE SUITE). Geen productievrijgave, geen contractwijziging; alles hieronder staat lokaal en is niet gepusht. Geen juridisch advies.*

## 1. Stand in één alinea

De websiteronde uit de brief `WEBSITE_KOOPROUTE_VINDBAARHEID_2026-10-29` is gebouwd en door de eigenaar in de preview goedgekeurd (29 oktober, avond). De eigenaar wil de site pas live zetten als de koopknoppen naar een werkende bestelpagina leiden en niet naar een 404. Haar voorlopige doel is dit weekend (31 oktober tot 1 november 2026). Zij vraagt Regie in kaart te brengen wat tegelijk met de sitevernieuwing live moet en hoe dat in het werkpakket wordt gevangen.

## 2. Wat er klaarstaat (lokaal, niet gepusht)

| Onderdeel | Waar | Stand |
|---|---|---|
| Website-code | repo `Livo-Apps-Website`, branch `website/kooproute-vindbaarheid-20261029` (19 commits boven `origin/main` `c593279`) | preview akkoord; build groen met de poorten open en dicht; woordtoets 0; 360/390/768/1280 px NL en EN zonder horizontale scroll |
| Copybron | product-repo, worktree `~/LIVO_AUDIT/WEBSITE-KOOPROUTE-20261029/product-wt`, branch `website/kooproute-20261029` (vanaf `f3c7ee9`) | `copy/home.json`, `nav.json`, `ppwr.json`, `pricing.json` plus CHANGELOG-regels per websitecommit; dictionaries byte-gelijk gegenereerd met `sync-dictionaries.py` |
| Inhoud van de ronde | nieuwe homepage op het landingspagina-concept (hero "Jouw PPWR-expert. Gemaakt voor het mkb."), planselectie voorop, demo niet verplicht, hulpblok, prijspagina met plannen bovenaan, kennisingang `/nl/kennis` en `/en/resources`, SEO op www (canonical, hreflang, sitemap, robots, og:url, Organization-, BreadcrumbList- en Article-JSON-LD), twaalf iconen v2, vaasfoto via `next/image`; handschrift-accent vervallen (alleen Satoshi en Inter) | |
| Bouwpoorten (Vercel-variabelen) | `PRICING_PAGE_ENABLED` (live al open), nieuw: `SELF_SERVICE_ORDER_ENABLED`, `SELF_SERVICE_ANNUAL_ORDER_ENABLED`, `MONTH_OFFER_ENABLED` (standaard uit; elke wijziging is een nieuwe deploy) | |
| Vindbaarheidsroutine | cloud-routine, elke maandag 07:00 UTC; eerste PR: https://github.com/Development-TF-NL/Livo-Apps-Website/pull/3 (alleen rapport) | Search Console-koppeling wacht op het inschakelen van de API in Google Cloud-project `livo-search-console` |

## 3. De knoppen en de 404: feitelijk

- Met `SELF_SERVICE_ORDER_ENABLED` **uit** (standaard) linken de vijf maandplannen **niet** naar `/order` maar openen zij de startmail "LIVO PPWR starten: {plan}". Er is dan geen 404. De vernieuwde site kan dus technisch eerder live dan de bestelroute, met de bestaande contact- en demoroute, precies zoals K10c route B voor 30 oktober beschrijft.
- Met de poort **aan** linken de maandplannen naar `https://ppwr.livoapps.software/order?plan=<starter|core|growth|scale|enterprise>&period=monthly`. Op productie geeft `/order` op 29 oktober **404**: de route is nog niet uitgerold. Jaarbetaling en Custom blijven per mail tot `SELF_SERVICE_ANNUAL_ORDER_ENABLED` respectievelijk altijd.
- De eigenaar kiest voor één gekoppelde go-live (site plus werkende bestelpagina) in het weekend. Dat is een ander moment dan K10c route B (30 oktober zonder koopknoppen). Regie moet die twee besluiten naast elkaar leggen.

## 4. Wat volgens de websitekant tegelijk live moet (kandidatenlijst, Regie beslist en vult aan)

| # | Onderdeel | Eigenaar van de stap | Waarom gekoppeld | Bron |
|---|---|---|---|---|
| 1 | `/order` op productie (`ppwr.livoapps.software`), met de plan- en periodeparameters zoals de website ze stuurt | productrepo, K10-route §11 | zonder deze route is de poort `SELF_SERVICE_ORDER_ENABLED` een 404 | `04-acceptatie-en-open-punten.md` rij "Bestelknop naar /order" |
| 2 | Betaalstap (SEPA-incasso), werkende webhook, bemande controle | eigenaar en productrepo, K10c | K10c: zelfbediend bestellen pas na SEPA-goedkeuring, webhook en bemande controle | `RELEASE_CHECKPOINT_2026-10-29.md` |
| 3 | Orderbevestiging, beheerderstoegang en starthulp na de bestelling (de "kooproute" uit brief §3) | productrepo | de website belooft "Zelfstandig starten, en hulp op elk gewenst moment" en een bevestiging na bestellen | brief §3; `03-…` §4 |
| 4 | Publicatie van de AV-bundel `2026.1-bestelroute` (de bestelroute toont de voorwaarden in de app; de website heeft geen juridische pagina's) | eigenaar en jurist | de bestelreview verwijst naar de gepubliceerde bundel | `04-…` open punt 6 |
| 5 | Vercel-variabele `SELF_SERVICE_ORDER_ENABLED=true` en deploy van de website, direct na 1 tot en met 4; `SELF_SERVICE_ANNUAL_ORDER_ENABLED` pas na een productietest van `/order?period=yearly`; `MONTH_OFFER_ENABLED` blijft uit tot AV 6.5a en de vijf voorwaarden uit `03-…` §6 | eigenaar (Vercel) | de website kan de poorten alleen per deploy wisselen | `.env.example`, `04-…` open punt 1 |
| 6 | Merge van beide branches (website en copybron) in dezelfde cyclus, zodat de dictionaries op `main` uit de bron reproduceerbaar blijven | eigenaar | werkafspraak twee repo's | `docs/marketing/website/LEESMIJ.md` (product-repo) |
| 7 | Taal: de bestelroute is Engels; de website zegt dat expliciet onder de plannen. Besluit of dat voor de go-live volstaat of dat `copy.nl.json` eerst moet | eigenaar | klantbelofte "mkb" en Nederlandse site | `03-…` §5.6 |
| 8 | Badges "Live" en de rolzin op `/nl/ppwr` (checkpoint punt 7): in de nieuwe copy is de SKU-telregel alleen prijsregel; de badges per functie moeten tegen de werkelijke vrijgavestand worden afgevinkt | Regie en eigenaar | de nieuwe productpagina gaat met de site mee | `RELEASE_CHECKPOINT_2026-10-29.md` punt 7 |
| 9 | Factureringsgrens 1 november (`b2_dates`: bestellingen vóór 1 november factureren vanaf 1 november; daarna vanaf de besteldatum). Een go-live op 31 oktober of 1 november valt precies op die grens; de orderbevestiging moet de juiste eerste factuurdatum tonen | productrepo en eigenaar | de website belooft "Vanaf €99 per maand" zonder datumvoorbehoud | `03-…` §2 en §5.4 |
| 10 | Na de deploy: live controle door de vindbaarheidsroutine of handmatig (canonical www, sitemap, JSON-LD, geen 404 op de kennisingang); Search Console-API aanzetten zodat de routine kan meten | eigenaar | de eerste meting na de go-live is de nulmeting voor de routine | PR 3, `08-weekrapport-44-eigenaarsacties.md` |

Buiten de koppeling (kan later, apart): demoformulier als eigen spoor; optimalisatie van de vaasfoto (bron 2 MB, `next/image` levert WebP); huisstijlbesluit v2.2 voor het concept-palet; opruimen van ongebruikte copysleutels (handschriftnotities); Zoekwoordplanner België en Semrush.

## 5. Vragen aan Regie

1. Breng in kaart welke van de tien onderdelen hierboven echt in één vrijgave moeten en welke een eigen vrijgavebesluit houden (K10c), inclusief volgorde, stopvoorwaarden en bewijs per stap, zoals in de releasechecklist C-05 tot en met C-17.
2. Vang dat als werkpakket: per onderdeel eigenaar, bewijs, poortstand (uit/aan) en het moment waarop de websitepoort om mag. Neem het besluit van de eigenaar over de gekoppelde go-live en het weekenddoel expliciet op naast K10c route B, en benoem het als die twee elkaar bijten.
3. Bevestig of de website vóór de bestelroute live mag met de poort uit (geen 404, startmail als route), als het weekend niet haalbaar blijkt. De eigenaar heeft daar nu nee op gezegd; Regie kan het als terugvaloptie meenemen.
4. Geef aan wie de canonieke `BESLISLIJST.md` bijwerkt met de besluiten van 29 oktober (K10a, K10c, gekoppelde go-live, maandactie uit, vrijgave van de websiteronde).

## 6. Wat de eigenaar nu zelf doet of beslist

- Vrijgavebesluit voor de twee branches; push met de commando's in `08-weekrapport-44-eigenaarsacties.md`.
- Enable klikken op de Google Search Console API in project `livo-search-console`; PR 3 reviewen en mergen.
- Besluit over de tekst "meetellende producten" (zie de vraag van 29 oktober, avond): de uitleg staat op de prijspagina (blok "Welke producten tellen mee voor je abonnement?"), op de productpagina (kaart 3 van Voor wie) en op de homepage onder de prijskaarten als ingeklapte vraag; voorstel om het begrip al in de aanloopregel van de prijskaarten te noemen.

## Bronnen

- `docs/kooproute-vindbaarheid-20261029/01` tot en met `08` (website-repo, branch `website/kooproute-vindbaarheid-20261029`).
- `~/.codex/.chatgpt-projects/g-p-6ac246dd69d481918c05ab2fdf41aabd/opleveringen/RELEASE_CHECKPOINT_2026-10-29.md`.
- `~/.codex/.chatgpt-projects/g-p-6ac246dd69d481918c05ab2fdf41aabd/opleveringen/WEBSITE_KOOPROUTE_VINDBAARHEID_2026-10-29/CLAUDE_BRIEF.md`.
- https://github.com/Development-TF-NL/Livo-Apps-Website/pull/3 (vindbaarheidsrapport week 44).
