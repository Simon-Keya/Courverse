"use client";

import { useState } from "react";
import {
  LayoutDashboard, Users, BookOpen, Building2, FolderTree, Trophy, Flag, Settings, ScrollText,
} from "lucide-react";
import { DashboardSidebar, DashboardNavItem } from "@/components/layout/DashboardSidebar";
import { DashboardTopbar } from "@/components/layout/DashboardTopbar";
import { adminProfile } from "@/data/admin-mock";

const navItems: DashboardNavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/publishers", label: "Publishers", icon: Building2 },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/rewards", label: "Rewards", icon: Trophy },
  { href: "/admin/reports", label: "Reports", icon: Flag },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/logs", label: "Logs", icon: ScrollText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background-secondary lg:flex">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-white lg:block">
        <div className="sticky top-0 h-screen">
          <DashboardSidebar navItems={navItems} roleLabel="Admin" />
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-white shadow-md">
            <DashboardSidebar navItems={navItems} roleLabel="Admin" onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardTopbar
          onMenuClick={() => setMobileOpen(true)}
          searchPlaceholder="Search users, courses, reports…"
          userName={adminProfile.name}
          userAvatarUrl={adminProfile.avatarUrl}
          profileHref="/admin/settings"
          notificationCount={6}
        />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
