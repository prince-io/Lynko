# Lynko

Lynko is a link-in-bio web application that lets users create a simple, customizable landing page containing all their important links. Each user gets a single public page (their "Lynko") that lists links, a short bio, and appearance customizations.

This repository is a production-ready Next.js application using the App Router, Clerk for authentication, MongoDB (Mongoose) for persistence, and Cloudinary for image uploads.

## Key Features

- Per-user public profile pages (e.g., `https://lynko-fun.vercel.app/{username}`)
- Authenticated dashboard to manage profile, links, and appearance
- Avatar uploads stored in Cloudinary
- Per-user design customizations (theme, fonts, button styles)
- Drag-and-drop link ordering (DND kit included)

## Tech Stack

- Next.js (App Router)
- React 19
- Clerk for authentication
- MongoDB via Mongoose
- Cloudinary for media
- Tailwind CSS + DaisyUI for styling
- `@dnd-kit` for drag-and-drop interactions

## Architecture Overview

- `app/` — Next.js routes and API route handlers (App Router). Public UI and dashboard pages live here.
- `app/api/*` — Server API endpoints used by the dashboard and public pages (users, links, designs, public profile)
- `components/` — Reusable React components and dashboard UI pieces
- `models/` — Mongoose schemas for `User`, `Lynko` (links), and `Design`
- `lib/` — Integration helpers (`mongodb.js`, `cloudinary.js`, `uuid.js`)

## Environment Variables

Create a `.env.local` file in the project root containing the following variables:

```
MONGODB_URI=...
CLERK_SECRET_KEY=...

NEXT_PUBLIC_APP_URL=...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLOUDINARY_URL=...

NEXT_PUBLIC_DELETION_GRACE_PERIOD_MS=43200000
```

## Local Development

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser. Sign up with Clerk to create a user, then visit the dashboard to add links and customize your Lynko.

## API Endpoints (summary)

- `GET /api/public/[username]` — Public API to fetch a user's profile, links, and design. Used to render public Lynko pages.
- `GET/POST /api/users` — Fetch current authenticated user's profile, upload avatar (POST via multipart/form-data), and update profile (PUT).
- `GET/POST /api/links` — List and create links for the authenticated user.
- `PUT/DELETE /api/links/[id]` — Update or delete a specific link (authenticated).
- `GET/POST /api/designs` — Read and update per-user design customizations.

## Important Implementation Notes

- The app uses `clerkUserId` to associate Clerk users with application `User` and `Design` documents. `Lynko.userId` stores the Clerk user id for each link.
- `lib/mongodb.js` caches the mongoose connection to avoid repeated connections in serverless environments.
- Avatar uploads use multipart form data and are uploaded to Cloudinary; the returned `secure_url` is stored on the `User.profilePic` field.
- UI components expect `design` to contain class names and sizing configuration; make sure server defaults match client expectations.

## Folder Snapshot

```
app/
	api/
		public/[username]/route.js
		users/route.js
		links/route.js
		links/[id]/route.js
		designs/route.js
	page.js
	layout.js
components/
models/
lib/
public/
```

## Deployment

This project is compatible with Vercel and other Node.js hosting platforms. Ensure environment variables are configured in your deployment target. Vercel supports Next.js App Router features out of the box.

## One Last Thing

Thanks for checking out Lynko 💙

If you found this project helpful, feel free to give it a star, share feedback, or contribute to make it even better.  
Happy building 🚀

Made with curiosity, creativity, and lots of code ✨
