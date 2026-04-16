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
6. **Adds i18n keys** for all 6 languages in `src/lib/i18n.ts`

---

## Template Structure

Every project page follows this exact section order. Do NOT deviate from it.

| Section | Component | Notes |
|---------|-----------|-------|
| Back nav | `Link` → `/projects` | Uses `{tr.navProjects}` — already translated |
| Hero | `h1` + badge + tagline + `ImagePlaceholder` | Title: `text-3xl font-bold`. Badge options: "Open Source" (green), "In Development" (orange clock), "Active / In Use" |
| TL;DR card | Inline card with bullet list + GitHub button | **Required.** Right after hero, before `<AnimatedLine />`. 3 bullets summarising the project. GitHub button on the right. |
| Divider | `<AnimatedLine />` | Always after TL;DR card |
| The Problem | `SectionLabel` + prose | Prose div has `border-l border-[var(--c-border)] pl-4`. 2–3 paragraphs. Relatable, story-driven. |
| The Insight | `SectionLabel` + prose | Prose div has `border-l border-[var(--c-border)] pl-4`. The "aha moment". |
| How It Works | `SectionLabel` + `ImagePlaceholder` + prose | Diagram FIRST, then prose with `border-l border-[var(--c-border)] pl-4` |
| Architecture Highlights | `SectionLabel` + 4× `ArchCard` in 2-col grid | Each card: icon + title + 1-sentence description. No left accent. |
| Tech Stack | `SectionLabel` + `<TechMarquee />` | Infinite scrolling marquee. No left accent. |
| Outcomes & Status | `SectionLabel` + `<OutcomesList items={[...]} />` | Scroll-triggered animation. No left accent. |
| What I Learned | `SectionLabel` + prose | Prose div has `border-l border-[var(--c-border)] pl-4`. 3–4 paragraphs. |
| GitHub CTA | Card with button | "View the source" card with GitHub button |
| Related Projects | 2-col grid of `Link` cards | **Required.** After GitHub CTA. Link to 2 thematically related projects. Use existing `tr.proj1Desc` etc. for descriptions. |

### Reading Progress Nav
Every page includes `<ReadingNav activeId={activeId} labels={navLabels} />` rendered outside the main `<div>`, directly inside `<Layout>`. It's powered by `IntersectionObserver` with rootMargin `-10% 0px -50% 0px`.

The **first section is always `"intro"`** — it maps to the hero `<div id="intro">` and its nav label is the project name (hardcoded string, not a tr key). Clicking it calls `window.scrollTo({ top: 0, behavior: "smooth" })`.

```tsx
const SECTIONS = [
  { id: "intro",         label: "intro" },
  { id: "problem",       label: "problem" },
  { id: "insight",       label: "insight" },
  { id: "how-it-works",  label: "how-it-works" },
  { id: "architecture",  label: "architecture" },
  { id: "tech-stack",    label: "tech-stack" },
  { id: "outcomes",      label: "outcomes" },
  { id: "learnings",     label: "learnings" },
];

const navLabels: Record<string, string> = {
  "intro":        "Project Name Here",   // hardcoded — project name, not a tr key
  "problem":      tr.<prefix>Label_problem,
  "insight":      tr.<prefix>Label_insight,
  "how-it-works": tr.<prefix>Label_howItWorks,
  "architecture": tr.<prefix>Label_architecture,
  "tech-stack":   tr.<prefix>Label_techStack,
  "outcomes":     tr.<prefix>Label_outcomes,
  "learnings":    tr.<prefix>Label_learnings,
};
```

Standard section IDs (all 8):
```
intro | problem | insight | how-it-works | architecture | tech-stack | outcomes | learnings
```

**ReadingNav implementation** — the spine is capped at dot centers (`top-[12.5px] bottom-[12.5px]`) so it never overshoots. Progress fill uses `activeIndex / (SECTIONS.length - 1)` (0→1 across all dots), clipped by an `overflow-hidden` wrapper:

```tsx
function ReadingNav({ activeId, labels }: { activeId: string; labels: Record<string, string> }) {
  const activeIndex = SECTIONS.findIndex(s => s.id === activeId);
  const progress = activeIndex / (SECTIONS.length - 1);
  return (
    <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-start gap-0 select-none">
      <div className="absolute left-[5px] top-[12.5px] bottom-[12.5px] w-px bg-[var(--c-border)]" />
      <div className="absolute left-[5px] top-[12.5px] bottom-[12.5px] w-px overflow-hidden">
        <div className="w-full bg-[var(--c-fg)] transition-all duration-300" style={{ height: `${progress * 100}%` }} />
      </div>
      {SECTIONS.map((s) => {
        const isActive = s.id === activeId;
        return (
          <a key={s.id} href={`#${s.id}`} className="relative flex items-center gap-3 py-[7px] group"
            onClick={(e) => {
              e.preventDefault();
              if (s.id === "intro") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            <span className="relative z-10 w-[11px] h-[11px] rounded-full border flex-shrink-0 transition-all duration-200"
              style={{
                borderColor: isActive ? "var(--c-fg)" : "var(--c-border-strong)",
                backgroundColor: isActive ? "var(--c-fg)" : "transparent",
                transform: isActive ? "scale(1.15)" : "scale(1)",
              }}
            />
            <span className="text-[10px] font-medium tracking-wide whitespace-nowrap transition-all duration-200"
              style={{ color: isActive ? "var(--c-fg)" : "var(--c-faint)", opacity: isActive ? 1 : 0, transform: isActive ? "translateX(0)" : "translateX(-4px)" }}
            >
              {labels[s.id]}
            </span>
            {!isActive && (
              <span className="absolute left-8 text-[10px] font-medium tracking-wide whitespace-nowrap text-[var(--c-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                {labels[s.id]}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}

---

## i18n Requirements

**All content on the page must be wired to `tr` from `usePortfolio()`.** This includes section labels, prose paragraphs, arch card titles/descriptions, outcome items, learnings, CTA text, related heading, hero tagline, badge, and TLDR bullets.

Use a consistent prefix per project, e.g. `llmWiki`, `ragSystem`, `voiceFlow`.

### Keys to add per project (use `<prefix>` as your namespace)

```typescript
// Hero
<prefix>Hero_badge: string;
<prefix>Hero_tagline: string;

// TL;DR
<prefix>Tldr_heading: string;   // "TL;DR" / "En bref" / etc.
<prefix>Tldr_b1: string;
<prefix>Tldr_b2: string;
<prefix>Tldr_b3: string;

// Section labels
<prefix>Label_problem: string;
<prefix>Label_insight: string;
<prefix>Label_howItWorks: string;
<prefix>Label_architecture: string;
<prefix>Label_techStack: string;
<prefix>Label_outcomes: string;
<prefix>Label_learnings: string;

// Prose paragraphs (split at inline <code> terms if needed — see below)
<prefix>Problem_p1: string; <prefix>Problem_p2: string; <prefix>Problem_p3: string;
<prefix>Insight_p1: string; <prefix>Insight_p2: string; <prefix>Insight_p3: string;
<prefix>HowItWorks_p1: string;
// If a paragraph wraps a <code> term, split it:
<prefix>HowItWorks_p2a: string;  // text before the <code> tag
<prefix>HowItWorks_p2b: string;  // text after the <code> tag
<prefix>HowItWorks_p3: string;

// Architecture cards (4 cards × title + desc)
<prefix>Arch_1_title: string; <prefix>Arch_1_desc: string;
<prefix>Arch_2_title: string; <prefix>Arch_2_desc: string;
<prefix>Arch_3_title: string; <prefix>Arch_3_desc: string;
<prefix>Arch_4_title: string; <prefix>Arch_4_desc: string;

// Outcomes (6 items)
<prefix>Outcome_1: string; ... <prefix>Outcome_6: string;

// Learnings (4 paragraphs)
<prefix>Learnings_p1: string; <prefix>Learnings_p2: string;
<prefix>Learnings_p3: string; <prefix>Learnings_p4: string;

// GitHub CTA
<prefix>Cta_title: string;
<prefix>Cta_desc: string;
<prefix>Cta_btn: string;   // e.g. "GitHub ↗"

// Related projects heading
<prefix>Related_heading: string;
```

Also add to `Translations` interface and to all 6 language objects in `src/lib/i18n.ts`.

### Paragraph splitting for inline `<code>` tags

When a paragraph contains a technical term wrapped in `<code>`, split the i18n string at that term:

```tsx
// In i18n.ts — split "pdftotext handles..." at the term
<prefix>HowItWorks_p2a: "PDF extraction uses a dual strategy: ",   // ends just before the term
<prefix>HowItWorks_p2b: " handles LaTeX-compiled ...",             // starts just after the term

// In JSX
<p>
  {tr.<prefix>HowItWorks_p2a}
  <code className="text-xs font-mono bg-[var(--c-surface)] px-1.5 py-0.5 rounded text-[var(--c-muted)]">
    pdftotext
  </code>
  {tr.<prefix>HowItWorks_p2b}
</p>
```

For paragraphs with 3+ code spans, use a single plain-text string (skip the code styling).

---

## Writing Tone & Style

- **Warm and didactic** — write like you're explaining to a smart friend, not a job interviewer
- **First-person** — "I built", "I learned", "I realized" — this is your portfolio
- **Specific over vague** — "51 PDFs processed" not "a lot of documents"; "11 slash commands" not "several commands"
- **"The Problem"** should be relatable — every recruiter or developer has felt this pain
- **"What I Learned"** is the most human section — be genuine, not performative

---

## TL;DR Card

The TL;DR card sits between the hero image and the `<AnimatedLine />` divider. It gives skimmers the key facts without reading the full post.

```tsx
{/* TL;DR card — green left accent + elevated surface to distinguish it from regular cards */}
<FadeUp delay={0.07}>
  <div className="mb-8 rounded-lg border border-[var(--c-border)] border-l-[3px] border-l-[#34d399] bg-[var(--c-surface-2)] p-5">
    <div className="flex items-start justify-between gap-5 flex-wrap">
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--c-muted)] mb-3">
          {tr.<prefix>Tldr_heading}
        </p>
        <ul className="space-y-2">
          {[tr.<prefix>Tldr_b1, tr.<prefix>Tldr_b2, tr.<prefix>Tldr_b3].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--c-soft)] leading-relaxed">
              <span className="w-1 h-1 rounded-full bg-[#34d399] shrink-0 mt-[0.55em]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <a href={GITHUB_URL} target="_blank" rel="noreferrer"
        className="inline-flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-md border border-[var(--c-border)] bg-[var(--c-surface-2)] text-[var(--c-fg)] hover:bg-[var(--c-surface-3)] hover:border-[var(--c-border-strong)] transition-all duration-150 whitespace-nowrap shrink-0 self-start"
      >
        <GithubIcon />
        {tr.<prefix>Cta_btn}
      </a>
    </div>
  </div>
</FadeUp>
```

---

## Related Projects Section

The related projects section sits at the very bottom, after the GitHub CTA, separated by a top border.

```tsx
{/* Related Projects */}
<FadeUp delay={0.40}>
  <div className="mt-12 pt-8 border-t border-[var(--c-border)]">
    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--c-muted)] mb-4">
      {tr.<prefix>Related_heading}
    </p>
    {/* Horizontal scroll strip — supports any number of cards */}
    <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 snap-x snap-mandatory scrollbar-none">
      {relatedProjects.map((p) => (
        <Link key={p.href} href={p.href} className="block group flex-none w-64 snap-start">
          <div className="rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] p-4 transition-all duration-200 hover:border-[var(--c-border-strong)] hover:bg-[var(--c-surface-2)] h-full">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-medium text-[var(--c-fg)]">{p.name}</p>
              <ChevronRight size={12} className="text-[var(--c-faint)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0" />
            </div>
            <p className="text-xs text-[var(--c-muted)] leading-relaxed">{p.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
</FadeUp>
```

Each card is `w-64 flex-none` — fixed width, never wraps. Add as many `relatedProjects` entries as needed; they scroll horizontally. The `.scrollbar-none` utility is defined in `src/index.css`.

Define `relatedProjects` inside the component using existing `tr.proj*Desc` keys:
```tsx
const relatedProjects = [
  { name: "Enterprise RAG System", desc: tr.proj1Desc,         href: "/projects/rag-system" },
  { name: "VoiceFlow",             desc: tr.proj2Desc,         href: "/projects/voiceflow" },
];
```

---

## Components Reference

All of these are defined locally inside the page file (copy from `ProjectLlmAcademicWiki.tsx`):

```tsx
// Section header with tick line — muted color, mb-7, sm size, uppercase
// className: "text-sm font-semibold uppercase tracking-[0.12em] text-[var(--c-muted)]"
function SectionLabel({ children })

// FadeUp wrapper with staggered delay
function ContentBlock({ children, delay })

// Hoverable card for architecture points
function ArchCard({ icon, title, description })

// Fixed-aspect image placeholder
function ImagePlaceholder({ label, aspectClass? })

// Infinite marquee for tech stack
function TechMarquee()  // uses local techStack array

// Scroll-triggered outcomes list — one-shot IntersectionObserver, animates in when visible
function OutcomesList({ items: string[] })

// Fixed right-side reading progress nav (xl+ only)
function ReadingNav({ activeId, labels })  // labels: Record<string, string> from navLabels map

// GitHub SVG icon (reused in TL;DR card and CTA)
const GithubIcon = () => <svg .../>
```

Imports needed:
```tsx
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, /* icons for ArchCards */, CheckCircle2, Image, ChevronRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { FadeUp, TechBadge, AnimatedLine } from "@/components/shared";
import { usePortfolio } from "@/context/PortfolioContext";
```

Good ArchCard icons from lucide-react: `Database`, `GitBranch`, `Layers`, `Zap`, `Terminal`, `Code2`, `Server`, `Globe`, `Cpu`, `Network`, `Shield`, `Workflow`

---

## Questions to Ask the User

Before writing, gather these if not clear from the project itself:

1. **GitHub repo URL** — for the CTA button and TL;DR card. Skip if a GitHub URL/shorthand was already passed as the source argument.
2. **Status badge** — Open Source / In Development / Active / In Use?
3. **The one-liner** — how would you describe this project in one sentence to a recruiter?
4. **TL;DR bullets** — what are the 3 most important stats or facts about the project?
5. **What I learned** — what surprised you? what would you do differently? what clicked?

Do NOT ask about tech stack, architecture, or features — read those from the project source.

---

## Files to Touch

| File | Action |
|------|--------|
| `src/pages/Project<Name>.tsx` | Create (full page) |
| `src/lib/i18n.ts` | Add `~42` new keys to the interface and all 6 language objects |
| `src/App.tsx` | Add `<Route path="/projects/<slug>" component={Project<Name>} />` if missing |
| `src/pages/Projects.tsx` | Add project entry using `tr.proj_<name>Desc` if missing |

Check `App.tsx` first — if the route already exists, skip routing changes.

---

## Quality Checklist

Before finishing, verify:
- [ ] `npm run build` passes with zero TypeScript errors (excluding pre-existing errors in other files)
- [ ] `usePortfolio` is imported and `const { tr } = usePortfolio()` is called in the component
- [ ] All 6 language objects in `i18n.ts` have every new key
- [ ] `navLabels` map uses `tr.*Label_*` keys so nav labels update on language switch
- [ ] `SECTIONS` array has 8 entries starting with `"intro"`, IDs match `id=` attributes in JSX
- [ ] Hero div has `id="intro"` and `navLabels["intro"]` is the project name (hardcoded string)
- [ ] TL;DR card uses `border-l-[3px] border-l-[#34d399] bg-[var(--c-surface-2)]` (green left accent)
- [ ] TL;DR card has 3 specific bullets (numbers, stats, key design decisions)
- [ ] Prose divs in Problem, Insight, How It Works (text only), Learnings have `border-l border-[var(--c-border)] pl-4`
- [ ] Outcomes section uses `<OutcomesList items={[...]} />` (scroll-triggered, not always-firing)
- [ ] Related projects section links to 2 real pages that exist in `App.tsx`
- [ ] All 4 `ArchCard`s are filled with real content (no placeholders)
- [ ] `techStack` array reflects the actual tech used
- [ ] GitHub URL in both TL;DR card and bottom CTA matches the real repo
- [ ] `TechMarquee` duplicates the array correctly: `[...techStack, ...techStack]`
- [ ] `ReadingNav` is rendered OUTSIDE the main content `<div>`, directly inside `<Layout>`
- [ ] `GithubIcon` component is defined at the top of the file and used in both TL;DR and CTA
