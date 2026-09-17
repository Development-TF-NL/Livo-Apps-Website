// Brand tokens per ontwerpdocument v2 §3.1 — #081D33 is canon (besluit-kleurcanonisatie-081D33-v1).
// Kleuren uitsluitend via deze tokens; geen losse hexwaarden in componenten.
module.exports = {
  content: ['./app/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#081D33', // donkere vlakken, header
        ink: '#081D33', // primaire tekst
        accent: {
          DEFAULT: '#7AC143', // CTA's, success, spaarzame accenten
          dark: '#69AD36', // enige hover-waarde op lime
        },
        canvas: '#EEF2F3', // licht canvas achter kaarten (CSS-var: --bg)
        surface: '#FFFFFF',
        sub: '#5B6B72', // secundaire tekst
        line: '#E4E8EA', // zachte randen en scheidingslijnen
        // Huisstijl v2 (besluit 17 september 2026)
        mint: '#EAF7E4', // icooncirkels, actieve navigatie, positieve callouts
        'green-heading': '#569A28', // één woord in een kop van 32px+ vet (AA groot)
        'green-text': '#2F7D2A', // links, kleine nadruk (AA)
        'ink-blue': '#2F5FB3', // leads, labels, notities, verbinders (website en flyer)
        file: { excel: '#1D6F42', pdf: '#B3261E', mail: '#2F5FB3', folder: '#B7791F' }, // alleen pictogrammen in flowvisuals
        status: {
          'success-text': '#3F6B16', 'success-bg': '#EAF6E7', 'success-dot': '#3FAE3B',
          'warning-text': '#854F0B', 'warning-bg': '#FEF3C7', 'warning-dot': '#D97706',
          'risk-text': '#991B1B', 'risk-bg': '#FBE4E4', 'risk-dot': '#C84B4B',
          'info-text': '#3567B7', 'info-bg': '#E8EFF8', 'info-dot': '#3567B7',
        },
      },
      borderRadius: { control: '10px', card: '16px', hero: '22px' },
      boxShadow: { soft: '0 8px 24px rgba(8,29,51,.08)' },
      fontFamily: {
        display: ['Satoshi', 'var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hand: ['var(--font-caveat)', 'Caveat', 'cursive'], // handschrift-accent, alleen website en flyer
      },
    },
  },
  plugins: [],
}
