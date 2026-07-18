"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft, PlayCircle, FileText, HelpCircle, Flame, CheckCircle2, Circle,
  Menu, X, ChevronRight,
} from "lucide-react";
import { courses, curriculum } from "@/data/mock";
import { Button } from "@/components/ui/button";

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

export default function CoursePlayerPage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id);
  if (!course) notFound();

  const allLessons = curriculum.flatMap((m) => m.lessons);
  const [completedIds, setCompletedIds] = useState<string[]>(
    allLessons.filter((l) => l.completed).map((l) => l.id)
  );
  const [activeLessonId, setActiveLessonId] = useState(
    allLessons.find((l) => !l.completed)?.id ?? allLessons[0].id
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const activeLesson = allLessons.find((l) => l.id === activeLessonId)!;
  const activeIndex = allLessons.findIndex((l) => l.id === activeLessonId);
  const progressPct = Math.round((completedIds.length / allLessons.length) * 100);

  const quizScore = useMemo(() => {
    const correct = quizQuestions.filter((q) => quizAnswers[q.id] === q.correctIndex).length;
    return Math.round((correct / quizQuestions.length) * 100);
  }, [quizAnswers]);

  function markComplete(lessonId: string) {
    setCompletedIds((prev) => (prev.includes(lessonId) ? prev : [...prev, lessonId]));
  }

  function goToLesson(id: string) {
    setActiveLessonId(id);
    setQuizSubmitted(false);
    setQuizAnswers({});
    setSidebarOpen(false);
  }

  function goNext() {
    markComplete(activeLesson.id);
    const next = allLessons[activeIndex + 1];
    if (next) goToLesson(next.id);
  }

  const icons = { video: PlayCircle, reading: FileText, quiz: HelpCircle, challenge: Flame };

  return (
    <div className="flex min-h-screen flex-col bg-white lg:flex-row">
      {/* Top bar for player (overrides nothing, sits inside learner shell) */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3 lg:hidden">
        <Link href={`/courses/${course.id}`} className="flex items-center gap-1.5 text-sm font-medium text-text-secondary">
          <ChevronLeft className="h-4 w-4" /> Exit
        </Link>
        <button onClick={() => setSidebarOpen(true)} aria-label="Open curriculum" className="rounded-btn p-2 text-text-secondary hover:bg-background-secondary">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Curriculum sidebar */}
      <aside className={`
        fixed inset-0 z-50 bg-white lg:static lg:z-auto lg:w-80 lg:shrink-0 lg:border-r lg:border-border
        ${sidebarOpen ? "block" : "hidden lg:block"}
      `}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <Link href={`/courses/${course.id}`} className="hidden items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text lg:flex">
                <ChevronLeft className="h-3.5 w-3.5" /> Exit course
              </Link>
              <p className="mt-1 line-clamp-1 font-heading text-sm font-semibold text-text">{course.title}</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} aria-label="Close curriculum" className="rounded-btn p-1.5 text-text-secondary hover:bg-background-secondary lg:hidden">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="border-b border-border px-5 py-4">
            <div className="h-2 w-full overflow-hidden rounded-full bg-background-secondary">
              <div className="h-full rounded-full bg-progress-gradient" style={{ width: `${progressPct}%` }} />
            </div>
            <p className="mt-1.5 text-xs font-semibold text-primary">{progressPct}% complete</p>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-3">
            {curriculum.map((module, mIndex) => (
              <div key={module.id} className="mb-2">
                <p className="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  {mIndex + 1}. {module.title}
                </p>
                <div className="space-y-0.5">
                  {module.lessons.map((lesson) => {
                    const Icon = icons[lesson.type as keyof typeof icons] ?? FileText;
                    const isDone = completedIds.includes(lesson.id);
                    const isActive = lesson.id === activeLessonId;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => goToLesson(lesson.id)}
                        className={`flex w-full items-center gap-3 rounded-btn px-3 py-2.5 text-left text-sm transition-colors ${
                          isActive ? "bg-primary-light text-primary-hover" : "text-text hover:bg-background-secondary"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                        ) : (
                          <Circle className="h-4 w-4 shrink-0 text-text-secondary" />
                        )}
                        <Icon className="h-4 w-4 shrink-0 text-text-secondary" />
                        <span className="flex-1 line-clamp-1">{lesson.title}</span>
                        <span className="shrink-0 text-xs text-text-secondary">{lesson.duration}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
          <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
            Lesson {activeIndex + 1} of {allLessons.length}
          </p>
          <h1 className="mt-1 font-heading text-2xl font-bold text-text">{activeLesson.title}</h1>

          {activeLesson.type === "quiz" ? (
            <div className="mt-8 space-y-6">
              {!quizSubmitted ? (
                <>
                  {quizQuestions.map((q, qIndex) => (
                    <div key={q.id} className="card-surface p-6">
                      <p className="font-medium text-text">{qIndex + 1}. {q.prompt}</p>
                      <div className="mt-4 space-y-2">
                        {q.options.map((opt, oIndex) => (
                          <label
                            key={opt}
                            className={`flex cursor-pointer items-center gap-3 rounded-btn border px-4 py-2.5 text-sm transition-colors ${
                              quizAnswers[q.id] === oIndex ? "border-primary bg-primary-light" : "border-border hover:bg-background-secondary"
                            }`}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              className="h-4 w-4 text-primary focus:ring-primary"
                              checked={quizAnswers[q.id] === oIndex}
                              onChange={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: oIndex }))}
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
                    {quizScore >= 70 ? "Nice work — you passed!" : "Not quite — review the lesson and try again."}
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <Button variant="secondary" onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}>
                      Retake quiz
                    </Button>
                    {quizScore >= 70 && <Button onClick={goNext}>Continue</Button>}
                  </div>
                </div>
              )}
            </div>
          ) : activeLesson.type === "challenge" ? (
            <div className="mt-8 card-surface bg-orange-50 p-8 text-center">
              <Flame className="mx-auto h-8 w-8 text-challenge" />
              <p className="mt-3 font-heading text-lg font-semibold text-text">Final challenge</p>
              <p className="mt-2 text-sm text-text-secondary">
                Apply everything from this module in one hands-on project. Submit your work to earn your certificate.
              </p>
              <Button className="mt-5" onClick={goNext}>Mark challenge complete</Button>
            </div>
          ) : (
            <>
              <div className="mt-6 relative aspect-video w-full overflow-hidden rounded-card bg-dark-bg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="h-16 w-16 text-white/90" />
                </div>
              </div>

              <div className="prose-sm mt-6 space-y-4 text-text">
                <p className="text-text-secondary">
                  This is placeholder lesson content for <strong className="text-text">{activeLesson.title}</strong>. In
                  production this area renders the publisher's markdown content alongside the video player above.
                </p>
                <p className="text-text-secondary">
                  Use the sidebar to jump between lessons, or hit continue below once you're done to automatically
                  mark this lesson complete and move to the next one.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                <button
                  disabled={activeIndex === 0}
                  onClick={() => goToLesson(allLessons[activeIndex - 1].id)}
                  className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                <Button onClick={goNext}>
                  {activeIndex === allLessons.length - 1 ? "Finish course" : "Mark complete & continue"}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
