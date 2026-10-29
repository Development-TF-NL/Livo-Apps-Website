# Herontwerp naar het landingspagina-concept (29 oktober 2026, tweede ronde)

*Op aanwijzing van de eigenaar (29 oktober 2026, middag): de look & feel en de tekst van `LIVO_Landingspagina.html` (bronmateriaal, identiek aan de kopie in Downloads) zijn het uitgangspunt; de hero houdt "Je klant vraagt verpakkingsdata. Jij hebt overzicht."; de zin "Stop met verdrinken in de complexe Europese verpakkingsregelgeving!" krijgt een eigen plek. Niet gepusht, niet gepubliceerd. Geen juridisch advies.*

## 1. Wat is nagebouwd

| Onderdeel | Stand |
|---|---|
| Palet | De tokens dragen nu het concept: ink `#102f35`, donkergroen `#173b32` (vlakken), groen `#88c842` (knoppen, accent), bladgroen `#54852c` (eyebrows, groen deel van koppen, links), papier `#f8faf6` (pagina), was `#eef3e9`/`#eaf2e1` (zachte vlakken), muted `#62706b`, lijn `#dce4da`, amber `#a76821`. Radius 7/12/18. De tokennamen (`navy`, `ink`, `accent`, `mint`, …) zijn gelijk gebleven, dus alle pagina's volgen mee. **Dit wijkt af van huisstijl v2.1 (navy `#081D33`, lime `#7AC143`)**: een huisstijlbesluit (v2.2) is nodig; tot die tijd is dit palet alleen op de website. |
| Hero | Kop in drie regels met de groene derde regel, lead, "Bekijk LIVO in 20 minuten" (naar het demoblok), "Ontdek de werkwijze", de prijsregel; rechts de vaasfoto uit het concept (`public/brand/photo/vaas.png`, 1536 × 1024, via `next/image`) in het kader met één grote ronde hoek, de klantvraagnotitie en de artikelkaart VH-2001. |
| Secties | Basisstrip; Herkenbaar?; werkwijze op donkergroen met het interactieve productvenster (drie stappen, voorbeeldreactie, download van een fictief CSV-bestand); LIVO zet klaar / Jij beslist; Voor wie als tabs; prijzen met schakelaar, drie kaarten, grotere plannen en telregel ingeklapt; vragen; kennis; Over LIVO APPS (goedgekeurde M2-tekst, niet in het concept, behouden); demo op donkergroen. |
| Iconen | Zoals in het concept: kleine lijniconen (Lucide, 1,6 px) naast tekst; de marketingiconen v2 staan alleen nog op de prijs- en productpagina. |
| Kopbalk en footer | Kopbalk op papier met vervaging, logo met het label PPWR, menu Hoe het werkt · Voor wie · Prijzen · Kennis · Vragen, Inloggen, groene demoknop; lichte footer met logo, tagline, e-mailadres, de drie kolommen en de voetregel. |
| Tekst | NL letterlijk uit het concept; EN als vertaling in de copybron (`copy/home.json`, `nav.json`, product-repo) en gesynchroniseerd. |

## 2. Bewuste afwijkingen van het concept (ter goedkeuring)

1. **"Stop met verdrinken …"** staat als kop van de sectie Herkenbaar? (met het groene woord "verpakkingsregelgeving"); de oude kop "Eén klantvraag. Het antwoord ligt overal." is de vette eerste regel van die sectie. Alternatieven: als kop van Voor wie, of van het demoblok.
2. **Demoformulier**: het concept zegt zelf dat niets wordt verstuurd. Het demoblok heeft dezelfde kaart en knop, maar de knop opent de demomail (onderwerp "LIVO PPWR demo", voorgevulde tekst uit `ppwr.hero`). Een echt formulier vraagt verzending met bevestiging, opslag (Attio) en de websiteprivacyverklaring; die staan nog achter de poort.
3. **FAQ-vraag** "Ben ik met LIVO automatisch PPWR-compliant?" is "Voldoe ik met LIVO automatisch aan de PPWR?": de sitebrede woordtoets (werkafspraak regel 6) staat "compliant" niet toe. Het antwoord is ongewijzigd.
4. **Planselectie voorop (besluit eigenaar, 29 oktober avond):** de hero, de kopbalk en de prijskaarten ("Start met {plan}") gaan naar de planselectie op de prijspagina, waar de kooproute uit de eerste ronde staat (bestelknoppen achter `SELF_SERVICE_ORDER_ENABLED`, maandactie achter `MONTH_OFFER_ENABLED`). De demo blijft mogelijk maar is geen verplichte stap: als tekstlink onder de prijskaarten en als eerste kaart van het hulpblok. Het demoblok van het concept is het hulpblok (#hulp): zelfstandig starten, hulp op elk moment, drie kaarten (hulp bij je keuze, hulp bij de inrichting, hulp bij vragen), elk per e-mail, met de regel dat LIVO alleen contact opneemt als de bezoeker daarom vraagt. Het menu-item Vragen is Hulp; de vragen (#vragen) blijven en zijn vanuit het hulpblok gelinkt.
5. **Over LIVO APPS** staat niet in het concept maar blijft (goedgekeurde tekst, menu-link in de footer).
6. **Statuslabels in het productvenster** ("Aanwezig", "Nog open", "Specificatie", "Voorbereid", "Selectie klaar", "Te beoordelen") komen uit het concept en zijn geen productstatussen; het venster is gelabeld als fictief voorbeeld.

## 3. Metingen (lokale productiebuild)

| Toets | Uitkomst |
|---|---|
| `next build` (poorten open) | groen |
| Woordtoets (`copy/woordtoets-site.py`) | 0 fouten |
| Horizontale overloop 360/390/768/1280, 12 pagina's NL en EN | `scrollWidth` nergens groter dan de viewport. Eén gemeten element steekt rechts uit: de decoratieve cirkel van de werkwijze-sectie, afgesneden door `overflow-hidden` (zoals in het concept); geen scroll. |
| Interne links en ankers | 33 links, alle 200; ankers `#werkwijze`, `#voor-wie`, `#prijzen`, `#vragen`, `#about`, `#demo` bestaan |
| Canonical | 12 van 12 pagina's op de eigen www-URL |
| Mailto's op de homepage | demo (2 plekken plus de prijskaarten met het plan) en het contactadres |

## 4. Open punten

1. Huisstijlbesluit over het palet (v2.2) en de tokens in de app en de flyer; de brand bible v2.1 is hiermee niet meer de bron voor de website.
2. De teksten van het hulpblok (Claude, op het besluit van de eigenaar) ter review.
3. Demoformulier met verzending en bevestiging (apart spoor, met privacyverklaring).
4. De vaasfoto is 2 MB; `next/image` levert op Vercel geoptimaliseerde varianten, lokaal zonder optimalisatie. Een lichter bronbestand (WebP, ≤ 400 KB) is wenselijk vóór publicatie.
5. Engelse vertaling van de concepttekst ter review.

## 5. Correcties na de review van de eigenaar (29 oktober, avond)

| Punt | Uitkomst |
|---|---|
| Lettertype viel terug op Times | Oorzaak: de CSS van een eerdere build en de HTML droegen verschillende hashes voor de Inter-variabele (een build terwijl de server uit dezelfde `.next` draaide). Opgelost met een schone build; gecontroleerd: `--font-inter`, `--font-satoshi` en `--font-caveat` kloppen met de klassen op `<html>`. Satoshi (koppen) en Inter (tekst) zijn weer de huisstijlletters. |
| Productvenster als de echte app | Het venster volgt de app-shell uit de productcode (`src/app/dashboard/layout.tsx`, `MainNav.tsx`): witte topbalk met het beeldmerk en "LIVO PPWR", de navigatie Overview · Obligations \| Register · Suppliers \| Passports met de mint actieve tab, canvas, witte kaarten, statuspillen met alleen bestaande statussen (Ready, Needs data, Missing, Open). Engels in beide talen, zoals de app. Drie schermen: Packaging register, Suppliers (uitvraag en "Review submitted data" met Approve), Product passports met de export. Fictieve gegevens, zo gelabeld. |
| Kop en stap 3 van de werkwijze | "Van losse data naar een afgerond productpaspoort." (eyebrow "In drie stappen"); stap 3 "Rond je productpaspoort af." |
| Hulpblok | Geen belofte "niemand belt je na"; nu: "Zelfstandig starten, en hulp op elk gewenst moment. Wil je het eerst zien? Boek dan een demo." en "Veelgestelde vragen staan ook hierboven." |

### Contrast (WCAG 2.2 AA, richtlijn §9) en de groentinten

Gemeten met de relatieve luminantie uit WCAG; eis 4,5 voor gewone tekst, 3,0 voor grote tekst en niet-tekstelementen.

| Combinatie | Vóór | Na | Oordeel |
|---|---|---|---|
| Tekst (ink) op papier / kaart / mint | 13,5 / 14,2 / 12,4 | gelijk | AA |
| Ondersteunende tekst (sub) op papier / kaart / canvas | 4,9 / 5,2 / 4,7 | gelijk | AA |
| Links en eyebrows (green-text) op papier / kaart / mint | 4,2 / 4,4 / 3,8 (bladgroen `#54852c`) | 5,3 / 5,6 / 4,9 (`#497326`) | hersteld |
| Groen deel van een grote kop (green-heading `#54852c`) | 4,2 | gelijk | AA voor grote tekst |
| Knoptekst `#142e22` op de groene knop | 7,2 (`#88c842`) | 6,6 (`#7AC143`), hover 7,6 | AA |
| Tekst en subtekst op donkergroen | 11,4 / 7,5 | gelijk | AA |
| Groene kopregel op donkergroen | 8,1 | 7,7 (`#aadb84`) | AA |
| Statuspil Ready | 4,2 | 5,5 (`#3f6b16`) | hersteld |
| Statuspil Needs data | 4,7 | gelijk | AA |
| Statuspil Open | 4,3 | 5,5 (`#55665a`) | hersteld |
| Iconen in groen naast tekst (`#6b914e`, niet-tekst) | 3,5 | gelijk | AA |
| Knopvlak t.o.v. achtergrond (niet-tekst) | 2,0 | 1,9 | de knop wordt herkend aan zijn tekst (6,6), geen eis op de rand |

Groentinten: het conceptgroen `#88c842` (tint 89°) week af van het lime van het beeldmerk `#7AC143` (tint 94°); onderlinge verhouding 1,09, dus zichtbaar verschillend naast het logo in de kopbalk. De knop- en accentkleur is daarom het logo-lime; hover `#8ccc5c`, de iconkleur `#6b914e`, het bladgroen `#54852c` en de linkkleur `#497326` liggen alle op tint 93 tot 94°. Het donkergroen `#173b32` (tint 165°) is bewust koeler, zoals in het concept.

*Dit document beschrijft bouw- en werkwijze-afspraken en is geen juridisch advies.*
