/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        vinho: '#5A2731',
        ameixa: '#7E4652',
        rose: '#A97578',
        blush: '#CDA1A0',
        nude: '#E8C9C1',
        dourado: '#C9A46A',
        marfim: '#F7F1E9',
        cacau: '#302326',
      },
      fontFamily: {
        display: ['"Josefin Sans"', 'ui-sans-serif', 'sans-serif'],
        body: ['"Work Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        script: ['"Pinyon Script"', 'cursive'],
      },
      /* Escala única (razão 1.25 a partir de 17px). */
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.9rem', { lineHeight: '1.6' }],
        base: ['1.0625rem', { lineHeight: '1.7' }],
        lg: ['1.33rem', { lineHeight: '1.4' }],
        xl: ['1.66rem', { lineHeight: '1.3' }],
        '2xl': ['2.07rem', { lineHeight: '1.15' }],
        h2: ['clamp(2rem, 1.3rem + 2.8vw, 3.4rem)', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
        h1: ['clamp(2.4rem, 1.2rem + 3.6vw, 4.6rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        numero: ['clamp(4rem, 2.5rem + 7vw, 7.5rem)', { lineHeight: '1' }],
      },
      zIndex: { base: '0', raised: '10', nav: '20', drawer: '30', topo: '40' },
      screens: { xs: '420px' },
    },
  },
  plugins: [],
}
