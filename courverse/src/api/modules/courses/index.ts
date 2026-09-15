import apiClient from "../../client";

export interface CourseListParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  publisherId?: string;
  difficulty?: string;
  status?: string;
  isFree?: boolean;
  sort?: "newest" | "popular" | "rating" | "price_asc" | "price_desc";
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  difficulty: string;
  price: number;
  isFree: boolean;
  isPremium: boolean;
  status: string;
  durationMinutes: number;
  lessonCount: number;
  rating: number;
  ratingCount: number;
  enrollmentCount: number;
  learningOutcomes?: string[];
  requirements?: string[];
  tags?: string[];
  publisher?: {
    id: string;
    name: string;
    slug?: string;
    avatarUrl?: string;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  sections?: Section[];
  publishedAt?: string;
  createdAt: string;
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  orderIndex: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  content?: string;
  type: "video" | "reading" | "quiz" | "challenge" | "assignment";
  videoUrl?: string;
  durationMinutes: number;
  orderIndex: number;
  isPreview: boolean;
}

export interface PaginatedCourses {
  data: Course[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const coursesApi = {
  list: async (params: CourseListParams = {}): Promise<PaginatedCourses> => {
    const { data } = await apiClient.get<PaginatedCourses>("/courses", { params });
    return data;
  },

  getById: async (id: string): Promise<Course> => {
    const { data } = await apiClient.get<Course>(`/courses/${id}`);
    return data;
  },

  getBySlug: async (slug: string): Promise<Course> => {
    const { data } = await apiClient.get<Course>(`/courses/slug/${slug}`);
    return data;
  },
};
