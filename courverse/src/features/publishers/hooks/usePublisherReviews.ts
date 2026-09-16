"use client";

import { useQuery } from "@tanstack/react-query";
import { getPublisherReviews } from "../api/get-publisher-reviews";
import { publisherCacheKeys } from "../api/publisher.cache";
import type { GetPublisherReviewsDto } from "../types";

export function usePublisherReviews(
  params: GetPublisherReviewsDto | undefined,
) {
  return useQuery({
    queryKey: publisherCacheKeys.reviews(
      params?.publisherId ?? "",
      params,
    ),
    queryFn: () => getPublisherReviews(params!),
    enabled: !!params?.publisherId,
    staleTime: 60_000,
  });
}
