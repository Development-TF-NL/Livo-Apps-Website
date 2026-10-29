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
4. **Prijskaarten**: "Bespreek {plan}" opent de demomail met het plan erbij (het concept vulde het plan in zijn formulier in). Daaronder staat één regel "Alle plannen vergelijken en direct starten" naar de prijspagina, waar de kooproute uit de eerste ronde (bestelknoppen achter `SELF_SERVICE_ORDER_ENABLED`, maandactie achter `MONTH_OFFER_ENABLED`) ongewijzigd staat. De brief van de ochtend gaf de kooproute voorrang boven de demo; het concept zet de demo voorop. De eigenaar kiest welke knop op de homepage primair is.
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
2. Keuze primaire knop op de homepage: demo (concept) of planselectie (brief).
3. Demoformulier met verzending en bevestiging (apart spoor, met privacyverklaring).
4. De vaasfoto is 2 MB; `next/image` levert op Vercel geoptimaliseerde varianten, lokaal zonder optimalisatie. Een lichter bronbestand (WebP, ≤ 400 KB) is wenselijk vóór publicatie.
5. Engelse vertaling van de concepttekst ter review.

*Dit document beschrijft bouw- en werkwijze-afspraken en is geen juridisch advies.*
