# Bumbull Frontend (Monorepo)

**Bumbull** is a premium, pixel-art retro-themed dating and social web application built for Iran. This repository contains the complete frontend workspace using a modern **pnpm Monorepo** architecture.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Monorepo Manager** | pnpm Workspaces |
| **Public Website / SEO** | Next.js 15 (App Router, Tailwind CSS v4) |
| **App Dashboard / SPA** | React 19 + Vite 8 (TypeScript, Zustand, React Router v7, Tailwind CSS v4) |
| **Shared Package** | Common TypeScript interfaces, models, and utility functions |
| **Real-time Chat** | WebSocket (Django Channels on backend) |
| **State Management** | Zustand with session-based authentication |
| **Design System** | Custom 16-bit pixel-art retro UI components |

---

## 📂 Project Structure

```
bumbull-frontend/
├── apps/
│   ├── web/                 # Next.js 15 — SEO pages (Landing, About, Contact, Membership, Privacy, Features, How It Works)
│   └── app/                 # React 19 + Vite SPA — Private dashboard
│       └── src/
│           ├── components/  # Reusable UI components (PixelCard, PixelButton, Navbar, etc.)
│           ├── routes/
│           │   ├── auth/        # Login, Register (multi-step), Password Reset
│           │   ├── swipe/       # Swipe card deck with like/dislike/super-like
│           │   ├── matches/     # Matches list & Chats list
│           │   ├── chat/        # Real-time chat with WebSocket
│           │   ├── events/      # Event listing, detail, join/leave, group chat
│           │   ├── profile/     # View profile & Edit profile (photos, bio, interests)
│           │   └── settings/    # Account settings, password change, deactivation
│           └── store/       # Zustand store with Django backend API integration
├── shared/                  # Shared TypeScript interfaces (User, Photo, Match, ChatMessage, Event, etc.)
├── package.json             # Monorepo configuration and workspace scripts
└── pnpm-workspace.yaml
```

---

## 🛠️ Getting Started

### Prerequisites

1. **Node.js** v18 or higher
2. **pnpm** installed globally:
   ```bash
   npm install -g pnpm
   ```

### Installation

Install all dependencies for the entire workspace:
```bash
pnpm install
```

### Running Locally

Start the development servers for both apps in parallel:
```bash
pnpm dev
```

| App | URL |
|-----|-----|
| **Next.js Landing Page** | [http://localhost:3000](http://localhost:3000) |
| **React SPA Dashboard** | [http://localhost:5173](http://localhost:5173) |

### Building for Production

```bash
pnpm build
```

---

## 🎮 Features

### Public Website (Next.js)
- **Landing Page** — Hero section, features grid, membership tiers, testimonials, FAQ
- **About / Contact / Privacy** — Fully SEO-optimized static pages
- **Login & Register Redirect** — Links to the SPA dashboard

### App Dashboard (React SPA)
- **Multi-step Registration** — Name, DOB, gender → Telegram OTP verification → Interests & Bio → Photo upload
- **Swipe System** — Card deck with animated like ❤️ / dislike ✖️ / super-like ⭐ gestures
- **Matches List** — View all matched users with profile cards
- **Real-time Chat** — WebSocket-powered messaging with typing indicators and read receipts
- **Events** — Browse, join/leave events, group chat within events
- **Profile Management** — Edit bio, interests, photos (reorder, delete, upload)
- **Settings** — Password change, Telegram bot link, account deactivation
- **Invite Code System** — Generate & share invite codes from profile page

### Design System
- Custom **16-bit pixel-art** retro UI with `Press Start 2P` and `VT323` fonts
- Animated pixel components: `PixelCard`, `PixelButton`, `PixelBadge`, `PixelInput`
- Dark theme with accent colors (`#e94560` primary, `#ffd966` accent)
- Fully responsive mobile-first layout

---

## 🔌 Backend Integration

The frontend integrates with a **Django REST + Django Channels** backend via:

- **Session-based authentication** (CSRF token + session cookies)
- **REST API endpoints** under `/accounts/`, `/chat/`, `/events/`
- **WebSocket connections** for real-time chat (`ws://host/ws/chat/<match_id>/`) and event group chat (`ws://host/ws/events/<event_id>/`)

The backend should be running on `http://localhost:8000`. The Vite dev server is configured with a proxy to forward API requests automatically.

For backend API documentation, see [`api-list.txt`](./api-list.txt) and [`backend_integration_guide.md`](./backend_integration_guide.md).

---

## 📜 License

© 2026 Bumbull Project. All rights reserved.
