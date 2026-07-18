import Link from "next/link";
import { Users, BookOpen, Building2, DollarSign, ArrowRight, AlertCircle } from "lucide-react";
import { platformStats, adminCoursesQueue, adminReports } from "@/data/admin-mock";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboardPage() {
  const pendingCourses = adminCoursesQueue.filter((c) => c.status === "pending_review");
  const openReports = adminReports.filter((r) => r.status !== "resolved");

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Admin dashboard</h1>
      <p className="mt-1 text-text-secondary">Platform-wide overview and pending actions.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="card-surface p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary">
            <Users className="h-4.5 w-4.5" />
          </span>
          <p className="mt-3 font-heading text-xl font-bold text-text">{platformStats.totalUsers.toLocaleString()}</p>
          <p className="text-xs text-text-secondary">Total users</p>
        </div>
        <div className="card-surface p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-50 text-premium">
            <Building2 className="h-4.5 w-4.5" />
          </span>
          <p className="mt-3 font-heading text-xl font-bold text-text">{platformStats.totalPublishers.toLocaleString()}</p>
          <p className="text-xs text-text-secondary">Publishers</p>
        </div>
        <div className="card-surface p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-info">
            <BookOpen className="h-4.5 w-4.5" />
          </span>
          <p className="mt-3 font-heading text-xl font-bold text-text">{platformStats.totalCourses.toLocaleString()}</p>
          <p className="text-xs text-text-secondary">Total courses</p>
        </div>
        <div className="card-surface p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-50 text-reward">
            <DollarSign className="h-4.5 w-4.5" />
          </span>
          <p className="mt-3 font-heading text-xl font-bold text-text">${platformStats.revenueThisMonth.toLocaleString()}</p>
          <p className="text-xs text-text-secondary">Revenue this month</p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-text">Pending course reviews</h2>
            <Link href="/admin/courses" className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover">
              Review all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 card-surface divide-y divide-border">
            {pendingCourses.length === 0 ? (
              <p className="px-5 py-6 text-sm text-text-secondary">No courses awaiting review.</p>
            ) : (
              pendingCourses.map((c) => (
                <div key={c.id} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-text">{c.title}</p>
                    <p className="mt-0.5 text-xs text-text-secondary">By {c.publisher} · Submitted {c.submitted}</p>
                  </div>
                  <Badge variant="info">Pending</Badge>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-text">Open reports</h2>
            <Link href="/admin/reports" className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 card-surface divide-y divide-border">
            {openReports.map((r) => (
              <div key={r.id} className="flex items-start gap-3 px-5 py-4">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-text">{r.type}</p>
                  <p className="text-xs text-text-secondary">{r.target}</p>
                </div>
                <Badge variant={r.status === "open" ? "neutral" : "info"} className="shrink-0 capitalize">{r.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
