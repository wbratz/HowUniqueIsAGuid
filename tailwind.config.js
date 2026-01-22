/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'Apple Color Emoji',
          'Segoe UI Emoji',
        ],
      },
      colors: {
        bg: '#0b0f17',
        card: 'rgba(255,255,255,0.04)',
        accent: '#7c3aed',
      },
      boxShadow: {
        glow: '0 0 64px rgba(124, 58, 237, 0.35)',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
        glow: 'radial-gradient(600px circle at var(--x) var(--y), rgba(124,58,237,0.08), transparent 40%)',
      },
    },
  },
  plugins: [],
}
