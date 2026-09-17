import apiClient from "../../client";

export interface Publisher {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  logoUrl?: string;
  website?: string;
  isVerified?: boolean;
  courseCount?: number;
}

export const publishersApi = {
  list: async (): Promise<Publisher[]> => {
    const { data } = await apiClient.get<Publisher[]>("/publishers");
    return data;
  },

  getById: async (id: string): Promise<Publisher> => {
    const { data } = await apiClient.get<Publisher>(`/publishers/${id}`);
    return data;
  },

  getBySlug: async (slug: string): Promise<Publisher> => {
    const { data } = await apiClient.get<Publisher>(`/publishers/slug/${slug}`);
    return data;
  },
};
