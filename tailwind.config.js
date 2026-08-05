/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff0f3',
          100: '#ffe3e8',
          200: '#fccad3',
          300: '#f9a1b1',
          400: '#f46b86',
          500: '#e63963', // Main vibrant rose pink
          600: '#d11d4d',
          700: '#b0103b',
          800: '#921136', // Deep burgundy rose
          900: '#7a1232',
          gold: '#d97706',
          goldLight: '#fef3c7',
        },
        cream: {
          50: '#fffdfa',
          100: '#fff9f0',
          200: '#fff3e0',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'pink-soft': '0 10px 30px -10px rgba(230, 57, 99, 0.2)',
        'pink-glow': '0 0 20px rgba(230, 57, 99, 0.35)',
      }
    },
  },
  plugins: [],
}
