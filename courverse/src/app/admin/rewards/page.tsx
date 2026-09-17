"use client";

import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/api/client";

/**
 * Phase 3: no mock business data.
 * Wire dedicated admin endpoints as the backend exposes them.
 */
export default function AdminRewardsPage() {
  const title = "rewards".replace(/^\w/, (c) => c.toUpperCase());
  const query = useQuery({
    queryKey: ["admin", "rewards"],
    queryFn: async () => {
      // Prefer real endpoints when available; empty list is valid.
      try {
        if ("rewards" === "courses") {
          const { data } = await apiClient.get("/courses", {
            params: { includeAllStatuses: true, limit: 50 },
          });
          return data?.data ?? [];
        }
        if ("rewards" === "categories") {
          const { data } = await apiClient.get("/categories");
          return Array.isArray(data) ? data : [];
        }
        if ("rewards" === "publishers") {
          const { data } = await apiClient.get("/publishers");
          return Array.isArray(data) ? data : [];
        }
        return [];
      } catch {
        throw new Error("Failed to load");
      }
    },
  });

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Admin · {title}</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Live data only. Empty means no records yet — not demo placeholders.
      </p>
      {query.isLoading && (
        <div className="mt-10 flex items-center gap-2 text-text-secondary">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      )}
      {query.isError && (
        <div className="mt-8 rounded-card border border-border bg-card p-6">
          <p className="text-sm text-text-secondary">Could not load {title.toLowerCase()}.</p>
          <button type="button" className="btn-primary mt-3" onClick={() => query.refetch()}>
            Retry
          </button>
        </div>
      )}
      {!query.isLoading && !query.isError && (
        <div className="mt-8 rounded-card border border-border bg-card p-6">
          {Array.isArray(query.data) && query.data.length > 0 ? (
            <ul className="divide-y divide-border">
              {query.data.slice(0, 50).map((row: { id?: string; name?: string; title?: string; email?: string }, i: number) => (
                <li key={row.id ?? i} className="py-3 text-sm text-text">
                  {row.title || row.name || row.email || row.id || "Record"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-text-secondary">No {title.toLowerCase()} records.</p>
          )}
        </div>
      )}
    </div>
  );
}
