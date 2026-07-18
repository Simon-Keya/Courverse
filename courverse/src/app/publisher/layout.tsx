"use client";

import { useState } from "react";
import {
  LayoutDashboard, BarChart3, BookOpen, HelpCircle, Users, Wallet, Award, Settings,
} from "lucide-react";
import { DashboardSidebar, DashboardNavItem } from "@/components/layout/DashboardSidebar";
import { DashboardTopbar } from "@/components/layout/DashboardTopbar";
import { publisherProfile } from "@/data/publisher-mock";

const navItems: DashboardNavItem[] = [
  { href: "/publisher/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/publisher/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/publisher/courses", label: "Courses", icon: BookOpen },
  { href: "/publisher/quizzes", label: "Quizzes", icon: HelpCircle },
  { href: "/publisher/students", label: "Students", icon: Users },
  { href: "/publisher/earnings", label: "Earnings", icon: Wallet },
  { href: "/publisher/certificates", label: "Certificates", icon: Award },
  { href: "/publisher/settings", label: "Settings", icon: Settings },
];

export default function PublisherLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background-secondary lg:flex">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-white lg:block">
        <div className="sticky top-0 h-screen">
          <DashboardSidebar navItems={navItems} roleLabel="Publisher" />
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-white shadow-md">
            <DashboardSidebar navItems={navItems} roleLabel="Publisher" onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardTopbar
          onMenuClick={() => setMobileOpen(true)}
          searchPlaceholder="Search your courses, students…"
          userName={publisherProfile.name}
          userAvatarUrl={publisherProfile.avatarUrl}
          profileHref="/publisher/settings"
          notificationCount={2}
        />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
