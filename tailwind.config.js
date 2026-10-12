/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff1fe',
          100: '#d8dbfc',
          200: '#b5baf9',
          300: '#8690f5',
          400: '#5f6bf0',
          500: '#3b4de8',
          600: '#2a37d0',
          700: '#1e2aac',
          800: '#182270',
          900: '#0e1854',
          950: '#080e35',
        },
        saffron: {
          50: '#fff8ed',
          100: '#ffefd4',
          200: '#ffdba8',
          300: '#ffc170',
          400: '#ff9d37',
          500: '#ff8c1a',
          600: '#f07008',
          700: '#c75509',
          800: '#9e4310',
          900: '#803910',
        },
        accent: {
          50: '#edfcf2',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#138808',
          600: '#0a8a4e',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'card-hover': '0 4px 12px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
        'sidebar': '2px 0 8px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
