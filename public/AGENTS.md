# public — Static Assets

## Ownership

Owns static files served at the root path.

## Files

| File | Purpose |
|------|---------|
| `default.jpg` | Fallback avatar when user has no `profilePic` set |
| `hero.jpg` | Landing page hero image |

## Work Guidance

- Avatar fallback path is `/default.jpg` — used in image `src` when `user.profilePic` is falsy
- Logo SVGs (`Logo.svg`, `Logo-mono.svg`) exist only as React components in `components/icons/` — not as static files

## Verification

No verification needed.
## Child DOX Index

None.
