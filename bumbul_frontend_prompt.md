# Bumbul Frontend — Comprehensive Build Prompt

## Project Overview

**Bumbul** is an Iranian dating/social web application. The backend is built with **Django + Django REST Framework**, using session-based auth (with Telegram OTP for registration) and DRF serializers for API endpoints. The frontend must connect to this existing backend via its REST API and session cookies.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Public / SEO pages | **Next.js 15** (App Router, SSR/SSG) |
| Private / App pages | **React 18** (SPA, no SSR needed) |
| Styling | **Tailwind CSS v3** |
| Real-time chat | **WebSocket** (native browser API or `socket.io-client`) |
| State management | **Zustand** (lightweight, no Redux) |
| Forms | **React Hook Form + Zod** |
| HTTP client | **Axios** with session cookie support (`withCredentials: true`) |
| Animations / Swipe | **Framer Motion** |
| Icons | **Lucide React** |

---

## Visual Design System — Pixel Art Aesthetic

The entire UI must feel **pixel-art / retro-digital**. This is not decorative; it is the brand identity.

### Design Rules
- **All borders**: `2px solid` or `4px solid`, sharp corners (`border-radius: 0` everywhere — no rounded corners)
- **Shadows**: pixel-offset box shadows only: `4px 4px 0px #000` or `2px 2px 0px #000`
- **Buttons**: flat color fill, thick border, pixel shadow. On hover: shift `translate(2px, 2px)` and remove shadow (pressed effect)
- **Cards**: thick bordered boxes, no shadows on default, shadow on hover
- **Typography**: Primary font = `"Press Start 2P"` (Google Fonts) for headings and labels. Body text = `"VT323"` or `"Courier New"` for readability at normal sizes
- **Dividers**: use `border-t-4 border-black` or pixelated HR elements
- **Images**: all profile photos displayed inside thick-bordered pixel frames, slightly pixelated CSS filter on hover
- **Animations**: only translate/scale transforms, no blur or opacity fades (preserves pixel feel). Use step-based easing: `cubic-bezier(0,0,1,1)` or CSS `steps()`

### Color Palette
```
--color-bg:        #1a1a2e   (deep navy — main background)
--color-surface:   #16213e   (card backgrounds)
--color-primary:   #e94560   (hot pink/red — CTAs, likes, match alerts)
--color-secondary: #0f3460   (deep blue — secondary actions)
--color-accent:    #f5a623   (amber — gold membership, super like)
--color-text:      #eaeaea   (off-white — main text)
--color-muted:     #8892a4   (grey — secondary text, placeholders)
--color-success:   #4ade80   (green — match confirmed, verified badge)
--color-border:    #000000   (pure black borders)
--color-white:     #ffffff
```

### Tailwind Config Extensions
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['"VT323"', 'Courier New', 'monospace'],
      },
      boxShadow: {
        pixel: '4px 4px 0px #000000',
        'pixel-sm': '2px 2px 0px #000000',
        'pixel-lg': '6px 6px 0px #000000',
        'pixel-primary': '4px 4px 0px #e94560',
        'pixel-accent': '4px 4px 0px #f5a623',
      },
      borderWidth: { 3: '3px', 5: '5px' },
      borderRadius: { none: '0px' },
    },
  },
}
```

---

## Project Structure

```
/
├── apps/
│   ├── web/                    ← Next.js app (SEO pages)
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx        ← Landing page
│   │   │   ├── about/page.tsx
│   │   │   ├── interests/
│   │   │   │   ├── page.tsx    ← Interests listing (SSG)
│   │   │   │   └── [slug]/page.tsx
│   │   │   └── users/page.tsx  ← Public discovery (SSR)
│   │   └── components/
│   │
│   └── app/                    ← React SPA (private pages)
│       ├── src/
│       │   ├── main.tsx
│       │   ├── App.tsx
│       │   ├── routes/
│       │   │   ├── auth/
│       │   │   │   ├── LoginPage.tsx
│       │   │   │   └── RegisterPage.tsx  (multi-step)
│       │   │   ├── swipe/SwipePage.tsx
│       │   │   ├── matches/MatchesPage.tsx
│       │   │   ├── chat/ChatPage.tsx
│       │   │   ├── profile/
│       │   │   │   ├── ProfilePage.tsx
│       │   │   │   └── EditProfilePage.tsx
│       │   │   ├── discovery/DiscoveryPage.tsx
│       │   │   ├── photos/PhotoManagerPage.tsx
│       │   │   └── settings/SettingsPage.tsx
│       │   ├── components/
│       │   │   ├── ui/           ← Pixel design system components
│       │   │   ├── swipe/
│       │   │   ├── chat/
│       │   │   └── profile/
│       │   ├── store/            ← Zustand stores
│       │   ├── hooks/
│       │   └── api/              ← Axios API layer
│       └── index.html
│
└── shared/                     ← Shared types, utils
```

---

## Page-by-Page Specifications

---

### 1. Landing Page (`/`) — Next.js SSR

**Goal**: Introduce Bumbul, generate web sign-ups.

**Sections (in order)**:

#### Hero Section
- Full-viewport height
- Animated pixel art background: floating pixel hearts (CSS animation, `steps()` easing)
- Headline: `"Find Your Match"` in `Press Start 2P` font, large
- Subheadline: `"Iran's first pixel-art dating experience"` in VT323
- Two CTAs: `[Get Started]` → `/register` and `[Learn More]` → smooth scroll
- Pixel-art mascot/character illustration (SVG or static image)
- Blinking cursor animation on headline (CSS `@keyframes blink`)

#### Features Section
- 3-column grid (mobile: stacked)
- Each feature in a pixel-bordered card with pixel-shadow
- Feature 1: **Swipe & Match** — icon + description
- Feature 2: **Real-time Chat** — icon + description  
- Feature 3: **Invite & Earn** — referral system explanation
- Cards animate in on scroll (Intersection Observer or Framer Motion `viewport`)

#### Membership Tiers Section
- 3 cards: Bronze / Silver / Gold
- Visual hierarchy: Gold card gets pixel-accent shadow
- Each shows: daily like limit, super likes, visibility boost
  - Bronze: 50 likes/day, 1 super like/day
  - Silver: 150 likes/day, 3 super likes/day
  - Gold: unlimited likes, 5 super likes/day
- Note: "Upgraded by admin — contact us"

#### How It Works Section
- 4 steps with pixel-numbered badges (not generic 01/02/03 — use actual pixel-art number sprites or large styled numbers)
- Steps: Register → Verify via Telegram → Build Profile → Start Swiping

#### Invite & Referral Section
- Explain the invite code system (each user gets a unique code)
- Encourage sharing

#### Footer
- Links: About, Privacy, Contact
- Social: Telegram bot link (`t.me/bumbullbot`)

---

### 2. Registration Flow — React SPA (`/register`)

Multi-step wizard. Steps shown as pixel-art progress bar at top.

#### Step 1 — Basic Info
Fields (match Django `RegistrationStep1Form`):
- First Name (required)
- Last Name (optional)
- Date of Birth (date picker, must be 18+)
- Gender (M/F — pixel radio buttons styled as toggle)
- Password + Confirm Password
- Invite Code (optional field)
- Submit → POST to `/accounts/register/`

#### Step 2 — Phone Verification
- Show generated OTP code in large pixel display
- Instruction: "Open Telegram → Message @bumbullbot → Send this code"
- Deep link button: `[Open Telegram Bot]` → `https://t.me/bumbullbot`
- Polling: every 3 seconds check if user is now authenticated (GET `/accounts/api/profile-completion/`)
- On verified: advance to Step 3 automatically
- Also support: show link from Django that arrives via `?token=` query param

#### Step 3 — Profile Details
Fields (match Django `RegistrationStep3Form`):
- Biography (textarea, min 20 chars, max 1000)
- Height (cm, 100–250, pixel slider or number input)
- City of Birth (select: Shiraz / Isfahan / Tehran / Gorgan)
- City (current, same choices)
- Interests (multi-select from `/accounts/interests/` API, min 3)
- Fun Question + Fun Answer (optional text fields)
- Submit → POST to `/accounts/register/`

#### Step 4 — Photo Upload
- Dropzone for 3–6 photos
- Drag-to-reorder (Framer Motion drag)
- First photo auto-marked as primary
- Preview grid with pixel-bordered thumbnails
- Delete button per photo (if > 3 uploaded)
- Submit → POST to `/accounts/photos/upload-multiple/`
- On success → redirect to `/swipe`

---

### 3. Login Page — React SPA (`/login`)

Two modes (tab switcher):

**Mode A — Password Login**
- Phone number input (Iranian format: starts with 09, auto-normalize to +98)
- Password input
- POST to `/accounts/login/` with credentials
- On success → redirect to `/swipe`

**Mode B — Telegram OTP**
- Phone number input
- "Send OTP" → POST to generate OTP on backend
- Show OTP code → user sends to @bumbullbot
- Poll for verification → redirect on success

Form validation with Zod. All inputs pixel-styled (thick border, no radius, dark background).

---

### 4. Swipe Page — React SPA (`/swipe`) ← Main App Screen

**Layout**: Full screen, centered card stack. Pixel-art navbar at top.

**Card Stack**:
- Show current profile card (top card)
- Card contains: primary photo (full card height), name + age overlay at bottom, city, interests badges
- Card stack effect: 2-3 cards visible behind main card (slightly offset, scaled down)

**Interaction — Both modes**:

A) **Drag Gesture** (Framer Motion `drag="x"`):
- Drag right → Like (card flies right with rotation, green border glow)
- Drag left → Pass (card flies left with rotation, red border glow)
- Threshold: 100px offset triggers decision
- Show LIKE / NOPE overlay text that scales in as user drags

B) **Button Controls** below card:
- `[✕ PASS]` button → animate card left
- `[⭐ SUPER]` button → animate card up (super like)
- `[♥ LIKE]` button → animate card right
- All buttons pixel-styled with pixel-shadow

**After each swipe**:
- Fetch next profile from API: GET `/accounts/swipe/`
- POST swipe action to `/accounts/swipe/action/` with `{swiped_user_id, swipe_type}`

**Match Alert**:
- When API returns `match_created: true` → full-screen pixel-art match overlay
- "IT'S A MATCH!" in large Press Start 2P font with animated pixel hearts
- Buttons: `[Send Message]` → opens chat, `[Keep Swiping]` → dismiss

**Quota Display**: Show remaining likes today (from SwipeQuota). Bronze: 50/day.

**Empty State**: "No more profiles in your area" with pixel-art illustration.

---

### 5. Discovery Page — React SPA (`/discovery`)

Two view modes (tab toggle): **Card View** and **Grid View**

#### Filters Panel (collapsible sidebar):
- Search by name
- City filter (dropdown)
- Age range (min/max sliders)
- Interests (multi-select chips)
- Membership tier filter
- Nearby toggle → GET `/accounts/users/nearby/`
- Apply filters → GET `/accounts/users/` with query params

#### Card View:
- Tinder-like browseable cards (same component as Swipe page, but no swipe gesture — click to open profile)

#### Grid View:
- Responsive grid (3 cols desktop, 2 tablet, 1 mobile)
- Each cell: primary photo, name, age, city, membership badge
- Click → profile modal or navigate to profile page

**Pagination**: infinite scroll (Intersection Observer on last element → fetch next page)

---

### 6. Matches Page — React SPA (`/matches`)

- List of all mutual matches
- Each match: avatar, name, last message preview (if chat started), timestamp
- Sorted by: most recent activity
- Click → open chat
- Unread message count badge (pixel-styled number badge)
- API: GET `/accounts/users/` filtered to matched users (or dedicated endpoint if added)

---

### 7. Chat Page — React SPA (`/chat/:matchId`)

**WebSocket Connection**:
```js
const ws = new WebSocket(`wss://api.bumbul.ir/ws/chat/${matchId}/`)
// Send: { type: 'message', content: '...' }
// Receive: { type: 'message', sender_id, content, timestamp }
```
Note: WebSocket endpoint must be added to Django Channels backend. The frontend should be ready for this endpoint format.

**UI Layout**:
- Left sidebar: match list (same as Matches page, collapsible on mobile)
- Right panel: message thread
- Message bubbles: sender on right (primary color), receiver on left (surface color)
- All bubbles: pixel-bordered, no border-radius, pixel-shadow
- Input bar at bottom: text input + send button

**Features**:
- Auto-scroll to latest message
- Timestamp on hover/tap
- "Online" indicator (from WebSocket presence)
- Image support (future-ready placeholder)

---

### 8. Profile Page — React SPA (`/profile/:slug`)

Fetch from: GET `/accounts/profile/{slug}/`

**Own Profile**:
- Photo carousel (swipe between photos, pixel-bordered)
- Edit button → `/profile/edit`
- Profile completeness bar (from `/accounts/api/profile-completion/`)
- Fields displayed: name, age, city, bio, height, interests, fun Q&A
- Membership badge (Bronze/Silver/Gold with matching color)
- Invite code display with copy button

**Other User's Profile**:
- Same layout but no edit button
- Show: Like / Super Like / Pass buttons
- Show verified badge if `UserVerification.is_approved`

---

### 9. Edit Profile Page — React SPA (`/profile/edit`)

PUT/PATCH to `/accounts/profile/edit/`

Form fields match `UserProfileForm`:
- First Name, Last Name
- Biography
- Height
- City of Birth, Current City
- Location (latitude/longitude — use browser Geolocation API with a map or coordinate display)
- Interests (multi-select, from `/accounts/interests/`)
- Fun Question + Fun Answer

Photo management section:
- Current photos grid (drag to reorder)
- Add more photos button
- Delete photo (if count > 3)
- POST reorder to `/accounts/photos/reorder/`

---

### 10. Settings Page — React SPA (`/settings`)

Sections:
- **Account**: phone number (read-only), change password form
- **Privacy**: account visibility toggle (future)
- **Membership**: current tier display, "Contact admin to upgrade" message
- **Invite**: your invite code, number of people who used it, list of referrals
- **Danger Zone**: "Deactivate Account" button → POST `/accounts/settings/delete/`
- **Logout**: POST `/accounts/logout/`

---

## Shared UI Components (Pixel Design System)

Build these as reusable components used across both Next.js and React apps:

```
PixelButton        — variant: primary | secondary | danger | ghost
PixelCard          — with optional pixel-shadow, hover effect
PixelInput         — text input, pixel border, no radius
PixelSelect        — custom dropdown with pixel styling
PixelBadge         — membership tiers: bronze/silver/gold colors
PixelAvatar        — photo in pixel frame, with optional verified checkmark
PixelProgressBar   — chunky pixel-art progress bar (profile completion, quota)
PixelModal         — full-screen or centered modal with pixel border
PixelToast         — notification toast from bottom (pixel-styled)
PixelTabs          — tab switcher, pill-style with thick border underline
PixelSwipeCard     — the main swipe card component
PixelChatBubble    — message bubble for chat
PixelHearts        — animated pixel heart burst (for match screen)
```

---

## API Integration Layer

```ts
// api/client.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  withCredentials: true,  // Required for Django session cookies
  headers: { 'Content-Type': 'application/json' },
})

// Add CSRF token to all mutating requests
api.interceptors.request.use(config => {
  const csrfToken = document.cookie.match(/csrftoken=([^;]+)/)?.[1]
  if (csrfToken && ['post','put','patch','delete'].includes(config.method!)) {
    config.headers['X-CSRFToken'] = csrfToken
  }
  return config
})

// Redirect to /login on 401
api.interceptors.response.use(null, error => {
  if (error.response?.status === 401) window.location.href = '/login'
  return Promise.reject(error)
})
```

**Key endpoints used**:
```
POST   /accounts/login/                    — Login
POST   /accounts/logout/                   — Logout
POST   /accounts/register/                 — Multi-step register
GET    /accounts/profile/{slug}/           — View profile
POST   /accounts/profile/edit/             — Update profile
GET    /accounts/swipe/                    — Get next profile card
POST   /accounts/swipe/action/             — Submit swipe {swiped_user_id, swipe_type}
GET    /accounts/users/                    — Discovery list (filters via query params)
GET    /accounts/users/nearby/             — Nearby users
GET    /accounts/interests/                — All interests list
GET    /accounts/interests/{slug}/         — Users with specific interest
GET    /accounts/api/profile-completion/   — Profile completion %
POST   /accounts/photos/upload-multiple/   — Batch photo upload
POST   /accounts/photos/reorder/           — Reorder photos
DELETE /accounts/photos/delete/{id}/       — Delete photo
POST   /accounts/photos/set-primary/{id}/  — Set primary photo
WS     /ws/chat/{matchId}/                 — Real-time chat (Django Channels)
```

---

## Routing Strategy

| Path | Framework | Auth Required | SSR/SSG |
|---|---|---|---|
| `/` | Next.js | No | SSG |
| `/about` | Next.js | No | SSG |
| `/interests` | Next.js | No | SSG |
| `/interests/[slug]` | Next.js | No | SSR |
| `/login` | React SPA | No | — |
| `/register` | React SPA | No | — |
| `/swipe` | React SPA | Yes | — |
| `/matches` | React SPA | Yes | — |
| `/chat/:matchId` | React SPA | Yes | — |
| `/profile/:slug` | React SPA | Yes | — |
| `/profile/edit` | React SPA | Yes | — |
| `/discovery` | React SPA | Yes | — |
| `/settings` | React SPA | Yes | — |

Protected routes: wrap in `<AuthGuard>` component that checks session and redirects to `/login` if unauthenticated.

---

## Zustand Stores

```ts
// store/authStore.ts
{ user, isAuthenticated, login(), logout(), updateProfile() }

// store/swipeStore.ts
{ currentProfile, queue, swipedIds, quota, swipeLeft(), swipeRight(), superLike(), fetchNext() }

// store/matchStore.ts
{ matches, newMatch, fetchMatches(), clearNewMatch() }

// store/chatStore.ts
{ activeConversation, messages, sendMessage(), connectWS(), disconnectWS() }

// store/discoveryStore.ts
{ users, filters, setFilter(), fetchUsers(), loadMore() }
```

---

## SEO Pages (Next.js) — Metadata

```ts
// app/page.tsx
export const metadata = {
  title: 'Bumbul — Find Your Match in Iran',
  description: 'Iran\'s pixel-art dating app. Swipe, match, and chat.',
  openGraph: { title: 'Bumbul', description: '...', images: ['/og-image.png'] }
}

// app/interests/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const interest = await fetchInterest(params.slug)
  return { title: `${interest.name} — Bumbul`, description: `Meet people who love ${interest.name}` }
}
```

---

## Responsive Breakpoints

```
Mobile:  < 640px   — Single column, bottom nav bar
Tablet:  640–1024px — Two column discovery grid
Desktop: > 1024px  — Full layout with sidebars
```

Mobile navigation: fixed bottom bar with 5 icons (Swipe, Discover, Matches, Chat, Profile)

Desktop navigation: left sidebar (collapsible)

---

## Environment Variables

```env
# .env.local (Next.js)
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
NEXT_PUBLIC_TELEGRAM_BOT=bumbullbot

# .env (React SPA via Vite)
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
VITE_TELEGRAM_BOT=bumbullbot
```

---

## Notes for AI Code Generation

1. **No border-radius anywhere** — `rounded-none` on all elements
2. **Press Start 2P font** must be loaded from Google Fonts in `<head>` or `layout.tsx`
3. **CSRF tokens** required on all POST/PUT/PATCH/DELETE requests to Django
4. **Session cookies** — always use `withCredentials: true` in Axios
5. **Phone normalization** — Iranian numbers: `09xxxxxxxxx` → `+989xxxxxxxxx`
6. **Swipe quota** — show remaining likes counter in swipe UI
7. **WebSocket** — Django backend needs `django-channels` + `channels_redis` configured; frontend should handle reconnection on disconnect
8. **Photo minimum** — users must have 3 photos before profile is considered complete
9. **Membership** — managed by admin; frontend just reads and displays current tier
10. **Invite codes** — each user has a unique 6-char code (auto-generated by backend), display prominently in settings
11. **Registration** — Step 2 uses Telegram bot; provide polling fallback if user doesn't want Telegram
12. **Interest filtering** — minimum 3 interests required during registration; used in discovery filtering

---

## MVP Priority Order

**Phase 1 (Core)**:
1. Landing page (Next.js)
2. Register flow (4 steps)
3. Login page
4. Swipe page with gesture + buttons
5. Match alert overlay

**Phase 2 (Social)**:
6. Matches list
7. Real-time chat
8. Profile view
9. Edit profile + photo manager

**Phase 3 (Discovery)**:
10. Discovery page (grid + card view)
11. Filters panel
12. Nearby users

**Phase 4 (Polish)**:
13. Settings page
14. SEO interest pages (Next.js)
15. Membership display + invite system UI
