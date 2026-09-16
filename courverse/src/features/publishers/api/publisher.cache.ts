export const publisherCacheKeys = {
  all: ["publishers"] as const,
  list: (params?: object) => ["publishers", "list", params ?? {}] as const,
  detail: (id: string) => ["publishers", "detail", id] as const,
  courses: (id: string, params?: object) =>
    ["publishers", id, "courses", params ?? {}] as const,
  reviews: (id: string, params?: object) =>
    ["publishers", id, "reviews", params ?? {}] as const,
};
