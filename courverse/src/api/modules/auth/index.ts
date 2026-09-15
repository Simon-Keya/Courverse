import apiClient from "../../client";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: "learner" | "publisher" | "admin" | "super_admin";
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  xp?: number;
  level?: number;
  streak?: number;
}

export interface AuthResponse {
  access_token: string;
  user: AuthUser;
}

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>("/auth/login", payload);
    return data;
  },

  signup: async (payload: SignupPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>("/auth/signup", payload);
    return data;
  },

  profile: async (): Promise<AuthUser> => {
    const { data } = await apiClient.get<AuthUser>("/auth/profile");
    return data;
  },

  me: async (): Promise<AuthUser> => {
    const { data } = await apiClient.get<AuthUser>("/auth/me");
    return data;
  },
};
