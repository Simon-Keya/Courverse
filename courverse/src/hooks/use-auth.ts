"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, type LoginPayload, type SignupPayload } from "@/api/modules/auth";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (data) => {
      setAuth(data.user, data.access_token);
      const role = data.user.role;
      if (role === "admin" || role === "super_admin") {
        router.push("/admin/dashboard");
      } else if (role === "publisher") {
        router.push("/publisher/dashboard");
      } else {
        router.push("/dashboard");
      }
    },
  });
}

export function useSignup() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: SignupPayload) => authApi.signup(payload),
    onSuccess: (data) => {
      setAuth(data.user, data.access_token);
      router.push("/dashboard");
    },
  });
}

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();
  const qc = useQueryClient();

  return () => {
    logout();
    qc.clear();
    router.push("/login");
  };
}

export function useProfile() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => authApi.profile(),
    enabled: isAuthenticated,
    staleTime: 5 * 60_000,
  });
}
