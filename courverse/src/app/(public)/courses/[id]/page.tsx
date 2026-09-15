"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star, Clock, BarChart3, PlayCircle, CheckCircle2, Sparkles, Users, Loader2, BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCourse, useEnrollment, useEnroll } from "@/hooks/use-courses";
import { normalizeCourse } from "@/types/course";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";
import { wishlistApi } from "@/api/modules/wishlist";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { courses as mockCourses, curriculum as mockCurriculum } from "@/data/mock";
import { useRouter } from "next/navigation";

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolved = typeof (params as any).then === "function" ? use(params as Promise<{ id: string }>) : (params as { id: string });
  const id = resolved.id;

  const { data: raw, isLoading, isError } = useCourse(id);
  const { data: enrollment } = useEnrollment(id);
  const enrollMutation = useEnroll();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const qc = useQueryClient();
  const { data: wishStatus } = useQuery({
    queryKey: ["wishlist-status", id],
    queryFn: () => wishlistApi.status(id),
    enabled: isAuthenticated,
  });
  const wishMutation = useMutation({
    mutationFn: async () => {
      if (wishStatus?.inWishlist) return wishlistApi.remove(id);
      return wishlistApi.add(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["wishlist-status", id] });
      qc.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success(wishStatus?.inWishlist ? "Removed from wishlist" : "Saved to wishlist");
    },
    onError: (e: any) => toast.error(e?.message || "Wishlist update failed"),
  });
  const router = useRouter();

  // Fallback to mock when API unavailable
  const mock = mockCourses.find((c) => c.id === id);
  const course = raw ? normalizeCourse(raw) : mock ? normalizeCourse(mock) : null;

  if (!isLoading && !course) {
    notFound();
  }

  if (isLoading && !course) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) return null;

  const isEnrolled = !!enrollment || typeof course.progress === "number";
  const progress = enrollment?.progressPercentage ?? course.progress ?? 0;
  const sections = raw?.sections?.length
    ? raw.sections
    : mockCurriculum.map((m: any) => ({
        id: m.id,
        title: m.title,
        lessons: m.lessons.map((l: any) => ({
          id: l.id,
          title: l.title,
          type: l.type,
          durationMinutes: 0,
          isPreview: false,
        })),
      }));
  const totalLessons =
    course.lessonCount ||
    course.lessonsCount ||
    sections.reduce((acc: number, s: any) => acc + (s.lessons?.length || 0), 0);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      toast.info("Please log in to enroll");
      router.push(`/login?redirect=/courses/${id}`);
      return;
    }
    enrollMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Enrolled successfully!");
        router.push(`/courses/${id}/learn`);
      },
      onError: (err: any) => {
        toast.error(err?.message || "Could not enroll");
      },
    });
  };

  const categoryLabel =
    typeof course.category === "string" ? course.category : course.category?.name || "General";

  return (
    <>
      <section className="border-b border-border bg-background-secondary py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
              <span>{categoryLabel}</span>
              <span aria-hidden>·</span>
              <span className="capitalize">{course.level}</span>
              {course.isPremium && (
                <Badge variant="premium">
                  <Sparkles className="h-3 w-3" /> Premium
                </Badge>
              )}
              {course.isFree && (
                <Badge className="bg-emerald-600 text-white">Free</Badge>
              )}
            </div>

            <h1 className="mt-3 font-heading text-3xl font-bold text-text sm:text-4xl">
              {course.title}
            </h1>
            <p className="mt-4 text-lg text-text-secondary">{course.description}</p>

            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-reward text-reward" />
                <span className="font-semibold text-text">{(course.rating || 0).toFixed(1)}</span>
                <span className="text-text-secondary">
                  ({(course.reviewCount || 0).toLocaleString()} reviews)
                </span>
              </span>
              <span className="flex items-center gap-1.5 text-text-secondary">
                <Users className="h-4 w-4" />{" "}
                {(course.studentsCount || 0).toLocaleString()} students
              </span>
              {course.duration && (
                <span className="flex items-center gap-1.5 text-text-secondary">
                  <Clock className="h-4 w-4" /> {course.duration}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-text-secondary">
                <BarChart3 className="h-4 w-4" /> {totalLessons} lessons
              </span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Image
                src={
                  course.publisher?.avatarUrl ||
                  `https://i.pravatar.cc/48?u=${course.publisher?.id || "x"}`
                }
                alt={course.publisher?.name || "Publisher"}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-text">{course.publisher?.name}</p>
                <p className="text-xs text-text-secondary">Instructor</p>
              </div>
            </div>
          </div>

          {/* Sticky enroll card */}
          <div className="lg:sticky lg:top-24">
            <div className="card-surface overflow-hidden">
              <div className="relative aspect-video w-full bg-background-secondary">
                <Image
                  src={
                    course.thumbnailUrl ||
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop"
                  }
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
              <div className="p-6">
                <p className="font-heading text-2xl font-bold text-text">
                  {course.isFree || course.price === 0
                    ? "Free"
                    : `$${Number(course.price).toFixed(0)}`}
                </p>

                {isEnrolled ? (
                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="font-medium text-primary">{progress}% complete</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-background-secondary">
                        <div
                          className="h-full rounded-full bg-progress-gradient"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <Link href={`/courses/${id}/learn`} className="inline-flex items-center justify-center gap-2 rounded-btn bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-hover w-full"><PlayCircle className="mr-2 h-4 w-4" />
                        {progress > 0 ? "Continue learning" : "Start learning"}</Link>
                  </div>
                ) : (
                  <Button
                    className="mt-4 w-full"
                    onClick={handleEnroll}
                    disabled={enrollMutation.isPending}
                  >
                    {enrollMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enrolling…
                      </>
                    ) : (
                      <>
                        <BookOpen className="mr-2 h-4 w-4" /> Enroll now
                      </>
                    )}
                  </Button>
                )}

                {isAuthenticated && (
                  <button
                    type="button"
                    onClick={() => wishMutation.mutate()}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-btn border border-border py-2.5 text-sm font-medium text-text hover:bg-background-secondary"
                  >
                    <Heart className={`h-4 w-4 ${wishStatus?.inWishlist ? "fill-red-500 text-red-500" : ""}`} />
                    {wishStatus?.inWishlist ? "Saved" : "Add to wishlist"}
                  </button>
                )}

                <ul className="mt-5 space-y-2 text-sm text-text-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> Full lifetime access
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> Certificate of completion
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {totalLessons} lessons
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum + outcomes */}
      <section className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="font-heading text-xl font-bold text-text">Curriculum</h2>
            <p className="mt-1 text-sm text-text-secondary">
              {sections.length} sections · {totalLessons} lessons
            </p>
            <div className="mt-6 space-y-3">
              {sections.map((section: any, idx: number) => (
                <details
                  key={section.id || idx}
                  className="group rounded-card border border-border bg-white open:shadow-sm"
                  open={idx === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-medium text-text">
                    <span>
                      {section.title}
                      <span className="ml-2 text-sm font-normal text-text-secondary">
                        {section.lessons?.length || 0} lessons
                      </span>
                    </span>
                  </summary>
                  <ul className="border-t border-border px-5 py-2">
                    {(section.lessons || []).map((lesson: any) => (
                      <li
                        key={lesson.id}
                        className="flex items-center gap-3 py-2.5 text-sm text-text-secondary"
                      >
                        <PlayCircle className="h-4 w-4 shrink-0 text-primary" />
                        <span className="flex-1 text-text">{lesson.title}</span>
                        {lesson.isPreview && (
                          <Badge className="text-xs">Preview</Badge>
                        )}
                        {lesson.durationMinutes > 0 && (
                          <span className="text-xs">{lesson.durationMinutes} min</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {course.learningOutcomes && course.learningOutcomes.length > 0 && (
              <div>
                <h2 className="font-heading text-xl font-bold text-text">What you&apos;ll learn</h2>
                <ul className="mt-4 space-y-2">
                  {course.learningOutcomes.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {course.requirements && course.requirements.length > 0 && (
              <div>
                <h2 className="font-heading text-xl font-bold text-text">Requirements</h2>
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-text-secondary">
                  {course.requirements.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
