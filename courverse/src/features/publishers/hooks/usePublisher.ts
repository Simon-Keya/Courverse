"use client";

import { useQuery } from "@tanstack/react-query";
import { getPublisher } from "../api/get-publisher";
import { publisherCacheKeys } from "../api/publisher.cache";

export function usePublisher(id: string | undefined) {
  return useQuery({
    queryKey: publisherCacheKeys.detail(id ?? ""),
    queryFn: () => getPublisher(id!),
    enabled: !!id,
    staleTime: 60_000,
  });
}
