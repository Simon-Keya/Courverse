import apiClient from "../../client";
import type { Course } from "../courses";

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: "active" | "completed" | "dropped" | "expired";
  progressPercentage: number;
  completedLessons: number;
  totalLessons: number;
  completedAt?: string;
  lastAccessedAt?: string;
  enrolledAt: string;
  course?: Course;
}

export const enrollmentsApi = {
  enroll: async (courseId: string): Promise<Enrollment> => {
    const { data } = await apiClient.post<Enrollment>("/enrollments", { courseId });
    return data;
  },

  myEnrollments: async (): Promise<Enrollment[]> => {
    const { data } = await apiClient.get<Enrollment[]>("/enrollments/me");
    return data;
  },

  getOne: async (courseId: string): Promise<Enrollment | null> => {
    try {
      const { data } = await apiClient.get<Enrollment>(`/enrollments/me/${courseId}`);
      return data;
    } catch {
      return null;
    }
  },
};
