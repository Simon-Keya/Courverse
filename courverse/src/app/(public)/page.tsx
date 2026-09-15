import Link from "next/link";
import Image from "next/image";
import {
  Search, ArrowRight, Star, Code2, BarChart3, Palette, Briefcase,
  Smartphone, Sparkles, Flame, Trophy, Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturedCourses } from "@/components/course/FeaturedCourses";
import { categories, publishers, testimonials } from "@/data/mock";

const categoryIcons: Record<string, typeof Code2> = {
  Code2, BarChart3, Palette, Briefcase, Smartphone, Sparkles,
};

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-background-secondary">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary-hover">
              <Sparkles className="h-3.5 w-3.5" /> New: gamified learning paths
            </span>
            <h1 className="mt-5 font-heading text-4xl font-bold leading-tight text-text sm:text-5xl">
              Learn skills that actually stick.
            </h1>
            <p className="mt-4 max-w-md text-lg text-text-secondary">
              Courses built by working practitioners, with progress tracking, rewards, and
              challenges that keep you coming back.
            </p>

            <form
              action="/courses"
              className="mt-8 flex max-w-md items-center gap-2 rounded-input border border-border bg-white p-1.5 shadow-sm focus-within:border-primary"
            >
              <Search className="ml-2 h-5 w-5 shrink-0 text-text-secondary" />
              <input
                name="search"
                type="search"
                placeholder="Search for React, Design, Data Science…"
                className="w-full bg-transparent px-1 py-2 text-sm text-text placeholder:text-text-secondary focus:outline-none"
              />
              <Button type="submit" size="sm" className="shrink-0">
                Search
              </Button>
            </form>

            <div className="mt-8 flex items-center gap-6">
              <div>
                <p className="font-heading text-2xl font-bold text-text">240K+</p>
                <p className="text-xs text-text-secondary">Active learners</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="font-heading text-2xl font-bold text-text">1,200+</p>
                <p className="text-xs text-text-secondary">Courses</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="font-heading text-2xl font-bold text-text">4.8/5</p>
                <p className="text-xs text-text-secondary">Average rating</p>
              </div>
            </div>
          </div>

          <div
            className="relative mx-auto w-full max-w-sm animate-fade-up lg:ml-auto"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="card-surface p-6">
              <p className="text-sm text-text-secondary">Your progress</p>
              <p className="mt-1 font-heading text-lg font-semibold text-text">
                Continue Learning
              </p>
              <div className="mt-4">
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-background-secondary">
                  <div className="h-full w-[72%] rounded-full bg-progress-gradient" />
                </div>
                <p className="mt-1.5 text-xs font-semibold text-primary">72% complete</p>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-card border border-border bg-orange-50 p-3 text-center">
                  <Flame className="mx-auto h-5 w-5 text-orange-600" />
                  <p className="mt-1 text-xs font-semibold text-text">3 Lessons</p>
                  <p className="text-[10px] text-text-secondary">Today&apos;s goal</p>
                </div>
                <div className="rounded-card border border-border bg-yellow-50 p-3 text-center">
                  <Trophy className="mx-auto h-5 w-5 text-yellow-600" />
                  <p className="mt-1 text-xs font-semibold text-text">1,240 XP</p>
                  <p className="text-[10px] text-text-secondary">This week</p>
                </div>
                <div className="rounded-card border border-border bg-primary-light p-3 text-center">
                  <Award className="mx-auto h-5 w-5 text-primary" />
                  <p className="mt-1 text-xs font-semibold text-text">2 badges</p>
                  <p className="text-[10px] text-text-secondary">Earned</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-16">
        <h2 className="font-heading text-2xl font-bold text-text sm:text-3xl">
          Explore by category
        </h2>
        <p className="mt-2 text-text-secondary">
          Find the right path for your next skill.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.icon] || Code2;
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="card-surface flex items-start gap-4 p-5 transition-shadow hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading font-semibold text-text">{cat.name}</p>
                  <p className="mt-0.5 text-sm text-text-secondary line-clamp-2">
                    {cat.description}
                  </p>
                  <p className="mt-2 text-xs text-text-secondary">
                    {cat.courseCount} courses
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <FeaturedCourses />

      {/* Publishers */}
      <section className="container-page py-20">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-text sm:text-3xl">
              Learn from the best
            </h2>
            <p className="mt-2 text-text-secondary">
              Publishers who&apos;ve taught hundreds of thousands of students.
            </p>
          </div>
          <Link
            href="/publishers"
            className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover sm:flex"
          >
            View all publishers <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {publishers.map((pub) => (
            <Link
              key={pub.id}
              href={`/publishers/${pub.id}`}
              className="card-surface p-6 text-center transition-shadow hover:shadow-md"
            >
              <Image
                src={pub.avatarUrl}
                alt={pub.name}
                width={64}
                height={64}
                className="mx-auto rounded-full"
              />
              <p className="mt-3 font-heading font-semibold text-text">{pub.name}</p>
              <p className="mt-1 text-xs text-text-secondary">
                {pub.coursesCount} courses · {pub.studentsCount.toLocaleString()} students
              </p>
              <div className="mt-2 flex items-center justify-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-reward text-reward" />
                <span className="font-semibold text-text">{pub.rating}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-background-secondary py-20">
        <div className="container-page">
          <h2 className="text-center font-heading text-2xl font-bold text-text sm:text-3xl">
            What learners say
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.id} className="card-surface p-6">
                <p className="text-sm leading-relaxed text-text-secondary">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <Image
                    src={t.avatarUrl}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold text-text">{t.name}</p>
                    <p className="text-xs text-text-secondary">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20 text-center">
        <h2 className="font-heading text-3xl font-bold text-text">
          Ready to start learning?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-text-secondary">
          Join thousands of learners building skills that stick — with progress, rewards, and
          certificates.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 rounded-btn bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-hover"
          >
            Create free account
          </Link>
          <Link
            href="/courses"
            className="inline-flex items-center justify-center gap-2 rounded-btn border border-border bg-white px-6 py-3 text-base font-semibold text-text shadow-sm hover:bg-background-secondary"
          >
            Browse courses
          </Link>
        </div>
      </section>
    </>
  );
}
