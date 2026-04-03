# Context Transfer: Hyperland Portfolio (Current Snapshot)

Last verified: 2026-04-03

To any future AI/dev session: treat this as the current state of the codebase, verified from files in this repo. Prefer this over assumptions from old docs.

---

## 1. Project Identity

- Name: portfolio-cra (Hyperland-style personal portfolio)
- Framework: Create React App + React 19 + TypeScript
- Deployment setup:
  - package.json homepage: https://sumitahmed.me
  - public/cname: sumitahmed.me
  - gh-pages deploy scripts exist (predeploy/build + deploy)
- Design direction: cyber terminal UI with desktop/window metaphor and rich interaction layers

---

## 2. Core Stack and Libraries

- React 19, TypeScript, react-scripts 5
- Tailwind CSS 3 + postcss + autoprefixer
- framer-motion for UI motion and transitions
- lucide-react icons
- clsx + tailwind-merge utility styling helper
- wouter is installed, but current app uses hash anchors (no active wouter routes in main flow)
- react-github-calendar is installed but not currently used in the rendered UI

---

## 3. Runtime Integrations (Live APIs)

- Discord presence via Lanyard:
  - User ID: 608572578231091240
  - Used in Layout and LiveActivity components
- Contact form via Formspree:
  - Endpoint ID: xjknezzo
- Visitor count via Cloudflare Worker:
  - URL: https://visitor-counter.sksumitahmed007.workers.dev/
  - Uses sessionStorage/localStorage caching logic
- GitHub contribution heatmap API:
  - https://github-contributions-api.jogruber.de/v4/sumitahmed?y=<year>

---

## 4. App Entry and Layout Composition

- src/App.tsx returns src/pages/Home.tsx directly
- src/pages/Home.tsx renders sections in order:
  - Hero
  - AboutSection
  - SkillsSection
  - Experience
  - Projects grid from PROJECTS_DATA
  - ResourcesSection
  - AchievementsSection
  - ContactForm
  - Social-heavy footer with visitor count
- Section IDs used for navigation and scroll spy:
  - #, #about, #skills, #experience, #projects, #resources, #contact

---

## 5. Theme and Visual System

- Theme is controlled by data-theme on html
- Important current behavior:
  - Default theme is light (from localStorage fallback)
  - Toggle applies a bloom flash effect before theme swap
- Tailwind colors map to CSS variables:
  - hl-bg, hl-panel, hl-card, hl-cyan, hl-rose, hl-moss, hl-text, hl-muted, hl-border
- Global visuals include:
  - scanlines overlay
  - noise overlay
  - animated cyber canvas background
  - mouse-following dagger/chain SVG effect

---

## 6. Component Reality Map (What Each Major File Does)

- Layout.tsx:
  - fixed top system bar (email, live status, ping, uptime, battery, clock)
  - desktop side nav + mobile bottom nav
  - scroll spy across section anchors
  - theme toggle + bloom overlays
  - injects EngagementPopup and background systems

- Hero.tsx:
  - dynamic background video switches by theme (public/cyber-light.mp4, public/cyber-dark.mp4)
  - animated intro copy and CTA buttons
  - profile shown in DraggableWindow
  - bottom social dock with custom hover preview cards (GitHub, Discord, LeetCode, etc.)

- DraggableWindow.tsx:
  - desktop drag + resize handles + minimize/maximize controls
  - mobile fallback disables drag/resize logic
  - close action opens persuasion modal (does not actually remove card)

- CodingStats.tsx:
  - yearly GitHub grid (2026, 2025, 2024, 2023)
  - hardcoded Codolio block currently active (USE_LEETCODE = false)
  - hardcoded Codolio counts: total 236, activeDays 90, easy 128, medium 33, hard 4

- ProjectCard.tsx + ProjectModal.tsx:
  - terminal-styled cards and modal case-study view
  - uses PROJECTS_DATA with extended content fields

- ResourcesSection.tsx:
  - "Blogs & Resources" block
  - flagship DSA notion link + secondary links + collapsible tools/gear panels

- ContactForm.tsx:
  - terminal-styled form posting to Formspree
  - success state swaps to terminal success card

---

## 7. Data Layer and Content Source

- src/lib/data.ts is authoritative content source for:
  - PROJECTS_DATA (with modal fields)
  - ACHIEVEMENTS_CERTS
- Current projects in data:
  - AgriSense AI
  - VidTube Platform
  - Nyay Sarthi
  - Hyperland Portfolio
- Achievements/certs are card-driven from ACHIEVEMENTS_CERTS

---

## 8. Public and Build Artifacts

- public/ contains runtime media and profile assets:
  - cyber-dark.mp4, cyber-light.mp4, profile.jpeg, resume.pdf, project images, cname
- build/ exists and mirrors deployed static output; treat as generated artifacts

---

## 9. Known Drift / Cleanup Candidates

- src/App.test.tsx is default CRA test ("learn react") and no longer matches app UI
- src/App.css is largely CRA starter CSS and not central to current styling
- public/manifest.json still contains default CRA manifest values
- some textual strings include decorative/garbled glyphs in DraggableWindow modal copy

---

## 10. Guardrails for Future Edits

- Do not replace personal identity details with placeholders
- Preserve section IDs because nav and scroll spy depend on them
- Preserve CSS variable names since Tailwind mappings depend on them
- Keep draggable windows mobile-safe (no forced drag behavior on small screens)
- Avoid removing external API fallbacks/caching without replacing reliability behavior
- Keep cyber/terminal visual language consistent unless explicitly asked to redesign

---

## 11. Quick File Pointers

- App shell: src/pages/Home.tsx, src/components/Layout.tsx
- Theme system: src/index.css, tailwind.config.js
- Windowing system: src/components/DraggableWindow.tsx, src/components/TerminalWidget.tsx
- Portfolio content: src/lib/data.ts
- Major sections: src/components/Hero.tsx, src/components/AboutSection.tsx, src/components/SkillsSection.tsx, src/components/Experience.tsx, src/components/ResourcesSection.tsx, src/components/AchievementsSection.tsx, src/components/ContactForm.tsx

Use this file as the baseline context before implementing future tasks.