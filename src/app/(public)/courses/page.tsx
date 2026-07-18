"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, LayoutGrid, List, Star, SlidersHorizontal } from "lucide-react";
import { courses, categories } from "@/data/mock";
import { CourseCard } from "@/components/course/CourseCard";
import { Badge } from "@/components/ui/badge";

const levels = ["All levels", "Beginner", "Intermediate", "Advanced"] as const;

export default function CoursesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [level, setLevel] = useState<typeof levels[number]>("All levels");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All categories" || c.category === category;
      const matchesLevel = level === "All levels" || c.level === level;
      return matchesQuery && matchesCategory && matchesLevel;
    });
  }, [query, category, level]);

  return (
    <>
      <section className="border-b border-border bg-background-secondary py-14">
        <div className="container-page">
          <h1 className="font-heading text-4xl font-bold text-text sm:text-5xl">Browse courses</h1>
          <p className="mt-3 max-w-xl text-lg text-text-secondary">
            {courses.length} courses across web development, design, data, and more.
          </p>

          <div className="mt-6 flex items-center gap-2 rounded-input border border-border bg-white p-1.5 shadow-sm focus-within:border-primary sm:max-w-md">
            <Search className="ml-2 h-5 w-5 shrink-0 text-text-secondary" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses…"
              className="w-full bg-transparent px-1 py-2 text-sm text-text placeholder:text-text-secondary focus:outline-none"
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
            >
              <option>All categories</option>
              {categories.map((c) => (
                <option key={c.id}>{c.name}</option>
              ))}
            </select>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as typeof levels[number])}
              className="rounded-input border border-border bg-white px-3 py-2 text-sm text-text focus:border-primary focus:outline-none"
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
              className={`rounded-btn p-1.5 transition-colors ${view === "grid" ? "bg-primary-light text-primary" : "text-text-secondary hover:text-text"}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              aria-label="List view"
              onClick={() => setView("list")}
              className={`rounded-btn p-1.5 transition-colors ${view === "list" ? "bg-primary-light text-primary" : "text-text-secondary hover:text-text"}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        <p className="mt-6 text-sm text-text-secondary">{filtered.length} results</p>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-card border border-dashed border-border py-16 text-center">
            <p className="font-heading font-semibold text-text">No courses match your filters</p>
            <p className="mt-1 text-sm text-text-secondary">Try a different search term or clear your filters.</p>
          </div>
        ) : view === "grid" ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {filtered.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="card-surface flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
              >
                <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-card sm:h-24 sm:w-40">
                  <Image src={course.thumbnailUrl} alt={course.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-text-secondary">
                    <span>{course.category}</span>
                    <span aria-hidden>·</span>
                    <span>{course.level}</span>
                    {course.isPremium && <Badge variant="premium">Premium</Badge>}
                  </div>
                  <h3 className="mt-1 font-heading font-semibold text-text">{course.title}</h3>
                  <p className="mt-1 line-clamp-1 text-sm text-text-secondary">{course.description}</p>
                </div>
                <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end">
                  <span className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-reward text-reward" />
                    <span className="font-semibold text-text">{course.rating}</span>
                  </span>
                  <span className="font-heading font-bold text-text">
                    {course.price === 0 ? "Free" : `$${course.price}`}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
