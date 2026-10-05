---
version: alpha
name: neo-website
colors:
  c-bg: "#121212"
  c-fg: "#e4e4e7"
  c-muted: "#888888"
  c-faint: "#555555"
  c-dim: "#444444"
  c-deeper: "#333333"
  c-soft: "#aaaaaa"
  c-mid: "#666666"
  c-surface: "rgba(255,255,255,0.04)"
  c-surface-2: "rgba(255,255,255,0.06)"
  c-surface-3: "rgba(255,255,255,0.07)"
  c-border: "rgba(255,255,255,0.08)"
  c-border-thin: "rgba(255,255,255,0.06)"
  c-border-faint: "rgba(255,255,255,0.05)"
  c-border-strong: "rgba(255,255,255,0.10)"
  c-nav: "rgba(18,18,18,0.80)"
  c-elevated: "#1a1a1a"
  c-elevated-2: "#161616"
  light-c-bg: "#f2f2f2"
  light-c-fg: "#111111"
  light-c-muted: "#666666"
  light-c-faint: "#999999"
  light-c-dim: "#888888"
  light-c-deeper: "#bbbbbb"
  light-c-soft: "#555555"
  light-c-mid: "#777777"
  light-c-surface: "rgba(0,0,0,0.04)"
  light-c-surface-2: "rgba(0,0,0,0.06)"
  light-c-surface-3: "rgba(0,0,0,0.08)"
  light-c-border: "rgba(0,0,0,0.10)"
  light-c-border-thin: "rgba(0,0,0,0.07)"
  light-c-border-faint: "rgba(0,0,0,0.05)"
  light-c-border-strong: "rgba(0,0,0,0.12)"
  light-c-nav: "rgba(242,242,242,0.88)"
  light-c-elevated: "#e8e8e8"
  light-c-elevated-2: "#ececec"
  accent-orange: "#fb923c"
  accent-blue: "#60a5fa"
  success-green: "#34d399"
  accent-teal: "#5eead4"
  accent-purple: "#a78bfa"
  accent-groq-orange: "#f97316"
  accent-violet: "#7c3aed"
  accent-salmon: "#d97757"
typography:
  page-heading:
    fontFamily: "var(--app-font-sans)"
    fontSize: "1.5rem"
    fontWeight: "700"
    lineHeight: "2rem"
    letterSpacing: "normal"
  section-label:
    fontFamily: "var(--app-font-sans)"
    fontSize: "0.75rem"
    fontWeight: "600"
    lineHeight: "1rem"
    letterSpacing: "0.1em"
  body:
    fontFamily: "var(--app-font-sans)"
    fontSize: "0.875rem"
    fontWeight: "400"
    lineHeight: "1.625"
    letterSpacing: "normal"
  status-line:
    fontFamily: "var(--app-font-sans)"
    fontSize: "15px"
    fontWeight: "400"
    lineHeight: "1.625"
    letterSpacing: "normal"
  badge:
    fontFamily: "var(--app-font-sans)"
    fontSize: "13px"
    fontWeight: "500"
    lineHeight: "1"
    letterSpacing: "normal"
  tiny-mono:
    fontFamily: "var(--app-font-mono)"
    fontSize: "10px"
    fontWeight: "500"
    lineHeight: "1"
    letterSpacing: "0.1em"
rounded:
  sm: "calc(0.375rem - 4px)"
  md: "calc(0.375rem - 2px)"
  lg: "0.375rem"
  xl: "calc(0.375rem + 4px)"
  card-xl: "0.75rem"
  card-2xl: "1rem"
  full: "9999px"
spacing:
  page-max-width: "860px"
  page-x: "2rem"
  section-y: "1.5rem"
  nav-y: "0.875rem"
  card-p: "1.5rem"
  card-p-sm: "1.75rem"
  grid-gap: "0.75rem"
  skill-grid-gap: "1rem"
  skill-grid-gap-sm: "1.5rem"
components:
  logo:
    geometry: "SVG paths, viewBox 0 0 650 116"
    height: "17px; 18px at min-width 640px"
    baseColor: "currentColor"
    baseOpacity: "0.68; 0.95 for reduced motion"
    beamColor: "#ffffff dark; #000000 light"
    beamDuration: "2.2s"
    beamRepeatDelay: "2.4s"
    beamEasing: "cubic-bezier(0.22, 1, 0.36, 1)"
    reducedMotion: "hide beam"
  badge:
    backgroundColor: "{colors.c-surface}"
    color: "{colors.c-fg}"
    borderColor: "{colors.c-border-strong}"
    rounded: "{rounded.md}"
    padding: "0.25rem 0.625rem"
    fontSize: "13px"
  nav-card:
    backgroundColor: "{colors.c-surface}"
    hoverBackgroundColor: "{colors.c-surface-3}"
    borderColor: "{colors.c-border-strong}"
    hoverBorderColor: "{colors.c-dim}"
    rounded: "{rounded.card-xl}"
    padding: "0.75rem 1rem"
    shadow: "shadow-sm"
    hoverShadow: "shadow-md"
  hover-row:
    backgroundColor: "transparent"
    hoverBackgroundColor: "{colors.c-surface}"
    insetShadow: "inset 2px 0 0 var(--c-border)"
    rounded: "{rounded.md}"
    padding: "0.5rem 0.75rem"
  skill-card:
    backgroundColor: "{colors.c-surface}"
    hoverBackgroundColor: "{colors.c-surface-2}"
    borderColor: "{colors.c-border-thin}"
    rounded: "{rounded.card-2xl}"
    padding: "1.5rem"
    hoverTransform: "translateY(-4px) scale(1.01)"
  command-palette:
    backgroundColor: "{colors.c-elevated-2}"
    borderColor: "{colors.c-border-strong}"
    rounded: "{rounded.card-xl}"
    shadow: "shadow-2xl"
  language-switcher:
    backgroundColor: "{colors.c-surface}"
    hoverBackgroundColor: "{colors.c-surface-3}"
    borderColor: "{colors.c-border}"
    rounded: "{rounded.md}"
  chat-panel:
    backgroundColor: "{colors.c-surface}"
    borderColor: "{colors.c-border-thin}"
    rounded: "{rounded.card-2xl}"
    height: "280px"
---

## Overview

neo-website is a restrained technical portfolio for an AI systems and software engineer. The design language is quiet, monochrome, and systems-oriented: a dark canvas, fine borders, low-opacity surfaces, compact typography, mono command affordances, and subtle animated infrastructure patterns. The interface feels closer to a terminal-adjacent engineering notebook than a marketing site, with polish coming from motion, hierarchy lines, grain, and hover feedback rather than saturated brand color.

## Colors

- **Carbon Black (#121212):** the default page background; keeps the portfolio calm and lets type and linework carry hierarchy.
- **Zinc Text (#e4e4e7):** the primary foreground for headings, important labels, and active navigation.
- **Muted Gray (#888888):** the main secondary text color for descriptions, metadata, and inactive controls.
- **Faint Gray (#555555):** used for section labels, low-priority hints, and subtle status text.
- **Dim Graphite (#444444):** used for hover borders and intermediate UI emphasis.
- **Deep Graphite (#333333):** used for the quietest command palette hints and footer details.
- **Soft Silver (#aaaaaa):** used where secondary text needs a little more presence, such as inline links and chat text.
- **Glass Surface (rgba(255,255,255,0.04)):** the default translucent card and badge fill.
- **Raised Glass (rgba(255,255,255,0.06)):** the second surface layer for hovers and command rows.
- **Bright Glass (rgba(255,255,255,0.07)):** active states inside dropdowns, language menus, and terminal rows.
- **Hairline Border (rgba(255,255,255,0.08)):** the base border for cards, controls, and hierarchy boundaries.
- **Strong Hairline (rgba(255,255,255,0.10)):** used on badges, nav cards, and command palette frames.
- **Elevated Black (#1a1a1a):** dropdown and terminal-style panel background.
- **Deep Elevated Black (#161616):** modal and command palette panel background.
- **Signal Orange (#fb923c):** project/accent signal used for Browser Redactor and development state.
- **Information Blue (#60a5fa):** project signal for learning/reference-oriented badges.
- **Success Green (#34d399):** success/copy confirmation state.
- **Agent Teal (#5eead4):** AI orchestration and LangChain-family technology badges.
- **Model Purple (#a78bfa):** AI/ML badge signal for model and learning concepts.

## Typography

The site uses `Inter` as the only loaded web font and reserves mono typography for identity and command language. Headings stay compact at `text-2xl` rather than oversized, reinforcing the notebook-like portfolio feel. Body copy is usually `text-sm` with relaxed line-height, while key status lines use `text-[15px]` for slightly stronger readability. Command hints, nav tree, and AI skills module use `JetBrains Mono` or `Fira Code` through `--app-font-mono` to create a developer-tool tone. The `neo` logo uses geometric SVG paths, not typography: a theme-aware sheen sweeps for 2.2s, pauses for 2.4s, and repeats continuously. Reduced-motion preferences hide the beam and raise the base opacity to 0.95.

## Layout & Spacing

Pages are centered in a narrow `max-w-[860px]` column with `px-8` horizontal padding. The fixed top navigation creates a `pt-20` content offset, and sections usually start with `py-6`. The layout rhythm is dense but readable: badges use tight inline gaps, nav cards use a `gap-3` grid, and larger skill cards use `gap-4 sm:gap-6`. The left hierarchy navigation on large screens provides structure without increasing the content width.

## Elevation & Depth

Depth is conveyed through tonal layering, borders, and motion more than heavy shadows. Cards start as translucent glass surfaces with hairline borders and `shadow-sm`; hover states increase surface opacity, strengthen borders, and sometimes add `shadow-md`. Modals and command palettes use `shadow-2xl` with elevated black backgrounds. The fixed grain overlay and particle network add ambient depth while remaining nearly invisible.

## Shapes

The base radius is small (`--radius: .375rem`), but the product language rounds containers more generously where touch targets or cards need softness. Badges and small controls use `rounded-md`, nav cards and shadcn cards use `rounded-xl`, skill cards and chat panels use `rounded-2xl`, and circular controls use `rounded-full`. The result is precise and technical, not bubbly.

## Components

- **Badges:** inline pills with 13px medium text, icon slots, translucent fill, and strong hairline borders. Tech badges add exact icon colors from source data.
- **Navigation cards:** compact rounded cards with subtle border, surface, shadow, and arrow movement on hover.
- **Hover rows:** list rows reveal a left inset border and surface fill on hover, used for project indexes and link lists.
- **Skill cards:** large translucent rounded cards that lift and scale slightly, with a faint white gradient overlay on hover.
- **Soft skill accordions:** rounded cards with icon tiles and animated height reveal; border and surface strengthen on hover.
- **Command palette:** centered elevated modal with blurred black backdrop, tiny uppercase section label, active row, and mono hints.
- **Language switcher:** small bordered dropdown control with uppercase language code and active row styling.
- **Chat panel:** compact 280px card with initial state, suggestion pills, streaming loader state, minimal message typography, and a border-separated input row.
- **Hierarchy navigation:** mono tree navigation that draws active branches with SVG paths and dims inactive limbs.

## Do's and Don'ts

- **Do** use the semantic `--c-*` tokens rather than hard-coded grays for core UI.
- **Do** keep accent colors sparse and tied to technology, status, or project identity.
- **Do** prefer hairline borders, translucent fills, and short transitions over heavy decorative effects.
- **Do** keep typography compact; the portfolio should feel like an engineered interface, not a landing page.
- **Don't** introduce saturated backgrounds or large gradients outside the subtle hover overlays and ambient particle/noise patterns.
- **Don't** mix many radii in one component; choose the existing badge, card, modal, or circular radius pattern.
- **Don't** remove focus and hover states; micro-interaction is part of the brand.
- **Don't** replace the monochrome hierarchy with colorful navigation; color should remain informational and rare.
