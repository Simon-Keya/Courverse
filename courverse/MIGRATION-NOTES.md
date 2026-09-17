# Courverse Frontend — Migration Notes

## Phase 0 complete (build + quality gates)

Open questions deferred to later phases:

### Auth cookie contract (Phase 1)
Recommended: backend sets `HttpOnly; Secure; SameSite=Strict` cookie on login/refresh.
Frontend Route Handlers under `app/api/auth/*` can proxy if CORS cannot set cookies cross-origin.
Confirm cookie name, path, domain, and refresh endpoint body/shape with backend.

### Role claim names
Middleware RBAC expects JWT payload role values: `learner | publisher | admin | super_admin`.
Confirm exact claim path (`role` vs `roles` vs nested).

## Phase 1 — Auth (partial)

### Done on frontend
- RBAC route map in `src/permissions/roles.ts`
- Middleware checks JWT `role` claim (payload decode only — not signature verify)
- Admin/publisher layouts assert role client-side and use real session identity
- JWT removed from Zustand persist `partialize`; token held in `sessionStorage` + middleware cookie
- Login honors `?callbackUrl=` and Keep me logged in (cookie max-age)

### Still required from backend (open)
1. **HttpOnly cookie** — preferred production model. Set on login/refresh with `HttpOnly; Secure; SameSite=Strict; Path=/`. Confirm cookie name so middleware can stop reading a JS-writable cookie.
2. **Refresh endpoint** — path, body, response shape for single-flight refresh interceptor.
3. **JWT claims** — confirm `role` is top-level string: `learner | publisher | admin | super_admin`.
4. **CORS** — if cookie is cross-origin, `credentials: true` + explicit origin (not `*`).

Until (1) ships, the frontend still uses a JS-readable cookie for Edge middleware UX only.

## Phase A (resync)

### Fixed
- Admin/publisher pages: distinct TanStack Query hooks (no ` "page" === "courses" ` dead branches)
- Register sends `role: learner | publisher` in signup payload
- Login/register: react-hook-form + zod + aria-invalid errors
- Single-flight refresh on 401 via `api/client.ts` → `POST /auth/refresh`
- OAuth `/callback` no longer fakes success; shows unavailable
- Deleted `api/modules/auth/{login,logout,register,refresh}.ts` stubs

### Backend contracts still needed
| Endpoint | Expected |
|----------|----------|
| `POST /auth/refresh` | `{ access_token, refresh_token? }` — body may include `refresh_token` |
| `POST /auth/signup` | Accept optional `role: learner \| publisher` |
| `GET /admin/users` | Admin user list (optional) |
| `GET /admin/reports`, `/admin/logs`, `/admin/settings` | Or return 404 and UI shows endpoint unavailable |
| `GET /publishers/me/students`, `/analytics`, `/earnings`, `/certificates` | Publisher console metrics |

## Phase E
- CSP remains **Report-Only** until headers are validated against production traffic; then switch to enforcing in `next.config.ts`.
- Sentry: set `NEXT_PUBLIC_SENTRY_DSN` and add `@sentry/nextjs` when ready.
- Playwright E2E not included — add when staging API is stable.
- Render free-tier cold starts: flag for production SLA.
