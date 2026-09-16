"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft, PlayCircle, FileText, HelpCircle, Flame, CheckCircle2, Circle,
  Menu, X, ChevronRight, Loader2,
} from "lucide-react";
import { courses as mockCourses, curriculum as mockCurriculum } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { useCourse, useCourseProgress, useCompleteLesson } from "@/hooks/use-courses";
import { toast } from "sonner";

const quizQuestions = [
  {
    id: "q1",
    prompt: "What triggers a React component to re-render?",
    options: ["Changing a local variable", "A state or props update", "Refreshing the CSS file", "Opening dev tools"],
    correctIndex: 1,
  },
  {
    id: "q2",
    prompt: "Which hook lets you run code after render?",
    options: ["useMemo", "useRef", "useEffect", "useContext"],
    correctIndex: 2,
  },
];

type LessonItem = {
  id: string;
  title: string;
  type: string;
  duration?: string;
  durationMinutes?: number;
  content?: string;
  videoUrl?: string;
  completed?: boolean;
};

type SectionItem = {
  id: string;
  title: string;
  lessons: LessonItem[];
};

export default function CoursePlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: courseId } = use(params);

  const { data: rawCourse, isLoading } = useCourse(courseId);
  const { data: progressList } = useCourseProgress(courseId);
  const completeLesson = useCompleteLesson();

  const mock = mockCourses.find((c) => c.id === courseId);

  const sections: SectionItem[] = useMemo(() => {
    if (rawCourse?.sections?.length) {
      return rawCourse.sections.map((s: any) => ({
        id: s.id,
        title: s.title,
        lessons: (s.lessons || []).map((l: any) => ({
          id: l.id,
          title: l.title,
          type: l.type || "video",
          durationMinutes: l.durationMinutes,
          content: l.content,
          videoUrl: l.videoUrl,
        })),
      }));
    }
    return mockCurriculum.map((m: any) => ({
      id: m.id,
      title: m.title,
      lessons: m.lessons.map((l: any) => ({
        id: l.id,
        title: l.title,
        type: l.type,
        duration: l.duration,
        completed: l.completed,
      })),
    }));
  }, [rawCourse, courseId]);

  const allLessons = useMemo(
    () => sections.flatMap((s) => s.lessons),
    [sections],
  );

  const completedFromApi = useMemo(() => {
    const set = new Set<string>();
    progressList?.forEach((p) => {
      if (p.isCompleted) set.add(p.lessonId);
    });
    // Also seed from mock completed flags
    allLessons.forEach((l) => {
      if (l.completed) set.add(l.id);
    });
    return set;
  }, [progressList, allLessons]);

  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [activeLessonId, setActiveLessonId] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    setCompletedIds(completedFromApi);
  }, [completedFromApi]);

  useEffect(() => {
    if (allLessons.length && !activeLessonId) {
      const next =
        allLessons.find((l) => !completedFromApi.has(l.id))?.id ?? allLessons[0]?.id;
      if (next) setActiveLessonId(next);
    }
  }, [allLessons, completedFromApi, activeLessonId]);

  if (!isLoading && !rawCourse && !mock) {
    notFound();
  }

  if (isLoading && !mock && allLessons.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const courseTitle = rawCourse?.title || mock?.title || "Course";
  const activeLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  const activeIndex = allLessons.findIndex((l) => l.id === activeLessonId);
  const progressPct =
    allLessons.length > 0
      ? Math.round((completedIds.size / allLessons.length) * 100)
      : 0;

  const quizScore = useMemo(() => {
    const correct = quizQuestions.filter((q) => quizAnswers[q.id] === q.correctIndex).length;
    return Math.round((correct / quizQuestions.length) * 100);
  }, [quizAnswers]);

  function goToLesson(id: string) {
    setActiveLessonId(id);
    setQuizSubmitted(false);
    setQuizAnswers({});
    setSidebarOpen(false);
  }

  async function markCompleteAndContinue() {
    if (!activeLesson) return;
    setCompleting(true);
    try {
      // Try live API; ignore failure and still advance UI
      if (rawCourse) {
        await completeLesson.mutateAsync(activeLesson.id);
        toast.success("+25 XP");
      }
      setCompletedIds((prev) => new Set(prev).add(activeLesson.id));
      if (activeIndex < allLessons.length - 1) {
        goToLesson(allLessons[activeIndex + 1].id);
      } else {
        toast.success("Course complete! 🎉");
      }
    } catch (err: any) {
      // Still mark locally for UX when backend has no lesson yet
      setCompletedIds((prev) => new Set(prev).add(activeLesson.id));
      if (activeIndex < allLessons.length - 1) {
        goToLesson(allLessons[activeIndex + 1].id);
      }
      if (err?.status !== 404) {
        toast.error(err?.message || "Could not save progress");
      }
    } finally {
      setCompleting(false);
    }
  }

  function goNext() {
    markCompleteAndContinue();
  }

  if (!activeLesson) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-text-secondary">No lessons in this course yet.</p>
        <Link href={`/courses/${courseId}`} className="inline-flex items-center justify-center gap-2 rounded-btn border border-border bg-white px-5 py-2.5 text-sm font-semibold text-text shadow-sm transition-all hover:bg-background-secondary">Back to course</Link>
      </div>
    );
  }

  const typeIcon = (type: string) => {
    if (type === "reading") return <FileText className="h-4 w-4" />;
    if (type === "quiz") return <HelpCircle className="h-4 w-4" />;
    if (type === "challenge") return <Flame className="h-4 w-4" />;
    return <PlayCircle className="h-4 w-4" />;
  };

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3 lg:hidden">
        <Link
          href={`/courses/${courseId}`}
          className="flex items-center gap-1 text-sm text-text-secondary"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Link>
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open curriculum"
          className="rounded-btn p-2 text-text-secondary hover:bg-background-secondary"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar curriculum */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-80 transform border-r border-border bg-white transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-4">
            <div className="min-w-0">
              <Link
                href={`/courses/${courseId}`}
                className="text-xs text-text-secondary hover:text-text"
              >
                ← Course page
              </Link>
              <p className="mt-1 line-clamp-1 font-heading text-sm font-semibold text-text">
                {courseTitle}
              </p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close curriculum"
              className="rounded-btn p-1.5 text-text-secondary hover:bg-background-secondary lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="border-b border-border px-4 py-3">
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-medium text-primary">{progressPct}% complete</span>
              <span className="text-text-secondary">
                {completedIds.size}/{allLessons.length}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-background-secondary">
              <div
                className="h-full rounded-full bg-progress-gradient transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto py-2">
            {sections.map((section) => (
              <div key={section.id} className="mb-2">
                <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  {section.title}
                </p>
                <ul>
                  {section.lessons.map((lesson) => {
                    const done = completedIds.has(lesson.id);
                    const active = lesson.id === activeLessonId;
                    return (
                      <li key={lesson.id}>
                        <button
                          onClick={() => goToLesson(lesson.id)}
                          className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                            active
                              ? "bg-primary-light text-primary-hover"
                              : "text-text-secondary hover:bg-background-secondary hover:text-text"
                          }`}
                        >
                          {done ? (
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                          ) : (
                            <Circle className="h-4 w-4 shrink-0 opacity-40" />
                          )}
                          <span className="flex-1 line-clamp-1">{lesson.title}</span>
                          <span className="opacity-60">{typeIcon(lesson.type)}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8">
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            {typeIcon(activeLesson.type)}
            <span className="capitalize">{activeLesson.type}</span>
            {(activeLesson.duration || activeLesson.durationMinutes) && (
              <>
                <span aria-hidden>·</span>
                <span>
                  {activeLesson.duration ||
                    `${activeLesson.durationMinutes} min`}
                </span>
              </>
            )}
          </div>
          <h1 className="mt-2 font-heading text-2xl font-bold text-text sm:text-3xl">
            {activeLesson.title}
          </h1>

          {activeLesson.type === "quiz" ? (
            <div className="mt-8 space-y-6">
              {!quizSubmitted ? (
                <>
                  {quizQuestions.map((q) => (
                    <div key={q.id} className="card-surface p-5">
                      <p className="font-medium text-text">{q.prompt}</p>
                      <div className="mt-4 space-y-2">
                        {q.options.map((opt, oIndex) => (
                          <label
                            key={oIndex}
                            className="flex cursor-pointer items-center gap-3 rounded-input border border-border px-4 py-3 text-sm hover:bg-background-secondary"
                          >
                            <input
                              type="radio"
                              name={q.id}
                              className="h-4 w-4 text-primary focus:ring-primary"
                              checked={quizAnswers[q.id] === oIndex}
                              onChange={() =>
                                setQuizAnswers((prev) => ({ ...prev, [q.id]: oIndex }))
                              }
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button
                    onClick={() => setQuizSubmitted(true)}
                    disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                  >
                    Submit quiz
                  </Button>
                </>
              ) : (
                <div className="card-surface p-8 text-center">
                  <p className="font-heading text-3xl font-bold text-primary">{quizScore}%</p>
                  <p className="mt-1 text-text-secondary">
                    {quizScore >= 70
                      ? "Nice work — you passed!"
                      : "Not quite — review the lesson and try again."}
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setQuizSubmitted(false);
                        setQuizAnswers({});
                      }}
                    >
                      Retake quiz
                    </Button>
                    {quizScore >= 70 && (
                      <Button onClick={goNext} disabled={completing}>
                        {completing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continue"}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : activeLesson.type === "challenge" ? (
            <div className="mt-8 card-surface bg-orange-50 p-8 text-center">
              <Flame className="mx-auto h-8 w-8 text-orange-600" />
              <p className="mt-3 font-heading text-lg font-semibold text-text">Final challenge</p>
              <p className="mt-2 text-sm text-text-secondary">
                Apply everything from this module in one hands-on project.
              </p>
              <Button className="mt-5" onClick={goNext} disabled={completing}>
                {completing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Mark challenge complete
              </Button>
            </div>
          ) : (
            <>
              <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-card bg-zinc-900">
                {activeLesson.videoUrl ? (
                  <video
                    src={activeLesson.videoUrl}
                    controls
                    className="h-full w-full"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="h-16 w-16 text-white/90" />
                  </div>
                )}
              </div>

              <div className="prose-sm mt-6 space-y-4 text-text">
                {activeLesson.content ? (
                  <div className="whitespace-pre-wrap text-text-secondary">
                    {activeLesson.content}
                  </div>
                ) : (
                  <>
                    <p className="text-text-secondary">
                      Lesson content for{" "}
                      <strong className="text-text">{activeLesson.title}</strong>.
                      Mark complete when you&apos;re done to save progress and earn XP.
                    </p>
                  </>
                )}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                <button
                  disabled={activeIndex <= 0}
                  onClick={() => goToLesson(allLessons[activeIndex - 1].id)}
                  className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                <Button onClick={goNext} disabled={completing}>
                  {completing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {activeIndex === allLessons.length - 1
                    ? "Finish course"
                    : "Mark complete & continue"}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
