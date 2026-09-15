import apiClient from "../../client";

export interface Certificate {
  id: string;
  credentialId: string;
  userId: string;
  courseId: string;
  recipientName: string;
  courseTitle?: string;
  publisherName?: string;
  issuedAt: string;
  course?: {
    id: string;
    title: string;
    thumbnailUrl?: string;
    publisher?: { name: string };
  };
}

export const certificatesApi = {
  myCertificates: async (): Promise<Certificate[]> => {
    const { data } = await apiClient.get<Certificate[]>("/certificates/me");
    return data;
  },

  getById: async (id: string): Promise<Certificate> => {
    const { data } = await apiClient.get<Certificate>(`/certificates/${id}`);
    return data;
  },

  getByCredential: async (credentialId: string): Promise<Certificate> => {
    const { data } = await apiClient.get<Certificate>(
      `/certificates/credential/${credentialId}`,
    );
    return data;
  },
};
