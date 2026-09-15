"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Loader2, BookOpen } from "lucide-react";
import { CourseCard } from "@/components/course/CourseCard";
import { useMyEnrollments } from "@/hooks/use-courses";
import { normalizeCourse, type Course } from "@/types/course";
import { useAuthStore } from "@/store/auth.store";
import { courses as mockCourses } from "@/data/mock";
import { Button } from "@/components/ui/button";

type Status = "all" | "in-progress" | "completed";

const tabs: { id: Status; label: string }[] = [
  { id: "all", label: "All" },
  { id: "in-progress", label: "In progress" },
  { id: "completed", label: "Completed" },
];

export default function MyLearningPage() {
  const [status, setStatus] = useState<Status>("all");
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { data: enrollments, isLoading, isError } = useMyEnrollments();

  const enrolledCourses: Course[] = useMemo(() => {
    if (enrollments?.length) {
      return enrollments.map((e) => {
        const base = e.course ? normalizeCourse(e.course) : normalizeCourse({ id: e.courseId, title: "Course", description: "", price: 0, rating: 0, publisher: { id: "", name: "—" } });
        return {
          ...base,
          progress: e.progressPercentage,
        };
      });
    }
    // Mock fallback for demo
    if (isError || (!isLoading && !enrollments)) {
      return mockCourses
        .filter((c) => typeof c.progress === "number")
        .map((c) => normalizeCourse(c));
    }
    return [];
  }, [enrollments, isError, isLoading]);

  const filtered = useMemo(() => {
    if (status === "in-progress") return enrolledCourses.filter((c) => (c.progress ?? 0) < 100);
    if (status === "completed") return enrolledCourses.filter((c) => (c.progress ?? 0) >= 100);
    return enrolledCourses;
  }, [status, enrolledCourses]);

  if (!isAuthenticated && !isLoading) {
    return (
      <div className="container-page py-16 text-center">
        <BookOpen className="mx-auto h-12 w-12 text-text-secondary" />
        <h1 className="mt-4 font-heading text-2xl font-bold text-text">My Learning</h1>
        <p className="mt-2 text-text-secondary">Log in to see your enrolled courses.</p>
        <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-btn bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-hover mt-6">Log in</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">My Learning</h1>
      <p className="mt-1 text-text-secondary">
        {isLoading ? "Loading…" : `${enrolledCourses.length} enrolled courses.`}
        {isError && (
          <span className="ml-2 text-xs text-amber-600">(demo data)</span>
        )}
      </p>

      <div className="mt-6 flex w-fit items-center gap-1 rounded-input border border-border bg-white p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatus(tab.id)}
            className={`rounded-btn px-4 py-2 text-sm font-medium transition-colors ${
              status === tab.id
                ? "bg-primary-light text-primary-hover"
                : "text-text-secondary hover:text-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="mt-16 flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-10 rounded-card border border-dashed border-border py-16 text-center">
          <p className="font-heading font-semibold text-text">Nothing here yet</p>
          <p className="mt-1 text-sm text-text-secondary">
            Courses you enroll in will show up here.
          </p>
          <Link href="/courses" className="inline-flex items-center justify-center gap-2 rounded-btn border border-border bg-white px-5 py-2.5 text-sm font-semibold text-text shadow-sm transition-all hover:bg-background-secondary mt-4">Browse courses</Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
