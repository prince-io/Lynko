# components/profile — Dashboard Profile Tab

## Ownership

Owns the Profile tab of the authenticated dashboard.

## Components

| Component | Purpose |
|-----------|---------|
| `ProfileTab` | Main tab view — avatar upload, username editing with availability check, bio editing |

## Quirks

- Username check calls `GET /api/users/check-username?username=...` — route exists at `app/api/users/check-username/route.js`
- Avatar upload uses `multipart/form-data` POST to `/api/users`, uploads to Cloudinary

## Verification

No profile-specific tests exist.
## Child DOX Index

None.
