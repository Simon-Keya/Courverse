"use client";

import { useQuery } from "@tanstack/react-query";
import { getPublisherReviews } from "../api/get-publisher-reviews";
import { publisherCacheKeys } from "../api/publisher.cache";
import type { GetPublisherReviewsDto } from "../types";

export function usePublisherReviews(
  params: GetPublisherReviewsDto | undefined,
) {
  const publisherId = params?.publisherId ?? "";
  return useQuery({
    queryKey: publisherCacheKeys.reviews(publisherId, params),
    queryFn: () => getPublisherReviews(params!),
    enabled: Boolean(params?.publisherId),
    staleTime: 60_000,
  });
}
