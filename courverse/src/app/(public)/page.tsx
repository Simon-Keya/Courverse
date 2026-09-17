import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturedCourses } from "@/components/course/FeaturedCourses";

export default function HomePage() {
  return (
    <>
      <section className="border-b border-border bg-background-secondary">
        <div className="container-page py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Courverse
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
            Learn skills that move your career forward
          </h1>
          <p className="mt-5 max-w-xl text-lg text-text-secondary">
            A multi-category learning platform for technology, business, design,
            languages, and professional development.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/courses">
                Browse courses <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/categories">Explore categories</Link>
            </Button>
          </div>
          <form action="/search" className="mt-10 flex max-w-md items-center gap-2 rounded-input border border-border bg-white p-1.5 shadow-sm">
            <Search className="ml-2 h-5 w-5 shrink-0 text-text-secondary" />
            <input
              name="q"
              type="search"
              placeholder="Search courses…"
              className="w-full bg-transparent px-2 py-2 text-sm focus:outline-none"
              aria-label="Search courses"
            />
          </form>
        </div>
      </section>

      <FeaturedCourses />

      <section className="border-t border-border bg-background-secondary py-16">
        <div className="container-page flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-heading text-2xl font-bold text-text">
              Teach on Courverse
            </h2>
            <p className="mt-2 max-w-lg text-text-secondary">
              Share expertise across any subject. Reach learners worldwide.
            </p>
          </div>
          <Button asChild>
            <Link href="/register">Become a publisher</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
