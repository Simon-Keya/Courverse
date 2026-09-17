"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, type LoginPayload, type SignupPayload } from "@/api/modules/auth";
import { useAuthStore } from "@/store/auth.store";
import { useRouter, useSearchParams } from "next/navigation";
import { roleHome } from "@/permissions/roles";

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();
  const searchParams = useSearchParams();

  return useMutation({
    mutationFn: (payload: LoginPayload & { remember?: boolean }) => {
      const { remember: _r, ...body } = payload;
      return authApi.login(body);
    },
    onSuccess: (data, variables) => {
      const remember = Boolean(
        (variables as LoginPayload & { remember?: boolean }).remember,
      );
      setAuth(data.user, data.access_token, remember);

      const callback = searchParams.get("callbackUrl");
      const safeCallback =
        callback && callback.startsWith("/") && !callback.startsWith("//")
          ? callback
          : null;

      if (safeCallback) {
        router.push(safeCallback);
      } else {
        router.push(roleHome(data.user.role));
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
      setAuth(data.user, data.access_token, false);
      router.push(roleHome(data.user.role));
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
