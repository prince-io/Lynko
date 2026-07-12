# components/home — Dashboard Home Tab

## Ownership

Owns the Home tab of the authenticated dashboard.

## Components

| Component | Purpose |
|-----------|---------|
| `HomeTab` | Main tab view — shows lynko link (copy/open), overview cards, live preview, quick actions |
| `LivePreview` | Phone mockup preview of the user's Lynko page |

## Quirks

- Overview cards show placeholder content ("Card Title", generic lorem ipsum) — not yet wired to real data.
- Quick Action cards in the active code have "Profile" as the card title but are labeled for different actions.

## Work Guidance

- Quick Action cards do not navigate yet — `setActiveTab` callbacks should be wired when ready
- `LivePreview` uses `onClick(e) => e.preventDefault()` on links (in-app preview only)

## Verification

No home-specific tests exist.
## Child DOX Index

None.
