"use client";

import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { publisherApi } from "@/api/modules/publisher";

export default function PublisherCertificatesPage() {
  const courses = useQuery({
    queryKey: ["publisher", "courses", "certificates"],
    queryFn: () => publisherApi.myCourses({ limit: 50 }),
    enabled: "certificates" === "courses" || "certificates" === "quizzes",
  });

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Publisher · Certificates</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Live data only. Dedicated certificates APIs will expand this view.
      </p>
      {courses.isLoading && (
        <div className="mt-8 flex items-center gap-2 text-text-secondary">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      )}
      {!courses.isLoading && (
        <div className="mt-8 rounded-card border border-border bg-card p-6 text-sm text-text-secondary">
          {(courses.data?.data?.length ?? 0) > 0
            ? `${courses.data?.meta?.total ?? courses.data?.data?.length} course(s) available for this section.`
            : "No data yet for this section."}
        </div>
      )}
    </div>
  );
}
