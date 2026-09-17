# Courverse Frontend Architecture

## Stack
- **Framework:** Next.js 15 App Router, React 19, TypeScript (strict)
- **Styling:** Tailwind CSS v4 with `@theme` tokens in `src/app/globals.css`
- **Server state:** TanStack Query v5 (`QueryProvider` defaults: staleTime 60s)
- **Client state:** Zustand auth store (profile only in persist; token in sessionStorage)
- **HTTP:** Axios singleton `src/api/client.ts` + modules under `src/api/modules/*`
- **Forms:** react-hook-form + zod
- **Player:** react-player, markdown (react-markdown + remark-gfm), PDF via iframe

## Canonical rules
1. **One API client** — never add parallel axios instances.
2. **One Course UI type** — `@/types/course` + `normalizeCourse()` (Zod at boundary).
3. **No production mocks** — loading / error / empty only.
4. **Security** — middleware RBAC is UX; NestJS is authoritative.
5. **No `export {}` stubs** — delete empty modules.

## Route groups
| Group | Purpose |
|-------|---------|
| `(public)` | Catalog, marketing, SEO |
| `(auth)` | Login / register / callback |
| `(learner)` | Dashboard, learning, player |
| `publisher/` | Instructor console |
| `admin/` | Platform console |

## Auth flow
1. Login/signup → `authApi` → `setAuth(user, token, remember?)`
2. Token in `sessionStorage` + JS cookie for middleware (until HttpOnly)
3. 401 → single-flight `POST /auth/refresh` → retry or hard logout
4. Middleware decodes JWT `role` claim for route gates

## Environment
| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_API_URL` | Yes (prod) | e.g. `https://api.example.com/api/v1` |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Sitemap + canonical + OG |
| `NEXT_PUBLIC_SENTRY_DSN` | Optional | Enables instrumentation messaging |

## Render
- Root directory: `courverse`
- Build: `npm ci && npm run build`
- Start: `npm run start` (honours `$PORT`)
- Free plan: cold starts 50s+ can hurt conversion pages — consider a paid instance for production.

## Testing
- Unit: `npm test` (Vitest) — RBAC map covered
- E2E: Playwright not wired yet (see MIGRATION-NOTES)

## Related
`MIGRATION-NOTES.md` — backend contracts (refresh, HttpOnly, admin endpoints)
