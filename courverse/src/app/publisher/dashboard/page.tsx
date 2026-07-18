import Link from "next/link";
import Image from "next/image";
import { Users, DollarSign, Star, BookOpen, ArrowRight, TrendingUp } from "lucide-react";
import { publisherStats, publisherCourses, publisherStudents } from "@/data/publisher-mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const statusVariant: Record<string, "primary" | "info" | "neutral"> = {
  published: "primary",
  review: "info",
  draft: "neutral",
};

export default function PublisherDashboardPage() {
  const recentCourses = publisherCourses.slice(0, 4);
  const recentStudents = publisherStudents.slice(0, 4);

  return (
    <div className="container-page py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text">Publisher dashboard</h1>
          <p className="mt-1 text-text-secondary">A snapshot of how your courses are performing.</p>
        </div>
        <Link href="/publisher/courses"><Button>+ New course</Button></Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="card-surface p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary">
            <Users className="h-4.5 w-4.5" />
          </span>
          <p className="mt-3 font-heading text-xl font-bold text-text">{publisherStats.totalStudents.toLocaleString()}</p>
          <p className="text-xs text-text-secondary">Total students</p>
        </div>
        <div className="card-surface p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-50 text-reward">
            <DollarSign className="h-4.5 w-4.5" />
          </span>
          <p className="mt-3 font-heading text-xl font-bold text-text">${publisherStats.revenueThisMonth.toLocaleString()}</p>
          <p className="text-xs text-text-secondary">Revenue this month</p>
        </div>
        <div className="card-surface p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-info">
            <Star className="h-4.5 w-4.5" />
          </span>
          <p className="mt-3 font-heading text-xl font-bold text-text">{publisherStats.avgRating}</p>
          <p className="text-xs text-text-secondary">Average rating</p>
        </div>
        <div className="card-surface p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-50 text-premium">
            <BookOpen className="h-4.5 w-4.5" />
          </span>
          <p className="mt-3 font-heading text-xl font-bold text-text">{publisherStats.activeCourses}</p>
          <p className="text-xs text-text-secondary">Active courses</p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-text">Your courses</h2>
            <Link href="/publisher/courses" className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover">
              Manage all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 card-surface divide-y divide-border">
            {recentCourses.map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-text">{c.title}</p>
                  <p className="mt-0.5 text-xs text-text-secondary">{c.students.toLocaleString()} students · Updated {c.lastUpdated}</p>
                </div>
                <Badge variant={statusVariant[c.status] ?? "neutral"} className="shrink-0 capitalize">{c.status.replace("_", " ")}</Badge>
              </div>
            ))}
          </div>

          <div className="mt-8 card-surface flex items-center gap-4 p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
              <TrendingUp className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-text">Completion rate is at {publisherStats.completionRate}%</p>
              <p className="text-xs text-text-secondary">Check Analytics for a full breakdown of enrollment and drop-off.</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-text">Recent students</h2>
            <Link href="/publisher/students" className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 card-surface divide-y divide-border">
            {recentStudents.map((s) => (
              <div key={s.id} className="flex items-center gap-3 px-5 py-3.5">
                <Image src={s.avatarUrl} alt={s.name} width={36} height={36} className="h-9 w-9 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-text">{s.name}</p>
                  <p className="text-xs text-text-secondary line-clamp-1">{s.course}</p>
                </div>
                <span className="shrink-0 text-xs font-semibold text-primary">{s.progress}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
