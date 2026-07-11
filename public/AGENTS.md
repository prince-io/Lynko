# public — Static Assets

## Ownership

Owns static files served at the root path.

## Files

| File | Purpose |
|------|---------|
| `logo.svg` | App logo, referenced by Preview/LivePreview/AppearancePreview components |
| `default.jpg` | Fallback avatar when user has no `profilePic` set |
| `hero.jpg` | Landing page hero image |

## Work Guidance

- Avatar fallback path is `/default.jpg` — used in image `src` when `user.profilePic` is falsy
- Logo is referenced as `/logo.svg` with explicit width/height in next/Image components

## Verification

No verification needed.
## Child DOX Index

None.
