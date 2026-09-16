"use client";

import { useQuery } from "@tanstack/react-query";
import { getPublisherCourses } from "../api/get-publisher-courses";
import { publisherCacheKeys } from "../api/publisher.cache";
import type { GetPublisherCoursesDto } from "../types";

export function usePublisherCourses(
  params: GetPublisherCoursesDto | undefined,
) {
  return useQuery({
    queryKey: publisherCacheKeys.courses(
      params?.publisherId ?? "",
      params,
    ),
    queryFn: () => getPublisherCourses(params!),
    enabled: !!params?.publisherId,
    staleTime: 60_000,
  });
}
