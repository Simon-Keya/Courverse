"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Users, MoreVertical, Loader2, Send } from "lucide-react";
import { publisherCourses as mockCourses } from "@/data/publisher-mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { publisherApi } from "@/api/modules/publisher";
import { normalizeCourse } from "@/types/course";
import { toast } from "sonner";

type Filter = "all" | "published" | "submitted" | "draft" | "approved" | "rejected";

const statusLabel: Record<string, string> = {
  published: "Published",
  submitted: "In review",
  draft: "Draft",
  approved: "Approved",
  rejected: "Rejected",
  review: "In review",
};

const tabs: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "published", label: "Published" },
  { id: "submitted", label: "In review" },
  { id: "draft", label: "Drafts" },
];

export default function PublisherCoursesPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const qc = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["publisher-courses"],
    queryFn: () => publisherApi.myCourses({ limit: 50 }),
    retry: 1,
  });

  const submitMutation = useMutation({
    mutationFn: (id: string) => publisherApi.submitForReview(id),
    onSuccess: () => {
      toast.success("Submitted for review");
      qc.invalidateQueries({ queryKey: ["publisher-courses"] });
    },
    onError: (err: any) => toast.error(err?.message || "Submit failed"),
  });

  const courses = useMemo(() => {
    if (data?.data?.length) {
      return data.data.map((c) => ({
        ...normalizeCourse(c),
        status: c.status,
        students: c.enrollmentCount,
      }));
    }
    if (isError || (!isLoading && !data?.data?.length)) {
      return mockCourses.map((c: any) => ({
        id: c.id,
        title: c.title,
        status: c.status === "review" ? "submitted" : c.status,
        students: c.students,
        rating: c.rating,
        price: c.price,
        thumbnailUrl: c.thumbnailUrl,
      }));
    }
    return [];
  }, [data, isError, isLoading]);

  const filtered = useMemo(() => {
    if (filter === "all") return courses;
    return courses.filter((c: any) => c.status === filter);
  }, [filter, courses]);

  return (
    <div className="container-page py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text">Your courses</h1>
          <p className="mt-1 text-text-secondary">
            {isLoading ? "Loading…" : `${courses.length} total courses.`}
            {isError && <span className="ml-2 text-xs text-amber-600">(demo data)</span>}
          </p>
        </div>
        <Link
          href="/publisher/courses/new"
          className="inline-flex items-center justify-center rounded-btn bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover"
        >
          + New course
        </Link>
      </div>

      <div className="mt-6 flex w-fit flex-wrap items-center gap-1 rounded-input border border-border bg-white p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`rounded-btn px-4 py-2 text-sm font-medium transition-colors ${
              filter === tab.id
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
          <p className="font-heading font-semibold text-text">No courses yet</p>
          <p className="mt-1 text-sm text-text-secondary">
            Create your first course to get started.
          </p>
          <Link
            href="/publisher/courses/new"
            className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
          >
            Create course
          </Link>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-card border border-border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-background-secondary text-xs uppercase text-text-secondary">
              <tr>
                <th className="px-5 py-3 font-medium">Course</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="hidden px-5 py-3 font-medium sm:table-cell">Students</th>
                <th className="hidden px-5 py-3 font-medium md:table-cell">Price</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((course: any) => (
                <tr key={course.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-4">
                    <p className="font-medium text-text line-clamp-1">{course.title}</p>
                  </td>
                  <td className="px-5 py-4">
                    <Badge
                      variant={
                        course.status === "published"
                          ? "primary"
                          : course.status === "submitted"
                            ? "info"
                            : "neutral"
                      }
                    >
                      {statusLabel[course.status] || course.status}
                    </Badge>
                  </td>
                  <td className="hidden px-5 py-4 text-text-secondary sm:table-cell">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {course.students ?? course.enrollmentCount ?? 0}
                    </span>
                  </td>
                  <td className="hidden px-5 py-4 text-text-secondary md:table-cell">
                    {course.isFree || course.price === 0
                      ? "Free"
                      : `$${Number(course.price).toFixed(0)}`}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {(course.status === "draft" || course.status === "rejected") && (
                        <button
                          onClick={() => submitMutation.mutate(course.id)}
                          disabled={submitMutation.isPending}
                          className="inline-flex items-center gap-1 rounded-btn border border-border px-3 py-1.5 text-xs font-medium hover:bg-background-secondary"
                        >
                          <Send className="h-3 w-3" /> Submit
                        </button>
                      )}
                      <Link
                        href={`/publisher/courses/${course.id}/curriculum`}
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        Curriculum
                      </Link>
                      <Link
                        href={`/courses/${course.id}`}
                        className="text-xs font-medium text-text-secondary hover:underline"
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
