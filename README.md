# Courverse — Public Pages

This zip contains the `(public)` route group requested, plus the minimal
supporting files needed for it to actually run: a root layout, Tailwind
config with the Courverse design tokens, a `cn()` helper, a handful of
shared UI/layout components (`Header`, `Footer`, `Button`, `Badge`,
`CourseCard`), and mock data so every page renders real content instead of
placeholders.

## What's included

```
src/app/layout.tsx                     ← root layout (required by Next.js)
src/app/globals.css
src/app/(public)/layout.tsx
src/app/(public)/page.tsx              ← landing page
src/app/(public)/loading.tsx
src/app/(public)/about/page.tsx
src/app/(public)/contact/page.tsx
src/app/(public)/pricing/page.tsx
src/app/(public)/publishers/page.tsx
src/app/(public)/publishers/[id]/page.tsx
src/app/(public)/categories/page.tsx
src/app/(public)/categories/[slug]/page.tsx
src/app/(public)/courses/page.tsx
src/app/(public)/courses/[id]/page.tsx
src/app/(public)/courses/[id]/loading.tsx
src/app/(public)/courses/[id]/error.tsx
src/app/(public)/search/page.tsx

src/components/layout/Header.tsx
src/components/layout/Footer.tsx
src/components/course/CourseCard.tsx
src/components/ui/button.tsx
src/components/ui/badge.tsx

src/lib/utils.ts
src/types/course.ts
src/data/mock.ts                       ← swap this for real API calls later
```

## Notes

- **All content is mock data** from `src/data/mock.ts` — courses,
  publishers, categories, testimonials. Replace with real fetches (React
  Query + your NestJS API) when you wire up the backend; the components
  already consume the shared `Course`/`Publisher`/`Category` types from
  `src/types/course.ts`, so swapping the data source shouldn't require
  touching the JSX.
- **Design tokens** live in `tailwind.config.ts` — colors, radius, and
  shadow scale come straight from the palette you specified (emerald
  green primary, white-first surfaces, blue/yellow/orange/purple/red
  accents reserved for their specific meanings).
- **Fonts**: Plus Jakarta Sans (headings), Inter (body), Geist Mono
  (numbers/XP) are wired up via `next/font/google` in the root layout.
- `courses/page.tsx` and `search/page.tsx` are client components (they
  need interactive state for filters/search). Everything else is a server
  component by default.
- `(auth)` and `(learner)` route groups are now included too (see below).
  Still no `publisher`/`admin` routes, and no real API client, auth
  session, or Zustand store — the pages use local component state and
  mock data so you can see the full UI before wiring up NestJS.

## (auth) route group

```
src/app/(auth)/layout.tsx              ← split-screen: form left, brand/progress panel right
src/app/(auth)/login/page.tsx
src/app/(auth)/register/page.tsx       ← learner/publisher role toggle
src/app/(auth)/verify-email/page.tsx
src/app/(auth)/forgot-password/page.tsx
src/app/(auth)/reset-password/page.tsx
src/app/(auth)/callback/page.tsx       ← OAuth redirect handler (mocked)
```

These are all client components (form state, show/hide password, etc).
None of them call a real API — swap the `setTimeout` calls in each
`onSubmit`/`useEffect` for your actual `/auth/login`, `/auth/register`,
etc. requests.

## (learner) route group

```
src/app/(learner)/layout.tsx                        ← sidebar + topbar app shell
src/app/(learner)/dashboard/page.tsx
src/app/(learner)/my-learning/page.tsx               ← status filter tabs
src/app/(learner)/rewards/page.tsx
src/app/(learner)/certificates/page.tsx
src/app/(learner)/profile/page.tsx
src/app/(learner)/profile/settings/page.tsx
src/app/(learner)/profile/security/page.tsx
src/app/(learner)/notifications/page.tsx             ← mark as read
src/app/(learner)/wishlist/page.tsx
src/app/(learner)/courses/[id]/learn/page.tsx        ← course player
src/app/(learner)/courses/[id]/learn/loading.tsx
src/app/(learner)/courses/[id]/learn/error.tsx

src/components/layout/LearnerSidebar.tsx
src/components/layout/LearnerTopbar.tsx
src/components/profile/ProfileTabs.tsx
```

The course player (`courses/[id]/learn`) is the most involved piece: it
tracks active lesson, completed lessons, and progress % in local state,
renders a mock video block for video lessons, an inline multiple-choice
quiz for quiz lessons, and a "mark complete" panel for the final
challenge. Replace the local `useState` with a real `progress` mutation
(`PATCH /progress`) and `quizzes` submission call when the backend is
wired up.

`notificationsList`, `rewards`, `certificates`, `currentUser`, and
`dashboardStats` are new mock exports in `src/data/mock.ts` — same idea
as before, swap for real fetches later.

**Note:** since no separate layout was requested for
`courses/[id]/learn`, it inherits the `(learner)` sidebar/topbar shell.
Most real products give the course player its own full-bleed layout —
happy to add a `CoursePlayerLayout` if you'd rather it break out of the
dashboard chrome.

## publisher and admin routes (plain segments, not route groups)

```
src/app/publisher/layout.tsx
src/app/publisher/dashboard/page.tsx
src/app/publisher/analytics/page.tsx
src/app/publisher/courses/page.tsx
src/app/publisher/quizzes/page.tsx
src/app/publisher/students/page.tsx
src/app/publisher/earnings/page.tsx
src/app/publisher/certificates/page.tsx
src/app/publisher/settings/page.tsx

src/app/admin/layout.tsx
src/app/admin/dashboard/page.tsx
src/app/admin/users/page.tsx
src/app/admin/courses/page.tsx
src/app/admin/publishers/page.tsx
src/app/admin/categories/page.tsx
src/app/admin/rewards/page.tsx
src/app/admin/reports/page.tsx
src/app/admin/settings/page.tsx
src/app/admin/logs/page.tsx

src/components/layout/DashboardSidebar.tsx   ← generic, shared by publisher + admin
src/components/layout/DashboardTopbar.tsx    ← generic, shared by publisher + admin
src/components/charts/BarChart.tsx           ← CSS-only bar chart, no charting lib added
src/data/publisher-mock.ts
src/data/admin-mock.ts
```

**Design decision:** rather than writing near-identical `PublisherSidebar`/`AdminSidebar` components (like the learner one), these two sections share one `DashboardSidebar`/`DashboardTopbar` pair that takes `navItems` and a `roleLabel` as props. Same visual language, less duplication. If you'd rather each role have its own fully independent component (e.g. because they'll diverge a lot later), say so and I'll split them.

Also worth knowing: no charting library (recharts, etc.) was added to `package.json` — `BarChart.tsx` is a small CSS/flexbox component used for analytics/earnings/revenue trend. It's fine for this mock-data stage; swap it for `recharts` (already listed as your preferred stack) once you're plotting real time-series data with tooltips, zoom, etc.

Both sections are gated visually only (sidebar nav + role label) — there's no actual role-based route protection yet. That belongs in `middleware.ts` / your auth guards once the real auth flow is wired up, not in these page components.

## Run it

```bash
npm install
npm run dev
```
