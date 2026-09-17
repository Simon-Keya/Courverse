"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { usePublisherCourses } from "@/hooks/use-publisher";

export default function PublisherCoursesPage() {
  const query = usePublisherCourses();
  const list = query.data?.data ?? [];

  return (
    <div className="container-page py-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text">Your courses</h1>
          <p className="mt-1 text-sm text-text-secondary">Live list from /courses/publisher/mine</p>
        </div>
      </div>
      {query.isLoading && (
        <div className="mt-10 flex items-center gap-2 text-text-secondary">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      )}
      {query.isError && (
        <div className="mt-8 rounded-card border border-border bg-card p-6 text-sm">
          Could not load courses.{" "}
          <button type="button" className="font-semibold text-primary" onClick={() => query.refetch()}>
            Retry
          </button>
        </div>
      )}
      {!query.isLoading && !query.isError && list.length === 0 && (
        <div className="mt-8 rounded-card border border-border bg-card p-6 text-sm text-text-secondary">
          No courses yet.
        </div>
      )}
      <ul className="mt-6 divide-y divide-border rounded-card border border-border bg-card">
        {list.map((c) => (
          <li key={c.id} className="flex items-center justify-between px-5 py-3">
            <div>
              <p className="text-sm font-medium text-text">{c.title}</p>
              <p className="text-xs text-text-secondary">{c.status}</p>
            </div>
            <Link href={`/courses/${c.id}`} className="text-xs font-semibold text-primary">
              View
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
