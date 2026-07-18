import Link from "next/link";
import { Code2, BarChart3, Palette, Briefcase, Smartphone, Sparkles, ArrowRight } from "lucide-react";
import { categories } from "@/data/mock";

const categoryIcons: Record<string, typeof Code2> = {
  Code2, BarChart3, Palette, Briefcase, Smartphone, Sparkles,
};

export default function CategoriesPage() {
  return (
    <>
      <section className="border-b border-border bg-background-secondary py-16">
        <div className="container-page">
          <h1 className="font-heading text-4xl font-bold text-text sm:text-5xl">Categories</h1>
          <p className="mt-4 max-w-xl text-lg text-text-secondary">
            Explore courses organized by skill area, from web development to AI.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.icon] ?? Code2;
            return (
              <Link key={cat.id} href={`/categories/${cat.slug}`} className="card-surface flex items-start gap-4 p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <div className="flex-1">
                  <p className="font-heading text-lg font-semibold text-text">{cat.name}</p>
                  <p className="mt-1 text-sm text-text-secondary">{cat.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-text-secondary">{cat.courseCount} courses</span>
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
