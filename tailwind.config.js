/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ⚡ DYNAMIC MAPPING
        'hl-bg': 'var(--bg-primary)',
        'hl-panel': 'var(--bg-panel)',
        'hl-card': 'var(--bg-card)',
        
        'hl-cyan': 'var(--accent-cyan)',
        'hl-rose': 'var(--accent-rose)',
        'hl-moss': 'var(--accent-moss)',
        
        'hl-text': 'var(--text-primary)',
        'hl-muted': 'var(--text-muted)',
        
        'hl-border': 'var(--border-dim)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
      },
      backgroundImage: {
        'scanlines': 'linear-gradient(to bottom, transparent 50%, var(--border-dim) 50%)',
      },
    },
  },
  plugins: [],
}