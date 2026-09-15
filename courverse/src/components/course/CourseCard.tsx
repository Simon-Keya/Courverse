"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Sparkles, Clock, Users } from "lucide-react";
import { Course } from "@/types/course";
import { Badge } from "@/components/ui/badge";

export function CourseCard({ course }: { course: Course }) {
  const thumbnail = course.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop";
  const publisherAvatar = course.publisher?.avatarUrl || `https://i.pravatar.cc/40?u=${course.publisher?.id || "x"}`;
  const categoryLabel = typeof course.category === "string" ? course.category : course.category?.name || "General";
  const level = course.level || course.difficulty || "Beginner";
  const rating = course.rating || 0;
  const reviewCount = course.reviewCount ?? course.ratingCount ?? 0;
  const students = course.studentsCount ?? course.enrollmentCount ?? 0;
  const lessons = course.lessonsCount ?? course.lessonCount ?? 0;
  const duration = course.duration || (course.durationMinutes ? `${Math.round(course.durationMinutes / 60)}h` : "");

  return (
    <Link
      href={`/courses/${course.id}`}
      className="card-surface group flex flex-col overflow-hidden transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-background-secondary">
        <Image
          src={thumbnail}
          alt={course.title}
          fill
          sizes="(min-width: 1024px) 320px, 90vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        {course.isPremium && (
          <Badge variant="premium" className="absolute left-3 top-3">
            <Sparkles className="h-3 w-3" /> Premium
          </Badge>
        )}
        {course.isFree && !course.isPremium && (
          <Badge className="absolute left-3 top-3 bg-emerald-600 text-white">Free</Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <span className="truncate">{categoryLabel}</span>
          <span aria-hidden>·</span>
          <span className="capitalize">{level}</span>
        </div>

        <h3 className="line-clamp-2 font-heading text-base font-semibold leading-snug text-text">
          {course.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Image
            src={publisherAvatar}
            alt={course.publisher?.name || "Publisher"}
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="truncate">{course.publisher?.name}</span>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-reward text-reward" />
            <span className="font-semibold text-text">{rating.toFixed(1)}</span>
            {reviewCount > 0 && (
              <span className="text-text-secondary">({reviewCount.toLocaleString()})</span>
            )}
          </div>
          {students > 0 && (
            <div className="flex items-center gap-1 text-text-secondary">
              <Users className="h-3.5 w-3.5" />
              <span>{students.toLocaleString()}</span>
            </div>
          )}
          {duration && (
            <div className="flex items-center gap-1 text-text-secondary">
              <Clock className="h-3.5 w-3.5" />
              <span>{duration}</span>
            </div>
          )}
        </div>

        {typeof course.progress === "number" ? (
          <div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-background-secondary">
              <div
                className="h-full rounded-full bg-progress-gradient"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-xs">
              <span className="font-medium text-primary">{course.progress}% complete</span>
              {lessons > 0 && (
                <span className="text-text-secondary">{lessons} lessons</span>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between pt-1">
            <span className="font-heading text-lg font-bold text-text">
              {course.isFree || course.price === 0 ? "Free" : `$${Number(course.price).toFixed(0)}`}
            </span>
            {lessons > 0 && (
              <span className="text-xs text-text-secondary">{lessons} lessons</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
