import { notFound } from "next/navigation";
import { Code2, BarChart3, Palette, Briefcase, Smartphone, Sparkles } from "lucide-react";
import { categories, courses } from "@/data/mock";
import { CourseCard } from "@/components/course/CourseCard";

const categoryIcons: Record<string, typeof Code2> = {
  Code2, BarChart3, Palette, Briefcase, Smartphone, Sparkles,
};

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const Icon = categoryIcons[category.icon] ?? Code2;
  const categoryCourses = courses.filter((c) => c.category === category.name);

  return (
    <>
      <section className="border-b border-border bg-background-secondary py-16">
        <div className="container-page flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
            <Icon className="h-7 w-7" />
          </span>
          <div>
            <h1 className="font-heading text-3xl font-bold text-text sm:text-4xl">{category.name}</h1>
            <p className="mt-1 text-text-secondary">{category.description}</p>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <p className="text-sm text-text-secondary">{categoryCourses.length} of {category.courseCount} courses shown</p>
        {categoryCourses.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-text-secondary">No courses published in this category yet.</p>
        )}
      </section>
    </>
  );
}
