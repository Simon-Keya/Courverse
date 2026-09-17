"use client";

import Link from "next/link";
import { Users, BookOpen, Building2, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAdminOverview, useAdminPendingCourses } from "@/hooks/use-catalog";

export default function AdminDashboardPage() {
  const overview = useAdminOverview();
  const pending = useAdminPendingCourses();

  const stats = overview.data;
  const pendingList = pending.data?.data ?? [];

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Admin dashboard</h1>
      <p className="mt-1 text-text-secondary">
        Platform overview from live course data. User and revenue metrics require dedicated admin APIs.
      </p>

      {(overview.isError || pending.isError) && (
        <div className="mt-6 rounded-card border border-border bg-card p-4 text-sm text-text-secondary">
          Could not load admin metrics. Confirm you are signed in as admin and that the API is reachable.
          <button
            type="button"
            className="ml-3 font-semibold text-primary"
            onClick={() => {
              overview.refetch();
              pending.refetch();
            }}
          >
            Retry
          </button>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="card-surface p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary">
            <BookOpen className="h-4 w-4" />
          </span>
          <p className="mt-3 font-heading text-xl font-bold text-text">
            {overview.isLoading ? "…" : (stats?.totalCourses ?? "—")}
          </p>
          <p className="text-xs text-text-secondary">Total courses</p>
        </div>
        <div className="card-surface p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-info">
            <AlertCircle className="h-4 w-4" />
          </span>
          <p className="mt-3 font-heading text-xl font-bold text-text">
            {overview.isLoading ? "…" : (stats?.pendingReview ?? "—")}
          </p>
          <p className="text-xs text-text-secondary">Pending review</p>
        </div>
        <div className="card-surface p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-50 text-premium">
            <Building2 className="h-4 w-4" />
          </span>
          <p className="mt-3 font-heading text-xl font-bold text-text">
            {overview.isLoading ? "…" : (stats?.publishedCourses ?? "—")}
          </p>
          <p className="text-xs text-text-secondary">Published</p>
        </div>
        <div className="card-surface p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background-secondary text-text-secondary">
            <Users className="h-4 w-4" />
          </span>
          <p className="mt-3 font-heading text-xl font-bold text-text">—</p>
          <p className="text-xs text-text-secondary">Users (API pending)</p>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-text">Review queue</h2>
          <Link
            href="/admin/courses"
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-4 card-surface divide-y divide-border">
          {pending.isLoading && (
            <div className="flex items-center justify-center gap-2 px-5 py-10 text-sm text-text-secondary">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading queue…
            </div>
          )}
          {!pending.isLoading && pendingList.length === 0 && (
            <div className="px-5 py-10 text-center text-sm text-text-secondary">
              No courses awaiting review.
            </div>
          )}
          {pendingList.map((c) => (
            <div key={c.id} className="flex items-center justify-between gap-3 px-5 py-4">
              <div>
                <p className="font-medium text-text">{c.title}</p>
                <p className="text-xs text-text-secondary">{c.status}</p>
              </div>
              <Badge variant="info">Pending</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
