"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { coursesApi, type CourseListParams } from "@/api/modules/courses";
import { enrollmentsApi } from "@/api/modules/enrollments";
import { progressApi } from "@/api/modules/progress";
import { certificatesApi } from "@/api/modules/certificates";
import { categoriesApi } from "@/api/modules/categories";

export function useCourses(params: CourseListParams = {}) {
  return useQuery({
    queryKey: ["courses", params],
    queryFn: () => coursesApi.list(params),
    staleTime: 60_000,
  });
}

export function useCourse(id: string | undefined) {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => coursesApi.getById(id!),
    enabled: !!id,
    staleTime: 60_000,
  });
}

export function useCourseBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ["course-slug", slug],
    queryFn: () => coursesApi.getBySlug(slug!),
    enabled: !!slug,
  });
}

export function useMyEnrollments() {
  return useQuery({
    queryKey: ["enrollments", "me"],
    queryFn: () => enrollmentsApi.myEnrollments(),
    staleTime: 30_000,
  });
}

export function useEnrollment(courseId: string | undefined) {
  return useQuery({
    queryKey: ["enrollment", courseId],
    queryFn: () => enrollmentsApi.getOne(courseId!),
    enabled: !!courseId,
  });
}

export function useEnroll() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (courseId: string) => enrollmentsApi.enroll(courseId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["enrollments"] });
      qc.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useCompleteLesson() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (lessonId: string) => progressApi.completeLesson(lessonId),
    onSuccess: (_data, lessonId) => {
      qc.invalidateQueries({ queryKey: ["progress"] });
      qc.invalidateQueries({ queryKey: ["enrollments"] });
      qc.invalidateQueries({ queryKey: ["course"] });
    },
  });
}

export function useCourseProgress(courseId: string | undefined) {
  return useQuery({
    queryKey: ["progress", "course", courseId],
    queryFn: () => progressApi.getCourseProgress(courseId!),
    enabled: !!courseId,
  });
}

export function useMyCertificates() {
  return useQuery({
    queryKey: ["certificates", "me"],
    queryFn: () => certificatesApi.myCertificates(),
    staleTime: 60_000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesApi.list(),
    staleTime: 5 * 60_000,
  });
}
