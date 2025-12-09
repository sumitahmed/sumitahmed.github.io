# Hyperland Portfolio

![Hyperland Portfolio Showcase](public/portfolio-showcase.png)

## Overview

Hyperland Portfolio is a high-performance, interactive developer portfolio inspired by the aesthetics of "Hyperland" Linux rices and cyberpunk interfaces. Unlike traditional static portfolios, this application simulates a desktop environment featuring draggable windows, terminal-based widgets, and real-time state management.

Built with **React** and **TypeScript**, it leverages **Tailwind CSS** for a highly responsive utility-first design and **Framer Motion** for complex, physics-based animations.

## Live Demo

**[View Live Site](https://sumitahmed.github.io)**

---

## Key Features

### 1. Interactive Window System
* **Custom Draggable Interface:** Implemented a custom hook-based window management system allowing users to drag, minimize, and maximize content windows (About, Contact, Stats).
* **Z-Index Stacking Context:** Dynamic state management ensures the currently active window always appears on top of others.
* **Mobile Optimization:** Automatically disables dragging logic on touch devices, converting floating windows into a responsive vertical stack for better usability.

### 2. Terminal-Style Widgets
* **Command Line Interface (CLI) Aesthetics:** The contact form and skill sections mimic a Unix terminal environment (`.sh` scripts and execution logs).
* **Real-time Feedback:** The contact form provides terminal-style success logs upon submission, integrated directly with the Formspree API.

### 3. Dynamic Visuals
* **Interactive Background:** Features a canvas-based Sakura animation that reacts to mouse movement and scroll events.
* **Glassmorphism Engine:** Heavy use of backdrop-blur filters combined with semi-transparent RGBA layers to achieve a modern, frosted-glass look consistent with high-end OS designs.

---

## Technical Stack

* **Core Framework:** React 19
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Animation:** Framer Motion
* **Icons:** Lucide React
* **Form Handling:** Formspree API
* **Build Tool:** Create React App (CRA)
* **Deployment:** GitHub Pages

---

## Engineering Challenges & Solutions

### Challenge 1: The "Desktop" Metaphor on Mobile
**Problem:** A draggable window interface creates a poor user experience on small touch screens. Users struggle to drag windows while trying to scroll the page.
**Solution:** Implemented a `useMedia` check to detect viewport width. The application conditionally renders the `<DraggableWindow />` component logic. On mobile (< 768px), it unbinds drag event listeners and forces `width: 100%`, effectively transforming the UI from a desktop simulator to a standard responsive web layout without code duplication.

### Challenge 2: Z-Index Management
**Problem:** With multiple interactive windows, clicking one did not naturally bring it to the foreground, causing overlapping issues.
**Solution:** Created a centralized state manager for window focus. A `handleFocus` function updates the active window ID, dynamically calculating and assigning the highest `z-index` to the user's current point of interaction.

### Challenge 3: Performance with Heavy Blurs
**Problem:** Extensive use of `backdrop-filter: blur()` caused frame rate drops on lower-end devices.
**Solution:** Optimized rendering layers by applying `will-change: transform` properties to animated elements and reducing blur radius on non-critical background elements.

---

## Project Structure

```bash
src/
├── components/         # Reusable UI components
│   ├── DraggableWindow.tsx  # Core window logic
│   ├── TerminalWidget.tsx   # CLI wrapper
│   ├── Layout.tsx           # Global layout & Navbar
│   └── ...
├── lib/
│   └── data.ts         # Centralized data for projects/certs
├── pages/
│   └── Home.tsx        # Main entry point
└── assets/             # Static assets