# components/shared — Reusable UI

## Purpose

Owns shared UI components used across multiple pages.

## Ownership

Owns the shared UI feature domain.

## Local Contracts

| Component | Used by | Purpose |
|-----------|---------|---------|
| `Navbar` | Landing page, Dashboard | Top navigation bar with tab switching in dashboard mode |
| `Footer` | Landing page, Dashboard | Page footer |
| `Menu` | Landing page, Dashboard | Sidebar navigation menu |
| `ThemeButton` | Landing page | Theme toggle between light (emerald) and dark (night) |
| `GSAPRegistry` | Root layout (`app/layout.js`) | GSAP animation registration |

## Work Guidance

None — these components are stable and rarely change.

## Verification

No shared-specific tests exist.
## Child DOX Index

None.
