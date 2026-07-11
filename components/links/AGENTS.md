# components/links — Dashboard Links Tab

## Ownership

Owns the Links tab of the authenticated dashboard.

## Components

| Component | Purpose |
|-----------|---------|
| `LinksTab` | Main tab view — drag-and-drop link list with add/reset/save-all controls |
| `LinkPair` | Individual link editor card with edit, save, delete, and drag handle |

## Local Contracts

- Uses `@dnd-kit` for drag-and-drop with vertical-axis constraint (x clamped to 0)
- `clientId` (UUID from `generateUUID()`) used for `@dnd-kit` sortable identity
- `_id` (Mongoose) used for server API calls (PUT/DELETE)
- `currentUser` is referenced but not used — `setUser` is passed as prop but never called

### Save All flow

1. Iterates each link: if it has `_id`, PUTs to `/api/links/[id]`; otherwise POSTs to `/api/links`
2. Then DELETE each `_id` in `deletedIds`
3. Finally re-fetches all links from the API to refresh state

## Work Guidance

- `LinkPair` propagates changes via `onSave(clientId, linkObject)` — it does not mutate links state directly
- `hasEmptyLinks` blocks "Save All" when any link has empty title or URL

## Verification

No links-specific tests exist.
## Child DOX Index

None.
