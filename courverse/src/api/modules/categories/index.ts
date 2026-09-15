import apiClient from "../../client";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  courseCount: number;
  orderIndex: number;
}

export const categoriesApi = {
  list: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<Category[]>("/categories");
    return data;
  },

  getBySlug: async (slug: string): Promise<Category> => {
    const { data } = await apiClient.get<Category>(`/categories/slug/${slug}`);
    return data;
  },
};
