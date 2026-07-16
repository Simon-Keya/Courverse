import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import {
  ArrowRight,
  BookOpen,
  Search,
  Sparkles,
  PlayCircle,
  Award,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Courverse | Learn Without Limits",
  description:
    "Master new skills through world-class courses, challenges and certificates.",
};

export default function HomePage() {
  return (
    <div className="overflow-hidden">

      {/* Background */}

      <section className="relative">

        <div className="absolute inset-0 -z-10">

          <div className="absolute left-0 top-0 h-[700px] w-[700px] rounded-full bg-emerald-400/20 blur-3xl" />

          <div className="absolute right-0 top-32 h-[600px] w-[600px] rounded-full bg-sky-400/20 blur-3xl" />

          <div className="absolute bottom-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-yellow-300/20 blur-3xl" />

        </div>

        <div className="container mx-auto px-6">

          <div className="grid min-h-[92vh] items-center gap-20 lg:grid-cols-2">

            {/* LEFT */}

            <div>

              <div className="mb-8 inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">

                <Sparkles className="mr-2 h-4 w-4 text-emerald-600" />

                <span className="text-sm font-medium">
                  Trusted by 50,000+ learners
                </span>

              </div>

              <h1 className="text-5xl font-black leading-tight md:text-7xl">

                Learn
                <span className="text-emerald-600"> Smarter</span>

                <br />

                Grow

                <span className="text-sky-600"> Faster</span>

              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">

                Courverse combines modern courses, interactive quizzes,
                achievements, certificates and personalized learning paths
                to help you master the skills employers actually need.

              </p>

              {/* SEARCH */}

              <div className="mt-10 flex flex-col gap-4 rounded-3xl border bg-background p-4 shadow-xl lg:flex-row">

                <div className="relative flex-1">

                  <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />

                  <Input
                    placeholder="Search for courses..."
                    className="h-14 pl-12 text-base"
                  />

                </div>

                <Button size="lg" className="h-14 px-10">

                  Search

                </Button>

              </div>

              {/* CTA */}

              <div className="mt-10 flex flex-wrap gap-5">

                <Button size="lg">

                  Explore Courses

                  <ArrowRight className="ml-2 h-5 w-5" />

                </Button>

                <Button variant="outline" size="lg">

                  <PlayCircle className="mr-2 h-5 w-5" />

                  Watch Demo

                </Button>

              </div>

              {/* STATS */}

              <div className="mt-16 grid grid-cols-3 gap-8">

                <div>

                  <div className="text-4xl font-black text-emerald-600">
                    500+
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Premium Courses
                  </p>

                </div>

                <div>

                  <div className="text-4xl font-black text-sky-600">
                    50K+
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Students
                  </p>

                </div>

                <div>

                  <div className="text-4xl font-black text-yellow-500">
                    120+
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Expert Publishers
                  </p>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="relative">

              <div className="relative overflow-hidden rounded-[40px] border bg-card shadow-2xl">

                <Image
                  src="/images/hero/dashboard.webp"
                  alt="Courverse Dashboard"
                  width={900}
                  height={900}
                  priority
                  className="w-full"
                />

              </div>

              {/* Floating Cards */}

              <div className="absolute -left-8 top-12 rounded-3xl border bg-background p-5 shadow-xl">

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-emerald-500/10 p-3">

                    <Award className="h-7 w-7 text-emerald-600" />

                  </div>

                  <div>

                    <h4 className="font-bold">
                      Certificate Earned
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      React Masterclass
                    </p>

                  </div>

                </div>

              </div>

              <div className="absolute -right-6 bottom-20 rounded-3xl border bg-background p-5 shadow-xl">

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-sky-500/10 p-3">

                    <BookOpen className="h-7 w-7 text-sky-600" />

                  </div>

                  <div>

                    <div className="font-bold">
                      Continue Learning
                    </div>

                    <div className="text-sm text-muted-foreground">
                      TypeScript Advanced
                    </div>

                  </div>

                </div>

              </div>

              <div className="absolute left-24 bottom-0 rounded-3xl border bg-background p-5 shadow-xl">

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-yellow-500/10 p-3">

                    <Users className="h-7 w-7 text-yellow-600" />

                  </div>

                  <div>

                    <div className="font-bold">
                      Active Community
                    </div>

                    <div className="text-sm text-muted-foreground">
                      18,000 Online
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

      {/* ==========================================
          FEATURED CATEGORIES
      =========================================== */}

      <section className="py-24">

        <div className="container mx-auto px-6">

          <div className="mb-14 flex items-end justify-between">

            <div>

              <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                Explore
              </span>

              <h2 className="mt-5 text-4xl font-black">
                Browse Categories
              </h2>

              <p className="mt-4 max-w-2xl text-muted-foreground">
                Learn from curated learning paths created by experts.
              </p>

            </div>

            <Button variant="outline">

              View All

            </Button>

          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {[
              {
                title: "Development",
                courses: 142,
                color: "bg-emerald-500",
                icon: <BookOpen className="h-7 w-7 text-white" />,
              },
              {
                title: "Design",
                courses: 64,
                color: "bg-sky-500",
                icon: <Sparkles className="h-7 w-7 text-white" />,
              },
              {
                title: "Business",
                courses: 81,
                color: "bg-yellow-500",
                icon: <Award className="h-7 w-7 text-white" />,
              },
              {
                title: "Marketing",
                courses: 59,
                color: "bg-violet-500",
                icon: <Users className="h-7 w-7 text-white" />,
              },
            ].map((category) => (

              <Link
                key={category.title}
                href="/categories"
                className="group rounded-3xl border bg-card p-8 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-2xl"
              >

                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${category.color}`}
                >
                  {category.icon}
                </div>

                <h3 className="text-xl font-bold">
                  {category.title}
                </h3>

                <p className="mt-2 text-muted-foreground">
                  {category.courses} Courses
                </p>

              </Link>

            ))}

          </div>

        </div>

      </section>

      {/* ==========================================
          PLATFORM STATS
      =========================================== */}

      <section className="bg-gradient-to-r from-emerald-600 to-green-700 py-24 text-white">

        <div className="container mx-auto px-6">

          <div className="grid gap-12 text-center md:grid-cols-4">

            {[
              ["50,000+", "Students"],
              ["500+", "Courses"],
              ["120+", "Publishers"],
              ["98%", "Completion Rate"],
            ].map(([number, label]) => (

              <div key={label}>

                <h3 className="text-6xl font-black">
                  {number}
                </h3>

                <p className="mt-4 text-lg text-white/80">
                  {label}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ==========================================
          FEATURED COURSES
      =========================================== */}

      <section className="py-28">

        <div className="container mx-auto px-6">

          <div className="mb-16 flex items-end justify-between">

            <div>

              <span className="rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
                Popular Courses
              </span>

              <h2 className="mt-5 text-5xl font-black">

                Featured Learning

              </h2>

            </div>

            <Button>

              Browse Courses

            </Button>

          </div>

          <div className="grid gap-8 lg:grid-cols-3">

            {[1,2,3,4,5,6].map((course)=>(
              
              <div
                key={course}
                className="overflow-hidden rounded-3xl border bg-card transition hover:-translate-y-2 hover:shadow-2xl"
              >

                <Image
                  src={`/images/courses/course-${(course%3)+1}.jpg`}
                  alt=""
                  width={600}
                  height={400}
                  className="aspect-video object-cover"
                />

                <div className="p-7">

                  <div className="mb-4 flex items-center justify-between">

                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">

                      Development

                    </span>

                    <span className="font-bold text-yellow-500">

                      ★ 4.9

                    </span>

                  </div>

                  <h3 className="text-2xl font-bold">

                    Complete Full Stack Development

                  </h3>

                  <p className="mt-4 text-muted-foreground">

                    Build real-world applications using React,
                    Next.js, NestJS, PostgreSQL and Docker.

                  </p>

                  <div className="mt-8 flex items-center justify-between">

                    <div>

                      <p className="text-sm text-muted-foreground">

                        Simon Keya

                      </p>

                      <p className="font-bold">

                        Senior Instructor

                      </p>

                    </div>

                    <Button>

                      Enroll

                    </Button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ==========================================
          WHY COURVERSE
      =========================================== */}

      <section className="bg-muted/30 py-28">

        <div className="container mx-auto px-6">

          <div className="mx-auto max-w-4xl text-center">

            <h2 className="text-5xl font-black">

              Why Learn With Courverse?

            </h2>

            <p className="mt-6 text-lg text-muted-foreground">

              Built for modern learners. Every feature exists to help
              you finish courses instead of abandoning them.

            </p>

          </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-3">

            {[
              {
                title:"Gamified Learning",
                text:"XP, badges, streaks and challenges keep students engaged."
              },
              {
                title:"Interactive Quizzes",
                text:"Practice immediately after every lesson."
              },
              {
                title:"Professional Certificates",
                text:"Download verified certificates instantly."
              },
              {
                title:"Community Discussions",
                text:"Ask questions directly from publishers."
              },
              {
                title:"AI Recommendations",
                text:"Personalized learning paths."
              },
              {
                title:"Real-time Progress",
                text:"Track every milestone across devices."
              }
            ].map((item)=>(

              <div
                key={item.title}
                className="rounded-3xl border bg-card p-8"
              >

                <h3 className="text-2xl font-bold">

                  {item.title}

                </h3>

                <p className="mt-4 text-muted-foreground">

                  {item.text}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>