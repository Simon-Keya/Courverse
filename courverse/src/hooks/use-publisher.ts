"use client";

import { useQuery } from "@tanstack/react-query";
import { publisherApi } from "@/api/modules/publisher";
import apiClient from "@/api/client";

export function usePublisherCourses() {
  return useQuery({
    queryKey: ["publisher", "courses"],
    queryFn: () => publisherApi.myCourses({ limit: 50 }),
    staleTime: 30_000,
  });
}

export function usePublisherStudents() {
  return useQuery({
    queryKey: ["publisher", "students"],
    queryFn: async () => {
      const { data } = await apiClient.get("/publishers/me/students");
      return Array.isArray(data) ? data : data?.data ?? [];
    },
    retry: 1,
  });
}

export function usePublisherAnalytics() {
  return useQuery({
    queryKey: ["publisher", "analytics"],
    queryFn: async () => {
      const { data } = await apiClient.get("/publishers/me/analytics");
      return data;
    },
    retry: 1,
  });
}

export function usePublisherEarnings() {
  return useQuery({
    queryKey: ["publisher", "earnings"],
    queryFn: async () => {
      const { data } = await apiClient.get("/publishers/me/earnings");
      return data;
    },
    retry: 1,
  });
}

export function usePublisherCertificates() {
  return useQuery({
    queryKey: ["publisher", "certificates"],
    queryFn: async () => {
      const { data } = await apiClient.get("/publishers/me/certificates");
      return Array.isArray(data) ? data : data?.data ?? [];
    },
    retry: 1,
  });
}

export function usePublisherQuizzes() {
  return useQuery({
    queryKey: ["publisher", "quizzes"],
    queryFn: async () => {
      const { data } = await apiClient.get("/quizzes", {
        params: { mine: true },
      });
      return Array.isArray(data) ? data : data?.data ?? [];
    },
    retry: 1,
  });
}
