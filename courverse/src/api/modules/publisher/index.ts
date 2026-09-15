import apiClient from "../../client";
import type { Course, PaginatedCourses } from "../courses";

export interface CreateCoursePayload {
  title: string;
  description: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  difficulty?: string;
  price?: number;
  isFree?: boolean;
  isPremium?: boolean;
  categoryId?: string;
  publisherId?: string;
  learningOutcomes?: string[];
  requirements?: string[];
  tags?: string[];
}

export const publisherApi = {
  myCourses: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedCourses> => {
    const { data } = await apiClient.get<PaginatedCourses>("/courses/publisher/mine", {
      params,
    });
    return data;
  },

  createCourse: async (payload: CreateCoursePayload): Promise<Course> => {
    const { data } = await apiClient.post<Course>("/courses", payload);
    return data;
  },

  updateCourse: async (id: string, payload: Partial<CreateCoursePayload>): Promise<Course> => {
    const { data } = await apiClient.patch<Course>(`/courses/${id}`, payload);
    return data;
  },

  submitForReview: async (id: string): Promise<Course> => {
    const { data } = await apiClient.post<Course>(`/courses/${id}/submit`);
    return data;
  },

  publish: async (id: string): Promise<Course> => {
    const { data } = await apiClient.post<Course>(`/courses/${id}/publish`);
    return data;
  },
};

export const adminApi = {
  pendingCourses: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedCourses> => {
    const { data } = await apiClient.get<PaginatedCourses>("/courses/admin/pending", {
      params,
    });
    return data;
  },

  allCourses: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedCourses> => {
    const { data } = await apiClient.get<PaginatedCourses>("/courses", {
      params: { ...params, includeAllStatuses: true },
    });
    return data;
  },

  approve: async (id: string): Promise<Course> => {
    const { data } = await apiClient.post<Course>(`/courses/${id}/approve`);
    return data;
  },

  reject: async (id: string): Promise<Course> => {
    const { data } = await apiClient.post<Course>(`/courses/${id}/reject`);
    return data;
  },

  publish: async (id: string): Promise<Course> => {
    const { data } = await apiClient.post<Course>(`/courses/${id}/publish`);
    return data;
  },
};
