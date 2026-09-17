import apiClient from "../../client";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
  /** Sent to backend when supported; ignored safely if backend drops unknown fields */
  role?: "learner" | "publisher";
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
  refresh_token?: string;
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

  /**
   * Refresh access token.
   * Contract (confirm with backend — see MIGRATION-NOTES.md):
   * POST /auth/refresh  body: { refresh_token?: string } OR cookie-only
   * response: { access_token, refresh_token?, user? }
   */
  refresh: async (refreshToken?: string): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(
      "/auth/refresh",
      refreshToken ? { refresh_token: refreshToken } : {},
    );
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

  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout");
    } catch {
      /* best-effort */
    }
  },
};
