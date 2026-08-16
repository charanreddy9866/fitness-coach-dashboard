/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neon Colors
        neon: {
          cyan: '#00D9FF',
          blue: '#0088FF',
          magenta: '#FF006E',
          pink: '#FF0099',
          lime: '#00FF41',
          yellow: '#FFD60A',
          purple: '#D946EF',
        },
        // Dark Backgrounds
        dark: {
          bg: '#0a0e27',
          card: '#1a1f3a',
          lighter: '#2a2f4a',
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(0, 217, 255, 0.8), 0 0 20px rgba(0, 217, 255, 0.4)',
        'neon-magenta': '0 0 10px rgba(255, 0, 110, 0.8), 0 0 20px rgba(255, 0, 110, 0.4)',
        'neon-lime': '0 0 10px rgba(0, 255, 65, 0.8), 0 0 20px rgba(0, 255, 65, 0.4)',
        'neon-pink': '0 0 10px rgba(255, 0, 153, 0.8), 0 0 20px rgba(255, 0, 153, 0.4)',
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 217, 255, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.8)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
