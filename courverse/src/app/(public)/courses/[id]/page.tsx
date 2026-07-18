import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star, Clock, BarChart3, PlayCircle, CheckCircle2, Lock, Sparkles, Users,
} from "lucide-react";
import { courses, curriculum } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }));
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id);
  if (!course) notFound();

  const isEnrolled = typeof course.progress === "number";
  const totalLessons = curriculum.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-background-secondary py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
              <span>{course.category}</span>
              <span aria-hidden>·</span>
              <span>{course.level}</span>
              {course.isPremium && (
                <Badge variant="premium"><Sparkles className="h-3 w-3" /> Premium</Badge>
              )}
            </div>

            <h1 className="mt-3 font-heading text-3xl font-bold text-text sm:text-4xl">{course.title}</h1>
            <p className="mt-4 text-lg text-text-secondary">{course.description}</p>

            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-reward text-reward" />
                <span className="font-semibold text-text">{course.rating}</span>
                <span className="text-text-secondary">({course.reviewCount.toLocaleString()} reviews)</span>
              </span>
              <span className="flex items-center gap-1.5 text-text-secondary">
                <Users className="h-4 w-4" /> {course.studentsCount.toLocaleString()} students
              </span>
              <span className="flex items-center gap-1.5 text-text-secondary">
                <Clock className="h-4 w-4" /> {course.duration}
              </span>
              <span className="flex items-center gap-1.5 text-text-secondary">
                <BarChart3 className="h-4 w-4" /> {course.lessonsCount} lessons
              </span>
            </div>

            <Link href={`/publishers/${course.publisher.id}`} className="mt-6 flex items-center gap-3">
              <Image src={course.publisher.avatarUrl} alt={course.publisher.name} width={40} height={40} className="rounded-full" />
              <div>
                <p className="text-xs text-text-secondary">Created by</p>
                <p className="text-sm font-semibold text-text">{course.publisher.name}</p>
              </div>
            </Link>
          </div>

          {/* Enroll card */}
          <div className="card-surface overflow-hidden">
            <div className="relative aspect-video w-full">
              <Image src={course.thumbnailUrl} alt={course.title} fill className="object-cover" />
              <button
                aria-label="Preview course"
                className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
              >
                <PlayCircle className="h-14 w-14 text-white" />
              </button>
            </div>
            <div className="p-6">
              {isEnrolled ? (
                <>
                  <div className="mb-4">
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-background-secondary">
                      <div className="h-full rounded-full bg-progress-gradient" style={{ width: `${course.progress}%` }} />
                    </div>
                    <p className="mt-1.5 text-xs font-semibold text-primary">{course.progress}% complete</p>
                  </div>
                  <Link href={`/courses/${course.id}/learn`}>
                    <Button className="w-full" size="lg">Continue learning</Button>
                  </Link>
                </>
              ) : (
                <>
                  <p className="font-heading text-3xl font-bold text-text">
                    {course.price === 0 ? "Free" : `$${course.price}`}
                  </p>
                  <Link href={`/courses/${course.id}/learn`}>
                    <Button className="mt-4 w-full" size="lg">Enroll now</Button>
                  </Link>
                  <p className="mt-3 text-center text-xs text-text-secondary">30-day money-back guarantee</p>
                </>
              )}

              <ul className="mt-6 space-y-2.5 border-t border-border pt-5 text-sm text-text-secondary">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Full lifetime access</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Certificate of completion</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Access on mobile and desktop</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div>
          {/* Curriculum */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-text">Curriculum</h2>
            <p className="mt-1 text-sm text-text-secondary">{curriculum.length} modules · {totalLessons} lessons</p>

            <div className="mt-6 space-y-3">
              {curriculum.map((module, mIndex) => (
                <details key={module.id} className="card-surface group open:shadow-md" open={mIndex === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between p-5">
                    <span className="font-heading font-semibold text-text">
                      {mIndex + 1}. {module.title}
                    </span>
                    <span className="text-xs text-text-secondary">{module.lessons.length} lessons</span>
                  </summary>
                  <ul className="space-y-1 border-t border-border px-5 pb-4 pt-2">
                    {module.lessons.map((lesson, lIndex) => (
                      <li key={lesson.id} className="flex items-center justify-between gap-3 rounded-btn px-2 py-2.5 text-sm text-text-secondary hover:bg-background-secondary">
                        <span className="flex items-center gap-3">
                          {mIndex === 0 ? (
                            <PlayCircle className="h-4 w-4 shrink-0 text-primary" />
                          ) : (
                            <Lock className="h-4 w-4 shrink-0 text-text-secondary" />
                          )}
                          <span>{lIndex + 1}. {lesson.title}</span>
                        </span>
                        <span className="shrink-0 text-xs text-text-secondary">{lesson.duration}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="mt-14">
            <h2 className="font-heading text-2xl font-bold text-text">About this course</h2>
            <p className="mt-4 text-text-secondary">
              {course.description} You'll work through hands-on projects, quizzes, and a final challenge designed to reinforce every concept as you go — with XP and rewards along the way.
            </p>
          </div>

          {/* About publisher */}
          <div className="mt-14 card-surface p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">Instructor</p>
            <div className="mt-3 flex items-center gap-4">
              <Image src={course.publisher.avatarUrl} alt={course.publisher.name} width={56} height={56} className="rounded-full" />
              <div>
                <p className="font-heading font-semibold text-text">{course.publisher.name}</p>
                <Link href={`/publishers/${course.publisher.id}`} className="text-sm font-medium text-primary hover:text-primary-hover">
                  View full profile →
                </Link>
              </div>
            </div>
          </div>

          {/* Reviews placeholder */}
          <div className="mt-14">
            <h2 className="font-heading text-2xl font-bold text-text">Reviews</h2>
            <div className="mt-6 rounded-card border border-dashed border-border p-10 text-center text-text-secondary">
              Reviews will appear here once learners start rating this course.
            </div>
          </div>
        </div>

        {/* Sidebar: related info */}
        <aside className="space-y-6">
          <div className="card-surface p-6">
            <p className="font-heading font-semibold text-text">This course includes</p>
            <ul className="mt-4 space-y-3 text-sm text-text-secondary">
              <li className="flex justify-between"><span>Level</span><span className="font-medium text-text">{course.level}</span></li>
              <li className="flex justify-between"><span>Duration</span><span className="font-medium text-text">{course.duration}</span></li>
              <li className="flex justify-between"><span>Lessons</span><span className="font-medium text-text">{course.lessonsCount}</span></li>
              <li className="flex justify-between"><span>Category</span><span className="font-medium text-text">{course.category}</span></li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
