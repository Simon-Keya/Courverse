import Image from "next/image";
import Link from "next/link";
import { Star, Sparkles } from "lucide-react";
import { Course } from "@/types/course";
import { Badge } from "@/components/ui/badge";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="card-surface group flex flex-col overflow-hidden"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-background-secondary">
        <Image
          src={course.thumbnailUrl}
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
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <span>{course.category}</span>
          <span aria-hidden>·</span>
          <span>{course.level}</span>
        </div>

        <h3 className="line-clamp-2 font-heading text-base font-semibold leading-snug text-text">
          {course.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Image
            src={course.publisher.avatarUrl}
            alt={course.publisher.name}
            width={20}
            height={20}
            className="rounded-full"
          />
          <span>{course.publisher.name}</span>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-reward text-reward" />
          <span className="font-semibold text-text">{course.rating}</span>
          <span className="text-text-secondary">({course.reviewCount.toLocaleString()})</span>
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
              <span className="font-semibold text-primary">Continue →</span>
            </div>
          </div>
        ) : (
          <div className="mt-auto flex items-center justify-between pt-1">
            <span className="font-heading text-base font-bold text-text">
              {course.price === 0 ? "Free" : `$${course.price}`}
            </span>
            <span className="text-sm font-semibold text-primary">View course →</span>
          </div>
        )}
      </div>
    </Link>
  );
}
