"use client";

import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { CourseCard } from "@/components/course/CourseCard";
import { useCourses } from "@/hooks/use-courses";
import { normalizeCourse } from "@/types/course";
import { courses as mockCourses } from "@/data/mock";

export function FeaturedCourses() {
  const { data, isLoading, isError } = useCourses({
    limit: 4,
    sort: "popular",
    status: "published",
  });

  const featured =
    data?.data?.length
      ? data.data.map(normalizeCourse)
      : mockCourses.slice(0, 4);

  return (
    <section className="container-page py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-text sm:text-3xl">
            Featured courses
          </h2>
          <p className="mt-2 text-text-secondary">
            Hand-picked by practitioners. Start learning today.
          </p>
        </div>
        <Link
          href="/courses"
          className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {isLoading && !data ? (
        <div className="mt-10 flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}

      <div className="mt-8 text-center sm:hidden">
        <Link href="/courses" className="text-sm font-medium text-primary hover:underline">
          View all courses →
        </Link>
      </div>
    </section>
  );
}
