# Courverse Frontend

Next.js 15 learning platform UI (learner / publisher / admin).

## Requirements

- Node.js 20+
- Backend API reachable at `NEXT_PUBLIC_API_URL`

## Local development

```bash
cp .env.example .env.local
# Edit NEXT_PUBLIC_API_URL if your backend is not on localhost:3000

npm install
npm run dev
```

Default: http://localhost:3000 (or the next free port).

## Production build

```bash
npm ci
npm run build
npm run start
```

`next start` respects the `PORT` environment variable (used by Render).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | **Yes in production** | Backend base URL including `/api/v1`, e.g. `https://courverse-api.onrender.com/api/v1` |
| `NEXT_PUBLIC_SITE_URL` | Optional | Absolute site URL for sitemap/OG, e.g. `https://courverse.onrender.com` |

Never put secrets in `NEXT_PUBLIC_*` variables.

## Render deployment

1. **Service type:** Web Service (Node)
2. **Root Directory:** `courverse` (if the Git repo root contains the `courverse/` folder)
3. **Build Command:** `npm ci && npm run build`
4. **Start Command:** `npm run start`
5. **Node version:** `20`
6. Set env vars in the Render dashboard:
   - `NEXT_PUBLIC_API_URL` = your backend URL + `/api/v1`
   - `NEXT_PUBLIC_SITE_URL` = your frontend public URL

Do **not** use a Static Site service — this app uses SSR / App Router.

## Architecture notes

- API client: `src/api/client.ts` + modules under `src/api/modules/`
- Server state: TanStack React Query
- Auth client state: Zustand (`src/store/auth.store.ts`) + cookie for middleware UX
- Route protection: `src/middleware.ts` (cookie `accessToken`) — backend still authorizes all APIs
- Design tokens: Tailwind CSS v4 `@theme` in `src/app/globals.css`
