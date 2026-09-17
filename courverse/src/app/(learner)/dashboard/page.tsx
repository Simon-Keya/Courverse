"use client";

import Link from "next/link";
import { Flame, Trophy, BookOpen, TrendingUp, Award, ArrowRight, Loader2 } from "lucide-react";
import { courses as mockCourses, rewards as mockRewards } from "@/data/mock";
import { isDemoMode } from "@/lib/demo";
import { CourseCard } from "@/components/course/CourseCard";
import { useAuthStore } from "@/store/auth.store";
import { useMyEnrollments, useCourses } from "@/hooks/use-courses";
import { normalizeCourse } from "@/types/course";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { data: enrollments, isLoading: loadingEnrollments } = useMyEnrollments();
  const { data: coursesData } = useCourses({ limit: 6, sort: "popular" });

  const inProgress = useMemo(() => {
    if (enrollments?.length) {
      return enrollments
        .filter((e) => e.status === "active" && e.progressPercentage < 100)
        .map((e) => {
          const c = e.course ? normalizeCourse(e.course) : null;
          if (!c) return null;
          return { ...c, progress: e.progressPercentage };
        })
        .filter(Boolean) as ReturnType<typeof normalizeCourse>[];
    }
    return mockCourses.filter((c) => typeof c.progress === "number" && (c.progress ?? 0) < 100);
  }, [enrollments]);

  const completedCount = enrollments?.filter((e) => e.status === "completed" || e.progressPercentage >= 100).length
    ?? mockCourses.filter((c) => c.progress === 100).length;

  const recommended = useMemo(() => {
    if (coursesData?.data?.length) {
      const enrolledIds = new Set(enrollments?.map((e) => e.courseId) || []);
      return coursesData.data
        .filter((c) => !enrolledIds.has(c.id))
        .slice(0, 3)
        .map(normalizeCourse);
    }
    return mockCourses.filter((c) => typeof c.progress !== "number").slice(0, 3);
  }, [coursesData, enrollments]);

  const displayName = user?.firstName || user?.username || "Learner";
  const streak = user?.streak ?? 0;
  const xp = user?.xp ?? 0;
  const earnedRewards = mockRewards.filter((r: any) => r.earned).slice(0, 4);

  if (!isAuthenticated) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="font-heading text-2xl font-bold text-text">Welcome to Courverse</h1>
        <p className="mt-2 text-text-secondary">Log in to see your learning dashboard.</p>
        <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-btn bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-hover mt-6">Log in</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">
        Hello {displayName} 👋
      </h1>
      <p className="mt-1 text-text-secondary">Here&apos;s where you left off.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="card-surface p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-600">
            <Flame className="h-4 w-4" />
          </span>
          <p className="mt-3 font-heading text-xl font-bold text-text">{streak} days</p>
          <p className="text-xs text-text-secondary">Current streak</p>
        </div>
        <div className="card-surface p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-50 text-yellow-600">
            <Trophy className="h-4 w-4" />
          </span>
          <p className="mt-3 font-heading text-xl font-bold text-text">{xp.toLocaleString()} XP</p>
          <p className="text-xs text-text-secondary">Total earned</p>
        </div>
        <div className="card-surface p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary">
            <BookOpen className="h-4 w-4" />
          </span>
          <p className="mt-3 font-heading text-xl font-bold text-text">
            {loadingEnrollments ? "…" : inProgress.length}
          </p>
          <p className="text-xs text-text-secondary">Courses in progress</p>
        </div>
        <div className="card-surface p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <TrendingUp className="h-4 w-4" />
          </span>
          <p className="mt-3 font-heading text-xl font-bold text-text">
            {loadingEnrollments ? "…" : completedCount}
          </p>
          <p className="text-xs text-text-secondary">Courses completed</p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.7fr_1fr]">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-text">Continue learning</h2>
            <Link
              href="/my-learning"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loadingEnrollments ? (
            <div className="mt-6 flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : inProgress.length === 0 ? (
            <div className="mt-6 rounded-card border border-dashed border-border py-12 text-center">
              <p className="font-medium text-text">No courses in progress</p>
              <p className="mt-1 text-sm text-text-secondary">
                Enroll in a course to start learning.
              </p>
              <Link href="/courses" className="inline-flex items-center justify-center gap-2 rounded-btn border border-border bg-white px-5 py-2.5 text-sm font-semibold text-text shadow-sm transition-all hover:bg-background-secondary mt-4">Browse courses</Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {inProgress.slice(0, 4).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}

          {recommended.length > 0 && (
            <>
              <h2 className="mt-10 font-heading text-lg font-semibold text-text">
                Recommended for you
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {recommended.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="space-y-6">
          <div className="card-surface p-5">
            <h3 className="font-heading text-base font-semibold text-text">Recent achievements</h3>
            {earnedRewards.length === 0 ? (
              <p className="mt-3 text-sm text-text-secondary">
                Complete lessons to earn rewards.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {earnedRewards.map((r: any) => (
                  <li key={r.id} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-50 text-yellow-600">
                      <Award className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-text">{r.title || r.name}</p>
                      <p className="text-xs text-text-secondary">{r.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <Link
              href="/rewards"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              All rewards <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
