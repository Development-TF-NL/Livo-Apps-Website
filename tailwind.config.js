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
      },
      fontFamily: {
        display: ['Satoshi', 'var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
