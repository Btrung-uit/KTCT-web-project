/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midas: {
          dark: '#0a0a0c', // background
          gold: '#d4af37', // primary
          champagne: '#f7e7ce',
          ivory: '#fffff0', // text chính
          gray: '#8a8a8a', // text phụ
          bronze: '#cd7f32',
          panel: 'rgba(20, 20, 25, 0.7)',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cinzel', 'serif'],
        sans: ['Inter', '"Be Vietnam Pro"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      }
    },
  },
  plugins: [],
}
