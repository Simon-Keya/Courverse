"use client";

import Link from "next/link";
import { BookOpen, Loader2, ArrowRight } from "lucide-react";
import { useMyEnrollments } from "@/hooks/use-courses";
import { useAuthStore } from "@/store/auth.store";

export default function LearnerDashboardPage() {
  const user = useAuthStore((s) => s.user);
  const enrollments = useMyEnrollments();
  const list = enrollments.data ?? [];

  const name =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    "Learner";

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">
        Welcome back{name ? `, ${name}` : ""}
      </h1>
      <p className="mt-1 text-text-secondary">Continue learning from your enrollments.</p>

      {enrollments.isError && (
        <div className="mt-6 rounded-card border border-border bg-card p-4 text-sm">
          Could not load enrollments.{" "}
          <button
            type="button"
            className="font-semibold text-primary"
            onClick={() => enrollments.refetch()}
          >
            Retry
          </button>
        </div>
      )}

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-text">My learning</h2>
          <Link
            href="/my-learning"
            className="flex items-center gap-1 text-sm font-semibold text-primary"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {enrollments.isLoading && (
          <div className="mt-6 flex items-center gap-2 text-text-secondary">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        )}

        {!enrollments.isLoading && list.length === 0 && (
          <div className="mt-6 rounded-card border border-border bg-card p-8 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-primary" />
            <p className="mt-3 font-medium text-text">No enrollments yet</p>
            <Link href="/courses" className="btn-primary mt-4 inline-flex">
              Browse courses
            </Link>
          </div>
        )}

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {list.slice(0, 4).map((e: { id: string; course?: { id: string; title: string }; progressPercent?: number }) => (
            <Link
              key={e.id}
              href={e.course?.id ? `/courses/${e.course.id}/learn` : "/my-learning"}
              className="card-surface p-5"
            >
              <p className="font-medium text-text">{e.course?.title ?? "Course"}</p>
              <p className="mt-2 text-xs text-text-secondary">
                Progress: {e.progressPercent ?? 0}%
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
