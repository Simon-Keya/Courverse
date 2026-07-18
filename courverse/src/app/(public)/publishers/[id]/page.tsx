import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, Users, BookOpen, BadgeCheck } from "lucide-react";
import { publishers, courses } from "@/data/mock";
import { CourseCard } from "@/components/course/CourseCard";

export function generateStaticParams() {
  return publishers.map((p) => ({ id: p.id }));
}

export default function PublisherDetailPage({ params }: { params: { id: string } }) {
  const publisher = publishers.find((p) => p.id === params.id);
  if (!publisher) notFound();

  const publisherCourses = courses.filter((c) => c.publisher.id === publisher.id);

  return (
    <>
      <section className="border-b border-border bg-background-secondary py-16">
        <div className="container-page flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          <Image
            src={publisher.avatarUrl}
            alt={publisher.name}
            width={96}
            height={96}
            className="rounded-full border-4 border-white shadow-sm"
          />
          <div>
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <h1 className="font-heading text-3xl font-bold text-text">{publisher.name}</h1>
              <BadgeCheck className="h-6 w-6 text-primary" />
            </div>
            <p className="mt-2 max-w-xl text-text-secondary">{publisher.bio}</p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-sm text-text-secondary sm:justify-start">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-reward text-reward" />
                <span className="font-semibold text-text">{publisher.rating}</span> rating
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" /> {publisher.studentsCount.toLocaleString()} students
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" /> {publisher.coursesCount} courses
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="font-heading text-2xl font-bold text-text">Courses by {publisher.name}</h2>
        {publisherCourses.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {publisherCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-text-secondary">This publisher hasn't published any courses yet.</p>
        )}
      </section>
    </>
  );
}
