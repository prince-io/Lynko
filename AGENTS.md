# DOX framework

- DOX is highly performant AGENTS.md hierarchy installed here
- Agent must follow DOX instructions across any edits

## Core Contract

- AGENTS.md files are binding work contracts for their subtrees
- Work products, source materials, instructions, records, assets, and durable docs must stay understandable from the nearest applicable AGENTS.md plus every parent AGENTS.md above it

## Read Before Editing

1. Read the root AGENTS.md
2. Identify every file or folder you expect to touch
3. Walk from the repository root to each target path
4. Read every AGENTS.md found along each route
5. If a parent AGENTS.md lists a child AGENTS.md whose scope contains the path, read that child and continue from there
6. Use the nearest AGENTS.md as the local contract and parent docs for repo-wide rules
7. If docs conflict, the closer doc controls local work details, but no child doc may weaken DOX

Do not rely on memory. Re-read the applicable DOX chain in the current session before editing.

## Update After Editing

Every meaningful change requires a DOX pass before the task is done.

Update the closest owning AGENTS.md when a change affects:

- purpose, scope, ownership, or responsibilities
- durable structure, contracts, workflows, or operating rules
- required inputs, outputs, permissions, constraints, side effects, or artifacts
- user preferences about behavior, communication, process, organization, or quality
- AGENTS.md creation, deletion, move, rename, or index contents

Update parent docs when parent-level structure, ownership, workflow, or child index changes. Update child docs when parent changes alter local rules. Remove stale or contradictory text immediately. Small edits that do not change behavior or contracts may leave docs unchanged, but the DOX pass still must happen.

## Hierarchy

- Root AGENTS.md is the DOX rail: project-wide instructions, global preferences, durable workflow rules, and the top-level Child DOX Index
- Child AGENTS.md files own domain-specific instructions and their own Child DOX Index
- Each parent explains what its direct children cover and what stays owned by the parent
- The closer a doc is to the work, the more specific and practical it must be

## Child Doc Shape

- Create a child AGENTS.md when a folder becomes a durable boundary with its own purpose, rules, responsibilities, workflow, materials, or quality standards
- Work Guidance must reflect the current standards of the project or user instructions; if there are no specific standards or instructions yet, leave it empty
- Verification must reflect an existing check; if no verification framework exists yet, leave it empty and update it when one exists

Default section order:
- Purpose
- Ownership
- Local Contracts
- Work Guidance
- Verification
- Child DOX Index

## Style

- Keep docs concise, current, and operational
- Document stable contracts, not diary entries
- Put broad rules in parent docs and concrete details in child docs
- Prefer direct bullets with explicit names
- Do not duplicate rules across many files unless each scope needs a local version
- Delete stale notes instead of explaining history
- Trim obvious statements, repeated rules, misplaced detail, and warnings for risks that no longer exist

## Closeout

1. Re-check changed paths against the DOX chain
2. Update nearest owning docs and any affected parents or children
3. Refresh every affected Child DOX Index
4. Remove stale or contradictory text
5. Run existing verification when relevant
6. Report any docs intentionally left unchanged and why

---

# Lynko

## Purpose

Link-in-bio web app. Users create a single public page (`/{username}`) with links, bio, and appearance customizations.

## Ownership

Root owns all directories not listed in the Child DOX Index below.

## Local Contracts

- Plain JS (no TypeScript). `@/*` path alias maps to project root (`jsconfig.json`).
- Next.js App Router, React 19. Clerk v6 for auth, Mongoose for MongoDB, Cloudinary for avatars.
- Tailwind CSS v4 + DaisyUI (all themes enabled). 10 Google Fonts loaded as CSS variables via `next/font`.
- No test files, no CI, no pre-commit hooks, no formatter config.

## Work Guidance

### User preference

Do not run `npm run build` unless the user explicitly asks.

### Commands

```bash
npm run dev     # http://localhost:3000
npm run build   # production build (run before committing)
npm run lint    # ESLint (Next.js core-web-vitals config)
npm run start   # production server
```

No test command exists.

### Models convention

| Model | Key field | Links to |
|-------|-----------|----------|
| `User` | `clerkUserId` | Clerk user ID (unique, indexed) |
| `Lynko` | `userId` | Clerk user ID (same value, different field name) |
| `Design` | `clerkUserId` | Clerk user ID (unique, indexed) |

`User` and `Design` use `clerkUserId`; `Lynko` uses `userId` — do not confuse them.

### Routes

| Route | Auth | Notes |
|-------|------|-------|
| `/` | public | Landing page; redirects authed users to `/dashboard` |
| `/[username]` | public | Client component calls `GET /api/public/[username]`, 404 → `/404` |
| `/dashboard` | required | Server layout creates User doc on first visit (auto-generates username) |
| `/dashboard/*` | required | Four client-side tabs: Home, Profile, Links, Appearance |

### API

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/public/[username]` | GET | No | Fetch user + links + design |
| `/api/users` | GET | Yes | Current user profile |
| `/api/users` | POST | Yes | Avatar upload (multipart/form-data → Cloudinary) |
| `/api/users` | PUT | Yes | Update username/bio |
| `/api/links` | GET | Yes | List user's links (sorted by order) |
| `/api/links` | POST | Yes | Create link |
| `/api/links/[id]` | PUT | Yes | Update link |
| `/api/links/[id]` | DELETE | Yes | Delete link |
| `/api/designs` | GET | Yes | Get design (upserts default if missing) |
| `/api/designs` | POST | Yes | Save design customization |

### Dashboard quirks

- **Links tab**: Uses `@dnd-kit` with vertical-axis drag (x clamped to 0). `clientId` (UUID) for sortable identity, `_id` for server ops. "Save All" iterates: PUT existing links, POST new ones, DELETE removed.
- **Appearance tab**: File has old commented-out version at top (~520 lines) and active version below (~1050 lines). Only edit the bottom `export default`.
- **Profile tab**: `checkUsername()` calls `GET /api/users/check-username?username=...` — route exists at `app/api/users/check-username/route.js`. Validates alphanumeric and checks uniqueness.
- **Home tab**: Quick Action cards show placeholder content ("Card Title", generic lorem ipsum) — not yet wired to real data.

### Design defaults

Default values are duplicated in `models/Design.js:13-27` and `api/designs/route.js:6-16`. Keep in sync when changing defaults.

### Middleware

`proxy.js` at root calls `clerkMiddleware({ publicRoutes: ["/", "/:username"] })` but is **not** auto-discovered — needs to be named `middleware.js`. App still works because `<ClerkProvider>` handles client-side routing.

## Verification

No tests exist. No verification framework. Run `npm run build` and `npm run lint` before committing.

## Child DOX Index

| Path | Scope |
|------|-------|
| `app/` | Next.js routes, API handlers, layout, global styles |
| `components/` | React components organized by feature folder (see `components/AGENTS.md` for full breakdown) |
| `components/landing/` | Landing page sections (Hero, How, About, Faq, Card) |
| `components/lynkopage/` | Public Lynko profile page (LynkoPage, LynkoPageWrapper) |
| `components/dashboard/` | Dashboard shell (DashboardWrapper, DashboardContent) |
| `components/home/` | Dashboard Home tab (HomeTab + LivePreview) |
| `components/profile/` | Dashboard Profile tab (ProfileTab) |
| `components/links/` | Dashboard Links tab (LinksTab + LinkPair) |
| `components/appearance/` | Appearance tab (AppearanceTab + AppearancePreview + 9 pickers) |
| `components/shared/` | Reusable UI (Navbar, Footer, Menu, ThemeButton, GSAPRegistry) |
| `models/` | Mongoose schemas, field conventions, the clerkUserId/userId naming split |
| `lib/` | Integrations: MongoDB connection caching, Cloudinary config, design option constants |
| `public/` | Static assets (default avatar, hero image) |
