// Gestructureerde data als JSON-LD in de pagina (29 oktober 2026). De inhoud komt uit app/seo.js en bevat alleen
// wat de zichtbare pagina ook toont. `<` wordt ontsnapt zodat een tekst nooit het script-element kan sluiten.
export default function JsonLd({ data }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
