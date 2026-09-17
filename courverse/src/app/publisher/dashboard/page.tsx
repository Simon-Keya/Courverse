"use client";

import Link from "next/link";
import { BookOpen, Loader2, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { publisherApi } from "@/api/modules/publisher";

export default function PublisherDashboardPage() {
  const courses = useQuery({
    queryKey: ["publisher", "my-courses"],
    queryFn: () => publisherApi.myCourses({ limit: 10 }),
  });

  const list = courses.data?.data ?? [];
  const total = courses.data?.meta?.total ?? list.length;

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Publisher dashboard</h1>
      <p className="mt-1 text-text-secondary">Your courses from the live API.</p>

      {courses.isError && (
        <div className="mt-6 rounded-card border border-border bg-card p-4 text-sm">
          Could not load your courses.{" "}
          <button type="button" className="font-semibold text-primary" onClick={() => courses.refetch()}>
            Retry
          </button>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="card-surface p-5">
          <BookOpen className="h-5 w-5 text-primary" />
          <p className="mt-3 font-heading text-2xl font-bold text-text">
            {courses.isLoading ? "…" : total}
          </p>
          <p className="text-xs text-text-secondary">Your courses</p>
        </div>
        <div className="card-surface p-5">
          <p className="font-heading text-2xl font-bold text-text">—</p>
          <p className="text-xs text-text-secondary">Students (API pending)</p>
        </div>
        <div className="card-surface p-5">
          <p className="font-heading text-2xl font-bold text-text">—</p>
          <p className="text-xs text-text-secondary">Earnings (API pending)</p>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold text-text">Recent courses</h2>
        <Link href="/publisher/courses" className="flex items-center gap-1 text-sm font-semibold text-primary">
          Manage <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-4 card-surface divide-y divide-border">
        {courses.isLoading && (
          <div className="flex items-center gap-2 px-5 py-8 text-sm text-text-secondary">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        )}
        {!courses.isLoading && list.length === 0 && (
          <div className="px-5 py-8 text-sm text-text-secondary">
            No courses yet.{" "}
            <Link href="/publisher/courses" className="font-semibold text-primary">
              Create one
            </Link>
          </div>
        )}
        {list.map((c) => (
          <div key={c.id} className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="font-medium text-text">{c.title}</p>
              <p className="text-xs text-text-secondary">{c.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
