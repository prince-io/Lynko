# components — React Components

## Ownership

Owns all React components organized by feature folder.

## Local Contracts

- All components are `"use client"` where they use hooks or browser APIs
- Many components receive `user`, `links`, and `design` as props from server-side parents
- Design props reference DaisyUI class names via objects from `lib/designOptions.js`

### Folder layout

| Folder | Contents |
|--------|----------|
| `landing/` | Landing page sections (Hero, How, About, Faq, Card) |
| `lynkopage/` | Public Lynko profile page (LynkoPage, LynkoPageWrapper) |
| `dashboard/` | Dashboard shell (DashboardWrapper, DashboardContent) |
| `home/` | Dashboard Home tab (HomeTab, LivePreview) |
| `profile/` | Dashboard Profile tab (ProfileTab) |
| `links/` | Dashboard Links tab (LinksTab, LinkPair) |
| `appearance/` | Dashboard Appearance tab (AppearanceTab, AppearancePreview, 9 customization pickers) |
| `analytics/` | Analytics tab (AnalyticsTab, AnalyticsWrapper, charts/) |
| `shared/` | Reusable UI (Navbar, Footer, Menu, ThemeButton, GSAPRegistry) |
| `icons/` | Importable SVG icon components, each accepting `{ w, h, className }` props |

### Dashboard tab quirks

All dashboard tab files have had their stale commented-out old versions removed. The files are now clean with only active code.

### Preview component similarities

`LynkoPage`, `LivePreview`, and `AppearancePreview` all render near-identical layouts (logo, avatar, username, bio, link buttons, CTA). Differences:
- `LynkoPage` has working link URLs and a copy-to-clipboard share button
- `LivePreview` and `AppearancePreview` use `onClick(e) => e.preventDefault()` on links (in-app preview only)
- `LivePreview` is wrapped in a phone mockup (`mockup-phone`)

## Work Guidance

- The three preview-like components (`LynkoPage`, `LivePreview`, `AppearancePreview`) are highly repetitive — changes to the layout likely need to be applied across all three
- Dashboard tab files previously had commented-out old versions at the top — those have been cleaned up, files now contain only active code
- Appearance customization children in `appearance/` each receive a single value + onChange callback

## Verification

No component-specific tests exist.
## Child DOX Index

| Path | Scope |
|------|-------|
| `components/landing/` | Landing page sections |
| `components/lynkopage/` | Public Lynko profile page |
| `components/dashboard/` | Dashboard shell (wrapper + content router) |
| `components/home/` | Dashboard Home tab (HomeTab + LivePreview) |
| `components/profile/` | Dashboard Profile tab (ProfileTab) |
| `components/links/` | Dashboard Links tab (LinksTab + LinkPair) |
| `components/appearance/` | Appearance tab (AppearanceTab + AppearancePreview + 9 pickers) |
| `components/analytics/` | Analytics tab (AnalyticsTab, AnalyticsWrapper, charts/) |
| `components/shared/` | Reusable UI utilities |
| `components/icons/` | Reusable SVG icon components (26 icons, each accepts `{ w, h, className }`) |
