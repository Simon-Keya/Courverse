export const publisherCacheKeys = {
  all: ["publishers"] as const,
  list: (params?: Record<string, unknown>) =>
    ["publishers", "list", params] as const,
  detail: (id: string) => ["publishers", "detail", id] as const,
  courses: (id: string, params?: Record<string, unknown>) =>
    ["publishers", id, "courses", params] as const,
  reviews: (id: string, params?: Record<string, unknown>) =>
    ["publishers", id, "reviews", params] as const,
};
