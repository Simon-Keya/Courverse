import apiClient from "../../client";
import type { PaginatedCourses } from "../courses";

/** Platform stats derived from available list endpoints (no fake revenue). */
export interface AdminOverview {
  totalCourses: number;
  pendingReview: number;
  publishedCourses: number;
}

export const adminApi = {
  /** Courses awaiting review (SUBMITTED) */
  pendingCourses: async (): Promise<PaginatedCourses> => {
    const { data } = await apiClient.get<PaginatedCourses>("/courses", {
      params: { status: "submitted", includeAllStatuses: true, limit: 20 },
    });
    return data;
  },

  courseStats: async (): Promise<AdminOverview> => {
    const [all, pending, published] = await Promise.all([
      apiClient.get<PaginatedCourses>("/courses", {
        params: { includeAllStatuses: true, limit: 1 },
      }),
      apiClient.get<PaginatedCourses>("/courses", {
        params: { status: "submitted", includeAllStatuses: true, limit: 1 },
      }),
      apiClient.get<PaginatedCourses>("/courses", {
        params: { status: "published", limit: 1 },
      }),
    ]);
    return {
      totalCourses: all.data.meta?.total ?? all.data.data?.length ?? 0,
      pendingReview: pending.data.meta?.total ?? 0,
      publishedCourses: published.data.meta?.total ?? 0,
    };
  },
};
