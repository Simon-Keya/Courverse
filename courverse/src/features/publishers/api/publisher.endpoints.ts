export const publisherEndpoints = {
  list: "/publishers",
  byId: (id: string) => `/publishers/${id}`,
  courses: (id: string) => `/publishers/${id}/courses`,
  reviews: (id: string) => `/publishers/${id}/reviews`,
} as const;
