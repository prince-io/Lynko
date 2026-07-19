# app — Next.js Routes

## Ownership

Owns all route handlers, API endpoints, layout, and global styles.

## Local Contracts

- Next.js App Router with file-based routing
- API routes in `app/api/*` use `NextResponse` from `next/server`
- Server components use `auth()` from `@clerk/nextjs/server` for auth
- Client components use `useAuth()` from `@clerk/nextjs`
- 20 Google Fonts loaded in `layout.js` as CSS variables via `next/font`
- Global styles in `globals.css` — Tailwind v4 `@import "tailwindcss"` + DaisyUI plugin with all themes

### Route structure

| Path | Type | Notes |
|------|------|-------|
| `app/page.js` | Server | Landing page; "use client" inside redirects authed users to `/dashboard` |
| `app/layout.js` | Server | Root layout: ClerkProvider, fonts, DaisyUI data-theme="emerald" |
| `app/[username]/page.js` | Server | Public profile page; renders LynkoPageWrapper client component |
| `app/dashboard/layout.js` | Server | Creates User doc on first visit, auto-generates username; auto-cancels deletion if user logs in within grace period |
| `app/dashboard/page.js` | Server | Empty shell — UI rendered by DashboardWrapper |
| `app/404/` | - | 404 error page |
| `app/api/public/[username]/route.js` | GET | Fetches user + sorted links + design customization |
| `app/api/users/route.js` | GET/POST/PUT/DELETE | Profile read, avatar upload (multipart), profile update, account deletion (soft-delete) |
| `app/api/links/route.js` | GET/POST | List/create links |
| `app/api/links/[id]/route.js` | PUT/DELETE | Update/delete link (scoped to owning user) |
| `app/api/designs/route.js` | GET/POST | Read (upserts default), save design customization |
| `app/api/analytics/track/route.js` | POST | Public — record page_view or link_click event |
| `app/api/analytics/overview/route.js` | GET | Required — total views, clicks, top links summary |
| `app/api/analytics/timeline/route.js` | GET | Required — time-bucketed data for line chart |
| `app/api/analytics/distribution/route.js` | GET | Required — per-link click breakdown for pie chart |
| `app/api/cron/cleanup-deleted/route.js` | GET | Purges `User` docs with `isDeleted: true`. Dev: 10s poll. Production: 1h cron via external service (e.g. cron-job.org). |

### API quirks

- `GET /api/designs` uses `findOneAndUpdate` with `$setOnInsert` + `upsert: true` — always returns a document
- `PUT /api/users` validates username format (`/^[a-zA-Z0-9_]{3,12}$/`) and checks uniqueness (excluding self)
- `GET /api/users/check-username?username=...` exists at `app/api/users/check-username/route.js`. Validates format (`/^[a-zA-Z0-9_]{3,12}$/`) and checks uniqueness. Does not require auth.
- `POST /api/users` (avatar) uses `formData` with a `file` field, uploads to Cloudinary folder `lynko/avatars`
- `app/dashboard/page.js` returns empty fragment — all UI is in `DashboardWrapper` client component
- `app/dashboard/layout.js` auto-generates random usernames like `user_<random12chars>`
- Analytics API routes accept period params: `1h`, `1d`, `7d`, `30d`, `all`
- `DELETE /api/links/[id]` cascades — deletes associated link_click analytics records when a link is removed
- `DELETE /api/users` schedules deletion: sets `isDeleted: true` and `deletionScheduledAt: now`. No cascade occurs — data is removed later by the cron job after the grace period elapses.
- `GET /api/cron/cleanup-deleted` runs full cascade: finds users past grace period (configurable via `NEXT_PUBLIC_DELETION_GRACE_PERIOD_MS`), deletes Lynko/Design/Analytics/Cloudinary, then removes the User doc. Returns `{ cleaned: count }`.
- `app/dashboard/layout.js` auto-cancels deletion when a logged-in user is within the grace period (sets `isDeleted: false`, `deletionScheduledAt: null`). If past grace, redirects to `/`.

## Work Guidance

- Always `await params` in App Router route handlers and pages (Next.js 15+ async params API)
- `proxy.js` at root configures Clerk public routes for landing page, public API endpoints (public profile, check-username, analytics track), and the cron cleanup endpoint
- When adding env vars, update both `.env.local` and the README
- Design defaults in `api/designs/route.js:7-15` must match `models/Design.js:14-27`

## Verification

No app-specific tests exist.
## Child DOX Index

None.
