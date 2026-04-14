# New Project Page

Creates a complete blog/case-study page for a new project in the neo-website portfolio, following the established template from `ProjectLlmAcademicWiki.tsx`.

## Usage

```
/new-project-page <project-name> [source]
```

`[source]` is optional and can be:
- A **local path**: `~/Desktop/my-project`
- A **GitHub URL**: `https://github.com/user/repo`
- A **GitHub shorthand**: `user/repo`
- Omitted entirely if the project is already listed in the portfolio

**Examples:**
- `/new-project-page voiceflow` — already listed, just fill in the page
- `/new-project-page my-project ~/Desktop/my-project` — explore local folder
- `/new-project-page my-project https://github.com/neo-nunez/my-project` — clone & explore from GitHub
- `/new-project-page my-project neo-nunez/my-project` — same, shorthand form

---

## What this skill does

1. **Resolves the source** — if a GitHub URL or shorthand is provided, clone it to a temp directory with `git clone --depth 1` before exploring. If a local path is given, explore it directly. If no source, check if the project exists in the portfolio already.
2. **Explores the project** to understand what it does, the tech stack, key design decisions, and interesting implementation details
3. **Interviews you** with a few targeted questions to gather content that can't be inferred from the code
4. **Writes the full page** following the established template
5. **Wires it up** in `App.tsx` and `Projects.tsx` if the project isn't already registered

---

## Template Structure

Every project page follows this exact section order. Do NOT deviate from it.

| Section | Component | Notes |
|---------|-----------|-------|
| Back nav | `Link` → `/projects` | Always present |
| Hero | `h1` + badge + tagline + `ImagePlaceholder` | Title: `text-3xl font-bold`. Badge options: "Open Source" (green), "In Development" (orange clock), "Active / In Use" |
| Divider | `<AnimatedLine />` | Always after hero |
| The Problem | `SectionLabel` + prose | 2–3 paragraphs. Relatable, story-driven. Why does this project exist? |
| The Insight | `SectionLabel` + prose | The "aha moment". What made the approach click? |
| How It Works | `SectionLabel` + `ImagePlaceholder` (arch diagram) + prose | Diagram goes FIRST, then text below |
| Architecture Highlights | `SectionLabel` + 4× `ArchCard` in 2-col grid | Each card: icon + title + 1-sentence description |
| Tech Stack | `SectionLabel` + `<TechMarquee />` | Infinite scrolling marquee |
| Outcomes & Status | `SectionLabel` + animated `CheckCircle2` list | Real numbers and achievements |
| What I Learned | `SectionLabel` + prose | 3–4 paragraphs. Honest, warm, shows growth mindset |
| GitHub CTA | Card with button | Always at the bottom. "View the source" card with GitHub ↗ button |

### Reading Progress Nav
Every page includes `<ReadingNav activeId={activeId} />` rendered outside the main `<div>`, powered by `IntersectionObserver`. The `SECTIONS` array must match the actual `id` attributes on each section wrapper.

Standard section IDs:
```
problem | insight | how-it-works | architecture | tech-stack | outcomes | learnings
```

---

## Writing Tone & Style

- **Warm and didactic** — write like you're explaining to a smart friend, not a job interviewer
- **First-person** — "I built", "I learned", "I realized" — this is your portfolio
- **Specific over vague** — "51 PDFs processed" not "a lot of documents"; "11 slash commands" not "several commands"
- **Bold key phrases** using `<strong className="text-[var(--c-fg)] font-medium">...</strong>` — 1–2 per paragraph max
- **Inline code** for command names, file paths, config values: `<code className="text-xs font-mono bg-[var(--c-surface)] px-1.5 py-0.5 rounded text-[var(--c-muted)]">...</code>`
- **"The Problem"** should be relatable — every recruiter or developer has felt this pain
- **"What I Learned"** is the most human section — be genuine, not performative

---

## Components Reference

All of these are defined locally inside the page file (copy from `ProjectLlmAcademicWiki.tsx`):

```tsx
// Section header with tick line
function SectionLabel({ children })

// FadeUp wrapper with staggered delay
function ContentBlock({ children, delay })

// Hoverable card for architecture points
function ArchCard({ icon, title, description })

// Fixed-aspect image placeholder
function ImagePlaceholder({ label, aspectClass? })

// Infinite marquee for tech stack
function TechMarquee()  // uses local techStack array

// Fixed right-side reading progress nav (xl+ only)
function ReadingNav({ activeId })  // uses local SECTIONS array
```

Imports needed:
```tsx
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, /* icons for ArchCards */, CheckCircle2, Image, ExternalLink } from "lucide-react";
import { Layout } from "@/components/Layout";
import { FadeUp, TechBadge, AnimatedLine } from "@/components/shared";
```

Good ArchCard icons from lucide-react: `Database`, `GitBranch`, `Layers`, `Zap`, `Terminal`, `Code2`, `Server`, `Globe`, `Cpu`, `Network`, `Shield`, `Workflow`

---

## Questions to Ask the User

Before writing, gather these if not clear from the project itself:

1. **GitHub repo URL** — for the CTA button at the bottom and the hero link. Skip this if a GitHub URL/shorthand was already passed as the source argument.
2. **Status badge** — Open Source / In Development / Active / In Use?
3. **The one-liner** — how would you describe this project in one sentence to a recruiter?
4. **What I learned** — what surprised you? what would you do differently? what clicked?

Do NOT ask about tech stack, architecture, or features — read those from the project source.

---

## Files to Touch

| File | Action |
|------|--------|
| `src/pages/Project<Name>.tsx` | Create (full page) |
| `src/App.tsx` | Add `<Route path="/projects/<slug>" component={Project<Name>} />` if missing |
| `src/pages/Projects.tsx` | Add project entry with name, desc, tags, detailHref if missing |
| `src/lib/i18n.ts` | Add translation key for description in all 6 languages if missing |

Check `App.tsx` first — if the route already exists, skip routing changes.

---

## Quality Checklist

Before finishing, verify:
- [ ] `npm run build` passes with zero TypeScript errors
- [ ] `SECTIONS` array IDs match the `id` attributes on section wrappers
- [ ] All 4 `ArchCard`s are filled with real content (no placeholders)
- [ ] `techStack` array reflects the actual tech used
- [ ] GitHub URL in CTA matches the real repo
- [ ] `ImagePlaceholder` labels are descriptive: `"project screenshot / demo"` and `"system architecture diagram"`
- [ ] `TechMarquee` duplicates the array correctly: `[...techStack, ...techStack]`
- [ ] `ReadingNav` is rendered OUTSIDE the main content `<div>`, directly inside `<Layout>`
