"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/api/modules/auth";

const TOKEN_KEY = "access_token";
const COOKIE_NAME = "accessToken";

function setTokenCookie(token: string | null) {
  if (typeof document === "undefined") return;
  if (token) {
    // 7 days; middleware reads this for route protection (UX only — backend still authorizes)
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
  } else {
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
  }
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: AuthUser, token: string) => void;
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

      setAuth: (user, token) => {
        if (typeof window !== "undefined") {
          localStorage.setItem(TOKEN_KEY, token);
          setTokenCookie(token);
        }
        set({ user, token, isAuthenticated: true });
      },

      setUser: (user) => set({ user }),

      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem(TOKEN_KEY);
          setTokenCookie(null);
        }
        set({ user: null, token: null, isAuthenticated: false });
      },

      hydrate: () => {
        if (typeof window === "undefined") return;
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
          setTokenCookie(token);
          if (!get().token) {
            set({ token, isAuthenticated: true });
          }
        }
      },
    }),
    {
      name: "courverse-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
