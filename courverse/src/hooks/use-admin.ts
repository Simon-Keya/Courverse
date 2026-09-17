"use client";

import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/api/modules/admin";

export function useAdminOverview() {
  return useQuery({
    queryKey: ["admin", "overview"],
    queryFn: () => adminApi.overview(),
    staleTime: 30_000,
  });
}

export function useAdminCourses(status?: string) {
  return useQuery({
    queryKey: ["admin", "courses", status ?? "all"],
    queryFn: () => adminApi.courses({ status }),
    staleTime: 30_000,
  });
}

export function useAdminPendingCourses() {
  return useQuery({
    queryKey: ["admin", "pending-courses"],
    queryFn: () => adminApi.pendingCourses(),
    staleTime: 30_000,
  });
}

export function useAdminCategories() {
  return useQuery({
    queryKey: ["admin", "categories"],
    queryFn: () => adminApi.categories(),
    staleTime: 60_000,
  });
}

export function useAdminPublishers() {
  return useQuery({
    queryKey: ["admin", "publishers"],
    queryFn: () => adminApi.publishers(),
    staleTime: 60_000,
  });
}

export function useAdminUsers() {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: () => adminApi.users(),
    staleTime: 60_000,
    retry: 1,
  });
}

export function useAdminRewards() {
  return useQuery({
    queryKey: ["admin", "rewards"],
    queryFn: () => adminApi.rewards(),
    staleTime: 60_000,
  });
}
