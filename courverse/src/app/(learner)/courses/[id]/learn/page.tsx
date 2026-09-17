"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useCourse } from "@/hooks/use-courses";
import { progressApi } from "@/api/modules/progress";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

type Lesson = {
  id: string;
  title: string;
  type?: string;
  videoUrl?: string;
  content?: string;
  isPreview?: boolean;
};

type Section = {
  id: string;
  title: string;
  lessons?: Lesson[];
};

export default function CoursePlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: course, isLoading, isError, refetch } = useCourse(id);
  const qc = useQueryClient();

  const sections: Section[] = useMemo(() => {
    const raw = (course as { sections?: Section[] } | undefined)?.sections;
    return Array.isArray(raw) ? raw : [];
  }, [course]);

  const flatLessons = useMemo(
    () => sections.flatMap((s) => s.lessons ?? []),
    [sections],
  );

  const [activeId, setActiveId] = useState<string | null>(null);
  const activeLesson =
    flatLessons.find((l) => l.id === activeId) || flatLessons[0] || null;

  const complete = useMutation({
    mutationFn: (lessonId: string) =>
      progressApi.completeLesson(lessonId),
    onSuccess: () => {
      toast.success("Lesson marked complete");
      qc.invalidateQueries({ queryKey: ["enrollments"] });
      qc.invalidateQueries({ queryKey: ["course", id] });
    },
    onError: (err: { message?: string }) => {
      toast.error(err?.message || "Could not update progress");
    },
  });

  const idx = activeLesson
    ? flatLessons.findIndex((l) => l.id === activeLesson.id)
    : -1;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-2 text-text-secondary">
        <Loader2 className="h-5 w-5 animate-spin" /> Loading course…
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <p className="text-text-secondary">Could not load this course.</p>
        <button type="button" className="btn-primary" onClick={() => refetch()}>
          Retry
        </button>
        <Link href={`/courses/${id}`} className="text-sm text-primary">
          Back to course
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen lg:flex-row">
      <aside className="hidden w-80 shrink-0 overflow-y-auto border-r border-border bg-card p-5 lg:block">
        <Link
          href={`/courses/${id}`}
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Link>
        <h2 className="mt-4 font-heading text-sm font-bold text-text line-clamp-2">
          {(course as { title?: string }).title}
        </h2>
        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-text-secondary">
          Curriculum
        </p>
        <div className="mt-3 space-y-4">
          {sections.length === 0 && (
            <p className="text-xs text-text-secondary">No sections yet.</p>
          )}
          {sections.map((section) => (
            <div key={section.id}>
              <p className="text-xs font-semibold text-text">{section.title}</p>
              <ul className="mt-2 space-y-1">
                {(section.lessons ?? []).map((lesson) => {
                  const selected = activeLesson?.id === lesson.id;
                  return (
                    <li key={lesson.id}>
                      <button
                        type="button"
                        onClick={() => setActiveId(lesson.id)}
                        className={`flex w-full items-center gap-2 rounded-btn px-2.5 py-2 text-left text-sm ${
                          selected
                            ? "bg-primary-light font-medium text-primary"
                            : "text-text-secondary hover:bg-background-secondary"
                        }`}
                      >
                        <BookOpen className="h-3.5 w-3.5 shrink-0" />
                        <span className="line-clamp-2">{lesson.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
            {activeLesson?.type || "Lesson"}
          </p>
          <h1 className="mt-2 font-heading text-2xl font-bold text-text">
            {activeLesson?.title || "Select a lesson"}
          </h1>

          <div className="mt-6 overflow-hidden rounded-card border border-border bg-black">
            {activeLesson?.videoUrl ? (
              <div className="aspect-video">
                <ReactPlayer
                  url={activeLesson.videoUrl}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>
            ) : (
              <div className="flex aspect-video items-center justify-center bg-background-secondary px-6 text-center">
                {activeLesson?.content ? (
                  <article className="max-h-full w-full overflow-y-auto p-6 text-left text-sm text-text prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap">{activeLesson.content}</div>
                  </article>
                ) : (
                  <p className="text-sm text-text-secondary">
                    No media for this lesson yet.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              className="btn-secondary"
              disabled={idx <= 0}
              onClick={() => {
                if (idx > 0) setActiveId(flatLessons[idx - 1].id);
              }}
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <button
              type="button"
              className="btn-primary"
              disabled={!activeLesson || complete.isPending}
              onClick={() => activeLesson && complete.mutate(activeLesson.id)}
            >
              <CheckCircle2 className="h-4 w-4" />
              {complete.isPending ? "Saving…" : "Mark complete"}
            </button>
            <button
              type="button"
              className="btn-secondary"
              disabled={idx < 0 || idx >= flatLessons.length - 1}
              onClick={() => {
                if (idx >= 0 && idx < flatLessons.length - 1) {
                  setActiveId(flatLessons[idx + 1].id);
                }
              }}
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
