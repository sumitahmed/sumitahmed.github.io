/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // DARK ZEN PALETTE
        'hl-bg': '#050505',       // Deepest Ink Black
        'hl-panel': '#0a0a0a',    // Smoked Glass
        'hl-card': '#121212',     // Slightly lighter for hover
        
        // REPLACING CYAN WITH SAKURA PINK
        'hl-cyan': '#ffb7c5',     // Pale Cherry Blossom Pink (The new main accent)
        
        // Secondary Accents
        'hl-rose': '#e04f5f',     // Torii Gate Red
        'hl-moss': '#8b9bb4',     // Desaturated Blue-Grey (Replacing Green)
        'hl-muted': '#9ca3af',    // Clean Grey text
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