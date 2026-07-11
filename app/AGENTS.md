# app — Next.js Routes

## Ownership

Owns all route handlers, API endpoints, layout, and global styles.

## Local Contracts

- Next.js App Router with file-based routing
- API routes in `app/api/*` use `NextResponse` from `next/server`
- Server components use `auth()` from `@clerk/nextjs/server` for auth
- Client components use `useAuth()` from `@clerk/nextjs`
- 10 Google Fonts loaded in `layout.js` as CSS variables via `next/font`
- Global styles in `globals.css` — Tailwind v4 `@import "tailwindcss"` + DaisyUI plugin with all themes

### Route structure

| Path | Type | Notes |
|------|------|-------|
| `app/page.js` | Server | Landing page; "use client" inside redirects authed users to `/dashboard` |
| `app/layout.js` | Server | Root layout: ClerkProvider, fonts, DaisyUI data-theme="emerald" |
| `app/[username]/page.js` | Server | Public profile page; renders PreviewWrapper client component |
| `app/dashboard/layout.js` | Server | Creates User doc on first visit, auto-generates username |
| `app/dashboard/page.js` | Server | Empty shell — UI rendered by DashboardWrapper |
| `app/404/` | - | 404 error page |
| `app/api/public/[username]/route.js` | GET | Fetches user + sorted links + design customization |
| `app/api/users/route.js` | GET/POST/PUT | Profile read, avatar upload (multipart), profile update |
| `app/api/links/route.js` | GET/POST | List/create links |
| `app/api/links/[id]/route.js` | PUT/DELETE | Update/delete link (scoped to owning user) |
| `app/api/designs/route.js` | GET/POST | Read (upserts default), save design customization |

### API quirks

- `GET /api/designs` uses `findOneAndUpdate` with `$setOnInsert` + `upsert: true` — always returns a document
- `PUT /api/users` does NOT check username uniqueness — potential duplicate issue
- `GET /api/users/check-username?username=...` exists at `app/api/users/check-username/route.js`. Validates alphanumeric (`/^[a-zA-Z0-9]+$/`) and checks uniqueness. Does not require auth.
- `POST /api/users` (avatar) uses `formData` with a `file` field, uploads to Cloudinary folder `lynko/avatars`
- `app/dashboard/page.js` returns empty fragment — all UI is in `DashboardWrapper` client component
- `app/dashboard/layout.js` auto-generates random usernames like `user_<random12chars>`

## Work Guidance

- Always `await params` in App Router route handlers and pages (Next.js 15+ async params API)
- `proxy.js` at root is named wrong — a working middleware would need to be `middleware.js`
- When adding env vars, update both `.env.local` and the README
- Design defaults in `api/designs/route.js:6-16` must match `models/Design.js:13-27`

## Verification

No app-specific tests exist.
## Child DOX Index

None.
