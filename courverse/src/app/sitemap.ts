import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://courverse.app";
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "daily", priority: 1 },
    { url: `${base}/courses`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/categories`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/publishers`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/search`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/login`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/register`, changeFrequency: "monthly", priority: 0.3 },
  ];

  // Optional: expand from API when NEXT_PUBLIC_API_URL is set at build time
  try {
    const api = process.env.NEXT_PUBLIC_API_URL;
    if (api) {
      const res = await fetch(`${api}/courses?limit=100`, {
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const json = (await res.json()) as {
          data?: { id: string; updatedAt?: string }[];
        };
        for (const c of json.data ?? []) {
          staticRoutes.push({
            url: `${base}/courses/${c.id}`,
            lastModified: c.updatedAt ? new Date(c.updatedAt) : undefined,
            changeFrequency: "weekly",
            priority: 0.8,
          });
        }
      }
    }
  } catch {
    // Build must not fail if API is offline
  }

  return staticRoutes;
}
