# Voorstel: de maandactie "Probeer het een maand" in aanbod, bestelroute, bevestiging, opzegging en voorwaarden

*29 oktober 2026. Voorstel van Claude op opdracht van de eigenaar (brief §4). Dit is een impactanalyse met tekst- en bouwvoorstellen; de eigenaar en de juridisch verantwoordelijke geven vrij. Niets hiervan is doorgevoerd in de productcode, de database of de gepubliceerde voorwaarden. Geen juridisch advies.*

## 1. Beoogde regel (uit de brief, ongewijzigd)

Bij maandbetaling is de eerste maand betaald. Meldt de klant vóór het begin van maand twee dat hij stopt, dan eindigt de toegang na maand één en volgt geen tweede abonnementsmaand. Vanaf maand twee geldt een opzegtermijn van 30 dagen. Jaarbetaling valt niet onder deze actie. Geen gratis proefmaand, geen terugbetalingsbelofte.

## 2. Wat er nu staat (gemeten 29 oktober 2026)

| Plaats | Huidige tekst of werking | Bron |
|---|---|---|
| AV 2026.1, art. 6.4 en 6.5 | Licentie voor onbepaalde tijd: beide partijen kunnen te allen tijde opzeggen; "The Customer must observe a notice period of at least 30 days." | `docs/legal/publicatie/2026.1/terms.html` (product-repo); bundel `2026.1-bestelroute` (25 oktober) wijzigt art. 6 niet |
| Aanbod in de bestelroute (maandelijks) | termLabel "Indefinite term, billed monthly in advance."; cancellationLabel "You may cancel at any time with at least 30 days' notice."; renewalLabel "Continues until cancelled." | `supabase/migrations/20261009100100_b2_order_functions.sql`, `b2_offer_json` (hostspiegel `e3e1d44`) |
| Startdatum en eerste factuur | vóór 1 november 2026: dienst vanaf de besteldatum, facturering vanaf 1 november 2026; daarna beide op de besteldatum; mandaattermijn besteldatum + 14 dagen | `b2_dates` in dezelfde migratie |
| Bestelreview | toont `offer.cancellationLabel`, `termLabel`, `renewalLabel` uit het bevroren aanbod; de klant aanvaardt met het vinkje (acceptanceText) | `src/components/order/OrderJourney.jsx`, `OrderSummary.jsx` |
| Orderbevestiging (download) | "Term, Cancellation, Renewal (labels van het aanbod; 30 dagen conform AV 6.5)" | `docs/legal/publicatie/LEESMIJ-publicatie-2026.1-bestelroute.md` §4 |
| Opzegproces | geen opzegfunctie in de app; opzegging per e-mail; geen einddatum in het model (AV-5, bouwitem) | `docs/legal/LIVO-PPWR-review-juridische-stukken-v1.md` (AV-5), `LIVO-PPWR-uitvoerbaarheid-van-de-stukken.md` rij 6 |
| Betaling | SEPA-incasso via de betaalstap na de bevestiging; maandelijks vooraf | `copy.en.json` (`mandate_hint`), `order-render.ts` ("Monthly in advance, by SEPA direct debit") |
| Taal | bestelformulier, review, bevestiging en toegangsteksten alleen Engels; contractdocumenten Engels met Nederlandse weergave | `src/components/order/copy.en.json`, `fixed.document_language` |

Conclusie: de maandactie staat nergens. Een website die "Probeer het een maand" belooft terwijl aanbod, review, bevestiging en AV "minimaal 30 dagen" zeggen, is een tegenstrijdig aanbod. Daarom staat de actie op de website achter `MONTH_OFFER_ENABLED` (standaard uit) en toont de site zonder die poort de standaardtermijn.

## 3. Voorstel contracttekst (ter vrijgave door eigenaar en jurist)

Kleinste wijziging: één nieuw lid in artikel 6 van de AV, in de bundel `2026.1-bestelroute` (die wacht al op publicatie met `--datum`), zodat er één publicatie komt en geen tweede materiële versie kort na de eerste.

**Voorstel art. 6.5 (gewijzigd) en 6.5a (nieuw), EN bindend:**

> 6.5. The Customer must observe a notice period of at least 30 days, subject to clause 6.5a.
>
> 6.5a. For a Licence Agreement for an indefinite period with monthly invoicing, the first subscription month is invoiced and payable. If the Customer gives notice of termination before the start of the second subscription month, the Licence Agreement ends at the end of the first subscription month and no second subscription month is invoiced. From the second subscription month onwards, clause 6.5 applies in full. This clause does not apply to a Licence Agreement for 1 year. No amount paid for the first subscription month is refunded.

**Nederlandse weergave:**

> 6.5. De Klant dient een opzegtermijn van ten minste 30 dagen in acht te nemen, behoudens artikel 6.5a.
>
> 6.5a. Bij een Licentieovereenkomst voor onbepaalde tijd met maandelijkse facturering wordt de eerste abonnementsmaand gefactureerd en is deze verschuldigd. Zegt de Klant op vóór het begin van de tweede abonnementsmaand, dan eindigt de Licentieovereenkomst aan het einde van de eerste abonnementsmaand en wordt geen tweede abonnementsmaand gefactureerd. Vanaf de tweede abonnementsmaand geldt artikel 6.5 onverkort. Dit artikel geldt niet voor een Licentieovereenkomst voor 1 jaar. Een voor de eerste abonnementsmaand betaald bedrag wordt niet terugbetaald.

Te beslissen door de eigenaar en de jurist (geen voorstel van Claude): de precieze kalendergrens ("vóór het begin van de tweede abonnementsmaand" = tot en met de laatste dag van maand één, 23:59:59 in de tijdzone van de vestiging, `Europe/Amsterdam` of `Europe/Brussels`, zoals `timeZoneForCountry` al doet), of de opzegging per e-mail aan `hello@livoapps.software` volstaat zolang de opzegfunctie niet bestaat (overgangsformulering uit AV-5), en de verhouding tot art. 6.8 (exportvenster van 30 dagen na het einde) en 35.1 (verwijdering binnen 90 dagen). Het aanvaardingsmoment van deze versie is de publicatiedag van de bundel.

## 4. Voorstel aanbodteksten in de app (b2_offer_json, maandelijks)

Alleen als 6.5a wordt gepubliceerd; de jaarteksten blijven ongewijzigd.

| Label | Nu | Voorstel |
|---|---|---|
| termLabel | Indefinite term, billed monthly in advance. | Indefinite term, billed monthly in advance. The first month is invoiced. |
| cancellationLabel | You may cancel at any time with at least 30 days' notice. | Give notice before the start of month two and your subscription ends after month one, with no second month invoiced. From month two, 30 days' notice applies. |
| renewalLabel | Continues until cancelled. | Continues month by month until cancelled. |

De website-copy voor de bestelbevestiging (brief §3, "Bevestiging na bestellen") hoort in de app en niet op de website; voorstel voor `copy.nl.json` (nog niet bestaand) en als tussenstap voor `copy.en.json`: NL "Je bestelling is vastgelegd. Bekijk de bevestiging en de volgende stap voor toegang en betaling." / EN "Your order has been recorded. View the confirmation and the next step for access and payment." (nu: "Your order has been recorded.").

## 5. Backend: wat het bestelsysteem moet vastleggen en tonen

Volgorde van kleinste naar grootste; alles host-eerst en op een kloon te bewijzen vóór productie, volgens de B8-werkwijze.

1. **Aanbodversie.** Een nieuwe `commercial_offer`-versie (`offer_version` + 1) met dezelfde bedragen en de nieuwe labels, gepubliceerd op dezelfde dag als de AV-versie; `order_document_set` koppelt de versie aan de documenten. Een lopende review met de oude versie geeft `offer_changed` (bestaand gedrag).
2. **Einddatum en grens van maand één op de order.** `customer_order` (of de abonnementsrij die B9 introduceert) krijgt `first_month_end` (date, in de tijdzone van de vestiging) en `early_termination_deadline` (timestamptz: het laatste moment waarop een stop vóór maand twee geldt). Beide berekend bij de bevestiging uit `start_date` (`b2_dates`), vastgelegd in de bevroren payload en getoond in de review, de bevestiging en de orderstatus ("Je kunt stoppen tot en met <datum> <tijdzone>").
3. **Opzegging registreren.** Minimaal: een `subscription_termination`-rij (order, moment van ontvangst UTC, kanaal e-mail of app, gewenste einddatum, berekende effectieve einddatum, wie heeft vastgelegd). Regel: ontvangst ≤ `early_termination_deadline` → einde = `first_month_end`, geen tweede factuur; anders einde = ontvangst + 30 dagen (of de door de jurist gekozen grens). Zolang de opzegfunctie (AV-5) niet bestaat: een runbookstap voor de eigenaar die deze rij schrijft na een e-mail, met de bevestiging terug aan de klant.
4. **Incasso en facturering.** De maandelijkse incasso (Stripe/SEPA volgens de incassokeuze van de eigenaar) mag geen tweede maand innen als de opzegging op tijd is: de planner voor de tweede incasso controleert de terminatierij vóór het aanmaken van de factuur. Vóór 1 november 2026 begint de facturering op 1 november (`b2_dates`): de "eerste maand" is dan de maand vanaf 1 november, niet de besteldatum; dat moet de bevestiging ook zo tonen.
5. **Toegang sluiten en de termijnen daarna.** Bij het einde: tenant in de eindtoestand, exportvenster 30 dagen (AV 6.8), verwijdering binnen 90 dagen (35.1). Dit is het bestaande bouwitem "tenant-levenscyclus" (review AV-6); zonder dat item werkt de maandactie alleen administratief (geen tweede factuur) maar sluit de toegang niet automatisch.
6. **Taal.** Een Nederlandse `copy.nl.json` voor de bestelroute en de orderbevestiging, met taalkeuze uit de website-link (`/order?plan=…&period=…&lang=nl`), zodat een Nederlandse bezoeker een Nederlandse bestelroute doorloopt. Tot die tijd maakt de website de taalovergang expliciet (prijspagina, regel onder de plannen).

## 6. Poort voor publicatie van de maandactie op de website

`MONTH_OFFER_ENABLED=true` pas zetten als alle vijf plaatsen dezelfde regel dragen: (1) AV 6.5a gepubliceerd met ingangsdatum, (2) aanbodversie met de nieuwe labels gepubliceerd, (3) bestelreview en bevestiging tonen de grens van maand één met datum en tijdzone, (4) de opzegregistratie en de incassocontrole zijn op een kloon bewezen, (5) de klantbevestiging van een opzegging bestaat (e-mail of app). Tot die tijd toont de website de standaardtermijn (30 dagen) en blijft de knop "Kies je abonnement".

## 7. Testgeval "geldige stop in de eerste maand" (voor de acceptatie, nog niet uitvoerbaar)

Bestel Starter maandelijks op dag D; bevestiging toont `first_month_end` en de deadline; stuur op D + 20 een opzegging; verwacht: terminatierij met einde = `first_month_end`, geen tweede factuur of incasso, toegang tot en met `first_month_end`, exportvenster daarna. Variant: opzegging op `first_month_end` + 1 → einde = ontvangst + 30 dagen, wél een tweede factuur. Beide gevallen op een kloon met de echte planner, daarna op productie met een wegwerporganisatie. Nu niet uitvoerbaar: de route staat niet op productie en de registratie bestaat niet.

*Dit document beschrijft bouw- en werkwijze-afspraken en is geen juridisch advies.*
