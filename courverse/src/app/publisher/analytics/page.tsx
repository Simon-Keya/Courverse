"use client";

import { Loader2 } from "lucide-react";
import { usePublisherAnalytics } from "@/hooks/use-publisher";

export default function PublisherAnalyticsPage() {
  const query = usePublisherAnalytics();
  const data = query.data;
  const list = Array.isArray(data) ? data : [];

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Publisher · Analytics</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Live request on load. If this errors, the backend path is listed in MIGRATION-NOTES.md.
      </p>
      {query.isLoading && (
        <div className="mt-10 flex items-center gap-2 text-text-secondary">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      )}
      {query.isError && (
        <div className="mt-8 rounded-card border border-border bg-card p-6 text-sm text-text-secondary">
          Endpoint unavailable or unauthorized.{" "}
          <button type="button" className="font-semibold text-primary" onClick={() => query.refetch()}>
            Retry
          </button>
        </div>
      )}
      {!query.isLoading && !query.isError && list.length === 0 && !data && (
        <div className="mt-8 rounded-card border border-border bg-card p-6 text-sm text-text-secondary">
          No analytics data.
        </div>
      )}
      {!query.isLoading && !query.isError && (list.length > 0 || (data && !Array.isArray(data))) && (
        <pre className="mt-8 overflow-auto rounded-card border border-border bg-card p-4 text-xs">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
