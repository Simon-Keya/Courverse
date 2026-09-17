"use client";

import { useMemo, useState } from "react";
import { Search, LayoutGrid, List, SlidersHorizontal, Loader2 } from "lucide-react";
import { categories as mockCategories } from "@/data/mock";
import { isDemoMode } from "@/lib/demo";
import { courses as mockCourses } from "@/data/mock";
import { CourseCard } from "@/components/course/CourseCard";
import { useCourses } from "@/hooks/use-courses";
import { normalizeCourse, type Course } from "@/types/course";

const levels = ["All levels", "Beginner", "Intermediate", "Advanced"] as const;

export default function CoursesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [level, setLevel] = useState<(typeof levels)[number]>("All levels");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  const difficultyMap: Record<string, string | undefined> = {
    Beginner: "beginner",
    Intermediate: "intermediate",
    Advanced: "advanced",
  };

  const { data, isLoading, isError } = useCourses({
    page,
    limit: 12,
    search: query || undefined,
    difficulty: level !== "All levels" ? difficultyMap[level] : undefined,
    sort: "newest",
  });

  const liveCourses: Course[] = useMemo(() => {
    if (data?.data?.length) {
      return data.data.map(normalizeCourse);
    }
    return [];
  }, [data]);

  // Demo mode only: explicit opt-in for local development. Never in production.
  const usingMock = isDemoMode() && (isError || (!isLoading && liveCourses.length === 0));
  const sourceCourses = usingMock ? mockCourses : liveCourses;
  const categories = mockCategories;

  const filtered = useMemo(() => {
    if (!usingMock) return sourceCourses;
    return sourceCourses.filter((c) => {
      const matchesQuery =
        !query ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.description?.toLowerCase().includes(query.toLowerCase());
      const catName = typeof c.category === "string" ? c.category : c.category?.name;
      const matchesCategory = category === "All categories" || catName === category;
      const matchesLevel = level === "All levels" || c.level === level;
      return matchesQuery && matchesCategory && matchesLevel;
    });
  }, [sourceCourses, query, category, level, usingMock]);

  const total = usingMock ? filtered.length : data?.meta?.total ?? filtered.length;
  const showError = isError && !usingMock;
  const showEmpty = !isLoading && !showError && filtered.length === 0;

  return (
    <>
      <section className="border-b border-border bg-background-secondary py-14">
        <div className="container-page">
          <h1 className="font-heading text-4xl font-bold text-text sm:text-5xl">
            Browse courses
          </h1>
          <p className="mt-3 max-w-xl text-lg text-text-secondary">
            Discover high-quality courses across web development, design, data, and more.
          </p>

          <div className="mt-6 flex items-center gap-2 rounded-input border border-border bg-white p-1.5 shadow-sm focus-within:border-primary sm:max-w-md">
            <Search className="ml-2 h-5 w-5 shrink-0 text-text-secondary" />
            <input
              type="search"
              placeholder="Search courses…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="w-full bg-transparent px-2 py-2 text-sm text-text placeholder:text-text-secondary focus:outline-none"
              aria-label="Search courses"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-sm font-medium text-text-secondary">
              <SlidersHorizontal className="h-4 w-4" /> Filter:
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-input border border-border bg-white px-3 py-2 text-sm text-text focus:border-primary focus:outline-none"
              aria-label="Filter by category"
            >
              <option>All categories</option>
              {categories.map((c) => (
                <option key={c.id}>{c.name}</option>
              ))}
            </select>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as (typeof levels)[number])}
              className="rounded-input border border-border bg-white px-3 py-2 text-sm text-text focus:border-primary focus:outline-none"
              aria-label="Filter by level"
            >
              {levels.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 self-start rounded-input border border-border bg-white p-1">
            <button
              aria-label="Grid view"
              onClick={() => setView("grid")}
              className={`rounded-btn p-1.5 transition-colors ${
                view === "grid" ? "bg-primary-light text-primary" : "text-text-secondary hover:text-text"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              aria-label="List view"
              onClick={() => setView("list")}
              className={`rounded-btn p-1.5 transition-colors ${
                view === "list" ? "bg-primary-light text-primary" : "text-text-secondary hover:text-text"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-text-secondary">
            {isLoading ? "Loading…" : `${total} results`}
            {usingMock && !isLoading && (
              <span className="ml-2 text-xs text-amber-600">(demo data)</span>
            )}
          </p>
        </div>

        {isLoading ? (
          <div className="mt-16 flex flex-col items-center justify-center gap-3 py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-text-secondary">Loading courses…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-10 rounded-card border border-dashed border-border py-16 text-center">
            <p className="font-heading font-semibold text-text">No courses match your filters</p>
            <p className="mt-1 text-sm text-text-secondary">
              Try a different search term or clear your filters.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("All categories");
                setLevel("All levels");
              }}
              className="mt-4 text-sm font-medium text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div
            className={
              view === "grid"
                ? "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "mt-8 flex flex-col gap-4"
            }
          >
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {!usingMock && data?.meta && data.meta.totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-btn border border-border px-4 py-2 text-sm disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-text-secondary">
              Page {page} of {data.meta.totalPages}
            </span>
            <button
              disabled={page >= data.meta.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-btn border border-border px-4 py-2 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </>
  );
}
