/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        simgreen: {
          DEFAULT: '#16A34A',
          50: '#ECF9F0',
          100: '#DFF3E6',
          200: '#BBE7CC',
          300: '#96DCAA',
          400: '#59C676',
          500: '#16A34A',
          600: '#0F8C3A',
          700: '#0B6F2D'
        },
        bg: '#F5FBF8',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 25px rgba(2,6,23,0.06)',
        soft: '0 6px 18px rgba(2,6,23,0.04)',
      },
      maxWidth: {
        '8xl': '1200px'
      }
    },
  },
  plugins: [],
}
