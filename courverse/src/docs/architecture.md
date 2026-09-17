# Courverse Frontend Architecture

## Stack
- Next.js 15 App Router, React 19, TypeScript
- Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`)
- TanStack Query v5 (server state)
- Zustand (client auth UI state only)
- Axios (`src/api/client.ts` + `src/api/modules/*`)

## Boundaries
- **Canonical API:** `src/api/*` only
- **Auth UX:** `src/middleware.ts` + `src/permissions/roles.ts` (not security boundary)
- **Auth security:** NestJS JWT guards and ownership checks
- **No production mocks:** empty/error states when API fails

## Route groups
- `(public)` — catalog, marketing
- `(auth)` — login/register
- `(learner)` — learning surface
- `publisher/` — instructor console
- `admin/` — platform console

## Environment
| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | Backend base URL (e.g. `https://api.example.com/api/v1`) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin for sitemap/OG |

## Related
See `MIGRATION-NOTES.md` for HttpOnly cookie and refresh contracts.
