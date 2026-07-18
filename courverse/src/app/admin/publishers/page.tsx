import Image from "next/image";
import { adminPublishers } from "@/data/admin-mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminPublishersPage() {
  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Publishers</h1>
      <p className="mt-1 text-text-secondary">{adminPublishers.length} publishers on the platform.</p>

      <div className="mt-6 card-surface overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-text-secondary">
              <th className="px-6 py-3 font-medium">Publisher</th>
              <th className="px-6 py-3 font-medium">Courses</th>
              <th className="px-6 py-3 font-medium">Students</th>
              <th className="px-6 py-3 font-medium">Revenue</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {adminPublishers.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-b-0">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Image src={p.avatarUrl} alt={p.name} width={32} height={32} className="rounded-full" />
                    <span className="font-medium text-text">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-secondary">{p.courses}</td>
                <td className="px-6 py-4 text-text-secondary">{p.students.toLocaleString()}</td>
                <td className="px-6 py-4 text-text-secondary">${p.revenue.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <Badge variant={p.status === "verified" ? "primary" : "info"} className="capitalize">{p.status}</Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  {p.status === "pending" ? (
                    <Button size="sm">Verify</Button>
                  ) : (
                    <Button size="sm" variant="secondary">View</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
