import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About | Courverse",
  description:
    "Learn more about Courverse and our mission to make quality education accessible worldwide.",
};

const values = [
  {
    title: "Learn Anywhere",
    description:
      "Access world-class education from any device at your own pace.",
    icon: BookOpen,
  },
  {
    title: "Trusted Publishers",
    description:
      "Courses created by verified educators and industry professionals.",
    icon: ShieldCheck,
  },
  {
    title: "Community Driven",
    description:
      "Join thousands of learners sharing knowledge every day.",
    icon: Users,
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">

      <section className="text-center">

        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-primary">

          <Sparkles className="h-4 w-4" />

          About Courverse

        </div>

        <h1 className="mt-6 text-5xl font-bold">
          Education Designed
          <span className="text-primary"> For Everyone</span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
          Courverse combines structured learning, real-world projects,
          gamification and expert instruction into one modern education
          platform.
        </p>

      </section>

      <section className="mt-24 grid gap-8 md:grid-cols-3">

        {values.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border bg-card p-8 shadow-sm"
          >
            <item.icon className="mb-6 h-10 w-10 text-primary" />

            <h2 className="mb-3 text-2xl font-semibold">
              {item.title}
            </h2>

            <p className="text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}

      </section>

      <section className="mt-24 rounded-3xl bg-primary px-12 py-16 text-primary-foreground">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-4xl font-bold">
              Ready to Start Learning?
            </h2>

            <p className="mt-4 max-w-xl opacity-90">
              Explore thousands of courses built to help you master new
              skills and advance your career.
            </p>

          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-3 rounded-xl bg-white px-6 py-4 font-semibold text-primary transition hover:scale-105"
          >
            Browse Courses

            <ArrowRight className="h-5 w-5" />
          </Link>

        </div>

      </section>

    </main>
  );
}