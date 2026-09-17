"use client";

import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/api/client";

export default function AdminSettingsPage() {
  const query = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: async () => {
      const { data } = await apiClient.get("/admin/settings");
      return Array.isArray(data) ? data : data?.data ?? data ?? [];
    },
    retry: 1,
  });

  const list = Array.isArray(query.data) ? query.data : [];

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Admin · Settings</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Requests <code className="text-xs">/admin/settings</code>. See MIGRATION-NOTES if this 404s.
      </p>
      {query.isLoading && (
        <div className="mt-10 flex items-center gap-2 text-text-secondary">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      )}
      {query.isError && (
        <div className="mt-8 rounded-card border border-border bg-card p-6 text-sm text-text-secondary">
          Endpoint unavailable or unauthorized. 
          <button type="button" className="font-semibold text-primary" onClick={() => query.refetch()}>
            Retry
          </button>
        </div>
      )}
      {!query.isLoading && !query.isError && list.length === 0 && (
        <div className="mt-8 rounded-card border border-border bg-card p-6 text-sm text-text-secondary">
          No settings data.
        </div>
      )}
      {list.length > 0 && (
        <pre className="mt-8 overflow-auto rounded-card border border-border bg-card p-4 text-xs">
          {JSON.stringify(list, null, 2)}
        </pre>
      )}
    </div>
  );
}
