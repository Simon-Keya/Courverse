# Courverse Frontend

Next.js 15 App Router learning platform UI.

## Stack

- Next.js 15, React 19, Tailwind 4
- React Query, Zustand, Axios
- React Hook Form + Zod (forms where used)
- Sonner toasts

## Setup

```bash
cp .env.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) (or the port Next assigns).

## Key routes

| Path | Audience |
|------|----------|
| `/` | Public landing |
| `/courses`, `/courses/[id]` | Catalog + detail + enroll |
| `/login`, `/register` | Auth |
| `/dashboard`, `/my-learning` | Learner |
| `/courses/[id]/learn` | Course player |
| `/certificates`, `/wishlist`, `/notifications` | Learner |
| `/publisher/courses`, `/publisher/courses/new` | Publisher |
| `/publisher/courses/[id]/curriculum` | Curriculum editor |
| `/admin/courses` | Moderation |

## Data layer

- `src/api/client.ts` — Axios + auth interceptor
- `src/api/modules/*` — typed endpoints
- `src/hooks/use-*.ts` — React Query
- `src/store/auth.store.ts` — persisted auth
- Mock fallbacks when API is offline

## Scripts

```bash
npm run dev
npm run build
npm run lint
```
