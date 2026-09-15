import apiClient from "../../client";

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export const notificationsApi = {
  list: async (): Promise<Notification[]> => {
    const { data } = await apiClient.get<Notification[]>("/notifications");
    return data;
  },
  unreadCount: async (): Promise<{ count: number }> => {
    const { data } = await apiClient.get<{ count: number }>("/notifications/unread-count");
    return data;
  },
  markRead: async (id: string) => {
    const { data } = await apiClient.patch(`/notifications/${id}/read`);
    return data;
  },
  markAllRead: async () => {
    const { data } = await apiClient.post("/notifications/read-all");
    return data;
  },
};
