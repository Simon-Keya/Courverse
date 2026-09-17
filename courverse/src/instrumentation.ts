/**
 * Next.js instrumentation hook.
 * Wire Sentry (or similar) when NEXT_PUBLIC_SENTRY_DSN is set.
 * Without a DSN this is intentionally a no-op so builds stay clean.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN;
    if (dsn) {
      // Optional: install @sentry/nextjs and initialize here.
      console.info("[instrumentation] Error tracking DSN present — configure @sentry/nextjs to activate.");
    }
  }
}
