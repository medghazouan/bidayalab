/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  safelist: [
    // Global Utilities
    'bg-black/95',
    'bg-transparent',
    
    // Primary Brand Color (Lime)
    'text-[#beff01]',
    'hover:text-[#beff01]',
    'bg-[#beff01]',
    'hover:bg-[#a8e600]',

    // Visual Storytelling Theme (Orange/Amber) - NEW
    'text-orange-400',
    'bg-orange-500',
    'hover:bg-orange-600',
    'shadow-orange-500/30',
    'border-orange-500/20',
    'hover:border-orange-500/30',
    'bg-orange-500/10',
    'to-amber-500/10',
    'text-amber-400',

    // Performance Marketing Theme (Green)
    'text-green-400',
    'bg-green-500',
    'hover:bg-green-600',
    'border-green-500/20',
    'bg-green-500/10',

    // Social Media Theme (Pink)
    'text-pink-400',
    'bg-pink-500',
    'hover:bg-pink-600',
    'border-pink-500/20',
    'bg-pink-500/10',

    // Web Dev Theme (Blue)
    'text-blue-400',
    'bg-blue-500',
    'hover:bg-blue-600',
    'border-blue-500/20',
    'bg-blue-500/10',
  ],

  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        primary: {
          DEFAULT: '#beff01',
          hover: '#a8e600',
          dark: '#8bc900',
        },
      },
      keyframes: {
        'gradient-mesh': {
          '0%, 100%': { backgroundPosition: '0% 0%, 100% 100%, 50% 50%' },
          '50%': { backgroundPosition: '100% 100%, 0% 0%, 100% 0%' },
        },
        'orb-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(30px, -40px) scale(1.2)' },
        },
        'orb-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-30px, 40px) scale(1.3)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(200vh)' },
        },
      },
      animation: {
        'gradient-mesh': 'gradient-mesh 20s ease-in-out infinite',
        'orb-1': 'orb-1 15s ease-in-out infinite',
        'orb-2': 'orb-2 18s ease-in-out infinite 2s',
        'scan-line': 'scan-line 8s linear infinite',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
}