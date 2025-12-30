/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🌑 CYBERCORE BASE (The Void)
        'hl-bg': '#020205',       // Almost pure black, tiny hint of blue
        'hl-panel': '#0a0a12',    // Dark, cold plate
        'hl-card': '#11111a',     // Slightly lighter UI element
        
        // 💿 METALLIC ACCENTS
        'hl-cyan': '#a5b4fc',     // "Dark Blusing" -> Cold Silver-Blue (Rei Ayanami Hair color)
        'hl-rose': '#ff003c',     // Glitch Red (System Warnings)
        'hl-moss': '#ffffff',     // Pure Chromium White (High contrast text)
        
        // 🌫️ TEXT HIERARCHY
        'hl-text': '#e2e8f0',     // Silver-White (Primary text)
        'hl-muted': '#64748b',    // Slate Gray (Secondary text)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],     // Code / Data
        display: ['Orbitron', 'sans-serif'],       // HEADERS (The Cyber Look)
      },
      backgroundImage: {
        // The "Scanline" Texture Gradient
        'scanlines': 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2))',
      },
    },
  },
  plugins: [],
}