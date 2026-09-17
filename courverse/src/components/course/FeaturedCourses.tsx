"use client";

import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { CourseCard } from "@/components/course/CourseCard";
import { useCourses } from "@/hooks/use-courses";
import { normalizeCourse } from "@/types/course";

export function FeaturedCourses() {
  const { data, isLoading, isError, refetch } = useCourses({
    limit: 4,
    sort: "popular",
  });

  const featured = data?.data?.length ? data.data.map(normalizeCourse) : [];

  return (
    <section className="container-page py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-text sm:text-3xl">
            Featured courses
          </h2>
          <p className="mt-2 text-text-secondary">
            Discover published courses from the catalog.
          </p>
        </div>
        <Link
          href="/courses"
          className="hidden items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover sm:flex"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {isLoading && (
        <div className="mt-10 flex items-center justify-center gap-2 text-text-secondary">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading courses…
        </div>
      )}

      {isError && (
        <div className="mt-10 rounded-card border border-border bg-card p-8 text-center">
          <p className="text-sm text-text-secondary">Could not load featured courses.</p>
          <button type="button" className="btn-primary mt-4" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && featured.length === 0 && (
        <div className="mt-10 rounded-card border border-border bg-card p-8 text-center text-sm text-text-secondary">
          No published courses yet.
        </div>
      )}

      {featured.length > 0 && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}
