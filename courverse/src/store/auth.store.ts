"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/api/modules/auth";

const TOKEN_KEY = "access_token";
const COOKIE_NAME = "accessToken";

/**
 * Cookie is readable by middleware for UX redirects only.
 * Production target: HttpOnly cookie set by backend / Route Handler (see MIGRATION-NOTES.md).
 * Until then we keep a non-HttpOnly cookie so Edge middleware can gate routes by role.
 */
function setTokenCookie(token: string | null, remember = false) {
  if (typeof document === "undefined") return;
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  if (token) {
    const maxAge = remember ? 60 * 60 * 24 * 7 : 60 * 60 * 8; // 7d vs 8h
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; SameSite=Strict${secure}`;
  } else {
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Strict${secure}`;
  }
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: AuthUser, token: string, remember?: boolean) => void;
  setUser: (user: AuthUser) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token, remember = false) => {
        if (typeof window !== "undefined") {
          // Temporary until HttpOnly proxy: needed for Axios Bearer
          sessionStorage.setItem(TOKEN_KEY, token);
          localStorage.removeItem(TOKEN_KEY);
          setTokenCookie(token, remember);
        }
        set({ user, token, isAuthenticated: true });
      },

      setUser: (user) => set({ user }),

      logout: () => {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(TOKEN_KEY);
          setTokenCookie(null);
        }
        set({ user: null, token: null, isAuthenticated: false });
      },

      hydrate: () => {
        if (typeof window === "undefined") return;
        // Migrate old localStorage token once
        const legacy = localStorage.getItem(TOKEN_KEY);
        const session = sessionStorage.getItem(TOKEN_KEY);
        const token = session || legacy;
        if (legacy) localStorage.removeItem(TOKEN_KEY);
        if (token) {
          sessionStorage.setItem(TOKEN_KEY, token);
          setTokenCookie(token);
          if (!get().token) {
            set({ token, isAuthenticated: true });
          }
        }
      },
    }),
    {
      name: "courverse-auth",
      // Never persist the JWT — only non-sensitive user profile for UI
      partialize: (state) => ({
        user: state.user
          ? {
              id: state.user.id,
              email: state.user.email,
              username: state.user.username,
              role: state.user.role,
              firstName: state.user.firstName,
              lastName: state.user.lastName,
              avatarUrl: state.user.avatarUrl,
            }
          : null,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
