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
      /* Escala tipográfica única da página (razão 1.25 a partir de 17px).
         Os tamanhos fluidos (deck, h2, h1, numero) usam clamp(). */
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.9rem', { lineHeight: '1.6' }],
        base: ['1.0625rem', { lineHeight: '1.7' }],
        lg: ['1.33rem', { lineHeight: '1.4' }],
        xl: ['1.66rem', { lineHeight: '1.3' }],
        '2xl': ['2.07rem', { lineHeight: '1.2' }],
        '3xl': ['2.6rem', { lineHeight: '1.1' }],
        deck: ['clamp(1.4rem, 1.1rem + 1.4vw, 2rem)', { lineHeight: '1.3' }],
        h2: ['clamp(2.1rem, 1.4rem + 3.2vw, 3.9rem)', { lineHeight: '1.06', letterSpacing: '-0.015em' }],
        h1: ['clamp(2.2rem, 1rem + 2.4vw, 3rem)', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
        numero: ['clamp(5rem, 3rem + 10vw, 10rem)', { lineHeight: '1' }],
      },
      /* Escala de z-index nomeada. Nada de valor solto nos componentes. */
      zIndex: {
        video: '0',
        glass: '1',
        overlay: '10',
        nav: '20',
        drawer: '30',
        topo: '40', /* header enquanto o drawer está aberto (botão X acima do painel) */
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
        soft: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      screens: { xs: '420px' },
    },
  },
  plugins: [],
}
