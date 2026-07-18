import { Eye, Percent } from "lucide-react";
import { publisherAnalytics, publisherStats } from "@/data/publisher-mock";
import { BarChart } from "@/components/charts/BarChart";
import { Badge } from "@/components/ui/badge";

export default function PublisherAnalyticsPage() {
  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Analytics</h1>
      <p className="mt-1 text-text-secondary">Enrollment trends, traffic, and course performance.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="card-surface p-6">
          <div className="flex items-center justify-between">
            <p className="font-heading font-semibold text-text">Enrollment trend</p>
            <Badge variant="info">Last 6 weeks</Badge>
          </div>
          <div className="mt-6">
            <BarChart data={publisherAnalytics.enrollmentTrend} />
          </div>
        </div>

        <div className="card-surface p-6">
          <p className="font-heading font-semibold text-text">Traffic sources</p>
          <div className="mt-5 space-y-4">
            {publisherAnalytics.trafficSources.map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text">{s.label}</span>
                  <span className="font-semibold text-text">{s.value}%</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-background-secondary">
                  <div className="h-full rounded-full bg-info" style={{ width: `${s.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 card-surface overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <p className="font-heading font-semibold text-text">Top performing courses</p>
          <span className="text-sm text-text-secondary">{publisherStats.completionRate}% avg completion</span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-text-secondary">
              <th className="px-6 py-3 font-medium">Course</th>
              <th className="px-6 py-3 font-medium">Views</th>
              <th className="px-6 py-3 font-medium">Conversion</th>
            </tr>
          </thead>
          <tbody>
            {publisherAnalytics.topCourses.map((c) => (
              <tr key={c.title} className="border-b border-border last:border-b-0">
                <td className="px-6 py-4 font-medium text-text">{c.title}</td>
                <td className="px-6 py-4 text-text-secondary">
                  <span className="flex items-center gap-1.5"><Eye className="h-4 w-4" /> {c.views.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 text-text-secondary">
                  <span className="flex items-center gap-1.5"><Percent className="h-4 w-4" /> {c.conversion}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
