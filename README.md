# Bumbul Frontend (Monorepo)

Bumbul is a premium, pixel-art retro-themed dating and social web application. This repository contains the complete frontend workspace built using a modern **pnpm Monorepo** structure.

## 🚀 Tech Stack

- **Monorepo Manager**: `pnpm` Workspaces
- **Public Website / Landing & SEO Pages**: Next.js 15 (App Router, Tailwind CSS v4)
- **App Dashboard / Private SPA Pages**: React 19 + Vite 8 (TypeScript, Zustand, React Router Dom v7, Tailwind CSS v4)
- **Shared Package**: Common TypeScript interfaces, models, and utility functions shared between the web and app packages.

---

## 📂 Project Structure

```
/
├── apps/
│   ├── web/        # Next.js 15 application (SEO pages: Landing, About, Contact, Membership, etc.)
│   └── app/        # React 19 + Vite SPA (Private dashboard: Swipe, Chat, matches, Profile editing, etc.)
├── shared/         # Shared TypeScript interfaces (User, Photo, Match, ChatMessage, etc.)
├── package.json    # Monorepo configuration and workspace scripts
└── pnpm-workspace.yaml
```

---

## 🛠️ Getting Started

### Prerequisites

1. Make sure you have **Node.js** (v18 or higher) installed.
2. Install **pnpm** globally:
   ```bash
   npm install -g pnpm
   ```

### Installation

Install all dependencies for the entire workspace (including shared package and apps):
```bash
pnpm install
```

### Running Locally

To start the development servers for **both** the Next.js landing page and the React SPA dashboard in parallel, run:
```bash
pnpm dev
```

- **Next.js Landing page**: Runs on [http://localhost:3000](http://localhost:3000)
- **React SPA Dashboard**: Runs on [http://127.0.0.1:5173](http://127.0.0.1:5173)

---

## 🔒 Current Status (Mock Data Mode)

Currently, the frontend runs completely in **Mock Data Mode** using client-side Zustand store and cookies (`mockStore.ts`) to simulate interactions (swipes, registrations, matches, and real-time chat). This makes the frontend fully functional and runnable in isolation for UI/UX testing and development purposes.

For integration with the Django REST backend, please refer to the integration guide and update the API client layer (using the pre-configured endpoints and serializers defined in the backend).
