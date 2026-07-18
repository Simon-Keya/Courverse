"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, MoreVertical } from "lucide-react";
import { adminUsers } from "@/data/admin-mock";
import { Badge } from "@/components/ui/badge";

type RoleFilter = "all" | "learner" | "publisher";

export default function AdminUsersPage() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<RoleFilter>("all");

  const filtered = useMemo(() => {
    return adminUsers.filter((u) => {
      const matchesQuery = u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase());
      const matchesRole = role === "all" || u.role === role;
      return matchesQuery && matchesRole;
    });
  }, [query, role]);

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Users</h1>
      <p className="mt-1 text-text-secondary">{adminUsers.length} total accounts.</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 rounded-input border border-border bg-white px-3 py-2 text-sm sm:max-w-xs">
          <Search className="h-4 w-4 text-text-secondary" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users…"
            className="w-full bg-transparent text-text placeholder:text-text-secondary focus:outline-none"
          />
        </div>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as RoleFilter)}
          className="rounded-input border border-border bg-white px-3 py-2 text-sm text-text focus:border-primary focus:outline-none"
        >
          <option value="all">All roles</option>
          <option value="learner">Learners</option>
          <option value="publisher">Publishers</option>
        </select>
      </div>

      <div className="mt-6 card-surface overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-text-secondary">
              <th className="px-6 py-3 font-medium">User</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Joined</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-border last:border-b-0">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Image src={u.avatarUrl} alt={u.name} width={32} height={32} className="rounded-full" />
                    <div>
                      <p className="font-medium text-text">{u.name}</p>
                      <p className="text-xs text-text-secondary">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 capitalize text-text-secondary">{u.role}</td>
                <td className="px-6 py-4">
                  <Badge variant={u.status === "active" ? "primary" : "neutral"} className="capitalize">
                    {u.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-text-secondary">{u.joined}</td>
                <td className="px-6 py-4 text-right">
                  <button aria-label="More options" className="rounded-btn p-1.5 text-text-secondary hover:bg-background-secondary">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
