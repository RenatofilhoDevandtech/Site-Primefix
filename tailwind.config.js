/** @type {import('tailwindcss').Config} */
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
        'fade-in-scale': { 
          '0%': { opacity: '0', transform: 'scale(0.95)' }, 
          '100%': { opacity: '1', transform: 'scale(1)' } 
        },
        'slide-in-right': { 
          '0%': { transform: 'translateX(100%)', opacity: '0' }, 
          '100%': { transform: 'translateX(0)', opacity: '1' } 
        },
        // Essencial para o LoadingSkeleton e CardImage
        'shimmer': {
          '100%': { transform: 'translateX(100%)' }
        },
        // Usado no ícone de erro para atrair atenção sem ser agressivo
        'pulse-soft': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(0.95)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'fade-in-fast': 'fade-in 0.15s ease-out forwards',
        'fade-in-scale': 'fade-in-scale 0.3s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s infinite linear',
        'pulse-soft': 'pulse-soft 2s infinite ease-in-out',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 0%, var(--tw-gradient-stops))',
        'prime-gradient': 'linear-gradient(to bottom, #0A0C10, #1A1D23)',
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(0, 242, 254, 0.3)',
        'red-glow': '0 0 20px rgba(247, 90, 104, 0.3)',
      }
    },
  },

  plugins: [
    forms,
    aspectRatio,
    lineClamp,
  ],
};