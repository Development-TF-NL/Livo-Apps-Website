# AI-vindbaarheid · eerste twee kennispagina's · inbouw, claimtoets en test · 14 oktober 2026

*Inhoudspakket van 13 oktober 2026 (`AI_VINDBAARHEID_2026-10-13`: twee paginabestanden, claimcontrole en overdracht), ingebouwd als schrijver van de websitecode in de worktree `~/LIVO_AUDIT/AI-VINDBAARHEID-20261013/website-wt` op branch `ai-vindbaarheid-20261013`, eerst vanaf `main` 936c638 en op 14 oktober (middag) herbaseerd op de gepubliceerde M2-nazorgstand (f245c45, dezelfde boom als `main` 072ad69 na PR 1). De product-repo en de M2-nazorgbranch zijn niet aangeraakt. Niet gepusht, niet gepubliceerd; de eigenaar neemt het publicatiebesluit. Geen juridisch advies.*

## 1. Inspectie vooraf (read-only) en conflicten met het pakket

- **Routes:** alle pagina's staan onder `app/[lang]/…` met hetzelfde pad per taal (`/nl/ppwr`, `/en/ppwr`); `languageAlternates(path)` in `app/seo.js` en `app/sitemap.js` gaan daarvan uit. Het pakket vraagt per taal een eigen URL (`/nl/kennis/…`, `/en/resources/…`). Gekozen: twee routemappen (`kennis`, `resources`) op één component, met een registratie per artikel die per taal sectie en slug kent; canonical, hreflang, sitemap en de taalwissel in de kopbalk lezen die registratie. Een verkeerde combinatie (bijvoorbeeld `/en/kennis/…`) geeft 404.
- **Metadata:** per pagina `generateMetadata` met title, description, canonical, hreflang (nl, en, x-default naar nl) en de social-tags via `socialMetadata`; `metadataBase` in de layout. Robots: `app/robots.js` staat alles toe; de sitemap staat erin. Geen `noindex` op de nieuwe pagina's.
- **Teksten:** de dictionaries worden alleen gegenereerd uit de copybestanden in de product-repo. Dit pakket mag de product-repo niet raken, dus de artikelteksten staan in de website-repo (`app/content/kennis.json`, letterlijk uit de twee paginabestanden, plus de negen correcties uit §3). Dat wijkt af van de gewone bron; verhuizen naar `copy/` en het sync-script kan later. De kleine navigatielabels (Kennis, Resources, Meer lezen, Read next, de twee korte linklabels en de regel boven de demoknop) staan in `app/content/kennis.js`.
- **Demoactie:** de site kent één demoroute: een mailto met onderwerp "LIVO PPWR demo" en voorgevulde tekst uit `nav.order` (`OrderButton`). Het pakket schrijft "Plan een demo" / "Book a LIVO PPWR demo" als primaire actie. De knop op de artikelen gebruikt het label uit de dictionary: na de publicatie van de M2-nazorg (14 oktober) "Vraag een demo aan" / "Request a demo". Conflict met het pakket: de nazorg sluit "Boek" of "Book" uit op een mailknop; de tekst "Book a demo" uit het pakket is nergens overgenomen. De regel "Primaire actie" uit de paginabestanden is overdrachtsmetadata en staat niet op de pagina.
- **PPWR-pagina:** krijgt een leesblok met twee tekstlinks vóór het slot. **Homepage:** geen nieuwe sectie; de artikelen staan in de footer onder Hulpmiddelen / Resources, dus op elke pagina (de kolom was leeg omdat de whitepaperlink er bewust uit gefilterd wordt).
- **Live stand (www.livoapps.software, 14 oktober):** robots.txt "Allow: /", sitemap 200, `/nl/ppwr` 200 voor Googlebot, bingbot, OAI-SearchBot en een gewone browser (user-agent-test met curl); Vercel-headers zonder `x-robots-tag`. Geen WAF-blokkade gezien voor deze user-agents; dat bewijst niet hoe een echte crawl vanaf de IP-reeksen van die bots wordt behandeld.

## 2. Productclaims opnieuw getoetst tegen de actuele code

Getoetst tegen de product-repo op `main` 376b32e (worktree, alleen `src/` en `supabase/` als bewijs; de toets van 1 oktober is niet als bewijs gebruikt).

| Claim in de pagina's | Uitkomst | Bewijs | Gevolg voor de tekst |
|---|---|---|---|
| LIVO vult een uitvraagbestand voor met bekende waarden; het bestand toont ook wat al bekend is | klopt | `src/app/dashboard/packaging/request-file/route.ts`, `src/lib/ingest/prefill-request.ts`, `src/lib/excel-template.ts` (grijs = bekend, amber = vraag) | geen; grens: één bestand per leverancier of per eerder geïmporteerd bestand, alleen onderdelen met een leverancier |
| In het portaal ziet de leverancier bekende waarden en vult hij de open plekken aan | klopt | `src/lib/supplier-portal.ts` (`knownValues`), `src/app/supplier/[token]/page.tsx`; eerst structuurvragen, dan velden | geen; grens: alleen materiaal, gewicht, recyclaat, zware metalen, PFAS, recyclebaarheid |
| Je verstuurt de uitvraag zelf vanuit je eigen mailbox | klopt | geen mailbibliotheek, geen outbox of planner in de code; download, "Email text" en een te kopiëren portaallink (`invite-panel.tsx`) | geen |
| Een antwoord komt terug als voorstel; iemand beoordeelt en bevestigt vóór het register | klopt alleen voor het portaal | portaal: `supplier_submission` en `review/actions.ts` (approve, reject); Excel: een teruggestuurd bestand importeert de gebruiker zelf (`import/actions.ts`: voorbeeld, dan `commitImport`), gewijzigde bekende waarden worden geschreven en daarna gemeld (`prefilled-diff.ts`) | **versmald** (correcties 1 tot 4): "via het portaal", plus de zin over het zelf importeren van een teruggestuurd bestand met een overzicht vooraf |
| SKU-selectie bewaren en naar Excel exporteren; geen bewijsbijlagen | klopt | `export-panel.tsx`, `createCustomerRequest`, `export/route.ts` (permissie `report.export`), `excel-export.ts` (drie tabbladen, kolom met documenttypen) | **aangescherpt** (correcties 5 en 6): "niet automatisch als bijlagen" suggereerde een optie die er niet is |
| Documenten koppelen aan verpakking, onderdeel of verplichting | deels | `evidence_link.target_type` kent `obligation`, maar geen app-pad schrijft dat; koppeling aan eenheid en onderdeel wel (`uploadPackagingDocument`, `uploadComponentDocument`); documenten tellen via `v_obligation_instance` mee voor verplichtingen | **versmald** (correcties 7 en 8): koppelen aan verpakking of onderdeel; het document telt mee voor de verplichtingen waar het bij hoort |
| LIVO maakt ontbrekende informatie zichtbaar | klopt | `src/lib/ppwr-ready.ts` (`deriveReadiness`), `ppwr-readiness.tsx`; de gaten volgen uit de verplichtingen die voor rol en markt gelden | geen |
| Register per laag en onderdeel met materiaal, gewicht, recyclaat, stoffen | klopt | tabel `component` (material, weight_g, recycled_content_pct, heavy_metals_mg_kg, pfas_*), `packaging_unit` met niveaus | geen; "stoffen" is in de app PFAS, zware metalen en de vlaggen inkt, coating, lijm; geen algemene stoffenlijst |
| Twee dagen is een verzoek van de klant, geen PPWR-termijn; "LIVO zoekt uit en zet klaar. Jij beoordeelt en bevestigt."; fictief voorbeeld alleen als Illustratie | beleid, geen productclaim | | geen |

Gezien in de code, buiten de tekst: "Approve all" keurt een hele leveranciersbatch in één klik goed (blijft een menselijke handeling); de opmerking "no email is sent yet" in het uitnodigingspaneel suggereert dat verzenden gepland is; een niet-gebruikt RLS-beleid laat ingelogde leveranciersgebruikers eigen onderdelen bijwerken (geen app-pad). Geen juridische regel toegevoegd; nergens een garantie of automatische mailclaim.

## 3. Exacte tekstafwijkingen ten opzichte van het pakket

Alle overige zinnen, koppen, tabellen, titels en beschrijvingen zijn letterlijk overgenomen (NL en EN). De SEO-titel en metaomschrijving uit het pakket zijn de title en description van de pagina.

1. **Voor:** Een antwoord van de leverancier komt terug als voorstel. Iemand in je eigen organisatie beoordeelt en bevestigt het voordat het in het register terechtkomt.
   **Na:** Een antwoord via het portaal komt terug als voorstel. Iemand in je eigen organisatie beoordeelt en bevestigt het voordat het in het register terechtkomt. Een teruggestuurd uitvraagbestand importeer je zelf, met een overzicht van de wijzigingen vooraf.

2. **Voor:** Their answer returns as a proposal. Someone in your organisation reviews and confirms it before it enters the register.
   **Na:** An answer given in the portal returns as a proposal. Someone in your organisation reviews and confirms it before it enters the register. A returned request file is imported by you, with an overview of the changes first.

3. **Voor:** De reactie van de leverancier wordt als voorstel teruggegeven. Je beoordeelt en bevestigt wat in het register komt.
   **Na:** Een reactie via het portaal wordt als voorstel teruggegeven. Je beoordeelt en bevestigt wat in het register komt. Een teruggestuurd uitvraagbestand importeer je zelf, met een overzicht van de wijzigingen vooraf.

4. **Voor:** The supplier's response returns as a proposal. You review and confirm what enters the register.
   **Na:** A response given in the portal returns as a proposal. You review and confirm what enters the register. A returned request file is imported by you, with an overview of the changes first.

5. **Voor:** De bewijsstukken zitten niet automatisch als bijlagen in dat Excelbestand.
   **Na:** De bewijsstukken zitten niet als bijlagen in dat Excelbestand.

6. **Voor:** Evidence documents are not automatically attached to that workbook.
   **Na:** Evidence documents are not attached to that workbook.

7. **Voor:** Documenten kun je aan de passende verpakking, het onderdeel of de verplichting koppelen. Die koppeling helpt bij het terugvinden van bewijs, maar beoordeelt niet automatisch de inhoud van het document.
   **Na:** Documenten kun je aan de passende verpakking of het onderdeel koppelen; zo'n document telt mee voor de verplichtingen waar het bij hoort. Die koppeling helpt bij het terugvinden van bewijs, maar beoordeelt niet automatisch de inhoud van het document.

8. **Voor:** You can link documents to the relevant packaging, component or requirement. That link helps you find the evidence; it does not automatically assess the document's contents.
   **Na:** You can link documents to the relevant packaging unit or component; a linked document then counts towards the requirements it belongs to. That link helps you find the evidence; it does not automatically assess the document's contents.

9. **Voor:** Is a recycled-content share stated? What supports the figure?
   **Na:** Is a share of recycled content stated? What supports the figure?


**Tweede ronde (14 oktober, middag, opdracht eigenaar):** de zinnen die suggereerden dat een document aan een losse waarde gekoppeld wordt, zijn herschreven: het document hoort bij de betreffende verpakking of het onderdeel en onderbouwt de opgegeven waarde.

10. **Voor:** Een leveranciersverklaring, specificatie of testrapport, gekoppeld aan de waarde of het onderdeel waarop het betrekking heeft.
   **Na:** Een leveranciersverklaring, specificatie of testrapport dat bij de betreffende verpakking of het onderdeel hoort en de opgegeven waarde onderbouwt.

11. **Voor:** A supplier declaration, specification or test report linked to the value or part it concerns.
   **Na:** A supplier declaration, specification or test report that belongs to the packaging unit or part concerned and supports the stated value.

12. **Voor:** Welke specificatie, verklaring of welk testrapport hoort bij welke waarde of welk onderdeel? Wat is de datum en versie?
   **Na:** Welke specificatie, verklaring of welk testrapport hoort bij welke verpakking of welk onderdeel, en welke opgegeven waarde onderbouwt het? Wat is de datum en versie?

13. **Voor:** Which specification, declaration or test report belongs to which value or part? What are its date and version?
   **Na:** Which specification, declaration or test report belongs to which packaging unit or part, and which stated value does it support? What are its date and version?

Correctie 9 is geen claimcorrectie: de sitebrede woordtoets leest "recycled" los van "content" wanneer er een koppelteken tussen staat; dezelfde betekenis, andere woordvolgorde.

## 4. Gewijzigde en nieuwe bestanden (website-repo)

| Bestand | Wat |
|---|---|
| `app/content/kennis.json` (nieuw) | De twee artikelen in NL en EN: meta, kop, inleiding, secties met alinea's, illustratienotitie en tabellen, slotregel met links. |
| `app/content/kennis.js` (nieuw) | Routes per taal, navigatielabels, hulpfuncties (zoeken op taal, sectie en slug; tegenhanger in de andere taal). |
| `app/components/Article.jsx` (nieuw) | De artikelpagina (kruimelpad, kop, secties, gestapelde tabellen onder 640 px, één demoknop, slotregel) en het leesblok `KennisLinks`. |
| `app/[lang]/kennis/[slug]/page.jsx`, `app/[lang]/resources/[slug]/page.jsx` (nieuw) | Routes met `generateStaticParams`, `dynamicParams = false`, metadata met canonical en hreflang. |
| `app/sitemap.js` | De vier artikel-URL's met hreflang per artikel. |
| `app/components/Footer.jsx` | De twee artikelen onder Hulpmiddelen / Resources (taalspecifieke paden). |
| `app/components/Nav.jsx` | De taalwissel gaat op een artikelpagina naar de tegenhanger in de andere taal (anders ontstond een 404). |
| `app/[lang]/ppwr/page.jsx` | Leesblok met twee tekstlinks vóór het slot. |
| `docs/ai-vindbaarheid/` (nieuw) | Dit verslag en de nulmeting. |

Geen nieuwe dependency, geen `llms.txt`, geen AI-specifieke metadata, geen formulier, geen wijziging aan dictionaries of product-repo.

## 5. Testresultaten (lokale productiebuild, poort prijzen open, 14 oktober 2026)

- Build: `next build` zonder fouten; de vier artikelen statisch gegenereerd.
- Statuscodes: de vier artikel-URL's 200; `/en/kennis/…`, `/nl/resources/…` en een onbekende slug 404; een pad zonder taal 307 naar `/nl/…`.
- Metadata per pagina: eigen title en description uit het pakket, canonical op de eigen URL, hreflang nl, en en x-default (nl), `og:locale` per taal, `<html lang>` per taal, één H1, één tabel, tekst leesbaar in de HTML zonder script.
- Sitemap: de vier URL's aanwezig met hreflang naar de tegenhanger; robots ongewijzigd (alles toegestaan).
- Links: alle interne links van de vier pagina's 200 (inclusief `#how`, `#about`, PPWR, prijzen, de twee artikelen onderling, de taalwissel); de externe bron op eur-lex antwoordt (HEAD 202); mailto's gelijk aan de bestaande demoroute. Leesblok op `/nl/ppwr` en `/en/ppwr` en footerlinks op elke pagina gecontroleerd.
- Woordtoets (sitebrede toets uit de product-repo, routes uitgebreid met de vier artikelen): 0 fouten.
- Overloop (regels.js uit de meetscripts) op 360, 390, 768 en 1280 px voor de vier artikelen, `/nl/ppwr`, `/en/ppwr` en `/nl`: paginabreedte gelijk aan de viewport, 0 uitstekende elementen, 0 knoppen over meer regels. De bestaande 5 px-uitsteek van de prijsblokkop op `/nl` en `/nl/ppwr` bij 360 px is van `main` en wordt in de M2-nazorgbranch hersteld; hier niet aangeraakt. De artikelkop is onder 640 px 28 px en onder 375 px 26 px (het woord "verpakkingsgegevens" paste anders niet in het paneel).
- Tabellen op 360 en 390 px gestapeld (elke cel met haar kolomkop ervoor), vanaf 640 px een gewone tabel; schermbeelden bekeken (NL pagina 2 op 390 px, NL pagina 1 op 1280 px).
- Toetsenbord: na een klik op de laatste sectiekop brengt Tab de focus achtereenvolgens op de demoknop, de link naar het andere artikel en de link naar de verordening, telkens met zichtbare focusring en doelen van minstens 44 px (NL en EN, 390 en 1280 px).
- Schermbeelden en meetbestanden buiten git: `~/LIVO_AUDIT/AI-VINDBAARHEID-20261013/meting/`.
- Preview: `http://localhost:3112` (productiebuild uit de worktree; de M2-nazorgpreview blijft op 3111).

Hertest na de herbasering en de tweede tekstronde (14 oktober, middag, build op f245c45): statuscodes, canonical, hreflang, sitemap, interne links, woordtoets 0, overloop op 360 tot 1280 px zonder afwijking, kop binnen het paneel op alle breedtes, focus met Tab op demoknop en beide links (NL en EN, 390 en 1280 px). De demoknop toont nu "Vraag een demo aan".

## 6. Wat pas na publicatie of met eigenaarstoegang kan

- Indexstatus, zoekvragen en hreflang-rapport in Google Search Console; Bing Webmaster Tools (verificatie door de site-eigenaar; open punt 2 van de overdracht: wie beheert dit).
- Live controle van canonical, hreflang, sitemap en statuscodes op www.livoapps.software na de deploy; aanmelden van de sitemap.
- Crawlertoegang vanaf de echte bot-IP's (Googlebot, bingbot, OAI-SearchBot): alleen zichtbaar in de serverlogs of Search Console; een user-agent-test vanaf een gewone verbinding bewijst dat niet.
- Vermelding in AI-antwoorden (Google AI-functies, ChatGPT-zoeken, Bing): meting met de tien vragen in dezelfde taal, regio en sessie, na indexering en daarna maandelijks (zie de nulmeting).

## 7. Open bij de eigenaar

1. Publicatie als aparte stap: de inhoud is goedgekeurd (14 oktober); de branch staat op de gepubliceerde nazorgstand en past zonder conflict op `main`. Push, pull request en merge door de eigenaar; daarna de live controle van de vier URL's, de sitemap en de hreflang.
2. Beheer van Search Console en Bing Webmaster Tools en wie de indexeringscontrole doet.
3. Verhuizing van de artikelteksten naar de copybron in de product-repo (werkafspraak), of de keuze om kennisartikelen in de website-repo te houden.
4. Geanonimiseerde echte vragen uit gesprekken voor het latere onderwerpenplan.

*Dit document beschrijft bouw- en werkwijze-afspraken en is geen juridisch advies.*
