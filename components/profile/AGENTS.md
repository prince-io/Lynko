# components/profile — Dashboard Profile Tab

## Ownership

Owns the Profile tab of the authenticated dashboard.

## Components

| Component | Purpose |
|-----------|---------|
| `ProfileTab` | Main tab view — orchestrates state, fetches data, renders sections |
| `ProfilePhoto` | Avatar display, file input, upload button |
| `PublicHandle` | Username input with availability check |
| `BioEditor` | Bio textarea editor |

## Contracts

- `ProfilePhoto` receives `{ user, loading, handleFileSelect, handleUpload, fileInputRef }` — renders avatar, file input, and upload button
- `PublicHandle` receives `{ username, setUsername, error, mssg, loading, checkUsername }` — renders URL prefix, input, validation message, and check button
- `BioEditor` receives `{ bio, setBio }` — renders textarea for bio editing

## Quirks

- Username check calls `GET /api/users/check-username?username=...` — route exists at `app/api/users/check-username/route.js`
- Avatar upload uses `multipart/form-data` POST to `/api/users`, uploads to Cloudinary

## Verification

No profile-specific tests exist.
## Child DOX Index

None.
