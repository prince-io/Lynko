# components/lynkopage — Public Profile Page

## Ownership

Owns the user-facing public Lynko page rendered at `/{username}`.

## Components

| Component | Purpose |
|-----------|---------|
| `LynkoPage` | Presentational — renders the user's profile, links, and design customization |
| `LynkoPageWrapper` | "use client" wrapper — fetches data from `GET /api/public/[username]`, handles 404 redirect, renders LynkoPage |

## Local Contracts

- `LynkoPageWrapper` uses `useParams()` to read `username` (no prop needed from server component)
- Both use `"use client"` (hooks for data fetching and browser API)
- `LynkoPage` mirrors `AppearancePreview` and `LivePreview` — changes to the layout may need applying to all three
- `LynkoPage` now uses `LynkoLinkTracker` for each link (click tracking) and `LynkoPageWrapper` fires a `page_view` event on mount

## Verification

No lynkopage-specific tests exist.
## Child DOX Index

None.
