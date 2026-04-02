# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for **Heisenberg Energiesysteme**, a German renewable energy company (photovoltaic, heat pumps, battery storage) based in Bremen. All content is in German (de-DE).

## Running Locally

No build step required. Serve the files directly:

```bash
python -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000` in a browser.

## Architecture

Three files form the entire site:

- **`index.html`** — Single-page layout with sections: header/nav, hero, why-us, about, services (PV, heat pumps, battery storage, registration, E-Check, Smart Meter), CTA banner, contact form, footer.
- **`style.css`** — Design system built on CSS custom properties (`--color-primary: #f97316` orange, `--color-dark: #1a2332` navy). Responsive breakpoints at 1024px, 768px, 480px.
- **`script.js`** — Vanilla JS: sticky header, mobile hamburger menu, scroll-spy nav highlighting, contact form validation (no real submission), stat counter animations via `IntersectionObserver`, and fade-in card animations.

## Key Patterns

- No external dependencies or frameworks — pure HTML/CSS/JS.
- Scroll animations use `IntersectionObserver` (not scroll event listeners).
- CSS variables are defined in `:root` in `style.css` — update colors/spacing there.
- The contact form simulates submission (no backend). To wire it up, modify the `handleFormSubmit` function in `script.js`.
- Stats displayed in the hero (838 customers, 390 installations, 13,240 kWp) are hardcoded in `index.html` and animated by `script.js`.
