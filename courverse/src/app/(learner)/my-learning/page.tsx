"use client";

import { useMemo, useState } from "react";
import { courses } from "@/data/mock";
import { CourseCard } from "@/components/course/CourseCard";

type Status = "all" | "in-progress" | "completed";

const tabs: { id: Status; label: string }[] = [
  { id: "all", label: "All" },
  { id: "in-progress", label: "In progress" },
  { id: "completed", label: "Completed" },
];

export default function MyLearningPage() {
  const [status, setStatus] = useState<Status>("all");
  const enrolled = courses.filter((c) => typeof c.progress === "number");

  const filtered = useMemo(() => {
    if (status === "in-progress") return enrolled.filter((c) => (c.progress ?? 0) < 100);
    if (status === "completed") return enrolled.filter((c) => c.progress === 100);
    return enrolled;
  }, [status, enrolled]);

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">My Learning</h1>
      <p className="mt-1 text-text-secondary">{enrolled.length} enrolled courses.</p>

      <div className="mt-6 flex w-fit items-center gap-1 rounded-input border border-border bg-white p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatus(tab.id)}
            className={`rounded-btn px-4 py-2 text-sm font-medium transition-colors ${
              status === tab.id ? "bg-primary-light text-primary-hover" : "text-text-secondary hover:text-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-card border border-dashed border-border py-16 text-center">
          <p className="font-heading font-semibold text-text">Nothing here yet</p>
          <p className="mt-1 text-sm text-text-secondary">Courses you enroll in will show up here.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
