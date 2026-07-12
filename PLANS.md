## Plan: Analytics Feature Implementation

### Architecture Decision

**Single source of truth:** All analytics data lives in the Analytics collection. Click counts are derived via aggregation queries, not stored as denormalized counters. This avoids data drift and TTL-related inconsistencies.

---

### Completed ✅

| # | Task | File | Status |
|---|------|------|--------|
| 1 | Analytics Model | `models/Analytics.js` | Done |
| 2 | Lynko Model | `models/Lynko.js` | Unchanged (original) |
| 3 | Track API | `app/api/analytics/track/route.js` | Done |
| 4 | Overview API | `app/api/analytics/overview/route.js` | Done |
| 5 | Timeline API | `app/api/analytics/timeline/route.js` | Done |
| 6 | Distribution API | `app/api/analytics/distribution/route.js` | Done |
| 7 | ClickTimeline chart | `components/analytics/charts/ClickTimeline.js` | Done |
| 8 | ClickDistribution chart | `components/analytics/charts/ClickDistribution.js` | Done |
| 9 | AnalyticsWrapper | `components/analytics/AnalyticsWrapper.js` | Done |
| 10 | LynkoLinkTracker | `components/analytics/LynkoLinkTracker.js` | Done |
| 11 | page_view tracking | `components/lynkopage/LynkoPageWrapper.js` | Done |
| 12 | Update LynkoPage | `components/lynkopage/LynkoPage.js` | Done |
| 13 | Dashboard analytics page | — | Handled by tab integration |
| 14 | Dashboard navigation | — | Handled by tab integration |
| 15 | Install `recharts` | `package.json` | Done |

---

### Route Details

#### Track API (`POST /api/analytics/track`)

- No auth required (public endpoint)
- Request body: `{ eventType, userId, linkId?, metadata? }`
- Validation: eventType must be "link_click" or "page_view", userId required, linkId required for link_click
- Creates one Analytics document
- Returns 201 `{ success: true, id }`

#### Overview API (`GET /api/analytics/overview`)

- Auth required: `const { userId } = await auth()`
- Query params: `period` (7d/30d/90d, default 30d)
- Returns: `{ totalPageViews, totalLinkClicks, uniqueLinksClicked, topLinks[], period }`
- Uses `countDocuments` and aggregation pipeline

#### Timeline API (`GET /api/analytics/timeline`)

- Auth required
- Query params: `period` (24h/7d/30d/90d), `linkId` (ObjectId or "all"), `granularity` (auto or manual)
- Auto-granularity: 24h→hour, 7d→day, 30d→day, 90d→week
- Uses `$dateTrunc` for time bucketing
- Returns: `{ data: [{ date, clicks, views }], granularity, period }`
- Fills missing dates with zeros for continuous chart

#### Distribution API (`GET /api/analytics/distribution`)

- Auth required
- Query params: `period` (7d/30d/90d/all, default 30d)
- Groups link_click events by linkId
- `$lookup` to Lynko for title/url
- Calculates percentage of total
- Returns: `{ links: [{ linkId, title, url, clicks, percentage }], total }`

---

### Public Profile Integration

**How userId reaches the public page:**
- `app/api/public/[username]/route.js` already returns the user document with `clerkUserId`
- This value is the same as `userId` used in Analytics
- Pass `clerkUserId` from the fetched user data to tracker components

**Page view tracking:**
- Add a client component inside `app/[username]/page.js` that fires page_view on mount
- Uses `useEffect` to call POST `/api/analytics/track`

**Link click tracking:**
- `LynkoLinkTracker` wraps each link
- On click: fire track event, then redirect
- Extracts metadata from browser (referrer, screen width for device)

### Conventions to Follow

- API routes: `export async function GET/POST(request)` with `NextResponse`
- Auth: `import { auth } from '@clerk/nextjs/server'` → `const { userId } = await auth()`
- Client components: `"use client"` directive at top
- DaisyUI theme: emerald
- Models: singleton pattern `mongoose.models.X || mongoose.model("X", schema)`
- Always `await params` in App Router (Next.js 15+)
- No new env vars needed