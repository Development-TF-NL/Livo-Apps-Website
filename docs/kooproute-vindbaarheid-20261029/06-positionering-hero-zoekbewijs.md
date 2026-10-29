# Aanvulling: positionering, hero en zoekgerichte inhoud (29 oktober 2026, avond)

*Aanvulling op het pakket van 29 oktober, uitgevoerd op de bestaande branch `website/kooproute-vindbaarheid-20261029` (website) en `website/kooproute-20261029` (copybron, product-repo). Geen nieuw onderzoek of ontwerp vanaf nul; het vrijgavebesluit is ongewijzigd (zelfbediend kopen, Stripe en de maandbelofte blijven achter de poorten). Geen push, geen publicatie, geen campagne. Geen juridisch advies.*

## 1. Bestandsverdeling Website en SEO

| Rol | Bestanden | Schrijver |
|---|---|---|
| SEO (zoekbewijs en inhoudsadvies) | dit document (§3), de metadata-voorstellen per pagina | Claude, op het zoekbewijs van de eigenaar; de eigenaar levert Search Console, Ads en Zoekwoordplanner |
| Website (verwerken van overeengekomen wijzigingen) | `copy/home.json`, `copy/ppwr.json` (product-repo, via het syncscript), `app/[lang]/page.jsx`, `app/components/home/*`, `app/content/kennis.json` (metadata) | Claude (website) |
| Niet geraakt | `copy/pricing.json`, `nav.json`, prijspagina, artikelteksten, poorten | eigenaar |

## 2. Hero en positionering (verwerkt in de preview)

| Onderdeel | Stand |
|---|---|
| Doelgroepregel | "Voor importeurs, groothandels en merken" (eyebrow met de levende punt) |
| Hoofdkop | "Jouw PPWR-expert." met de groene tweede regel "Gemaakt voor het mkb." (vervangt "Je klant vraagt verpakkingsdata. Jij hebt overzicht."; "Stop met verdrinken …" blijft de kop van de sectie Herkenbaar?, niet de hero) |
| Ondertekst | letterlijk uit de aanvulling; de drie vragen staan als productuitleg, nergens als zoekopdracht gepresenteerd |
| Ondersteunende regel | "Vanaf €99 per maand. Geen implementatiekosten. Persoonlijke hulp bij de start inbegrepen." |
| Appbeeld naast de belofte | de artikelkaart VH-2001 zoals in de app (Engels, beeldmerk, statuspillen): Outer box · Ready, Hang tag · Weight missing · Needs data, met de volgende stap; geen totaaloverzicht |
| Knoppen | "Kies je abonnement" naar de planselectie; "Ontdek de werkwijze" naar de productuitleg zonder formulier |
| Het onderscheid | sectie in drie kolommen: wat LIVO signaleert, wat LIVO voorbereidt (uitvraag via beveiligde link zonder apart account voor de leverancier, klantselectie en export, dossier per artikel), wat jij deelt, beoordeelt en bevestigt; met de regel "LIVO mailt je leveranciers niet zelf, maakt geen ontbrekend bewijs aan en neemt geen juridische verantwoordelijkheid over." Geen claim op exclusiviteit, laagste prijs of snellere implementatie; concurrenten worden niet genoemd. |
| Paginavolgorde (§5 van de aanvulling) | 1 hero met appbeeld · 2 Herkenbaar? (klant wil gegevens en bewijs) · 3 en 4 de werkwijze (Register toont wat ontbreekt, Suppliers vult aan en jij beoordeelt) · 5 het resultaat (Product passports en de export, fictief) · het onderscheid · voor wie · 6 prijs met starthulp en de passende vervolgstap · vragen · kennis · over · hulp |
| Prijsregel | "Persoonlijke hulp bij de start inbegrepen" in de prijsintro en de hero; de maandbelofte blijft achter `MONTH_OFFER_ENABLED` (prijspagina) |
| Leverancierslink zonder account | in de productcode aanwezig (`src/app/supplier/[token]`, claimtoets 14 oktober); de aanvulling noemt "mits bevestigd in de vrijgavetest": open punt 3 |

Coolset (ppwr, plans, supplier guide) is als vergelijkingspunt gelezen voor de toon: ook zij noemen expertise, onboarding en leverancierssamenwerking. Daarom staat ons onderscheid als combinatie en niet als "beter dan".

## 3. Zoekbewijs

### 3a. Bronnen (stand 29 oktober 2026, avond; uitgelezen via Claude in Chrome met de aanmelding van de eigenaar, alleen lezend)

| Bron | Stand |
|---|---|
| Search Console `sc-domain:livoapps.software` | zoektype Web, drie maanden, gegevens 13 tot en met 27 oktober 2026: 120 vertoningen, 8 klikken, gemiddelde positie 36. Per land, per pagina en per land per zoekopdracht uitgelezen (zie 3b en 3c). Van de 27 zoekopdrachten zijn de eerste 10 zichtbaar; pagina 2 en 3 van de tabel laadden niet. |
| Google Ads zoektermenrapport | **bestaat niet**: het account LIVO APPS B.V. heeft geen campagnes (overzicht "Aan de slag met Google Ads", campagnetabel leeg); dus geen vertoningen en geen zoektermen. |
| Google Zoekwoordplanner | historische cijfers opgehaald (plan "Plan gemaakt op okt 29, 2026" in het Ads-account, netwerk Google, alle talen, periode okt 2025 tot sep 2026) voor Nederland en voor alle locaties; **België** is niet gelukt: de locatiekeuze sprong twee keer terug naar "Alle locaties". Zonder actieve campagne toont de planner alleen bereiken (10–100, 100–1K, 1K–10K), geen exacte aantallen. |
| Semrush (MCP) | **ontbreekt**: actief abonnement, geen API-eenheden (melding 29 oktober); aanvullen via https://www.semrush.com/mcp-access |

### 3b. Search Console, 13 tot en met 27 oktober 2026

**Landen (top 10 van 18):** Nederland 20 vertoningen en 5 klikken; België 8 en 2; Denemarken 3 en 1; Canada 18 en 0; Verenigd Koninkrijk 18 en 0; Verenigde Staten 15 en 0; Australië 12 en 0; Turkije 10 en 0; India 3; Brazilië 2. Alle klikken komen uit Nederland, België en Denemarken.

**Pagina's (alle 6):** homepage 53 vertoningen en 8 klikken (positie 6,1; vrijwel alleen merkzoekopdrachten: livo apps, livo app, livo); `/en/resources/packaging-data-from-suppliers` 67 vertoningen en 0 klikken (positie 56,8; 21 zoekopdrachten, alle Engels); `livoapps.software/nl/ppwr` 15 en 0 (positie 3,9; zoekopdrachten niet zichtbaar); `/en/ppwr` 13 en 0; `/nl/kennis/klantvraag-verpakkingsdata` 9 en 0; `/nl/kennis/verpakkingsgegevens-leveranciers` 7 en 0.

**Zoekopdrachten (top 10 van 27, alle landen):** livo apps 1 vertoning en 1 klik; product data for packaging 25 en 0; livo app 4; packaging data software 2; packaging data management system 2; packaging data 2; packaging data management 2; packaging data solutions 2; leveranciers verklaring 2; packaging data platform 2. Op het Engelse leveranciersartikel ook: packaging data management tools 2, packaging data access 1, packaging data control 1.

**Per land:** Nederland toont één zichtbare zoekopdracht ("online emballage rapportage", 1 vertoning); de overige 19 Nederlandse vertoningen zijn door Google geanonimiseerd. België toont alleen merkzoekopdrachten (livo apps 1 klik, livo app, livo citragen). Conclusie: de Engelse termen over "packaging data" komen uit Canada, het Verenigd Koninkrijk, de Verenigde Staten en Australië op positie 57 en bewijzen geen Nederlandse of Belgische vraag.

### 3c. Zoekwoordplanner (geschatte zoekvraag, okt 2025 tot sep 2026, Google, alle talen)

| Zoekterm | Nederland | Alle locaties | Concurrentie (NL) | Opmerking |
|---|---|---|---|---|
| ppwr | 1K – 10K | 10K – 100K (+900% jaar op jaar) | normaal | breed, vooral informatie; geen koopknop op dit woord |
| leveranciersverklaring | 100 – 1K | 100 – 1K | laag | Nederlandstalig, maar niet aantoonbaar PPWR-gerelateerd (ook btw en douane) |
| ppwr software | 10 – 100 | 100 – 1K (+900%) | hoog | koopintentie; bod boven aan de pagina NL € 6,84 tot € 20,33 |
| ppwr compliance software | 10 – 100 | 10 – 100 | hoog | koopintentie |
| ppwr verplichtingen | 10 – 100 (stijgend) | 10 – 100 | hoog | informatie, relevant voor de doelgroep |
| verpakkingsverordening | 10 – 100 | 10 – 100 | normaal | informatie |
| verpakkingswetgeving | 10 – 100 | 10 – 100 | hoog | informatie |
| packaging data software | 10 – 100 | 10 – 100 | laag | Engels |
| product data for packaging | geen gegevens | geen gegevens | | de meest vertoonde term in Search Console heeft in de planner geen volume: lange staart |
| verpakkingsdata | geen gegevens | geen gegevens | | |

### 3d. Aanbevolen ingangen (maximaal vijf)

| # | Zoekterm | Bron, datum, land, periode | Cijfers | Zoekintentie | Soort | Voorgestelde vraagkop (redactioneel) | Bestemming | Reden van prioriteit |
|---|---|---|---|---|---|---|---|---|
| 1 | ppwr verplichtingen · verpakkingsverordening · verpakkingswetgeving | Zoekwoordplanner, 29 okt 2026, NL, okt 2025 tot sep 2026 | elk 10–100 per maand, "ppwr verplichtingen" stijgend; Search Console: nog geen vertoning | informatie: welke verplichtingen gelden voor mij | geschatte zoekvraag | "Welke PPWR-verplichtingen gelden voor importeurs en groothandels?" | `/nl/ppwr`, sectie Voor wie (bestaand); een eigen pagina alleen na juridische review met primaire bronnen (EUR-Lex) | hoogste relevantie voor de mkb-doelgroep; drie verwante termen samen; geen koopknop, wel de productuitleg als vervolgstap |
| 2 | ppwr software · ppwr compliance software | Zoekwoordplanner, 29 okt 2026, NL en alle locaties | NL 10–100; wereld 100–1K (+900%); hoge concurrentie | commercieel | geschatte zoekvraag | geen vraagkop; "PPWR-software voor importeurs en groothandels" staat al in de titel van `/nl/ppwr` | `/nl/ppwr` en `/en/ppwr` (bestaand) | koopintentie, klein volume; de productpagina is de juiste landing; Search Console-positie 3,9 voor `/nl/ppwr` is al goed |
| 3 | product data for packaging · packaging data software/management | Search Console, 29 okt 2026, land onbekend (vermoedelijk CA, VK, VS, AU), 13–27 okt | 25 + 2 + 2 + 2 vertoningen, 0 klikken, positie 57 | informatie: welke productgegevens horen bij verpakking | gemeten | "Product data for packaging: how to answer a customer request" | `/en/resources/customer-packaging-data-request` (EN-titel en -omschrijving aangepast); de vertoningen vielen op het leveranciersartikel, dus ook dat artikel kan een alinea "product data for packaging" krijgen | enige gemeten volume; buiten NL en BE, dus lage commerciële prioriteit, wel goedkoop te benutten |
| 4 | leveranciersverklaring | Zoekwoordplanner NL 100–1K; Search Console 2 vertoningen | 100–1K per maand, lage concurrentie | informatie: wat is een leveranciersverklaring en wat vraag je op | geschat + gemeten (klein) | "Welke verpakkingsgegevens en verklaringen vraag je aan je leverancier?" | `/nl/kennis/verpakkingsgegevens-leveranciers` (bestaand); één alinea met bron, pas na inhoudelijke review | het grootste Nederlandstalige volume, maar de term is breder dan PPWR; eerst toetsen welke betekenis zoekers bedoelen |
| 5 | ppwr | Zoekwoordplanner NL 1K–10K, wereld 10K–100K | groot, normaal concurrerend | informatie, breed | geschatte zoekvraag | geen eigen vraagkop; de kennisingang en de productpagina dragen de term al | `/nl/kennis` en `/nl/ppwr` | te breed voor een koopknop; alleen als onderdeel van langere termen (ingang 1 en 2) |

Niet gebruikt als bewijs: de FAQ van Coolset, eigen zoekopdrachten, aantallen Google-resultaten en de tien meetvragen uit het AI-vindbaarheidspakket.

## 4. Controle (lokale productiebuild)

| Toets | Uitkomst |
|---|---|
| `next build`, woordtoets | groen, 0 fouten |
| 390 px zonder horizontale scroll | homepage NL en EN, productpagina, prijspagina, kennisingang, EN-artikel: geen scroll |
| CTA-bestemmingen | hero en kopbalk naar `/nl/pricing#plans`; "Ontdek de werkwijze" naar `#werkwijze`; hulpkaarten per e-mail |
| Metadata en canonicals | 12 van 12 pagina's canonical op de eigen www-URL; titels en omschrijvingen van `/nl`, `/en/ppwr` en het EN-klantvraagartikel gecontroleerd |
| Interne links | alle 200 |

## 5. Open punten met eigenaar

1. **Zoekdata aanvullen (eigenaar):** Zoekwoordplanner voor België (de locatiekeuze lukte niet via de browser); exacte aantallen in de planner verschijnen pas bij een actieve campagne; Semrush na API-eenheden. Het zoekwoordplan van 29 oktober staat als concept in het Ads-account en kan blijven of weg. Daarna de ingangen herwegen.
2. **EN-titel van het klantvraagartikel** ("Product data for packaging: …") ter goedkeuring; de artikeltekst is niet gewijzigd.
3. **Leverancierslink zonder apart account**: in de productcode aanwezig; de zin op de homepage blijft alleen als de vrijgavetest dit bevestigt.
4. **Alinea over de leveranciersverklaring** in het leveranciersartikel: alleen na inhoudelijke review met een primaire bron; nu niet geschreven.
5. **Hulp bij de start**: de homepage zegt "persoonlijke hulp bij de start inbegrepen"; de operationele afspraak (wat, hoeveel, door wie) moet dit dekken.
6. **Maandbelofte**: blijft achter `MONTH_OFFER_ENABLED` tot aanbod, voorwaarden, bestelreview, bevestiging en opzegproces overeenstemmen (zie `03-…`).

*Dit document beschrijft bouw- en werkwijze-afspraken en is geen juridisch advies.*
