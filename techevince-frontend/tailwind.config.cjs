/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        customBlue: {
          100: "#0094FF",
          200: "#0050FF",
          300: "#032538",
        },
        customOrange: {
          100: "#FF703C"
        },
      },
      fontFamily:{
        body: ['Kanit'],
        'GalanoGrotesque': ['GalanoGrotesque'],
        'ClashDisplay': ['ClashDisplay'],
      }
    },
    
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}