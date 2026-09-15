import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Request interceptor — attach token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor — basic error normalization
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string | string[]; statusCode?: number }>) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";
    const status = error.response?.status;

    // Auto-logout on 401
    if (status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      // Optional: redirect handled by consumers
    }

    return Promise.reject({
      message: Array.isArray(message) ? message.join(", ") : message,
      status,
      original: error,
    });
  },
);

export default apiClient;
