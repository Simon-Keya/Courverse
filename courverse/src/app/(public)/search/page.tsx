"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { useCourses } from "@/hooks/use-courses";
import { CourseCard } from "@/components/course/CourseCard";
import { normalizeCourse } from "@/types/course";

export default function SearchPage() {
  const sp = useSearchParams();
  const initial = sp.get("q") || "";
  const [query, setQuery] = useState(initial);

  const { data, isLoading, isError, refetch } = useCourses({
    search: query || undefined,
    limit: 24,
  });

  const results = useMemo(
    () => (data?.data ?? []).map(normalizeCourse),
    [data],
  );

  return (
    <div className="container-page py-12">
      <h1 className="font-heading text-3xl font-bold text-text">Search</h1>
      <div className="mt-6 flex items-center gap-2 rounded-input border border-border bg-white p-1.5 shadow-sm sm:max-w-lg">
        <Search className="ml-2 h-5 w-5 text-text-secondary" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses…"
          className="w-full bg-transparent px-2 py-2 text-sm focus:outline-none"
          aria-label="Search courses"
        />
      </div>

      {isLoading && (
        <div className="mt-10 flex items-center gap-2 text-text-secondary">
          <Loader2 className="h-4 w-4 animate-spin" /> Searching…
        </div>
      )}
      {isError && (
        <div className="mt-10">
          <p className="text-sm text-text-secondary">Search failed.</p>
          <button type="button" className="btn-primary mt-3" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}
      {!isLoading && !isError && results.length === 0 && (
        <p className="mt-10 text-sm text-text-secondary">No courses matched your search.</p>
      )}
      {results.length > 0 && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}
    </div>
  );
}
