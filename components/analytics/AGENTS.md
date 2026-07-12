# components/analytics — Dashboard Analytics Tab

## Ownership

Owns the Analytics tab of the authenticated dashboard.

## Components

| Component | Purpose |
|-----------|---------|
| `AnalyticsTab` | Tab view — renders heading + divider + AnalyticsWrapper |
| `AnalyticsWrapper` | Data fetching, period filter, overview cards, chart layout |
| `LynkoLinkTracker` | Wraps public profile links — intercepts clicks, fires track event, then redirects |
| `charts/PageViewsCard` | Self-contained card — page views count with period selector |
| `charts/ClickDistribution` | Self-contained card — pie chart with period selector |
| `charts/LinkMiniChart` | Self-contained per-link card — mini line chart with period selector |

## Work Guidance

- `AnalyticsTab` delegates to `AnalyticsWrapper` for all data fetching and chart rendering
- Period filter state lives in `AnalyticsWrapper`
- `LynkoLinkTracker` is used by `LynkoPage` on the public profile — not by the dashboard

## Verification

No analytics-specific tests exist.
## Child DOX Index

| Path | Scope |
|------|-------|
| `components/analytics/charts/` | Recharts chart components (ClickTimeline, ClickDistribution) |
