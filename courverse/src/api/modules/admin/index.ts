import apiClient from "../../client";
import type { PaginatedCourses } from "../courses";
import type { Publisher } from "../publishers";
import type { Category } from "../categories";

export interface AdminOverview {
  totalCourses: number;
  pendingReview: number;
  publishedCourses: number;
}

export const adminApi = {
  overview: async (): Promise<AdminOverview> => {
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
      totalCourses: all.data.meta?.total ?? 0,
      pendingReview: pending.data.meta?.total ?? 0,
      publishedCourses: published.data.meta?.total ?? 0,
    };
  },

  courses: async (params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedCourses> => {
    const { data } = await apiClient.get<PaginatedCourses>("/courses", {
      params: { includeAllStatuses: true, limit: 50, ...params },
    });
    return data;
  },

  pendingCourses: async (): Promise<PaginatedCourses> => {
    const { data } = await apiClient.get<PaginatedCourses>("/courses", {
      params: { status: "submitted", includeAllStatuses: true, limit: 50 },
    });
    return data;
  },

  categories: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<Category[]>("/categories");
    return data;
  },

  publishers: async (): Promise<Publisher[]> => {
    const { data } = await apiClient.get<Publisher[]>("/publishers");
    return data;
  },

  /** Backend may not expose /admin/users yet — documented in MIGRATION-NOTES */
  users: async (): Promise<unknown[]> => {
    const { data } = await apiClient.get<unknown[]>("/admin/users");
    return Array.isArray(data) ? data : [];
  },

  rewards: async (): Promise<unknown[]> => {
    const { data } = await apiClient.get<unknown[]>("/rewards");
    return Array.isArray(data) ? data : [];
  },
};
