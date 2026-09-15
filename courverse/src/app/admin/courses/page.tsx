"use client";

import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Check, X } from "lucide-react";
import { adminCoursesQueue as mockQueue } from "@/data/admin-mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminApi } from "@/api/modules/publisher";
import { toast } from "sonner";

type Filter = "all" | "submitted" | "published" | "approved";

const tabs: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "submitted", label: "Pending review" },
  { id: "approved", label: "Approved" },
  { id: "published", label: "Published" },
];

export default function AdminCoursesPage() {
  const [filter, setFilter] = useState<Filter>("submitted");
  const qc = useQueryClient();

  const { data: pendingData, isLoading: loadingPending } = useQuery({
    queryKey: ["admin-pending-courses"],
    queryFn: () => adminApi.pendingCourses({ limit: 50 }),
    retry: 1,
  });

  const { data: allData, isLoading: loadingAll } = useQuery({
    queryKey: ["admin-all-courses", filter],
    queryFn: () =>
      adminApi.allCourses({
        limit: 50,
        status: filter === "all" ? undefined : filter,
      }),
    enabled: filter !== "submitted",
    retry: 1,
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => adminApi.approve(id),
    onSuccess: () => {
      toast.success("Course approved");
      qc.invalidateQueries({ queryKey: ["admin-pending-courses"] });
      qc.invalidateQueries({ queryKey: ["admin-all-courses"] });
    },
    onError: (err: any) => toast.error(err?.message || "Approve failed"),
  });

  const rejectMutation = useMutation({
    mutationFn: (id: string) => adminApi.reject(id),
    onSuccess: () => {
      toast.success("Course rejected");
      qc.invalidateQueries({ queryKey: ["admin-pending-courses"] });
      qc.invalidateQueries({ queryKey: ["admin-all-courses"] });
    },
    onError: (err: any) => toast.error(err?.message || "Reject failed"),
  });

  const publishMutation = useMutation({
    mutationFn: (id: string) => adminApi.publish(id),
    onSuccess: () => {
      toast.success("Course published");
      qc.invalidateQueries({ queryKey: ["admin-pending-courses"] });
      qc.invalidateQueries({ queryKey: ["admin-all-courses"] });
    },
    onError: (err: any) => toast.error(err?.message || "Publish failed"),
  });

  const isLoading = filter === "submitted" ? loadingPending : loadingAll;

  const courses = useMemo(() => {
    const source =
      filter === "submitted" ? pendingData?.data : allData?.data;
    if (source?.length) {
      return source.map((c) => ({
        id: c.id,
        title: c.title,
        status: c.status,
        publisher: c.publisher?.name || "—",
        submittedAt: c.createdAt,
      }));
    }
    // mock fallback
    return mockQueue
      .filter((c: any) => {
        if (filter === "all") return true;
        if (filter === "submitted") return c.status === "pending_review";
        if (filter === "published") return c.status === "published";
        return true;
      })
      .map((c: any) => ({
        id: c.id,
        title: c.title,
        status: c.status === "pending_review" ? "submitted" : c.status,
        publisher: c.publisher,
        submittedAt: c.submittedAt,
      }));
  }, [filter, pendingData, allData]);

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Course moderation</h1>
      <p className="mt-1 text-text-secondary">
        Review submissions, approve, reject, and publish courses.
      </p>

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
      ) : courses.length === 0 ? (
        <div className="mt-10 rounded-card border border-dashed border-border py-16 text-center">
          <p className="font-heading font-semibold text-text">Queue is empty</p>
          <p className="mt-1 text-sm text-text-secondary">
            No courses match this filter.
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-card border border-border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-background-secondary text-xs uppercase text-text-secondary">
              <tr>
                <th className="px-5 py-3 font-medium">Course</th>
                <th className="px-5 py-3 font-medium">Publisher</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course: any) => (
                <tr key={course.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-4">
                    <p className="font-medium text-text line-clamp-1">{course.title}</p>
                  </td>
                  <td className="px-5 py-4 text-text-secondary">{course.publisher}</td>
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
                      {course.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {course.status === "submitted" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => approveMutation.mutate(course.id)}
                            disabled={approveMutation.isPending}
                          >
                            <Check className="mr-1 h-3.5 w-3.5" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => rejectMutation.mutate(course.id)}
                            disabled={rejectMutation.isPending}
                          >
                            <X className="mr-1 h-3.5 w-3.5" /> Reject
                          </Button>
                        </>
                      )}
                      {course.status === "approved" && (
                        <Button
                          size="sm"
                          onClick={() => publishMutation.mutate(course.id)}
                          disabled={publishMutation.isPending}
                        >
                          Publish
                        </Button>
                      )}
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
