# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Production build
npm run lint     # ESLint linting
npm run start    # Run production server
```

No test framework is configured in this project.

## Architecture

This is a **Next.js 15 personal portfolio and developer tools** site using the App Router.

**Tech stack**: Next.js 15, React 19, TypeScript 5, Tailwind CSS, shadcn/ui (Radix UI), Framer Motion, Mermaid.js

**Path alias**: `@/*` maps to the project root.

### App structure

- `/app` — App Router pages and layouts
  - `/app/har-viewer` — HAR file analyzer tool (self-contained feature)
  - `/app/json-viewer` — JSON visualizer tool (self-contained feature)
- `/components` — Shared components; `/components/ui` holds shadcn/ui primitives
- `/types` — TypeScript type definitions (HAR 1.2 format types)
- `/lib` — Shared utilities

### HAR Viewer

The most complex feature. Key files:
- `app/har-viewer/utils/harProcessing.ts` — Core parsing, filtering, and Mermaid diagram generation logic
- `app/har-viewer/components/` — `HarFileUpload`, `RequestList`, `RequestDetailModal`, `MermaidDiagram`
- Filter state is persisted to `localStorage`
- All processing is client-side (no backend)

The filter engine supports URL pattern exclusions, HTTP method filters, and smart default exclusions (ads, analytics, static assets). The diagram generator produces Mermaid sequence diagram syntax by extracting service participants from request URLs.

### UI Components

shadcn/ui components live in `/components/ui` and use the `new-york` style. Add new shadcn components via:
```bash
npx shadcn@latest add <component>
```
