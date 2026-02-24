# 🔗 LinkVault

A secure full-stack link sharing platform built using **Next.js (App Router)** and **Supabase**.

---

## Live Features

### Authentication
- Email Signup & Login
- Session handling via Supabase
- Row-Level Security (RLS) enforced

### Link Management
- Create Public/Private Links
- Unique Slug-based routing (`/l/[slug]`)
- Secure user isolation

### Public Link Pages
- Public links accessible without login
- Private links return 404
- Dynamic routing using Next.js

### Click Tracking
- `click_count` increment on each visit
- Click history stored in `link_clicks` table

###  Metadata Fetching (Server-side)
- Page Title extraction
- Domain extraction
- Favicon extraction
- Implemented using Cheerio in API route

###  Analytics Dashboard
- Total Links
- Public vs Private breakdown
- Total Clicks
- Most clicked link

---

## Architecture

### Frontend
- Next.js 15 (App Router)
- Tailwind CSS
- Client + Server Components

### Backend
- Supabase (PostgreSQL)
- Row-Level Security (RLS)
- API Routes for metadata fetching

---

##  Security Design

- RLS ensures users access only their own links
- Public SELECT policy for public links
- Private links hidden via database-level enforcement
- Public UPDATE policy used only for click tracking

---

##  Database Schema

### `links`
- id (UUID)
- user_id (FK → auth.users)
- title
- description
- url
- slug
- visibility (public/private)
- click_count
- metadata_title
- domain
- favicon_url

### `link_clicks`
- id
- link_id (FK)
- clicked_at

---

##  Setup Instructions

1. Clone repository

2. Install dependencies:

```
npm install
```

3. Add environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

4. Run development server:

```
npm run dev
```

---

## Trade-offs

- Click tracking simplified using direct counter increment
- Basic metadata parsing (title + favicon only)
- Analytics implemented without chart library for simplicity

---

##  Future Improvements

- Slug customization
- Advanced analytics charts
- Tag-based filtering
- Rate limiting for public updates
- Edit/Delete link UI
- Deployment to Vercel

---

##  Project Summary

This project demonstrates:

- Secure full-stack architecture
- Proper RLS implementation
- Server-side data processing
- Dynamic routing
- Real-time analytics logic

Built as an assessment submission.