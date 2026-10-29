// Brand tokens. Palet "landingspagina-concept" (keuze eigenaar 29 oktober 2026, LIVO_Landingspagina.html): donkergroen in plaats
// van navy, het heldere groen als accent, papier als pagina-achtergrond, een groene wasachtergrond voor zachte vlakken.
// De tokennamen zijn gelijk gebleven zodat alle componenten mee veranderen; de waarden wijken af van huisstijl v2.1 (navy #081D33)
// en wachten op een huisstijlbesluit. Kleuren uitsluitend via deze tokens; geen losse hexwaarden in componenten.
module.exports = {
  content: ['./app/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#173b32', // donkere vlakken: werkwijze- en demosectie, slotpaneel ("deep" in het concept)
        ink: '#102f35', // primaire tekst
        accent: {
          DEFAULT: '#88c842', // CTA's, accenten ("green")
          dark: '#6b914e', // iconen in groen naast tekst
          hover: '#9ad957', // hover van een groene knop (het concept licht op)
        },
        'btn-text': '#142e22', // tekst op de groene knop
        canvas: '#f0f4ea', // zachte sectie-achtergrond (prijzen)
        paper: '#f8faf6', // pagina-achtergrond
        surface: '#FFFFFF',
        sub: '#62706b', // ondersteunende tekst ("muted")
        line: '#dce4da', // randen en scheidingslijnen
        mint: '#eaf2e1', // zachte vlakken, icoonvlakken ("wash", livo-side)
        'green-heading': '#54852c', // het groene deel van een kop ("leaf")
        'green-text': '#54852c', // links, kleine nadruk, eyebrows ("leaf")
        'ink-blue': '#54852c', // labels en notities (voorheen Ink Blue; in dit palet groen)
        amber: '#a76821', // ontbrekende waarde in illustraties
        'on-dark': { DEFAULT: '#f4f8ef', sub: '#bfcec3', accent: '#b4df82' }, // tekst op donkergroen
        frame: { DEFAULT: '#dfe6d7', bar: '#f1f4ef', dot: '#ccd5c7', line: '#b9c6ce' },
        file: { excel: '#1D6F42', pdf: '#B3261E', mail: '#54852c', folder: '#B7791F' },
        status: {
          'success-text': '#4f7f2c', 'success-bg': '#eaf3e0', 'success-dot': '#5f8d36',
          'warning-text': '#98601e', 'warning-bg': '#fff1dc', 'warning-dot': '#d59a4c',
          'risk-text': '#991B1B', 'risk-bg': '#FBE4E4', 'risk-dot': '#C84B4B',
          'info-text': '#66766a', 'info-bg': '#f1f3ef', 'info-dot': '#66766a',
        },
      },
      borderRadius: { control: '7px', card: '12px', hero: '18px' },
      maxWidth: { content: '1240px' },
      fontSize: {
        body: ['1rem', { lineHeight: '1.65' }],
        card: ['1.375rem', { lineHeight: '1.25' }],
      },
      boxShadow: { soft: '0 9px 35px rgba(21,51,37,.05)', deep: '0 30px 60px rgba(0,29,40,.15)' },
      letterSpacing: { heading: '-0.045em' },
      fontFamily: {
        display: ['var(--font-satoshi)', 'Satoshi', 'var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hand: ['var(--font-caveat)', 'Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
}
