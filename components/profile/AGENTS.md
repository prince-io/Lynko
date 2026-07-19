# components/profile — Dashboard Profile Tab

## Ownership

Owns the Profile tab of the authenticated dashboard.

## Components

| Component | Purpose |
|-----------|---------|
| `ProfileTab` | Main tab view — orchestrates state, fetches data, renders sections |
| `ProfilePhoto` | Avatar display, file input, upload button, cropped preview |
| `CropModal` | 1:1 crop modal with react-easy-crop, zoom slider, confirm/cancel |
| `PublicHandle` | Username input with availability check |
| `BioEditor` | Bio textarea editor |
| `DeleteAccount` | Two-step delete flow (type "DELETE" → warning confirmation with grace-period messaging) |

## Local Contracts

- `ProfilePhoto` receives `{ user, loading, handleFileSelect, handleUpload, fileInputRef, croppedBlob }` — renders avatar (or cropped preview with "New" badge when `croppedBlob` is set), file input, and upload button. Upload button disabled when no `croppedBlob`.
- `CropModal` receives `{ imageSrc, onConfirm(blob), onCancel }` — fixed overlay with react-easy-crop (1:1 aspect), zoom range slider, confirm/cancel buttons. Generates JPEG blob via canvas on confirm.
- `PublicHandle` receives `{ username, setUsername, error, mssg, loading, checkUsername }` — renders URL prefix, input, validation message, and check button
- `BioEditor` receives `{ bio, setBio }` — renders textarea for bio editing
- `DeleteAccount` receives `{ deleteLoading, deleteError, deleteMssg, handleDelete }` — two-step UI: DELETE text input, then warning confirmation with grace-period info via `getGraceMs()` from `@/lib/gracePeriod`

### Quirks

- Username check calls `GET /api/users/check-username?username=...` — route exists at `app/api/users/check-username/route.js`
- Avatar upload uses `multipart/form-data` POST to `/api/users`, uploads to Cloudinary
- Avatar flow: select file → crop modal (1:1) → confirm → cropped preview with "New" badge → upload button sends cropped blob

## Verification

No profile-specific tests exist.
## Child DOX Index

None.
