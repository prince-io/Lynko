# components/dashboard — Dashboard Shell

## Ownership

Owns the two dashboard infrastructure components that manage layout and tab routing.

## Components

| Component | Purpose |
|-----------|---------|
| `DashboardWrapper` | Client component managing `activeTab` state (Home/Profile/Links/Appearance/Analytics), renders Navbar + DashboardContent + Footer |
| `DashboardContent` | Routes `activeTab` to the corresponding feature component in `home/`, `profile/`, `links/`, `appearance/`, `analytics/` |

## Local Contracts

- These are the only two files left in `dashboard/` — all tab view components have moved to their feature folders
- `DashboardWrapper` receives `user` as a prop from `app/dashboard/layout.js`
- `DashboardContent` passes `user`, `setUser`, and `setActiveTab` to each tab component

## Verification

No dashboard-specific tests exist.
## Child DOX Index

None.
