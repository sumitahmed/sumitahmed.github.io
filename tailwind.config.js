/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hl-bg': '#0b0f14',
        'hl-panel': '#0f1419',
        'hl-cyan': '#7fd6ff',
        'hl-rose': '#ffb78b',
        'hl-moss': '#77c9a7',
        'hl-muted': '#98a2aa',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
