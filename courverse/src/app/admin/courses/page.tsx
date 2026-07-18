"use client";

import { useMemo, useState } from "react";
import { adminCoursesQueue } from "@/data/admin-mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Filter = "all" | "pending_review" | "published";

const statusVariant: Record<string, "primary" | "info" | "neutral"> = {
  published: "primary",
  pending_review: "info",
};

const tabs: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending_review", label: "Pending review" },
  { id: "published", label: "Published" },
];

export default function AdminCoursesPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return adminCoursesQueue;
    return adminCoursesQueue.filter((c) => c.status === filter);
  }, [filter]);

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Courses</h1>
      <p className="mt-1 text-text-secondary">Review submissions and manage published courses.</p>

      <div className="mt-6 flex w-fit items-center gap-1 rounded-input border border-border bg-white p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`rounded-btn px-4 py-2 text-sm font-medium transition-colors ${
              filter === tab.id ? "bg-primary-light text-primary-hover" : "text-text-secondary hover:text-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {filtered.map((c) => (
          <div key={c.id} className="card-surface flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-heading font-semibold text-text">{c.title}</p>
                <Badge variant={statusVariant[c.status] ?? "neutral"} className="capitalize">
                  {c.status.replace("_", " ")}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-text-secondary">By {c.publisher} · Submitted {c.submitted}</p>
            </div>
            {c.status === "pending_review" && (
              <div className="flex shrink-0 items-center gap-2">
                <Button size="sm" variant="secondary">Preview</Button>
                <Button size="sm">Approve</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
