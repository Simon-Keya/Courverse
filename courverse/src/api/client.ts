import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
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
    localStorage.getItem("access_token") // legacy cleanup path
  );
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

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string | string[]; statusCode?: number }>) => {
    const raw =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";
    const message = Array.isArray(raw) ? raw.join(", ") : raw;
    const status = error.response?.status;

    if (status === 401 && typeof window !== "undefined") {
      sessionStorage.removeItem("access_token");
      localStorage.removeItem("access_token");
      document.cookie =
        "accessToken=; path=/; max-age=0; SameSite=Strict";
    }

    const normalized: ApiError = {
      message,
      status,
      original: error,
    };
    return Promise.reject(normalized);
  },
);

export default apiClient;
