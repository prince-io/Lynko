# components/analytics/charts — Chart Components

## Ownership

Owns reusable chart and stat card components used by AnalyticsWrapper.

## Components

| Component | Purpose |
|-----------|---------|
| `PageViewsCard` | Self-contained card — period selector + fetches overview API, displays total page views |
| `ClickDistribution` | Self-contained card — fetches distribution API, donut chart with center total + interactive hover highlight; pie takes 2/3 width, legend 1/3 on desktop |
| `LinkMiniChart` | Self-contained per-link card — period selector + fetches timeline API, renders mini line chart (clicks only) |

## Local Contracts

- Each component manages its own period state and data fetching independently
- `LinkMiniChart` accepts `{ linkId, title }` props
- All cards use `bg-base-100 rounded-xl p-4` wrapper
- Period buttons: `btn btn-xs md:btn-sm` — active `btn-primary`, inactive `btn-outline btn-primary`

## Verification

No chart-specific tests exist.
## Child DOX Index

None.
