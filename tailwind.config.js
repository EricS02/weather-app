/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bricolage': ['Bricolage Grotesque', 'sans-serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      colors: {
        neutral: {
          0: '#FFFFFF',
          200: '#D4D3D9',
          300: '#ACAC87',
          600: '#3C385E',
          700: '#302F4A',
          800: '#252540',
          900: '#02012C',
        },
        orange: {
          500: '#FF820A',
        },
        blue: {
          500: '#4658D9',
          700: '#2B189C',
        },
      },
      animation: {
        'bounce-1': 'bounce 1s infinite',
        'bounce-2': 'bounce 1s infinite 0.2s',
        'bounce-3': 'bounce 1s infinite 0.4s',
      },
    },
  },
  plugins: [],
}