# components/home — Dashboard Home Tab

## Ownership

Owns the Home tab of the authenticated dashboard.

## Components

| Component | Purpose |
|-----------|---------|
| `HomeTab` | Main tab view — orchestrates state, fetches data, renders sections |
| `LynkoLinkCard` | Lynko link card — avatar, URL, copy/open buttons |
| `OverviewCards` | Overview section — page views, link clicks, top link stat cards |
| `QuickActions` | Quick actions grid — 4 cards navigating to other tabs |
| `LivePreview` | Phone mockup preview of the user's Lynko page |

## Local Contracts

- `LynkoLinkCard` receives `{ user, lynko, handleCopy }` — renders avatar, link URL, and copy/open buttons
- `OverviewCards` receives `{ overview }` — renders three stat cards from analytics data
- `QuickActions` receives `{ setActiveTab }` — renders 4 action cards navigating to Profile, Links, Appearance, Analytics

## Work Guidance

- Overview cards fetch all-time data from `GET /api/analytics/overview?period=all` — total page views, total link clicks, and top link title.
- Quick Action cards use `setActiveTab` to navigate — each card maps to one of the four tab names
- `LivePreview` uses `onClick(e) => e.preventDefault()` on links (in-app preview only)

## Verification

No home-specific tests exist.
## Child DOX Index

None.
