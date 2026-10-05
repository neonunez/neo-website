---
version: alpha
name: Neo Nuñez — Portfolio
colors:
  # Dark theme (default)
  background: "#121212"
  foreground: "#e4e4e7"
  muted: "#888888"
  soft: "#aaaaaa"
  mid: "#666666"
  faint: "#555555"
  dim: "#444444"
  deeper: "#333333"
  elevated: "#1a1a1a"
  elevatedDeep: "#161616"
  surface: "rgba(255,255,255,0.04)"
  surface2: "rgba(255,255,255,0.06)"
  surface3: "rgba(255,255,255,0.07)"
  border: "rgba(255,255,255,0.08)"
  borderThin: "rgba(255,255,255,0.06)"
  borderFaint: "rgba(255,255,255,0.05)"
  borderStrong: "rgba(255,255,255,0.10)"
  nav: "rgba(18,18,18,0.80)"
  # Light theme
  backgroundLight: "#f2f2f2"
  foregroundLight: "#111111"
  elevatedLight: "#e8e8e8"
  navLight: "rgba(242,242,242,0.88)"
  # Semantic accents (used sparingly, inline)
  accentSuccess: "#34d399"
  accentSuccessSolid: "#10b981"
  accentBuild: "#fb923c"
  accentInfo: "#60a5fa"
  accentClaude: "#d97757"
  destructive: "#cc3333"
typography:
  display:
    fontFamily: "Inter"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  heading:
    fontFamily: "Inter"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Inter"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.65
  bodySmall:
    fontFamily: "Inter"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "Inter"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.5
  micro:
    fontFamily: "Inter"
    fontSize: "0.625rem"
    fontWeight: 500
    lineHeight: 1.4
  eyebrow:
    fontFamily: "Inter"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.1em"
    textTransform: "uppercase"
  mono:
    fontFamily: "JetBrains Mono"
    fontSize: "0.8125rem"
    fontWeight: 500
rounded:
  sm: "2px"
  md: "4px"
  lg: "6px"
  xl: "12px"
  "2xl": "16px"
  full: "9999px"
spacing:
  px: "1px"
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
  contentMax: "860px"
shadows:
  sm: "0 1px 2px 0 rgba(0,0,0,0.05)"
  base: "0 1px 3px 0 rgba(0,0,0,0.1)"
  md: "0 4px 6px -1px rgba(0,0,0,0.1)"
  lg: "0 10px 15px -3px rgba(0,0,0,0.1)"
  xl: "0 20px 25px -5px rgba(0,0,0,0.1)"
  floatNav: "0 4px 24px rgba(0,0,0,0.5)"
components:
  badge:
    display: "inline-flex"
    gap: "6px"
    paddingX: "10px"
    paddingY: "4px"
    fontSize: "13px"
    fontWeight: 500
    rounded: "{rounded.md}"
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.borderStrong}"
    color: "{colors.foreground}"
  pill-suggested:
    paddingX: "10px"
    paddingY: "4px"
    fontSize: "10px"
    rounded: "{rounded.full}"
    borderColor: "{colors.borderStrong}"
    color: "{colors.soft}"
  pill-suggested-hover:
    color: "{colors.foreground}"
    backgroundColor: "{colors.surface2}"
    borderColor: "{colors.dim}"
  nav-card:
    paddingX: "16px"
    paddingY: "12px"
    rounded: "{rounded.xl}"
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.borderStrong}"
    shadow: "{shadows.sm}"
  nav-card-hover:
    backgroundColor: "{colors.surface3}"
    borderColor: "{colors.dim}"
    shadow: "{shadows.md}"
  hover-row:
    paddingX: "12px"
    paddingY: "8px"
    rounded: "{rounded.md}"
    accentBar: "inset 2px 0 0 {colors.border}"
    backgroundColorHover: "{colors.surface}"
  card-elevated:
    rounded: "{rounded.xl}"
    backgroundColor: "{colors.elevated}"
    borderColor: "{colors.borderStrong}"
    shadow: "{shadows.sm}"
  card-elevated-hover:
    borderColor: "{colors.dim}"
  chat-panel:
    rounded: "{rounded.2xl}"
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.borderThin}"
    height: "280px"
    shadow: "{shadows.sm}"
  command-palette:
    maxWidth: "400px"
    rounded: "{rounded.xl}"
    backgroundColor: "{colors.elevatedDeep}"
    borderColor: "{colors.borderStrong}"
    backdropFilter: "blur(4px)"
  toast:
    paddingX: "24px"
    paddingY: "24px"
    rounded: "{rounded.md}"
    borderColor: "{colors.border}"
    backgroundColor: "{colors.background}"
    shadow: "{shadows.lg}"
  toast-destructive:
    backgroundColor: "{colors.destructive}"
    color: "#ffffff"
  link-anim:
    underline: "0% to 100% width, 1px, currentColor"
    transition: "background-size 0.35s ease"
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
---

## Overview

This is the personal portfolio of **Neo Nuñez**, an AI systems and software
engineer building LLM infrastructure, agentic RAG, and developer tools. The
design language is **monochrome minimalism**: a near-black canvas, a single
off-white ink, and a graduated ramp of grays that does all the hierarchy work.
There is no brand accent color in the chrome — color appears only as small,
functional signals (a green "copied" confirmation, an orange "in development"
pulse, the native brand hues of technology icons).

The personality is **quiet, precise, engineered**. It reads like a terminal
that learned typography: a geometric SVG `neo` wordmark with a slow specular sheen,
section markers written as `§0`–`§4`, a `⌘K` command palette, file-tree style
navigation, and `/skills`-style list panels. The target audience is technical —
recruiters, engineers, collaborators — so the surface rewards keyboard use and
restraint over decoration. The emotional feel is calm confidence: nothing
shouts, everything is deliberate, motion is subtle and earned (scroll-triggered
fades, drawn underlines, reading-progress dots).

The site is fully **bi-themed** (dark default, light variant) and the entire
surface cross-fades on theme switch via a global 0.25–0.35s color transition.

## Colors

The palette is a deliberate grayscale ramp. Surfaces and borders are expressed
as **translucent white overlays** (not solid grays) so they read correctly on
top of the particle-network background and across both themes.

**Core neutrals (dark theme):**

- **Ink Black (#121212):** The base canvas. Deep, slightly warm-neutral, never
  pure black — leaves room for elevated surfaces to read darker still.
- **Bone White (#e4e4e7):** Primary foreground / text. Soft off-white, never
  #fff, to reduce glare on the dark field.
- **Ash (#aaaaaa) / Smoke (#888888):** "Soft" and "muted" secondary text. The
  workhorses for descriptions and supporting copy.
- **Slate (#666666) / Graphite (#555555):** "Mid" and "faint" — tertiary labels,
  timestamps, eyebrow text.
- **Iron (#444444) / Charcoal (#333333):** "Dim" and "deeper" — keycap hints,
  disabled glyphs, the faintest interactive affordances.
- **Elevated (#1a1a1a) / Elevated Deep (#161616):** Opaque raised surfaces —
  dropdown menus, command palette, terminal-style panels.

**Translucent layers (dark theme):**

- **Surface (rgba 255,255,255 / 0.04 → 0.07):** Three steps of frosted overlay
  for cards, hovered rows, and active list items.
- **Border (rgba 255,255,255 / 0.05 → 0.10):** Four hairline weights — faint,
  thin, default, strong — that carry almost all of the structural separation.
- **Nav Veil (rgba 18,18,18 / 0.80):** The blurred mobile-nav backdrop.

**Light theme** mirrors every token with inverted values: Paper (#f2f2f2)
canvas, Near-Black (#111111) ink, and `rgba(0,0,0,…)` overlays for surfaces and
borders.

**Semantic accents** (used sparingly, never in chrome):

- **Success Green (#34d399 / solid #10b981):** "Copied", skill "on" status.
- **Build Orange (#fb923c):** "Project in development", the Browser Redactor
  shield, the rotating loader ring.
- **Info Blue (#60a5fa):** Occasional informational badge icons.
- **Claude Clay (#d97757):** Claude Code tooling icon.
- **Destructive (#cc3333):** Toast error variant.

## Typography

Two families, used with intent:

- **Inter** (sans) — loaded via Google Fonts at weights 400/500/600/700. Carries
  all prose, headings, labels, and UI text.
- **JetBrains Mono / Fira Code** (mono) — the engineering voice. Reserved for the
  keycap hints (`⌘K`), token counts (`~188 tok`), the `/skills`
  panel, the `>` prompt glyph, and "powered by" microcopy.
- **Georgia** (serif) — defined as a fallback role; rarely surfaced.
- **neo logo** — geometric SVG paths, not a font; 17px tall, 18px from 640px.

The type scale is compact and label-dense, reflecting the dossier/terminal feel:

- **Display (1.5rem / 600):** Page titles (`text-2xl`). The hero name animates in
  per-character.
- **Heading (1rem / 600):** Section headings, panel titles.
- **Body (0.9375rem–0.875rem / 400):** The `text-[15px]` status lines and
  `text-sm` descriptions, set at relaxed line-height (1.6–1.65).
- **Caption (0.75rem / 500):** `text-xs` metadata, tags.
- **Micro (0.625rem / 500):** `text-[10px]` keycap hints, "powered by" lines,
  reading-nav labels.
- **Eyebrow:** `text-xs`, weight 600, `uppercase`, `tracking-widest`, in faint
  gray — the section-label pattern above headings ("Find me", etc.).

Weight discipline: 400 for prose, 500 for UI labels/medium emphasis, 600 for
headings, 700 only for the strongest emphasis. Letter-spacing is tightened
(`-0.01em`) on the display name and widened dramatically on eyebrow/uppercase
micro-labels (`tracking-widest` / `0.3em`).

## Layout & Spacing

A single centered reading column at **max-width 860px**, with `px-8` gutters and
`pt-20` to clear the fixed nav. Everything lives in that column except three
ambient fixtures: the fixed `neo` SVG logo (top-left, xl+), the floating action
cluster (top-right), and the reading-progress nav (right edge on project pages,
bottom capsule on mobile).

Spacing rhythm follows Tailwind's 4px base scale, with vertical sections
separated by drawn `AnimatedLine` dividers (`my-10`) rather than large empty
gaps. Content is dense but breathable: status lines stack at `space-y-3.5`,
project rows at `space-y-4`, badge clusters wrap with `gap-x-2.5 gap-y-3`.

Containment principle: related content is grouped by **hairline borders and
faint surfaces**, not by heavy boxes. Most "cards" are barely-there — a 0.04
white wash with a 0.08 white border.

## Elevation & Depth

Depth is conveyed through **four stacked mechanisms**, in order of prominence:

1. **Tonal layering** — translucent surface steps (0.04 → 0.06 → 0.07) lift
   elements off the canvas without shadow.
2. **Hairline borders** — the strong/default/thin/faint border ramp draws every
   edge. Borders brighten on hover (`border` → `dim`) as the primary interactive
   feedback.
3. **Opaque elevated fills** — true floating elements (dropdowns, command
   palette) switch to solid `#1a1a1a` / `#161616` so content beneath can't bleed
   through.
4. **Shadows** — used last and softly: `shadow-sm` on cards, `shadow-xl/2xl` on
   the command palette and lightbox, and a custom `0 4px 24px rgba(0,0,0,0.5)`
   on the floating mobile reading-nav capsule. A `backdrop-filter: blur(4–12px)`
   reinforces modal and nav separation.

An ambient **particle-network canvas** and a fixed **SVG grain overlay**
(opacity 0.025) sit behind everything, giving the flat field subtle texture.

## Shapes

Corner radius is **moderate and consistent**. The base `--radius` is `0.375rem`
(6px), expanded into a tw scale (sm 2px → xl 10px), but in practice the UI leans
on Tailwind's named radii:

- **`rounded-md` (4px):** Badges, keycaps, hover rows, small buttons.
- **`rounded-lg` (6px):** Dropdown menus, image frames.
- **`rounded-xl` (12px):** Cards, nav cards, terminal/skills panels — the
  signature container radius.
- **`rounded-2xl` (16px):** The chat panel.
- **`rounded-full`:** Suggested-question pills, status dots, icon buttons,
  progress-nav nodes.

Shape language is rectangular-soft: no sharp corners, no heavy rounding. Pills
and dots provide the only fully-round shapes, used for ephemeral/interactive
affordances.

## Components

**Badge** — the atomic unit. An inline-flex capsule: `rounded-md`, surface fill,
strong-border, 13px medium text, with a leading icon slot at 90% opacity. Three
specializations share the shell: **FlagBadge** (emoji flag + label, optionally
linked), **TechBadge** (a brand-colored technology icon from `react-icons/si`
keyed off a `TECH_ICONS` map), and the plain Badge for status lines.

**Suggested Pill** — a smaller, fully-rounded `text-[10px]` button used for chat
prompt chips. Hover lifts text to foreground, fills surface-2, and brightens the
border.

**NavCard** — a `rounded-xl` surface card with a label and a trailing arrow. On
hover the border brightens, surface deepens to surface-3, a `shadow-md` appears,
and the arrow springs 4px right while its color animates to foreground.

**HoverRow** — the list-row primitive (used for project lists). On hover it
insets a 2px left accent bar (`inset 2px 0 0 border`) and washes in a faint
surface, with hidden chevrons/actions fading in via opacity. Touch-aware: tap
holds the active state ~400ms.

**Card (elevated)** — the `/skills` and chat-style panels: `rounded-xl`, opaque
`#1a1a1a` fill, strong border, `shadow-sm`, border brightening to `dim` on
hover. Often monospace, with a terminal header bar (`>` prompt + path).

**ChatPanel** — the signature interactive component. A `rounded-2xl`, 280px-tall
surface panel with three stacked regions split by drawn `AnimatedLine`s: a
scrolling message area (markdown-rendered assistant replies, mono `you:`/`agent:`
labels, a spinning loader while streaming), a horizontal row of suggested pills,
and a borderless input with a send/loader button.

**CommandPalette (⌘K)** — a centered modal over a blurred black scrim:
max-width 400px, `rounded-xl`, opaque `#161616`, strong border, `shadow-2xl`.
Rows highlight on arrow-key/hover, with a mono hint column and a footer of
keyboard legends (`↑↓ navigate · ↵ select · esc close`).

**LanguageSwitcher** — a small bordered surface button (flag + uppercase code +
chevron) opening a `rounded-lg` elevated dropdown; the chevron rotates 180° when
open, items show an active surface-3 state.

**Reading-Progress Nav** — project pages render a vertical right-edge rail of
`rounded-full` nodes connected by a hairline track, with a foreground fill bar
that grows with scroll. The active node scales 1.15 and fills; its label fades
in. Mobile collapses this into a floating bottom capsule.

**Toast** (Radix) — `rounded-md` panels sliding in from the top (mobile) /
bottom-right (desktop), default (background fill) and destructive (#cc3333 fill)
variants, with a close button that appears on hover.

**Inputs** — borderless within their container (chat input) or focus-ringed
(Radix primitives); placeholders in muted gray, content in foreground.

**Buttons** — the site avoids heavy filled buttons. Interactive elements are
mostly **icon buttons** (muted → foreground on hover) and **bordered ghost
chips**. The `link-anim` underline (a left-to-right drawn 1px line on hover) is
the dominant link treatment.

## Animation

Motion is subtle, eased, and meaningful:

- **`link-anim`** — background-size underline grows `0% → 100%` over 0.35s on
  hover.
- **`AnimatedLine`** — dividers draw in via `scaleX 0 → 1` over 0.8s with
  `cubic-bezier(0.25, 0.1, 0.25, 1)`, triggered once on scroll-into-view.
- **`FadeUp`** — content rises `y:14 → 0` and fades over 0.45s on scroll.
- **Logo sheen** — the `neo` SVG wordmark runs a continuous 2.2s sweep with
  a 2.4s pause and `cubic-bezier(0.22, 1, 0.36, 1)` easing. The beam is white
  in dark mode and black in light mode, clipped to even-odd glyph paths. Reduced
  motion hides the beam and raises base opacity from 0.68 to 0.95.
- **Name intro** — hero name animates per-character (`y:7 → 0`, staggered 28ms).
- **`globe-intro` / `badge-intro`** — entrance keyframes (scale-up, the badge
  with a `cubic-bezier(0.34, 1.56, 0.64, 1)` overshoot).
- **`marquee`** — a 28s linear infinite horizontal scroll, paused on hover,
  masked with edge gradients.
- **DevelopmentIndicator** — a 2s linear rotating ring over a 2s ease-in-out
  pulsing core.
- **Page transitions** — routes cross-fade with `opacity` + 8px `y` shift over
  0.25s.

Standard easing is `cubic-bezier(0.25, 0.1, 0.25, 1)`; springy affordances use
`type: spring, stiffness: 500, damping: 30`.

## Do's and Don'ts

**Do**

- Keep the chrome monochrome. Reach for the gray ramp before any color.
- Use color only as a functional signal (success, build, info) — small, brief,
  iconographic.
- Build separation with hairline borders and translucent surfaces, not heavy
  fills or drop shadows.
- Brighten borders on hover as the primary interactive feedback.
- Set prose at relaxed line-height (1.6–1.65) and keep the 860px column.
- Use mono type for anything "engineered" (tokens, keys, paths, prompts).
- Ensure every token works in both dark and light themes.

**Don't**

- Don't introduce a brand accent into buttons, links, or backgrounds.
- Don't use pure black (#000) or pure white (#fff) for canvas/ink.
- Don't exceed weight 700, and don't mix more than the two type families.
- Don't add large filled buttons — prefer icon buttons, ghost chips, and the
  `link-anim` underline.
- Don't stack heavy shadows; reserve `shadow-xl/2xl` for true overlays only.
- Don't animate aggressively — motion should be sub-second, eased, and earned by
  a scroll or interaction.
