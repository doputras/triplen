import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', // <-- This scans your files
  ],
  theme: {
    extend: {
      colors: {
        // All your colors from :root go here
        background: '#fafaf9',
        foreground: '#1c1917',
        ivory: '#fafaf9',
        beige: '#d6cfc4',
        navy: '#1e293b',
        gold: '#d4af37',
        'rose-gold': '#b76e79',
        charcoal: '#2d2d2d',
        'warm-white': '#f8f7f4',
        'accent-gold': '#c9a961',
      },
      fontFamily: {
        // Assumes you set up fonts in layout.tsx
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config