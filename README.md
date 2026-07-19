# Lynko

Lynko is a link-in-bio web application that lets users create a simple, customizable landing page containing all their important links. Each user gets a single public page (their "Lynko") that lists links, a short bio, and appearance customizations — share one link, not a dozen.

Built with Next.js 16 App Router, React 19, Clerk for auth, MongoDB (Mongoose), Cloudinary for avatars, and Tailwind CSS v4 + DaisyUI for that polished look.

## Features

- **Your own page** — A public profile at `/your-name` with all your links in one place
- **Full customization** — Themes, fonts, button styles, corner radius, and more — make it yours
- **Dashboard** — Manage your profile, links, and appearance from one clean dashboard
- **Drag & drop** — Reorder your links effortlessly with `@dnd-kit`
- **Analytics** — See how many people visit your page and click your links
- **Avatars** — Upload your photo with a handy crop tool, stored on Cloudinary
- **Account deletion** — Soft-delete with a grace period (12h by default) so you can change your mind

## Tech Stack

- Next.js 16 (App Router) + React 19
- Clerk v6 for authentication
- MongoDB via Mongoose
- Cloudinary for image uploads
- Tailwind CSS v4 + DaisyUI (all themes enabled)
- 20 Google Fonts loaded via `next/font`
- `@dnd-kit` for drag-and-drop
- GSAP + ScrollTrigger for landing page animations
- Plain JavaScript (no TypeScript). `@/*` path alias maps to project root.

## Commands

```bash
npm run dev     # development server
npm run build   # production build
npm run lint    # ESLint (Next.js core-web-vitals config)
npm run start   # production server
```

No test command yet. The dev cron (`cleanup-cron.js`) runs alongside `npm run dev` to handle cleanup.

## Environment Variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=...
CLERK_SECRET_KEY=...

NEXT_PUBLIC_APP_URL=...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
NEXT_PUBLIC_DELETION_GRACE_PERIOD_MS=...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLOUDINARY_URL=...
```

## Project Structure

```
app/                          # Routes, API, layout, styles
├── page.js                   # Landing page — redirects logged-in users to /dashboard
├── layout.js                 # Root layout with ClerkProvider, fonts, DaisyUI
├── [username]/page.js        # Public profile page
├── dashboard/                # Dashboard layout + shell
├── 404/                      # Custom error page
└── api/                      # All API routes
    ├── public/[username]/    # GET — public profile data
    ├── users/                # GET/POST/PUT/DELETE — profile & avatar
    ├── users/check-username/ # GET — username availability
    ├── links/                # GET/POST — list & create links
    ├── links/[id]/           # PUT/DELETE — update & delete links
    ├── designs/              # GET/POST — read & save design
    ├── analytics/            # Track, overview, timeline, distribution
    └── cron/cleanup-deleted/ # Purge users past grace period

components/                   # React components by feature
├── landing/                  # Hero, How, About, Faq, Card
├── lynkopage/                # Public profile page
├── dashboard/                # Dashboard shell
├── home/                     # Home tab — overview, quick actions, preview
├── profile/                  # Profile tab — photo, username, bio, delete
├── links/                    # Links tab — drag-and-drop editor
├── appearance/               # Appearance tab — 9 customization pickers
├── analytics/                # Analytics tab — charts & data
├── icons/                    # 26 reusable SVG icons
└── shared/                   # Navbar, Footer, Menu, Loader, etc.

models/                       # Mongoose schemas
├── User.js                   # clerkUserId, username, bio, profilePic, isDeleted
├── Lynko.js                  # Links — userId, title, url, order, isActive
├── Design.js                 # Customization — theme, fonts, sizes, etc.
└── Analytics.js              # Events — page_view / link_click

lib/                          # Utilities & integrations
├── mongodb.js                # Connection caching
├── cloudinary.js             # Cloudinary config
├── designOptions.js          # Appearance constants
├── gracePeriod.js            # Deletion grace period helper
└── uuid.js                   # UUID generator

scripts/                      # Dev tools
└── cleanup-cron.js           # Dev-only cron (runs with npm run dev)

public/                       # Static assets
```

## Routes

| Route          | Auth     | What it does                                               |
| -------------- | -------- | ---------------------------------------------------------- |
| `/`            | Public   | Landing page — authed users get redirected to `/dashboard` |
| `/[username]`  | Public   | The Lynko page — 404s gracefully to `/404`                 |
| `/dashboard`   | Required | Dashboard home — creates your account on first visit       |
| `/dashboard/*` | Required | Five tabs: Home, Profile, Links, Appearance, Analytics     |

## A Note on Model Fields

There's a subtle naming split you should know about:

| Model    | Key field     | What it stores                           |
| -------- | ------------- | ---------------------------------------- |
| `User`   | `clerkUserId` | Clerk user ID (unique, indexed)          |
| `Lynko`  | `userId`      | Same Clerk user ID, different field name |
| `Design` | `clerkUserId` | Clerk user ID (unique, indexed)          |

`User` and `Design` use `clerkUserId` — `Lynko` uses `userId`. They hold the same value, just different names. Don't let it trip you up.

## API Endpoints

| Endpoint                      | Method | Auth | What it does                                           |
| ----------------------------- | ------ | ---- | ------------------------------------------------------ |
| `/api/public/[username]`      | GET    | No   | Fetch user + links + design for the public profile     |
| `/api/users`                  | GET    | Yes  | Get your profile                                       |
| `/api/users`                  | POST   | Yes  | Upload avatar (multipart → Cloudinary)                 |
| `/api/users`                  | PUT    | Yes  | Update username or bio                                 |
| `/api/users`                  | DELETE | Yes  | Schedule account deletion (soft-delete with grace)     |
| `/api/users/check-username`   | GET    | No   | Check if a username is available                       |
| `/api/links`                  | GET    | Yes  | List your links (sorted)                               |
| `/api/links`                  | POST   | Yes  | Add a new link                                         |
| `/api/links/[id]`             | PUT    | Yes  | Update a link                                          |
| `/api/links/[id]`             | DELETE | Yes  | Delete a link (also removes its analytics)             |
| `/api/designs`                | GET    | Yes  | Get your design settings (creates defaults if missing) |
| `/api/designs`                | POST   | Yes  | Save design changes                                    |
| `/api/analytics/track`        | POST   | No   | Record a page view or link click                       |
| `/api/analytics/overview`     | GET    | Yes  | All-time stats: views, clicks, top link                |
| `/api/analytics/timeline`     | GET    | Yes  | Chart data by period (`1h`/`1d`/`7d`/`30d`/`all`)      |
| `/api/analytics/distribution` | GET    | Yes  | Per-link click breakdown                               |
| `/api/cron/cleanup-deleted`   | GET    | No   | Purge users past their grace period                    |

## Dashboard Tabs

- **Home** — Stats at a glance (page views, clicks, top link), quick navigation to other tabs, and a live phone preview of your page.
- **Profile** — Upload your avatar (with a handy 1:1 crop tool), set your username (with availability check), write your bio, or delete your account (two-step confirmation with a grace period to change your mind).
- **Links** — Drag and drop to reorder, add new ones, edit existing ones. "Save All" handles everything — creates new links, updates existing ones, and removes deleted ones. Validation keeps titles under 100 chars and URLs under 2048.
- **Appearance** — Pick a theme from 35 DaisyUI options, choose a font from 20 Google Fonts, tweak text scale, corner radius, border style, avatar shape, button style, button shape, and background. See changes instantly in the phone preview.
- **Analytics** — Track your page views over time, see which links get the most clicks, and view per-link performance. Filter by the last hour, day, week, month, or all time.

## A Few Things to Keep in Mind

- **Design defaults are duplicated** — the default values live in both `models/Design.js` and `app/api/designs/route.js`. If you change one, change the other.
- **Analytics privacy** — No personal data is stored in analytics events. Only referrer URL, country, and device type. Events auto-expire after 90 days.
- **Account deletion flow** — When you request deletion, your account is soft-deleted with a grace period. Visit the dashboard during that window and it's automatically cancelled. After the grace period, the cron job permanently removes everything.
- **Preview components** — `LynkoPage`, `LivePreview`, and `AppearancePreview` all look similar. If you change the layout of one, you'll probably want to update the other two.

## Deployment

Works great on Vercel and any Node.js hosting. Just make sure all your environment variables are set in your deployment platform.

## One Last Thing

Thanks for checking out Lynko 💙

If you found this project helpful, feel free to give it a star, share feedback, or contribute to make it even better.  
Happy building 🚀

Made with curiosity, creativity, and lots of code ✨
