# components/home — Dashboard Home Tab

## Ownership

Owns the Home tab of the authenticated dashboard.

## Components

| Component | Purpose |
|-----------|---------|
| `HomeTab` | Main tab view — shows lynko link (copy/open), overview cards, live preview, quick actions |
| `LivePreview` | Phone mockup preview of the user's Lynko page |

## Quirks

- Overview cards fetch all-time data from `GET /api/analytics/overview?period=all` — total page views, total link clicks, and top link title.
- Quick Action cards navigate to the other four tabs (Profile, Links, Appearance, Analytics) with friendly descriptions.

## Work Guidance

- Quick Action cards use `setActiveTab` to navigate — each card maps to one of the four tab names
- `LivePreview` uses `onClick(e) => e.preventDefault()` on links (in-app preview only)

## Verification

No home-specific tests exist.
## Child DOX Index

None.
