"use client";

import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "@/api/modules/categories";
import { publishersApi } from "@/api/modules/publishers";
import { adminApi } from "@/api/modules/admin";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesApi.list(),
    staleTime: 5 * 60_000,
  });
}

export function usePublishers() {
  return useQuery({
    queryKey: ["publishers"],
    queryFn: () => publishersApi.list(),
    staleTime: 5 * 60_000,
  });
}

export function useAdminOverview() {
  return useQuery({
    queryKey: ["admin", "overview"],
    queryFn: () => adminApi.courseStats(),
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
