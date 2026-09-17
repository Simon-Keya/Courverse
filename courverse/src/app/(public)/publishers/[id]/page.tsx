"use client";

import { use } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { publishersApi } from "@/api/modules/publishers";
import { coursesApi } from "@/api/modules/courses";
import { CourseCard } from "@/components/course/CourseCard";
import { normalizeCourse } from "@/types/course";

export default function PublisherDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const publisher = useQuery({
    queryKey: ["publisher", id],
    queryFn: () => publishersApi.getById(id),
  });

  const courses = useQuery({
    queryKey: ["courses", "publisher", id],
    queryFn: () => coursesApi.list({ publisherId: id, limit: 24 }),
    enabled: !!id,
  });

  if (publisher.isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center gap-2 text-text-secondary">
        <Loader2 className="h-5 w-5 animate-spin" /> Loading publisher…
      </div>
    );
  }

  if (publisher.isError || !publisher.data) {
    return (
      <div className="container-page py-16 text-center">
        <p className="font-heading text-lg font-semibold text-text">Publisher not found</p>
        <Link href="/publishers" className="btn-primary mt-4 inline-flex">
          All publishers
        </Link>
      </div>
    );
  }

  const p = publisher.data;
  const list = (courses.data?.data ?? []).map(normalizeCourse);

  return (
    <>
      <section className="border-b border-border bg-background-secondary py-16">
        <div className="container-page">
          <h1 className="font-heading text-3xl font-bold text-text sm:text-4xl">{p.name}</h1>
          {p.bio && <p className="mt-3 max-w-2xl text-text-secondary">{p.bio}</p>}
        </div>
      </section>
      <section className="container-page py-12">
        <h2 className="font-heading text-xl font-bold text-text">Courses</h2>
        {courses.isLoading && (
          <div className="mt-6 flex items-center gap-2 text-text-secondary">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        )}
        {!courses.isLoading && list.length === 0 && (
          <p className="mt-6 text-sm text-text-secondary">No published courses yet.</p>
        )}
        {list.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
