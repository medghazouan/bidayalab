/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
        
        // Remove red completely
        // Old: red-500 was #ef4444
        // New: Use primary (#beff01)
      },
    },
  },
  plugins: [],
}
