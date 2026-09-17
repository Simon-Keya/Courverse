"use client";

import Link from "next/link";
import { BookOpen, Loader2 } from "lucide-react";
import { useMyEnrollments } from "@/hooks/use-courses";

export default function MyLearningPage() {
  const { data, isLoading, isError, refetch } = useMyEnrollments();
  const list = data ?? [];

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">My learning</h1>
      <p className="mt-1 text-text-secondary">Courses you are enrolled in.</p>

      {isLoading && (
        <div className="mt-10 flex items-center gap-2 text-text-secondary">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      )}
      {isError && (
        <div className="mt-8">
          <p className="text-sm text-text-secondary">Could not load enrollments.</p>
          <button type="button" className="btn-primary mt-3" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}
      {!isLoading && !isError && list.length === 0 && (
        <div className="mt-10 rounded-card border border-border bg-card p-10 text-center">
          <BookOpen className="mx-auto h-8 w-8 text-primary" />
          <p className="mt-3 font-medium text-text">No enrollments yet</p>
          <Link href="/courses" className="btn-primary mt-4 inline-flex">
            Browse courses
          </Link>
        </div>
      )}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {list.map((e: { id: string; course?: { id: string; title: string }; progressPercent?: number }) => (
          <Link
            key={e.id}
            href={e.course?.id ? `/courses/${e.course.id}/learn` : "/courses"}
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
  );
}
