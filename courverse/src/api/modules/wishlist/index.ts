import apiClient from "../../client";
import type { Course } from "../courses";

export interface WishlistItem {
  id: string;
  courseId: string;
  course?: Course;
  createdAt: string;
}

export const wishlistApi = {
  list: async (): Promise<WishlistItem[]> => {
    const { data } = await apiClient.get<WishlistItem[]>("/wishlist");
    return data;
  },
  add: async (courseId: string) => {
    const { data } = await apiClient.post(`/wishlist/${courseId}`);
    return data;
  },
  remove: async (courseId: string) => {
    const { data } = await apiClient.delete(`/wishlist/${courseId}`);
    return data;
  },
  status: async (courseId: string): Promise<{ inWishlist: boolean }> => {
    const { data } = await apiClient.get(`/wishlist/${courseId}/status`);
    return data;
  },
};
