"use client";

import Link from "next/link";
import { ArrowRight, Loader2, LayoutGrid } from "lucide-react";
import { useCategories } from "@/hooks/use-catalog";

export default function CategoriesPage() {
  const { data, isLoading, isError, refetch } = useCategories();
  const categories = data ?? [];

  return (
    <>
      <section className="border-b border-border bg-background-secondary py-16">
        <div className="container-page">
          <h1 className="font-heading text-4xl font-bold text-text sm:text-5xl">
            Categories
          </h1>
          <p className="mt-4 max-w-xl text-lg text-text-secondary">
            Explore courses across technology, business, design, languages, and more.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        {isLoading && (
          <div className="flex items-center justify-center gap-2 py-20 text-text-secondary">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading categories…
          </div>
        )}
        {isError && (
          <div className="rounded-card border border-border bg-card p-8 text-center">
            <p className="font-heading text-lg font-semibold text-text">
              Could not load categories
            </p>
            <button type="button" className="btn-primary mt-4" onClick={() => refetch()}>
              Retry
            </button>
          </div>
        )}
        {!isLoading && !isError && categories.length === 0 && (
          <div className="rounded-card border border-border bg-card p-8 text-center text-text-secondary">
            No categories yet.
          </div>
        )}
        {!isLoading && !isError && categories.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="card-surface group flex items-start gap-4 p-5 hover:-translate-y-0.5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                  <LayoutGrid className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-heading text-lg font-semibold text-text group-hover:text-primary">
                    {cat.name}
                  </h2>
                  {cat.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
                      {cat.description}
                    </p>
                  )}
                  <p className="mt-2 flex items-center gap-1 text-xs font-medium text-primary">
                    {cat.courseCount ?? 0} courses <ArrowRight className="h-3.5 w-3.5" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
