# lib — Integrations

## Ownership

Owns shared utility and integration modules.

## Local Contracts

### `mongodb.js`
- Caches MongoDB connection in `global.mongoose` to avoid reconnect in serverless
- Only reconnects when `mongoose.connection.readyState !== 1`
- Depends on `MONGODB_URI` env var

### `cloudinary.js`
- Configures the `cloudinary` SDK v2 singleton with env vars: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- Uploads used by `POST /api/users` (avatar images)

### `designOptions.js`
- Constants consumed by the Appearance dashboard tab and preview components
- Exports: `THEMES` (35 DaisyUI theme names), `FONT` (10 font objects), `SIZE` (6 scale levels), `RADIUS` (6 values), `BORDER` (5 style objects), `AVATAR` (7 shapes), `BG` (10 background options), `BTN` (4 button styles), `BTNRAD` (2 button shapes)
- Font values must match the CSS variable names loaded in `app/layout.js` (e.g. `"inter"` → `--font-inter`)

### `gracePeriod.js`
- Exports `getGraceMs()` which reads `NEXT_PUBLIC_DELETION_GRACE_PERIOD_MS` env var (fallback 12h)
- Used by cron cleanup and dashboard layout (client-side DeleteAccount reads `NEXT_PUBLIC_` var directly)

### `uuid.js`
- Fallback UUID v4 generator using `crypto.randomUUID` when available, manual string template otherwise
- Used by dashboard Links/Appearance tabs to generate `clientId` for `@dnd-kit` sortable identity

## Work Guidance

- `designOptions.js` values are tightly coupled to the `Design.customization` shape and `app/layout.js` font variables
- Adding a new font requires updating three places: `lib/designOptions.js`, `app/layout.js` (next/font import + CSS variable), `app/globals.css` (font utility class)

## Verification

No lib-specific tests exist.
## Child DOX Index

None.
