"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { adminReports, adminRevenueTrend, platformStats } from "@/data/admin-mock";
import { BarChart } from "@/components/charts/BarChart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Filter = "all" | "open" | "investigating" | "resolved";

const statusVariant: Record<string, "neutral" | "info" | "primary"> = {
  open: "neutral",
  investigating: "info",
  resolved: "primary",
};

const tabs: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "open", label: "Open" },
  { id: "investigating", label: "Investigating" },
  { id: "resolved", label: "Resolved" },
];

export default function AdminReportsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = filter === "all" ? adminReports : adminReports.filter((r) => r.status === filter);

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Reports</h1>
      <p className="mt-1 text-text-secondary">Platform revenue and moderation queue.</p>

      <div className="mt-6 card-surface p-6">
        <div className="flex items-center justify-between">
          <p className="font-heading font-semibold text-text">Platform revenue</p>
          <span className="text-sm text-text-secondary">Total: ${platformStats.totalRevenue.toLocaleString()}</span>
        </div>
        <div className="mt-6">
          <BarChart data={adminRevenueTrend} valueFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold text-text">Moderation queue</h2>
        <div className="flex w-fit items-center gap-1 rounded-input border border-border bg-white p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`rounded-btn px-3.5 py-1.5 text-xs font-medium transition-colors ${
                filter === tab.id ? "bg-primary-light text-primary-hover" : "text-text-secondary hover:text-text"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 card-surface divide-y divide-border">
        {filtered.map((r) => (
          <div key={r.id} className="flex items-start gap-4 px-6 py-4">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-text">{r.type}</p>
                <Badge variant={statusVariant[r.status]} className="capitalize">{r.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-text-secondary">{r.target}</p>
              <p className="mt-1 text-xs text-text-secondary">Reported by {r.reporter} · {r.date}</p>
            </div>
            {r.status !== "resolved" && <Button size="sm" variant="secondary" className="shrink-0">Investigate</Button>}
          </div>
        ))}
      </div>
    </div>
  );
}
