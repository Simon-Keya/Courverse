"use client";

import { useQuery } from "@tanstack/react-query";
import { getPublishers } from "../api/get-publishers";
import { publisherCacheKeys } from "../api/publisher.cache";
import type { GetPublishersDto } from "../types";

export function usePublishers(params: Partial<GetPublishersDto> = {}) {
  return useQuery({
    queryKey: publisherCacheKeys.list(params),
    queryFn: () => getPublishers(params),
    staleTime: 60_000,
  });
}
