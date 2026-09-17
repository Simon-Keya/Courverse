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
