/** @type {import('tailwindcss').Config} */
module.exports = {
  // ⚡ PERFORMANCE: Optimized content paths - only scan necessary files
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Removed './pages/**/*' since we're using App Router, not Pages Router
  ],

  // ⚡ PERFORMANCE: Safelist only essential dynamic classes
  safelist: [
    // Only safelist classes that are dynamically generated
    'bg-black/95',
    'bg-transparent',
    'text-[#beff01]',
    'hover:text-[#beff01]',
    'bg-[#beff01]',
    'hover:bg-[#a8e600]',
  ],

  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',

        // Primary - Lime Green (replaces red)
        primary: {
          DEFAULT: '#beff01',
          hover: '#a8e600',
          dark: '#8bc900',
        },
      },

      // ⚡ PERFORMANCE: Define animations in Tailwind instead of inline styles
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

  // ⚡ PERFORMANCE: Optimize for production builds
  future: {
    hoverOnlyWhenSupported: true, // Only apply hover styles on devices that support hover
  },

  plugins: [],
}
