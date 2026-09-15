import apiClient from "../../client";

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  courseId: string;
  isCompleted: boolean;
  progressPercentage: number;
  timeSpentSeconds: number;
  completedAt?: string;
}

export const progressApi = {
  completeLesson: async (lessonId: string): Promise<LessonProgress> => {
    const { data } = await apiClient.post<LessonProgress>(
      `/progress/lessons/${lessonId}/complete`,
    );
    return data;
  },

  getCourseProgress: async (courseId: string): Promise<LessonProgress[]> => {
    const { data } = await apiClient.get<LessonProgress[]>(
      `/progress/courses/${courseId}`,
    );
    return data;
  },

  getLessonProgress: async (lessonId: string): Promise<LessonProgress | null> => {
    try {
      const { data } = await apiClient.get<LessonProgress>(
        `/progress/lessons/${lessonId}`,
      );
      return data;
    } catch {
      return null;
    }
  },
};
