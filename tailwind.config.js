/** @type {import('tailwindcss').Config} */
// 1. Importamos os plugins no topo do arquivo
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';
import lineClamp from '@tailwindcss/line-clamp';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        'pr-black': '#0A0C10',
        'pr-gray-dark': '#1A1D23',
        'pr-cyan': '#00F2FE',
        'pr-purple': '#A45EFF',
        'pr-gray-light': '#E1E1E6',
        'pr-gray': '#8D8D99',
        'pr-border': '#29292E',
        'pr-green': '#00B37E',
        'pr-red': '#F75A68',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-in-scale': { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        'progress-bar': { '0%': { width: '0%' }, '100%': { width: '100%' } },
        'slide-in-right': { '0%': { transform: 'translateX(100%)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'fade-in-scale': 'fade-in-scale 0.3s ease-out forwards',
        'progress-bar': 'progress-bar 10s linear forwards',
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 0%, var(--tw-gradient-stops))',
      },
    },
  },

  // 2. Usamos as variáveis importadas na lista de plugins
  plugins: [
    forms,
    aspectRatio,
    lineClamp,
  ],
};