"use client";

import { useMemo, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { courses, categories, publishers } from "@/data/mock";
import { CourseCard } from "@/components/course/CourseCard";
import Link from "next/link";
import Image from "next/image";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return { courses: [], categories: [], publishers: [] };
    const q = query.toLowerCase();
    return {
      courses: courses.filter((c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)),
      categories: categories.filter((c) => c.name.toLowerCase().includes(q)),
      publishers: publishers.filter((p) => p.name.toLowerCase().includes(q)),
    };
  }, [query]);

  const hasQuery = query.trim().length > 0;
  const hasResults = results.courses.length + results.categories.length + results.publishers.length > 0;

  return (
    <section className="container-page py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-center font-heading text-3xl font-bold text-text sm:text-4xl">Search Courverse</h1>
        <div className="mt-6 flex items-center gap-2 rounded-input border border-border bg-white p-1.5 shadow-sm focus-within:border-primary">
          <SearchIcon className="ml-2 h-5 w-5 shrink-0 text-text-secondary" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, categories, or publishers…"
            className="w-full bg-transparent px-1 py-2.5 text-sm text-text placeholder:text-text-secondary focus:outline-none"
          />
          {query && (
            <button aria-label="Clear search" onClick={() => setQuery("")} className="mr-1 rounded-full p-1.5 text-text-secondary hover:bg-background-secondary">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {!hasQuery && (
        <div className="mt-14 text-center text-text-secondary">
          Start typing to search across {courses.length}+ courses, categories, and publishers.
        </div>
      )}

      {hasQuery && !hasResults && (
        <div className="mt-14 text-center">
          <p className="font-heading font-semibold text-text">No results for "{query}"</p>
          <p className="mt-1 text-sm text-text-secondary">Try a different keyword or browse categories instead.</p>
        </div>
      )}

      {results.publishers.length > 0 && (
        <div className="mx-auto mt-12 max-w-4xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-text-secondary">Publishers</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {results.publishers.map((p) => (
              <Link key={p.id} href={`/publishers/${p.id}`} className="card-surface flex items-center gap-3 p-4">
                <Image src={p.avatarUrl} alt={p.name} width={40} height={40} className="rounded-full" />
                <span className="font-medium text-text">{p.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {results.categories.length > 0 && (
        <div className="mx-auto mt-10 max-w-4xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-text-secondary">Categories</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {results.categories.map((c) => (
              <Link key={c.id} href={`/categories/${c.slug}`} className="badge-pill bg-background-secondary text-text hover:bg-primary-light hover:text-primary-hover">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {results.courses.length > 0 && (
        <div className="mx-auto mt-10 max-w-6xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-text-secondary">Courses</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
