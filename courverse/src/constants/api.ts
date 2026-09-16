import { env } from "@/config/env";

/** Canonical API base URL (empty string if missing in production). */
export const API_BASE_URL = env.apiUrl;

export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    profile: "/auth/profile",
    me: "/auth/me",
  },
  courses: "/courses",
  enrollments: "/enrollments",
  progress: "/progress",
  categories: "/categories",
  certificates: "/certificates",
  notifications: "/notifications",
  wishlist: "/wishlist",
} as const;
