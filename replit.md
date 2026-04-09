# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Portfolio Artifact (`artifacts/portfolio`)

Personal portfolio for Neo Nuñez — AI/Software Engineer, Oracle Data Integration Developer, Buenos Aires.

### Architecture
- **Framework**: React + Vite, TypeScript, Tailwind CSS, Framer Motion, wouter (routing)
- **Design**: Anthony Fu-inspired — dark/light themes, single centered column (640px), dot-bg, grain overlay
- **Context**: `src/context/PortfolioContext.tsx` — theme + lang state persisted to localStorage (`nn-theme`, `nn-lang`)
- **i18n**: `src/lib/i18n.ts` — all translations (EN, ES, FR, DE, IT, PT)
- **Layout**: `src/components/Layout.tsx` — fixed navbar, HierarchyNav, AnimatePresence page transitions, ContactFooter
- **HierarchyNav**: `src/components/HierarchyNav.tsx` — fixed left-side tree, xl+ only, Unicode line chars
- **Shared**: `src/components/shared.tsx` — Badge, FlagBadge, TechBadge, HoverRow, FadeUp, LanguageSwitcher, CommandPalette

### Pages (wouter routes)
- `/` — Overview (bio, status badges, flag badges)
- `/experience` — Work history at Apply Latam
- `/projects` — Enterprise RAG System, VoiceFlow, FocusPad
- `/skills` — Tech skills grid
- `/languages` — 6 languages with certification links

### Details
- Theme: CSS variables; dark default (`:root`), light via `.light` class
- Contact footer on every page with email copy, CV download, social links
- CV: place file at `artifacts/portfolio/public/cv.pdf`
- ⌘K command palette for keyboard navigation
