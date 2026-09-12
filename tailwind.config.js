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
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
        soft: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      screens: { xs: '420px' },
    },
  },
  plugins: [],
}
