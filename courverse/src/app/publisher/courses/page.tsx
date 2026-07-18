"use client";

import { useMemo, useState } from "react";
import { Star, Users, DollarSign, MoreVertical } from "lucide-react";
import { publisherCourses } from "@/data/publisher-mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Filter = "all" | "published" | "review" | "draft";

const statusVariant: Record<string, "primary" | "info" | "neutral"> = {
  published: "primary",
  review: "info",
  draft: "neutral",
};

const tabs: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "published", label: "Published" },
  { id: "review", label: "In review" },
  { id: "draft", label: "Drafts" },
];

export default function PublisherCoursesPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return publisherCourses;
    return publisherCourses.filter((c) => c.status === filter);
  }, [filter]);

  return (
    <div className="container-page py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text">Your courses</h1>
          <p className="mt-1 text-text-secondary">{publisherCourses.length} total courses.</p>
        </div>
        <Button>+ New course</Button>
      </div>

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

      <div className="mt-6 space-y-4">
        {filtered.map((course) => (
          <div key={course.id} className="card-surface flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-heading font-semibold text-text">{course.title}</p>
                <Badge variant={statusVariant[course.status] ?? "neutral"} className="capitalize">
                  {course.status.replace("_", " ")}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-text-secondary">Last updated {course.lastUpdated}</p>
            </div>

            <div className="flex shrink-0 items-center gap-5 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" /> {course.students.toLocaleString()}
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-reward text-reward" /> {course.rating || "—"}
              </span>
              <span className="flex items-center gap-1.5">
                <DollarSign className="h-4 w-4" /> {course.revenue.toLocaleString()}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Button size="sm" variant="secondary">Edit</Button>
              <button aria-label="More options" className="rounded-btn p-2 text-text-secondary hover:bg-background-secondary">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
