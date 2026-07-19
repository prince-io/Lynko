# scripts — Development Scripts

## Purpose

Development-only scripts that run alongside `next dev` via `concurrently`.

## Ownership

Owns the cleanup-cron.js script.

## Local Contracts

### `cleanup-cron.js`

- Polls `GET /api/cron/cleanup-deleted` on localhost every 10s (first run after 5s delay)
- Uses `process.env.PORT || 3000` as the base URL
- Silently catches fetch errors (server not ready on first tick)
- Tied to `npm run dev` via `package.json` — runs concurrently with `next dev`

## Work Guidance

- This is a dev-only cron. In production, use the API route directly with an external cron service (e.g. cron-job.org).
- Grace period for deletion is controlled by `NEXT_PUBLIC_DELETION_GRACE_PERIOD_MS`.

## Verification

No script tests exist.
## Child DOX Index

None.
