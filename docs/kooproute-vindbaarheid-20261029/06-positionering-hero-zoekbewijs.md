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

### 3a. Bronnen

| Bron | Stand 29 oktober 2026 |
|---|---|
| Search Console `livoapps.software` | read-only bekeken door de eigenaar: zoektype Web, drie maanden, geen landfilter; gegevens 13 tot en met 27 oktober 2026; 120 vertoningen, 8 klikken, 27 termen zichtbaar. Niet beschikbaar in de bouwomgeving: pagina's per zoekopdracht, landen (NL en BE afzonderlijk). |
| Google Ads zoektermenrapport | **ontbreekt**: geen toegang vanuit de bouwomgeving; onbekend of campagnes vertoningen hadden |
| Google Zoekwoordplanner (NL en BE) | **ontbreekt**: geen toegang vanuit de bouwomgeving |
| Semrush (MCP) | **ontbreekt**: het account heeft een actief abonnement maar geen API-eenheden meer (melding 29 oktober, trace `6d9527cc89fab99653ccb1a5f04f7e6b`); aanvullen via https://www.semrush.com/mcp-access |

Gevolg: alleen de gemeten zoekopdrachten uit de selectie van de eigenaar zijn bewijs. Alles daarbuiten is hypothese.

### 3b. Gemeten zoekopdrachten (Search Console, 13 tot 27 oktober 2026, land onbekend)

| Zoekopdracht | Vertoningen | Klikken | Soort |
|---|---:|---:|---|
| product data for packaging | 25 | 0 | gemeten zoekopdracht |
| packaging data software | 2 | 0 | gemeten zoekopdracht |
| packaging data management system | 2 | 0 | gemeten zoekopdracht |
| packaging data management | 2 | 0 | gemeten zoekopdracht |
| leveranciers verklaring | 2 | 0 | gemeten zoekopdracht; PPWR-relatie niet aangetoond |
| online emballage rapportage | 1 | 0 | gemeten zoekopdracht |

Dit zijn vertoningen van onze site, geen zoekvolumes. De Engelse termen bewijzen geen Nederlandse zoekvraag.

### 3c. Aanbevolen ingangen (maximaal vijf)

| # | Zoekterm | Bron, datum, land, periode | Cijfers | Zoekintentie | Soort | Voorgestelde vraagkop (redactioneel) | Bestemming | Reden van prioriteit |
|---|---|---|---|---|---|---|---|---|
| 1 | product data for packaging | Search Console, 29 okt 2026, land onbekend, 13–27 okt | 25 vertoningen, 0 klikken | informatie: welke productgegevens horen bij verpakking, wat levert een leverancier of klant | gemeten | "Product data for packaging: how to answer a customer request" | `/en/resources/customer-packaging-data-request` (bestaand; EN-titel en -omschrijving aangepast, tekst ongewijzigd) | de enige term met zichtbaar volume op onze site; 0 klikken wijst op een titel die niet aansloot |
| 2 | packaging data software · packaging data management (system) | idem | 2 + 2 + 2 vertoningen | commercieel: software om verpakkingsdata te beheren | gemeten, klein | "Packaging data software for small teams" (als zin in de omschrijving, geen nieuwe pagina) | `/en/ppwr` (bestaand; EN-omschrijving aangepast) | koopintentie past bij de productpagina; te klein voor een eigen pagina |
| 3 | leveranciers verklaring · leveranciersverklaring | Search Console (2 vertoningen) plus starterm uit de aanvulling | 2 vertoningen; NL-volume onbekend | informatie: wat is een leveranciersverklaring en wat vraag je op | gemeten (klein) + hypothese | "Welke verpakkingsgegevens en verklaringen vraag je aan je leverancier?" | `/nl/kennis/verpakkingsgegevens-leveranciers` (bestaand; voorstel: één alinea over de leveranciersverklaring met bron, pas na inhoudelijke review) | sluit aan op een bestaand artikel; de PPWR-relatie en het volume moeten eerst uit Zoekwoordplanner of Ads blijken |
| 4 | ppwr verplichtingen · verpakkingswetgeving | startermen uit de aanvulling | geen cijfers | informatie: welke verplichtingen gelden voor mij | hypothese | "Welke PPWR-verplichtingen gelden voor importeurs en groothandels?" | nog geen bestemming; mogelijk `/nl/ppwr` (sectie Voor wie) of een nieuwe pagina na review | hoge relevantie voor de doelgroep, maar geen meting; juridische uitleg vraagt primaire bronnen en review |
| 5 | ppwr software · verpakkingsdata | startermen uit de aanvulling | geen cijfers | commercieel | hypothese | geen nieuwe vraagkop; metadata van `/nl/ppwr` noemt "PPWR-software" al | `/nl/ppwr` | pas prioriteren na Zoekwoordplanner NL en BE |

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

1. **Zoekdata aanvullen (eigenaar):** Search Console per pagina en per land (NL en BE), het Ads-zoektermenrapport als er vertoningen waren, Zoekwoordplanner NL en BE met periode en netwerk; Semrush pas na API-eenheden. Daarna de ingangen 3 tot 5 herwegen.
2. **EN-titel van het klantvraagartikel** ("Product data for packaging: …") ter goedkeuring; de artikeltekst is niet gewijzigd.
3. **Leverancierslink zonder apart account**: in de productcode aanwezig; de zin op de homepage blijft alleen als de vrijgavetest dit bevestigt.
4. **Alinea over de leveranciersverklaring** in het leveranciersartikel: alleen na inhoudelijke review met een primaire bron; nu niet geschreven.
5. **Hulp bij de start**: de homepage zegt "persoonlijke hulp bij de start inbegrepen"; de operationele afspraak (wat, hoeveel, door wie) moet dit dekken.
6. **Maandbelofte**: blijft achter `MONTH_OFFER_ENABLED` tot aanbod, voorwaarden, bestelreview, bevestiging en opzegproces overeenstemmen (zie `03-…`).

*Dit document beschrijft bouw- en werkwijze-afspraken en is geen juridisch advies.*
