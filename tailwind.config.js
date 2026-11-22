/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#F4F7F5',
          100: '#E8EFEA',
          200: '#D2E0D5',
          300: '#B8CDBB',
          400: '#A3B899', // pale leaf sage
          500: '#8FA893', // core sage leaf
          600: '#6B8E73', // deep herb sage
          700: '#527259',
          800: '#3D5543',
          900: '#2A3C2F',
          950: '#152018',
        },
        forest: {
          50: '#F0F5F2',
          100: '#D8E5DD',
          200: '#B5CEBF',
          800: '#18241D',
          850: '#141E18',
          900: '#101713', // deep forest charcoal
          950: '#0B110E', // deepest forest charcoal
        },
        botanical: {
          light: '#F8FAF8',
          stone: '#E8ECE9',
          muted: '#7D9B82',
          accent: '#4D7A58',
          gold: '#C5A880',
        }
      },
      fontFamily: {
        amelia: ['Amelia', 'Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        display: ['Amelia', 'Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      boxShadow: {
        'sage-sm': '0 2px 8px -2px rgba(107, 142, 115, 0.15)',
        'sage-md': '0 8px 24px -4px rgba(107, 142, 115, 0.2)',
        'sage-lg': '0 16px 36px -6px rgba(107, 142, 115, 0.25)',
        'glow-sage': '0 0 25px rgba(143, 168, 147, 0.35)',
        'glow-dark': '0 0 30px rgba(125, 155, 130, 0.25)',
      },
      animation: {
        'sway-slow': 'sway 8s ease-in-out infinite',
        'float-leaf': 'floatLeaf 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2.5deg)' },
        },
        floatLeaf: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(4deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
