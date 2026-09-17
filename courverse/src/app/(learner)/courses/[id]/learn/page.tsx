"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Loader2,
  Menu,
  X,
  FileText,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useCourse } from "@/hooks/use-courses";
import { progressApi } from "@/api/modules/progress";
import { toast } from "sonner";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

type Lesson = {
  id: string;
  title: string;
  type?: string;
  videoUrl?: string | null;
  content?: string | null;
  documentUrl?: string | null;
  isPreview?: boolean;
};

type Section = {
  id: string;
  title: string;
  lessons?: Lesson[];
};

function storageKey(courseId: string) {
  return `courverse:last-lesson:${courseId}`;
}

export default function CoursePlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: course, isLoading, isError, refetch } = useCourse(id);
  const qc = useQueryClient();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [completedLocal, setCompletedLocal] = useState<Set<string>>(new Set());

  const progressQuery = useQuery({
    queryKey: ["progress", "course", id],
    queryFn: () => progressApi.getCourseProgress(id),
    enabled: !!id,
    staleTime: 30_000,
  });

  const sections: Section[] = useMemo(() => {
    const raw = (course as { sections?: Section[] } | undefined)?.sections;
    return Array.isArray(raw) ? raw : [];
  }, [course]);

  const flatLessons = useMemo(
    () => sections.flatMap((s) => s.lessons ?? []),
    [sections],
  );

  // Resume last lesson + server completions
  useEffect(() => {
    if (typeof window === "undefined" || flatLessons.length === 0) return;
    const saved = sessionStorage.getItem(storageKey(id));
    if (saved && flatLessons.some((l) => l.id === saved)) {
      setActiveId(saved);
    } else if (!activeId) {
      setActiveId(flatLessons[0].id);
    }
  }, [flatLessons, id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!progressQuery.data) return;
    const done = new Set(
      progressQuery.data.filter((p) => p.isCompleted).map((p) => p.lessonId),
    );
    setCompletedLocal((prev) => new Set([...prev, ...done]));
  }, [progressQuery.data]);

  const activeLesson =
    flatLessons.find((l) => l.id === activeId) || flatLessons[0] || null;

  useEffect(() => {
    if (activeLesson && typeof window !== "undefined") {
      sessionStorage.setItem(storageKey(id), activeLesson.id);
    }
  }, [activeLesson, id]);

  const complete = useMutation({
    mutationFn: (lessonId: string) => progressApi.completeLesson(lessonId),
    onMutate: async (lessonId) => {
      setCompletedLocal((prev) => new Set(prev).add(lessonId));
      return { lessonId };
    },
    onError: (_err, lessonId, ctx) => {
      setCompletedLocal((prev) => {
        const next = new Set(prev);
        next.delete(ctx?.lessonId ?? lessonId);
        return next;
      });
      toast.error("Could not save progress");
    },
    onSuccess: () => {
      toast.success("Lesson marked complete");
      qc.invalidateQueries({ queryKey: ["progress", "course", id] });
      qc.invalidateQueries({ queryKey: ["enrollments"] });
    },
  });

  const idx = activeLesson
    ? flatLessons.findIndex((l) => l.id === activeLesson.id)
    : -1;

  const selectLesson = (lessonId: string) => {
    setActiveId(lessonId);
    setMobileOpen(false);
  };

  const lessonType = (activeLesson?.type || "").toLowerCase();
  const isVideo =
    lessonType.includes("video") || Boolean(activeLesson?.videoUrl);
  const isPdf =
    lessonType.includes("pdf") ||
    lessonType.includes("document") ||
    Boolean(activeLesson?.documentUrl?.toLowerCase().endsWith(".pdf"));
  const isMarkdown =
    lessonType.includes("markdown") ||
    lessonType.includes("article") ||
    lessonType.includes("reading") ||
    (Boolean(activeLesson?.content) && !isVideo && !isPdf);

  const Curriculum = (
    <>
      <Link
        href={`/courses/${id}`}
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text"
      >
        <ChevronLeft className="h-4 w-4" /> Back to course
      </Link>
      <h2 className="mt-4 font-heading text-sm font-bold text-text line-clamp-2">
        {(course as { title?: string } | undefined)?.title}
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
                const done = completedLocal.has(lesson.id);
                return (
                  <li key={lesson.id}>
                    <button
                      type="button"
                      onClick={() => selectLesson(lesson.id)}
                      className={`flex w-full items-center gap-2 rounded-btn px-2.5 py-2 text-left text-sm ${
                        selected
                          ? "bg-primary-light font-medium text-primary"
                          : "text-text-secondary hover:bg-background-secondary"
                      }`}
                    >
                      {done ? (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                      ) : (
                        <BookOpen className="h-3.5 w-3.5 shrink-0" />
                      )}
                      <span className="line-clamp-2">{lesson.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </>
  );

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
      {/* Desktop sidebar */}
      <aside className="hidden w-80 shrink-0 overflow-y-auto border-r border-border bg-card p-5 lg:block">
        {Curriculum}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
            role="presentation"
          />
          <aside className="absolute inset-y-0 left-0 w-80 overflow-y-auto bg-card p-5 shadow-lg">
            <button
              type="button"
              className="mb-4 rounded-btn p-1 text-text-secondary"
              onClick={() => setMobileOpen(false)}
              aria-label="Close curriculum"
            >
              <X className="h-5 w-5" />
            </button>
            {Curriculum}
          </aside>
        </div>
      )}

      <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto max-w-3xl">
          <button
            type="button"
            className="mb-4 inline-flex items-center gap-2 text-sm text-text-secondary lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-4 w-4" /> Curriculum
          </button>

          <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
            {activeLesson?.type || "Lesson"}
          </p>
          <h1 className="mt-2 font-heading text-2xl font-bold text-text">
            {activeLesson?.title || "Select a lesson"}
          </h1>

          <div className="mt-6 overflow-hidden rounded-card border border-border bg-card">
            {!activeLesson && (
              <div className="flex aspect-video items-center justify-center text-sm text-text-secondary">
                Select a lesson from the curriculum.
              </div>
            )}

            {activeLesson && isVideo && activeLesson.videoUrl && (
              <div className="aspect-video bg-black">
                <ReactPlayer
                  url={activeLesson.videoUrl}
                  width="100%"
                  height="100%"
                  controls
                  config={{
                    file: {
                      attributes: {
                        controlsList: "nodownload",
                      },
                    },
                  }}
                />
              </div>
            )}

            {activeLesson && isPdf && (activeLesson.documentUrl || activeLesson.videoUrl) && (
              <div className="aspect-[3/4] w-full bg-background-secondary">
                <iframe
                  title={activeLesson.title}
                  src={(activeLesson.documentUrl || activeLesson.videoUrl)!}
                  className="h-full w-full"
                />
                <p className="p-3 text-center text-xs text-text-secondary">
                  <a
                    href={(activeLesson.documentUrl || activeLesson.videoUrl)!}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-primary"
                  >
                    Open PDF in new tab
                  </a>
                </p>
              </div>
            )}

            {activeLesson && isMarkdown && activeLesson.content && (
              <article className="prose prose-sm max-w-none p-6 text-text dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {activeLesson.content}
                </ReactMarkdown>
              </article>
            )}

            {activeLesson &&
              !isVideo &&
              !isPdf &&
              !isMarkdown &&
              activeLesson.content && (
                <div className="whitespace-pre-wrap p-6 text-sm text-text">
                  {activeLesson.content}
                </div>
              )}

            {activeLesson &&
              !activeLesson.videoUrl &&
              !activeLesson.documentUrl &&
              !activeLesson.content && (
                <div className="flex aspect-video flex-col items-center justify-center gap-2 text-sm text-text-secondary">
                  <FileText className="h-8 w-8 text-primary" />
                  No media for this lesson yet.
                </div>
              )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              className="btn-secondary"
              disabled={idx <= 0}
              onClick={() => {
                if (idx > 0) selectLesson(flatLessons[idx - 1].id);
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
              {completedLocal.has(activeLesson?.id ?? "")
                ? "Completed"
                : complete.isPending
                  ? "Saving…"
                  : "Mark complete"}
            </button>
            <button
              type="button"
              className="btn-secondary"
              disabled={idx < 0 || idx >= flatLessons.length - 1}
              onClick={() => {
                if (idx >= 0 && idx < flatLessons.length - 1) {
                  selectLesson(flatLessons[idx + 1].id);
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
