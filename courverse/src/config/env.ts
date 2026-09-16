/**
 * Central environment configuration.
 * Public (NEXT_PUBLIC_*) values are inlined at build time.
 */

function requireInProduction(name: string, value: string | undefined, fallback: string): string {
  if (value && value.trim()) return value.trim();
  if (process.env.NODE_ENV === "production") {
    // Do not silently point production traffic at localhost
    console.error(
      `[Courverse] Missing required environment variable ${name}. ` +
        `API calls will fail until it is set.`,
    );
    return "";
  }
  return fallback;
}

export const env = {
  /** Backend API base URL including version prefix, e.g. https://api.example.com/api/v1 */
  apiUrl: requireInProduction(
    "NEXT_PUBLIC_API_URL",
    process.env.NEXT_PUBLIC_API_URL,
    "http://localhost:3000/api/v1",
  ),

  /** Public site URL for sitemap / Open Graph (optional) */
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.NODE_ENV === "production" ? "" : "http://localhost:3001"),

  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV !== "production",
} as const;
