"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  BookOpen,
  HelpCircle,
  Users,
  Wallet,
  Award,
  Settings,
} from "lucide-react";
import { DashboardSidebar, DashboardNavItem } from "@/components/layout/DashboardSidebar";
import { DashboardTopbar } from "@/components/layout/DashboardTopbar";
import { useAuthStore } from "@/store/auth.store";
import { roleHome } from "@/permissions/roles";

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

export default function PublisherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login?callbackUrl=/publisher/dashboard");
      return;
    }
    const role = user?.role;
    if (
      role !== "publisher" &&
      role !== "admin" &&
      role !== "super_admin"
    ) {
      router.replace(roleHome(role));
    }
  }, [isAuthenticated, user, router]);

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    user?.email ||
    "Publisher";

  return (
    <div className="min-h-screen bg-background-secondary lg:flex">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
        <div className="sticky top-0 h-screen">
          <DashboardSidebar navItems={navItems} roleLabel="Publisher" />
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
            role="presentation"
          />
          <aside className="absolute inset-y-0 left-0 w-72 bg-card shadow-md">
            <DashboardSidebar
              navItems={navItems}
              roleLabel="Publisher"
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardTopbar
          onMenuClick={() => setMobileOpen(true)}
          searchPlaceholder="Search your courses…"
          userName={displayName}
          userAvatarUrl={user?.avatarUrl || "/placeholder-course.jpg"}
          profileHref="/publisher/settings"
          notificationCount={0}
        />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
