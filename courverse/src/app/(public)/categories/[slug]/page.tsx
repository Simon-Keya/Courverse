"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Loader2, LayoutGrid } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "@/api/modules/categories";
import { coursesApi } from "@/api/modules/courses";
import { CourseCard } from "@/components/course/CourseCard";
import { normalizeCourse } from "@/types/course";

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const category = useQuery({
    queryKey: ["category", slug],
    queryFn: () => categoriesApi.getBySlug(slug),
  });

  const courses = useQuery({
    queryKey: ["courses", "category", category.data?.id],
    queryFn: () =>
      coursesApi.list({ categoryId: category.data!.id, limit: 24 }),
    enabled: !!category.data?.id,
  });

  if (category.isError) {
    notFound();
  }

  if (category.isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center gap-2 text-text-secondary">
        <Loader2 className="h-5 w-5 animate-spin" /> Loading category…
      </div>
    );
  }

  if (!category.data) {
    notFound();
  }

  const list = courses.data?.data?.map(normalizeCourse) ?? [];

  return (
    <>
      <section className="border-b border-border bg-background-secondary py-16">
        <div className="container-page flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
            <LayoutGrid className="h-7 w-7" />
          </span>
          <div>
            <h1 className="font-heading text-3xl font-bold text-text sm:text-4xl">
              {category.data.name}
            </h1>
            {category.data.description && (
              <p className="mt-2 max-w-2xl text-text-secondary">
                {category.data.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        {courses.isLoading && (
          <div className="flex items-center gap-2 text-text-secondary">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading courses…
          </div>
        )}
        {courses.isError && (
          <p className="text-sm text-text-secondary">Could not load courses.</p>
        )}
        {!courses.isLoading && list.length === 0 && (
          <p className="text-sm text-text-secondary">No courses in this category yet.</p>
        )}
        {list.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        )}
        <div className="mt-10">
          <Link href="/categories" className="text-sm font-semibold text-primary">
            ← All categories
          </Link>
        </div>
      </section>
    </>
  );
}
