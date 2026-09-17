"use client";

import { Loader2 } from "lucide-react";
import { useAdminRewards } from "@/hooks/use-admin";

export default function AdminRewardsPage() {
  const query = useAdminRewards();
  const rows = (query.data as { data?: unknown[] } | unknown[] | undefined);
  const list: unknown[] = Array.isArray(rows)
    ? rows
    : Array.isArray((rows as { data?: unknown[] })?.data)
      ? ((rows as { data: unknown[] }).data)
      : [];

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Admin · Rewards</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Live data from the API. Empty means no records — not a placeholder.
      </p>
      {query.isLoading && (
        <div className="mt-10 flex items-center gap-2 text-text-secondary">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading rewards…
        </div>
      )}
      {query.isError && (
        <div className="mt-8 rounded-card border border-border bg-card p-6">
          <p className="text-sm text-text-secondary">
            Could not load rewards. The endpoint may not be available yet.
          </p>
          <button type="button" className="btn-primary mt-3" onClick={() => query.refetch()}>
            Retry
          </button>
        </div>
      )}
      {!query.isLoading && !query.isError && list.length === 0 && (
        <div className="mt-8 rounded-card border border-border bg-card p-6 text-sm text-text-secondary">
          No rewards found.
        </div>
      )}
      {!query.isLoading && list.length > 0 && (
        <ul className="mt-8 divide-y divide-border rounded-card border border-border bg-card">
          {list.map((row, i) => {
            const r = row as Record<string, unknown>;
            const labelText =
              (r["name"] as string) ||
              (r["title"] as string) ||
              (r["name"] as string) ||
              (r["email"] as string) ||
              (r["id"] as string) ||
              `Item ${i + 1}`;
            return (
              <li key={String(r.id ?? i)} className="px-5 py-3 text-sm text-text">
                {labelText}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
