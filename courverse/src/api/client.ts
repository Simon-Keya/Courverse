import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { env } from "@/config/env";

export interface ApiError {
  message: string;
  status?: number;
  original?: unknown;
}

const baseURL = env.apiUrl || undefined;

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

function readAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    sessionStorage.getItem("access_token") ||
    localStorage.getItem("access_token")
  );
}

function readRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("refresh_token");
}

function writeAccessToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) {
    sessionStorage.setItem("access_token", token);
    const secure =
      window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `accessToken=${encodeURIComponent(token)}; path=/; max-age=${60 * 60 * 8}; SameSite=Strict${secure}`;
  } else {
    sessionStorage.removeItem("access_token");
    localStorage.removeItem("access_token");
    document.cookie = "accessToken=; path=/; max-age=0; SameSite=Strict";
  }
}

function hardLogout() {
  writeAccessToken(null);
  sessionStorage.removeItem("refresh_token");
  if (typeof window !== "undefined") {
    // Avoid import cycle with zustand — clear persist key
    try {
      localStorage.removeItem("courverse-auth");
    } catch {
      /* ignore */
    }
    if (!window.location.pathname.startsWith("/login")) {
      window.location.href = `/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`;
    }
  }
}

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = readAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    if (!config.baseURL && typeof window !== "undefined") {
      return Promise.reject({
        message:
          "API URL is not configured. Set NEXT_PUBLIC_API_URL for this deployment.",
        status: 0,
      } satisfies ApiError);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/** Single-flight refresh: concurrent 401s share one refresh call */
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const refreshToken = readRefreshToken();
        const { data } = await axios.post(
          `${baseURL}/auth/refresh`,
          refreshToken ? { refresh_token: refreshToken } : {},
          { timeout: 15000 },
        );
        const access = data?.access_token as string | undefined;
        if (!access) return null;
        writeAccessToken(access);
        if (data.refresh_token) {
          sessionStorage.setItem("refresh_token", data.refresh_token);
        }
        return access;
      } catch {
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string | string[]; statusCode?: number }>) => {
    const status = error.response?.status;
    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      status === 401 &&
      original &&
      !original._retry &&
      typeof window !== "undefined" &&
      !original.url?.includes("/auth/login") &&
      !original.url?.includes("/auth/signup") &&
      !original.url?.includes("/auth/refresh")
    ) {
      original._retry = true;
      const newToken = await refreshAccessToken();
      if (newToken) {
        original.headers = original.headers || {};
        original.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(original);
      }
      hardLogout();
    }

    const raw =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";
    const message = Array.isArray(raw) ? raw.join(", ") : raw;

    const normalized: ApiError = {
      message,
      status,
      original: error,
    };
    return Promise.reject(normalized);
  },
);

export default apiClient;
